//=============================================================================
// TMPlugin - アイテム所持上限設定
// バージョン: 1.0.0
// 最終更新日: 2018/04/27
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2018 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc アイテムの所持上限数を個別に設定します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param numberMaxDigits
 * @type number
 * @min 1
 * @desc 最大所持上限のケタ数
 * 初期値: 4
 * @default 4
 * 
 * @param numberFontSize
 * @type number
 * @desc 個数表示のフォントサイズ
 * 初期値: 24
 * @default 24
 * 
 * @param numberSeparator
 * @desc 個数の前に表示する文字列
 * @default ×
 * 
 * @help
 * TMPlugin - アイテム所持上限設定 ver1.0.0
 *
 * 使い方:
 *
 *   アイテムのメモ欄に <maxItems:9999> というタグで所持上限数を設定します。
 *   タグがないアイテムの所持上限数は 99 のままです。
 * 
 *   プラグインコマンドはありません。
 *
 *   このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。
 * 
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 * 
 * 
 * 注意:
 * 
 *   Window_ItemList の numberWidth と drawItemNumber、
 *   Window_ShopNumber の maxDigits を上書きしています。
 *   プラグイン管理でこのプラグインをなるべく上の方に配置すると
 *   他のプラグインとの競合を回避できるかもしれません。
 */

var Imported = Imported || {};
Imported.TMMaxItems = true;

(function() {

  var parameters = PluginManager.parameters('TMMaxItems');
  var numberMaxDigits = +(parameters['numberMaxDigits'] || 4);
  var numberFontSize = +(parameters['numberFontSize'] || 24);
  var numberSeparator = parameters['numberSeparator'] || '×';

  //-----------------------------------------------------------------------------
  // Game_Party
  //

  var _Game_Party_maxItems = Game_Party.prototype.maxItems;
  Game_Party.prototype.maxItems = function(item) {
    if (item.meta.maxItems) return Math.max(+item.meta.maxItems, 1);
    return _Game_Party_maxItems.call(this, item);
  };

  //-----------------------------------------------------------------------------
  // Window_ItemList
  //

  Window_ItemList.prototype.numberWidth = function() {
    var fontSize = this.contents.fontSize;
    var result;
    this.contents.fontSize = numberFontSize;
    result = this.textWidth(numberSeparator + Array(numberMaxDigits + 1).join('0'));
    this.contents.fontSize = fontSize;
    return result;
  };

  Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
    var fontSize = this.contents.fontSize;
    var numberWidth;
    if (this.needsNumber()) {
      this.contents.fontSize = numberFontSize;
      numberWidth = this.textWidth(Array(numberMaxDigits + 1).join('0'));
      this.drawText(numberSeparator, x, y, width - numberWidth, 'right');
      this.drawText($gameParty.numItems(item), x, y, width, 'right');
      this.contents.fontSize = fontSize;
    }
  };

  //-----------------------------------------------------------------------------
  // Window_ShopNumber
  //

  Window_ShopNumber.prototype.maxDigits = function() {
    return numberMaxDigits;
  };

})();