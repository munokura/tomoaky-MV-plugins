//=============================================================================
// TMPlugin - プリロード設定
// バージョン: 1.0.0
// 最終更新日: 2018/04/05
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2018 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc ゲーム起動時にシステム画像をプリロードするかどうかを、
 * 画像ごとに設定します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param iconSet
 * @type boolean
 * @desc IconSet.pngをプリロードする。
 * @default true
 *
 * @param balloon
 * @type boolean
 * @desc Balloon.pngをプリロードする。
 * @default true
 *
 * @param shadow1
 * @type boolean
 * @desc Shadow1.pngをプリロードする。
 * @default true
 *
 * @param shadow2
 * @type boolean
 * @desc Shadow2.pngをプリロードする。
 * @default true
 *
 * @param damage
 * @type boolean
 * @desc Damage.pngをプリロードする。
 * @default true
 *
 * @param states
 * @type boolean
 * @desc States.pngをプリロードする。
 * @default true
 *
 * @param weapons1
 * @type boolean
 * @desc Weapons1.pngをプリロードする。
 * @default true
 *
 * @param weapons2
 * @type boolean
 * @desc Weapons2.pngをプリロードする。
 * @default true
 *
 * @param weapons3
 * @type boolean
 * @desc Weapons3.pngをプリロードする。
 * @default true
 *
 * @param buttonSet
 * @type boolean
 * @desc ButtonSet.pngをプリロードする。
 * @default true
 * 
 * @param others
 * @desc 指定した画像をプリロードする。
 * (拡張子不要、複数指定する場合はカンマで区切る)
 * @default 
 *
 * @help
 * TMPlugin - プリロード設定 ver1.0.0
 *
 * 使い方:
 *
 *   このプラグインはScene_Bootにおけるプリロード処理を丸ごと上書きします。
 *   他のプラグインや、バージョンの違うコアスクリプトとの併用によって
 *   不具合が発生する場合があります。
 * 
 *   プラグインコマンドはありません。
 *
 *   このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。
 * 
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 */

var Imported = Imported || {};
Imported.TMPreloadEx = true;

(function() {

  var parameters = PluginManager.parameters('TMPreloadEx');
  var iconSet = JSON.parse(parameters['iconSet'] || 'true');
  var balloon = JSON.parse(parameters['balloon'] || 'true');
  var shadow1 = JSON.parse(parameters['shadow1'] || 'true');
  var shadow2 = JSON.parse(parameters['shadow2'] || 'true');
  var damage = JSON.parse(parameters['damage'] || 'true');
  var states = JSON.parse(parameters['states'] || 'true');
  var weapons1 = JSON.parse(parameters['weapons1'] || 'true');
  var weapons2 = JSON.parse(parameters['weapons2'] || 'true');
  var weapons3 = JSON.parse(parameters['weapons3'] || 'true');
  var buttonSet = JSON.parse(parameters['buttonSet'] || 'true');
  var others = parameters['others'].split(',');

  //-----------------------------------------------------------------------------
  // Scene_Boot
  //

  Scene_Boot.loadSystemImages = function() {
    if (iconSet) ImageManager.reserveSystem('IconSet');
    if (balloon) ImageManager.reserveSystem('Balloon');
    if (shadow1) ImageManager.reserveSystem('Shadow1');
    if (shadow2) ImageManager.reserveSystem('Shadow2');
    if (damage) ImageManager.reserveSystem('Damage');
    if (states) ImageManager.reserveSystem('States');
    if (weapons1) ImageManager.reserveSystem('Weapons1');
    if (weapons2) ImageManager.reserveSystem('Weapons2');
    if (weapons3) ImageManager.reserveSystem('Weapons3');
    if (buttonSet) ImageManager.reserveSystem('ButtonSet');
    others.forEach(function(fn) {
      ImageManager.reserveSystem(fn);
    });
  };

})();
