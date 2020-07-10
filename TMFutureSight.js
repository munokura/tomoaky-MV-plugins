//=============================================================================
// TMPlugin - エネミー行動予測
// バージョン: 1.1.0
// 最終更新日: 2018/08/21
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 敵キャラの次の行動のヒントなどをテキストで表示します。
 * より戦略的なターンバトルが実現できるかもしれません。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param width
 * @type number
 * @desc 行動予測表示の横幅
 * 初期値: 240
 * @default 240
 *
 * @param maxLines
 * @type number
 * @desc 行動予測表示の最大行数
 * 初期値: 3
 * @default 3
 *
 * @param lineHeight
 * @type number
 * @desc 行動予測表示の 1 行の高さ
 * 初期値: 36
 * @default 36
 *
 * @param fontSize
 * @type number
 * @desc 行動予測表示のフォントサイズ
 * 初期値: 28
 * @default 28
 *
 * @param color
 * @desc 行動予測表示の文字色
 * 初期値: white
 * @default white
 *
 * @param backColor
 * @desc 行動予測表示の背景の色
 * 初期値: black
 * @default black
 *
 * @param backOpacity
 * @type number
 * @max 255
 * @desc 行動予測表示の背景の不透明度
 * 初期値: 128 ( 0 ～ 255 )
 * @default 128
 *
 * @param textAlign
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc 行動予測表示の行揃え
 * @default center
 * 
 * @param showIcon
 * @type boolean
 * @desc スキル名の頭にアイコンも表示する
 * 初期値: ON（ ON = 表示 / OFF = 非表示 )
 * @default true
 * 
 * @param headerText
 * @desc 行動予測表示のヘッダーテキスト
 * 初期値: Next
 * @default Next
 *
 * @param headerHeight
 * @type number
 * @desc 行動予測表示のヘッダーの高さ
 * 初期値: 20
 * @default 20
 *
 * @param headerFontSize
 * @type number
 * @desc 行動予測表示のヘッダーのフォントサイズ
 * 初期値: 16
 * @default 16
 *
 * @param headerColor
 * @desc 行動予測表示のヘッダーの文字色
 * 初期値: red
 * @default red
 *
 * @param cornerRadius
 * @type number
 * @desc TMBitmapEx.js導入時の、角丸矩形の丸部分の半径
 * 初期値: 6
 * @default 6
 *
 * @help
 * TMPlugin - エネミー行動予測 ver1.1.0
 * 
 * 使い方:
 *
 *   スキルのメモ欄に <fsText:予測テキスト> のようなタグで行動予測の設定を
 *   してください。
 *   戦闘シーンでパーティのコマンドを入力している間、敵グラフィックに
 *   重なるように予測テキストが表示されるようになります。
 *
 *   このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。
 *
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 *
 * 
 * メモ欄タグ（スキル）:
 *
 *   <fsText:予測テキスト>
 *     敵がこのスキルを使用するターンのコマンド入力中に、予測テキストが
 *     敵グラフィックに重なるように表示されます。
 *     このタグがない場合はスキル名を代わりに表示します。
 *
 *     予測テキストを途中で改行することで、行動予測の表示も複数行になります。
 *     ただしプラグインパラメータ maxLines で設定した行数を超えることは
 *     できません。
 * 
 *   <fsIcon:5>
 *     予測テキストの頭に 5 番のアイコンを表示します。
 *     このタグがない場合はスキルアイコンを代わりに表示します。
 * 
 *     プラグインパラメータ showIcon がOFF(false)の場合は表示しません。
 *
 *
 * メモ欄タグ（敵キャラ）:
 *
 *   <fsOffsetX:50>
 *     この敵の行動予測の表示位置を右に 50 ドットずらします。左にずらす場合は
 *     負の値を設定してください。
 *
 *   <fsOffsetY:80>
 *     この敵の行動予測の表示位置を下に 80 ドットずらします。上にずらす場合は
 *     負の値を設定してください。
 *
 *
 * プラグインコマンド:
 *
 *   fsStop
 *     行動予測機能を無効にします。ゲーム開始時は行動予測機能が有効に
 *     なっています。行動予測機能の状態はセーブデータに保存されます。
 *
 *   fsStart
 *     無効にした行動予測機能を有効にします。
 *
 *
 * プラグインパラメータ補足:
 *
 *   maxLines
 *     行動予測表示の最大行数を設定します。行数が多いほど大きなビットマップが
 *     生成されるため、必要以上に大きな値は設定しないでください。
 * 
 *     1ターンに複数回の行動がある場合、行動回数分の行数が必要になります。
 *     行動予測表示に改行を利用する場合はさらに必要な行数が増えます。
 *
 *   color / backColor / headerColor
 *     このパラメータには、black や blue といったカラーネームと、
 *     #000000 や #0000ff のようなカラーコードを設定することができます。
 *
 *   headerText
 *     行動予測の左上に表示するヘッダーテキストです。何も入力しなければ
 *     ヘッダーテキストは非表示になります。
 *
 *   cornerRadius
 *     TMBitmapEx.js をこのプラグインよりも上の位置に導入しつつ、
 *     このパラメータの値を 1 以上にすることで、行動予測の背景を
 *     角丸の矩形にすることができます。
 */

var Imported = Imported || {};
Imported.TMFutureSight = true;

(function() {

	var parameters = PluginManager.parameters('TMFutureSight');
	var SightWidth = +(parameters['width'] || 240);
	var SightMaxLines = +(parameters['maxLines'] || 3);
	var SightLineHeight = +(parameters['lineHeight'] || 36);
	var SightFontSize = +(parameters['fontSize'] || 28);
	var SightColor = parameters['color'] || 'white';
	var SightBackColor = parameters['backColor'] || 'black';
	var SightBackOpacity = +(parameters['backOpacity'] || 128);
	var SightCornerRadius = +(parameters['cornerRadius'] || 6);
	var SightTextAlign = parameters['textAlign'] || 'center';
	var SightShowIcon = JSON.parse(parameters['showIcon'] || 'true');
	var SightHeaderText = parameters['headerText'];
	var SightHeaderHeight = +(parameters['headerHeight'] || 20);
	var SightHeaderFontSize = +(parameters['headerFontSize'] || 16);
	var SightHeaderColor = parameters['headerColor'] || 'red';
  
	//-----------------------------------------------------------------------------
	// Game_System
	//

	Game_System.prototype.isFutureSightEnabled = function() {
		if (this._futureSightEnabled == null) {
			this._futureSightEnabled = true;
		}
		return this._futureSightEnabled;
	};

	Game_System.prototype.disableFutureSight = function() {
		this._futureSightEnabled = false;
	};

	Game_System.prototype.enableFutureSight = function() {
		this._futureSightEnabled = true;
	};

	//-----------------------------------------------------------------------------
	// Game_Enemy
	//

	Game_Enemy.prototype.setFutureSightTexts = function() {
		this._futureSightTexts = [];
		this._futureSightIcons = [];
		for (var i = 0; i < this._actions.length; i++) {
			if (this._actions[i]) {
				var skill = this._actions[i].item();
				if (skill) {
					if (skill.meta.fsText) {
						this._futureSightTexts.push(skill.meta.fsText);
					} else {
						this._futureSightTexts.push(skill.name);
					}
					this._futureSightIcons.push(this.fsIconIndex(skill));
				}
			}
		}
	};

	Game_Enemy.prototype.fsIconIndex = function(skill) {
		if (!SightShowIcon) {
			return 0;
		}
		if (skill.meta.fsIcon) {
			return +skill.meta.fsIcon;
		}
		return skill.iconIndex;
	};

	Game_Enemy.prototype.resetFutureSightTexts = function() {
		this._futureSightTexts = [];
	};

	Game_Enemy.prototype.futureSightTexts = function() {
		return this._futureSightTexts || [];
	};

	Game_Enemy.prototype.futureSightIcons = function() {
		return this._futureSightIcons || [];
	};
  
	//-----------------------------------------------------------------------------
	// Game_Troop
	//

	var _Game_Troop_makeActions = Game_Troop.prototype.makeActions;
	Game_Troop.prototype.makeActions = function() {
		_Game_Troop_makeActions.call(this);
		if ($gameSystem.isFutureSightEnabled() && !BattleManager._preemptive) {
			this.members().forEach(function(member) {
				member.setFutureSightTexts();
			});
		}
	};

	var _Game_Troop_increaseTurn = Game_Troop.prototype.increaseTurn;
	Game_Troop.prototype.increaseTurn = function() {
		_Game_Troop_increaseTurn.call(this);
		this.members().forEach(function(member) {
			member.resetFutureSightTexts();
		});
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'fsStart') {
			$gameSystem.enableFutureSight();
		} else if (command === 'fsStop') {
			$gameSystem.disableFutureSight();
		}
	};
  
	//-----------------------------------------------------------------------------
	// Sprite_Enemy
	//

	var _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
	Sprite_Enemy.prototype.update = function() {
		_Sprite_Enemy_update.call(this);
		if (this._enemy) {
			this.updateFutureSight();
		}
	};

	Sprite_Enemy.prototype.updateFutureSight = function() {
		if (!this._futureSightSprite && this.parent) {
			this._futureSightSprite = new Sprite_FutureSight(this);
			this.parent.addChild(this._futureSightSprite);
		}
	};

	//-----------------------------------------------------------------------------
	// Sprite_FutureSight
	//

	function Sprite_FutureSight() {
		this.initialize.apply(this, arguments);
	}

	Sprite_FutureSight.prototype = Object.create(Sprite.prototype);
	Sprite_FutureSight.prototype.constructor = Sprite_FutureSight;

	Sprite_FutureSight.prototype.initialize = function(enemySprite) {
		Sprite.prototype.initialize.call(this);
		this._enemySprite = enemySprite;
		var width = SightWidth;
		var height = SightLineHeight * SightMaxLines + SightHeaderHeight;
		this.bitmap = new Bitmap(width, height);
		this.anchor.x = 0.5;
		this.anchor.y = 1;
		this.z = 10;
		this._texts = [];
		this._icons = [];
	};

	Sprite_FutureSight.prototype.refresh = function() {
		this.bitmap.clear();
		if (this._texts.length > 0) {
			var lines = this._texts.reduce(function(r, text) {
				return r + text.split('\n').length;
			}, 0);
			var y = SightHeaderHeight;
			var width = this.bitmap.width;
			var height = SightLineHeight * lines;
			this.drawSightBack(0, y, width, height);
			this.drawSightHeader(0, 0, width, SightHeaderHeight);
			this.drawSightText(4, y, width - 8, SightLineHeight);
		}
	};

	Sprite_FutureSight.prototype.drawSightBack = function(x, y, width, height) {
		this.bitmap.paintOpacity = SightBackOpacity;
		if (Imported.TMBitmapEx && SightCornerRadius) {
			this.bitmap.fillRoundRect(x, y, width, height, SightCornerRadius, SightBackColor);
		} else {
			this.bitmap.fillRect(x, y, width, height, SightBackColor);
		}
		this.bitmap.paintOpacity = 255;
	};

	Sprite_FutureSight.prototype.drawSightHeader = function(x, y, width, height) {
		if (SightHeaderText) {
			this.bitmap.fontSize = SightHeaderFontSize;
			this.bitmap.textColor = SightHeaderColor;
			this.bitmap.drawText(SightHeaderText, x, y, width, height);
		}
	};

	Sprite_FutureSight.prototype.drawSightText = function(x, y, width, height) {
		this.bitmap.fontSize = SightFontSize;
		this.bitmap.textColor = SightColor;
		for (var i = 0; i < this._texts.length; i++) {
			var text = this._texts[i];
			var iconIndex = this._icons[i];
			var dx = x;
			var dw = width;
			if (iconIndex > 0) {
				var iconX = this.sightIconX(text, width);
				if (iconX <= 0) {
					iconX = 0;
					dx += SightLineHeight;
					dw -= SightLineHeight;
				}
				this.drawSightIcon(iconIndex, x + iconX, y);
			}
			var arr = text.split('\n');
			for (var j = 0; j < arr.length; j++) {
				this.bitmap.drawText(arr[j], dx, y, dw, height, SightTextAlign);
				y += SightLineHeight;
			}
		}
	};

	Sprite_FutureSight.prototype.sightIconX = function(text, width) {
		var textWidth = this.bitmap.measureTextWidth(text);
		if (SightTextAlign === 'left') {
			return 0;
		} else if (SightTextAlign === 'center') {
			return (width - textWidth) / 2 - SightLineHeight;
		} else {
			return width - textWidth - SightLineHeight;
		}
	};

	Sprite_FutureSight.prototype.drawSightIcon = function(iconIndex, x, y) {
		var bitmap = ImageManager.loadSystem('IconSet');
		var pw = Window_Base._iconWidth;
		var ph = Window_Base._iconHeight;
		var sx = iconIndex % 16 * pw;
		var sy = Math.floor(iconIndex / 16) * ph;
		var dw = SightLineHeight - 4;
		var dh = SightLineHeight - 4;
		this.bitmap.blt(bitmap, sx, sy, pw, ph, x + 2, y + 2, dw, dh);
	};

	Sprite_FutureSight.prototype.update = function() {
		Sprite.prototype.update.call(this);
		var futureSightTexts = this._enemySprite._enemy.futureSightTexts().concat();
		var futureSightIcons = this._enemySprite._enemy.futureSightIcons().concat();
		if (this._texts.toString() !== futureSightTexts.toString() ||
				this._icons.toString() !== futureSightIcons.toString()) {
			this._texts = futureSightTexts;
			this._icons = futureSightIcons;
			this.refresh();
		}
		var enemy = this._enemySprite._enemy.enemy();
		this.x = this._enemySprite.x + (+enemy.meta.fsOffsetX || 0);
		this.y = this._enemySprite.y + (+enemy.meta.fsOffsetY || 0);
	};

})();
