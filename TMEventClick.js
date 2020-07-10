//=============================================================================
// TMPlugin - イベントクリック
// バージョン: 0.3.1b
// 最終更新日: 2018/10/04
// 配布元　　: https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc イベントをクリックして起動、ドラッグで移動させる機能を
 * 追加します。
 *
 * @author tomoaky (https://hikimoki.sakura.ne.jp/)
 *
 * @param dropStart
 * @type boolean
 * @desc ドラッグ＆ドロップ時にイベントを起動する。
 * 初期値: OFF ( true = ON 有効 / false = OFF 無効 )
 * @default false
 *
 * @param canMultipleDrop
 * @desc ドラッグ＆ドロップでイベントを重ねられる。
 * 初期値: OFF ( true = ON 可能 / false = OFF 不可 )
 * @default false
 *
 * @param lockTurnEnabled
 * @desc クリック（ドロップ）モード時のイベント起動による振り向き
 * 初期値: OFF ( true = ON 有効 / false = OFF 無効 )
 * @default false
 *
 * @param noDropRegions
 * @desc ドラッグ＆ドロップによる移動を禁止するリージョン
 * 半角数字で設定（カンマで区切って複数指定可能）
 * @default 
 *
 * @help
 * TMPlugin - イベントクリック ver0.3.1b
 * 
 *   このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。
 *
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 * 
 * 
 * プラグインコマンド:
 * 
 *   stopEventClick       # 通常の操作方法に戻します。
 *   startEventClick      # イベントクリックモードを開始します。
 *   startEventDrag       # イベントドラッグモードを開始します。
 *   startEventClickDrag  # イベントクリック＆ドラッグモードを開始。
 *
 * 
 * イベントクリックモード:
 * 
 *   プレイヤーの移動ができなくなり、クリックしたイベントを即時実行します。
 *
 * 
 * イベントドラッグモード:
 * 
 *   プレイヤーの移動ができなくなり、イベントをドラッグ＆ドロップで動かせます。
 *
 * 
 * イベントクリック＆ドラッグモード:
 * 
 *   イベントクリックモードとイベントドラッグモードの両方の機能をもっています。
 *
 * 
 * メモ欄タグ（イベント）:
 * 
 *   <noClick>  # クリックによるイベントの即時実行を無効にします。
 *   <noDrag>   # ドラッグ＆ドロップによるイベント移動を無効にします。
 *
 * 
 * プラグインパラメータ補足:
 * 
 *   noDropRegions
 *     たとえば 1,2,3 と設定すると、１～３番のリージョンには
 *     ドラッグ＆ドロップによる移動ができなくなります。
 */

var Imported = Imported || {};
Imported.TMEventClick = true;

(function() {

	var parameters = PluginManager.parameters('TMEventClick');
	var dropStart = JSON.parse(parameters['dropStart'] || 'false');
	var canMultipleDrop = JSON.parse(parameters['canMultipleDrop'] || 'false');
	var lockTurnEnabled = JSON.parse(parameters['lockTurnEnabled'] || 'false');
	var noDropRegions = (parameters['noDropRegions'] || '').split(',');
	
	//-----------------------------------------------------------------------------
	// Game_Player
	//

	Game_Player.prototype.setEventClickMode = function(mode) {
		this._eventClickMode = mode;
	};

	Game_Player.prototype.eventClickMode = function() {
		if (this._eventClickMode == null) {
			this._eventClickMode = 0;
		}
		return this._eventClickMode;
	};

	var _Game_Player_moveByInput = Game_Player.prototype.moveByInput;
	Game_Player.prototype.moveByInput = function() {
		var eventClickMode = this.eventClickMode();
		if (eventClickMode === 1) {
			this.updateEventClick();
		} else if (eventClickMode >= 2){
			this.updateEventDrag();
		} else {
			_Game_Player_moveByInput.call(this);
		}
	};

	var _Game_Player_canMove = Game_Player.prototype.canMove;
	Game_Player.prototype.canMove = function() {
		if (this.eventClickMode() > 0) {
			return false;
		}
		return _Game_Player_canMove.call(this);
	};
	
	Game_Player.prototype.updateEventClick = function() {
		if (!$gameMap.isEventRunning() && TouchInput.isTriggered()) {
			var x = $gameMap.canvasToMapX(TouchInput.x);
			var y = $gameMap.canvasToMapY(TouchInput.y);
			var events = $gameMap.eventsXy(x, y);
			for (var i = 0, len = events.length; i < len; i++) {
				if (events[i].canEventClick('noClick')) {
					events[i].start();
					break;
				}
			}
		}
	};

	Game_Player.prototype.updateEventDrag = function() {
		if (this._dragEventId == null) {
			this._dragEventId = 0;
		}
		if (this._dragEventId > 0) {
			var dragEvent = $gameMap.event(this._dragEventId);
			var eventRunning = $gameMap.isEventRunning();
			if (!eventRunning && TouchInput.isPressed()){
				if (TouchInput.x > 0 && TouchInput.x < Graphics.width &&
						TouchInput.y > 0 && TouchInput.y < Graphics.height) {
					var x = $gameMap.canvasToMapX(TouchInput.x);
					var y = $gameMap.canvasToMapY(TouchInput.y);
					if (this.canDropLocate(dragEvent, x, y)) {
						dragEvent.locate(x, y);
					}
					if (x !== this._dragEventLastX || y !== this._dragEventLastY) {
						this._drag = true;
					}
				}
			} else {
				if (!eventRunning) {
					if (dropStart && (dragEvent.x !== this._dragEventLastX ||
							dragEvent.y !== this._dragEventLastY)) {
						dragEvent.start();
					} else if (dragEvent.canEventClick('noClick') &&
							this.eventClickMode() === 3 && !this._drag) {
						dragEvent.start();
					}
				}
				this._dragEventId = 0;
			}
		} else {
			if (!$gameMap.isEventRunning() && TouchInput.isTriggered()) {
				var x = $gameMap.canvasToMapX(TouchInput.x);
				var y = $gameMap.canvasToMapY(TouchInput.y);
				var events = $gameMap.eventsXy(x, y);
				for (var i = 0, len = events.length; i < len; i++) {
					if (events[i].canEventClick('noDrag')) {
						this._dragEventId = events[i].eventId();
					}
				}
				if (this._dragEventId === 0 && this.eventClickMode() === 3) {
					for (var i = 0, len = events.length; i < len; i++) {
						if (events[i].canEventClick('noClick')) {
							this._dragEventId = events[i].eventId();
						}
					}
				}
				if (this._dragEventId > 0) {
					var dragEvent = $gameMap.event(this._dragEventId);
					this._dragEventLastX = dragEvent.x;
					this._dragEventLastY = dragEvent.y;
					this._drag = false;
				}
			}
		}
	};
	
	Game_Player.prototype.canDropLocate = function(dragEvent, x, y) {
		if (!dragEvent.canEventClick('noDrag') ||
				(noDropRegions.indexOf('' + $gameMap.regionId(x, y)) >= 0) ||
				(!canMultipleDrop && $gameMap.eventsXy(x, y).length > 0)) {
			return false;
		}
		return true;
	};
	
	//-----------------------------------------------------------------------------
	// Game_Event
	//

	var _Game_Event_lock = Game_Event.prototype.lock;
	Game_Event.prototype.lock = function() {
		var lastLock = this._locked;
		_Game_Event_lock.call(this);
		if (lastLock !== this._locked && !lockTurnEnabled &&
				$gamePlayer.eventClickMode() > 0) {
			this.setDirection(this._prelockDirection);
		}
	};

	Game_Event.prototype.canEventClick = function(tag) {
		if (this._pageIndex < 0 || this.event().meta[tag]) {
			return false;
		}
		return true;
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'stopEventClick') {
			$gamePlayer.setEventClickMode(0);
		} else if (command === 'startEventClick') {
			$gamePlayer.setEventClickMode(1);
		} else if (command === 'startEventDrag') {
			$gamePlayer.setEventClickMode(2);
		} else if (command === 'startEventClickDrag') {
			$gamePlayer.setEventClickMode(3);
		}
	};
	
})();
