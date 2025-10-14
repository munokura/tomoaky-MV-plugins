//=============================================================================
// TMPlugin - グラデーション文字
// バージョン: 0.1.0b
// 最終更新日: 2020/03/09
// 配布元    : https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2020 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc Apply a vertical gradient to the text color.
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
TMPlugin - Gradient Text ver0.1.0b

How to Use:

Once installed, you can use the control characters \CG[n,m,...] in events such as the "Enter Text" command.

Example: This is \CG[2,3]Test\C[0].
The values you specify are color numbers, just like \C[n]. You can specify as many as you like, separated by commas.
The text color will be a gradient created by arranging these color numbers from top to bottom.
Changing the text color with \C[n] will also remove the gradient.
(In the example above, the gradient is applied only to the "test" string.)

This plugin has been tested with RPG Maker MV Version 1.6.2.

This plugin is distributed under the MIT License and is free for commercial use, modification, and redistribution.
*/


/*:ja
@plugindesc 文字の描画色として縦方向のグラデーションを適用します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - グラデーション文字 ver0.1.0b

使い方:

  導入するとイベントコマンド『文章の入力』等で制御文字 \CG[n,m,...] が
  使用できるようになります。

  使用例: これは\CG[2,3]テスト\C[0]です
  設定する数値は \C[n] と同様の色番号です、カンマで区切って好きなだけ
  指定することができます。
  この色番号を上から下に並べたグラデーションが文字色となります。
  \C[n] で文字色を変更するとグラデーションも解除されます。
  （上記の使用例では テスト の文字列にだけグラデーションが適用）

  このプラグインは RPGツクールMV Version 1.6.2 で動作確認をしています。

  このプラグインはMITライセンスのもとに配布しています、商用利用、
  改造、再配布など、自由にお使いいただけます。
*/

var Imported = Imported || {};
Imported.TMGradientText = true;

(function() {

	//-----------------------------------------------------------------------------
	// Bitmap
	//

	var _Bitmap_drawText = Bitmap.prototype.drawText;
	Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
		this._tmgtY = y;
		this._tmgtLineHeight = lineHeight;
		_Bitmap_drawText.call(this, text, x, y, maxWidth, lineHeight, align);
	};

	var _Bitmap__drawTextBody = Bitmap.prototype._drawTextBody;
	Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth) {
		if (this._tmgtColorTable) {
			var context = this._context;
			context.fillStyle = this.tmgtFillstyle(tx);
			context.fillText(text, tx, ty, maxWidth);
		} else {
			_Bitmap__drawTextBody.call(this, text, tx, ty, maxWidth);
		}
	};

	Bitmap.prototype.tmgtFillstyle = function(x) {
		var y = this._tmgtY;
		var grad = this._context.createLinearGradient(x, y, x, y + this._tmgtLineHeight);
		var interval = 1.0 / (this._tmgtColorTable.length - 1)
		for (var i = 0; i < this._tmgtColorTable.length; i++) {
			grad.addColorStop(i * interval, this._tmgtColorTable[i]);
		}
		return grad;
	};
	
	Bitmap.prototype.setTmgtColorTable = function(colorTable) {
		this._tmgtColorTable = colorTable;
	};
	
	//-----------------------------------------------------------------------------
	// Window_Base
	//

	var _Window_Base_resetTextColor = Window_Base.prototype.resetTextColor;
	Window_Base.prototype.resetTextColor = function() {
		_Window_Base_resetTextColor.call(this);
		this.contents.setTmgtColorTable(null);
	};
	
	var _Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
	Window_Base.prototype.processEscapeCharacter = function(code, textState) {
		_Window_Base_processEscapeCharacter.call(this, code, textState);
		switch (code) {
		case 'CG':
			this.contents.setTmgtColorTable(this.tmgtObtainEscapeParam(textState));
			break;
		case 'C':
			this.contents.setTmgtColorTable(null);
			break;
		}
	};
	
	Window_Base.prototype.tmgtObtainEscapeParam = function(textState) {
		var arr = /^\[((?:\d|\,)+)\]/.exec(textState.text.slice(textState.index));
		if (arr) {
			textState.index += arr[0].length;
			return arr[1].split(',').map(function(n) {
				return this.textColor(+n);
			}, this);
		} else {
			return '';
		}
	};
	
})();