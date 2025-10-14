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
@plugindesc We will introduce a main menu specifically for solo travelers.
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
TMPlugin - Solo Travel Menu ver0.1.3b

How to Use:

By changing the plugin parameter values, you can freely customize the display position, text size, and other aspects of almost all displayed items.

Actor selection in menu scenes is also skipped.

There are no plugin commands.

This plugin has been tested with RPG Maker MV Version 1.6.1.

This plugin is distributed under the MIT License and is free to use, including commercial use, modifications, and redistribution.

Plugin Parameter Notes:

You can hide an item by setting its width to 0.

The width value does not affect the profile and free text, but you can hide them by setting it to 0.

The height value only affects the following items:

statusWindow / menuFace / horzLine1 through horzLine5

You can use control characters such as \C[16] and \} in the profile and free text.

@param commandWindow
@desc Command Window Parameters
@default {"x":"0","y":"0","width":"240"}
@type struct<Parameter>

@param statusWindow
@desc Status Window Parameters
@default {"x":"240","y":"0","width":"576","height":"624"}
@type struct<Parameter>

@param goldWindow
@desc Money window parameters
@default {"x":"0","y":"552","width":"240"}
@type struct<Parameter>

@param menuFace
@desc Face graphic parameters
@default {"x":"0","y":"0","width":"144","height":"144"}
@type struct<Parameter>

@param menuName
@desc Actor Name Parameter
@default {"x":"152","y":"0","width":"168"}
@type struct<Parameter>

@param menuNickname
@desc Two-name parameters
@default {"x":"328","y":"0","width":"168","fontSize":"20"}
@type struct<Parameter>

@param menuClass
@desc Occupation name parameters
@default {"x":"152","y":"36","width":"96"}
@type struct<Parameter>

@param menuLevel
@desc Level parameters
@default {"x":"260","y":"36","width":"280"}
@type struct<Parameter>

@param menuHp
@desc HP parameters
@default {"x":"152","y":"72","width":"186"}
@type struct<Parameter>

@param menuMp
@desc MP parameters
@default {"x":"152","y":"108","width":"186"}
@type struct<Parameter>

@param menuTp
@desc Take Profit parameters
@default {"x":"350","y":"108","width":"120"}
@type struct<Parameter>

@param menuIcons
@desc Status Abnormality Icon Parameters
@default {"x":"0","y":"108","width":"144"}
@type struct<Parameter>

@param menuEquips
@desc Equipment parameters
@default {"x":"300","y":"172","width":"240","fontSize":"20","cols":"1","space":"8"}
@type struct<Parameter>

@param menuStateRate
@desc State validity parameters
@default {"x":"0","y":"380","width":"97","fontSize":"20","name":"4 5 6 8 9 10","cols":"2","space":"8"}
@type struct<Parameter>

@param menuElementRate
@desc Elements Efficiency Parameters
@default {"x":"233","y":"380","width":"97","fontSize":"20","name":"2 3 4 5 6 7 8 9","cols":"3","space":"8"}
@type struct<Parameter>

@param menuProfile
@desc Profile parameters
@default {"x":"0","y":"516","width":"186"}
@type struct<Parameter>

@param menuMhp
@desc Max HP parameters
@default {"name":"最大HP"}
@type struct<Parameter>

@param menuMmp
@desc Maximum MP parameters
@default {"name":"最大MP"}
@type struct<Parameter>

@param menuAtk
@desc Attack power parameters
@default {"x":"0","y":"172","width":"130","fontSize":"20","name":"Attack"}
@type struct<Parameter>

@param menuDef
@desc Defense parameters
@default {"x":"138","y":"172","width":"130","fontSize":"20","name":"Defense"}
@type struct<Parameter>

@param menuMat
@desc Magical Power Parameters
@default {"x":"0","y":"208","width":"130","fontSize":"20","name":"MAT"}
@type struct<Parameter>

@param menuMdf
@desc Magic defense parameters
@default {"x":"138","y":"208","width":"130","fontSize":"20","name":"MDF"}
@type struct<Parameter>

@param menuAgi
@desc Agility Parameter
@default {"x":"0","y":"244","width":"130","fontSize":"20","name":"AGI"}
@type struct<Parameter>

@param menuLuc
@desc Luck Parameter
@default {"x":"138","y":"244","width":"130","fontSize":"20","name":"LUC"}
@type struct<Parameter>

@param menuHit
@desc Hit Rate Parameter
@default {"x":"0","y":"280","width":"130","fontSize":"20","name":"Hit Rate"}
@type struct<Parameter>

@param menuEva
@desc Evasion rate parameter
@default {"x":"138","y":"280","width":"130","fontSize":"20","name":"Evasion Rate"}
@type struct<Parameter>

@param menuCri
@desc Criticality Rate Parameters
@default {"x":"0","y":"316","width":"130","fontSize":"20","name":"Critical Rate"}
@type struct<Parameter>

@param menuCev
@desc Critical hit avoidance rate parameter
@default {"name":"Critical Evasion"}
@type struct<Parameter>

@param menuMev
@desc Magic evasion rate parameter
@default {"name":"Magic Evasion"}
@type struct<Parameter>

@param menuMrf
@desc Magic Reflectionion Parameter
@default {"name":"Magic Reflection"}
@type struct<Parameter>

@param menuCnt
@desc Counter Attack rate parameter
@default {"x":"138","y":"316","width":"130","fontSize":"20","name":"Counter Attack"}
@type struct<Parameter>

@param menuHrg
@desc HP regeneration rate parameter
@default {"name":"HP Regeneration"}
@type struct<Parameter>

@param menuMrg
@desc MP regeneration rate parameter
@default {"name":"MP Regeneration"}
@type struct<Parameter>

@param menuTrg
@desc TP regeneration rate parameters
@default {"name":"TP Regeneration"}
@type struct<Parameter>

@param menuTgr
@desc Target Rate Parameter
@default {"name":"Target Rate"}
@type struct<Parameter>

@param menuGrd
@desc Defense effectiveness parameter
@default {"name":"Guard Effect"}
@type struct<Parameter>

@param menuRec
@desc Recovery effect rate parameter
@default {"name":"Recovery Effect"}
@type struct<Parameter>

@param menuPha
@desc Drug Knowledge Parameters
@default {"name":"Pharmacology"}
@type struct<Parameter>

@param menuMcr
@desc MP consumption rate parameters
@default {"name":"MP Cost Rate"}
@type struct<Parameter>

@param menuTcr
@desc TP charge rate parameters
@default {"name":"TP Charge Rate"}
@type struct<Parameter>

@param menuPdr
@desc Physical damage rate parameters
@default {"name":"Physical Damage"}
@type struct<Parameter>

@param menuMdr
@desc Magic damage rate parameters
@default {"name":"Magic Damage"}
@type struct<Parameter>

@param menuFdr
@desc Floor damage rate parameter
@default {"name":"Floor Damage"}
@type struct<Parameter>

@param menuExr
@desc Experience Gain Rate Parameter
@default {"name":"Experience"}
@type struct<Parameter>

@param horzLine1
@desc Rule 1 parameters
@default {"x":"0","y":"162","width":"540","height":"2"}
@type struct<Parameter>

@param horzLine2
@desc Rule 2 parameters
@default {"x":"0","y":"370","width":"540","height":"2"}
@type struct<Parameter>

@param horzLine3
@desc Rule 3 parameters
@default {"x":"0","y":"506","width":"540","height":"2"}
@type struct<Parameter>

@param horzLine4
@desc Rule 4 parameters
@default {"height":"2"}
@type struct<Parameter>

@param horzLine5
@desc Rule 5 parameters
@default {"height":"2"}
@type struct<Parameter>

@param freeText1
@desc Free Text 1 Parameters
@default {"x":"100","y":"144","width":"186","name":"\\C[16]\\}Parameter"}
@type struct<Parameter>

@param freeText2
@desc Free Text 2 Parameters
@default {"x":"396","y":"144","width":"186","name":"\\C[16]\\}Equips"}
@type struct<Parameter>

@param freeText3
@desc Free Text 3 Parameters
@default {"x":"70","y":"352","width":"186","name":"\\C[16]\\}StateRate"}
@type struct<Parameter>

@param freeText4
@desc Free Text 4 Parameters
@default {"x":"344","y":"352","width":"186","name":"\\C[16]\\}ElementRate"}
@type struct<Parameter>

@param freeText5
@desc Free Text 5 Parameters
@default {"x":"240","y":"488","width":"186","name":"\\C[16]\\}Profile"}
@type struct<Parameter>

@param freeText6
@desc Free Text 6 Parameters
@default {}
@type struct<Parameter>

@param freeText7
@desc Free Text 7 Parameters
@default {}
@type struct<Parameter>

@param freeText8
@desc Free Text 8 Parameters
@default {}
@type struct<Parameter>

@param freeText9
@desc Free Text 9 Parameters
@default {}
@type struct<Parameter>

@param freeText10
@desc Free text 10 parameters
@default {}
@type struct<Parameter>

@param expGaugeColor1
@desc Experience Gauge Color 1 Initial Value: 30
@default 30
@type number
@max 31

@param expGaugeColor2
@desc Experience Gauge Color 2 Initial Value: 31
@default 31
@type number
@max 31

@param expNextText
@desc Experience format Default: Next %1 EXP
@default Next %1 EXP
@type string

@param expMaxText
@desc EXP format at maximum level Default: %1 EXP
@default %1 EXP
@type string

@param expFontSize
@desc Experience value font size Default: 20
@default 20
@type number

@param equipMax
@desc Maximum number of equipment to display Default: 5
@default 5
@type number

@param elementIcons
@desc Elements Icon Default: 77 64 65 66 67 68 69 70 71
@default 77 64 65 66 67 68 69 70 71
@type string

@param textBackColor
@desc Text background color Default: #000000
@default #000000
@type string

@param textBackOpacity
@desc Text background opacity Default: 128
@default 128
@type number
@max 255

@param horzLineColor
@desc Border color Default: #ffffff
@default #ffffff
@type string

@param horzLineOpacity
@desc Border Opacity Default: 48
@default 48
@type number
@max 255

@param forceChangeSoloMenu
@desc Menu switching method according to the number of people in the party. Default: Always use the solo travel menu (true)
@default true
@type select
@option Use the solo travel menu only when traveling alone
@value false
@option Always use the solo travel menu
@value true

@param soloItemStatus
@desc Display width of parameters to be displayed in the item scene (Name / State / HP / MP / TP in this order, separated by a space)
@default 144 160 144 144 96
*/


/*~struct~Parameter:
@param x
@desc X coordinate
@default 0
@type number
@min -1000

@param y
@desc Y coordinate
@default 0
@type number
@min -1000

@param width
@desc Horizontal size
@default 0
@type number

@param height
@desc Vertical size
@default 36
@type number

@param fontSize
@desc Font size
@default 28
@type number

@param name
@desc Parameter Name
@type string

@param cols
@desc Number of columns
@default 1
@type number

@param space
@desc Column spacing
@default 8
@type number

@param fixed
@desc Decimal places
@default 0
@type number
*/


/*:ja
@plugindesc 一人旅に特化したメインメニューを導入します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - 一人旅メニュー ver0.1.3b

使い方:

  プラグインパラメータの値を変更することで、ほぼすべての表示物の
  表示位置、文字サイズなどを自由にカスタマイズすることができます。
  また、メニュー系シーンにおけるアクター選択の処理も省略されます。

  プラグインコマンドはありません。

  このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。

  このプラグインはMITライセンスのもとに配布しています、商用利用、
  改造、再配布など、自由にお使いいただけます。


プラグインパラメータ補足:

  width の値に 0 を設定することで、その項目を非表示にすることができます。
  プロフィールとフリーテキストには width の値が反映されませんが、
  0 を設定すれば非表示にすることはできます。

  height の値が反映されるのは以下の項目のみとなります。
    statusWindow / menuFace / horzLine1 ～ horzLine5

  プロフィールとフリーテキストには \C[16] や \} などの制御文字を
  使用することができます。

@param commandWindow
@desc コマンドウィンドウのパラメータ
@default {"x":"0","y":"0","width":"240"}
@type struct<Parameter>

@param statusWindow
@desc ステータスウィンドウのパラメータ
@default {"x":"240","y":"0","width":"576","height":"624"}
@type struct<Parameter>

@param goldWindow
@desc 所持金ウィンドウのパラメータ
@default {"x":"0","y":"552","width":"240"}
@type struct<Parameter>

@param menuFace
@desc 顔グラフィックのパラメータ
@default {"x":"0","y":"0","width":"144","height":"144"}
@type struct<Parameter>

@param menuName
@desc アクター名のパラメータ
@default {"x":"152","y":"0","width":"168"}
@type struct<Parameter>

@param menuNickname
@desc 二つ名のパラメータ
@default {"x":"328","y":"0","width":"168","fontSize":"20"}
@type struct<Parameter>

@param menuClass
@desc 職業名のパラメータ
@default {"x":"152","y":"36","width":"96"}
@type struct<Parameter>

@param menuLevel
@desc レベルのパラメータ
@default {"x":"260","y":"36","width":"280"}
@type struct<Parameter>

@param menuHp
@desc HPのパラメータ
@default {"x":"152","y":"72","width":"186"}
@type struct<Parameter>

@param menuMp
@desc MPのパラメータ
@default {"x":"152","y":"108","width":"186"}
@type struct<Parameter>

@param menuTp
@desc TPのパラメータ
@default {"x":"350","y":"108","width":"120"}
@type struct<Parameter>

@param menuIcons
@desc 状態異常アイコンのパラメータ
@default {"x":"0","y":"108","width":"144"}
@type struct<Parameter>

@param menuEquips
@desc 装備のパラメータ
@default {"x":"300","y":"172","width":"240","fontSize":"20","cols":"1","space":"8"}
@type struct<Parameter>

@param menuStateRate
@desc ステート有効度のパラメータ
@default {"x":"0","y":"380","width":"97","fontSize":"20","name":"4 5 6 8 9 10","cols":"2","space":"8"}
@type struct<Parameter>

@param menuElementRate
@desc 属性有効度のパラメータ
@default {"x":"233","y":"380","width":"97","fontSize":"20","name":"2 3 4 5 6 7 8 9","cols":"3","space":"8"}
@type struct<Parameter>

@param menuProfile
@desc プロフィールのパラメータ
@default {"x":"0","y":"516","width":"186"}
@type struct<Parameter>

@param menuMhp
@desc 最大HPのパラメータ
@default {"name":"最大HP"}
@type struct<Parameter>

@param menuMmp
@desc 最大MPのパラメータ
@default {"name":"最大MP"}
@type struct<Parameter>

@param menuAtk
@desc 攻撃力のパラメータ
@default {"x":"0","y":"172","width":"130","fontSize":"20","name":"攻撃"}
@type struct<Parameter>

@param menuDef
@desc 防御力のパラメータ
@default {"x":"138","y":"172","width":"130","fontSize":"20","name":"防御"}
@type struct<Parameter>

@param menuMat
@desc 魔法力のパラメータ
@default {"x":"0","y":"208","width":"130","fontSize":"20","name":"魔攻"}
@type struct<Parameter>

@param menuMdf
@desc 魔法防御のパラメータ
@default {"x":"138","y":"208","width":"130","fontSize":"20","name":"魔防"}
@type struct<Parameter>

@param menuAgi
@desc 敏捷性のパラメータ
@default {"x":"0","y":"244","width":"130","fontSize":"20","name":"敏捷"}
@type struct<Parameter>

@param menuLuc
@desc 運のパラメータ
@default {"x":"138","y":"244","width":"130","fontSize":"20","name":"幸運"}
@type struct<Parameter>

@param menuHit
@desc 命中率のパラメータ
@default {"x":"0","y":"280","width":"130","fontSize":"20","name":"命中"}
@type struct<Parameter>

@param menuEva
@desc 回避率のパラメータ
@default {"x":"138","y":"280","width":"130","fontSize":"20","name":"回避"}
@type struct<Parameter>

@param menuCri
@desc 会心率のパラメータ
@default {"x":"0","y":"316","width":"130","fontSize":"20","name":"会心"}
@type struct<Parameter>

@param menuCev
@desc 会心回避率のパラメータ
@default {"name":"会心回避率"}
@type struct<Parameter>

@param menuMev
@desc 魔法回避率のパラメータ
@default {"name":"魔法回避率"}
@type struct<Parameter>

@param menuMrf
@desc 魔法反射率のパラメータ
@default {"name":"魔法反射率"}
@type struct<Parameter>

@param menuCnt
@desc 反撃率のパラメータ
@default {"x":"138","y":"316","width":"130","fontSize":"20","name":"反撃"}
@type struct<Parameter>

@param menuHrg
@desc HP再生率のパラメータ
@default {"name":"HP再生率"}
@type struct<Parameter>

@param menuMrg
@desc MP再生率のパラメータ
@default {"name":"MP再生率"}
@type struct<Parameter>

@param menuTrg
@desc TP再生率のパラメータ
@default {"name":"TP再生率"}
@type struct<Parameter>

@param menuTgr
@desc 狙われ率のパラメータ
@default {"name":"狙われ率"}
@type struct<Parameter>

@param menuGrd
@desc 防御効果率のパラメータ
@default {"name":"防御効果率"}
@type struct<Parameter>

@param menuRec
@desc 回復効果率のパラメータ
@default {"name":"回復効果率"}
@type struct<Parameter>

@param menuPha
@desc 薬の知識のパラメータ
@default {"name":"薬の知識"}
@type struct<Parameter>

@param menuMcr
@desc MP消費率のパラメータ
@default {"name":"MP消費率"}
@type struct<Parameter>

@param menuTcr
@desc TPチャージ率のパラメータ
@default {"name":"TPチャージ率"}
@type struct<Parameter>

@param menuPdr
@desc 物理ダメージ率のパラメータ
@default {"name":"物理ダメージ率"}
@type struct<Parameter>

@param menuMdr
@desc 魔法ダメージ率のパラメータ
@default {"name":"魔法ダメージ率"}
@type struct<Parameter>

@param menuFdr
@desc 床ダメージ率のパラメータ
@default {"name":"床ダメージ率"}
@type struct<Parameter>

@param menuExr
@desc 経験獲得率のパラメータ
@default {"name":"経験獲得率"}
@type struct<Parameter>

@param horzLine1
@desc 罫線1のパラメータ
@default {"x":"0","y":"162","width":"540","height":"2"}
@type struct<Parameter>

@param horzLine2
@desc 罫線2のパラメータ
@default {"x":"0","y":"370","width":"540","height":"2"}
@type struct<Parameter>

@param horzLine3
@desc 罫線3のパラメータ
@default {"x":"0","y":"506","width":"540","height":"2"}
@type struct<Parameter>

@param horzLine4
@desc 罫線4のパラメータ
@default {"height":"2"}
@type struct<Parameter>

@param horzLine5
@desc 罫線5のパラメータ
@default {"height":"2"}
@type struct<Parameter>

@param freeText1
@desc フリーテキスト1のパラメータ
@default {"x":"100","y":"144","width":"186","name":"\\C[16]\\}Parameter"}
@type struct<Parameter>

@param freeText2
@desc フリーテキスト2のパラメータ
@default {"x":"396","y":"144","width":"186","name":"\\C[16]\\}Equips"}
@type struct<Parameter>

@param freeText3
@desc フリーテキスト3のパラメータ
@default {"x":"70","y":"352","width":"186","name":"\\C[16]\\}StateRate"}
@type struct<Parameter>

@param freeText4
@desc フリーテキスト4のパラメータ
@default {"x":"344","y":"352","width":"186","name":"\\C[16]\\}ElementRate"}
@type struct<Parameter>

@param freeText5
@desc フリーテキスト5のパラメータ
@default {"x":"240","y":"488","width":"186","name":"\\C[16]\\}Profile"}
@type struct<Parameter>

@param freeText6
@desc フリーテキスト6のパラメータ
@default {}
@type struct<Parameter>

@param freeText7
@desc フリーテキスト7のパラメータ
@default {}
@type struct<Parameter>

@param freeText8
@desc フリーテキスト8のパラメータ
@default {}
@type struct<Parameter>

@param freeText9
@desc フリーテキスト9のパラメータ
@default {}
@type struct<Parameter>

@param freeText10
@desc フリーテキスト10のパラメータ
@default {}
@type struct<Parameter>

@param expGaugeColor1
@desc 経験値ゲージの色1 初期値: 30
@default 30
@type number
@max 31

@param expGaugeColor2
@desc 経験値ゲージの色2 初期値: 31
@default 31
@type number
@max 31

@param expNextText
@desc 経験値の書式 初期値: あと %1exp
@default あと %1exp
@type string

@param expMaxText
@desc 最大レベルのときの経験値の書式 初期値: %1exp
@default %1exp
@type string

@param expFontSize
@desc 経験値の文字の大きさ 初期値: 20
@default 20
@type number

@param equipMax
@desc 装備を表示する最大数 初期値: 5
@default 5
@type number

@param elementIcons
@desc 属性アイコン 初期値: 77 64 65 66 67 68 69 70 71
@default 77 64 65 66 67 68 69 70 71
@type string

@param textBackColor
@desc 文字の背景の色 初期値: #000000
@default #000000
@type string

@param textBackOpacity
@desc 文字の背景の不透明度 初期値: 128
@default 128
@type number
@max 255

@param horzLineColor
@desc 罫線の色 初期値: #ffffff
@default #ffffff
@type string

@param horzLineOpacity
@desc 罫線の不透明度 初期値: 48
@default 48
@type number
@max 255

@param forceChangeSoloMenu
@desc パーティの人数によるメニュー切り替え方式。 初期値: 常に一人旅メニューを使う (true)
@default true
@type select
@option ひとりの時だけ一人旅メニューを使う
@value false
@option 常に一人旅メニューを使う
@value true

@param soloItemStatus
@desc アイテムシーンに表示するパラメータの表示幅 ( 名前 / ステート / HP / MP / TP の順で半角スペース区切り)
@default 144 160 144 144 96
*/


/*~struct~Parameter:ja
@param x
@desc X座標
@default 0
@type number
@min -1000

@param y
@desc Y座標
@default 0
@type number
@min -1000

@param width
@desc 横方向の大きさ
@default 0
@type number

@param height
@desc 縦方向の大きさ
@default 36
@type number

@param fontSize
@desc 文字の大きさ
@default 28
@type number

@param name
@desc パラメータ名
@type string

@param cols
@desc 列の数
@default 1
@type number

@param space
@desc 列ごとの空白
@default 8
@type number

@param fixed
@desc 小数点以下の桁数
@default 0
@type number
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