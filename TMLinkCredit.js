//=============================================================================
// TMPlugin - リンククレジット
// バージョン: 3.0.0
// 最終更新日: 2019/04/17
// 配布元　　: https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc タイトル画面にクレジットコマンドを追加します。
 * 制作スタッフの紹介をWebサイトへのリンク付きで表示できます。
 * 
 * @author tomoaky (https://hikimoki.sakura.ne.jp/)
 *
 * @param credits
 * @type struct<Credit>[]
 * @desc クレジットのデータ
 * @default ["{\"name\":\"名前\",\"help\":\"説明\",\"url\":\"アドレス\"}"]
 *
 * @param versionText
 * @type struct<TitleText>
 * @desc タイトル画面に表示するバージョンテキスト
 * @default {"text":"ver1.0.0","x":"0","y":"0","fontSize":"24","textColor":"#ffffff","outlineWidth":"4","outlineColor":"#000000"}
 *
 * @param licenseText
 * @type struct<TitleText>
 * @desc タイトル画面に表示する著作者情報テキスト
 * @default {"text":"©著作者名 2019","x":"0","y":"592","fontSize":"24","textColor":"#ffffff","outlineWidth":"4","outlineColor":"#000000"}
 *
 * @param creditsCommand
 * @desc タイトルメニューに表示するコマンド名
 * 未設定の場合、クレジットコマンドは表示されません。
 * @default クレジット
 *
 * @param itemHeight
 * @type number
 * @desc ひとつの要素を表示する領域の高さ
 * 初期値: 84
 * @default 84
 *
 * @param helpFontSize
 * @type number
 * @desc 説明表示のフォントサイズ
 * 初期値: 16 ( 0 で説明が非表示になります )
 * @default 16
 *
 * @param urlFontSize
 * @type number
 * @desc アドレス表示のフォントサイズ
 * 初期値: 16 ( 0 でアドレスが非表示になります )
 * @default 16
 *
 * @param urlMaxLength
 * @type number
 * @desc アドレスの最大文字数
 * @default 50
 * 
 * @param useHelpWindow
 * @desc ヘルプウィンドウを使うかどうか
 * 初期値: ON ( true = ON 表示 / false = OFF 非表示 )
 * @default true
 *
 * @param helpWindowText
 * @desc ヘルプウィンドウに表示するテキスト ( \n で改行 )
 * 未設定の場合はリンク先Webサイトの説明が表示されます。
 * @default 選択したサイトを開くことができます。\n（ブラウザがポップアップを禁止していると機能しません）
 *
 * @param titleCommandAlign
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc タイトルコマンドのアライメント
 * @default center
 *
 * @help
 * 使い方:
 * TMPlugin - リンククレジット Ver3.0.0
 *
 *   プラグインパラメータ credits に、リンク先Webサイトの情報を
 *   設定してください。
 *   この情報は名前、説明、アドレス、という３つの要素で構成され、
 *   必要な数だけ追加することができます。
 *
 *   ブラウザ側でポップアップが制限されている環境では、リンク機能が
 *   動作しません。
 * 
 *   RPGアツマールで実行される場合はアツマールのAPIを利用して
 *   リンク先を開きます。
 *
 *   タイトル画面に著作権情報とバージョン情報を表示する機能もあります、
 *   こちらもプラグインパラメータで文字色や表示位置を調整することが可能です。
 *
 *   このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。
 *
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 *
 *
 * プラグインコマンド:
 *
 *   callCredit
 *     クレジットシーンを呼び出します。
 *
 *
 * プラグインパラメータ補足:
 *
 *   credits
 *     name と help は、制御文字を使って文字色を変更したり、アイコンを
 *     表示することができます。
 *     help は \n があるところで改行されます。
 *
 *   versionText / licenseText
 *     textColor と outlineColor は、black や blue のような色名と、
 *     #000000 や #0000ff のようなカラーコードで指定できます。
 */
/*~struct~Credit:
 *
 * @param name
 * @desc リンク先Webサイトの名前
 * @default 
 *
 * @param help
 * @desc リンク先Webサイトの説明
 * @default 
 *
 * @param url
 * @desc リンク先Webサイトのアドレス
 * @default 
 */
/*~struct~TitleText:
 *
 * @param text
 * @desc 表示するテキスト
 * @default 
 *
 * @param x
 * @type number
 * @desc テキストを表示するＸ座標
 * @default 0
 *
 * @param y
 * @type number
 * @desc テキストを表示するＹ座標
 * @default 0
 *
 * @param fontSize
 * @type number
 * @desc テキストのフォントサイズ
 * @default 24
 *
 * @param textColor
 * @desc テキストの文字色
 * @default #ffffff
 *
 * @param outlineWidth
 * @type number
 * @desc テキストの縁取りサイズ
 * @default 4
 *
 * @param outlineColor
 * @desc テキストの縁取り色
 * @default #000000
 */

var Imported = Imported || {};
Imported.TMLinkCredit = true;

(function() {

	var parameters = PluginManager.parameters('TMLinkCredit');
	var credits = JSON.parse(parameters['credits'] || '[]').map(JSON.parse);
	var versionText = JSON.parse(parameters['versionText'] || '{}');
	var licenseText = JSON.parse(parameters['licenseText'] || '{}');
	var creditsCommand = parameters['creditsCommand'];
	var itemHeight = +(parameters['itemHeight'] || 84);
	var helpFontSize = +(parameters['helpFontSize'] || 16);
	var urlFontSize = +(parameters['urlFontSize'] || 16);
	var urlMaxLength = +(parameters['urlMaxLength'] || 50);
	var useHelpWindow = JSON.parse(parameters['useHelpWindow'] || 'true');
	var helpWindowText = parameters['helpWindowText'].replace(/\\n/g, '\n');
	var titleCommandAlign = parameters['titleCommandAlign'] || 'center';
	
	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'callCredit') {
			SceneManager.push(Scene_Credits);
		}
	};

	//-----------------------------------------------------------------------------
	// Window_TitleCommand
	//

	var _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
	Window_TitleCommand.prototype.makeCommandList = function() {
		_Window_TitleCommand_makeCommandList.call(this);
		if (creditsCommand) {
			this.addCommand(creditsCommand, 'credits');
		}
	};

	var _Window_TitleCommand_itemTextAlign = Window_TitleCommand.prototype.itemTextAlign;
	Window_TitleCommand.prototype.itemTextAlign = function() {
		return titleCommandAlign || _Window_TitleCommand_itemTextAlign.call(this);
	};

	//-----------------------------------------------------------------------------
	// Window_Credits
	//

	function Window_Credits() {
		this.initialize.apply(this, arguments);
	}

	Window_Credits.prototype = Object.create(Window_Selectable.prototype);
	Window_Credits.prototype.constructor = Window_Credits;

	Window_Credits.prototype.initialize = function(x, y, width, height) {
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);
		this.refresh();
		this.select(0);
		this.activate();
	};

	var _Window_Credits_standardFontSize = Window_Credits.prototype.standardFontSize;
	Window_Credits.prototype.standardFontSize = function() {
		return this._standardFontSize || _Window_Credits_standardFontSize.call(this);
	};

	Window_Credits.prototype.itemHeight = function() {
		return itemHeight;
	};

	Window_Credits.prototype.maxItems = function() {
		return credits.length || 1;
	};

	Window_Credits.prototype.item = function() {
		return index >= 0 ? credits[this.index()] : null;
	};

	Window_Credits.prototype.drawItem = function(index) {
		var item = credits[index];
		if (item) {
			var rect = this.itemRectForText(index);
			var lineHeight = this.lineHeight();
			this.resetFontSettings();
			this.drawTextEx(item.name, rect.x, rect.y);
			if (urlFontSize > 0) {
				this.resetFontSettings();
				this.contents.fontSize = urlFontSize;
				var urlLineNums = Math.floor(this.itemHeight() / urlFontSize);
				for (var i = 0; i < urlLineNums; i++) {
					var urlIndex = urlMaxLength * i;
					if (urlIndex >= item.url.length) {
						break;
					}
					var y = rect.y + urlFontSize * i;
					this.contents.drawText(item.url.substr(urlIndex, urlMaxLength), rect.x, y, rect.width, lineHeight, 'right');
				}
			}
			if (helpFontSize > 0) {
				this._standardFontSize = helpFontSize;
				this.resetFontSettings();
				this.drawTextEx(item.help.replace(/\\n/g, '\n'), rect.x, rect.y + lineHeight);
				this._standardFontSize = null;
			}
		}
	};

	Window_Credits.prototype.updateHelp = function() {
		var text = helpWindowText || credits[this.index()].help;
		this._helpWindow.setText(text);
	};

	Window_Credits.prototype.urlOpen = function() {
		if (window.RPGAtsumaru && window.RPGAtsumaru.popups.openLink) {
			window.RPGAtsumaru.popups.openLink(credits[this.index()].url);
		} else {
			window.open(credits[this.index()].url, '_blank');
		}
	};

	//-----------------------------------------------------------------------------
	// Scene_Title
	//

	var _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
	Scene_Title.prototype.createCommandWindow = function() {
		_Scene_Title_createCommandWindow.call(this);
		this._commandWindow.setHandler('credits', this.commandCredits.bind(this));
	};

	Scene_Title.prototype.commandCredits = function() {
		this._commandWindow.close();
		SceneManager.push(Scene_Credits);
	};

	var _Scene_Title_createForeground = Scene_Title.prototype.createForeground;
	Scene_Title.prototype.createForeground = function() {
		_Scene_Title_createForeground.call(this);
		if (versionText.text) {
			this.drawTitleText(versionText);
		}
		if (licenseText.text) {
			this.drawTitleText(licenseText);
		}
	};

	Scene_Title.prototype.drawTitleText = function(titleText) {
		var x = +titleText.x;
		var y = +titleText.y;
		var fontSize = +titleText.fontSize;
		var outlineWidth = +titleText.outlineWidth;
		var textHeight = fontSize + outlineWidth * 2;
		var maxWidth = Graphics.width - x - outlineWidth;
		this._gameTitleSprite.bitmap.fontSize = fontSize;
		this._gameTitleSprite.bitmap.outlineWidth = outlineWidth;
		this._gameTitleSprite.bitmap.textColor = titleText.textColor;
		this._gameTitleSprite.bitmap.outlineColor = titleText.outlineColor;
		this._gameTitleSprite.bitmap.drawText(titleText.text, x + outlineWidth, y, maxWidth, textHeight, 'left');
	};

	//-----------------------------------------------------------------------------
	// Scene_Credits
	//

	function Scene_Credits() {
		this.initialize.apply(this, arguments);
	}

	Scene_Credits.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_Credits.prototype.constructor = Scene_Credits;

	Scene_Credits.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};

	Scene_Credits.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		if (useHelpWindow) {
			this.createHelpWindow();
		}
		this.createCreditsWindow();
	};

	Scene_Credits.prototype.createCreditsWindow = function() {
		var wy = 0;
		var wh = Graphics.boxHeight;
		if (this._helpWindow) {
			wy = this._helpWindow.height;
			wh -= this._helpWindow.height;
		}
		this._creditsWindow = new Window_Credits(0, wy, Graphics.boxWidth, wh);
		this._creditsWindow.setHandler('ok', this.onCreditsOk.bind(this));
		this._creditsWindow.setHandler('cancel', this.popScene.bind(this));
		if (this._helpWindow) {
			this._creditsWindow.setHelpWindow(this._helpWindow);
		}
		this.addWindow(this._creditsWindow);
	};

	Scene_Credits.prototype.onCreditsOk = function() {
		this._creditsWindow.urlOpen();
		this._creditsWindow.activate();
	};

})();
