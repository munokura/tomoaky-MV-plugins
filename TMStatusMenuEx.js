//=============================================================================
// TMVplugin - ステータス表示拡張
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2016/02/26
//=============================================================================

/*:
 * @plugindesc ステータスシーンに表示するパラメータを追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param descriptionKeyCode
 * @desc 表示切替ボタンとして使うキー
 * 初期値: 65（ 65 = A, 66 = B, 67 = C, ... ）
 * @default 65
 *
 * @param useOkKey
 * @desc 表示切替ボタンとして決定キー（Enter, Z など）を使う
 * 初期値: 1（ 0 で使わない）
 * @default 1
 *
 * @param horzLineHeight
 * @desc 横線の余白も含めた高さ
 * 初期値: 28
 * @default 28
 *
 * @param xparamText
 * @desc 追加能力値の項目名（カンマ区切りで１０項目）
 * 初期値: 命中,回避,会心,会心回避,魔法回避,魔法反射,反撃,…
 * @default 命中,回避,会心,会心回避,魔法回避,魔法反射,反撃,ＨＰ再生,ＭＰ再生,ＴＰ再生
 *
 * @param sparamText
 * @desc 特殊能力値の項目名（カンマ区切りで１０項目）
 * 初期値: 狙われ率,防御効果,回復効果,薬の知識,ＭＰ消費,…
 * @default 狙われ率,防御効果,回復効果,薬の知識,ＭＰ消費,ＴＰチャージ,,,床ダメージ,経験値獲得
 *
 * @param paramNameX
 * @desc 通常能力値名の表示Ｘ座標
 * 初期値: 6
 * @default 6
 *
 * @param paramNameWidth
 * @desc 通常能力値名の表示幅
 * 初期値: 96
 * @default 96
 *
 * @param paramX
 * @desc 通常能力値の表示Ｘ座標
 * 初期値: 112
 * @default 112
 *
 * @param paramWidth
 * @desc 通常能力値の表示幅
 * 初期値: 60
 * @default 60
 *
 * @param xparamNameX
 * @desc 追加能力値名の表示Ｘ座標
 * 初期値: 204
 * @default 204
 *
 * @param xparamNameWidth
 * @desc 追加能力値名の表示幅
 * 初期値: 120
 * @default 120
 *
 * @param xparamX
 * @desc 追加能力値の表示Ｘ座標
 * 初期値: 330
 * @default 330
 *
 * @param xparamWidth
 * @desc 追加能力値の表示幅
 * 初期値: 60
 * @default 60
 *
 * @param xparamFixed
 * @desc 追加能力値の小数点以下桁数
 * 初期値: 0
 * @default 0
 *
 * @param sparamNameX
 * @desc 特殊能力値名の表示Ｘ座標
 * 初期値: 432
 * @default 432
 *
 * @param sparamNameWidth
 * @desc 特殊能力値名の表示幅
 * 初期値: 172
 * @default 172
 *
 * @param sparamX
 * @desc 特殊能力値の表示Ｘ座標
 * 初期値: 610
 * @default 610
 *
 * @param sparamWidth
 * @desc 特殊能力値の表示幅
 * 初期値: 80
 * @default 80
 *
 * @param sparamFixed
 * @desc 特殊能力値の小数点以下桁数
 * 初期値: 0
 * @default 0
 *
 * @param elementResistX
 * @desc 属性有効度の表示Ｘ座標
 * 初期値: 6
 * @default 6
 *
 * @param elementResistWidth
 * @desc 属性有効度の表示幅
 * 初期値: 160
 * @default 160
 *
 * @param elementResistIds
 * @desc 表示する属性有効度
 * 初期値: 2,3,4,5,6,7,8,9
 * @default 2,3,4,5,6,7,8,9
 *
 * @param elementResistIconIds
 * @desc 表示する属性有効度のアイコン番号
 * 初期値: 64,65,66,67,68,69,70,71
 * @default 64,65,66,67,68,69,70,71
 *
 * @param pdrIconId
 * @desc 物理ダメージ率のアイコン番号（ 0 で非表示）
 * 初期値: 77
 * @default 77
 *
 * @param mdrIconId
 * @desc 魔法ダメージ率のアイコン番号（ 0 で非表示）
 * 初期値: 79
 * @default 79
 *
 * @param stateResistX
 * @desc ステート有効度の表示Ｘ座標
 * 初期値: 204
 * @default 204
 *
 * @param stateResistWidth
 * @desc ステート有効度の表示幅
 * 初期値: 160
 * @default 160
 *
 * @param stateResistIds
 * @desc 表示するステート有効度
 * 初期値: 4,5,6,7,8,9,10
 * @default 4,5,6,7,8,9,10
 *
 * @param resistFixed
 * @desc 有効度の小数点以下桁数
 * 初期値: 1
 * @default 1
 *
 * @param paramBackGround
 * @desc パラメータの背景を暗くするかどうか
 * 初期値: 1 ( 0 で無効)
 * @default 1
 *
 * @param paramBackGroundOpacity
 * @desc パラメータの背景の暗さ（ 1 ～ 255 ）
 * 初期値: 160
 * @default 160
 *
 * @param useNicknameEx
 * @desc 二つ名と職業をまとめて表示する
 * 初期値: 0（ 1 で有効）
 * @default 0
 *
 * @param useMaxLevel
 * @desc 最大レベルを表示するかどうか
 * 初期値: 1（ 0 で無効）
 * @default 1
 *
 * @param maxLevelColor
 * @desc レベルが最大の場合の文字色番号
 * 初期値: 5
 * @default 5
 *
 * @help
 * 使い方:
 *   ステータスシーンでＡキーを押す、あるいは左クリック（シングルタップ）で
 *   表示するパラメータを切り替えることができます。
 *
 *   useNicknameEx を 1 に設定することで二つ名と職業をセットで表示できます。
 *   二つ名を '髪殺しの' とか '邪竜屠りの' とかにすることで、同じ職業でも
 *   キャラごとの違いを際立たせることができるかもしれません。
 *
 * プラグインコマンドはありません。
 * 
 */

var Imported = Imported || {};
Imported.TMStatusMenuEx = true;

(function() {

  var parameters = PluginManager.parameters('TMStatusMenuEx');
  Input.keyMapper[+parameters['descriptionKeyCode']] = 'description';
  var useOkButton = parameters['useOkButton'] === '1' ? true : false;
  var horzLineHeight = +parameters['horzLineHeight'];
  var xparamText = parameters['xparamText'].split(',');
  var sparamText = parameters['sparamText'].split(',');
  var paramNameX      = +parameters['paramNameX'];
  var paramNameWidth  = +parameters['paramNameWidth'];
  var paramX          = +parameters['paramX'];
  var paramWidth      = +parameters['paramWidth'];
  var xparamNameX     = +parameters['xparamNameX'];
  var xparamNameWidth = +parameters['xparamNameWidth'];
  var xparamX         = +parameters['xparamX'];
  var xparamWidth     = +parameters['xparamWidth'];
  var xparamFixed     = +parameters['xparamFixed'];
  var sparamNameX     = +parameters['sparamNameX'];
  var sparamNameWidth = +parameters['sparamNameWidth'];
  var sparamX         = +parameters['sparamX'];
  var sparamWidth     = +parameters['sparamWidth'];
  var sparamFixed     = +parameters['sparamFixed'];
  var elementResistX       = +parameters['elementResistX'];
  var elementResistWidth   = +parameters['elementResistWidth'];
  var elementResistIds     = parameters['elementResistIds'].split(',');
  var elementResistIconIds = parameters['elementResistIconIds'].split(',');
  var pdrIconId            = +parameters['pdrIconId'];
  var mdrIconId            = +parameters['mdrIconId'];
  var stateResistX         = +parameters['stateResistX'];
  var stateResistWidth     = +parameters['stateResistWidth'];
  var stateResistIds       = parameters['stateResistIds'].split(',');
  var resistFixed          = +parameters['resistFixed'];
  var paramBackGround        = parameters['paramBackGround'] === '1' ? true : false;
  var paramBackGroundOpacity = +parameters['paramBackGroundOpacity'];
  var useNicknameEx = parameters['useNicknameEx'] === '1' ? true : false;
  var useMaxLevel = parameters['useMaxLevel'] === '1' ? true : false;
  var maxLevelColor = +parameters['maxLevelColor'];
  
  //-----------------------------------------------------------------------------
  // Window_Base
  //
  
  Window_Base.prototype.levelWidth = function() {
    return 160;
  };

  var _Window_Base_drawActorLevel = Window_Base.prototype.drawActorLevel;
  Window_Base.prototype.drawActorLevel = function(actor, x, y) {
    if (useMaxLevel) {
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.levelA, x, y, 48);
      var level = actor.level;
      var maxLevel = actor.maxLevel();
      var color1 = level === maxLevel ? this.textColor(maxLevelColor) : this.normalColor();
      this.drawCurrentAndMax(level, maxLevel, x, y, this.levelWidth(),
                             color1, this.normalColor());
    } else {
      _Window_Base_drawActorLevel.call(this, actor, x, y);
    }
  };

  var _Window_Base_drawActorSimpleStatus = Window_Base.prototype.drawActorSimpleStatus;
  Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    if (useNicknameEx) {
      var lineHeight = this.lineHeight();
      y -= lineHeight * 0.5 - 8;
      this.contents.fontSize = 20;
      var text = actor.nickname() + actor.currentClass().name;
      this.contents.drawText(text, x, y, width, 20, 'left');
      this.resetFontSettings();
      var x2 = x + 180;
      y += 20;
      var width2 = Math.min(200, width - 180 - this.textPadding());
      this.drawActorName(actor, x + 20, y);
      this.drawActorLevel(actor, x, y + lineHeight * 1);
      this.drawActorIcons(actor, x, y + lineHeight * 2);
      this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
      this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
    } else {
      _Window_Base_drawActorSimpleStatus.call(this, actor, x, y, width);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_Status
  //

  Window_Status.prototype.levelWidth = function() {
    return 186;
  };

  var _Window_Status_initialize = Window_Status.prototype.initialize;
  Window_Status.prototype.initialize = function() {
    this._parameterMode = 0;
    _Window_Status_initialize.call(this);
  };

  Window_Status.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
      var lineHeight = this.lineHeight();
      var y = 0;
      y = this.drawBlock1(y);
      y = this.drawHorzLine(y);
      if (this._parameterMode === 0) {
        y = this.drawBlock2(y);
        y = this.drawHorzLine(y);
        this.drawBlock3(y);
      } else {
        this.drawBlock5(y);
      }
      y = this.contents.height - lineHeight * 2 - horzLineHeight;
      y = this.drawHorzLine(y);
      this.drawBlock4(y);
    }
  };

  var _Window_Status_drawBlock1 = Window_Status.prototype.drawBlock1;
  Window_Status.prototype.drawBlock1 = function(y) {
    if (useNicknameEx) {
      this.drawActorName(this._actor, 6, y);
      this.resetTextColor();
      var x = this.textWidth(this._actor.name()) + 6;
      var text = this._actor.nickname() + this._actor.currentClass().name;
      this.drawText(text, x, y, this.contents.width - x - this.textPadding(), 'right');
    } else {
      _Window_Status_drawBlock1.call(this, y);
    }
    return y + this.lineHeight() * 1;
  };

  var _Window_Status_drawBlock2 = Window_Status.prototype.drawBlock2;
  Window_Status.prototype.drawBlock2 = function(y) {
    _Window_Status_drawBlock2.call(this, y);
    return y + this.lineHeight() * 4;
  };

  Window_Status.prototype.drawBlock5 = function(y) {
    this.drawElementResists(y);
    this.drawStateResists(y);
    this.drawSparams(y);
  };
  
  Window_Status.prototype.drawHorzLine = function(y) {
    this.contents.paintOpacity = 48;
    this.contents.fillRect(0, y + horzLineHeight / 2 - 1,
                           this.contentsWidth(), 2, this.lineColor());
    this.contents.paintOpacity = 255;
    return y + horzLineHeight;
  };

  Window_Status.prototype.drawParamBackGround = function(x, y, width) {
    this.contents.paintOpacity = paramBackGroundOpacity;
    this.contents.fillRect(x, y + this.lineHeight() / 2, width,
                           this.lineHeight() / 2, this.gaugeBackColor());
    this.contents.paintOpacity = 255;
  };
  
  Window_Status.prototype.drawParameters = function(x, y) {
    this.drawParams(y);
    this.drawXparams(y);
  };
  
  Window_Status.prototype.drawParams = function(y) {
    var x = paramNameX;
    var w = paramNameWidth;
    var x2 = paramX;
    var w2 = paramWidth;
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 6; i++) {
      var paramId = i + 2;
      if (TextManager.param(paramId)) {
        if (paramBackGround) this.drawParamBackGround(x, y, x2 + w2 - x);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(paramId), x, y, w);
        this.resetTextColor();
        this.drawText(this._actor.param(paramId), x2, y, w2, 'right');
        y += lineHeight;
      }
    }
  };
  
  Window_Status.prototype.drawXparams = function(y) {
    var x = xparamNameX;
    var w = xparamNameWidth;
    var x2 = xparamX;
    var w2 = xparamWidth;
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 7; i++) {
      if (xparamText[i]) {
        if (paramBackGround) this.drawParamBackGround(x, y, x2 + w2 - x);
        this.changeTextColor(this.systemColor());
        this.drawText(xparamText[i], x, y, w);
        this.resetTextColor();
        var value = this._actor.xparam(i) * 100;
        this.drawText(value.toFixed(xparamFixed), x2, y, w2, 'right');
        y += lineHeight;
      }
    }
  };

  Window_Status.prototype.drawSparams = function(y) {
    var x = sparamNameX;
    var w = sparamNameWidth;
    var x2 = sparamX;
    var w2 = sparamWidth;
    var lineHeight = this.lineHeight();
    for (var i = 7; i < 10; i++) {
      if (xparamText[i]) {
        if (paramBackGround) this.drawParamBackGround(x, y, x2 + w2 - x);
        this.changeTextColor(this.systemColor());
        this.drawText(xparamText[i], x, y, w);
        this.resetTextColor();
        var value = this._actor.xparam(i) * 100;
        this.drawText(value.toFixed(xparamFixed) + '%', x2, y, w2, 'right');
        y += lineHeight;
      }
    }
    for (var i = 0; i < 10; i++) {
      if (sparamText[i]) {
        if (paramBackGround) this.drawParamBackGround(x, y, x2 + w2 - x);
        this.changeTextColor(this.systemColor());
        this.drawText(sparamText[i], x, y, w);
        this.resetTextColor();
        var value = this._actor.sparam(i) * 100;
        this.drawText(value.toFixed(sparamFixed) + '%', x2, y, w2, 'right');
        y += lineHeight;
      }
    }
  };
  
  Window_Status.prototype.drawElementResists = function(y) {
    var x = elementResistX;
    var w = elementResistWidth;
    var lineHeight = this.lineHeight();
    if (pdrIconId > 0) {
      if (paramBackGround) this.drawParamBackGround(x, y, w);
      this.drawIcon(pdrIconId, x, y);
      var n = this._actor.pdr * 100;
      this.drawText(n.toFixed(resistFixed) + '%', x + Window_Base._iconWidth,
                    y, w - Window_Base._iconWidth, 'right');
      y += lineHeight;
    }
    if (mdrIconId > 0) {
      if (paramBackGround) this.drawParamBackGround(x, y, w);
      this.drawIcon(mdrIconId, x, y);
      var n = this._actor.mdr * 100;
      this.drawText(n.toFixed(resistFixed) + '%', x + Window_Base._iconWidth,
                    y, w - Window_Base._iconWidth, 'right');
      y += lineHeight;
    }
    for (var i = 0; i < elementResistIds.length; i++) {
      if (paramBackGround) this.drawParamBackGround(x, y, w);
      var elementId = +elementResistIds[i];
      this.drawIcon(elementResistIconIds[i], x, y);
      var n = this._actor.elementRate(elementId) * 100;
      this.drawText(n.toFixed(resistFixed) + '%', x + Window_Base._iconWidth,
                    y, w - Window_Base._iconWidth, 'right');
      y += lineHeight;
    }
  };
  
  Window_Status.prototype.drawStateResists = function(y) {
    var x = stateResistX;
    var w = stateResistWidth;
    var lineHeight = this.lineHeight();
    for (var i = 0; i < stateResistIds.length; i++) {
      if (paramBackGround) this.drawParamBackGround(x, y, w);
      var stateId = +stateResistIds[i];
      this.drawIcon($dataStates[stateId].iconIndex, x, y);
      var n = this._actor.stateRate(stateId) * 100;
      if (this._actor.isStateResist(stateId)) n = 0;
      this.drawText(n.toFixed(resistFixed) + '%', x + Window_Base._iconWidth,
                    y, w - Window_Base._iconWidth, 'right');
      y += lineHeight;
    }
  };
  
  Window_Status.prototype.changeParameterMode = function() {
    this._parameterMode = (this._parameterMode + 1) % 2;
    this.refresh();
  };

  //-----------------------------------------------------------------------------
  // Scene_Status
  //

  var _Scene_Status_update = Scene_Status.prototype.update;
  Scene_Status.prototype.update = function() {
    _Scene_Status_update.call(this);
    if (Input.isTriggered('description') || TouchInput.isTriggered() ||
        (useOkButton && Input.isTriggered('ok'))) {
      SoundManager.playOk();
      this._statusWindow.changeParameterMode();
      this._statusWindow.activate();
    }
  };

})();
