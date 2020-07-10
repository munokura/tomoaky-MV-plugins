//=============================================================================
// TMPlugin - カードアイテム
// バージョン: 0.2b
// 最終更新日: 2020/02/24
// 配布元　　: https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 指定したアイテムをカードのように扇状に広げて表示します。
 * カードの画像が別途必要になります。
 *
 * @author tomoaky (https://hikimoki.sakura.ne.jp/)
 *
 * @param maxCardCols
 * @desc 一度に広げられるカードの枚数
 * 初期値: 8
 * @default 8
 *
 * @param cardSpacing
 * @desc カードとカードの間隔（3.141592 で約90度）
 * 初期値: 0.2
 * @default 0.2
 *
 * @param arrowSpacing
 * @desc 矢印とカードの間隔（3.141592 で約90度）
 * 初期値: 0.2
 * @default 0.2
 *
 * @param baseX
 * @desc カードの位置（扇の中心のＸ座標）
 * 初期値: 408
 * @default 408
 * 
 * @param baseY
 * @desc カードの位置（扇の中心のＹ座標）
 * 初期値: 880
 * @default 880
 * 
 * @param baseDistance
 * @desc カードの位置（扇の中心からの距離）
 * 初期値: 408
 * @default 408
 * 
 * @param shiftRadian
 * @desc 扇の回転補正値（3.141592 で約90度）
 * 初期値: 0
 * @default 0
 * 
 * @param selectedDistance
 * @desc 選択中カードの位置（扇の中心からの距離）
 * 初期値: 472
 * @default 472
 * 
 * @param cardSpeed
 * @desc カードの移動速度（扇の中心から外への移動）
 * 初期値: 24
 * @default 24
 * 
 * @param cardSpeedR
 * @desc カードの移動速度（扇を中心に回る移動）
 * 初期値: 0.05
 * @default 0.05
 * 
 * @param useHelpWindow
 * @desc ヘルプウィンドウを利用する（ 0 で無効 / 1 で有効）
 * 初期値: 1
 * @default 1
 * 
 * @param helpWindowY
 * @desc ヘルプウィンドウのＹ座標
 * 初期値: 0
 * @default 0
 * 
 * @param showItemName
 * @desc ヘルプウィンドウにアイテム名を表示（ 0 で無効 / 1 で有効）
 * 初期値: 1
 * @default 1
 * 
 * @param numsFormat
 * @desc 個数表示の書式
 * 初期値: ×%1
 * @default ×%1
 * 
 * @param blankMessage
 * @desc カードがないときに表示するメッセージ（ \n で改行）
 * 初期値: アイテムがありません。
 * @default アイテムがありません。
 * 
 * @param useGoldWindow
 * @desc 所持金ウィンドウを利用する（ 0 で無効 / 1 で有効）
 * 初期値: 0
 * @default 0
 * 
 * @param goldWindowX
 * @desc 所持金ウィンドウのＸ座標
 * 初期値: 0
 * @default 0
 * 
 * @param goldWindowY
 * @desc 所持金ウィンドウのＹ座標
 * 初期値: 144
 * @default 144
 * 
 * @param useWrap
 * @desc 先頭と末尾をカーソル移動できる（ 0 で無効 / 1 で有効）
 * 初期値: 1
 * @default 1
 * 
 * @param takeoverMainMenu
 * @desc メインメニューを乗っ取る（ 0 で無効 / 1 で有効）
 * 初期値: 0
 * @default 0
 * 
 * @param backButtonX
 * @desc 戻るボタンの表示X座標（TMBackButton.js が必要）
 * 初期値: 0
 * @default 0
 * 
 * @param backButtonY
 * @desc 戻るボタンの表示Y座標（TMBackButton.js が必要）
 * 初期値: 0
 * @default 0
 * 
 * @noteParam picture
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData items
 * 
 * @help
 * TMPlugin - カードアイテム ver0.2b
 * 
 * 使い方:
 * 
 *   アイテムのメモに <picture:ファイル名> と書き込んでください。
 *   次に img/pictures フォルダに書き込んだファイル名と同名の画像を
 *   置いてください。
 *   <picture:card0> と書き込んだ場合は card0.png という画像が必要になります。
 * 
 *   プラグインコマンドで cardItemScene を実行すると、所持アイテムの中で
 *   picture タグを書き込んだアイテムがカードアイテムとして一覧表示されます。
 *   表示のされかた以外は普通のアイテムシーンとほぼ同じです。
 *
 *   プラグインパラメータの初期設定は幅128ドット、高さ176ドットのカード画像を
 *   使用する想定で設定されています。お好みで調整してください。
 * 
 *   このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。
 *
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 * 
 *
 * プラグインコマンド:
 *   cardItemScene        # カードアイテムメニューをひらく
 * 
 */

var Imported = Imported || {};
Imported.TMCardItem = true;

(function() {

  var parameters = PluginManager.parameters('TMCardItem');
  var maxCardCols      = +parameters['maxCardCols'];
  var cardSpacing      = +parameters['cardSpacing'];
  var arrowSpacing     = +parameters['arrowSpacing'];
  var baseX            = +parameters['baseX'];
  var baseY            = +parameters['baseY'];
  var baseDistance     = +parameters['baseDistance'];
  var shiftRadian      = +parameters['shiftRadian'];
  var selectedDistance = +parameters['selectedDistance'];
  var cardSpeed        = +parameters['cardSpeed'];
  var cardSpeedR       = +parameters['cardSpeedR'];
  var useHelpWindow    =  parameters['useHelpWindow'] === '1' ? true : false;
  var helpWindowY      = +parameters['helpWindowY'];
  var showItemName     =  parameters['showItemName'] === '1' ? true : false;
  var numsFormat       =  parameters['numsFormat'];
  var blankMessage     =  parameters['blankMessage'];
  var useGoldWindow    =  parameters['useGoldWindow'] === '1' ? true : false;
  var goldWindowX      = +parameters['goldWindowX'];
  var goldWindowY      = +parameters['goldWindowY'];
  var useWrap          =  parameters['useWrap'] === '1' ? true : false;
  var takeoverMainMenu =  parameters['takeoverMainMenu'] === '1' ? true : false;
  var backButtonX = +parameters['backButtonX'];
  var backButtonY = +parameters['backButtonY'];
  
  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'cardItemScene') {
      SceneManager.push(Scene_CardItem);
    }
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_CardItem
  //

  function Sprite_CardItem() {
    this.initialize.apply(this, arguments);
  }

  Sprite_CardItem.prototype = Object.create(Sprite.prototype);
  Sprite_CardItem.prototype.constructor = Sprite_CardItem;

  Sprite_CardItem.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.anchor.x = 0.5;
    this.anchor.y = 1.0;
  };
  
  Sprite_CardItem.prototype.setup = function(index, item) {
    this._index = index;
    this._item = item
    this.bitmap = ImageManager.loadPicture(item.meta.picture);
    this._currentRot = -Math.PI / 2;
    this._targetRot = this._currentRot;
    this._currentDist = 0;
    this._targetDist = baseDistance;
    this.opacity = 128;
  };

  Sprite_CardItem.prototype.setTargetRotation = function(radian) {
    this._targetRot = radian;
  };
  
  Sprite_CardItem.prototype.refreshRotation = function() {
    this._currentRot = this._targetRot;
  };
  
  Sprite_CardItem.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateMove();
    this.updateOpacity();
  };
  
  Sprite_CardItem.prototype.updateMove = function() {
    if (this._currentRot < this._targetRot) {
      this._currentRot = Math.min(this._currentRot + cardSpeedR, this._targetRot);
    } else if (this._currentRot > this._targetRot) {
      this._currentRot = Math.max(this._currentRot - cardSpeedR, this._targetRot);
    }
    this.updateDistance();
    var r = this._currentRot + shiftRadian;
    this.rotation = r + Math.PI / 2;
    this.x = Math.cos(r) * this._currentDist + baseX;
    this.y = Math.sin(r) * this._currentDist + baseY;
  };
  
  Sprite_CardItem.prototype.updateOpacity = function() {
    if ($gameParty.numItems(this._item) === 0) {
      this.setColorTone([0, 0, 0, 255]);
    } else {
      this.opacity += 8;
    }
  };
  Sprite_CardItem.prototype.updateDistance = function() {
    if (this.parent && this.parent.index() === this._index) {
      this._targetDist = selectedDistance;
    } else {
      this._targetDist = baseDistance;
    }
    if (this._currentDist < this._targetDist) {
      this._currentDist = Math.min(this._currentDist + cardSpeed, this._targetDist);
    } else if (this._currentDist > this._targetDist) {
      this._currentDist = Math.max(this._currentDist - cardSpeed, this._targetDist);
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_CardItemList
  //

  function Window_CardItemList() {
    this.initialize.apply(this, arguments);
  }

  Window_CardItemList.prototype = Object.create(Window_Selectable.prototype);
  Window_CardItemList.prototype.constructor = Window_CardItemList;

  Window_CardItemList.prototype.initialize = function() {
    Window_Selectable.prototype.initialize.call(this, 0, 0, 0, 0);
    this.activate();
    this.makeItemList();
    this.selectLast();
    this.initCardSprites();
  };

  Window_CardItemList.prototype.initCardSprites = function() {
    this._cardSprites = [];
    if (this.maxItems() === 0) return;
    var startIndex = Math.max(this._index - this.maxCols() + 1, 0);
    for (var i = 0, len = this.maxCols(); i < len; i++) {
      var j = (startIndex + i) % this.maxItems();
      if (i > 0 && j === startIndex) break;
      var sprite = new Sprite_CardItem();
      this.addChild(sprite);
      this._cardSprites.push(sprite);
    }
    this.setupCardSprites(startIndex);
    this.setCardTargetRotation();
    this.refreshArrows();
  };
  
  Window_CardItemList.prototype.setupCardSprites = function(startIndex) {
    for (var i = 0, len = this._cardSprites.length; i < len; i++) {
      var j = (startIndex + i) % this.maxItems();
      this._cardSprites[i].setup(j, this._data[j]);
    }
  };
  
  Window_CardItemList.prototype.refreshArrows = function() {
    var d = baseDistance + 64;
    var sprite = this._cardSprites[0];
    this._upArrowSprite.rotation = sprite._targetRot + shiftRadian;
    var r = this._upArrowSprite.rotation - arrowSpacing;
    this._upArrowSprite.move(Math.cos(r) * d + baseX, Math.sin(r) * d + baseY);
    var sprite = this._cardSprites[this._cardSprites.length - 1];
    this._downArrowSprite.rotation = sprite._targetRot + shiftRadian;
    var r = this._downArrowSprite.rotation + arrowSpacing;
    this._downArrowSprite.move(Math.cos(r) * d + baseX, Math.sin(r) * d + baseY);
  };
  
  Window_CardItemList.prototype.maxCols = function() {
    return maxCardCols;
  };

  Window_CardItemList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
  };

  Window_CardItemList.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
  };

  Window_CardItemList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.item());
  };

  Window_CardItemList.prototype.includes = function(item) {
    return item.meta.picture;
  };

  Window_CardItemList.prototype.isEnabled = function(item) {
    return $gameParty.canUse(item);
  };

  Window_CardItemList.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(function(item) {
      return this.includes(item);
    }, this);
  };

  Window_CardItemList.prototype.selectLast = function() {
    var index = this._data.indexOf($gameParty.lastItem());
    this.select(index >= 0 ? index : 0);
  };

  Window_CardItemList.prototype.maxPageRows = function() {
    return 1;
  };

  Window_CardItemList.prototype.drawItem = function(index) {
  };

  Window_CardItemList.prototype.cursorDown = function(wrap) {
    this.cursorPagedown();
  };
  
  Window_CardItemList.prototype.cursorUp = function(wrap) {
    this.cursorPageup();
  };
  
  Window_CardItemList.prototype.cursorRight = function(wrap) {
    var lastIndex = this.index();
    Window_Selectable.prototype.cursorRight.call(this, useWrap);
    var newIndex = this.index();
    if (lastIndex != newIndex) {
      if (this._cardSprites.length < this.maxItems() &&
          this._cardSprites[this._cardSprites.length - 1]._index === lastIndex) {
        var sprite = this._cardSprites.shift();
        this.setCardIndex(sprite, newIndex);
        this._cardSprites.push(sprite);
      }
      this.setCardTargetRotation();
    }
  };

  Window_CardItemList.prototype.cursorLeft = function(wrap) {
    var lastIndex = this.index();
    Window_Selectable.prototype.cursorLeft.call(this, useWrap);
    var newIndex = this.index();
    if (lastIndex != newIndex) {
      if (this._cardSprites.length < this.maxItems() &&
          this._cardSprites[0]._index === lastIndex) {
        var sprite = this._cardSprites.pop();
        this.setCardIndex(sprite, newIndex);
        this._cardSprites.unshift(sprite);
      }
      this.setCardTargetRotation();
    }
  };

  Window_CardItemList.prototype.cursorPagedown = function() {
    var lastIndex = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (useWrap && maxCols < maxItems) {
      this.select((lastIndex + maxCols) % maxItems);
    } else {
      Window_Selectable.prototype.cursorPagedown.call(this);
    }
    var newIndex = this.index();
    if (lastIndex !== newIndex) {
      this.setupCardSprites(useWrap ? newIndex :
                            Math.min(newIndex, maxItems - maxCols));
      this.setCardTargetRotation();
    }
  };

  Window_CardItemList.prototype.cursorPageup = function() {
    var lastIndex = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (useWrap && maxCols < maxItems) {
      this.select((lastIndex - maxCols + maxItems) % maxItems);
    } else {
      Window_Selectable.prototype.cursorPageup.call(this);
    }
    var newIndex = this.index();
    if (lastIndex !== newIndex) {
      this.setupCardSprites(useWrap ? (newIndex + 1 - maxCols + maxItems) % maxItems :
                            Math.max(newIndex + 1 - maxCols, 0));
      this.setCardTargetRotation();
    }
  };

	Window_CardItemList.prototype.updateArrows = function() {
    	if (useWrap && this.maxCols() < this.maxItems()) {
    		this.downArrowVisible = true;
    		this.upArrowVisible = true;
    	} else {
			var len = this._cardSprites.length;
			if (len === 0) {
				this.downArrowVisible = false;
				this.upArrowVisible = false;
			} else {
				this.downArrowVisible = this._cardSprites[len - 1]._index < this.maxItems() - 1;
				this.upArrowVisible = this._cardSprites[0]._index > 0;
			}
		}
	};

  Window_CardItemList.prototype.isTouchedInsideFrame = function() {
    return true;
  };

  Window_CardItemList.prototype.onTouch = function(triggered) {
	var len = this._cardSprites.length;
	if (len === 0) {
		return;
	}
    var lastIndex = this.index();
    var spacing = cardSpacing / 2;
    var r = Math.atan2(TouchInput.y - baseY, TouchInput.x - baseX) - shiftRadian;
    var hitIndex = -1;
    for (var i = 0; i < len; i++) {
      var sprite = this._cardSprites[i];
      var d = Math.abs(r - sprite._currentRot);
      if (d > Math.PI * 2) d -= Math.PI * 2;
      if (d < spacing) {
        hitIndex = i;
        break;
      }
    }
    if (hitIndex >= 0) {
      var sprite = this._cardSprites[hitIndex];
      if (sprite._index === this.index()) {
        if (triggered && this.isTouchOkEnabled()) {
          this.processOk();
        }
      } else {
        this.select(sprite._index);
      }
    } else if (this._stayCount >= 10) {
      var maxItems = this.maxItems();
      spacing = arrowSpacing / 2;
      var d = Math.abs(r - (this._cardSprites[0]._targetRot - arrowSpacing));
      if (d > Math.PI * 2) d -= Math.PI * 2;
      if (d < spacing) {
        if (this.upArrowVisible) this.cursorLeft();
      } else {
        d = Math.abs(r - (this._cardSprites[len - 1]._targetRot + arrowSpacing));
        if (d > Math.PI * 2) d -= Math.PI * 2;
        if (d < spacing) {
          if (this.downArrowVisible) this.cursorRight();
        }
      }
    }
    if (this.index() !== lastIndex) {
      this.setCardTargetRotation();
      SoundManager.playCursor();
    }
  };

  Window_CardItemList.prototype.updateHelp = function() {
    if (this._helpWindow) {
      var item = this.item();
      if (item) {
        var text = item.description;
        if (showItemName) {
          var name = '\\I[' + item.iconIndex + ']' + item.name;
          var n = $gameParty.numItems(item);
          text = name + (n !== 1 ? numsFormat.format(n) : '') + '\n' + text;
        }
        this._helpWindow.setText(text);
      } else {
        this._helpWindow.setText(blankMessage);
      }
    }
  };

  Window_CardItemList.prototype.setCardIndex = function(sprite, index) {
    sprite.setup(index, this._data[index]);
    this.addChild(this.removeChild(sprite));
  };
  
  Window_CardItemList.prototype.setCardTargetRotation = function() {
    var len = this._cardSprites.length;
    var r = -Math.PI / 2 - (len - 1) / 2 * cardSpacing;
    var activeSprite = null;
    for (var i = 0; i < len; i++) {
      var sprite = this._cardSprites[i];
      sprite.setTargetRotation(r);
      this.removeChild(sprite);
      if (sprite._index !== this.index()) {
        this.addChild(sprite);
      } else {
        activeSprite = sprite;
      }
      r += cardSpacing;
    }
    if (activeSprite) this.addChild(activeSprite);
    this.addChild(this.removeChild(this._downArrowSprite));
    this.addChild(this.removeChild(this._upArrowSprite));
  };

  Window_CardItemList.prototype.refresh = function() {
    this.createContents();
  };

  Window_CardItemList.prototype.refreshCardRotation = function() {
    for (var i = 0, len = this._cardSprites.length; i < len; i++) {
      this._cardSprites[i].refreshRotation();
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  if (takeoverMainMenu) {
    var _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
      _Scene_Map_callMenu.call(this);
      SceneManager.pop();
      SceneManager.push(Scene_CardItem);
    };
  }

  //-----------------------------------------------------------------------------
  // Scene_CardItem
  //

  function Scene_CardItem() {
    this.initialize.apply(this, arguments);
  }

  Scene_CardItem.prototype = Object.create(Scene_ItemBase.prototype);
  Scene_CardItem.prototype.constructor = Scene_CardItem;

  Scene_CardItem.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
  };

  Scene_CardItem.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    if (useHelpWindow) this.createHelpWindow();
    if (useGoldWindow) this.createGoldWindow();
    this.createItemWindow();
    this.createActorWindow();
  };

  Scene_CardItem.prototype.start = function() {
    Scene_ItemBase.prototype.start.call(this);
    this._actorWindow.refresh();
  };

  Scene_CardItem.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help(showItemName ? 3 : 2);
    this._helpWindow.y = helpWindowY;
    this.addWindow(this._helpWindow);
  };

  Scene_CardItem.prototype.createItemWindow = function() {
    this._itemWindow = new Window_CardItemList();
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._itemWindow);
  };

  Scene_CardItem.prototype.createGoldWindow = function() {
    this._goldWindow = new Window_Gold(0, 0);
    this._goldWindow.x = goldWindowX;
    this._goldWindow.y = goldWindowY;
    this.addWindow(this._goldWindow);
  };

  Scene_CardItem.prototype.user = function() {
    var members = $gameParty.movableMembers();
    var bestActor = members[0];
    var bestPha = 0;
    for (var i = 0; i < members.length; i++) {
      if (members[i].pha > bestPha) {
        bestPha = members[i].pha;
        bestActor = members[i];
      }
    }
    return bestActor;
  };

  Scene_CardItem.prototype.isCursorLeft = function() {
    return true;
  };

  Scene_CardItem.prototype.onItemOk = function() {
    $gameParty.setLastItem(this.item());
    this.determineItem();
  };

  Scene_CardItem.prototype.playSeForItem = function() {
    SoundManager.playUseItem();
  };

  Scene_CardItem.prototype.useItem = function() {
    Scene_ItemBase.prototype.useItem.call(this);
    this._itemWindow.redrawCurrentItem();
  };

  Scene_CardItem.prototype.backButtonX = function() {
	return backButtonX;
  };

  Scene_CardItem.prototype.backButtonY = function() {
	return backButtonY;
  };

})();
