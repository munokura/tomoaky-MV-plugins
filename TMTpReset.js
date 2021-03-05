//=============================================================================
// TMVplugin - 戦闘開始時ＴＰ初期化
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2016/07/05
//=============================================================================

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/TMTpReset.js
 * @author tomoaky (https://twitter.com/tomoaky/)
 * @plugindesc 戦闘開始時の初期ＴＰを調整します。
 *
 * @param startTp
 * @text 戦闘開始時ＴＰ値
 * @type number
 * @desc 戦闘開始時のＴＰ初期値
 * 初期値: 0
 * @default 0
 *
 * @param startVariableTp
 * @text ＴＰ初期値に加算する変数ID
 * @type variable
 * @desc ＴＰ初期値に加算するゲーム変数番号
 * 初期値: 0 ( 0 の場合は無効 )
 * @default 0
 *
 * @param startTpVariance
 * @text ＴＰ初期値に加算する乱数値
 * @type number
 * @desc ＴＰ初期値に加算する乱数値
 * 初期値: 0 ( 50 の場合、0 ～ 49 の範囲のランダムな値を加算 )
 * @default 0
 *
 * @help
 * 使用例:
 *   プラグインパラメータが以下の設定になっている場合
 *   startTp         = 10
 *   startVariableTp = 2
 *   startTpVariance = 20
 *
 *   ＴＰ初期値 = １０ ＋ ゲーム変数２番の値 ＋ ０～１９の乱数
 *   （計算結果は最後に 0 ～ 100 の範囲に丸められます）
 *
 *   メモ欄タグを使ってアクター、敵キャラなどに個別にＴＰ初期値を設定して
 *   いる場合は、startTpの値にタグの合計値が加算されます。
 *
 *
 * メモ欄タグ（アクター、職業、武器、防具、敵キャラ、ステート）
 *   <startTp:20>
 *   戦闘開始時のＴＰを２０増やします。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

var Imported = Imported || {};
Imported.TMTpReset = true;

(function() {
    'use strict';

    var parameters = PluginManager.parameters('TMTpReset');
    var startTp = +parameters['startTp'];
    var startVariableTp = +parameters['startVariableTp'];
    var startTpVariance = +parameters['startTpVariance'];

    //-----------------------------------------------------------------------------
    // Game_Battler
    //

    Game_Battler.prototype.initTp = function() {
        var value = this.traitObjects().reduce(function(r, traitObject) {
            return r + Number(traitObject.meta.startTp || 0);
        }, startTp);
        if (startVariableTp > 0) {
            value += $gameVariables.value(startVariableTp);
        }
        if (startTpVariance > 0) {
            value += Math.randomInt(startTpVariance);
        }
        this.setTp(value);
    };

})();