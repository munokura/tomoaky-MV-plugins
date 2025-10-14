//=============================================================================
// TMVplugin - マップ名表示拡張
// バージョン: 1.0.1
// 最終更新日: 2017/06/16
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc Adjusted map name display to accommodate some control characters.
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
TMPlugin - Map Name Display Extension ver1.0.1

How to Use:

The following control characters are available. They are the same as those used in the "Show Text" Event's Contents.
\V[n]
\N[n]
\P[n]
\\
\G

There are no plugin commands.

This plugin has been tested with RPG Maker MV Version 1.5.0.

Plugin Parameter Notes:

fontFace
The font name you specify must be added by editing fonts/gamefont.css beforehand.

Copy and paste the original GameFont (four lines) into the following line:

font-family: font name;

src: url("font filename");

Rewrite the two lines above. This will result in eight lines in total.
After editing gamefont.css, place a font file with the same name as the "font filename" you set in the fonts folder and set fontFace to the "font name."

If the font filename contains double-byte characters, such as Japanese,
an error may occur.

@param windowX
@desc X coordinate of map name window Initial value: 0
@default 0
@type string

@param windowY
@desc Y coordinate of map name window Initial value: 0
@default 0
@type string

@param windowWidth
@desc Map name window width Default: 360
@default 360
@type number

@param windowLineHeight
@desc Map name window line height Default: 96
@default 96
@type number

@param fontFace
@desc Font to use for map names. Default: GameFont
@default GameFont
@type string

@param fontSize
@desc Font size default: 28
@default 28
@type number
*/


/*:ja
@plugindesc マップ名の表示を調整し、一部の制御文字に対応します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - マップ名表示拡張 ver1.0.1

使い方:

  以下の制御文字が使用できます、内容はイベントコマンド『文章の表示』
  のものと同じです。
    \V[n]
    \N[n]
    \P[n]
    \\
    \G

  プラグインコマンドはありません。

  このプラグインは RPGツクールMV Version 1.5.0 で動作確認をしています。


プラグインパラメータ補足:

  fontFace
    設定するフォント名は、事前に fonts/gamefont.css を編集して
    追加する必要があります。
    元から設定されている GameFont をまるごと（ 4 行）コピペして、
      font-family: フォント名;
      src: url("フォントのファイル名");
    上記 2 行を書き換えてください。つまり最終的には 8 行になります。
    gamefont.css が編集できたら、設定した『フォントのファイル名』と同名の
    フォントファイルを fonts フォルダに置き、fontFace に
   『フォント名』を設定してください。

    フォントのファイル名に日本語などの2byte文字が含まれていると
    エラーが発生する場合があります。

@param windowX
@desc マップ名ウィンドウの X 座標 初期値: 0
@default 0
@type string

@param windowY
@desc マップ名ウィンドウの Y 座標 初期値: 0
@default 0
@type string

@param windowWidth
@desc マップ名ウィンドウの幅 初期値: 360
@default 360
@type number

@param windowLineHeight
@desc マップ名ウィンドウの１行の高さ 初期値: 96
@default 96
@type number

@param fontFace
@desc マップ名に使用するフォント 初期値: GameFont
@default GameFont
@type string

@param fontSize
@desc フォントサイズ 初期値: 28
@default 28
@type number
*/

var Imported = Imported || {};
Imported.TMMapNameEx = true;

(function() {

  var parameters = PluginManager.parameters('TMMapNameEx');
  var windowX = +(parameters['windowX'] || 0);
  var windowY = +(parameters['windowY'] || 0);
  var windowWidth = +(parameters['windowWidth'] || 360);
  var windowLineHeight = +(parameters['windowLineHeight'] || 96);
  var fontFace = parameters['fontFace'] || 'GameFont';
  var fontSize = +(parameters['fontSize'] || 28);
  
  //-----------------------------------------------------------------------------
  // Window_MapName
  //

  var _Window_MapName_initialize = Window_MapName.prototype.initialize;
  Window_MapName.prototype.initialize = function() {
    _Window_MapName_initialize.call(this);
    this.x = windowX;
    this.y = windowY;
  };

  Window_MapName.prototype.refresh = function() {
    this.contents.clear();
    if ($gameMap.displayName()) {
      var width = this.contentsWidth();
      var text = this.convertEscapeCharacters($gameMap.displayName());
      this.drawBackground(0, 0, width, this.lineHeight());
      this.contents.fontFace = fontFace;
      this.contents.fontSize = fontSize;
      this.drawText(text, 0, 0, width, 'center');
    }
  };

  Window_MapName.prototype.windowWidth = function() {
    return windowWidth;
  };

  Window_MapName.prototype.lineHeight = function() {
    return windowLineHeight;
  };

})();