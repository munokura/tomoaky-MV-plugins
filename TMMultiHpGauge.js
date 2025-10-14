//=============================================================================
// TMPlugin - マルチＨＰゲージ
// バージョン: 1.0.0
// 最終更新日: 2018/07/02
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2018 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc Displays multiple HP gauge windows on the map scene.
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/tomoaky-MV-plugins ).
Original plugin by tomoaky.
-----
TMPlugin - Multi HP Gauge ver. 1.0.0

How to Use:

Adjust the plugin parameters to display your preferred HP gauge.

The coordinates set in windowPosition are for the first actor in the party.
The windows of the remaining actors are displayed at the coordinates obtained by adding gaugeWindowSpaceX / gaugeWindowSpaceY to the previous window coordinates.

This plugin has been tested with RPG Maker MV Version 1.6.1.

This plugin is distributed under the MIT License and is free to use, including commercial use, modifications, and redistribution.

Plugin Commands:

showHpGauge
Displays the HP gauge window.
If the plugin parameter startVisible is 0,
the HP gauge will not be displayed until this command is executed.

hideHpGauge
Hides the HP gauge window. It will remain hidden until the showHpGauge command is executed.

showHpGauge A
Displays Gauge A. If a type is set in the plugin parameters,
it will automatically be displayed when the game starts.

hideHpGauge B
Hides Gauge B. It will remain hidden until the showHpGauge B command is executed.

moveHpGaugeWindow 100 200
Moves the HP Gauge window to X coordinate = 100 / Y coordinate = 200.

Plugin Parameter Notes:

gaugeA to gaugeD

param
If the gauge type is VN, set the game variable number to be used as the current gauge value.
Four consecutive variables (for the number of party members) from the set number will be used.
If 5 is set, variables 5 through 8 will be used.

max
If the gauge type is VN, specify the game variable number to be used as the maximum value of the gauge.
The maximum value will only function when a value is assigned to the game variable with the number set in this parameter.
This setting only affects the length of the gauge; it does not prevent variable values from exceeding the maximum value.
As with param, four consecutive variables are used, starting from the set number.
Be careful not to overlap with other variables.

windowOpacity / collideOpacity
windowOpacity affects the window frame and background, while collideOpacity
also affects the gauge and face graphics.
If the windowOpacity value is lower than collideOpacity, the windowOpacity value is applied as the opacity when overlapping with the player.
However, the collideOpacity value is applied as usual to gauges and face graphics.

vnMax
If the value is true, the maximum value will also be displayed, but if there is insufficient space to display both the current and maximum values (i.e., the gauge is too short), only the current value will be displayed, regardless of the vnMax setting.

@param windowPosition
@desc HP gauge window display settings (fontSize is not used). Please set the coordinates to those of the leading actor's window.
@default {"x":"0","y":"0","width":"288","height":"64","fontSize":""}
@type struct<Position>

@param facePosition
@desc Visibility setting for face graphic (fontSize is not used). If width is 0, the face graphic will be hidden.
@default {"x":"140","y":"0","width":"144","height":"144","fontSize":""}
@type struct<Position>

@param statePosition
@desc State icon display settings (fontSize is not used) width sets the number of icons, not the display width.
@default {"x":"156","y":"24","width":"4","height":"0","fontSize":""}
@type struct<Position>

@param namePosition
@desc Actor name display setting width of 0 will hide the actor name.
@default {"x":"0","y":"0","width":"0","height":"0","fontSize":"28"}
@type struct<Position>

@param goldPosition
@desc Display settings for money If width is 0, money will be hidden.
@default {"x":"0","y":"0","width":"0","height":"0","fontSize":"28"}
@type struct<Position>

@param gaugeA
@desc Gauge A parameters
@default {"type":"HP","x":"12","y":"12","width":"144","height":"36","fontSize":"28","param":"0","max":"0","name":"AP","color":"#ff60c0 #ffa0e0"}
@type struct<Gauge>

@param gaugeB
@desc Gauge B parameters
@default {"type":"","x":"12","y":"12","width":"144","height":"36","fontSize":"28","param":"0","max":"0","name":"AP","color":"#ff60c0 #ffa0e0"}
@type struct<Gauge>

@param gaugeC
@desc Gauge C parameters
@default {"type":"","x":"12","y":"12","width":"144","height":"36","fontSize":"28","param":"0","max":"0","name":"AP","color":"#ff60c0 #ffa0e0"}
@type struct<Gauge>

@param gaugeD
@desc Gauge D parameters
@default {"type":"","x":"12","y":"12","width":"144","height":"36","fontSize":"28","param":"0","max":"0","name":"AP","color":"#ff60c0 #ffa0e0"}
@type struct<Gauge>

@param gaugeWindowSpaceX
@desc The number of dots to shift left and right when arranging HP gauges. You can align them horizontally by setting this to the same value as the window width.
@default 0
@type number
@min -1000

@param gaugeWindowSpaceY
@desc The number of dots to shift vertically when arranging HP gauges. You can align them vertically by setting this to the same value as the window height.
@default 64
@type number
@min -1000

@param vnMax
@desc Whether to display the maximum value of the gauge type VN. Default: OFF (ON = Display / OFF = Hidden)
@default false
@type boolean

@param startVisible
@desc Display status at the start of the game Default: ON (ON = Display / OFF = Hidden)
@default true
@type boolean

@param messageBusyHide
@desc Hide the HP gauge window while the message window is displayed. Default: ON (ON = hide / OFF = do not hide)
@default true
@type boolean

@param eventBusyHide
@desc Hide the HP gauge window while an event is running. Default: ON (ON = hide / OFF = do not hide)
@default true
@type boolean

@param windowOpacity
@desc HP gauge window opacity (0 ~ 255)
@default 255
@type number
@max 255

@param collideOpacity
@desc Opacity when overlapping with the player. Default: 128 (0 ~ 255)
@default 128
@type number
@max 255

@param goldDisplay
@desc Specifies the actor to display when money display is enabled. Specify the order of the party (first is 0), -1 will display to everyone.
@default 0
@type number
@min -1

@param shakeTime
@desc Time (in frames) to shake the window when taking damage. Default: 20 (0 means no shaking).
@default 20
@type number

@param useBattleScene
@desc Display the HP gauge window even during battle scenes. Default: OFF (ON = Display / OFF = Hide)
@default false
@type boolean

@param gaugeWindowBattleX
@desc X coordinate of the HP gauge window in the battle scene. Initial value: 0
@default 0
@type number
@min -1000

@param gaugeWindowBattleY
@desc Y coordinate of the HP gauge window in the battle scene. Initial value: 0
@default 0
@type number
@min -1000
*/


/*~struct~Gauge:
@param type
@desc Gauge type (HP/MP/TP/LV/VN)
@default HP
@type select
@option none
@option HP
@option MP
@option TP
@option LV
@option VN

@param x
@desc X coordinate of the gauge (left edge of the window is 0) Initial value: 12
@default 12
@type number
@min -1000

@param y
@desc Y coordinate of the gauge (top edge of the window is 0) Initial value: 12
@default 12
@type number
@min -1000

@param width
@desc Gauge length default: 144
@default 144
@type number

@param height
@desc Height of the gauge display area (number and gauge) Initial value: 36
@default 36
@type number

@param fontSize
@desc Font size default: 28
@default 28
@type number

@param param
@desc Game variable number to use as the current value when the gauge type is VN (uses four consecutive variables starting from the set number)
@default 0
@type variable

@param max
@desc The game variable number to be used as the maximum value when the gauge type is VN (uses the four consecutive variables starting from the set number)
@default 0
@type variable

@param name
@desc Parameter name to display when the gauge type is VN. Default: AP
@default AP

@param color
@desc Gauge color when the gauge type is LV/VN Default: #ff60c0 #ffa0e0
@default #ff60c0 #ffa0e0
*/

/*~struct~Position:
@param x
@desc X coordinate
@default 0
@type number
@min -1000

@param y
@desc Y coordinate
@default 0
@type number
@min -1000

@param width
@desc Width (0 for hidden)
@default 0
@type number

@param height
@desc height
@default 0
@type number

@param fontSize
@desc Font size default: 28
@default 28
@type number
*/


/*:ja
@plugindesc マップシーンに複数のＨＰゲージウィンドウを表示します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - マルチＨＰゲージ ver1.0.0

使い方:

  プラグインパラメータをいじってお好みのＨＰゲージを表示してください。

  windowPosition に設定する座標はパーティの先頭アクターのものです、
  残りのアクターのウィンドウは gaugeWindowSpaceX / gaugeWindowSpaceY を
  ひとつ前のウィンドウ座標に加算した位置に表示されます。

  このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。

  このプラグインはMITライセンスのもとに配布しています、商用利用、
  改造、再配布など、自由にお使いいただけます。


プラグインコマンド:

  showHpGauge
    ＨＰゲージウィンドウを表示します。
    プラグインパラメータ startVisible が 0 の場合、
    このコマンドが実行されるまでＨＰゲージは表示されません。

  hideHpGauge
    ＨＰゲージウィンドウを隠します。showHpGauge コマンドが実行されるまで
    表示されないままです。

  showHpGauge A
    ゲージＡを表示します。プラグインパラメータでタイプが設定されている場合、
    ゲーム開始時に自動的に表示状態になります。

  hideHpGauge B
    ゲージＢを隠します。showHpGauge B コマンドが実行されるまで
    表示されないままです。

  moveHpGaugeWindow 100 200
    ＨＰゲージウィンドウの位置を X座標 = 100 / Y座標 = 200 の位置へ
    移動します。


プラグインパラメータ補足:

  gaugeA ～ gaugeD

    param
      ゲージのタイプが VN の場合に、ゲージの現在値として扱う
      ゲーム変数番号を設定してください。
      設定した番号から連続する 4 つ(パーティ人数分)の変数を使用します。
      5 を設定した場合は 5 ～ 8 番の変数を使用します。

    max
      ゲージのタイプが VN の場合に、ゲージの最大値として扱う
      ゲーム変数番号を指定してください。
      このパラメータに設定した番号のゲーム変数に値を代入することで、
      初めて最大値として機能します。
      この設定はゲージの長さにのみ影響します、変数の値が最大値を
      超えなくなるような機能はありません。
      param と同じように、設定した番号から連続する 4 つの変数を使用します。
      他で使う変数とかぶらないように注意してください。

  windowOpacity / collideOpacity
    windowOpacity はウィンドウフレーム及び背景に影響し、collideOpacity
    はゲージや顔グラフィックにも影響します。
    windowOpacity の値が collideOpacity よりも低い場合、プレイヤーと
    重なった際の不透明度として windowOpacity の値が適用されます。
    ただし、ゲージと顔グラフィックに関しては通常どおり collideOpacity の
    値が適用されます。

  vnMax
    値が true なら最大値も表示しますが、現在値と最大値を表示するための
    スペースが足りない（ゲージの長さが短い）場合は vnMax の設定に関わらず
    強制的に現在値のみの表示になります。

@param windowPosition
@desc ＨＰゲージウィンドウの表示設定 ( fontSize は未使用 ) 座標は先頭アクターのウィンドウのものを設定してください。
@default {"x":"0","y":"0","width":"288","height":"64","fontSize":""}
@type struct<Position>

@param facePosition
@desc 顔グラフィックの表示設定 ( fontSize は未使用 ) width が 0 の場合は顔グラフィックを非表示にします。
@default {"x":"140","y":"0","width":"144","height":"144","fontSize":""}
@type struct<Position>

@param statePosition
@desc ステートアイコンの表示設定 ( fontSize は未使用 ) width には表示幅ではなく、アイコンの個数を設定します。
@default {"x":"156","y":"24","width":"4","height":"0","fontSize":""}
@type struct<Position>

@param namePosition
@desc アクター名の表示設定 width が 0 の場合はアクター名を非表示にします。
@default {"x":"0","y":"0","width":"0","height":"0","fontSize":"28"}
@type struct<Position>

@param goldPosition
@desc 所持金の表示設定 width が 0 の場合は所持金を非表示にします。
@default {"x":"0","y":"0","width":"0","height":"0","fontSize":"28"}
@type struct<Position>

@param gaugeA
@desc ゲージＡのパラメータ
@default {"type":"HP","x":"12","y":"12","width":"144","height":"36","fontSize":"28","param":"0","max":"0","name":"AP","color":"#ff60c0 #ffa0e0"}
@type struct<Gauge>

@param gaugeB
@desc ゲージＢのパラメータ
@default {"type":"","x":"12","y":"12","width":"144","height":"36","fontSize":"28","param":"0","max":"0","name":"AP","color":"#ff60c0 #ffa0e0"}
@type struct<Gauge>

@param gaugeC
@desc ゲージＣのパラメータ
@default {"type":"","x":"12","y":"12","width":"144","height":"36","fontSize":"28","param":"0","max":"0","name":"AP","color":"#ff60c0 #ffa0e0"}
@type struct<Gauge>

@param gaugeD
@desc ゲージＤのパラメータ
@default {"type":"","x":"12","y":"12","width":"144","height":"36","fontSize":"28","param":"0","max":"0","name":"AP","color":"#ff60c0 #ffa0e0"}
@type struct<Gauge>

@param gaugeWindowSpaceX
@desc ＨＰゲージを並べる際にずらす左右方向のドット数 ウィンドウの幅と同じ値にすれば横に並べることができます。
@default 0
@type number
@min -1000

@param gaugeWindowSpaceY
@desc ＨＰゲージを並べる際にずらす上下方向のドット数 ウィンドウの高さと同じ値にすれば縦に並べることができます。
@default 64
@type number
@min -1000

@param vnMax
@desc ゲージタイプ VN の最大値を表示するかどうか 初期値: OFF ( ON = 表示 / OFF = 非表示 )
@default false
@type boolean

@param startVisible
@desc ゲーム開始時の表示状態 初期値: ON（ ON = 表示 / OFF = 非表示 ）
@default true
@type boolean

@param messageBusyHide
@desc メッセージウィンドウ表示中はＨＰゲージウィンドウを隠す 初期値: ON ( ON = 隠す / OFF = 隠さない )
@default true
@type boolean

@param eventBusyHide
@desc イベント起動中はＨＰゲージウィンドウを隠す 初期値: ON（ ON = 隠す / OFF = 隠さない )
@default true
@type boolean

@param windowOpacity
@desc ＨＰゲージウィンドウの不透明度 ( 0 ~ 255 )
@default 255
@type number
@max 255

@param collideOpacity
@desc プレイヤーと重なったときの不透明度 初期値: 128（ 0 ~ 255 ）
@default 128
@type number
@max 255

@param goldDisplay
@desc 所持金表示が有効な場合に、表示するアクターを指定する。 パーティの並び順（先頭を 0 ）で指定、-1 なら全員に表示。
@default 0
@type number
@min -1

@param shakeTime
@desc ダメージを受けたときにウィンドウを揺らす時間（フレーム数） 初期値: 20 ( 0 で揺らさない )
@default 20
@type number

@param useBattleScene
@desc 戦闘シーンでもＨＰゲージウィンドウを表示する 初期値: OFF（ ON = 表示 / OFF = 非表示 )
@default false
@type boolean

@param gaugeWindowBattleX
@desc 戦闘シーンのＨＰゲージウィンドウのＸ座標 初期値: 0
@default 0
@type number
@min -1000

@param gaugeWindowBattleY
@desc 戦闘シーンのＨＰゲージウィンドウのＹ座標 初期値: 0
@default 0
@type number
@min -1000
*/


/*~struct~Gauge:ja
@param type
@desc ゲージのタイプ（HP / MP / TP / LV / VN）
@default HP
@type select
@option なし
@option HP
@option MP
@option TP
@option LV
@option VN

@param x
@desc ゲージのＸ座標（ウィンドウ内の左端が 0 ） 初期値: 12
@default 12
@type number
@min -1000

@param y
@desc ゲージのＹ座標（ウィンドウ内の上端が 0 ） 初期値: 12
@default 12
@type number
@min -1000

@param width
@desc ゲージの長さ 初期値: 144
@default 144
@type number

@param height
@desc ゲージの表示領域（数値とゲージ合わせて）の高さ 初期値: 36
@default 36
@type number

@param fontSize
@desc フォントサイズ 初期値: 28
@default 28
@type number

@param param
@desc ゲージのタイプが VN のときに現在値とするゲーム変数番号 ( 設定した番号から連続する 4 つの変数を使用します )
@default 0
@type variable

@param max
@desc ゲージのタイプが VN のときに最大値とするゲーム変数番号 ( 設定した番号から連続する 4 つの変数を使用します )
@default 0
@type variable

@param name
@desc ゲージのタイプが VN のときに表示するパラメータ名 初期値: AP
@default AP

@param color
@desc ゲージのタイプが LV / VN のときのゲージカラー 初期値: #ff60c0 #ffa0e0
@default #ff60c0 #ffa0e0
*/

/*~struct~Position:ja
@param x
@desc Ｘ座標
@default 0
@type number
@min -1000

@param y
@desc Ｙ座標
@default 0
@type number
@min -1000

@param width
@desc 幅 ( 0 で非表示 )
@default 0
@type number

@param height
@desc 高さ
@default 0
@type number

@param fontSize
@desc フォントサイズ 初期値: 28
@default 28
@type number
*/

var Imported = Imported || {};
Imported.TMMapHpGauge = true;

(function() {

  function paramParse(param) {
    var result = JSON.parse(param || '{}');
    for (var key in result) {
      result[key] = +result[key];
    }
    return result;
  }

  var parameters = PluginManager.parameters('TMMultiHpGauge');
  var windowPosition = paramParse(parameters['windowPosition']);
  var facePosition = paramParse(parameters['facePosition']);
  var statePosition = paramParse(parameters['statePosition']);
  var namePosition = paramParse(parameters['namePosition']);
  var goldPosition = paramParse(parameters['goldPosition']);
  var gauges = [];
  ['A', 'B', 'C', 'D'].forEach (function(code, i) {
    gauges[i] = JSON.parse(parameters['gauge' + code]);
    gauges[i].x = +gauges[i].x;
    gauges[i].y = +gauges[i].y;
    gauges[i].width = +gauges[i].width;
    gauges[i].height = +gauges[i].height;
    gauges[i].fontSize = +gauges[i].fontSize;
    gauges[i].param = +gauges[i].param;
    gauges[i].max = +gauges[i].max;
    gauges[i].color = gauges[i].color.split(' ');
  });
  var gaugeWindowSpaceX = +(parameters['gaugeWindowSpaceX'] || 0);
  var gaugeWindowSpaceY = +(parameters['gaugeWindowSpaceY'] || 64);
  var vnMax = JSON.parse(parameters['vnMax'] || 'false');
  var goldDisplay = +(parameters['goldDisplay'] || 0);
  var shakeTime = +(parameters['shakeTime'] || 20);
  var collideOpacity = +(parameters['collideOpacity'] || 128);
  var startVisible = JSON.parse(parameters['startVisible'] || 'true');
  var windowOpacity = +(parameters['windowOpacity'] || 255);
  var messageBusyHide = JSON.parse(parameters['messageBusyHide'] || 'true');
  var eventBusyHide = JSON.parse(parameters['eventBusyHide'] || 'true' );
  var useBattleScene = JSON.parse(parameters['useBattleScene'] || 'false');
  var gaugeWindowBattleX = +(parameters['gaugeWindowBattleX'] || 0);
  var gaugeWindowBattleY = +(parameters['gaugeWindowBattleY'] || 0);

  //-----------------------------------------------------------------------------
  // Game_System
  //

  // ＨＰゲージウィンドウの表示設定を返す
  Game_System.prototype.isVisibleMapHpWindow = function() {
    if (this._visibleMapHpWindow == null) {
      this._visibleMapHpWindow = startVisible;
    }
    return this._visibleMapHpWindow;
  };
  
  // ＨＰゲージウィンドウの表示設定を変更する
  Game_System.prototype.setVisibleMapHpWindow = function(flag) {
    this._visibleMapHpWindow = flag;
  };

  // 各ゲージの表示設定を返す
  Game_System.prototype.isVisibleMapHpGauge = function(windowId) {
    if (this._visibleMapHpGauges == null) {
      this._visibleMapHpGauges = [];
      for (var i = 0; i < gauges.length; i++) {
        this._visibleMapHpGauges[i] = gauges[i].type !== '';
      }
    }
    return this._visibleMapHpGauges[windowId];
  };

  // 各ゲージの表示設定を変更する
  Game_System.prototype.setVisibleMapHpGauge = function(windowId, flag) {
    this._visibleMapHpGauges[windowId] = flag;
  };

  // ＨＰゲージウィンドウの表示位置を変更する
  Game_System.prototype.setMapHpGaugePosition = function(x, y) {
    this._mapHpGaugeWindowX = x;
    this._mapHpGaugeWindowY = y;
  };

  // ＨＰゲージウィンドウのＸ座標を返す
  Game_System.prototype.mapHpGaugeX = function() {
    if (this._mapHpGaugeWindowX == null) {
      return windowPosition.x;
    }
    return this._mapHpGaugeWindowX;
  };

  // ＨＰゲージウィンドウのＹ座標を返す
  Game_System.prototype.mapHpGaugeY = function() {
    if (this._mapHpGaugeWindowY == null) {
      return windowPosition.y;
    }
    return this._mapHpGaugeWindowY;
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'showHpGauge') {
      if (args[0]) {
        var windowId = ['A', 'B', 'C', 'D'].indexOf(args[0]);
        $gameSystem.setVisibleMapHpGauge(windowId, true);
      } else {
        $gameSystem.setVisibleMapHpWindow(true);
      }
    } else if (command === 'hideHpGauge') {
      if (args[0]) {
        var windowId = ['A', 'B', 'C', 'D'].indexOf(args[0]);
        $gameSystem.setVisibleMapHpGauge(windowId, false);
      } else {
        $gameSystem.setVisibleMapHpWindow(false);
      }
    } else if (command === 'moveHpGaugeWindow') {
      $gameSystem.setMapHpGaugePosition(+args[0], +args[1]);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_MapHpGauge
  //

  function Window_MapHpGauge() {
    this.initialize.apply(this, arguments);
  }

  Window_MapHpGauge.prototype = Object.create(Window_Base.prototype);
  Window_MapHpGauge.prototype.constructor = Window_MapHpGauge;

  Window_MapHpGauge.prototype.initialize = function(windowId) {
    Window_Base.prototype.initialize.call(this, 0, 0, windowPosition.width, windowPosition.height);
    this._windowId = windowId;
    this.initMembers();
    this.refreshPosition();
    this.openness = (this.isVisible() ? 255 : 0);
    this.opacity = windowOpacity;
  };

  Window_MapHpGauge.prototype.initMembers = function() {
    this._actorId = -1;
    this._name = '';
    this._icons = [];
    this._gold = 0;
    this._shakeDuration = 0;
    this._needFaceRefresh = false;
    this._hideCount = 0;
    this._gaugeParams = [];
    this._gaugeVisible = [];
    for (var i = 0; i < gauges.length; i++) {
      this._gaugeParams[i] = {param: -1, max: -1};
      this._gaugeVisible[i] = $gameSystem.isVisibleMapHpGauge(i);
    }
  };

  Window_MapHpGauge.prototype.lineHeight = function() {
    return this._lineHeight || 36;
  };

  Window_MapHpGauge.prototype.standardPadding = function() {
    return 0;
  };

  Window_MapHpGauge.prototype.actor = function() {
    return $gameParty.members()[this._windowId];
  };

  Window_MapHpGauge.prototype.baseX = function() {
    return this._baseX;
  };

  Window_MapHpGauge.prototype.refreshPosition = function() {
    if (SceneManager.isNextScene(Scene_Battle)) {
      this.x = gaugeWindowBattleX;
      this.y = gaugeWindowBattleY;
    } else {
      this.x = $gameSystem.mapHpGaugeX();
      this.y = $gameSystem.mapHpGaugeY();
    }
    this.x += gaugeWindowSpaceX * this._windowId;
    this.y += gaugeWindowSpaceY * this._windowId;
    this._baseX = this.x;
  };

  Window_MapHpGauge.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this.isVisible()) {
      this.open();
      if (this.isNeedRefresh()) {
        this.refresh();
      }
      this.updateShake();
      this.updateOpacity();
    } else {
      this.close();
    }
  };

  Window_MapHpGauge.prototype.isVisible = function() {
    if (!$gameSystem.isVisibleMapHpWindow() || !this.actor()) {
      return false;
    }
    if ($gameParty.inBattle()) return true;
    if ((eventBusyHide && $gameMap.isEventRunning()) ||
        (messageBusyHide && $gameMessage.isBusy())) {
      this._hideCount++;
    } else {
      this._hideCount = 0;
    }
    return this._hideCount < 10;
  };

  // 各種パラメータを更新し、再描画の必要があるかどうかを返す
  Window_MapHpGauge.prototype.isNeedRefresh = function() {
    var result = (this._needFaceRefresh && this.isFaceBitmapLoaded());
    var actor = this.actor();
    if (actor) {
      if (this._actorId !== actor.actorId()) {
        this._actorId = actor.actorId();
        result = true;
      }
      for (var i = 0; i < gauges.length; i++) {
        if (this._gaugeVisible[i] !== $gameSystem.isVisibleMapHpGauge(i)) {
          this._gaugeVisible[i] = !this._gaugeVisible[i];
          result = true;
        }
        var gaugeParam = this._gaugeParams[i];
        switch (gauges[i].type) {
        case 'HP':
          if (gaugeParam.param !== actor.hp || gaugeParam.max !== actor.mhp) {
            if (gaugeParam.param > actor.hp) {
              this._shakeDuration = shakeTime;
            }
            this._gaugeParams[i].param = actor.hp;
            this._gaugeParams[i].max = actor.mhp;
            result = true;
          }
          break;
        case 'MP':
          if (gaugeParam.param !== actor.mp || gaugeParam.max !== actor.mmp) {
            this._gaugeParams[i].param = actor.mp;
            this._gaugeParams[i].max = actor.mmp;
            result = true;
          }
          break;
        case 'TP':
          if (gaugeParam.param !== actor.tp || gaugeParam.max !== actor.maxTp()) {
            this._gaugeParams[i].param = actor.tp;
            this._gaugeParams[i].max = actor.maxTp();
            result = true;
          }
          break;
        case 'LV':
          if (gaugeParam.param !== actor.currentExp() || gaugeParam.max !== actor.nextLevelExp() ||
              gaugeParam.subParam !== actor.level) {
            this._gaugeParams[i].param = actor.currentExp();
            this._gaugeParams[i].max = actor.nextLevelExp();
            this._gaugeParams[i].subParam = actor.level;
            result = true;
          }
          break;
        case 'VN':
          if (gaugeParam.param !== $gameVariables.value(gauges[i].param + this._windowId) ||
              gaugeParam.max !== $gameVariables.value(gauges[i].max + this._windowId)) {
            this._gaugeParams[i].param = $gameVariables.value(gauges[i].param + this._windowId);
            this._gaugeParams[i].max = $gameVariables.value(gauges[i].max + this._windowId);
            result = true;
          }
          break;
        }
      }
      if (statePosition.width > 0) {
        var icons = actor.stateIcons().concat(actor.buffIcons());
        if (this._icons.toString() !== icons.toString()) {
          this._icons = icons;
          result = true;
        }
      }
      if (namePosition.width > 0 && this._name !== actor.name()) {
        this._name = actor.name();
        result = true;
      }
      if (goldPosition.width > 0 && (goldDisplay === this._windowId || goldDisplay === -1) &&
          this._gold !== $gameParty.gold()) {
        this._gold = $gameParty.gold();
        result = true;
      }
    }
    return result;
  };

  // 振動の更新
  Window_MapHpGauge.prototype.updateShake = function() {
    if (this._shakeDuration > 0) {
      this._shakeDuration--;
      this.x = this._baseX;
      if (this._shakeDuration > 0) {
        this.x += Math.floor(Math.sin((this._shakeDuration % 10) * Math.PI / 5) * 8);
      }
    }
  };

  // 不透明度の更新（ウィンドウとプレイヤーが重なっていれば不透明度変更する）
  Window_MapHpGauge.prototype.updateOpacity = function() {
    if (!$gameParty.inBattle() &&
        this.x < $gamePlayer.screenX() + 24 &&
        this.x + windowPosition.width > $gamePlayer.screenX() - 24 &&
        this.y < $gamePlayer.screenY() &&
        this.y + windowPosition.height > $gamePlayer.screenY() - 48) {
      this.opacity = Math.min(collideOpacity, windowOpacity);
      this.contentsOpacity = collideOpacity;
    } else {
      this.opacity = windowOpacity;
      this.contentsOpacity = 255;
    }
  };

  Window_MapHpGauge.prototype.refresh = function() {
    this.contents.clear();
    if (this.actor()) {
      this.refreshFace();
      this.drawGauges();
      this.drawStateIcons();
      this.drawName();
      this.drawGold();
    }
  };

  Window_MapHpGauge.prototype.drawGauges = function() {
    var actor = this.actor();
    for (var i = 0; i < gauges.length; i++) {
      if (!$gameSystem.isVisibleMapHpGauge(i)) {
        continue;
      }
      var gauge = gauges[i];
      var x = gauge.x;
      var y = gauge.y;
      var width = gauge.width;
      this._lineHeight = gauge.height;
      this.contents.fontSize = gauge.fontSize;
      switch (gauge.type) {
      case 'HP':
        this.drawActorHp(actor, x, y, width);
        break;
      case 'MP':
        this.drawActorMp(actor, x, y, width);
        break;
      case 'TP':
        this.drawActorTp(actor, x, y, width);
        break;
      case 'LV':
        this.drawLvGauge(actor, gauge);
        break;
      case 'VN':
        this.drawVnGauge(this._gaugeParams[i], gauge);
        break;
      }
    }
    this._lineHeight = 36;
  };

  // ステートアイコンの描画
  Window_MapHpGauge.prototype.drawStateIcons = function() {
    for (var i = 0; i < statePosition.width; i++) {
      if (this._icons[i]) {
        var x = statePosition.x + i * Window_Base._iconWidth;
        this.drawIcon(this._icons[i], x, statePosition.y);
      }
    }
  };

  // アクター名の描画
  Window_MapHpGauge.prototype.drawName = function() {
    if (namePosition.width > 0) {
      var x = namePosition.x;
      var y = namePosition.y;
      var width = namePosition.width;
      this.contents.fontSize = namePosition.fontSize;
      this.changeTextColor(this.hpColor(this.actor()));
      this.drawText(this._name, x, y, width);
      this.resetFontSettings();
    }
  };

  // 所持金の描画
  Window_MapHpGauge.prototype.drawGold = function() {
    if (goldPosition.width > 0 && (goldDisplay === this._windowId || goldDisplay === -1)) {
      var x = goldPosition.x;
      var y = goldPosition.y;
      var width = goldPosition.width;
      this.contents.fontSize = goldPosition.fontSize;
      this.drawCurrencyValue(this._gold, TextManager.currencyUnit, x, y, width);
      this.resetFontSettings();
    }
  };

  // レベルと経験値ゲージの描画
  Window_MapHpGauge.prototype.drawLvGauge = function(actor, gauge) {
    var color = this.normalColor();
    var width = this.textWidth(TextManager.levelA) + 4;
    if (actor.isMaxLevel()) {
      var value1 = '-------';
      var value2 = '-------';
      var rate = 1;
    } else {
      var n = actor.currentLevelExp();
      var value1 = actor.currentExp() - n;
      var value2 = actor.nextLevelExp() - n;
      var rate = value1 / value2;
    }
    this.drawGauge(gauge.x, gauge.y, gauge.width, rate, gauge.color[0], gauge.color[1]);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.levelA, gauge.x, gauge.y, 44);
    this.changeTextColor(color);
    this.drawText(actor.level, gauge.x + width, gauge.y, 44)
    width = gauge.width - width - this.textWidth('' + actor.level);
    this.drawCurrentAndMax(value1, value2, gauge.x + gauge.width - width, gauge.y, width, color, color);
  };
  
  // 変数ゲージの描画
  Window_MapHpGauge.prototype.drawVnGauge = function(params, gauge) {
    var rate = params.max === 0 ? 0 : params.param / params.max;
    this.drawGauge(gauge.x, gauge.y, gauge.width, rate, gauge.color[0], gauge.color[1]);
    this.changeTextColor(this.systemColor());
    this.drawText(gauge.name, gauge.x, gauge.y, this.textWidth(gauge.name));
    this.changeTextColor(this.normalColor());
    if (vnMax) {
      this.drawVnCurrentAndMax(gauge.name, params.param, params.max,
                               gauge.x, gauge.y, gauge.width);
    } else {
      this.drawText(params.param, gauge.x + gauge.width - 64, gauge.y, 64, 'right');
    }
  };
  
  // 変数の現在値と最大値を描画する
  Window_MapHpGauge.prototype.drawVnCurrentAndMax = function(name, current, max, x, y, width) {
    var labelWidth = this.textWidth(name);
    var valueWidth = this.textWidth('0' + max);
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;
    this.changeTextColor(this.normalColor());
    if (x3 >= x + labelWidth) {
      this.drawText(current, x3, y, valueWidth, 'right');
      this.drawText('/', x2, y, slashWidth, 'right');
      this.drawText(max, x1, y, valueWidth, 'right');
    } else {
      this.drawText(current, x1, y, valueWidth, 'right');
    }
  };

  // 顔グラフィックの再描画
  Window_MapHpGauge.prototype.refreshFace = function() {
    var width = facePosition.width;
    if (width > 0) {
      this._needFaceRefresh = !this.isFaceBitmapLoaded();
      if (!this._needFaceRefresh) {
        var actor = this.actor();
        var x = facePosition.x;
        var y = facePosition.y;
        var height = Math.min(windowPosition.height, facePosition.height);
        this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
      }
    }
  };

  // 顔グラフィックの読み込みが完了しているかを返す
  Window_MapHpGauge.prototype.isFaceBitmapLoaded = function() {
    var bitmap = ImageManager.loadFace(this.actor().faceName());
    return bitmap.width > 0;
  };

  //-----------------------------------------------------------------------------
  // Scene_Base
  //

  Scene_Base.prototype.createMapHpGaugeWindow = function() {
    this._mapHpGaugeWindows = [];
    for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
      var gaugeWindow = new Window_MapHpGauge(i);
      this._mapHpGaugeWindows.push(gaugeWindow);
      this.addChild(gaugeWindow);
    }
  };

  Scene_Base.prototype.hideMapHpGaugeWindows = function() {
    if (this._mapHpGaugeWindows) {
      this._mapHpGaugeWindows.forEach(function(gaugeWindow) {
        gaugeWindow.hide();
      });
    }
  };

  var _Scene_Base_terminate = Scene_Base.prototype.terminate;
  Scene_Base.prototype.terminate = function() {
    _Scene_Base_terminate.call(this);
    if (this._mapHpGaugeWindows) {
      this._mapHpGaugeWindows.forEach(function(gaugeWindow) {
        this.removeChild(gaugeWindow);
      }, this);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);
    this.createMapHpGaugeWindow();
  };

  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    if (!SceneManager.isNextScene(Scene_Battle)) {
      this.hideMapHpGaugeWindows();
    }
    _Scene_Map_terminate.call(this);
  };
  
  var _Scene_Map_launchBattle = Scene_Map.prototype.launchBattle;
  Scene_Map.prototype.launchBattle = function() {
    this.hideMapHpGaugeWindows();
    _Scene_Map_launchBattle.call(this);
  };
  
  var _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this);
    if ($gameSystem.mapHpGaugeX() !== this._mapHpGaugeWindows[0].baseX() ||
        $gameSystem.mapHpGaugeY() !== this._mapHpGaugeWindows[0].y) {
      this._mapHpGaugeWindows.forEach(function(gaugeWindow) {
        gaugeWindow.refreshPosition();
      });
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Battle
  //

  var _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
  Scene_Battle.prototype.createDisplayObjects = function() {
    _Scene_Battle_createDisplayObjects.call(this);
    if (useBattleScene) {
      this.createMapHpGaugeWindow();
    }
  };

})();