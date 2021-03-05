//=============================================================================
// TMPlugin - ボスＨＰゲージ
// バージョン: 1.1.0
// 最終更新日: 2018/09/25
// 配布元　　: https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc マップシーンに任意のイベントのＨＰゲージを表示します。
 * TMJumpAction.jsなどのイベントにHPをもたせるプラグインが必要です。
 *
 * @author tomoaky (https://hikimoki.sakura.ne.jp/)
 *
 * @param gaugeWindowX
 * @type number
 * @min -9999
 * @desc ＨＰゲージウィンドウのＸ座標
 * 初期値: 528
 * @default 528
 *
 * @param gaugeWindowY
 * @type number
 * @min -9999
 * @desc ＨＰゲージウィンドウのＹ座標
 * 初期値: 0
 * @default 0
 *
 * @param gaugeWindowWidth
 * @type number
 * @desc ＨＰゲージウィンドウの幅
 * 初期値: 288
 * @default 288
 *
 * @param gaugeWindowHeight
 * @type number
 * @desc ＨＰゲージウィンドウの高さ
 * 初期値: 72
 * @default 72
 *
 * @param gaugeColor
 * @desc ＨＰゲージの色
 * 初期値: #e48040 #f0c040
 * @default #e48040 #f0c040
 * 
 * @param gaugeValue
 * @type boolean
 * @desc ゲージの右端にＨＰを数値で表示する
 * 初期値: ON ( true = ON 表示 / false = OFF 非表示 )
 * @default true
 * 
 * @param bossName
 * @type boolean
 * @desc ゲージの左端にボスの名前を表示する
 * 初期値: ON ( true = ON 表示 / false = OFF 非表示 )
 * @default true
 * 
 * @param shakeTime
 * @type number
 * @desc ダメージを受けたときにウィンドウを揺らす時間（フレーム）
 * 初期値: 20 ( 0 で揺らさない )
 * @default 20
 *
 * @param windowOpacity
 * @type number
 * @max 255
 * @desc ＨＰゲージウィンドウの不透明度
 * 初期値: 255
 * @default 255
 *
 * @param collideOpacity
 * @type number
 * @max 255
 * @desc プレイヤーと重なったときの不透明度
 * 初期値: 128（ 0 ～ 255 ）
 * @default 128
 *
 * @param messageBusyHide
 * @type boolean
 * @desc メッセージウィンドウ表示中はＨＰゲージウィンドウを隠す
 * 初期値: ON ( true = ON 隠す / false = OFF 隠さない )
 * @default true
 *
 * @param eventBusyHide
 * @type boolean
 * @desc イベント起動中はＨＰゲージウィンドウを隠す
 * 初期値: ON（ true = ON 隠す / false = OFF 隠さない )
 * @default true
 *
 * @help
 * TMPlugin - ボスＨＰゲージ ver1.1.0
 * 
 * 使い方:
 *
 *   TMJumpAction.js / TMShooting.js と併用することで動作します。
 *   プラグインコマンドでイベントを指定、または自動モードに切り替えることで
 *   対象となったイベントのＨＰゲージがマップシーンに表示されます。
 *
 *   このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。
 *
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 * 
 *
 * プラグインコマンド:
 *
 *   setBossHpGauge 1
 *     1 番のイベントをＨＰゲージの対象としてセットする。
 *     このコマンドを実行すると stopAutoBossHpGauge も自動実行されます。
 * 
 *   startAutoBossHpGauge
 *     以降、ダメージ判定のあったイベントを自動的に対象とする。
 * 
 *   stopAutoBossHpGauge
 *     startAutoBossHpGauge の機能を無効化する。
 * 
 *   hideBossHpGauge
 *     ＨＰゲージを隠す。
 * 
 *   showBossHpGauge
 *     hideBossHpGauge で隠したＨＰゲージを表示する。
 * 
 *
 * プラグインパラメータ補足:
 *
 *   windowOpacity / collideOpacity
 *     windowOpacity はウィンドウフレーム及び背景に影響し、collideOpacity
 *     はゲージや文字列にも影響します。
 *     windowOpacity の値が collideOpacity よりも低い場合、プレイヤーと
 *     重なった際の不透明度として windowOpacity の値が適用されます。
 *     ただし、ゲージと文字列に関しては通常どおり collideOpacity の
 *     値が適用されます。
 */

var Imported = Imported || {};
Imported.TMBossHpGauge = true;

(function() {

	var parameters = PluginManager.parameters('TMBossHpGauge');
	var gaugeWindowX = +(parameters['gaugeWindowX'] || 528);
	var gaugeWindowY = +(parameters['gaugeWindowY'] || 0);
	var gaugeWindowWidth = +(parameters['gaugeWindowWidth'] || 288);
	var gaugeWindowHeight = +(parameters['gaugeWindowHeight'] || 64);
	var gaugeColor = (parameters['gaugeColor'] || '#e48040 #f0c040').split(' ');
	var gaugeValue = JSON.parse(parameters['gaugeValue'] || 'true');
	var bossName = JSON.parse(parameters['bossName'] || 'true');
	var shakeTime = +(parameters['shakeTime'] || 20);
	var windowOpacity = +(parameters['windowOpacity'] || 255);
	var collideOpacity = +(parameters['collideOpacity'] || 128);
	var messageBusyHide = JSON.parse(parameters['messageBusyHide'] || 'true');
	var eventBusyHide = JSON.parse(parameters['eventBusyHide'] || 'true');

	//-----------------------------------------------------------------------------
	// Game_System
	//

	var _Game_System_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		_Game_System_initialize.call(this);
		this._visibleBossHpGauge = true;
		this._autoBossHpGauge = false;
		this._bossHpGaugeEventId = 0;
		this._bossHpGaugeMapId = 0;
	};

	Game_System.prototype.isVisibleBossHpGauge = function() {
		return this._visibleBossHpGauge;
	};

	Game_System.prototype.isAutoBossHpGauge = function() {
		return this._autoBossHpGauge;
	};

	Game_System.prototype.bossHpGaugeEventId = function() {
		return this._bossHpGaugeEventId;
	};
	
	Game_System.prototype.bossHpGaugeMapId = function() {
		return this._bossHpGaugeMapId;
	};
	
	Game_System.prototype.setVisibleBossHpGauge = function(flag) {
		this._visibleBossHpGauge = flag;
	};

	Game_System.prototype.setAutoBossHpGauge = function(flag) {
		this._autoBossHpGauge = flag;
	};

	Game_System.prototype.setBossHpGaugeEventId = function(eventId) {
		this._bossHpGaugeEventId = eventId;
		this._bossHpGaugeMapId = $gameMap.mapId();
	};

	//-----------------------------------------------------------------------------
	// Game_Bullet
	//

	var _Game_Bullet_executeDamage = Game_Bullet.prototype.executeDamage;
	Game_Bullet.prototype.executeDamage = function(character) {
		_Game_Bullet_executeDamage.call(this, character);
		if ($gameSystem.isAutoBossHpGauge() && character.eventId() > 0 &&
				character.battler()) {
			$gameSystem.setBossHpGaugeEventId(character.eventId());
		}
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'setBossHpGauge') {
			$gameSystem.setBossHpGaugeEventId(+args[0]);
			$gameSystem.setAutoBossHpGauge(false);
		} else if (command === 'startAutoBossHpGauge') {
			$gameSystem.setAutoBossHpGauge(true);
		} else if (command === 'stopAutoBossHpGauge') {
			$gameSystem.setAutoBossHpGauge(false);
		} else if (command === 'hideBossHpGauge') {
			$gameSystem.setVisibleBossHpGauge(false);
		} else if (command === 'showBossHpGauge') {
			$gameSystem.setVisibleBossHpGauge(true);
		}
	};

	//-----------------------------------------------------------------------------
	// Window_BossHpGauge
	//

	function Window_BossHpGauge() {
		this.initialize.apply(this, arguments);
	}

	Window_BossHpGauge.prototype = Object.create(Window_Base.prototype);
	Window_BossHpGauge.prototype.constructor = Window_BossHpGauge;

	Window_BossHpGauge.prototype.initialize = function() {
		var x = gaugeWindowX;
		var y = gaugeWindowY;
		var wight = gaugeWindowWidth;
		var height = gaugeWindowHeight;
		Window_Base.prototype.initialize.call(this, x, y, wight, height);
		this.openness = 0;
		this.opacity = windowOpacity;
		this._shakeDuration = 0;
		this._baseX = x;
		this._eventId = 0;
		this._hp = 0;
		this._mhp = 0;
		this._hideCount = 0;
		if ($gameSystem.bossHpGaugeEventId() > 0 &&
				$gameSystem.bossHpGaugeMapId() !== $gameMap.mapId()) {
			this.clearBoss();
		}
	};

	Window_BossHpGauge.prototype.update = function() {
		Window_Base.prototype.update.call(this);
		if (this.updateVisibility()) {
			this.open();
			var needRefresh = this.isNeedRefresh();
			if (needRefresh) {
				if (needRefresh === 'CLEAR') {
					this.clearBoss();
				} else {
					if (needRefresh === 'SHAKE') {
						this._shakeDuration = shakeTime;
					}
					this.refresh();
				}
			}
			this.updateShake();
			this.updateOpacity();
		} else {
			this.close();
		}
	};

	Window_BossHpGauge.prototype.updateVisibility = function() {
		if (!$gameSystem.isVisibleBossHpGauge() ||
				$gameSystem.bossHpGaugeEventId() === 0) {
			return false;	
		}
		if ((eventBusyHide && $gameMap.isEventRunning()) ||
				(messageBusyHide && $gameMessage.isBusy())) {
			this._hideCount++;
		} else {
			this._hideCount = 0;
		}
		return this._hideCount < 10;
	};

	Window_BossHpGauge.prototype.isNeedRefresh = function() {
		if (this._eventId !== $gameSystem.bossHpGaugeEventId()) {
			if ($gameSystem.bossHpGaugeEventId() === 0) {
				return 'CLEAR';
			}
			this._eventId = $gameSystem.bossHpGaugeEventId();
			return true;
		}
		var event = $gameMap.event(this._eventId);
		var battler = event ? event.battler() : null;
		if (!battler) {
			return 'CLEAR';
		}
		if (this._hp !== battler.hp || this._mhp !== battler.mhp) {
			return this._hp > battler.hp ? 'SHAKE' : true;
		}
		return false;
	};

	Window_BossHpGauge.prototype.updateShake = function() {
		if (this._shakeDuration > 0) {
			this._shakeDuration--;
			this.x = this._baseX;
			if (this._shakeDuration > 0) {
				this.x += Math.floor(Math.sin((this._shakeDuration % 10) * Math.PI / 5) * 8);
			}
		}
	};

	Window_BossHpGauge.prototype.updateOpacity = function() {
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

	Window_BossHpGauge.prototype.refresh = function() {
		var event = $gameMap.event($gameSystem.bossHpGaugeEventId());
		var battler = event.battler();
		var rate = battler.mhp === 0 ? 0 : battler.hp / battler.mhp;
		this.contents.clear();
		this.drawGauge(0, 0, this.contents.width, rate, gaugeColor[0], gaugeColor[1]);
		if (bossName) {
			this.changeTextColor(this.systemColor());
			this.drawText(battler.name(), 0, 0, this.contents.width);
		}
		if (gaugeValue) {
			this.changeTextColor(this.normalColor());
			this.drawText(battler.hp, 0, 0, this.contents.width, 'right');
		}
		this._hp = battler.hp;
		this._mhp = battler.mhp;
		if (this._hp === 0) {
			this.clearBoss();
		}
	};

	Window_BossHpGauge.prototype.clearBoss = function() {
		$gameSystem.setBossHpGaugeEventId(0);
		this._eventId = 0
	};

	//-----------------------------------------------------------------------------
	// Scene_Map
	//

	var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
	Scene_Map.prototype.createDisplayObjects = function() {
		_Scene_Map_createDisplayObjects.call(this);
		this.createBossHpGaugeWindow();
	};

	Scene_Map.prototype.createBossHpGaugeWindow = function() {
		this._bossHpGaugeWindow = new Window_BossHpGauge();
		this.addChild(this._bossHpGaugeWindow);
	};

	var _Scene_Map_terminate = Scene_Map.prototype.terminate;
	Scene_Map.prototype.terminate = function() {
		if (!SceneManager.isNextScene(Scene_Battle)) {
			this._bossHpGaugeWindow.hide();
		}
		_Scene_Map_terminate.call(this);
		this.removeChild(this._bossHpGaugeWindow);
	};
	
	var _Scene_Map_launchBattle = Scene_Map.prototype.launchBattle;
	Scene_Map.prototype.launchBattle = function() {
		this._bossHpGaugeWindow.hide();
		_Scene_Map_launchBattle.call(this);
	};
	
})();
