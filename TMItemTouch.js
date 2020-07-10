//=============================================================================
// TMVplugin - 利便性を捨てたアイテムウィンドウ
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2015/11/23
//=============================================================================

/*:
 * @plugindesc アイテムシーンをアイコンベースのものに変更します。
 * 
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param newItemArea
 * @desc 新規獲得アイテムの初期位置エリアの広さ
 * 初期値: 100
 * @default 100
 *
 * @param nullIconIndex
 * @desc 空アイテム（はずす）のアイコンインデックス
 * 初期値: 74
 * @default 74
 *
 * @help プラグインコマンドはありません。
 * 
 * アイテムシーンでウィンドウの下部へ置いたアイテムが
 * 別のシーンで画面外に出てしまう現象は不具合ではありません。
 * この仕様は道具袋の底のほうにある装備品がすぐには装備できないという
 * リアリティあふれる演出のためのものです。
 */

var Imported = Imported || {};
Imported.TMItemTouch = true;

(function() {

  var parameters = PluginManager.parameters('TMItemTouch');
  var newItemArea = Number(parameters['newItemArea']);
  var nullIconIndex = Number(parameters['nullIconIndex']);
  
  //-----------------------------------------------------------------------------
  // Game_Party
  //
  
  // 所持品（アイテム、武器、防具）の初期化
  var _Game_Party_initAllItems = Game_Party.prototype.initAllItems;
  Game_Party.prototype.initAllItems = function() {
    _Game_Party_initAllItems.call(this);
    this._itemPositions = {};
    this._weaponPositions = {};
    this._armorPositions = {};
  };

  // 所持品（アイテム、武器、防具）の増減
  var _Game_Party_gainItem = Game_Party.prototype.gainItem;
  Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    _Game_Party_gainItem.call(this, item, amount, includeEquip);
    var container = this.itemContainer(item);
    if (container) {
      var positionContainer = this.positionContainer(item);
      if (container[item.id] === undefined) {
        delete positionContainer[item.id];  // 個数が 0 なら位置情報を削除
      } else {
        if (positionContainer[item.id] === undefined) {
          // 位置情報がなければ仮の位置情報を設定する
          positionContainer[item.id] = {x:-1, y:-1, z:0};
        }
      }
    }
  };
  
  // 所持品の種類（アイテム、武器、防具）に応じた位置情報の配列を返す
  Game_Party.prototype.positionContainer = function(item) {
    if (!item) {
      return null;
    } else if (DataManager.isItem(item)) {
      return this._itemPositions;
    } else if (DataManager.isWeapon(item)) {
      return this._weaponPositions;
    } else if (DataManager.isArmor(item)) {
      return this._armorPositions;
    } else {
      return null;
    }
  };

  // 所持品の位置情報をセットする
  Game_Party.prototype.setItemPosition = function(item, position) {
    if (item) {
      var positionContainer = this.positionContainer(item);
      if (position.x !== undefined) {
        positionContainer[item.id].x = position.x;
      }
      if (position.y !== undefined) {
        positionContainer[item.id].y = position.y;
      }
      if (position.z !== undefined) {
        positionContainer[item.id].z = position.z;
      }
    }
  };
  
  // 所持品の位置情報 X を取得
  Game_Party.prototype.itemX = function(item) {
    if (item) {
      var positionContainer = this.positionContainer(item);
      return positionContainer[item.id].x;
    }
    return 0;
  };

  // 所持品の位置情報 Y を取得
  Game_Party.prototype.itemY = function(item) {
    if (item) {
      var positionContainer = this.positionContainer(item);
      return positionContainer[item.id].y;
    }
    return 0;
  };

  // 所持品の位置情報 Z を取得
  Game_Party.prototype.itemZ = function(item) {
    if (item) {
      var positionContainer = this.positionContainer(item);
      return positionContainer[item.id].z;
    }
    return -1;
  };

  //-----------------------------------------------------------------------------
  // Sprite_ItemIcon
  //
  
  function Sprite_ItemIcon() {
    this.initialize.apply(this, arguments);
  }

  Sprite_ItemIcon.prototype = Object.create(Sprite_Base.prototype);
  Sprite_ItemIcon.prototype.constructor = Sprite_ItemIcon;

  // オブジェクトの初期化
  Sprite_ItemIcon.prototype.initialize = function(item, index) {
    Sprite_Base.prototype.initialize.call(this);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this._item = item;
    this._index = index;
    this.loadBitmap();
    this.updatePosition();
  };

  // ビットマップの読み込み
  Sprite_ItemIcon.prototype.loadBitmap = function() {
    this.bitmap = ImageManager.loadSystem('IconSet');
    var width = Window_Base._iconWidth;
    var height = Window_Base._iconHeight;
    var index = this._item ? this._item.iconIndex : nullIconIndex;
    this.setFrame(index % 16 * width, Math.floor(index / 16) * height,
                  width, height);
  };

  // フレーム更新
  Sprite_ItemIcon.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    this.updateBlendColor();
  };

  // 位置情報をスプライトの座標に反映させる
  Sprite_ItemIcon.prototype.updatePosition = function() {
    if (this._item) {
      this.x = $gameParty.itemX(this._item);
      this.y = $gameParty.itemY(this._item);
      this.z = $gameParty.itemZ(this._item);
    } else {
      this.x = Window_Base._iconWidth / 2;
      this.y = Window_Base._iconHeight / 2;
      this.z = -1;
    }
  };

  // ブレンドカラーの更新
  Sprite_ItemIcon.prototype.updateBlendColor = function() {
    if (this._index === this.parent.parent._index &&
        Graphics.frameCount % 30 < 15) {
      this.setBlendColor([255, 255, 255, 64]);
    } else {
      this.setBlendColor([0, 0, 0, 0]);
    }
  };

  // 位置情報の保存
  Sprite_ItemIcon.prototype.savePosition = function() {
    var position = {};
    position.x = this.x;
    position.y = this.y;
    position.z = this.z;
    $gameParty.setItemPosition(this._item, position);
  };

  //-----------------------------------------------------------------------------
  // Sprite_ItemName
  //
  
  function Sprite_ItemName() {
    this.initialize.apply(this, arguments);
  }

  Sprite_ItemName.prototype = Object.create(Sprite_Base.prototype);
  Sprite_ItemName.prototype.constructor = Sprite_ItemName;

  // オブジェクトの初期化
  Sprite_ItemName.prototype.initialize = function() {
    Sprite_Base.prototype.initialize.call(this);
    this.bitmap = new Bitmap(288, 28);
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this._index = -1;
  };

  // リフレッシュ
  Sprite_ItemName.prototype.refresh = function(refresh) {
    this.bitmap.clear();
    if (this._index >= 0 && this.parent._data.length > 0) {
      this.bitmap.paintOpacity = 48;
      this.bitmap.fillRect(0, 0, 288, 24, '#000000');
      this.bitmap.paintOpacity = 255;
      this.bitmap.textColor = '#ffffff';
      this.bitmap.fontSize = 24;
      var item = this.parent.item();
      if (item) {
        var n = $gameParty.numItems(item);
        this.bitmap.drawText(item.name + n + '個', 0, 0, 288, 24, 'center');
      } else {
        this.bitmap.drawText('はずす', 0, 0, 288, 24, 'center');
      }
    }
  };

  // フレーム更新
  Sprite_ItemName.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    this.updateIndex();
    this.updatePosition();
  };

  // インデックスの更新
  Sprite_ItemName.prototype.updateIndex = function() {
    // 別のアイテムが選択されたらリフレッシュする
    if (this._index != this.parent._index) {
      this._index = this.parent._index;
      this.refresh();
    }
  };
  
  // 座標の更新
  Sprite_ItemName.prototype.updatePosition = function() {
    if (this._index >= 0 && this.parent._data.length > 0) {
      sprite = this.parent._itemSprites[this._index];
      this.x = sprite.x.clamp(this.width / 2, Graphics.boxWidth - this.width / 2);
      this.y = sprite.y - Window_Base._iconHeight;
      if (this.y < this.height) {
        this.y = sprite.y + Window_Base._iconHeight + this.height;
      }
    }
  };

  
  //-----------------------------------------------------------------------------
  // Window_ItemList
  //

  // オブジェクトの初期化
  var _Window_ItemList_initialize = Window_ItemList.prototype.initialize;
  Window_ItemList.prototype.initialize = function(x, y, width, height) {
    _Window_ItemList_initialize.call(this, x, y, width, height);
    this._touching = false;             // タッチ状態
    this._touchSprite = null;           // タッチされたスプライト
    this._lastTouchSprite = null;       // 前回タッチされたスプライト
    this._lastActive = false;
    this.createBaseSprite();
    this._itemNameSprite = new Sprite_ItemName();
    this.addChild(this._itemNameSprite);
  };
  
  Window_ItemList.prototype._updateArrows = function() {
    this._downArrowSprite.visible = false;
    this._upArrowSprite.visible = false;
  };
  
  Window_ItemList.prototype.select = function(index) {
    this._index = index;
    this._stayCount = 0;
    this.callUpdateHelp();
  };

  // ベーススプライト（アイテムスプライトの親）の作成
  Window_ItemList.prototype.createBaseSprite = function() {
    this._baseSprite = new Sprite();
    this._baseSprite.setFrame(this.x, this.y, this.width, this.height);
    this.addChild(this._baseSprite);
  };
  
  // リフレッシュ
  Window_ItemList.prototype.refresh = function() {
    this.makeItemList();
    this.createSprites();
    this._itemNameSprite.refresh();
  };

  // アイテムスプライトの作成
  Window_ItemList.prototype.createSprites = function() {
    if (this._itemSprites !== undefined) {
      this._itemSprites.forEach(function(sprite) {
        this._baseSprite.removeChild(sprite);
      }, this);
    }
    this._itemSprites = [];
    for(var i = 0; i < this._data.length; i++) {
      var item = this._data[i]
      // アイテムの位置情報が仮データなら位置を設定する
      if ($gameParty.itemX(item) === -1) {
        var r = Math.random() * Math.PI * 2;
        var d = Math.randomInt(newItemArea);
        var position = {};
        position.x = Math.floor(Math.cos(r) * d + this.width / 2);
        position.y = Math.floor(Math.sin(r) * d + newItemArea + Window_Base._iconHeight);
        $gameParty.setItemPosition(item, position);
      }
      this._itemSprites.push(new Sprite_ItemIcon(item, i));
    }
    for(var i = 0; i < this._itemSprites.length; i++) {
      this._baseSprite.addChild(this._itemSprites[i]);
    }
    this._sortItemSprites();
  };

  // アイテムスプライトの並び替え
  Window_ItemList.prototype._sortItemSprites = function() {
    this._baseSprite.children.sort(function(a, b) {
      return a.z - b.z;
    });
  };

  // タッチ（マウス）操作の処理
  Window_ItemList.prototype.processTouch = function() {
    if (this._lastActive === false && this.active === true) {
      if (this._index >= 0) {
        this._lastTouchSprite = this._itemSprites[this._index];
      }
    }
    this._lastActive = this.active;
    if (this.isOpenAndActive()) {
      if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
        this._touching = true;
        this._touchSprite = this.checkTouchSprite(TouchInput.x, TouchInput.y);
        if (this._touchSprite) {
          this.select(this._touchSprite._index);
          this.changeForeground();
        } else {
          this.deselect();
          this._lastTouchSprite = null;
        }
      } else if (TouchInput.isCancelled()) {
        if (this.isCancelEnabled()) {
          this.processCancel();
        }
      } else if (this._touching && TouchInput.isReleased()) {
        if (this._touchSprite) {
          this._touchSprite.savePosition();
          if (this.isTouchOkEnabled() && this._lastTouchSprite &&
              this._lastTouchSprite === this._touchSprite) {
            this.processOk();
          }
          this._lastTouchSprite = this._touchSprite;
          this._touching = false;
        }
      } else {
        if (TouchInput.isLongPressed()) {
          this._lastTouchSprite = null;
        }
        if (this._touching && TouchInput.isMoved() && this._touchSprite) {
          var w = Window_Base._iconWidth / 2;
          var h = Window_Base._iconHeight / 2;
          this._touchSprite.x = (TouchInput.x - this.x).clamp(w, this.width - w);
          this._touchSprite.y = (TouchInput.y - this.y).clamp(h, this.height - h);
          this._lastTouchSprite = null;
        }
      }
    } else {
        this._touching = false;
    }
  };

  // タッチされたスプライトを最前面へ移動する
  Window_ItemList.prototype.changeForeground = function() {
    for(var i = 0; i < this._data.length; i++) {
      this._baseSprite.children[i].z = i;
      this._baseSprite.children[i].savePosition();
    }
    this._touchSprite.z = this._data.length;
    this._touchSprite.savePosition();
    this._sortItemSprites();
  };
  
  // タッチ座標にあるスプライトを返す
  Window_ItemList.prototype.checkTouchSprite = function(x, y) {
    for(var i = this._baseSprite.children.length - 1; i >= 0; i--) {
      var sprite = this._baseSprite.children[i];
      var sx = sprite.x + this.x;
      var sy = sprite.y + this.y;
      var w = Window_Base._iconWidth / 2;
      var h = Window_Base._iconHeight / 2;
      if (x >= sx - w && x < sx + w && y >= sy - h && y < sy + h) {
        return sprite;
      }
    }
    return null;
  };

})();
