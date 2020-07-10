//=============================================================================
// TMPlugin - アイテムショートカット
// バージョン: 1.0.3
// 最終更新日: 2017/11/07
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc マップシーンで直接アイテムを使用する機能を追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param shortCutKey
 * @type string
 * @desc ショートカットウィンドウの呼び出しキー。
 * 初期値: S
 * @default S
 *
 * @param slotNumber
 * @type number
 * @desc アイテムスロットの数。
 * 初期値: 8
 * @default 8
 *
 * @param windowX
 * @type string
 * @desc ショートカットウィンドウの X 座標。
 * 初期値: 408 ( -1 でプレイヤーの頭上に表示 )
 * @default 408
 *
 * @param windowY
 * @type string
 * @desc ショートカットウィンドウの Y 座標。
 * 初期値: 0
 * @default 0
 *
 * @param windowWidth
 * @type number
 * @desc ショートカットウィンドウの幅。
 * 初期値: 408
 * @default 408
 *
 * @param windowHeight
 * @type number
 * @desc ショートカットウィンドウの高さ。
 * 初期値: 64
 * @default 64
 *
 * @param backgroundType
 * @type select
 * @option 通常
 * @value 0
 * @option 暗くする
 * @value 1
 * @option 透明
 * @value 2
 * @desc ショートカットウィンドウの背景タイプ。
 * 初期値: 0 ( 0 = 通常 / 1 = 暗くする / 2 = 透明)
 * @default 0
 *
 * @param windowHide
 * @type boolean
 * @desc 操作中以外はショートカットウィンドウを隠す。
 * 初期値: ON（ false = OFF 隠さない / true = ON 隠す ）
 * @default true
 *
 * @help
 * TMPlugin - アイテムショートカット ver1.0.3
 *
 * 使い方:
 *
 *   アイテムシーンでアイテムを選択中に S キーを押すと、ショートカット
 *   ウィンドウが開きます。このウィンドウが開いている間は ← / → キーで
 *   スロットを選択し、決定キー（ enter / space / Z ）を押せばアイテムを
 *   ショートカットに登録することができます。
 *
 *   上記の方法以外にもプラグインコマンドを使って登録することもできます。
 *
 *   ショートカットウィンドウはマップシーンで S キーを押すことでも開くこと
 *   ができます、登録時と同じ操作でアイテムを使用することができます。
 *
 *   このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。
 *
 *
 * プラグインコマンド:
 *
 *   setItemSC 0 1
 *     アイテム１番をスロット０番に登録します。
 * 
 *   stopItemSC
 *     アイテムショートカットの機能を一時的に無効化します。
 * 
 *   startItemSC
 *     stopItemSC による無効化を解除します。
 */

var Imported = Imported || {};
Imported.TMItemShortCut = true;

(function() {
  
  var parameters = PluginManager.parameters('TMItemShortCut');
  var shortCutKey = parameters['shortCutKey'] || 'S';
  var slotNumber = +(parameters['slotNumber'] || 8);
  var windowX = +(parameters['windowX'] || 408);
  var windowY = +(parameters['windowY'] || 0);
  var windowWidth = +(parameters['windowWidth'] || 408);
  var windowHeight = +(parameters['windowHeight'] || 64);
  var backgroundType = +(parameters['backgroundType'] || 0);
  var windowHide = JSON.parse(parameters['windowHide']);

  //-----------------------------------------------------------------------------
  // Input
  //

  Input.keyMapper[shortCutKey.charCodeAt()] = 'shortCut';
  
  //-----------------------------------------------------------------------------
  // Game_System
  //

  Game_System.prototype.isItemShortCutEnabled = function() {
    if (this._itemShortCutEnabled == null) this._itemShortCutEnabled = true;
    return this._itemShortCutEnabled;
  };

  Game_System.prototype.setItemShortCutEnabled = function(flag) {
    this._itemShortCutEnabled = flag;
  };

  //-----------------------------------------------------------------------------
  // Game_Party
  //

  // オブジェクトの初期化
  var _Game_Party_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function() {
    _Game_Party_initialize.call(this);
    this.initShortCut();
  };
  
  // ショートカットの初期化
  Game_Party.prototype.initShortCut = function() {
    this._shortCut = [];
    for (var i = 0; i < slotNumber; i++) {
      this._shortCut[i] = 0;
    }
  };
  
  // ショートカットのセット
  Game_Party.prototype.setShortCut = function(index, itemId) {
    this._shortCut[index] = itemId;
  };

  //-----------------------------------------------------------------------------
  // Game_Player
  //
  
  // 移動が可能かどうかを返す
  var _Game_Player_canMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function() {
    if (Input.isPressed('shortCut') && $gameSystem.isItemShortCutEnabled()) return false;
    return _Game_Player_canMove.call(this);
  };
  
  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'setItemSC') {
      $gameParty.setShortCut(+args[0], +args[1]);
    } else if (command === 'stopItemSC') {
      $gameSystem.setItemShortCutEnabled(false);
    } else if (command === 'startItemSC') {
      $gameSystem.setItemShortCutEnabled(true);
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_Item
  //
  
  var _Window_ItemList_processHandling = Window_ItemList.prototype.processHandling;
  Window_ItemList.prototype.processHandling = function() {
    _Window_ItemList_processHandling.call(this);
    if (this.isOpen() && this.active && Input.isTriggered('shortCut')) {
      this.playOkSound();
      this.updateInputData();
      this.deactivate();
      this.callHandler('menu');
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_ShortCut
  //
  
  function Window_ShortCut() {
    this.initialize.apply(this, arguments);
  }
  
  Window_ShortCut.prototype = Object.create(Window_Selectable.prototype);
  Window_ShortCut.prototype.constructor = Window_ShortCut;
  
  // オブジェクトの初期化
  Window_ShortCut.prototype.initialize = function(mapFlag) {
    Window_Selectable.prototype.initialize.call(this, windowX, windowY,
                                                windowWidth, windowHeight);
    this._mapFlag = mapFlag;
    this._itemIds = [];
    this._data = [];
    this.refresh();
    this.setBackgroundType(backgroundType);
    if (this._mapFlag) {
      if (windowHide || !$gameSystem.isItemShortCutEnabled()) this.openness = 0;
    } else {
      this.hide();
    }
    this.select(0);
  };
  
  // 標準パディングを取得
  Window_ShortCut.prototype.standardPadding = function() {
    return 12;
  };

  // 列数の取得
  Window_ShortCut.prototype.maxCols = function() {
    return slotNumber;
  };
  
  // 項目数の取得
  Window_ShortCut.prototype.maxItems = function() {
    return slotNumber;
  };
  
  // 項目の間隔
  Window_ShortCut.prototype.spacing = function() {
    return 0;
  };

  // 項目の高さ
  Window_ShortCut.prototype.itemHeight = function() {
    return 40;
  };

  // 現在選択中のアイテム
  Window_ShortCut.prototype.item = function() {
    return $dataItems[$gameParty._shortCut[this.index()]];
  };

  // 項目の描画
  Window_ShortCut.prototype.drawItem = function(index) {
    Window_Selectable.prototype.drawItem.call(this, index);
    var item = $dataItems[$gameParty._shortCut[index]];
    if (item) {
      var rect = this.itemRect(index);
      var n = $gameParty.numItems(item);
      this.changePaintOpacity(n > 0);
      this.drawIcon(item.iconIndex, rect.x + rect.width / 2 - 16,
                    rect.y + rect.height / 2 - 16);
      if (n > 0) {
        this.contents.fontSize = 20;
        this.contents.drawText('' + n, rect.x, rect.y + 16, rect.width - 2,
                               24, 'right');
      }
      this._itemIds[index] = item.id;
      this._data[index] = n;
    } else {
      this._itemIds[index] = 0;
      this._data[index] = 0;
    }
  };
  
  // フレーム更新
  Window_ShortCut.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (this._mapFlag) {
      if (windowX === -1) {
        this.x = $gamePlayer.screenX() - this.width / 2;
        this.x = this.x.clamp(0, Graphics.width - this.width);
        this.y = $gamePlayer.screenY() - 64 - this.height;
        this.y = this.y.clamp(0, Graphics.height - this.height);
      }
      if (!$gameMap.isEventRunning() && !$gameMessage.isBusy() &&
          (Input.isPressed('shortCut') && $gameSystem.isItemShortCutEnabled())) {
        this.activate();
      } else {
        this.deactivate();
      }
      this.updateVisiblity();
      var index = Graphics.frameCount % slotNumber;
      var item = $dataItems[$gameParty._shortCut[index]];
      var id = item ? item.id : 0;
      if (this._data[index] !== $gameParty.numItems(item) ||
          this._itemIds[index] !== id) {
        this.redrawItem(index);
      }
    }
  };

  Window_ShortCut.prototype.updateVisiblity = function() {
    if (this.active) {
      this.open();
    } else {
      if (windowHide || !$gameSystem.isItemShortCutEnabled()) {
        this.close();
      } else if ($gameSystem.isItemShortCutEnabled()) {
        this.open();
      }
    }
  };
  
  Window_ShortCut.prototype.playOkSound = function() {
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //
  
  // 表示物の作成
  var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);
    this.createShortCutWindow();
  };
  
  // ショートカットウィンドウの作成
  Scene_Map.prototype.createShortCutWindow = function() {
    this._shortCutWindow = new Window_ShortCut(true);
    this._shortCutWindow.setHandler('ok', this.onShortCutOk.bind(this));
    this.addChild(this._shortCutWindow);
  };

  // 解放
  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    if (!SceneManager.isNextScene(Scene_Battle)) {
      this._shortCutWindow.hide();
    }
    _Scene_Map_terminate.call(this);
  };
  
  // メニュー呼び出し判定
  Scene_Map.prototype.isMenuCalled = function() {
    return Input.isTriggered('cancel') || TouchInput.isCancelled();
  };
  
  // ショートカット実行
  Scene_Map.prototype.onShortCutOk = function() {
    var item = this._shortCutWindow.item();
    var actor = $gameParty.leader();
    if (actor.canUse(item) && (item.scope === 0 || this.isItemEffectsValid())) {
      actor.useItem(item);
      var action = new Game_Action(actor);
      action.setItemObject(item);
      this.itemTargetActors().forEach(function(target) {
        for (var i = 0; i < action.numRepeats(); i++) {
          action.apply(target);
        }
      }, this);
      $gamePlayer.requestAnimation(item.animationId);
      action.applyGlobal();
    } else {
      SoundManager.playBuzzer();
    }
  };

  Scene_Map.prototype.itemTargetActors = function() {
    var item = this._shortCutWindow.item();
    var actor = $gameParty.leader();
    var action = new Game_Action(actor);
    action.setItemObject(item);
    if (!action.isForFriend()) {
      return [];
    } else if (action.isForAll()) {
      return $gameParty.members();
    } else {
      return [actor];
    }
  };

  Scene_Map.prototype.isItemEffectsValid = function() {
    var item = this._shortCutWindow.item();
    var actor = $gameParty.leader();
    var action = new Game_Action(actor);
    action.setItemObject(item);
    return this.itemTargetActors().some(function(target) {
      return action.testApply(target);
    }, this);
  };

  //-----------------------------------------------------------------------------
  // Scene_Item
  //

  var _Scene_Item_create = Scene_Item.prototype.create;
  Scene_Item.prototype.create = function() {
    _Scene_Item_create.call(this);
    this.createShortCutWindow();
  };

  var _Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
  Scene_Item.prototype.createItemWindow = function() {
    _Scene_Item_createItemWindow.call(this);
    this._itemWindow.setHandler('menu', this.onItemShortCut.bind(this));
  };

  Scene_Item.prototype.createShortCutWindow = function() {
    this._shortCutWindow = new Window_ShortCut(false);
    this._shortCutWindow.setHandler('ok',     this.onShortCutOk.bind(this));
    this._shortCutWindow.setHandler('cancel', this.onShortCutCancel.bind(this));
    this.addChild(this._shortCutWindow);
  };

  Scene_Item.prototype.onItemShortCut = function() {
    this._shortCutWindow.show();
    this._shortCutWindow.activate();
    this._shortCutWindow.select(0);
    var index = this._itemWindow.index();
    var rect = this._itemWindow.itemRect(index);
    this._shortCutWindow.x = this._itemWindow.x + this._itemWindow.padding + rect.x +
                             rect.width / 2 - this._shortCutWindow.width / 2;
    this._shortCutWindow.x = this._shortCutWindow.x.clamp(0, Graphics.boxWidth -
                             this._shortCutWindow.width);
    this._shortCutWindow.y = this._itemWindow.y + this._itemWindow.padding + rect.y -
                             this._shortCutWindow.height - 4;
  };

  Scene_Item.prototype.onShortCutOk = function() {
    if (this.isShortCutOk()) {
      SoundManager.playEquip();
      $gameParty.setShortCut(this._shortCutWindow.index(), this.item().id);
      this._shortCutWindow.refresh();
    } else {
      SoundManager.playBuzzer();
    }
    this._shortCutWindow.activate();
  };

  Scene_Item.prototype.isShortCutOk = function() {
    var item = this.item();
    return DataManager.isItem(item) ? item.occasion !== 1 : false;
  };
  
  Scene_Item.prototype.onShortCutCancel = function() {
    this.hideSubWindow(this._shortCutWindow);
  };

})();
