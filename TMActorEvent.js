//=============================================================================
// TMPlugin - アクターイベント
// バージョン: 1.2.0
// 最終更新日: 2020/04/21
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc アクターとほどよく同期したイベントを作成します。
 * パーティにいないときのみ同じ歩行グラフィックで出現します。
 *
 * @author tomoaky (https://twitter.com/tomoaky)
 *
 * @param actorTag
 * @desc イベントにアクターを設定するためのタグ名
 * 初期値: actor
 * @default actor
 *
 * @param useActorPosition
 * @type boolean
 * @desc アクター座標記憶システムを利用する
 * 初期値: OFF ( ON = 有効 / OFF = 無効 )
 * @default false
 * 
 * @param useActorDirection
 * @type boolean
 * @desc アクターの向きも記憶させる
 * 初期値: OFF ( ON = 有効 / OFF = 無効 )
 * @default false
 *
 * @help
 * TMPlugin - アクターイベント ver1.2.0
 *
 * 使い方:
 * 
 *   このプラグインを導入し、イベントのメモ欄に actor タグをつけることで
 *   そのイベントと指定したアクターがほどよく同期します。
 * 
 *   アクターがパーティに加入するとイベントは消え、パーティから外れると
 *   イベントが出現します。
 *   また、イベントの見た目もアクターと同じものになります。
 * 
 *   このプラグインは RPGツクールMV Version 1.6.2 で動作確認をしています。
 * 
 * 
 * メモ欄タグ (イベント):
 * 
 *   <actor:2>
 *     イベントにアクター 2 番をほどよく同期させます。
 *     このタグ名はプラグインパラメータで変更することができます、
 *     併用している他のプラグインが actor タグを使っている場合は
 *     他の文字列に変更してください。
 * 
 * 
 * プラグインパラメータ補足:
 * 
 *   useActorPosition
 *     この値が 1 の場合、アクターイベントが同期しているアクターが
 *     最後にパーティから外れた場所を記憶し、以後その場所に出現するように
 *     なります。
 *     この位置記憶はアクターイベントが配置されているマップでのみ発生します。
 * 
 * 
 * プラグインコマンド:
 * 
 *   clearActorPosition 4
 *     アクター 4 番の位置記憶をリセットします。
 */

var Imported = Imported || {};
Imported.TMActorEvent = true;

var TMPlugin = TMPlugin || {};
TMPlugin.ActorEvent = {};
TMPlugin.ActorEvent.Parameters = PluginManager.parameters('TMActorEvent');
TMPlugin.ActorEvent.ActorTag = TMPlugin.ActorEvent.Parameters['actorTag'] || 'actor';
TMPlugin.ActorEvent.UseActorPosition = JSON.parse(TMPlugin.ActorEvent.Parameters['useActorPosition'] || 'false');
TMPlugin.ActorEvent.UseActorDirection = JSON.parse(TMPlugin.ActorEvent.Parameters['useActorDirection'] || 'false');

if (!TMPlugin.InterpreterBase) {
	TMPlugin.InterpreterBase = true;
	(function() {

		Game_Interpreter.prototype.convertEscapeCharactersTM = function(text) {
			text = text.replace(/\\/g, '\x1b');
			text = text.replace(/\x1b\x1b/g, '\\');
			text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
				return $gameVariables.value(parseInt(arguments[1]));
			}.bind(this));
			text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
				return $gameVariables.value(parseInt(arguments[1]));
			}.bind(this));
			text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
				return this.actorNameTM(parseInt(arguments[1]));
			}.bind(this));
			text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
				return this.partyMemberNameTM(parseInt(arguments[1]));
			}.bind(this));
			text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
				return text;
			};
  
		Game_Interpreter.prototype.actorNameTM = function(n) {
			var actor = n >= 1 ? $gameActors.actor(n) : null;
			return actor ? actor.name() : '';
		};

		Game_Interpreter.prototype.partyMemberNameTM = function(n) {
			var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
			return actor ? actor.name() : '';
		};

	})();
} // TMPlugin.InterpreterBase

(function() {

	//-----------------------------------------------------------------------------
	// Game_Actor
	//

	Game_Actor.prototype.getActorPosition = function() {
		return this._actorPosition;
	};

	Game_Actor.prototype.setActorPosition = function(mapId, x, y, direction) {
		this._actorPosition = { mapId: mapId, x: x, y: y, direction: direction };
	};

	Game_Actor.prototype.clearActorPosition = function() {
		this._actorPosition = null;
	};

	//-----------------------------------------------------------------------------
	// Game_Party
	//

	var _Game_Party_removeActor = Game_Party.prototype.removeActor;
	Game_Party.prototype.removeActor = function(actorId) {
		if (TMPlugin.ActorEvent.UseActorPosition && this._actors.contains(actorId)) {
			var actor = $gameActors.actor(actorId);
			var events = $gameMap.events();
			var flag = events.some(function(event) {
				return +event.event().meta[TMPlugin.ActorEvent.ActorTag] === actorId;
			});
			if (flag) {
				actor.setActorPosition($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y, $gamePlayer.direction());
			}
		}
		_Game_Party_removeActor.call(this, actorId);
	};

	//-----------------------------------------------------------------------------
	// Game_Event
	//

	var _Game_Event_findProperPageIndex = Game_Event.prototype.findProperPageIndex;
	Game_Event.prototype.findProperPageIndex = function() {
		var actorId = this.event().meta[TMPlugin.ActorEvent.ActorTag];
		if (actorId) {
			var actor = $gameActors.actor(+actorId);
			if ($gameParty.allMembers().contains(actor)) return -1;
			if (TMPlugin.ActorEvent.UseActorPosition) {
				var pos = actor.getActorPosition();
				if (pos && pos.mapId !== $gameMap.mapId()) return -1;
			}
		}
		return _Game_Event_findProperPageIndex.call(this);
	};

	var _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
	Game_Event.prototype.setupPageSettings = function() {
		_Game_Event_setupPageSettings.call(this);
		var actorId = this.event().meta[TMPlugin.ActorEvent.ActorTag];
		if (actorId) {
			var actor = $gameActors.actor(+actorId);
			this.setImage(actor.characterName(), actor.characterIndex());
			if (TMPlugin.ActorEvent.UseActorPosition) {
				var pos = actor.getActorPosition();
				if (pos) {
					this.locate(pos.x, pos.y);
					if (TMPlugin.ActorEvent.UseActorDirection) {
						this.setDirection(pos.direction);
					}
				}
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'clearActorPosition') {
			var arr = args.map(this.convertEscapeCharactersTM, this);
			var actor = $gameActors.actor(+arr[0]);
			if (actor) actor.clearActorPosition();
		}
	};
  
})();
