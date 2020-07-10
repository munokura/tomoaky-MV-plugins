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
 * @plugindesc マップ名の表示を調整し、一部の制御文字に対応します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param windowX
 * @type string
 * @desc マップ名ウィンドウの X 座標
 * 初期値: 0
 * @default 0
 *
 * @param windowY
 * @type string
 * @desc マップ名ウィンドウの Y 座標
 * 初期値: 0
 * @default 0
 *
 * @param windowWidth
 * @type number
 * @desc マップ名ウィンドウの幅
 * 初期値: 360
 * @default 360
 *
 * @param windowLineHeight
 * @type number
 * @desc マップ名ウィンドウの１行の高さ
 * 初期値: 96
 * @default 96
 *
 * @param fontFace
 * @type string
 * @desc マップ名に使用するフォント
 * 初期値: GameFont
 * @default GameFont
 *
 * @param fontSize
 * @type number
 * @desc フォントサイズ
 * 初期値: 28
 * @default 28
 *
 * @help
 * TMPlugin - マップ名表示拡張 ver1.0.1
 * 
 * 使い方:
 *
 *   以下の制御文字が使用できます、内容はイベントコマンド『文章の表示』
 *   のものと同じです。
 *     \V[n]
 *     \N[n]
 *     \P[n]
 *     \\
 *     \G
 *
 *   プラグインコマンドはありません。
 *
 *   このプラグインは RPGツクールMV Version 1.5.0 で動作確認をしています。
 *
 *
 * プラグインパラメータ補足:
 *
 *   fontFace
 *     設定するフォント名は、事前に fonts/gamefont.css を編集して
 *     追加する必要があります。
 *     元から設定されている GameFont をまるごと（ 4 行）コピペして、
 *       font-family: フォント名;
 *       src: url("フォントのファイル名");
 *     上記 2 行を書き換えてください。つまり最終的には 8 行になります。
 *     gamefont.css が編集できたら、設定した『フォントのファイル名』と同名の
 *     フォントファイルを fonts フォルダに置き、fontFace に
 *    『フォント名』を設定してください。
 *
 *     フォントのファイル名に日本語などの2byte文字が含まれていると
 *     エラーが発生する場合があります。
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
