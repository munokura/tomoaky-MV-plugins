//=============================================================================
// TMPlugin - 行の高さを変更
// バージョン: 1.0.0
// 最終更新日: 2017/10/17
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc ウィンドウの行の高さを変更します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param helpLineRate
 * @type number
 * @decimals 2
 * @desc ヘルプの行の高さの補正倍率
 * 初期値: 1.00
 * @default 1.00
 *
 * @param itemListLineRate
 * @type number
 * @decimals 2
 * @desc アイテムリストの行の高さの補正倍率
 * 初期値: 1.00
 * @default 1.00
 *
 * @param skillListLineRate
 * @type number
 * @decimals 2
 * @desc スキルリストの行の高さの補正倍率
 * 初期値: 1.00
 * @default 1.00
 *
 * @param equipSlotLineRate
 * @type number
 * @decimals 2
 * @desc 装備スロットの行の高さの補正倍率
 * 初期値: 1.00
 * @default 1.00
 *
 * @param equipStatusLineRate
 * @type number
 * @decimals 2
 * @desc 装備ステータスの行の高さの補正倍率
 * 初期値: 1.00
 * @default 1.00
 *
 * @help
 * TMPlugin - 行の高さを変更 ver1.0.0
 *
 * 使い方:
 *
 *   プラグインコマンドはありません。
 *
 *   このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。
 * 
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 */

var Imported = Imported || {};
Imported.TMLineHeightEx = true;

(function() {

  var parameters = PluginManager.parameters('TMLineHeightEx');
  var helpLineRate = +(parameters['helpLineRate'] || 1);
  var itemListLineRate = +(parameters['itemListLineRate'] || 1);
  var skillListLineRate = +(parameters['skillListLineRate'] || 1);
  var equipStatusLineRate = +(parameters['equipStatusLineRate'] || 1);
  var equipSlotLineRate = +(parameters['equipSlotLineRate'] || 1);

  //-----------------------------------------------------------------------------
  // Window_Base
  //

  Window_Base.prototype.lineRate = function() {
    return 1;
  };

  var _Window_Base_lineHeight = Window_Base.prototype.lineHeight;
  Window_Base.prototype.lineHeight = function() {
    var result = _Window_Base_lineHeight.call(this);
    return Math.floor(result * this.lineRate());
  };

  var _Window_Base_standardFontSize = Window_Base.prototype.standardFontSize;
  Window_Base.prototype.standardFontSize = function() {
    var result = _Window_Base_standardFontSize.call(this);
    return Math.floor(result * this.lineRate());
  };

  Window_Base.prototype.drawIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    var dw = Math.floor(pw * this.lineRate());
    var dh = Math.floor(ph * this.lineRate());
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
  };

  Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
      var iconWidth = Math.floor(Window_Base._iconWidth * this.lineRate());
      var iconHeight = Math.floor(Window_Base._iconHeight * this.lineRate());
      var iconBoxWidth = iconWidth + Math.round(4 * this.lineRate());
      this.resetTextColor();
      this.drawIcon(item.iconIndex, x + Math.floor((iconBoxWidth - iconWidth) / 2),
                    y + Math.round((this.lineHeight() - iconHeight) / 2));
      this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_Help
  //

  Window_Help.prototype.lineRate = function() {
    return helpLineRate;
  };

  Window_Help.prototype.calcTextHeight = function(textState, all) {
    var lastFontSize = this.contents.fontSize;
    var textHeight = 0;
    var lines = textState.text.slice(textState.index).split('\n');
    var maxLines = all ? lines.length : 1;
    for (var i = 0; i < maxLines; i++) {
      var maxFontSize = this.contents.fontSize;
      var regExp = /\x1b[\{\}]/g;
      for (;;) {
        var array = regExp.exec(lines[i]);
        if (array) {
          if (array[0] === '\x1b{') this.makeFontBigger();
          if (array[0] === '\x1b}') this.makeFontSmaller();
          if (maxFontSize < this.contents.fontSize) maxFontSize = this.contents.fontSize;
        } else {
          break;
        }
      }
      textHeight += maxFontSize + Math.floor(8 * this.lineRate());
    }
    this.contents.fontSize = lastFontSize;
    return textHeight;
  };

  //-----------------------------------------------------------------------------
  // Window_ItemList
  //

  Window_ItemList.prototype.lineRate = function() {
    return itemListLineRate;
  };

  //-----------------------------------------------------------------------------
  // Window_SkillList
  //

  Window_SkillList.prototype.lineRate = function() {
    return skillListLineRate;
  };

  //-----------------------------------------------------------------------------
  // Window_EquipStatus
  //

  Window_EquipStatus.prototype.lineRate = function() {
    return equipStatusLineRate;
  };

  //-----------------------------------------------------------------------------
  // Window_EquipSlot
  //

  Window_EquipSlot.prototype.lineRate = function() {
    return equipSlotLineRate;
  };

})();