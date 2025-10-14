//=============================================================================
// TMVplugin - 戦闘開始時ＴＰ初期化
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2016/07/05
//=============================================================================
/*:
@target MZ MV
@plugindesc Adjusts the initial TP at the start of battle.
@author tomoaky
@url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/TMTpReset.js
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/tomoaky-MV-plugins ).
Original plugin by tomoaky.
-----
Usage Example:
If the plugin parameters are set as follows:
startTp = 10
startVariableTp = 2
startTpVariance = 20

Initial TP = 10 + Game Variable #2 + Random Number between 0 and 19
(The calculation result is rounded to the range of 0 and 100.)

If you have set individual initial TP values for actors, enemies, etc. using memo tags, the total value of those tags will be added to the startTp value.

Memo Tags (Actor, Class, Weapon, Armor, Enemy, State)
<startTp:20>
Increases TP by 20 at the start of battle.

Terms of Use:
MIT License.
https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
Modifications and redistribution are permitted without permission from the author, and there are no restrictions on usage (commercial, R18, etc.).

@param startTp
@text TP value at the start of battle
@desc Initial TP value at the start of battle Initial value: 0
@default 0
@type number

@param startVariableTp
@text Variable ID to add to the TP initial value
@desc Game variable number to add to the initial TP value. Initial value: 0 (disabled if 0)
@default 0
@type variable

@param startTpVariance
@text Random number to add to the initial TP value
@desc Random number to add to the initial TP value. Initial value: 0 (For 50, a random value between 0 and 49 is added.)
@default 0
@type number
*/


/*:ja
@target MZ MV
@plugindesc 戦闘開始時の初期ＴＰを調整します。
@author tomoaky
@url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/TMTpReset.js
@license MIT License

@help
使用例:
  プラグインパラメータが以下の設定になっている場合
  startTp         = 10
  startVariableTp = 2
  startTpVariance = 20

  ＴＰ初期値 = １０ ＋ ゲーム変数２番の値 ＋ ０～１９の乱数
  （計算結果は最後に 0 ～ 100 の範囲に丸められます）

  メモ欄タグを使ってアクター、敵キャラなどに個別にＴＰ初期値を設定して
  いる場合は、startTpの値にタグの合計値が加算されます。


メモ欄タグ（アクター、職業、武器、防具、敵キャラ、ステート）
  <startTp:20>
  戦闘開始時のＴＰを２０増やします。


利用規約:
  MITライセンスです。
  https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。

@param startTp
@text 戦闘開始時ＴＰ値
@desc 戦闘開始時のＴＰ初期値 初期値: 0
@default 0
@type number

@param startVariableTp
@text ＴＰ初期値に加算する変数ID
@desc ＴＰ初期値に加算するゲーム変数番号 初期値: 0 ( 0 の場合は無効 )
@default 0
@type variable

@param startTpVariance
@text ＴＰ初期値に加算する乱数値
@desc ＴＰ初期値に加算する乱数値 初期値: 0 ( 50 の場合、0 ～ 49 の範囲のランダムな値を加算 )
@default 0
@type number
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