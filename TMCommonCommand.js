//=============================================================================
// TMPlugin - コモンコマンド
// バージョン: 1.0.0
// 最終更新日: 2018/09/21
// 配布元    : https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2018 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc Adds a command to execute common events to the main menu.
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
TMPlugin - Common Command ver. 1.0.0

How to Use:

By specifying the command name and the common event to execute in the plugin parameters,
a new command will be added to the main menu.

This plugin has been tested with RPG Maker MV Version 1.6.1.

This plugin is distributed under the MIT License. It is free to use, including commercial use, modifications, and redistribution.

@param command1
@desc Common Command 1
@default {"name":"","commonEventId":"0"}
@type struct<CommonCommand>

@param command2
@desc Common Command #2
@default {"name":"","commonEventId":"0"}
@type struct<CommonCommand>

@param command3
@desc Common Command #3
@default {"name":"","commonEventId":"0"}
@type struct<CommonCommand>

@param command4
@desc Common Command #4
@default {"name":"","commonEventId":"0"}
@type struct<CommonCommand>

@param command5
@desc Common Command #5
@default {"name":"","commonEventId":"0"}
@type struct<CommonCommand>
*/


/*~struct~CommonCommand:
@param name
@desc Command name

@param commonEventId
@desc Common event to execute
@default 0
@type common_event
*/


/*:ja
@plugindesc メインメニューにコモンイベント実行用のコマンドを追加します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - コモンコマンド ver1.0.0

使い方:

  プラグインパラメータのコマンド名と実行するコモンイベントを設定すれば
  メインメニューに新しいコマンドが追加されます。

  このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。

  このプラグインはMITライセンスのもとに配布しています、商用利用、
  改造、再配布など、自由にお使いいただけます。

@param command1
@desc コモンコマンドその１
@default {"name":"","commonEventId":"0"}
@type struct<CommonCommand>

@param command2
@desc コモンコマンドその２
@default {"name":"","commonEventId":"0"}
@type struct<CommonCommand>

@param command3
@desc コモンコマンドその３
@default {"name":"","commonEventId":"0"}
@type struct<CommonCommand>

@param command4
@desc コモンコマンドその４
@default {"name":"","commonEventId":"0"}
@type struct<CommonCommand>

@param command5
@desc コモンコマンドその５
@default {"name":"","commonEventId":"0"}
@type struct<CommonCommand>
*/


/*~struct~CommonCommand:ja
@param name
@desc コマンド名

@param commonEventId
@desc 実行するコモンイベント
@default 0
@type common_event
*/

var Imported = Imported || {};
Imported.TMCommonCommand = true;

(function() {

	var parameters = PluginManager.parameters('TMCommonCommand');
	var CommonCommands = [
		JSON.parse(parameters['command1'] || '{}'),
		JSON.parse(parameters['command2'] || '{}'),
		JSON.parse(parameters['command3'] || '{}'),
		JSON.parse(parameters['command4'] || '{}'),
		JSON.parse(parameters['command5'] || '{}')
	];

	//-----------------------------------------------------------------------------
	// Window_MenuCommand
	//

	var _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
	Window_MenuCommand.prototype.addOriginalCommands = function() {
		_Window_MenuCommand_addOriginalCommands.call(this);
		CommonCommands.forEach(function(command) {
			if (command.commonEventId > 0) {
				this.addCommand(command.name, command.name, true);
			}
		}, this);
	};

	//-----------------------------------------------------------------------------
	// Scene_Menu
	//

	var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
		_Scene_Menu_createCommandWindow.call(this);
		CommonCommands.forEach(function(command) {
			if (command.commonEventId > 0) {
				this._commandWindow.setHandler(command.name, this.commandCommonCommand.bind(this));
			}
		}, this);
	};

	Scene_Menu.prototype.commandCommonCommand = function() {
		var symbol = this._commandWindow.currentSymbol();
		CommonCommands.forEach(function(command) {
			if (command.name === symbol) {
				$gameTemp.reserveCommonEvent(command.commonEventId);
			}
		}, this);
		if ($gameTemp.isCommonEventReserved()) {
			SceneManager.goto(Scene_Map);
		} else {
			this._commandWindow.activate();
		}
	};

})();