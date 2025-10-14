//=============================================================================
// TMPlugin - 自動ニューゲーム
// バージョン: 2.1.1
// 最終更新日: 2018/10/25
// 配布元    : https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc The game will automatically start from the beginning when you start the game.
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
TMPlugin - Auto New Game ver. 2.1.1

How to Use:

You can configure startup behavior using plugin parameters.

You can also execute the autoSave plugin command to force a save to a specified save file without proceeding to the save scene.

This plugin has been tested with RPG Maker MV Version 1.6.1.

This plugin is distributed under the MIT License and is free for commercial use, modification, and redistribution.

Plugin Command:

autoSave 1
Forces a save to save file number 1.
The first save file is number 1.
If you specify 0, the most recently loaded save file will be used.
If no save file is found, the first file will be used.

Additional Plugin Parameter Information:

alwaysOnTop / autoDevTool
Neither function works when launched in a browser.

autoContinueCommand
If this parameter is left empty, the auto continue option will not appear in the options menu.
Also, if the plugin parameter autoContinue is set to disable automatic continue, it will not appear in the options.

blockKey
Pressing the specified key will suppress startup processes (auto new game and auto continue).
Leaving this parameter blank (nothing) will disable the suppression Traits. The following keys can be used:
ok ... enter / space / Z
escape ... esc / insert / numpad 0 / X
shift ... shift
control ... ctrl / alt
page up ... page up / Q
page down ... page down / W
down ... ↓ / numpad 2
left ... ← / numpad 4
right ... → / numpad 6
up ... ↑ / numpad 8

However, holding down a key before launching or reloading with F5 will have no effect. During startup, you must start pressing the key after the window appears, and during reloading, you must start pressing the key after the screen goes dark. The timing may be a bit strict.

@param autoNewGame
@desc The game will start automatically from the beginning.
@default true
@type boolean

@param ignoreTitle
@desc Setting the scene transition behavior when the game is over/ended.
@default 0
@type select
@option Transition to the title scene
@value 0
@option Enable Auto New Game (Continue)
@value 1

@param autoContinue
@desc Operation settings when there is more than one save data.
@default 2
@type select
@option Disabled (follows autoNewGame setting)
@value 0
@option Start with the title scene
@value 1
@option Automatically load the latest save data
@value 2

@param allwaysOnTop
@desc Always keep the game window on top.
@default false
@type boolean

@param autoDevTool
@desc Automatically open developer tools when test playing.
@default true
@type boolean

@param autoContinueCommand
@desc The name of the auto continue setting to add to the options. Default: Auto continue
@default Auto Continue

@param blockKey
@desc Key used to disable startup processing. Default: control
@default control
*/


/*:ja
@plugindesc 起動時に自動ではじめからゲームを開始します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - 自動ニューゲーム ver2.1.1

使い方:

  プラグインパラメータで起動時の挙動を設定することができます。

  プラグインコマンド autoSave を実行することによって、セーブシーンへ
  移行せず、指定したセーブファイルに強制セーブをすることもできます。

  このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。

  このプラグインはMITライセンスのもとに配布しています、商用利用、
  改造、再配布など、自由にお使いいただけます。


プラグインコマンド:

  autoSave 1
	1 番のセーブファイルに強制的にセーブします。
	セーブファイルの先頭が 1 番です。
	0 を指定した場合は最後にロードしたセーブファイルが対象となり、
	セーブファイルが見つからなければ先頭のファイルを対象とします。


プラグインパラメータ補足:

  alwaysOnTop / autoDevTool
	どちらの機能もブラウザでの起動時には動作しません。

  autoContinueCommand
	このパラメータを空（何も書かない）にすると、オプション項目に
	自動コンティニューが表示されなくなります。
	また、プラグインパラメータ autoContinue が自動コンティニューを
	しない設定になっている場合もオプション項目には表示されません。

  blockKey
	設定したキーを押していると、起動時の処理（自動ニューゲームや
	自動コンティニュー）の機能を抑制することができます。
	このパラメータを空（何も書かない）にすると、抑制機能は
	使用できなくなります。使えるキーは以下のとおりです。
	  ok       … enter / space / Z
	  escape   … esc / insert / numpad 0 / X
	  shift    … shift
	  control  … ctrl / alt
	  pageup   … pageup / Q
	  pagedown … pagedown / W
	  down     … ↓ / numpad 2
	  left     … ← / numpad 4
	  right    … → / numpad 6
	  up       … ↑ / numpad 8

	ただし、起動前やF5キーによるリロード前からキーを押し続けていても
	効果はありません。起動時であればウィンドウが表示されてから、リロード
	の場合は画面暗転後にキーを押し始める必要があり、タイミングは多少
	シビアかもしれません。

@param autoNewGame
@desc 自動ではじめからゲームを開始する。
@default true
@type boolean

@param ignoreTitle
@desc ゲームオーバー / ゲーム終了 によるシーン遷移の動作設定。
@default 0
@type select
@option タイトルシーンへ遷移する
@value 0
@option 自動ニューゲーム（コンティニュー）を適用する
@value 1

@param autoContinue
@desc セーブデータがひとつ以上あるときの動作設定。
@default 2
@type select
@option 無効 (autoNewGameの設定に従う)
@value 0
@option タイトルシーンから始める
@value 1
@option 最新のセーブデータを自動ロードする
@value 2

@param allwaysOnTop
@desc 常にゲームウィンドウを最前面に表示する。
@default false
@type boolean

@param autoDevTool
@desc テストプレイ時に自動でデベロッパツールを開く。
@default true
@type boolean

@param autoContinueCommand
@desc オプションに追加する自動コンティニュー設定の項目名。 初期値: 自動コンティニュー
@default 自動コンティニュー

@param blockKey
@desc 起動時の処理を無効化するために使用するキー。 初期値: control
@default control
*/

var Imported = Imported || {};
Imported.TMAutoNewGame = true;

(function () {

	var parameters = PluginManager.parameters('TMAutoNewGame');
	var autoNewGame = JSON.parse(parameters['autoNewGame'] || 'true');
	var ignoreTitle = +(parameters['ignoreTitle'] || 0);
	var autoContinue = +(parameters['autoContinue'] || 0);
	var allwaysOnTop = JSON.parse(parameters['allwaysOnTop'] || 'false');
	var autoDevTool = JSON.parse(parameters['autoDevTool'] || 'false');
	var autoContinueCommand = parameters['autoContinueCommand'];
	var blockKey = parameters['blockKey'];

	//-----------------------------------------------------------------------------
	// ConfigManager
	//

	ConfigManager.autoContinue = false;

	var _ConfigManager_makeData = ConfigManager.makeData;
	ConfigManager.makeData = function () {
		var config = _ConfigManager_makeData.call(this);
		config.autoContinue = this.autoContinue;
		return config;
	};

	var _ConfigManager_applyData = ConfigManager.applyData;
	ConfigManager.applyData = function (config) {
		_ConfigManager_applyData.call(this, config);
		this.autoContinue = this.readFlag(config, 'autoContinue');
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'autoSave') {
			var id = +args[0];
			if (id === 0) {
				id = DataManager.lastAccessedSavefileId();
			}
			$gameSystem.onBeforeSave();
			if (DataManager.saveGame(id)) {
				StorageManager.cleanBackup(id);
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Window_Options
	//

	var _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
	Window_Options.prototype.addGeneralOptions = function () {
		_Window_Options_addGeneralOptions.call(this);
		if (autoContinue === 2 && autoContinueCommand) {
			this.addCommand(autoContinueCommand, 'autoContinue');
		}
	};

	//-----------------------------------------------------------------------------
	// Scene_Base
	//

	Scene_Base.prototype.isAutoNewGame = function () {
		if ((autoContinue > 0 && DataManager.isAnySavefileExists()) ||
			(blockKey && Input.isPressed(blockKey))) {
			return false;
		}
		return autoNewGame && !DataManager.isBattleTest() && !DataManager.isEventTest();
	};

	Scene_Base.prototype.isAutoContinue = function () {
		if ((autoContinueCommand && !ConfigManager.autoContinue) ||
			(blockKey && Input.isPressed(blockKey))) {
			return false;
		}
		return autoContinue === 2 && DataManager.isAnySavefileExists() &&
			!DataManager.isBattleTest() && !DataManager.isEventTest();
	};

	Scene_Base.prototype.ignoreTitle = function () {
		if (ignoreTitle === 1) {
			if (this.isAutoNewGame()) {
				DataManager.setupNewGame();
				this.fadeOutAll();
				SceneManager.goto(Scene_Map);
				return true;
			} else if (this.isAutoContinue() && DataManager.loadGame(DataManager.latestSavefileId())) {
				SceneManager.goto(Scene_Map);
				return true;
			}
		}
		return false;
	};

	//-----------------------------------------------------------------------------
	// Scene_Boot
	//

	var _Scene_Boot_start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function () {
		if (Utils.isNwjs()) {
			if (Utils.isOptionValid('test') && autoDevTool) {
				require('nw.gui').Window.get().showDevTools();
				window.focus();
			}
			require('nw.gui').Window.get().setAlwaysOnTop(allwaysOnTop);
		}
		if (this.isAutoNewGame()) {
			this.autoStart('NEWGAME');
			return;
		} else if (this.isAutoContinue()) {
			if (DataManager.loadGame(DataManager.latestSavefileId())) {
				this.autoStart('CONTINUE');
				return;
			}
		}
		_Scene_Boot_start.call(this);
	};

	Scene_Boot.prototype.autoStart = function (code) {
		Scene_Base.prototype.start.call(this);
		SoundManager.preloadImportantSounds();
		if (code === 'NEWGAME') {
			this.checkPlayerLocation();
			DataManager.setupNewGame();
		} else {
			Scene_Load.prototype.reloadMapIfUpdated.call(this);
		}
		SceneManager.goto(Scene_Map);
		this.updateDocumentTitle();
	};

	//-----------------------------------------------------------------------------
	// Scene_GameEnd
	//

	var _Scene_GameEnd_commandToTitle = Scene_GameEnd.prototype.commandToTitle;
	Scene_GameEnd.prototype.commandToTitle = function () {
		if (!this.ignoreTitle()) {
			_Scene_GameEnd_commandToTitle.call(this);
		}
	};

	//-----------------------------------------------------------------------------
	// Scene_Gameover
	//

	var _Scene_Gameover_gotoTitle = Scene_Gameover.prototype.gotoTitle;
	Scene_Gameover.prototype.gotoTitle = function () {
		if (!this.ignoreTitle()) {
			_Scene_Gameover_gotoTitle.call(this);
		}
	};

})();