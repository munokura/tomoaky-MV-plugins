//=============================================================================
// TMVplugin - ステータス表示拡張（旧版）
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 0.11b
// 最終更新日: 2016/02/26
//=============================================================================

/*:
 * @plugindesc ステータスシーンに表示するパラメータを追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param paramNameX
 * @desc 通常能力値名の表示Ｘ座標
 * 初期値: 6
 * @default 6
 *
 * @param paramX
 * @desc 通常能力値の表示Ｘ座標
 * 初期値: 112
 * @default 112
 *
 * @param paramNameWidth
 * @desc 通常能力値名の表示幅
 * 初期値: 96
 * @default 96
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
 * @param xparamX
 * @desc 追加能力値の表示Ｘ座標
 * 初期値: 330
 * @default 330
 *
 * @param xparamNameWidth
 * @desc 追加能力値名の表示幅
 * 初期値: 120
 * @default 120
 *
 * @param xparamWidth
 * @desc 追加能力値の表示幅
 * 初期値: 60
 * @default 60
 *
 * @param xparamNameCritical
 * @desc 会心率の表示名
 * 初期値: 会心
 * @default 会心
 *
 * @param xparamNameCriticalEva
 * @desc 会心回避率の表示名
 * 初期値: 会心回避
 * @default 会心回避
 *
 * @param xparamNameMagicEva
 * @desc 魔法回避率の表示名
 * 初期値: 魔法回避
 * @default 魔法回避
 *
 * @param xparamNameMagicRef
 * @desc 魔法反射率の表示名
 * 初期値: 魔法反射
 * @default 魔法反射
 *
 * @param xparamNameCounter
 * @desc 反撃率の表示名
 * 初期値: 反撃
 * @default 反撃
 *
 * @param xparamFixed
 * @desc 追加能力値の小数点以下桁数
 * 初期値: 0
 * @default 0
 *
 * @param elementRegistIconX
 * @desc 属性有効度のアイコン表示Ｘ座標
 * 初期値: 6
 * @default 6
 *
 * @param elementRegistX
 * @desc 属性有効度の表示Ｘ座標
 * 初期値: 76
 * @default 76
 *
 * @param elementRegistWidth
 * @desc 属性有効度の表示幅
 * 初期値: 96
 * @default 96
 *
 * @param elementRegistIds
 * @desc 表示する属性有効度
 * 初期値: 2 3 4 5 6 7 8 9
 * @default 2 3 4 5 6 7 8 9
 *
 * @param elementRegistIconIds
 * @desc 表示する属性有効度のアイコン番号
 * 初期値: 64 65 66 67 68 69 70 71
 * @default 64 65 66 67 68 69 70 71
 *
 * @param stateRegistIconX
 * @desc ステート有効度のアイコン表示Ｘ座標
 * 初期値: 204
 * @default 204
 *
 * @param stateRegistX
 * @desc ステート有効度の表示Ｘ座標
 * 初期値: 264
 * @default 264
 *
 * @param stateRegistWidth
 * @desc ステート有効度の表示幅
 * 初期値: 96
 * @default 96
 *
 * @param stateRegistIds
 * @desc 表示するステート有効度
 * 初期値: 4 5 6 7 8 9 10
 * @default 4 5 6 7 8 9 10
 *
 * @param registFixed
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
 * @param paramNameFontFace
 * @desc 項目名に使用するフォント
 * 初期値: GameFont
 * @default GameFont
 *
 * @param paramValueFontFace
 * @desc パラメータに使用するフォント
 * 初期値: GameFont
 * @default GameFont
 *
 * @help
 * ステータスシーンで決定キーを押す、あるいは左クリック（シングルタップ）で
 * 表示するパラメータを切り替えることができます。
 *
 * paramNameFontFace / paramValueFontFace に設定するフォント名は、
 * 事前に fonts/gamefont.css を編集して追加する必要があります。
 * 元から設定されている GameFont をまるごと（４行）コピペして、
 * font-family: フォント名;
 * src: url("フォントのファイル名");
 * 上記２行を書き換えてください。（最終的には８行になります）
 * gamefont.css が編集できたら、設定した『フォントのファイル名』と同名の
 * フォントファイルを fonts フォルダに置き、プラグインパラメータに
 * 『フォント名』を設定してください。
 *
 * フォントのファイル名に日本語などの2byte文字が含まれていると
 * エラーが発生する場合があります。
 *
 * プラグインコマンドはありません。
 * 
 */

var Imported = Imported || {};
Imported.TMStatusMenuEx = true;

(function() {

  var parameters = PluginManager.parameters('TMStatusMenuExOld');
  var paramNameX      = Number(parameters['paramNameX']);
  var paramX          = Number(parameters['paramX']);
  var paramNameWidth  = Number(parameters['paramNameWidth']);
  var paramWidth      = Number(parameters['paramWidth']);
  var xparamNameX     = Number(parameters['xparamNameX']);
  var xparamX         = Number(parameters['xparamX']);
  var xparamNameWidth = Number(parameters['xparamNameWidth']);
  var xparamWidth     = Number(parameters['xparamWidth']);
  var xparamNameCritical = parameters['xparamNameCritical'];
  var xparamNameCriticalEva = parameters['xparamNameCriticalEva'];
  var xparamNameMagicEva = parameters['xparamNameMagicEva'];
  var xparamNameMagicRef = parameters['xparamNameMagicRef'];
  var xparamNameCounter = parameters['xparamNameCounter'];
  var xparamFixed = Number(parameters['xparamFixed']);
  var elementRegistIconX = Number(parameters['elementRegistIconX']);
  var elementRegistX = Number(parameters['elementRegistX']);
  var elementRegistWidth = Number(parameters['elementRegistWidth']);
  var elementRegistIds = parameters['elementRegistIds'].split(' ');
  var elementRegistIconIds = parameters['elementRegistIconIds'].split(' ');
  var stateRegistIconX = Number(parameters['stateRegistIconX']);
  var stateRegistX = Number(parameters['stateRegistX']);
  var stateRegistWidth = Number(parameters['stateRegistWidth']);
  var stateRegistIds = parameters['stateRegistIds'].split(' ');
  var registFixed = Number(parameters['registFixed']);
  var paramBackGround = parameters['paramBackGround'] === '1' ? true : false;
  var paramBackGroundOpacity = Number(parameters['paramBackGroundOpacity']);
  var paramNameFontFace = parameters['paramNameFontFace'];
  var paramValueFontFace = parameters['paramValueFontFace'];
  
  //-----------------------------------------------------------------------------
  // Window_Status
  //

  var _Window_Status_initialize = Window_Status.prototype.initialize;
  Window_Status.prototype.initialize = function() {
    this._parameterMode = 0;
    _Window_Status_initialize.call(this);
  };

  Window_Status.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
      var lineHeight = this.lineHeight();
      this.drawBlock1(lineHeight * 0);
      this.drawHorzLine(lineHeight * 1);
      this.drawBlock2(lineHeight * 2 - 20);
      this.drawHorzLine(lineHeight * 6 - 20);
      this.drawBlock3(lineHeight * 7 - 40);
      this.drawHorzLine(500);
      this.drawBlock4(516);
    }
  };

  Window_Status.prototype.drawHorzLine = function(y) {
    var lineY = y + 7;
    this.contents.paintOpacity = 48;
    this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
    this.contents.paintOpacity = 255;
    this._horzLineCount++;
  };

  Window_Status.prototype.drawParamBackGround = function(x, y, width) {
    this.contents.paintOpacity = paramBackGroundOpacity;
    this.contents.fillRect(x, y + this.lineHeight() / 2, width,
                           this.lineHeight() / 2, this.gaugeBackColor());
    this.contents.paintOpacity = 255;
  };
  
  Window_Status.prototype.drawParameters = function(x, y) {
    if (this._parameterMode === 1) {
      this.drawRegists(x, y);
    } else {
      x = paramNameX;
      var w = paramNameWidth;
      var x2 = paramX;
      var w2 = paramWidth;
      var lineHeight = this.lineHeight();
      for (var i = 0; i < 6; i++) {
        var y2 = y + lineHeight * i;
        if (paramBackGround) {
          this.drawParamBackGround(x, y2, x2 + w2 - x);
        }
        var paramId = i + 2;
        this.changeTextColor(this.systemColor());
        this.contents.fontFace = paramNameFontFace;
        this.drawText(TextManager.param(paramId), x, y2, w);
        this.resetTextColor();
        this.contents.fontFace = paramValueFontFace;
        this.drawText(this._actor.param(paramId), x2, y2, w2, 'right');
      }
      x = xparamNameX;
      w = xparamNameWidth;
      x2 = xparamX;
      w2 = xparamWidth;
      if (paramBackGround) {
        for (var i = 0, n; i < 7; i++) {
          this.drawParamBackGround(x, y + lineHeight * i, x2 + w2 - x);
        }
      }
      this.changeTextColor(this.systemColor());
      this.contents.fontFace = paramNameFontFace;
      this.drawText(TextManager.param(8),  x, y + lineHeight * 0, w);
      this.drawText(TextManager.param(9),  x, y + lineHeight * 1, w);
      this.drawText(xparamNameCritical,    x, y + lineHeight * 2, w);
      this.drawText(xparamNameCriticalEva, x, y + lineHeight * 3, w);
      this.drawText(xparamNameMagicEva,    x, y + lineHeight * 4, w);
      this.drawText(xparamNameMagicRef,    x, y + lineHeight * 5, w);
      this.drawText(xparamNameCounter,     x, y + lineHeight * 6, w);
      this.resetTextColor();
      this.contents.fontFace = paramValueFontFace;
      for (var i = 0, n; i < 7; i++) {
        n = this._actor.xparam(i) * 100;
        this.drawText(n.toFixed(xparamFixed), x2, y + lineHeight * i, w2, 'right');
      }
      this.contents.fontFace = this.standardFontFace();
    }
  };
  
  Window_Status.prototype.drawRegists = function(x, y) {
    this.resetTextColor();
    this.contents.fontFace = paramValueFontFace;
    var lineHeight = this.lineHeight();
    x = elementRegistIconX;
    var x2 = elementRegistX;
    var w2 = elementRegistWidth;
    for (var i = 0; i < elementRegistIds.length; i++) {
      var y2 = y + lineHeight * i;
      if (paramBackGround) {
        this.drawParamBackGround(x, y2, x2 + w2 - x);
      }
      var elementId = Number(elementRegistIds[i]);
      this.drawIcon(elementRegistIconIds[i], x, y2);
      var n = this._actor.elementRate(elementId) * 100;
      this.drawText(n.toFixed(registFixed) + '%', x2, y2, w2, 'right');
    }
    x = stateRegistIconX;
    var x2 = stateRegistX;
    var w2 = stateRegistWidth;
    for (var i = 0; i < stateRegistIds.length; i++) {
      var y2 = y + lineHeight * i;
      if (paramBackGround) {
        this.drawParamBackGround(x, y2, x2 + w2 - x);
      }
      var stateId = Number(stateRegistIds[i]);
      var state = $dataStates[stateId];
      this.drawIcon(state.iconIndex, x, y2);
      var n = this._actor.stateRate(stateId) * 100;
      if (this._actor.isStateResist(stateId)) {
        n = 0;
      }
      this.drawText(n.toFixed(registFixed) + '%', x2, y2, w2, 'right');
    }
    this.contents.fontFace = this.standardFontFace();
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
    if (Input.isTriggered('ok') || TouchInput.isTriggered()) {
      SoundManager.playOk();
      this._statusWindow.changeParameterMode();
      this._statusWindow.activate();
    }
  };

})();
