//=============================================================================
// TMVplugin - ログウィンドウ（ジャンプアクション拡張）
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 0.1b
// 最終更新日: 2016/01/19
//=============================================================================

/*:
 * @plugindesc マップシーンにログウィンドウを表示します。
 * (必ず TMJumpAction より下に導入してください)
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param logWindowX
 * @desc ログウィンドウの X 座標。
 * 初期値: 0
 * @default 0
 *
 * @param logWindowY
 * @desc ログウィンドウの Y 座標。
 * 初期値: 464
 * @default 464
 *
 * @param logWindowWidth
 * @desc ログウィンドウの幅。
 * 初期値: 480
 * @default 480
 *
 * @param logWindowHeight
 * @desc ログウィンドウの高さ。
 * 初期値: 160
 * @default 160
 *
 * @param lineHeight
 * @desc ログウィンドウの１行の高さ。
 * 初期値: 24
 * @default 24
 *
 * @param fontSize
 * @desc ログウィンドウのフォントサイズ。（未実装）
 * 初期値: 20
 * @default 20
 *
 * @param startVisible
 * @desc ゲーム開始時の表示状態。
 * 初期値: 1（ 0 で非表示）
 * @default 1
 *
 * @param collideOpacity
 * @desc プレイヤーと重なったときの不透明度。
 * 初期値: 128（ 0 ～ 255 ）
 * @default 128
 *
 * @param messageBusyHide
 * @desc メッセージウィンドウ表示中はログウィンドウを隠す。
 * 初期値: 1（ 0 で隠さない）
 * @default 1
 *
 * @param eventBusyHide
 * @desc イベント起動中はログウィンドウを隠す。
 * 初期値: 1（ 0 で隠さない）
 * @default 1
 *
 * @help このプラグインの動作には TMVplugin - ジャンプアクション Ver0.2b 以上
 * が必要です。必ずこちらのプラグインを下に導入してください。
 *
 * プラグインコマンド:
 *   JumpAction showLogWindow      # ログウィンドウを表示する
 *   JumpAction hideLogWindow      # ログウィンドウを隠す
 *   JumpAction addLog テキスト    # テキストをログウィンドウに追加する
 *
 *   一部の制御文字も使えます（\V[n], \N[n], \P[n], \G, \C[n]）
 */

var Imported = Imported || {};
Imported.TMJALogWindow = true;

(function() {

  parameters = PluginManager.parameters('TMJALogWindow');

  logWindowX          = Number(parameters['logWindowX']);
  logWindowY          = Number(parameters['logWindowY']);
  logWindowWidth      = Number(parameters['logWindowWidth']);
  logWindowHeight     = Number(parameters['logWindowHeight']);
  logWindowLineHeight = Number(parameters['lineHeight']);
  logWindowFontSize   = Number(parameters['fontSize']);
  logWindowStartVisible    = parameters['startVisible'] === '1' ? true : false;
  logWindowCollideOpacity  = Number(parameters['collideOpacity']);
  logWindowMessageBusyHide = parameters['messageBusyHide'] === '1' ? true : false;
  logWindowEventBusyHide   = parameters['eventBusyHide'] === '1' ? true : false;

  //-----------------------------------------------------------------------------
  // Game_System
  //

  var _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this._visibleLogWindow = logWindowStartVisible;
    this._actionLog = [];
  };
  
  Game_System.prototype.isVisibleLogWindow = function() {
    return this._visibleLogWindow;
  };

  Game_System.prototype.setVisibleLogWindow = function(visible) {
    this._visibleLogWindow = visible;
  };
  
  Game_System.prototype.addActionLog = function(text) {
    this._actionLog.unshift(text);
    if (this._actionLog.length > 10) {
      this._actionLog.pop();
    }
    this._needsActionLogRefresh = true;
  };

  Game_System.prototype.actionLog = function() {
    return this._actionLog;
  };
  
  //-----------------------------------------------------------------------------
  // Game_Actor
  //

  // レベルアップの表示
  var _Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
  Game_Actor.prototype.displayLevelUp = function(newSkills) {
    _Game_Actor_displayLevelUp.call(this, newSkills);
    if (!$gameParty.inBattle()) {
      var text = TextManager.levelUp.format(this._name, TextManager.level, this._level);
      $gameSystem.addActionLog(text);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //

  var _Game_Event_gainRewardExp = Game_Event.prototype.gainRewardExp;
  Game_Event.prototype.gainRewardExp = function(exp) {
    var text = TextManager.obtainExp.format(exp, TextManager.exp);
    $gameSystem.addActionLog(text);
    _Game_Event_gainRewardExp.call(this, exp);
  };
  
  var _Game_Event_gainRewardGold = Game_Event.prototype.gainRewardGold;
  Game_Event.prototype.gainRewardGold = function(gold) {
    _Game_Event_gainRewardGold.call(this, gold);
    var text = TextManager.obtainGold.format(gold);
    $gameSystem.addActionLog(text);
  };
  
  var _Game_Event_gainRewardItem = Game_Event.prototype.gainRewardItem;
  Game_Event.prototype.gainRewardItem = function(item, y) {
    _Game_Event_gainRewardItem.call(this, item, y);
    var text = TextManager.obtainItem.format(item.name);
    $gameSystem.addActionLog(text);
  };
  
  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  // プラグインコマンド
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'JumpAction') {
      switch (args[0]) {
      case 'showLogWindow':
        $gameSystem.setVisibleLogWindow(true);
        break;
      case 'hideLogWindow':
        $gameSystem.setVisibleLogWindow(false);
        break;
      case 'addLog':
        $gameSystem.addActionLog(args[1]);
        break;
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Window_MapLogWindow
  //

  function Window_MapLogWindow() {
    this.initialize.apply(this, arguments);
  }

  Window_MapLogWindow.prototype = Object.create(Window_Base.prototype);
  Window_MapLogWindow.prototype.constructor = Window_MapLogWindow;

  Window_MapLogWindow.prototype.initialize = function() {
    var x = logWindowX;
    var y = logWindowY;
    var wight = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, wight, height);
    this.openness = $gameSystem.isVisibleLogWindow() ? 255 : 0;
    this.opacity = 255;
    this.contentsOpacity = 255;
    this.refresh();
  };

  Window_MapLogWindow.prototype.standardFontSize = function() {
    return logWindowFontSize;
  };

  // ウィンドウの幅を取得
  Window_MapLogWindow.prototype.windowWidth = function() {
    return logWindowWidth;
  };

  // ウィンドウの高さを取得
  Window_MapLogWindow.prototype.windowHeight = function() {
    return logWindowHeight;
  };

  // 標準パディングを取得
  Window_MapLogWindow.prototype.standardPadding = function() {
    return 8;
  };

  // ウィンドウの１行の高さを取得
  Window_MapLogWindow.prototype.lineHeight = function() {
    return logWindowLineHeight;
  };

  // フレーム更新
  Window_MapLogWindow.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if ($gameSystem._needsActionLogRefresh) {
      this.refresh();
      $gameSystem._needsActionLogRefresh = false;
    }
    var visible = this.isVisible();
    if (visible) {
      this.open();
      this.updateOpacity();
    } else {
      this.close();
    }
  };

  // ウィンドウを表示するか
  Window_MapLogWindow.prototype.isVisible = function() {
    if (logWindowEventBusyHide && $gameMap.isEventRunning()) {
      return false;
    }
    if (logWindowMessageBusyHide && $gameMessage.isBusy()) {
      return false;
    }
    return $gameSystem.isVisibleLogWindow();
  };

  // 不透明度の更新
  Window_MapLogWindow.prototype.updateOpacity = function() {
    if (this.x < $gamePlayer.screenX() + 24 &&
        this.x + this.windowWidth() > $gamePlayer.screenX() - 24 &&
        this.y < $gamePlayer.screenY() &&
        this.y + this.windowHeight() > $gamePlayer.screenY() - 48) {
      this.opacity = logWindowCollideOpacity;
    } else {
      this.opacity = 255;
    }
    this.contentsOpacity = this.opacity;
  };

  // リフレッシュ
  Window_MapLogWindow.prototype.refresh = function() {
    this.contents.clear();
//    this.contents.fontSize = logWindowFontSize;
    var actionLog = $gameSystem.actionLog();
    var lh = this.lineHeight();
    var n = Math.min(this.contents.height / lh, actionLog.length);
    for (var i = 0; i < n; i++) {
      var text = this.convertEscapeCharacters(actionLog[i]);
      this.drawTextEx(text, 0, (n - 1 - i) * lh);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);
    this.createMapLogWindow();
  };

  // ログウィンドウの作成
  Scene_Map.prototype.createMapLogWindow = function() {
    this._mapLogWindow = new Window_MapLogWindow();
    this.addChild(this._mapLogWindow);
  };

  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    if (!SceneManager.isNextScene(Scene_Battle)) {
      this._mapLogWindow.hide();
    }
    _Scene_Map_terminate.call(this);
  };

  var _Scene_Map_launchBattle = Scene_Map.prototype.launchBattle;
  Scene_Map.prototype.launchBattle = function() {
    this._mapLogWindow.hide();
    this.removeChild(this._mapLogWindow);
    this._mapLogWindow = null;
    _Scene_Map_launchBattle.call(this);
  };
  
})();
