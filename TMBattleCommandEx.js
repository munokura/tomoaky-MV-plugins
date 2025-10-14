//=============================================================================
// TMVplugin - バトルコマンド拡張
// バージョン: 1.0.1
// 最終更新日: 2019/11/06
// 配布元    : https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2015 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc Change the actor command size in the battle scene.
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
TMPlugin - Battle Command Extension Ver. 1.0.1

How to Use:

When this plugin is installed, the size of actor commands (the number of displayed commands) during battle becomes variable (depending on the number of skill types of the actor).

If the plugin parameter commandAutoResize is OFF, the size will be fixed at the size set in basicVisibleRows instead of being variable.

There are no plugin commands.

Plugin Parameter Notes:

omitPartyCommand
When set to ON, the command to choose whether to fight or flee in battle will be omitted. Naturally, the flee command will be unavailable.

@param basicVisibleRows
@desc Default number of lines displayed for actor commands: 4
@default 4
@type number

@param maxVisibleRows
@desc Maximum number of lines displayed for actor commands. Default: 6
@default 6
@type number

@param commandAutoResize
@desc Automatically adjust actor command (height) Default: ON ( false = OFF disabled / true = ON enabled )
@default true
@type boolean

@param omitPartyCommand
@desc Skip party commands. Default: OFF (false = OFF, disabled / true = ON, enabled).
@default false
@type boolean
*/


/*:ja
@plugindesc バトルシーンのアクターコマンドサイズを変更します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - バトルコマンド拡張 Ver1.0.1

使い方:

  プラグインを導入すると戦闘中のアクターコマンドのサイズ（表示コマンド数）
  が可変（アクターのスキルタイプ数に依存）になります。

  プラグインパラメータ commandAutoResize がOFFの場合は、可変ではなく、
  basicVisibleRows に設定したサイズに固定されます。

  プラグインコマンドはありません。


プラグインパラメータ補足:

  omitPartyCommand
    ONに設定すると、戦闘で戦うか逃げるかを選択するコマンドが
    省略されるようになります。当然逃げるコマンドは使用できなくなります。

@param basicVisibleRows
@desc アクターコマンドの基本表示行数 初期値: 4
@default 4
@type number

@param maxVisibleRows
@desc アクターコマンドの最大表示行数 初期値: 6
@default 6
@type number

@param commandAutoResize
@desc アクターコマンド（高さ）を自動調整する 初期値: ON ( false = OFF 無効 / true = ON 有効 )
@default true
@type boolean

@param omitPartyCommand
@desc パーティコマンドを省略する 初期値: OFF ( false = OFF 無効 / true = ON 有効 )
@default false
@type boolean
*/

var Imported = Imported || {};
Imported.TMBattleCommandEx = true;

(function() {

	var parameters = PluginManager.parameters('TMBattleCommandEx');
	var basicVisibleRows = +(parameters['basicVisibleRows'] || 4);
	var maxVisibleRows = +(parameters['maxVisibleRows'] || 6);
	var commandAutoResize = JSON.parse(parameters['commandAutoResize']);
	var omitPartyCommand = JSON.parse(parameters['omitPartyCommand']);
	
	//-----------------------------------------------------------------------------
	// Window_ActorCommand
	//

	Window_ActorCommand.prototype.numVisibleRows = function() {
		if (commandAutoResize) {
			var result = this._list ? this._list.length : basicVisibleRows;
			return Math.min(result, maxVisibleRows);
		} else {
			return basicVisibleRows;
		}
	};

	var _Window_ActorCommand_refresh = Window_ActorCommand.prototype.refresh;
	Window_ActorCommand.prototype.refresh = function() {
		if (commandAutoResize) {
			var wh = this.fittingHeight(this.numVisibleRows());
			this.move(this.x, Graphics.boxHeight - wh, this.windowWidth(), wh);
		}
		_Window_ActorCommand_refresh.call(this);
	};

	//-----------------------------------------------------------------------------
	// Scene_Battle
	//

	var _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
	Scene_Battle.prototype.startPartyCommandSelection = function() {
		_Scene_Battle_startPartyCommandSelection.call(this);
		if (omitPartyCommand) {
			this._partyCommandWindow.deactivate();
			this.selectNextCommand();
		}
	};

})();