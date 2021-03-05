//=============================================================================
// TMPlugin - コモンコマンド
// バージョン: 1.0.0
// 最終更新日: 2018/09/21
// 配布元　　: https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2018 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc メインメニューにコモンイベント実行用のコマンドを追加します。
 *
 * @author tomoaky (https://hikimoki.sakura.ne.jp/)
 *
 * @param command1
 * @type struct<CommonCommand>
 * @desc コモンコマンドその１
 * @default {"name":"","commonEventId":"0"}
 * 
 * @param command2
 * @type struct<CommonCommand>
 * @desc コモンコマンドその２
 * @default {"name":"","commonEventId":"0"}
 * 
 * @param command3
 * @type struct<CommonCommand>
 * @desc コモンコマンドその３
 * @default {"name":"","commonEventId":"0"}
 * 
 * @param command4
 * @type struct<CommonCommand>
 * @desc コモンコマンドその４
 * @default {"name":"","commonEventId":"0"}
 * 
 * @param command5
 * @type struct<CommonCommand>
 * @desc コモンコマンドその５
 * @default {"name":"","commonEventId":"0"}
 * 
 * @help
 * TMPlugin - コモンコマンド ver1.0.0
 * 
 * 使い方:
 * 
 *   プラグインパラメータのコマンド名と実行するコモンイベントを設定すれば
 *   メインメニューに新しいコマンドが追加されます。
 * 
 *   このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。
 *
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 */
/*~struct~CommonCommand:
 *
 * @param name
 * @desc コマンド名
 * @default 
 *
 * @param commonEventId
 * @type common_event
 * @desc 実行するコモンイベント
 * @default 0
 *
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
