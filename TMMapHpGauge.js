//=============================================================================
// TMPlugin - マップＨＰゲージ
// バージョン: 1.4.4
// 最終更新日: 2019/11/04
// 配布元    : https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc Displays face graphics and HP gauges on the map scene.
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
TMPlugin - Map HP Gauge ver1.4.4

How to Use:

Adjust the plugin parameters to display your preferred HP gauge.

This plugin has been tested with RPG Maker MV Version 1.6.2.

This plugin is distributed under the MIT License and is free for commercial use, modification, and redistribution.

Plugin Commands:

showHpGauge
Displays the HP gauge window.
If the plugin parameter startVisible is 0,
the HP gauge will not be displayed until this command is executed.

showHpGauge A
Displays Gauge A. If the type is set in the plugin parameter,
it will automatically be displayed when the game starts.

hideHpGauge
Hides the HP gauge window. It will remain hidden until the showHpGauge command is executed.

hideHpGauge B
Hides Gauge B. It will remain hidden until the showHpGauge B command is executed.

moveHpGaugeWindow 100 200
Moves the HP gauge window to the X coordinate = 100 / Y coordinate = 200 position.

Plugin Parameter Notes:

gaugeA - gaugeD

param
If the gauge type is VN, set the game variable number to be treated as the current value of the gauge.

max
If the gauge type is VN, specify the game variable number to be treated as the maximum value of the gauge.
The maximum value will only be achieved by assigning a value to the game variable with the number set in this parameter.
This setting only affects the length of the gauge; it does not prevent the variable value from exceeding the maximum value.

windowOpacity / collideOpacity
windowOpacity affects the window frame and background, while collideOpacity affects the gauge and face graphics.
If the windowOpacity value is lower than collideOpacity, the windowOpacity value will be used as the opacity when overlapping with the player.
However, the collideOpacity value applies as usual to the gauge and face graphic.

faceOffsetX
Setting this value to -1000 will hide the face graphic.

vnMax
If the value is true, the maximum value will also be displayed. However, if there is not enough space to display both the current and maximum values (i.e., the gauge is too short), only the current value will be displayed, regardless of the vnMax setting.

@param gaugeWindowX
@desc HP gauge window X coordinate Initial value: 0
@default 0
@type number
@min -1000

@param gaugeWindowY
@desc Y coordinate of HP gauge window Initial value: 0
@default 0
@type number
@min -1000

@param gaugeWindowWidth
@desc HP Gauge Window Width Default: 288
@default 288
@type number

@param gaugeWindowHeight
@desc HP Gauge Window Height Default: 64
@default 64
@type number

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

@param faceOffsetX
@desc X coordinate offset value for face graphics. Default: -4 (-1000 means no face graphics are used).
@default -4
@type number
@min -1000

@param faceOffsetY
@desc Y coordinate correction value for face graphics Initial value: -4
@default -4
@type number
@min -1000

@param stateIconMax
@desc Number of state icons to display Default: 4
@default 4
@type number

@param stateIconX
@desc State icon X coordinate Default: 156
@default 156
@type number
@min -1000

@param stateIconY
@desc State icon Y coordinate Default: 24
@default 24
@type number
@min -1000

@param stateIconScale
@desc State icon magnification (%) Default: 100
@default 100
@type number

@param stateIconOpacity
@desc State icon opacity (0 to 255) Default: 255
@default 255
@type number

@param goldWidth
@desc Width of money display Default: 0 (0 = no display)
@default 0
@type number

@param goldX
@desc X coordinate of money display Default: 12
@default 12
@type number
@min -9999

@param goldY
@desc Y coordinate of money display Default: 12
@default 12
@type number
@min -1000

@param vnMax
@desc Whether to display the maximum value of the gauge type VN. Default: OFF (true = ON - displayed / false = OFF - hidden)
@default false
@type boolean

@param shakeTime
@desc Time (frames) to shake the window when taking damage. Default: 20 (0 means no shaking).
@default 20
@type number

@param startVisible
@desc Display state at the start of the game Default: ON (true = ON Display / false = OFF Hidden)
@default true
@type boolean

@param windowOpacity
@desc HP Gauge Window Opacity Default: 255
@default 255
@type number

@param collideOpacity
@desc Opacity when overlapping with the player Initial value: 128 (0 to 255)
@default 128
@type number
@max 255

@param messageBusyHide
@desc Hide the HP gauge window while the message window is displayed. Default: ON ( true = ON hide / false = OFF do not hide )
@default true
@type boolean

@param eventBusyHide
@desc Hide the HP gauge window while an event is running. Default: ON (true = ON hide / false = OFF do not hide)
@default true
@type boolean

@param useBattleScene
@desc Displays the HP gauge window even during battles. Default: OFF (true = ON - Show / false = OFF - Hide)
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
@desc Gauge type (HP / MP / TP / LV / VN) Initial value: HP
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
@desc Height of the gauge display area (including the value and the gauge) Initial value: 36
@default 36
@type number

@param fontSize
@desc Font size default: 28
@default 28
@type number

@param param
@desc Game variable number to be used as the current value when the gauge type is VN. Initial value: 0
@default 0
@type variable

@param max
@desc Game variable number to be the maximum value when the gauge type is VN. Initial value: 0
@default 0
@type variable

@param name
@desc Parameter name to display when the gauge type is VN. Default: AP
@default AP
@type string

@param color
@desc Gauge color when the gauge type is LV/VN Default: #ff60c0 #ffa0e0
@default #ff60c0 #ffa0e0
@type string
*/


/*:ja
@plugindesc マップシーンに顔グラフィックとＨＰゲージを表示します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - マップＨＰゲージ ver1.4.4

使い方:

  プラグインパラメータをいじってお好みのＨＰゲージを表示してください。

  このプラグインは RPGツクールMV Version 1.6.2 で動作確認をしています。

  このプラグインはMITライセンスのもとに配布しています、商用利用、
  改造、再配布など、自由にお使いいただけます。


プラグインコマンド:

  showHpGauge
    ＨＰゲージウィンドウを表示します。
    プラグインパラメータ startVisible が 0 の場合、
    このコマンドが実行されるまでＨＰゲージは表示されません。

  showHpGauge A
    ゲージＡを表示します。プラグインパラメータでタイプが設定されている場合、
    ゲーム開始時に自動的に表示状態になります。

  hideHpGauge
    ＨＰゲージウィンドウを隠します。showHpGauge コマンドが実行されるまで
    表示されないままです。

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

    max
      ゲージのタイプが VN の場合に、ゲージの最大値として扱う
      ゲーム変数番号を指定してください。
      このパラメータに設定した番号のゲーム変数に値を代入することで、
      初めて最大値として機能します。
      この設定はゲージの長さにのみ影響します、変数の値が最大値を
      超えなくなるような機能はありません。

  windowOpacity / collideOpacity
    windowOpacity はウィンドウフレーム及び背景に影響し、collideOpacity
    はゲージや顔グラフィックにも影響します。
    windowOpacity の値が collideOpacity よりも低い場合、プレイヤーと
    重なった際の不透明度として windowOpacity の値が適用されます。
    ただし、ゲージと顔グラフィックに関しては通常どおり collideOpacity の
    値が適用されます。

  faceOffsetX
    この値を -1000 に設定すると顔グラフィックが非表示となります。

  vnMax
    値が true なら最大値も表示しますが、現在値と最大値を表示するための
    スペースが足りない（ゲージの長さが短い）場合は vnMax の設定に関わらず
    強制的に現在値のみの表示になります。

@param gaugeWindowX
@desc ＨＰゲージウィンドウのＸ座標 初期値: 0
@default 0
@type number
@min -1000

@param gaugeWindowY
@desc ＨＰゲージウィンドウのＹ座標 初期値: 0
@default 0
@type number
@min -1000

@param gaugeWindowWidth
@desc ＨＰゲージウィンドウの幅 初期値: 288
@default 288
@type number

@param gaugeWindowHeight
@desc ＨＰゲージウィンドウの高さ 初期値: 64
@default 64
@type number

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

@param faceOffsetX
@desc 顔グラフィックのＸ座標補正値 初期値: -4 ( -1000 で顔グラフィックを使用しない)
@default -4
@type number
@min -1000

@param faceOffsetY
@desc 顔グラフィックのＹ座標補正値 初期値: -4
@default -4
@type number
@min -1000

@param stateIconMax
@desc ステートアイコンを表示する個数 初期値: 4
@default 4
@type number

@param stateIconX
@desc ステートアイコンのＸ座標 初期値: 156
@default 156
@type number
@min -1000

@param stateIconY
@desc ステートアイコンのＹ座標 初期値: 24
@default 24
@type number
@min -1000

@param stateIconScale
@desc ステートアイコンの拡大率（ % ） 初期値: 100
@default 100
@type number

@param stateIconOpacity
@desc ステートアイコンの不透明度（ 0 ~ 255 ） 初期値: 255
@default 255
@type number

@param goldWidth
@desc 所持金表示の幅 初期値: 0 ( 0 で非表示 )
@default 0
@type number

@param goldX
@desc 所持金表示のＸ座標 初期値: 12
@default 12
@type number
@min -9999

@param goldY
@desc 所持金表示のＹ座標 初期値: 12
@default 12
@type number
@min -1000

@param vnMax
@desc ゲージタイプ VN の最大値を表示するかどうか 初期値: OFF ( true = ON 表示 / false = OFF 非表示 )
@default false
@type boolean

@param shakeTime
@desc ダメージを受けたときにウィンドウを揺らす時間（フレーム） 初期値: 20 ( 0 で揺らさない )
@default 20
@type number

@param startVisible
@desc ゲーム開始時の表示状態 初期値: ON（ true = ON 表示 / false = OFF 非表示 ）
@default true
@type boolean

@param windowOpacity
@desc ＨＰゲージウィンドウの不透明度 初期値: 255
@default 255
@type number

@param collideOpacity
@desc プレイヤーと重なったときの不透明度 初期値: 128（ 0 ～ 255 ）
@default 128
@type number
@max 255

@param messageBusyHide
@desc メッセージウィンドウ表示中はＨＰゲージウィンドウを隠す 初期値: ON ( true = ON 隠す / false = OFF 隠さない )
@default true
@type boolean

@param eventBusyHide
@desc イベント起動中はＨＰゲージウィンドウを隠す 初期値: ON（ true = ON 隠す / false = OFF 隠さない )
@default true
@type boolean

@param useBattleScene
@desc 戦闘シーンでもＨＰゲージウィンドウを表示する。 初期値: OFF（ true = ON 表示 / false = OFF 非表示 )
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
@desc ゲージのタイプ（HP / MP / TP / LV / VN） 初期値: HP
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
@desc ゲージのタイプが VN のときに現在値とするゲーム変数番号 初期値: 0
@default 0
@type variable

@param max
@desc ゲージのタイプが VN のときに最大値とするゲーム変数番号 初期値: 0
@default 0
@type variable

@param name
@desc ゲージのタイプが VN のときに表示するパラメータ名 初期値: AP
@default AP
@type string

@param color
@desc ゲージのタイプが LV / VN のときのゲージカラー 初期値: #ff60c0 #ffa0e0
@default #ff60c0 #ffa0e0
@type string
*/

var Imported = Imported || {};
Imported.TMMapHpGauge = true;

(function() {

	var parameters = PluginManager.parameters('TMMapHpGauge');
	var gaugeWindowX = +(parameters['gaugeWindowX'] || 0);
	var gaugeWindowY = +(parameters['gaugeWindowY'] || 0);
	var gaugeWindowWidth = +(parameters['gaugeWindowWidth'] || 288);
	var gaugeWindowHeight = +(parameters['gaugeWindowHeight'] || 64);
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
	var faceOffsetX = +(parameters['faceOffsetX'] || -4);
	var faceOffsetY = +(parameters['faceOffsetY'] || -4);
	var stateIconMax = +(parameters['stateIconMax'] || 4);
	var stateIconX = +(parameters['stateIconX'] || 156);
	var stateIconY = +(parameters['stateIconY'] || 24);
	var stateIconScale = +(parameters['stateIconScale'] || 100);
	var stateIconOpacity = +(parameters['stateIconOpacity'] || 255);
	var goldWidth = +(parameters['goldWidth'] || 0);
	var goldX = +(parameters['goldX'] || 0);
	var goldY = +(parameters['goldY'] || 0);
	var vnMax = JSON.parse(parameters['vnMax'] || 'false');
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

	Game_System.prototype.isVisibleMapHpGauge = function() {
		if (this._visibleMapHpGauge == null) this._visibleMapHpGauge = startVisible;
		return this._visibleMapHpGauge;
	};
	
	Game_System.prototype.setVisibleMapHpGauge = function(flag) {
		this._visibleMapHpGauge = flag;
	};

	Game_System.prototype.isVisibleMapHpGauges = function(gaugeId) {
		if (this._visibleMapHpGauges == null) {
			this._visibleMapHpGauges = [];
			for (var i = 0; i < gauges.length; i++) {
				this._visibleMapHpGauges[i] = gauges[i].type !== '';
			}
		}
		return this._visibleMapHpGauges[gaugeId];
	};

	Game_System.prototype.setVisibleMapHpGauges = function(gaugeId, flag) {
		this._visibleMapHpGauges[gaugeId] = flag;
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'showHpGauge') {
			if (args[0]) {
				var gaugeId = ['A', 'B', 'C', 'D'].indexOf(args[0]);
				$gameSystem.setVisibleMapHpGauges(gaugeId, true);
			} else {
				$gameSystem.setVisibleMapHpGauge(true);
			}
		} else if (command === 'hideHpGauge') {
			if (args[0]) {
				var gaugeId = ['A', 'B', 'C', 'D'].indexOf(args[0]);
				$gameSystem.setVisibleMapHpGauges(gaugeId, false);
			} else {
				$gameSystem.setVisibleMapHpGauge(false);
			}
		} else if (command === 'moveHpGaugeWindow') {
			$gameSystem._mapHpGaugeWindowX = +args[0];
			$gameSystem._mapHpGaugeWindowY = +args[1];
			if (SceneManager._scene._mapHpGaugeWindow) {
				SceneManager._scene._mapHpGaugeWindow.x = +args[0];
				SceneManager._scene._mapHpGaugeWindow.y = +args[1];
				SceneManager._scene._mapHpGaugeWindow._baseX = +args[0];
			}
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

	Window_MapHpGauge.prototype.initialize = function() {
		if (SceneManager.isNextScene(Scene_Battle)) {
			var x = gaugeWindowBattleX;
			var y = gaugeWindowBattleY;
		} else {
			var x = $gameSystem._mapHpGaugeWindowX != null ? $gameSystem._mapHpGaugeWindowX : gaugeWindowX;
			var y = $gameSystem._mapHpGaugeWindowY != null ? $gameSystem._mapHpGaugeWindowY : gaugeWindowY;
		}
		var wight = gaugeWindowWidth;
		var height = gaugeWindowHeight;
		Window_Base.prototype.initialize.call(this, x, y, wight, height);
		this.openness = $gameSystem.isVisibleMapHpGauge() ? 255 : 0;
		this.opacity = windowOpacity;
		this._gaugeParams = [];
		this._gaugeVisible = [];
		for (var i = 0; i < gauges.length; i++) {
			this._gaugeParams.push({param: -1, max: -1});
			this._gaugeVisible[i] = $gameSystem.isVisibleMapHpGauges(i);
		}
		this._icons = [];
		this._gold = 0;
		this._actorId = -1;
		this._faceName = '';
		this._faceIndex = '';
		this._shakeDuration = 0;
		this._baseX = x;
		this._needFaceRefresh = false;
		this._hideCount = 0;
	};

	Window_MapHpGauge.prototype.lineHeight = function() {
		return this._lineHeight || 36;
	};

	Window_MapHpGauge.prototype.standardPadding = function() {
		return 0;
	};

	Window_MapHpGauge.prototype.setShake = function(power) {
		this._shakeDuration = power;
	};

	Window_MapHpGauge.prototype.update = function() {
		Window_Base.prototype.update.call(this);
		if (this.updateVisibility()) {
			this.open();
			if (this.isNeedRefresh()) {
				var actor = $gameParty.leader();
				for (var i = 0; i < gauges.length; i++) {
					this._gaugeVisible[i] = $gameSystem.isVisibleMapHpGauges(i);
					var gauge = gauges[i];
					if (gauge.type === 'HP') {
						this._gaugeParams[i].param = actor.hp;
						this._gaugeParams[i].max = actor.mhp;
					} else if (gauge.type === 'MP') {
						this._gaugeParams[i].param = actor.mp;
						this._gaugeParams[i].max = actor.mmp;
					} else if (gauge.type === 'TP') {
						this._gaugeParams[i].param = actor.tp;
						this._gaugeParams[i].max = actor.maxTp();
					} else if (gauge.type === 'LV') {
						this._gaugeParams[i].param = actor.currentExp();
						this._gaugeParams[i].max = actor.nextLevelExp();
						this._gaugeParams[i].subParam = actor.level;
					} else if (gauge.type === 'VN') {
						this._gaugeParams[i].param = $gameVariables.value(gauge.param);
						this._gaugeParams[i].max = $gameVariables.value(gauge.max);
					}
				}
				this._icons = actor.stateIcons().concat(actor.buffIcons());
				this._gold = $gameParty.gold();
				this._actorId = actor.actorId();
				this._faceName = actor.faceName();
				this._faceIndex = actor.faceIndex();
				this.refresh();
			}
			this.updateShake();
			this.updateOpacity();
		} else {
			this.close();
		}
	};

	Window_MapHpGauge.prototype.updateVisibility = function() {
		if (!$gameSystem.isVisibleMapHpGauge()) {
			return false;
		}
		if ($gameParty.inBattle()) {
			return true;
		}
		if ((eventBusyHide && $gameMap.isEventRunning()) ||
				(messageBusyHide && $gameMessage.isBusy())) {
			this._hideCount++;
		} else {
			this._hideCount = 0;
		}
		return this._hideCount < 10 && $gameParty.leader();
	};

	Window_MapHpGauge.prototype.isNeedRefresh = function() {
		var actor = $gameParty.leader();
		if (actor) {
			var result = false;
			if (this._actorId !== actor.actorId()) {
				this.setShake(1);
				return true;
			}
			for (var i = 0; i < gauges.length; i++) {
				if (this._gaugeVisible[i] !== $gameSystem.isVisibleMapHpGauges(i)) {
					result = true;
				}
				var gauge = gauges[i];
				var gaugeParam = this._gaugeParams[i];
				if (gauge.type === 'HP') {
					if (gaugeParam.param !== actor.hp || gaugeParam.max !== actor.mhp) {
						if (gaugeParam.param > actor.hp) {
							this.setShake(shakeTime);
						}
						result = true;
					}
				} else if (gauge.type === 'MP') {
					if (gaugeParam.param !== actor.mp || gaugeParam.max !== actor.mmp) {
						result = true;
					}
				} else if (gauge.type === 'TP') {
					if (gaugeParam.param !== actor.tp || gaugeParam.max !== actor.maxTp()) {
						result = true;
					}
				} else if (gauge.type === 'LV') {
					if (gaugeParam.param !== actor.currentExp() ||
							gaugeParam.max !== actor.nextLevelExp() ||
							gaugeParam.subParam !== actor.level) {
						result = true;
					}
				} else if (gauge.type === 'VN') {
					if (gaugeParam.param !== $gameVariables.value(gauge.param) ||
							gaugeParam.max !== $gameVariables.value(gauge.max)) {
						result = true;
					}
				}
			}
			if (stateIconMax > 0) {
				var icons = actor.stateIcons().concat(actor.buffIcons());
				if (this._icons.toString() !== icons.toString()) {
					result = true;
				}
			}
			if (goldWidth > 0 && this._gold !== $gameParty.gold()) {
				result = true;
			}
		}
		if (this._needFaceRefresh) {
			this.refreshFace();
			if (!this._needFaceRefresh) {
				result = true;
			}
		}
		return result;
};

	Window_MapHpGauge.prototype.updateShake = function() {
		if (this._shakeDuration > 0) {
			this._shakeDuration--;
			this.x = this._baseX;
			if (this._shakeDuration > 0) {
				this.x += Math.floor(Math.sin((this._shakeDuration % 10) * Math.PI / 5) * 8);
			}
		}
	};

	Window_MapHpGauge.prototype.updateOpacity = function() {
		if (this.x < $gamePlayer.screenX() + 24 &&
				this.x + gaugeWindowWidth > $gamePlayer.screenX() - 24 &&
				this.y < $gamePlayer.screenY() &&
				this.y + gaugeWindowHeight > $gamePlayer.screenY() - 48) {
			this.opacity = Math.min(collideOpacity, windowOpacity);
			this.contentsOpacity = collideOpacity;
		} else {
			this.opacity = windowOpacity;
			this.contentsOpacity = 255;
		}
	};

	Window_MapHpGauge.prototype.refresh = function() {
		this.contents.clear();
		var actor = $gameParty.leader();
		if (actor) {
			this.refreshFace();
			for (var i = 0; i < gauges.length; i++) {
				if (!$gameSystem.isVisibleMapHpGauges(i)) {
					continue;
				}
				var gauge = gauges[i];
				this._lineHeight = gauge.height;
				this.contents.fontSize = gauge.fontSize;
				if (gauge.type === 'HP') {
					this.drawActorHp(actor, gauge.x, gauge.y, gauge.width);
				} else if (gauge.type === 'MP') {
					this.drawActorMp(actor, gauge.x, gauge.y, gauge.width);
				} else if (gauge.type === 'TP') {
					this.drawActorTp(actor, gauge.x, gauge.y, gauge.width);
				} else if (gauge.type === 'LV') {
					this.drawLvGauge(actor, gauge);
				} else if (gauge.type === 'VN') {
					this.drawVnGauge(this._gaugeParams[i], gauge);
				}
			}
			for (var i = 0; i < stateIconMax; i++) {
				if (!this._icons[i]) break;
				var x = stateIconX + i * Math.floor(Window_Base._iconWidth * stateIconScale / 100);
				this.drawIcon(this._icons[i], x, stateIconY);
			}
			if (goldWidth > 0) {
				this.drawCurrencyValue(this._gold, TextManager.currencyUnit, goldX, goldY, goldWidth);
			}
			this._lineHeight = 36;
		}
	};

	Window_MapHpGauge.prototype.drawIcon = function(iconIndex, x, y) {
		var bitmap = ImageManager.loadSystem('IconSet');
		var pw = Window_Base._iconWidth;
		var ph = Window_Base._iconHeight;
		var sx = iconIndex % 16 * pw;
		var sy = Math.floor(iconIndex / 16) * ph;
		var dw = Math.floor(pw * stateIconScale / 100);
		var dh = Math.floor(ph * stateIconScale / 100);
		var lastPaintOpacity = this.contents.paintOpacity;
		this.contents.paintOpacity = stateIconOpacity;
		this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
		this.contents.paintOpacity = lastPaintOpacity;
	};
	
	Window_MapHpGauge.prototype.drawLvGauge = function(actor, gauge) {
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
		var color = this.normalColor();
		this.changeTextColor(color);
		var width = this.textWidth(TextManager.levelA) + 4;
		this.drawText(actor.level, gauge.x + width, gauge.y, 44)
		width = gauge.width - width - this.textWidth('' + actor.level);
		this.drawCurrentAndMax(value1, value2, gauge.x + gauge.width - width, gauge.y, width, color, color);
	};
	
	Window_MapHpGauge.prototype.drawVnGauge = function(params, gauge) {
		var rate = params.max === 0 ? 0 : params.param / params.max;
		this.drawGauge(gauge.x, gauge.y, gauge.width, rate, gauge.color[0], gauge.color[1]);
		this.changeTextColor(this.systemColor());
		this.drawText(gauge.name, gauge.x, gauge.y, this.textWidth(gauge.name));
		this.changeTextColor(this.normalColor());
		if (vnMax) {
			this.drawVnCurrentAndMax(gauge.name, params.param, params.max, gauge.x, gauge.y, gauge.width);
		} else {
			this.drawText(params.param, gauge.x + gauge.width - 64, gauge.y, 64, 'right');
		}
	};
	
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

	Window_MapHpGauge.prototype.refreshFace = function() {
		if (faceOffsetX === -1000) {
			return;
		}
		var actor = $gameParty.leader();
		var bitmap = ImageManager.loadFace(actor.faceName());
		this._needFaceRefresh = bitmap.width === 0;
		if (!this._needFaceRefresh) {
			var x = gaugeWindowWidth - 144 + faceOffsetX;
			var y = faceOffsetY;
			var height = Math.min(gaugeWindowHeight, 144);
			this.drawFace(actor.faceName(), actor.faceIndex(), x, y, 144, height);
		}
	};

	//-----------------------------------------------------------------------------
	// Scene_Base
	//

	Scene_Base.prototype.createMapHpGaugeWindow = function() {
		this._mapHpGaugeWindow = new Window_MapHpGauge();
		this.addChild(this._mapHpGaugeWindow);
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
		if (!SceneManager.isNextScene(Scene_Battle)) this._mapHpGaugeWindow.hide();
		_Scene_Map_terminate.call(this);
		this.removeChild(this._mapHpGaugeWindow);
	};
	
	var _Scene_Map_launchBattle = Scene_Map.prototype.launchBattle;
	Scene_Map.prototype.launchBattle = function() {
		this._mapHpGaugeWindow.hide();
		_Scene_Map_launchBattle.call(this);
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

	var _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
	Scene_Battle.prototype.terminate = function() {
		_Scene_Battle_terminate.call(this);
		if (this._mapHpGaugeWindow) {
			this.removeChild(this._mapHpGaugeWindow);
		}
	};

})();