//=============================================================================
// TMVplugin - バトルコマンド拡張
// バージョン: 1.0.1
// 最終更新日: 2019/11/06
// 配布元　　: https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2015 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc バトルシーンのアクターコマンドサイズを変更します。
 *
 * @author tomoaky (https://hikimoki.sakura.ne.jp/)
 *
 * @param basicVisibleRows
 * @type number
 * @desc アクターコマンドの基本表示行数
 * 初期値: 4
 * @default 4
 *
 * @param maxVisibleRows
 * @type number
 * @desc アクターコマンドの最大表示行数
 * 初期値: 6
 * @default 6
 *
 * @param commandAutoResize
 * @type boolean
 * @desc アクターコマンド（高さ）を自動調整する
 * 初期値: ON ( false = OFF 無効 / true = ON 有効 )
 * @default true
 *
 * @param omitPartyCommand
 * @type boolean
 * @desc パーティコマンドを省略する
 * 初期値: OFF ( false = OFF 無効 / true = ON 有効 )
 * @default false
 *
 * @help
 * TMPlugin - バトルコマンド拡張 Ver1.0.1
 * 
 * 使い方:
 *
 *   プラグインを導入すると戦闘中のアクターコマンドのサイズ（表示コマンド数）
 *   が可変（アクターのスキルタイプ数に依存）になります。
 *
 *   プラグインパラメータ commandAutoResize がOFFの場合は、可変ではなく、
 *   basicVisibleRows に設定したサイズに固定されます。
 *
 *   プラグインコマンドはありません。
 *
 *
 * プラグインパラメータ補足:
 *
 *   omitPartyCommand
 *     ONに設定すると、戦闘で戦うか逃げるかを選択するコマンドが
 *     省略されるようになります。当然逃げるコマンドは使用できなくなります。
 * 
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
