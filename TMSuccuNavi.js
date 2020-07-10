//=============================================================================
// TMPlugin - ゆれるサキュバスさん
// バージョン: 1.0.3
// 最終更新日: 2017/07/03
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc ゆれるサキュバスさんが冒険のサポートをしてくれます。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param messageX
 * @type string
 * @desc メッセージウィンドウのＸ座標。
 * 初期値: 8
 * @default 8
 *
 * @param messageY
 * @type string
 * @desc メッセージウィンドウのＹ座標。
 * 初期値: 572
 * @default 572
 *
 * @param messageWidth
 * @type number
 * @desc メッセージウィンドウの幅。
 * 初期値: 640
 * @default 640
 *
 * @param succuX
 * @type string
 * @desc サキュバスのＸ座標補正値。
 * 初期値: 80
 * @default 80
 *
 * @param succuY
 * @type string
 * @desc サキュバスのＹ座標補正値。
 * 初期値: 80
 * @default 80
 *
 * @param succuIdleTopY
 * @type string
 * @desc 上側に表示する場合のサキュバスの待機位置Ｙ座標。
 * 初期値: -40
 * @default -40
 *
 * @param succuIdleBottomY
 * @type string
 * @desc 下側に表示する場合のサキュバスの待機位置Ｙ座標。
 * 初期値: 844
 * @default 844
 *
 * @param messageCloseTimer
 * @type number
 * @desc メッセージウィンドウを閉じるまでの時間。
 * 初期値: 180
 * @default 180
 *
 * @param messageFastCloseTimer
 * @type number
 * @desc 早送り状態でメッセージウィンドウを閉じるまでの時間。
 * 初期値: 30
 * @default 30
 *
 * @param messageDuration
 * @type number
 * @desc 待機状態までの時間。
 * 初期値: 180
 * @default 180
 *
 * @param messagePause
 * @type boolean
 * @desc 通常メッセージ表示中に一時停止する。
 * 初期値: ON ( false = OFF 無効 / true = ON 有効 )
 * @default true
 *
 * @param messageFast
 * @type number
 * @desc 早送り状態に移行する保留メッセージ件数。
 * 初期値: 8
 * @default 8
 *
 * @param messageMax
 * @type number
 * @desc 保留可能なメッセージの上限。
 * 初期値: 16
 * @default 16
 *
 * @param messageGainGold
 * @type string
 * @desc お金獲得時のメッセージ。
 * 初期値: %1\G ゲット！
 * @default %1\G ゲット！
 *
 * @param messageLostGold
 * @type string
 * @desc お金減少時のメッセージ。
 * 初期値: %1\G ロスト…
 * @default %1\G ロスト…
 *
 * @param messageGainItem
 * @type string
 * @desc アイテム獲得時のメッセージ。
 * 初期値: %1 ゲット！
 * @default %1 ゲット！
 *
 * @param messageLostItem
 * @type string
 * @desc アイテム減少時のメッセージ。
 * 初期値: %1 ロスト…
 * @default %1 ロスト…
 *
 * @param messageGainItems
 * @type string
 * @desc 複数アイテム獲得時のメッセージ。
 * 初期値: %1%2個 ゲット！
 * @default %1%2個 ゲット！
 *
 * @param messageLostItems
 * @type string
 * @desc 複数アイテム減少時のメッセージ。
 * 初期値: %1%2個 ロスト…
 * @default %1%2個 ロスト…
 *
 * @requiredAssets img/pictures/SuccubusBody
 * @requiredAssets img/pictures/SuccubusBust
 * @requiredAssets img/pictures/SuccubusHead
 * @requiredAssets img/pictures/SuccubusHeadC
 * @requiredAssets img/pictures/SuccubusLArmT
 * @requiredAssets img/pictures/SuccubusLHairB
 * @requiredAssets img/pictures/SuccubusLHairT
 * @requiredAssets img/pictures/SuccubusLLegB
 * @requiredAssets img/pictures/SuccubusLLegT
 * @requiredAssets img/pictures/SuccubusLWing
 * @requiredAssets img/pictures/SuccubusRArmB
 * @requiredAssets img/pictures/SuccubusRArmT
 * @requiredAssets img/pictures/SuccubusRHairB
 * @requiredAssets img/pictures/SuccubusRHairT
 * @requiredAssets img/pictures/SuccubusRLegB
 * @requiredAssets img/pictures/SuccubusRLegT
 * @requiredAssets img/pictures/SuccubusRWing
 * @requiredAssets img/pictures/SuccubusShadow
 * @requiredAssets img/pictures/SuccubusTail
 * @requiredAssets img/system/TMSuccuNaviArrow
 *
 * @help
 * TMPlugin - ゆれるサキュバスさん ver1.0.3
 * 
 * 使い方:
 *
 *   プラグインと一緒に配布している以下の画像を img/pictures フォルダに
 *   保存してください。ファイル名を変更することはできません。
 *   SuccubusBody.png
 *   SuccubusBust.png
 *   SuccubusHead.png
 *   SuccubusHeadC.png
 *   SuccubusLArmT.png
 *   SuccubusLHairB.png
 *   SuccubusLHairT.png
 *   SuccubusLLegB.png
 *   SuccubusLLegT.png
 *   SuccubusLWing.png
 *   SuccubusRArmB.png
 *   SuccubusRArmT.png
 *   SuccubusRHairB.png
 *   SuccubusRHairT.png
 *   SuccubusRLegB.png
 *   SuccubusRLegT.png
 *   SuccubusRWing.png
 *   SuccubusShadow.png
 *   SuccubusTail.png
 *
 *   また、以下の画像を img/System フォルダに保存してください。
 *   TMSuccuNaviArrow.png
 *
 *   以下のイベントコマンド実行時、自動的にサキュバスさんがあらわれて
 *   メッセージが表示されます。
 *   ・所持金の増減
 *   ・アイテムの増減
 *   ・武器の増減
 *   ・防具の増減
 * 
 *   このプラグインは RPGツクールMV Version 1.5.0 で動作確認をしています。
 *
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 * 
 *
 * プラグインコマンド:
 *
 *   succuStop
 *     自動メッセージ機能を停止します。
 *
 *   succuStart
 *     停止した自動メッセージを再開します。
 *
 *   succuClear
 *     保留しているメッセージを全て削除します。
 *
 *   succuMes テキスト
 *     テキストを保留メッセージの末尾に追加します。
 *
 *   succuForce テキスト
 *     テキストを保留メッセージの先頭に追加します。
 * 
 *   保留メッセージの数が上限に達している状態で force コマンドを実行すると
 *   最後に追加されたメッセージが押し出され、削除されます。
 */

var Imported = Imported || {};
Imported.TMSuccuNavi = true;

var TMPlugin = TMPlugin || {};
TMPlugin.SuccuNavi = {};
TMPlugin.SuccuNavi.Parameters = PluginManager.parameters('TMSuccuNavi');
TMPlugin.SuccuNavi.MessageX = +(TMPlugin.SuccuNavi.Parameters['messageX'] || 8);
TMPlugin.SuccuNavi.MessageY = +(TMPlugin.SuccuNavi.Parameters['messageY'] || 572);
TMPlugin.SuccuNavi.MessageWidth = +(TMPlugin.SuccuNavi.Parameters['messageWidth'] || 640);
TMPlugin.SuccuNavi.SuccuX = +(TMPlugin.SuccuNavi.Parameters['succuX'] || 80);
TMPlugin.SuccuNavi.SuccuY = +(TMPlugin.SuccuNavi.Parameters['succuY'] || 80);
TMPlugin.SuccuNavi.SuccuIdleTopY = +(TMPlugin.SuccuNavi.Parameters['succuIdleTopY'] || -40);
TMPlugin.SuccuNavi.SuccuIdleBottomY = +(TMPlugin.SuccuNavi.Parameters['succuIdleBottomY'] || 844);
TMPlugin.SuccuNavi.MessageCloseTimer = +(TMPlugin.SuccuNavi.Parameters['messageCloseTimer'] || 180);
TMPlugin.SuccuNavi.MessageFastCloseTimer = +(TMPlugin.SuccuNavi.Parameters['messageFastCloseTimer'] || 30);
TMPlugin.SuccuNavi.MessageIdleTimer = +(TMPlugin.SuccuNavi.Parameters['messageIdleTimer'] || 180);
TMPlugin.SuccuNavi.MessagePause = JSON.parse(TMPlugin.SuccuNavi.Parameters['messagePause']);
TMPlugin.SuccuNavi.MessageFast = +(TMPlugin.SuccuNavi.Parameters['messageFast'] || 8);
TMPlugin.SuccuNavi.MessageMax = +(TMPlugin.SuccuNavi.Parameters['messageMax'] || 16);
TMPlugin.SuccuNavi.MessageGainGold = TMPlugin.SuccuNavi.Parameters['messageGainGold'];
TMPlugin.SuccuNavi.MessageLostGold = TMPlugin.SuccuNavi.Parameters['messageLostGold'];
TMPlugin.SuccuNavi.MessageGainItem = TMPlugin.SuccuNavi.Parameters['messageGainItem'];
TMPlugin.SuccuNavi.MessageLostItem = TMPlugin.SuccuNavi.Parameters['messageLostItem'];
TMPlugin.SuccuNavi.MessageGainItems = TMPlugin.SuccuNavi.Parameters['messageGainItems'];
TMPlugin.SuccuNavi.MessageLostItems = TMPlugin.SuccuNavi.Parameters['messageLostItems'];

function Game_Succubus() {
  this.initialize.apply(this, arguments);
}

(function() {

  //-----------------------------------------------------------------------------
  // Game_Map
  //

  Game_Map.prototype.createSuccubus = function() {
    this._succubus = new Game_Succubus();
  };

  Game_Map.prototype.succubus = function() {
    if (!this._succubus) this.createSuccubus();
    return this._succubus;
  };
  
  var _Game_Map_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function(sceneActive) {
    _Game_Map_update.call(this, sceneActive);
    this.updateSuccubus();
  };
  
  Game_Map.prototype.updateSuccubus = function() {
    this.succubus().update();
  };

  //-----------------------------------------------------------------------------
  // Game_Succubus
  //

  Game_Succubus.prototype.initialize = function() {
    this._duration = -TMPlugin.SuccuNavi.MessageIdleTimer;
  };

  Game_Succubus.prototype.setDuration = function(duration) {
    this._duration = duration;
  };

  Game_Succubus.prototype.duration = function() {
    if (this._duration == null) this._duration = -TMPlugin.SuccuNavi.MessageIdleTimer;
    return this._duration;
  };

  Game_Succubus.prototype.clearMessage = function() {
    this._messageBuffer = [];
  };

  Game_Succubus.prototype.clearCurrentMessage = function() {
   this._currentMessage = null;
  };

  Game_Succubus.prototype.addMessage = function(text) {
    this._messageBuffer = this._messageBuffer || [];
    if (!this.isMessageMax()) this._messageBuffer.push(text);
  };

  Game_Succubus.prototype.forceMessage = function(text) {
    this._messageBuffer = this._messageBuffer || [];
    this._messageBuffer.unshift(text);
    if (this.isMessageMax()) this._messageBuffer.pop();
  };

  Game_Succubus.prototype.nextMessage = function() {
    this._messageBuffer = this._messageBuffer || [];
    this._currentMessage = this._messageBuffer.shift();
  };
  
  Game_Succubus.prototype.currentMessage = function() {
    return this._currentMessage;
  };
  
  Game_Succubus.prototype.isMessageExist = function() {
    this._messageBuffer = this._messageBuffer || [];
    return this._messageBuffer.length > 0;
  };

  Game_Succubus.prototype.setIdle = function(flag) {
    this._idle = flag;
  };
  
  Game_Succubus.prototype.isIdle = function() {
    if (this._idle == null) this._idle = true;
    return this._idle;
  };
  
  Game_Succubus.prototype.isMessageFast = function() {
    return this._messageBuffer.length >= TMPlugin.SuccuNavi.MessageFast;
  };
  
  Game_Succubus.prototype.isMessageMax = function() {
    return this._messageBuffer.length >= TMPlugin.SuccuNavi.MessageMax;
  };
  
  Game_Succubus.prototype.setAutoMessage = function(state) {
    this._succuAutoMesState = state;
  };
  
  Game_Succubus.prototype.isAutoMessageStop = function() {
    return this._succuAutoMesState === 'stop';
  };
  
  Game_Succubus.prototype.update = function() {
    if (TMPlugin.SuccuNavi.MessagePause && $gameMessage.isBusy()) {
      return;
    }
    if (this._duration > -TMPlugin.SuccuNavi.MessageIdleTimer) {
      this._duration--;
      if (this._duration === 0) {
        this.clearCurrentMessage();
      } else if (this._duration === -TMPlugin.SuccuNavi.MessageIdleTimer) {
        if (!this.isMessageExist()) this.setIdle(true);
      }
      if (this.isMessageFast() && this._duration > TMPlugin.SuccuNavi.MessageFastCloseTimer) {
        this._duration = TMPlugin.SuccuNavi.MessageFastCloseTimer;
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  // 所持金の増減
  var _Game_Interpreter_command125 = Game_Interpreter.prototype.command125;
  Game_Interpreter.prototype.command125 = function() {
    if (!$gameMap.succubus().isAutoMessageStop()) {
      var value = this.operateValue(this._params[0], this._params[1], this._params[2]);
      if (value > 0) {
        $gameMap.succubus().addMessage(TMPlugin.SuccuNavi.MessageGainGold.format(value));
      } else if (value < 0) {
        $gameMap.succubus().addMessage(TMPlugin.SuccuNavi.MessageLostGold.format(-value));
      }
    }
    return _Game_Interpreter_command125.call(this);
  };

  // アイテムの増減
  var _Game_Interpreter_command126 = Game_Interpreter.prototype.command126;
  Game_Interpreter.prototype.command126 = function() {
    if (!$gameMap.succubus().isAutoMessageStop()) {
      var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
      var item = $dataItems[this._params[0]];
      this.addSuccuItemMes(item, value);
    }
    return _Game_Interpreter_command126.call(this);
  };

  // 武器の増減
  var _Game_Interpreter_command127 = Game_Interpreter.prototype.command127;
  Game_Interpreter.prototype.command127 = function() {
    if (!$gameMap.succubus().isAutoMessageStop()) {
      var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
      var item = $dataWeapons[this._params[0]];
      this.addSuccuItemMes(item, value);
    }
    return _Game_Interpreter_command127.call(this);
  };

  // 防具の増減
  var _Game_Interpreter_command128 = Game_Interpreter.prototype.command128;
  Game_Interpreter.prototype.command128 = function() {
    if (!$gameMap.succubus().isAutoMessageStop()) {
      var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
      var item = $dataArmors[this._params[0]];
      this.addSuccuItemMes(item, value);
    }
    return _Game_Interpreter_command128.call(this);
  };

  Game_Interpreter.prototype.addSuccuItemMes = function(item, value) {
    if (value > 0) {
      if (value > 1) {
        $gameMap.succubus().addMessage(TMPlugin.SuccuNavi.MessageGainItems.format(item.name, value));
      } else {
        $gameMap.succubus().addMessage(TMPlugin.SuccuNavi.MessageGainItem.format(item.name));
      }
    } else if (value < 0) {
      if (value < -1) {
        $gameMap.succubus().addMessage(TMPlugin.SuccuNavi.MessageLostItems.format(item.name, -value));
      } else {
        $gameMap.succubus().addMessage(TMPlugin.SuccuNavi.MessageLostItem.format(item.name));
      }
    }
  };

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'succuStart') {
      $gameMap.succubus().setAutoMessage('normal');
    } else if (command === 'succuStop') {
      $gameMap.succubus().setAutoMessage('stop');
    } else if (command === 'succuClear') {
      $gameMap.succubus().clearMessage();
    } else if (command === 'succuMes') {
      $gameMap.succubus().addMessage(args[0]);
    } else if (command === 'succuForce') {
      $gameMap.succubus().forceMessage(args[0]);
    }
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_AnimeChild
  //

  function Sprite_AnimeChild() {
    this.initialize.apply(this, arguments);
  }

  Sprite_AnimeChild.prototype = Object.create(Sprite.prototype);
  Sprite_AnimeChild.prototype.constructor = Sprite_AnimeChild;

  Sprite_AnimeChild.prototype.initialize = function(name, parentSprite, ax, ay,
                                                    cx, cy, angleReset, timer) {
    Sprite.prototype.initialize.call(this);
    this.bitmap = ImageManager.loadPicture(name);
    this._cx = cx;
    this._cy = cy;
    this._angleReset = angleReset;
    this._timer = timer;
    this._count = 0;
    this._plusX = 0;
    this._plusY = 0;
    this.anchor.x = cx / this.bitmap.width;
    this.anchor.y = cy / this.bitmap.height;
    this._r = 0;
    this._parentSprite = parentSprite;
    if (parentSprite != null) {
      var x = ax - parentSprite._cx;
      var y = ay - parentSprite._cy;
      this._ad = Math.sqrt(x * x + y * y);
      this._aa = Math.atan2(y, x);
      this.updatePosition();
    }
  };
  
  Sprite_AnimeChild.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._timer > 0) {
      this._count++;
      if (this._count === this._timer) this._count = 0;
    }
    if (this._parentSprite != null) this.updatePosition();
  };
  
  Sprite_AnimeChild.prototype.updatePosition = function() {
    this.rotation = this._angleReset ? this._r : this._parentSprite._r + this._r;
    this.x = this._parentSprite.x + Math.cos(this._aa + this._parentSprite._r) * this._ad + this._plusX;
    this.y = this._parentSprite.y + Math.sin(this._aa + this._parentSprite._r) * this._ad + this._plusY;
  };
  
  Sprite_AnimeChild.prototype.getTimerAngle = function() {
    return Math.sin(this._count * Math.PI * 2 / this._timer);
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_Succubus
  //
  
  function Sprite_Succubus() {
    this.initialize.apply(this, arguments);
  }

  Sprite_Succubus.prototype = Object.create(Sprite.prototype);
  Sprite_Succubus.prototype.constructor = Sprite_Succubus;

  Sprite_Succubus.prototype.initialize = function(x, y) {
    Sprite.prototype.initialize.call(this);
    this._shadowSprite = new Sprite_AnimeChild('SuccubusShadow', null, 0, 0, 73, 19, false, 120);
    this._shadowSprite.x = x;
    this._shadowSprite.y = y;
    this._bodySprite   = new Sprite_AnimeChild('SuccubusBody', this._shadowSprite, 73, -100, 31, 30, false, 120);
    this._headSprite   = new Sprite_AnimeChild('SuccubusHead', this._bodySprite, 22, 5, 21, 43, false, 180);
    this._rHairTSprite = new Sprite_AnimeChild('SuccubusRHairT', this._headSprite, 13, 18, 73, 14, true, 120);
    this._rHairBSprite = new Sprite_AnimeChild('SuccubusRHairB', this._rHairTSprite, 50, 33, 58, 10, false, 120);
    this._lHairTSprite = new Sprite_AnimeChild('SuccubusLHairT', this._headSprite, 39, 29, 6, 32, true, 120);
    this._lHairBSprite = new Sprite_AnimeChild('SuccubusLHairB', this._lHairTSprite, 17, 42, 13, 13, false, 120);
    this._bustSprite   = new Sprite_AnimeChild('SuccubusBust', this._bodySprite, 28, 13, 20, 9, false, 60);
    this._rArmTSprite  = new Sprite_AnimeChild('SuccubusRArmT', this._bodySprite, 9, 11, 13, 9, false, 105);
    this._rArmBSprite  = new Sprite_AnimeChild('SuccubusRArmB', this._rArmTSprite, 10, 32, 34, 12, false, 105);
    this._lArmTSprite  = new Sprite_AnimeChild('SuccubusLArmT', this._bodySprite, 33, 9, 8, 26, false, 120);
    this._rLegTSprite  = new Sprite_AnimeChild('SuccubusRLegT', this._bodySprite, 29, 49, 14, 13, false, 120);
    this._rLegBSprite  = new Sprite_AnimeChild('SuccubusRLegB', this._rLegTSprite, 48, 16, 11, 12, false, 120);
    this._lLegTSprite  = new Sprite_AnimeChild('SuccubusLLegT', this._bodySprite, 43, 46, 14, 43, false, 120);
    this._lLegBSprite  = new Sprite_AnimeChild('SuccubusLLegB', this._lLegTSprite, 31, 13, 12, 13, false, 120);
    this._rWingSprite  = new Sprite_AnimeChild('SuccubusRWing', this._bodySprite, 18, 29, 85, 30, false, 30);
    this._lWingSprite  = new Sprite_AnimeChild('SuccubusLWing', this._bodySprite, 34, 25, 9, 39, false, 30);
    this._tailSprite   = new Sprite_AnimeChild('SuccubusTail', this._bodySprite, 31, 54, 31, 10, false, 90);
    this.addChild(this._shadowSprite);
    this.addChild(this._lHairBSprite);
    this.addChild(this._lHairTSprite);
    this.addChild(this._rHairBSprite);
    this.addChild(this._rHairTSprite);
    this.addChild(this._lWingSprite);
    this.addChild(this._lArmTSprite);
    this.addChild(this._lLegTSprite);
    this.addChild(this._lLegBSprite);
    this.addChild(this._rWingSprite);
    this.addChild(this._bodySprite);
    this.addChild(this._bustSprite);
    this.addChild(this._tailSprite);
    this.addChild(this._rArmTSprite);
    this.addChild(this._rArmBSprite);
    this.addChild(this._rLegTSprite);
    this.addChild(this._rLegBSprite);
    this.addChild(this._headSprite);
    this._blinkCount = 0;
    this._blinkTimer = 120;
  };

  Sprite_Succubus.prototype.update = function() {
    this._bodySprite._plusY = this._bodySprite.getTimerAngle() * 20;
    this._bustSprite._plusY = this._bustSprite.getTimerAngle() * -1.2 + 1.2;
    this._headSprite._r = this._headSprite.getTimerAngle() * 0.08;
    this._rLegTSprite._r = this._rLegTSprite.getTimerAngle() * 0.08;
    this._rLegBSprite._r = this._rLegBSprite.getTimerAngle() * 0.15;
    this._lLegTSprite._r = this._lLegTSprite.getTimerAngle() * -0.04 + 0.08;
    this._lLegBSprite._r = this._lLegBSprite.getTimerAngle() * -0.15;
    this._rArmTSprite._r = this._rArmTSprite.getTimerAngle() * -0.08;
    this._rArmBSprite._r = this._rArmBSprite.getTimerAngle() * -0.08 - 0.08;
    this._lArmTSprite._r = this._lArmTSprite.getTimerAngle() * 0.03 + 0.02;
    this._rWingSprite._r = this._rWingSprite.getTimerAngle() * 0.15;
    this._lWingSprite._r = this._lWingSprite.getTimerAngle() * -0.15;
    this._rHairTSprite._r = this._rHairTSprite.getTimerAngle() * 0.08;
    this._rHairBSprite._r = this._rHairBSprite.getTimerAngle() * 0.08;
    this._lHairTSprite._r = this._lHairTSprite.getTimerAngle() * -0.08;
    this._lHairBSprite._r = this._lHairBSprite.getTimerAngle() * -0.08;
    this._tailSprite._r = this._tailSprite.getTimerAngle() * 0.08;
    this._shadowSprite.scale.x = this._shadowSprite.getTimerAngle() * 0.05 + 0.95;
    this._shadowSprite.scale.y = this._shadowSprite.scale.x;
    this._blinkCount++;
    if (this._blinkCount == this._blinkTimer) {
      this._blinkCount = -5;
      this._blinkTimer = Math.randomInt(240) + 120;
      this._headSprite.bitmap = ImageManager.loadPicture('SuccubusHeadC');
    } else if (this._blinkCount == 0) {
      this._headSprite.bitmap = ImageManager.loadPicture('SuccubusHead');
    }
    this.updatePosition();
    Sprite.prototype.update.call(this);
  };
  
  Sprite_Succubus.prototype.updatePosition = function() {
    var y = TMPlugin.SuccuNavi.MessageY + TMPlugin.SuccuNavi.SuccuY;
    if ($gameMap.succubus().isIdle()) {
      this._shadowSprite.y += y < Graphics.height / 2 ? -5 : 5;
      this._shadowSprite.y = this._shadowSprite.y.clamp(TMPlugin.SuccuNavi.SuccuIdleTopY,
                                                        TMPlugin.SuccuNavi.SuccuIdleBottomY);
    } else {
      if (this._shadowSprite.y < y) {
        this._shadowSprite.y += 20;
        if (this._shadowSprite.y > y) this._shadowSprite.y = y;
      } else if (this._shadowSprite.y > y) {
        this._shadowSprite.y -= 20;
        if (this._shadowSprite.y < y) this._shadowSprite.y = y;
      }
    }
  };

  Sprite_Succubus.prototype.hide = function() {
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].visible = false;
    }
  };

  //-----------------------------------------------------------------------------
  // Spriteset_Map
  //
  
  var _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    _Spriteset_Map_createLowerLayer.call(this);
    this.createSuccubus();
  };
  
  Spriteset_Map.prototype.createSuccubus = function() {
    var x = TMPlugin.SuccuNavi.MessageX + TMPlugin.SuccuNavi.SuccuX;
    var y = TMPlugin.SuccuNavi.MessageY + TMPlugin.SuccuNavi.SuccuY;
    if (y < Graphics.height / 2) {
      y = TMPlugin.SuccuNavi.SuccuIdleTopY;
    } else {
      y = TMPlugin.SuccuNavi.SuccuIdleBottomY;
    }
    this._succubus = new Sprite_Succubus(x, y);
    this._baseSprite.addChild(this._succubus);
  };

  Spriteset_Map.prototype.hideSuccubus = function() {
    this._succubus.hide();
  };

  //-----------------------------------------------------------------------------
  // Window_SuccuMes
  //

  function Window_SuccuMes() {
    this.initialize.apply(this, arguments);
  }

  Window_SuccuMes.prototype = Object.create(Window_Base.prototype);
  Window_SuccuMes.prototype.constructor = Window_SuccuMes;

  Window_SuccuMes.prototype.initialize = function() {
    var x = TMPlugin.SuccuNavi.MessageX;
    var y = TMPlugin.SuccuNavi.MessageY;
    var wight = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, wight, height);
    this.createArrowSprite();
    this.openness = 0;
    if ($gameMap.succubus().currentMessage()) {
      this._text = this.convertEscapeCharacters($gameMap.succubus().currentMessage());
      this.refresh();
      this.open();
    }
    this._text = null;
  };

  Window_SuccuMes.prototype.createArrowSprite = function() {
    this._arrowSprite = new Sprite();
    this._arrowSprite.bitmap = ImageManager.loadSystem('TMSuccuNaviArrow');
    this._arrowSprite.anchor.x = 0.5;
    this._arrowSprite.x = TMPlugin.SuccuNavi.SuccuX;
    this._arrowSprite.y = -29;
    this._windowSpriteContainer.addChild(this._arrowSprite);
  };

  // ウィンドウの幅を取得
  Window_SuccuMes.prototype.windowWidth = function() {
    return TMPlugin.SuccuNavi.MessageWidth;
  };

  // ウィンドウの高さを取得
  Window_SuccuMes.prototype.windowHeight = function() {
    return 44;
  };

  // 標準パディングを取得
  Window_SuccuMes.prototype.standardPadding = function() {
    return 4;
  };

  // フレーム更新
  Window_SuccuMes.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (TMPlugin.SuccuNavi.MessagePause && $gameMessage.isBusy()) {
      this.close();
      $gameMap.succubus().setIdle(true);
    } else {
      if ($gameMap.succubus().duration() <= 0) {
        if (this.isClosed()) {
          if ($gameMap.succubus().currentMessage()) {
            this.setSuccuMes($gameMap.succubus().currentMessage());
          } else if ($gameMap.succubus().isMessageExist()) {
            $gameMap.succubus().nextMessage();
            this.setSuccuMes($gameMap.succubus().currentMessage());
          }
        } else {
          this.close();
        }
      }
    }
  };

  Window_SuccuMes.prototype.setSuccuMes = function(text) {
    this._text = this.convertEscapeCharacters(text);
    this.refresh();
    this.open();
    $gameMap.succubus().setDuration(TMPlugin.SuccuNavi.MessageCloseTimer);
    $gameMap.succubus().setIdle(false);
  };

  // リフレッシュ
  Window_SuccuMes.prototype.refresh = function() {
    this.contents.clear();
    this.drawTextEx(this._text, 12, 0);
  };

  //-----------------------------------------------------------------------------
  // Scene_Boot
  //
  
  var _Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
  Scene_Boot.loadSystemImages = function() {
    _Scene_Boot_loadSystemImages.call(this);
    ImageManager.loadSystem('TMSuccuNaviArrow');
    ImageManager.loadPicture('SuccubusBody');
    ImageManager.loadPicture('SuccubusBust');
    ImageManager.loadPicture('SuccubusHead');
    ImageManager.loadPicture('SuccubusHeadC');
    ImageManager.loadPicture('SuccubusLArmT');
    ImageManager.loadPicture('SuccubusLHairB');
    ImageManager.loadPicture('SuccubusLHairT');
    ImageManager.loadPicture('SuccubusLLegB');
    ImageManager.loadPicture('SuccubusLLegT');
    ImageManager.loadPicture('SuccubusLWing');
    ImageManager.loadPicture('SuccubusRArmB');
    ImageManager.loadPicture('SuccubusRArmT');
    ImageManager.loadPicture('SuccubusRHairB');
    ImageManager.loadPicture('SuccubusRHairT');
    ImageManager.loadPicture('SuccubusRLegB');
    ImageManager.loadPicture('SuccubusRLegT');
    ImageManager.loadPicture('SuccubusRWing');
    ImageManager.loadPicture('SuccubusTail');
    ImageManager.loadPicture('SuccubusShadow');
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_createMapNameWindow = Scene_Map.prototype.createMapNameWindow;
  Scene_Map.prototype.createMapNameWindow = function() {
    this.createSuccuMesWindow();
    _Scene_Map_createMapNameWindow.call(this);
  };

  // サキュバスメッセージウィンドウの作成
  Scene_Map.prototype.createSuccuMesWindow = function() {
    this._succuMesWindow = new Window_SuccuMes();
    this.addChild(this._succuMesWindow);
  };

  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    this._succuMesWindow.hide();
    this._spriteset.hideSuccubus();
    _Scene_Map_terminate.call(this);
  };

})();
