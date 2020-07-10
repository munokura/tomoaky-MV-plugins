//=============================================================================
// TMPlugin - リージョン通行設定
// バージョン: 1.0.0
// 最終更新日: 2018/03/02
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2018 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc その場所が通行可能かどうかをリージョンで設定できるようになります。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param passableRegions
 * @desc タイルに関係なく通行を可能にするリージョン番号
 * 初期値: 251
 * @default 251
 *
 * @param dontPassRegions
 * @desc タイルに関係なく通行を不可にするリージョン番号
 * 初期値: 252 253
 * @default 252 253
 *
 * @param counterRegions
 * @desc カウンター属性をもたせるリージョン番号
 * 初期値: 253
 * @default 253
 *
 * @help
 * TMPlugin - リージョン通行設定 ver1.0.0
 *
 * 使い方:
 *
 *   プラグインパラメータで通行可能リージョンと通行不可リージョンの番号を
 *   それぞれ設定してください。
 *   これらのリージョンが付加された場所ではタイルによる通行判定を実行せず、
 *   リージョンでのみ通行できるかどうかが決まります。
 * 
 *   また、リージョン番号を半角スペースで区切って複数設定することで
 *   複数のリージョンに通行設定を適用できます。
 * 
 *   プラグインコマンドはありません。
 *
 *   このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。
 * 
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 */

var Imported = Imported || {};
Imported.TMRegionPassable = true;

(function() {

  var parameters = PluginManager.parameters('TMRegionPassable');
  var passableRegions = (parameters['passableRegions'] || '251').split(' ').map(Number);
  var dontPassRegions = (parameters['dontPassRegions'] || '252 253').split(' ').map(Number);
  var counterRegions = (parameters['counterRegions'] || '253').split(' ').map(Number);

  //-----------------------------------------------------------------------------
  // Game_Map
  //

  var _Game_Map_checkPassage = Game_Map.prototype.checkPassage;
  Game_Map.prototype.checkPassage = function(x, y, bit) {
    var regionId = this.regionId(x, y);
    if (passableRegions.indexOf(regionId) >= 0) return true;
    if (dontPassRegions.indexOf(regionId) >= 0) return false;
    return _Game_Map_checkPassage.call(this, x, y, bit);
  };

  var _Game_Map_isCounter = Game_Map.prototype.isCounter;
  Game_Map.prototype.isCounter = function(x, y) {
    var regionId = this.regionId(x, y);
    if (counterRegions.indexOf(regionId) >= 0) return true;
    return _Game_Map_isCounter.call(this, x, y);
  };

})();
