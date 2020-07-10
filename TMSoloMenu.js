//=============================================================================
// TMPlugin - 一人旅メニュー
// バージョン: 0.1.3b
// 最終更新日: 2018/10/22
// 配布元    : https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2018 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 一人旅に特化したメインメニューを導入します。
 *
 * @author tomoaky (https://hikimoki.sakura.ne.jp/)
 *
 * @param commandWindow
 * @type struct<Parameter>
 * @desc コマンドウィンドウのパラメータ
 * @default {"x":"0","y":"0","width":"240"}
 * 
 * @param statusWindow
 * @type struct<Parameter>
 * @desc ステータスウィンドウのパラメータ
 * @default {"x":"240","y":"0","width":"576","height":"624"}
 * 
 * @param goldWindow
 * @type struct<Parameter>
 * @desc 所持金ウィンドウのパラメータ
 * @default {"x":"0","y":"552","width":"240"}
 * 
 * @param menuFace
 * @type struct<Parameter>
 * @desc 顔グラフィックのパラメータ
 * @default {"x":"0","y":"0","width":"144","height":"144"}
 *
 * @param menuName
 * @type struct<Parameter>
 * @desc アクター名のパラメータ
 * @default {"x":"152","y":"0","width":"168"}
 *
 * @param menuNickname
 * @type struct<Parameter>
 * @desc 二つ名のパラメータ
 * @default {"x":"328","y":"0","width":"168","fontSize":"20"}
 *
 * @param menuClass
 * @type struct<Parameter>
 * @desc 職業名のパラメータ
 * @default {"x":"152","y":"36","width":"96"}
 *
 * @param menuLevel
 * @type struct<Parameter>
 * @desc レベルのパラメータ
 * @default {"x":"260","y":"36","width":"280"}
 *
 * @param menuHp
 * @type struct<Parameter>
 * @desc HPのパラメータ
 * @default {"x":"152","y":"72","width":"186"}
 *
 * @param menuMp
 * @type struct<Parameter>
 * @desc MPのパラメータ
 * @default {"x":"152","y":"108","width":"186"}
 *
 * @param menuTp
 * @type struct<Parameter>
 * @desc TPのパラメータ
 * @default {"x":"350","y":"108","width":"120"}
 *
 * @param menuIcons
 * @type struct<Parameter>
 * @desc 状態異常アイコンのパラメータ
 * @default {"x":"0","y":"108","width":"144"}
 *
 * @param menuEquips
 * @type struct<Parameter>
 * @desc 装備のパラメータ
 * @default {"x":"300","y":"172","width":"240","fontSize":"20","cols":"1","space":"8"}
 * 
 * @param menuStateRate
 * @type struct<Parameter>
 * @desc ステート有効度のパラメータ
 * @default {"x":"0","y":"380","width":"97","fontSize":"20","name":"4 5 6 8 9 10","cols":"2","space":"8"}
 * 
 * @param menuElementRate
 * @type struct<Parameter>
 * @desc 属性有効度のパラメータ
 * @default {"x":"233","y":"380","width":"97","fontSize":"20","name":"2 3 4 5 6 7 8 9","cols":"3","space":"8"}
 * 
 * @param menuProfile
 * @type struct<Parameter>
 * @desc プロフィールのパラメータ
 * @default {"x":"0","y":"516","width":"186"}
 * 
 * @param menuMhp
 * @type struct<Parameter>
 * @desc 最大HPのパラメータ
 * @default {"name":"最大HP"}
 *
 * @param menuMmp
 * @type struct<Parameter>
 * @desc 最大MPのパラメータ
 * @default {"name":"最大MP"}
 *
 * @param menuAtk
 * @type struct<Parameter>
 * @desc 攻撃力のパラメータ
 * @default {"x":"0","y":"172","width":"130","fontSize":"20","name":"攻撃"}
 *
 * @param menuDef
 * @type struct<Parameter>
 * @desc 防御力のパラメータ
 * @default {"x":"138","y":"172","width":"130","fontSize":"20","name":"防御"}
 *
 * @param menuMat
 * @type struct<Parameter>
 * @desc 魔法力のパラメータ
 * @default {"x":"0","y":"208","width":"130","fontSize":"20","name":"魔攻"}
 *
 * @param menuMdf
 * @type struct<Parameter>
 * @desc 魔法防御のパラメータ
 * @default {"x":"138","y":"208","width":"130","fontSize":"20","name":"魔防"}
 *
 * @param menuAgi
 * @type struct<Parameter>
 * @desc 敏捷性のパラメータ
 * @default {"x":"0","y":"244","width":"130","fontSize":"20","name":"敏捷"}
 *
 * @param menuLuc
 * @type struct<Parameter>
 * @desc 運のパラメータ
 * @default {"x":"138","y":"244","width":"130","fontSize":"20","name":"幸運"}
 *
 * @param menuHit
 * @type struct<Parameter>
 * @desc 命中率のパラメータ
 * @default {"x":"0","y":"280","width":"130","fontSize":"20","name":"命中"}
 *
 * @param menuEva
 * @type struct<Parameter>
 * @desc 回避率のパラメータ
 * @default {"x":"138","y":"280","width":"130","fontSize":"20","name":"回避"}
 *
 * @param menuCri
 * @type struct<Parameter>
 * @desc 会心率のパラメータ
 * @default {"x":"0","y":"316","width":"130","fontSize":"20","name":"会心"}
 *
 * @param menuCev
 * @type struct<Parameter>
 * @desc 会心回避率のパラメータ
 * @default {"name":"会心回避率"}
 *
 * @param menuMev
 * @type struct<Parameter>
 * @desc 魔法回避率のパラメータ
 * @default {"name":"魔法回避率"}
 *
 * @param menuMrf
 * @type struct<Parameter>
 * @desc 魔法反射率のパラメータ
 * @default {"name":"魔法反射率"}
 *
 * @param menuCnt
 * @type struct<Parameter>
 * @desc 反撃率のパラメータ
 * @default {"x":"138","y":"316","width":"130","fontSize":"20","name":"反撃"}
 *
 * @param menuHrg
 * @type struct<Parameter>
 * @desc HP再生率のパラメータ
 * @default {"name":"HP再生率"}
 *
 * @param menuMrg
 * @type struct<Parameter>
 * @desc MP再生率のパラメータ
 * @default {"name":"MP再生率"}
 *
 * @param menuTrg
 * @type struct<Parameter>
 * @desc TP再生率のパラメータ
 * @default {"name":"TP再生率"}
 * 
 * @param menuTgr
 * @type struct<Parameter>
 * @desc 狙われ率のパラメータ
 * @default {"name":"狙われ率"}
 * 
 * @param menuGrd
 * @type struct<Parameter>
 * @desc 防御効果率のパラメータ
 * @default {"name":"防御効果率"}
 * 
 * @param menuRec
 * @type struct<Parameter>
 * @desc 回復効果率のパラメータ
 * @default {"name":"回復効果率"}
 * 
 * @param menuPha
 * @type struct<Parameter>
 * @desc 薬の知識のパラメータ
 * @default {"name":"薬の知識"}
 * 
 * @param menuMcr
 * @type struct<Parameter>
 * @desc MP消費率のパラメータ
 * @default {"name":"MP消費率"}
 * 
 * @param menuTcr
 * @type struct<Parameter>
 * @desc TPチャージ率のパラメータ
 * @default {"name":"TPチャージ率"}
 * 
 * @param menuPdr
 * @type struct<Parameter>
 * @desc 物理ダメージ率のパラメータ
 * @default {"name":"物理ダメージ率"}
 * 
 * @param menuMdr
 * @type struct<Parameter>
 * @desc 魔法ダメージ率のパラメータ
 * @default {"name":"魔法ダメージ率"}
 * 
 * @param menuFdr
 * @type struct<Parameter>
 * @desc 床ダメージ率のパラメータ
 * @default {"name":"床ダメージ率"}
 * 
 * @param menuExr
 * @type struct<Parameter>
 * @desc 経験獲得率のパラメータ
 * @default {"name":"経験獲得率"}
 * 
 * @param horzLine1
 * @type struct<Parameter>
 * @desc 罫線1のパラメータ
 * @default {"x":"0","y":"162","width":"540","height":"2"}
 *
 * @param horzLine2
 * @type struct<Parameter>
 * @desc 罫線2のパラメータ
 * @default {"x":"0","y":"370","width":"540","height":"2"}
 *
 * @param horzLine3
 * @type struct<Parameter>
 * @desc 罫線3のパラメータ
 * @default {"x":"0","y":"506","width":"540","height":"2"}
 *
 * @param horzLine4
 * @type struct<Parameter>
 * @desc 罫線4のパラメータ
 * @default {"height":"2"}
 *
 * @param horzLine5
 * @type struct<Parameter>
 * @desc 罫線5のパラメータ
 * @default {"height":"2"}
 *
 * @param freeText1
 * @type struct<Parameter>
 * @desc フリーテキスト1のパラメータ
 * @default {"x":"100","y":"144","width":"186","name":"\\C[16]\\}Parameter"}
 *
 * @param freeText2
 * @type struct<Parameter>
 * @desc フリーテキスト2のパラメータ
 * @default {"x":"396","y":"144","width":"186","name":"\\C[16]\\}Equips"}
 *
 * @param freeText3
 * @type struct<Parameter>
 * @desc フリーテキスト3のパラメータ
 * @default {"x":"70","y":"352","width":"186","name":"\\C[16]\\}StateRate"}
 *
 * @param freeText4
 * @type struct<Parameter>
 * @desc フリーテキスト4のパラメータ
 * @default {"x":"344","y":"352","width":"186","name":"\\C[16]\\}ElementRate"}
 *
 * @param freeText5
 * @type struct<Parameter>
 * @desc フリーテキスト5のパラメータ
 * @default {"x":"240","y":"488","width":"186","name":"\\C[16]\\}Profile"}
 *
 * @param freeText6
 * @type struct<Parameter>
 * @desc フリーテキスト6のパラメータ
 * @default {}
 *
 * @param freeText7
 * @type struct<Parameter>
 * @desc フリーテキスト7のパラメータ
 * @default {}
 *
 * @param freeText8
 * @type struct<Parameter>
 * @desc フリーテキスト8のパラメータ
 * @default {}
 *
 * @param freeText9
 * @type struct<Parameter>
 * @desc フリーテキスト9のパラメータ
 * @default {}
 *
 * @param freeText10
 * @type struct<Parameter>
 * @desc フリーテキスト10のパラメータ
 * @default {}
 *
 * @param expGaugeColor1
 * @type number
 * @max 31
 * @desc 経験値ゲージの色1
 * 初期値: 30
 * @default 30
 * 
 * @param expGaugeColor2
 * @type number
 * @max 31
 * @desc 経験値ゲージの色2
 * 初期値: 31
 * @default 31
 * 
 * @param expNextText
 * @type string
 * @desc 経験値の書式
 * 初期値: あと %1exp
 * @default あと %1exp
 * 
 * @param expMaxText
 * @type string
 * @desc 最大レベルのときの経験値の書式
 * 初期値: %1exp
 * @default %1exp
 * 
 * @param expFontSize
 * @type number
 * @desc 経験値の文字の大きさ
 * 初期値: 20
 * @default 20
 * 
 * @param equipMax
 * @type number
 * @desc 装備を表示する最大数
 * 初期値: 5
 * @default 5
 * 
 * @param elementIcons
 * @type string
 * @desc 属性アイコン
 * 初期値: 77 64 65 66 67 68 69 70 71
 * @default 77 64 65 66 67 68 69 70 71
 * 
 * @param textBackColor
 * @type string
 * @desc 文字の背景の色
 * 初期値: #000000
 * @default #000000
 * 
 * @param textBackOpacity
 * @type number
 * @max 255
 * @desc 文字の背景の不透明度
 * 初期値: 128
 * @default 128
 * 
 * @param horzLineColor
 * @type string
 * @desc 罫線の色
 * 初期値: #ffffff
 * @default #ffffff
 * 
 * @param horzLineOpacity
 * @type number
 * @max 255
 * @desc 罫線の不透明度
 * 初期値: 48
 * @default 48
 * 
 * @param forceChangeSoloMenu
 * @type select
 * @option ひとりの時だけ一人旅メニューを使う
 * @value false
 * @option 常に一人旅メニューを使う
 * @value true
 * @desc パーティの人数によるメニュー切り替え方式。
 * 初期値: 常に一人旅メニューを使う (true)
 * @default true
 * 
 * @param soloItemStatus
 * @desc アイテムシーンに表示するパラメータの表示幅
 * ( 名前 / ステート / HP / MP / TP の順で半角スペース区切り)
 * @default 144 160 144 144 96
 *
 * @help
 * TMPlugin - 一人旅メニュー ver0.1.3b
 *
 * 使い方:
 *
 *   プラグインパラメータの値を変更することで、ほぼすべての表示物の
 *   表示位置、文字サイズなどを自由にカスタマイズすることができます。
 *   また、メニュー系シーンにおけるアクター選択の処理も省略されます。
 *
 *   プラグインコマンドはありません。
 * 
 *   このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。
 * 
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 * 
 * 
 * プラグインパラメータ補足:
 * 
 *   width の値に 0 を設定することで、その項目を非表示にすることができます。
 *   プロフィールとフリーテキストには width の値が反映されませんが、
 *   0 を設定すれば非表示にすることはできます。
 * 
 *   height の値が反映されるのは以下の項目のみとなります。
 *     statusWindow / menuFace / horzLine1 ～ horzLine5
 * 
 *   プロフィールとフリーテキストには \C[16] や \} などの制御文字を
 *   使用することができます。
 */
/*~struct~Parameter:
 *
 * @param x
 * @type number
 * @min -1000
 * @desc X座標
 * @default 0
 *
 * @param y
 * @type number
 * @min -1000
 * @desc Y座標
 * @default 0
 *
 * @param width
 * @type number
 * @desc 横方向の大きさ
 * @default 0
 * 
 * @param height
 * @type number
 * @desc 縦方向の大きさ
 * @default 36
 * 
 * @param fontSize
 * @type number
 * @desc 文字の大きさ
 * @default 28
 * 
 * @param name
 * @type string
 * @desc パラメータ名
 * @default 
 * 
 * @param cols
 * @type number
 * @desc 列の数
 * @default 1
 * 
 * @param space
 * @type number
 * @desc 列ごとの空白
 * @default 8
 * 
 * @param fixed
 * @type number
 * @desc 小数点以下の桁数
 * @default 0
 * 
 */

var Imported = Imported || {};
Imported.TMSoloMenu = true;

(function() {

  var parameters = PluginManager.parameters('TMSoloMenu');
  var commandWindow = JSON.parse(parameters['commandWindow'] || '{}');
  var statusWindow = JSON.parse(parameters['statusWindow'] || '{}');
  var goldWindow = JSON.parse(parameters['goldWindow'] || '{}');
  var menuFace = JSON.parse(parameters['menuFace'] || '{}');
  var menuName = JSON.parse(parameters['menuName'] || '{}');
  var menuNickname = JSON.parse(parameters['menuNickname'] || '{}');
  var menuClass = JSON.parse(parameters['menuClass'] || '{}');
  var menuLevel = JSON.parse(parameters['menuLevel'] || '{}');
  var menuHp = JSON.parse(parameters['menuHp'] || '{}');
  var menuMp = JSON.parse(parameters['menuMp'] || '{}');
  var menuTp = JSON.parse(parameters['menuTp'] || '{}');
  var menuIcons = JSON.parse(parameters['menuIcons'] || '{}');
  var menuEquips = JSON.parse(parameters['menuEquips'] || '{}');
  var menuStateRate = JSON.parse(parameters['menuStateRate'] || '{}');
  var menuElementRate = JSON.parse(parameters['menuElementRate'] || '{}');
  var menuProfile = JSON.parse(parameters['menuProfile'] || '{}');
  var battleParameters = [];
  ['menuMhp', 'menuMmp', 'menuAtk', 'menuDef', 'menuMat', 'menuMdf', 'menuAgi', 'menuLuc',
   'menuHit', 'menuEva', 'menuCri', 'menuCev', 'menuMev', 'menuMrf', 'menuCnt', 'menuHrg',
   'menuMrg', 'menuTrg', 'menuTgr', 'menuGrd', 'menuRec', 'menuPha', 'menuMcr', 'menuTcr',
   'menuPdr', 'menuMdr', 'menuFdr', 'menuExr'].forEach(function(code) {
    battleParameters.push(JSON.parse(parameters[code] || '{}'));
  });
  var horzLines = [];
  ['horzLine1', 'horzLine2', 'horzLine3', 'horzLine4', 'horzLine5'].forEach(function(code) {
    horzLines.push(JSON.parse(parameters[code] || '{}'));
  });
  var freeTexts = [];
  ['freeText1', 'freeText2', 'freeText3', 'freeText4', 'freeText5',
   'freeText6', 'freeText7', 'freeText8', 'freeText9', 'freeText10'].forEach(function(code) {
    freeTexts.push(JSON.parse(parameters[code] || '{}'));
  });
  var expGaugeColor1 = +(parameters['expGaugeColor1'] || 30);
  var expGaugeColor2 = +(parameters['expGaugeColor2'] || 31);
  var expNextText = parameters['expNextText'];
  var expMaxText = parameters['expMaxText'];
  var expFontSize = +(parameters['expFontSize'] || 28);
  var equipMax = +(parameters['equipMax'] || 6);
  var elementIcons = parameters['elementIcons'].split(' ').map(Number);
  var textBackColor = parameters['textBackColor'] || '#000000';
  var textBackOpacity = +(parameters['textBackOpacity'] || 128);
  var horzLineColor = parameters['horzLineColor'] || '#ffffff';
  var horzLineOpacity = +(parameters['horzLineOpacity'] || 48);
  var forceChangeSoloMenu = JSON.parse(parameters['forceChangeSoloMenu'] || 'true');
  var soloItemStatus = (parameters['soloItemStatus'] != null ? parameters['soloItemStatus'] : '144 160 144 144 96').split(' ').map(Number);

  //-----------------------------------------------------------------------------
  // Game_Party
  //

  Game_Party.prototype.isSoloMenuValid = function() {
    return forceChangeSoloMenu || this.size() === 1;
  };

  //-----------------------------------------------------------------------------
  // Window_MenuCommand
  //

  var _Window_MenuCommand_windowWidth = Window_MenuCommand.prototype.windowWidth;
  Window_MenuCommand.prototype.windowWidth = function() {
    if ($gameParty.isSoloMenuValid()) return +commandWindow.width;
    return _Window_MenuCommand_windowWidth.call(this);
  };

  //-----------------------------------------------------------------------------
  // Window_SoloStatus
  //

  function Window_SoloStatus() {
    this.initialize.apply(this, arguments);
  }

  Window_SoloStatus.prototype = Object.create(Window_Base.prototype);
  Window_SoloStatus.prototype.constructor = Window_SoloStatus;

  Window_SoloStatus.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, +statusWindow.x, +statusWindow.y,
                                          +statusWindow.width, +statusWindow.height);
//    this.refresh();
    if (!+statusWindow.width) this.hide();
  };

  Window_SoloStatus.prototype.refresh = function() {
    this.contents.clear();
    var actor = $gameParty.leader();
    if (actor && +statusWindow.width) {
      for (var i = 0; i < 5; i++) {
        this.drawHorzLine(horzLines[i]);
      }
      if (+menuFace.width) {
        this.drawActorFace(actor, +menuFace.x, +menuFace.y, +menuFace.width, +menuFace.height);
      }
      if (+menuIcons.width) {
        this.drawActorIcons(actor, +menuIcons.x, +menuIcons.y, +menuIcons.width);
      }
      this.drawSoloParameter(actor, 'NAME', menuName);
      this.drawSoloParameter(actor, 'NICKNAME', menuNickname);
      this.drawSoloParameter(actor, 'CLASS', menuClass);
      this.drawSoloParameter(actor, 'LEVEL', menuLevel);
      this.drawSoloParameter(actor, 'HP', menuHp);
      this.drawSoloParameter(actor, 'MP', menuMp);
      this.drawSoloParameter(actor, 'TP', menuTp);
      this.drawSoloParameter(actor, 'EQUIP', menuEquips);
      this.drawSoloParameter(actor, 'STATE', menuStateRate);
      this.drawSoloParameter(actor, 'ELEMENT', menuElementRate);
      this.drawSoloParameter(actor, 'PROFILE', menuProfile);
      for (var i = 0; i < 28; i++) {
        this.drawBattleParameter(actor, i, battleParameters[i]);
      }
      for (var i = 0; i < 10; i++) {
        this.drawSoloParameter(null, 'TEXT', freeTexts[i]);
      }
    }
  };

  Window_SoloStatus.prototype.drawSoloParameter = function(actor, code, parameter) {
    var width = +parameter.width;
    if (!width) return;
    var x = +parameter.x;
    var y = +parameter.y;
    this.contents.fontSize = +(parameter.fontSize || 28);
    if (code === 'NAME') {
      this.drawActorName(actor, x, y, width);
    } else if (code === 'NICKNAME') {
      this.drawActorNickname(actor, x, y, width);
    } else if (code === 'CLASS') {
      this.drawActorClass(actor, x, y, width);
    } else if (code === 'LEVEL') {
      this.drawActorLevelAndExp(actor, x, y, width);
    } else if (code === 'HP') {
      this.drawActorHp(actor, x, y, width);
    } else if (code === 'MP') {
      this.drawActorMp(actor, x, y, width);
    } else if (code === 'TP') {
      this.drawActorTp(actor, x, y, width);
    } else if (code === 'EQUIP') {
      this.drawEquipments(actor, x, y, width);
    } else if (code === 'PROFILE') {
      this.drawTextEx(actor.profile(), x, y);
    } else if (code === 'TEXT') {
      this.drawTextEx(parameter.name, x, y);
    } else {
      this.drawRates(actor, x, y, width, code, parameter);
    }
    this.resetFontSettings();
  };

  Window_SoloStatus.prototype.drawActorLevelAndExp = function(actor, x, y, width) {
    var color1 = this.textColor(expGaugeColor1);
    var color2 = this.textColor(expGaugeColor2);
    if (actor.isMaxLevel()) {
      var rate = 100;
    } else {
      var currentExp = actor.currentExp() - actor.currentLevelExp();
      var nextExp = actor.nextLevelExp() - actor.currentLevelExp();
      var rate = currentExp / nextExp;
    }
    this.drawGauge(x, y, width, rate, color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.levelA, x, y, 32);
    this.resetTextColor();
    this.drawText(actor.level, x + 36, y, 32, 'right');
    if (expNextText) {
      var text = actor.isMaxLevel() ? expMaxText.format(actor.currentExp()) :
                                      expNextText.format(actor.nextRequiredExp());
      this.contents.fontSize = expFontSize;
      this.drawText(text, x, y, width, 'right');
    }
  };

  Window_SoloStatus.prototype.drawEquipments = function(actor, x, y, width) {
    var equips = actor.equips();
    var count = Math.min(equips.length, equipMax);
    var cols = +menuEquips.cols;
    for (var i = 0; i < count; i++) {
      var x2 = x + (width + +menuEquips.space) * (i % cols);
      var y2 = y + this.lineHeight() * Math.floor(i / cols);
      this.drawTextBack(x2, y2, width);
      this.drawItemName(equips[i], x2, y2, width);
    }
  };

  Window_SoloStatus.prototype.drawRates = function(actor, x, y, width, code, parameter) {
    var ids = parameter.name.split(' ').map(Number);
    var cols = +parameter.cols;
    var iconBoxWidth = Window_Base._iconWidth + 4;
    for (var i = 0; i < ids.length; i++) {
      var x2 = x + (width + +parameter.space) * (i % cols);
      var y2 = y + this.lineHeight() * Math.floor(i / cols);
      if (code === 'STATE') {
        var state = $dataStates[ids[i]];
        if (!state) return;
        var value = actor.stateRate(state.id) * 100;
        var iconIndex = state.iconIndex;
      } else {
        var value = actor.elementRate(ids[i]) * 100;
        var iconIndex = elementIcons[ids[i] - 1];
      }
      this.drawTextBack(x2, y2, width);
      this.drawIcon(iconIndex, x2 + 2, y2 + 2);
      this.drawText(value.toFixed(+parameter.fixed) + '%', x2 + iconBoxWidth, y2,
                    width - iconBoxWidth, 'right');
    }
  };

  Window_SoloStatus.prototype.drawBattleParameter = function(actor, paramId, parameter) {
    var width = +parameter.width;
    if (!width) return;
    var x = +parameter.x;
    var y = +parameter.y;
    this.contents.fontSize = +(parameter.fontSize || 28);
    var textWidth = this.textWidth('00000');
    this.drawTextBack(x, y, width);
    this.changeTextColor(this.systemColor());
    this.drawText(parameter.name, x, y, width - textWidth);
    this.resetTextColor();
    if (paramId < 8) {
      var value = actor.param(paramId);
    } else if (paramId < 18) {
      var value = (actor.xparam(paramId - 8) * 100).toFixed(+parameter.fixed);
    } else if (paramId < 28) {
      var value = (actor.sparam(paramId - 18) * 100).toFixed(+parameter.fixed);
    }
    this.drawText(value, x + width - textWidth, y, textWidth, 'right');
    this.resetFontSettings();
  };

  Window_SoloStatus.prototype.drawTextBack = function(x, y, width) {
    if (textBackOpacity === 0) return;
    var height = this.contents.fontSize + 4;
    y += Math.floor((this.lineHeight() - height) / 2);
    this.contents.paintOpacity = textBackOpacity;
    if (Imported.TMBitmapEx) {
      this.contents.fillRoundRect(x, y, width, height, 6, textBackColor);
    } else {
      this.contents.fillRect(x, y, width, height, textBackColor);
    }
    this.contents.paintOpacity = 255;
  };

  Window_SoloStatus.prototype.drawHorzLine = function(parameter) {
    if (!+parameter.width) return;
    this.contents.paintOpacity = horzLineOpacity;
    this.contents.fillRect(+parameter.x, +parameter.y, +parameter.width,
                           +parameter.height, horzLineColor);
    this.contents.paintOpacity = 255;
  };

  //-----------------------------------------------------------------------------
  // Window_SoloItemStatus
  //

  function Window_SoloItemStatus() {
    this.initialize.apply(this, arguments);
  }

  Window_SoloItemStatus.prototype = Object.create(Window_Base.prototype);
  Window_SoloItemStatus.prototype.constructor = Window_SoloItemStatus;

  Window_SoloItemStatus.prototype.initialize = function(x, y, width) {
    Window_Base.prototype.initialize.call(this, x, y, width, this.fittingHeight(1));
    this.refresh();
  };

  Window_SoloItemStatus.prototype.refresh = function() {
    var x = 0;
    var actor = $gameParty.leader();
    this.contents.clear();
    if (soloItemStatus[0] > 0) {
      this.drawActorName(actor, x, 0, soloItemStatus[0]);
      x += soloItemStatus[0] + 16;
    }
    if (soloItemStatus[1] > 0) {
      this.drawActorIcons(actor, x, 0, soloItemStatus[1]);
      x += soloItemStatus[1] + 16;
    }
    if (soloItemStatus[2] > 0) {
      this.drawActorHp(actor, x, 0, soloItemStatus[2]);
      x += soloItemStatus[2] + 16;
    }
    if (soloItemStatus[3] > 0) {
      this.drawActorMp(actor, x, 0, soloItemStatus[3]);
      x += soloItemStatus[3] + 16;
    }
    if (soloItemStatus[4] > 0) {
      this.drawActorTp(actor, x, 0, soloItemStatus[4]);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Menu
  //

  var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);
    if ($gameParty.isSoloMenuValid()) {
      this._commandWindow.x = +commandWindow.x;
      this._commandWindow.y = +commandWindow.y;
      this.addChild(this._windowLayer.removeChild(this._commandWindow));
    }
  };

  var _Scene_Menu_createStatusWindow = Scene_Menu.prototype.createStatusWindow;
  Scene_Menu.prototype.createStatusWindow = function() {
    if ($gameParty.isSoloMenuValid()) {
      this._statusWindow = new Window_SoloStatus();
      this._statusWindow.reserveFaceImages();
      this.addWindow(this._statusWindow);
    } else {
      _Scene_Menu_createStatusWindow.call(this);
    }
  };

  var _Scene_Menu_createGoldWindow = Scene_Menu.prototype.createGoldWindow;
  Scene_Menu.prototype.createGoldWindow = function() {
    _Scene_Menu_createGoldWindow.call(this);
    this._goldWindow.x = +goldWindow.x;
    this._goldWindow.y = +goldWindow.y;
    this.addChild(this._windowLayer.removeChild(this._goldWindow));
    if (!+goldWindow.width) this._goldWindow.hide();
  };

  var _Scene_Menu_commandPersonal = Scene_Menu.prototype.commandPersonal;
  Scene_Menu.prototype.commandPersonal = function() {
    if ($gameParty.isSoloMenuValid()) {
      $gameParty.setTargetActor($gameParty.leader());
      this.onPersonalOk();
    } else {
      _Scene_Menu_commandPersonal.call(this);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_ItemBase
  //

  var _Scene_ItemBase_itemTargetActors = Scene_ItemBase.prototype.itemTargetActors;
  Scene_ItemBase.prototype.itemTargetActors = function() {
    var action = new Game_Action(this.user());
    action.setItemObject(this.item());
    if ($gameParty.isSoloMenuValid() && action.isForFriend()) {
      return [$gameParty.leader()];
    } else {
      return _Scene_ItemBase_itemTargetActors.call(this);
    }
  };

  var _Scene_ItemBase_determineItem = Scene_ItemBase.prototype.determineItem;
  Scene_ItemBase.prototype.determineItem = function() {
    var action = new Game_Action(this.user());
    action.setItemObject(this.item());
    if ($gameParty.isSoloMenuValid() && action.isForFriend()) {
      if (this.canUse()) {
        this.useItem();
        this._itemWindow.refresh();
        if (this._soloStatusWindow) this._soloStatusWindow.refresh();
      } else {
        SoundManager.playBuzzer();
      }
      this._itemWindow.activate();
    } else {
      _Scene_ItemBase_determineItem.call(this);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Item
  //

  var _Scene_Item_createCategoryWindow = Scene_Item.prototype.createCategoryWindow;
  Scene_Item.prototype.createCategoryWindow = function() {
    var enabled = this.isSoloStatusEnabled();
    if (enabled) {
      var wy = this._helpWindow.height;
      this._soloStatusWindow = new Window_SoloItemStatus(0, wy, Graphics.boxWidth);
      this.addWindow(this._soloStatusWindow);
    }
    _Scene_Item_createCategoryWindow.call(this);
    if (enabled) {
      this._categoryWindow.y += this._soloStatusWindow.height;
    }
  };

  Scene_Item.prototype.isSoloStatusEnabled = function() {
    return (sum = soloItemStatus.reduce(function(a, b) {
      return a + b;
    }) > 0);
  };

})();