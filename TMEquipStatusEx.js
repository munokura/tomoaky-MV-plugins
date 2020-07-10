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
 * @plugindesc 装備ステータスの項目を自由に編集します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param paramList
 * @type string
 * @desc 表示するパラメータ番号を半角スペースで区切って並べます。
 * 初期値: 2 3 4 5 6 7
 * @default 2 3 4 5 6 7
 *
 * @help
 * TMPlugin - 装備ステータス編集 ver1.0.0
 *
 * 使い方:
 *
 *   プラグインコマンドはありません。
 *
 *   このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。
 * 
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 * 
 * 
 * プラグインパラメータ補足:
 * 
 *   paramList
 *     使用できるパラメータは以下のとおりです。
 *     0 … ＨＰ
 *     1 … ＭＰ
 *     2 … 攻撃力
 *     3 … 防御力
 *     4 … 魔法力
 *     5 … 魔法防御
 *     6 … 敏捷性
 *     7 … 運
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
