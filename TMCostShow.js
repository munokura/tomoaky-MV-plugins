//=============================================================================
// TMPlugin - コスト表示拡張
// バージョン: 1.0.0
// 最終更新日: 2017/09/25
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2015 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc The cost of skills that consume both MP and TP is
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
TMPlugin - Cost Display Extension ver1.0.0

How to Use:

If the skill name is long or the cost has many digits, the skill name and cost will overlap.

You can limit the skill name's display width by changing the number of characters in the parameter costWidthText.

For example, if costWidthText is 00000, the cost display width will be set to five half-width characters, narrowing the skill name display width accordingly.

If you are also using TMSkillCostEx, the cost will also be displayed as HP, experience points, and money.

There are no plugin commands.

This plugin has been tested with RPG Maker MV Version 1.5.1.

This plugin is distributed under the MIT License and is free for commercial use, modification, and redistribution.

@param mpCostHeader
@desc String to prefix MP consumption Initial value: MP
@default MP

@param tpCostHeader
@desc String to prefix to consumed TP. Default: TP
@default TP

@param conjunction
@desc String to be placed between costs. Default: /
@default /

@param costWidthText
@desc String to refer to as cost range Initial value: 000
@default 000

@param maxCostNum
@desc Maximum cost to display at the same time Default: 2
@default 2

@param ---TMSkillCostEx---
@default The following is used in conjunction with TMSkillCostEx

@param hpCostHeader
@desc String to prefix HP consumption Initial value: HP
@default HP

@param expCostHeader
@desc String to prefix the exp consumed Initial value: EXP
@default EXP

@param expCostFooter
@desc String to be added to the end of the exp consumed Initial value:

@param goldCostHeader
@desc String to prefix the consumption amount. Default:

@param goldCostFooter
@desc String to be attached to the end of the consumed money Initial value: G
@default G

@param hpCostColor
@desc HP Consumption Text Color Number Default: 21
@default 21

@param expCostColor
@desc EXP consumption text color number Default: 16
@default 16

@param goldCostColor
@desc Consumption money text color number Initial value: 0
@default 0
*/


/*:ja
@plugindesc ＭＰ消費とＴＰ消費が両方設定されたスキルのコストを
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - コスト表示拡張 ver1.0.0

使い方:

  スキル名が長い場合や、コストの桁数が多い場合にはスキル名とコストが
  重なって表示されてしまいます。

  パラメータ costWidthText の文字数を変更することで
  スキル名の表示幅に上限を設けることができます。
  たとえば costWidthText が 00000 の場合、コストの表示幅として
  半角の 0 ５文字分を確保し、スキル名の表示幅をその分だけ狭くします。

  TMSkillCostEx を併用している場合、消費ＨＰ、経験値、お金も
  コスト表示されるようになります。

  プラグインコマンドはありません。

  このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。

  このプラグインはMITライセンスのもとに配布しています、商用利用、
  改造、再配布など、自由にお使いいただけます。

@param mpCostHeader
@desc 消費MPの頭につける文字列 初期値: MP
@default MP

@param tpCostHeader
@desc 消費TPの頭につける文字列 初期値: TP
@default TP

@param conjunction
@desc コストとコストの間につける文字列 初期値: /
@default /

@param costWidthText
@desc コストの幅として参照する文字列 初期値: 000
@default 000

@param maxCostNum
@desc 同時に表示するコストの上限 初期値: 2
@default 2

@param ---TMSkillCostEx---
@default 以下はTMSkillCostEx併用時に利用

@param hpCostHeader
@desc 消費HPの頭につける文字列 初期値: HP
@default HP

@param expCostHeader
@desc 消費経験値の頭につける文字列 初期値: EXP
@default EXP

@param expCostFooter
@desc 消費経験値のお尻につける文字列 初期値:

@param goldCostHeader
@desc 消費お金の頭につける文字列 初期値:

@param goldCostFooter
@desc 消費お金のお尻につける文字列 初期値: G
@default G

@param hpCostColor
@desc 消費HPの文字色番号 初期値: 21
@default 21

@param expCostColor
@desc 消費経験値の文字色番号 初期値: 16
@default 16

@param goldCostColor
@desc 消費お金の文字色番号 初期値: 0
@default 0
*/

var Imported = Imported || {};
Imported.TMCostShow = true;

(function() {

  var parameters = PluginManager.parameters('TMCostShow');
  var hpCostHeader = parameters['hpCostHeader'];
  var mpCostHeader = parameters['mpCostHeader'];
  var tpCostHeader = parameters['tpCostHeader'];
  var expCostHeader = parameters['expCostHeader'];
  var expCostFooter = parameters['expCostFooter'];
  var goldCostHeader = parameters['goldCostHeader'];
  var goldCostFooter = parameters['goldCostFooter'];
  var conjunction = parameters['conjunction'];
  var costWidthText = parameters['costWidthText'];
  var maxCostNum = Number(parameters['maxCostNum'])
  var hpCostColor   = Number(parameters['hpCostColor']);
  var expCostColor  = Number(parameters['expCostColor']);
  var goldCostColor = Number(parameters['goldCostColor']);
  
  //-----------------------------------------------------------------------------
  // Window_SkillList
  //

  Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    x += width;
    var count = 0;
    var cost = this._actor.skillTpCost(skill);
    if (cost > 0) {
      x = this.drawSkillTpCost(cost, x, y);
      if (count++ === maxCostNum - 1) {
        return;
      }
    }
    cost = this._actor.skillMpCost(skill);
    if (cost > 0) {
      x = this.drawSkillMpCost(cost, x, y, count);
      if (count++ === maxCostNum - 1) {
        return;
      }
    }
    if (Imported.TMSkillCostEx) {
      cost = this._actor.skillHpCost(skill);
      if (cost > 0) {
        x = this.drawSkillHpCost(cost, x, y, count);
        if (count++ === maxCostNum - 1) {
          return;
        }
      }
      cost = this._actor.skillExpCost(skill);
      if (cost > 0) {
        x = this.drawSkillExpCost(cost, x, y, count);
        if (count++ === maxCostNum - 1) {
          return;
        }
      }
      cost = this._actor.skillGoldCost(skill);
      if (cost > 0) {
        x = this.drawSkillGoldCost(cost, x, y, count);
        if (count++ === maxCostNum - 1) {
          return;
        }
      }
    }
  };

  Window_SkillList.prototype.drawConjunction = function(x, y) {
    this.resetTextColor();
    x -= this.textWidth(conjunction);
    this.drawText(conjunction, x, y);
    return x;
  };

  Window_SkillList.prototype.drawSkillTpCost = function(tpCost, x, y) {
    this.changeTextColor(this.tpCostColor());
    x -= this.textWidth(tpCost);
    this.drawText(tpCost, x, y);
    x -= this.drawSkillCostHeader(tpCostHeader, x, y);
    return x;
  };
  
  Window_SkillList.prototype.drawSkillMpCost = function(mpCost, x, y, count) {
    if (count > 0) {
      x = this.drawConjunction(x, y);
    }
    this.changeTextColor(this.mpCostColor());
    x -= this.textWidth(mpCost);
    this.drawText(mpCost, x, y);
    x -= this.drawSkillCostHeader(mpCostHeader, x, y);
    return x;
  };
  
  Window_SkillList.prototype.drawSkillHpCost = function(hpCost, x, y, count) {
    if (count > 0) {
      x = this.drawConjunction(x, y);
    }
    this.changeTextColor(this.textColor(hpCostColor));
    x -= this.textWidth(hpCost);
    this.drawText(hpCost, x, y);
    x -= this.drawSkillCostHeader(hpCostHeader, x, y);
    return x;
  };
  
  Window_SkillList.prototype.drawSkillExpCost = function(expCost, x, y, count) {
    if (count > 0) {
      x = this.drawConjunction(x, y);
    }
    x -= this.drawSkillCostFooter(expCostFooter, x, y);
    this.changeTextColor(this.textColor(expCostColor));
    x -= this.textWidth(expCost);
    this.drawText(expCost, x, y);
    x -= this.drawSkillCostHeader(expCostHeader, x, y);
    return x;
  };
  
  Window_SkillList.prototype.drawSkillGoldCost = function(goldCost, x, y, count) {
    if (count > 0) {
      x = this.drawConjunction(x, y);
    }
    x -= this.drawSkillCostFooter(goldCostFooter, x, y);
    this.changeTextColor(this.textColor(goldCostColor));
    x -= this.textWidth(goldCost);
    this.drawText(goldCost, x, y);
    x -= this.drawSkillCostHeader(goldCostHeader, x, y);
    return x;
  };
  
  Window_SkillList.prototype.drawSkillCostHeader = function(header, x, y) {
    this.contents.fontSize = this.standardFontSize() - 12;
    var w = this.textWidth(header);
    this.drawText(header, x - w, y + 4, w);
    this.contents.fontSize = this.standardFontSize();
    return w;
  };
  
  Window_SkillList.prototype.drawSkillCostFooter = function(footer, x, y) {
    this.changeTextColor(this.systemColor());
    var w = this.textWidth(footer);
    this.drawText(footer, x - w, y, w);
    return w;
  };
  
  Window_SkillList.prototype.costWidth = function() {
    return this.textWidth(costWidthText);
  };

})();