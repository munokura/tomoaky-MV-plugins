//=============================================================================
// TMPlugin - 装備ステータス編集
// バージョン: 1.0.0
// 最終更新日: 2017/10/17
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc Edit the equipment status items freely.
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
TMPlugin - Equipment Stat Editor ver. 1.0.0

How to Use:

There are no plugin commands.

This plugin has been tested with RPG Maker MV Version 1.5.1.

This plugin is distributed under the MIT License. You are free to use it commercially, modify it, and redistribute it.

Plugin Parameter Notes:

paramList
The available parameters are as follows:
0 ... HP
1 ... MP
2 ... Attack Power
3 ... Defense Power
4 ... Magic Power
5 ... Magic Defense
6 ... Agility
7 ... Luck

@param paramList
@desc The parameter numbers to be displayed are separated by spaces. Default: 2 3 4 5 6 7
@default 2 3 4 5 6 7
@type string
*/


/*:ja
@plugindesc 装備ステータスの項目を自由に編集します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - 装備ステータス編集 ver1.0.0

使い方:

  プラグインコマンドはありません。

  このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。

  このプラグインはMITライセンスのもとに配布しています、商用利用、
  改造、再配布など、自由にお使いいただけます。


プラグインパラメータ補足:

  paramList
    使用できるパラメータは以下のとおりです。
    0 … ＨＰ
    1 … ＭＰ
    2 … 攻撃力
    3 … 防御力
    4 … 魔法力
    5 … 魔法防御
    6 … 敏捷性
    7 … 運

@param paramList
@desc 表示するパラメータ番号を半角スペースで区切って並べます。 初期値: 2 3 4 5 6 7
@default 2 3 4 5 6 7
@type string
*/

var Imported = Imported || {};
Imported.TMEquipStatusEx = true;

(function() {

  var parameters = PluginManager.parameters('TMEquipStatusEx');
  var paramList = parameters['paramList'].split(' ').map(Number);

  //-----------------------------------------------------------------------------
  // Window_EquipStatus
  //

  Window_EquipStatus.prototype.numVisibleRows = function() {
    return paramList.length + 1;
  };

  Window_EquipStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
      this.drawActorName(this._actor, this.textPadding(), 0);
      for (var i = 0; i < paramList.length; i++) {
        this.drawItem(0, this.lineHeight() * (1 + i), paramList[i]);
      }
    }
  };

})();