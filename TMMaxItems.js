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
@target MZ MV
@plugindesc Set the maximum number of items you can own individually.
@author tomoaky
@url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/TMMaxItems.js
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/tomoaky-MV-plugins ).
Original plugin by tomoaky.
-----
TMPlugin - Item Possession Limit Setting ver1.0.0

How to Use:

Set the item possession limit with the tag <maxItems:9999> in the item's Note field.
Items without this tag will remain at 99.

There is no plugin command.

Note:

This plugin overrides the numberWidth and drawItemNumber of Window_ItemList, and the maxDigits of Window_ShopNumber.
Placing this plugin as high up in the plugin manager as possible may help avoid conflicts with other plugins.

Terms of Use:
MIT License.
https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
You may be able to modify and redistribute this plugin without permission, and there are no restrictions on its use (commercial, 18+, etc.).

@param numberMaxDigits
@text Maximum possession limit
@desc Maximum number of digits you can own Initial value: 4
@default 4
@type number
@min 1

@param numberFontSize
@text Quantity display font size
@desc Font size for item count display Default: 24
@default 24
@type number

@param numberSeparator
@text String to display before the number
@desc String to display before the number
@default ×
*/


/*:ja
@target MZ MV
@plugindesc アイテムの所持上限数を個別に設定します。
@author tomoaky
@url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/TMMaxItems.js
@license MIT License

@help
TMPlugin - アイテム所持上限設定 ver1.0.0

使い方:

  アイテムのメモ欄に <maxItems:9999> というタグで所持上限数を設定します。
  タグがないアイテムの所持上限数は 99 のままです。

  プラグインコマンドはありません。


注意:

  Window_ItemList の numberWidth と drawItemNumber、
  Window_ShopNumber の maxDigits を上書きしています。
  プラグイン管理でこのプラグインをなるべく上の方に配置すると
  他のプラグインとの競合を回避できるかもしれません。


利用規約:
  MITライセンスです。
  https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。

@param numberMaxDigits
@text 最大所持上限のケタ数
@desc 最大所持上限のケタ数 初期値: 4
@default 4
@type number
@min 1

@param numberFontSize
@text 個数表示のフォントサイズ
@desc 個数表示のフォントサイズ 初期値: 24
@default 24
@type number

@param numberSeparator
@text 個数の前に表示する文字列
@desc 個数の前に表示する文字列
@default ×
*/

var Imported = Imported || {};
Imported.TMMaxItems = true;

(function () {
  'use strict';

  var parameters = PluginManager.parameters('TMMaxItems');
  var numberMaxDigits = +(parameters['numberMaxDigits'] || 4);
  var numberFontSize = +(parameters['numberFontSize'] || 24);
  var numberSeparator = parameters['numberSeparator'] || '×';

  //-----------------------------------------------------------------------------
  // Game_Party
  //

  var _Game_Party_maxItems = Game_Party.prototype.maxItems;
  Game_Party.prototype.maxItems = function (item) {
    if (item.meta.maxItems) return Math.max(+item.meta.maxItems, 1);
    return _Game_Party_maxItems.call(this, item);
  };

  //-----------------------------------------------------------------------------
  // Window_ItemList
  //

  Window_ItemList.prototype.numberWidth = function () {
    var fontSize = this.contents.fontSize;
    var result;
    this.contents.fontSize = numberFontSize;
    result = this.textWidth(numberSeparator + Array(numberMaxDigits + 1).join('0'));
    this.contents.fontSize = fontSize;
    return result;
  };

  Window_ItemList.prototype.drawItemNumber = function (item, x, y, width) {
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

  Window_ShopNumber.prototype.maxDigits = function () {
    return numberMaxDigits;
  };

})();