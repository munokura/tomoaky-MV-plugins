//=============================================================================
// TMPlugin - シンプルウィンドウ
// バージョン: 1.2.0
// 最終更新日: 2017/11/03
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc ウィンドウをピクチャ機能に近い感覚で使えるようにします。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param maxSimpleWindows
 * @type number
 * @desc ウィンドウの最大数。
 * 初期値: 8
 * @default 8
 *
 * @param autoRefresh
 * @type boolean
 * @desc 変数の値が変化したらウィンドウを再描画する。
 * 初期値: OFF ( false = OFF 無効 / true = ON 再描画する )
 * @default false
 * 
 * @param hideSceneChange
 * @type boolean
 * @desc シーン切り替え時（バトル以外）にウィンドウを隠す。
 * 初期値: OFF ( false = OFF 隠さない / true = ON 隠す )
 * @default false
 *
 * @help
 * TMPlugin - シンプルウィンドウ ver1.2.0
 *
 * 使い方:
 *
 *   プラグインコマンドを使い、任意の文章が描画されたウィンドウを画面に
 *   表示することができます。
 *
 *   このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。
 * 
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 * 
 * 
 * プラグインコマンド:
 * 
 *   showWindow 1 0 24 160 72 テスト
 *     大きさが 160 * 72 のウィンドウ 1 番に テスト という文字列を描画して
 *     座標(0, 24) に表示します。
 *     ウィンドウ番号は 1 ～ 8 (初期設定) が使用できます。
 *     文字列には \C[2] などの制御文字の他に \n (改行)が使用できます。
 * 
 *   showNoFrameWindow 1 0 24 160 72 テスト
 *     使い方は showWindow と同じですが、背景が暗いウィンドウを表示します。
 * 
 *   showNoBackWindow 1 0 24 160 72 テスト
 *     使い方は showWindow と同じですが、背景が透明なウィンドウを表示します。
 * 
 *   eraseWindow 1
 *     ウィンドウ 1 番を非表示にします。
 */

var Imported = Imported || {};
Imported.TMSimpleWindow = true;

(function() {

  var parameters = PluginManager.parameters('TMSimpleWindow');
  var maxSimpleWindows = +(parameters['maxSimpleWindows'] || 8);
  var autoRefresh = JSON.parse(parameters['autoRefresh']);
  var hideSceneChange = JSON.parse(parameters['hideSceneChange']);

  //-----------------------------------------------------------------------------
  // Game_Temp
  //

  Game_Temp.prototype.setSimpleWindowRefresh = function(flag) {
    this._simpleWindowRefresh = flag;
  };

  Game_Temp.prototype.needsSimpleWindowRefresh = function() {
    return this._simpleWindowRefresh;
  };

  //-----------------------------------------------------------------------------
  // Game_Variables
  //

  var _Game_Variables_onChange = Game_Variables.prototype.onChange;
  Game_Variables.prototype.onChange = function() {
    _Game_Variables_onChange.call(this);
    $gameTemp.setSimpleWindowRefresh(true);
  };

  //-----------------------------------------------------------------------------
  // Game_Screen
  //

  var _Game_Screen_onBattleStart = Game_Screen.prototype.onBattleStart;
  Game_Screen.prototype.onBattleStart = function() {
    _Game_Screen_onBattleStart.call(this);
    this.eraseBattleSimpleWindows();
  };

  Game_Screen.prototype.simpleWindow = function(id) {
    if (!this._simpleWindows) this._simpleWindows = [];
    var realId = this.realSimpleWindowId(id);
    if (!this._simpleWindows[realId]) {
      this._simpleWindows[realId] = {x: 0, y: 0, width: 0, height: 0, text: '',
                                     backgroundType: 0};
    }
    return this._simpleWindows[realId];
  };

  Game_Screen.prototype.realSimpleWindowId = function(id) {
    return id + ($gameParty.inBattle() ? maxSimpleWindows : 0);
  };

  Game_Screen.prototype.showSimpleWindow = function(id, x, y, width, height, text,
                                                    backgroundType) {
    if (this._simpleWindows == null) this._simpleWindows = [];
    var realId = this.realSimpleWindowId(id);
    this._simpleWindows[realId] = {x: x, y: y, width: width, height: height, text: text,
                                   backgroundType: backgroundType};
  };

  Game_Screen.prototype.eraseSimpleWindow = function(id) {
    this.showSimpleWindow(id, 0, 0, 0, 0, '', 0);
  };

  Game_Screen.prototype.eraseBattleSimpleWindows = function() {
    this._simpleWindows = this._simpleWindows.slice(0, maxSimpleWindows + 1);
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'showWindow') {
      $gameScreen.showSimpleWindow(+args[0], +args[1], +args[2], +args[3], +args[4], args[5], 0);
    } else if (command === 'showNoFrameWindow') {
      $gameScreen.showSimpleWindow(+args[0], +args[1], +args[2], +args[3], +args[4], args[5], 1);
    } else if (command === 'showNoBackWindow') {
      $gameScreen.showSimpleWindow(+args[0], +args[1], +args[2], +args[3], +args[4], args[5], 2);
    } else if (command === 'eraseWindow') {
      $gameScreen.eraseSimpleWindow(+args[0]);
    }
  };

  //-----------------------------------------------------------------------------
  // Spriteset_Base
  //

  var _Spriteset_Base_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
  Spriteset_Base.prototype.createUpperLayer = function() {
    _Spriteset_Base_createUpperLayer.call(this);
    this.createSimpleWindows();
  };

  Spriteset_Base.prototype.createSimpleWindows = function() {
    this._simpleWindows = [];
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var x = (Graphics.width - width) / 2;
    var y = (Graphics.height - height) / 2;
    this._simpleWindowContainer = new Sprite();
    this._simpleWindowContainer.setFrame(x, y, width, height);
    for (var i = 1; i <= maxSimpleWindows; i++) {
      this._simpleWindows[i] = new Window_Simple(i);
      this._simpleWindowContainer.addChild(this._simpleWindows[i]);
    }
    this.addChild(this._simpleWindowContainer);
  };

  var _Spriteset_Base_update = Spriteset_Base.prototype.update;
  Spriteset_Base.prototype.update = function() {
    _Spriteset_Base_update.call(this);
    if (autoRefresh) this.updateSimpleWindows();
  };

  Spriteset_Base.prototype.updateSimpleWindows = function() {
    if ($gameTemp.needsSimpleWindowRefresh()) {
      for (var i = 1; i <= maxSimpleWindows; i++) {
        this._simpleWindows[i].refreshContents();
      }
      $gameTemp.setSimpleWindowRefresh(false);
    }
  };

  Spriteset_Base.prototype.hideSimpleWindows = function() {
    for (var i = 1; i <= maxSimpleWindows; i++) {
      this._simpleWindows[i].hide();
    }
  };

  //-----------------------------------------------------------------------------
  // Window_Simple
  //

  function Window_Simple() {
    this.initialize.apply(this, arguments);
  }

  Window_Simple.prototype = Object.create(Window_Base.prototype);
  Window_Simple.prototype.constructor = Window_Simple;

  Window_Simple.prototype.initialize = function(id) {
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
    this._id = id;
    this._text = '';
    this._backgroundType = 0;
  };

  Window_Simple.prototype.needsRefresh = function() {
    var object = $gameScreen.simpleWindow(this._id);
    return this.x !== object.x || this.y !== object.y ||
           this.width !== object.width || this.height !== object.height ||
           this._text !== object.text || this._backgroundType !== object.backgroundType;
  };

  Window_Simple.prototype.refresh = function() {
    var object = $gameScreen.simpleWindow(this._id);
    this._text = object.text;
    this._backgroundType = object.backgroundType;
    this.move(object.x, object.y, object.width, object.height);
    this.createContents();
    this.setBackgroundType(this._backgroundType);
    this.refreshContents();
  };

  Window_Simple.prototype.refreshContents = function() {
    if (this.width === 0) return;
    this.contents.clear();
    this.drawTextEx(this._text.replace(/\\n/g, '\n'), 0, 0);
  };

  Window_Simple.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this.needsRefresh()) this.refresh();
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    if (hideSceneChange && !SceneManager.isNextScene(Scene_Battle)) {
      this._spriteset.hideSimpleWindows();
    }
    _Scene_Map_terminate.call(this);
  };

  var _Scene_Map_launchBattle = Scene_Map.prototype.launchBattle;
  Scene_Map.prototype.launchBattle = function() {
    _Scene_Map_launchBattle.call(this);
    this._spriteset.hideSimpleWindows();
  };

})();