//=============================================================================
// TMVplugin - 行動パターン拡張
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 0.1a
// 最終更新日: 2016/07/29
//=============================================================================

/*:
 * @plugindesc 敵キャラの行動パターン決定処理を修正します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @help
 * 使い方:
 *
 *   メモ欄にタグを付けた敵キャラの行動パターン決定処理が変化します。
 * 
 *
 * メモ欄タグ（敵キャラ）:
 *
 *   <actionPrepare:50>
 *     複数回行動時のＭＰ不足、魔法使用前に沈黙付加、などの理由で行動が実行
 *     できなくなったときに、行動の再抽選を実行します。
 *     タグに設定した数値が再抽選の実行確率となります、50 なら５０％で再抽選。
 */

var Imported = Imported || {};
Imported.TMEnemyActionEx = true;

(function() {

  //-----------------------------------------------------------------------------
  // Game_Action
  //
  
  var _Game_Action_prepare = Game_Action.prototype.prepare;
  Game_Action.prototype.prepare = function() {
    _Game_Action_prepare.call(this);
    if (!this.isValid() && Math.randomInt(100) < this.subject().actionPrepareRate()) {
      this.setEnemyAction(this.subject().prepareAction());
    }
  };

  //-----------------------------------------------------------------------------
  // Game_BattlerBase
  //
  
  Game_BattlerBase.prototype.actionPrepareRate = function() {
    return 0;
  };
  
  //-----------------------------------------------------------------------------
  // Game_Enemy
  //
  
  Game_Enemy.prototype.actionPrepareRate = function() {
    return this.enemy().meta.actionPrepare || 0;
  };
  
  Game_Enemy.prototype.prepareAction = function() {
    var actionList = this.enemy().actions.filter(function(a) {
      return this.isActionValid(a);
    }, this);
    if (actionList.length > 0) {
      var ratingMax = Math.max.apply(null, actionList.map(function(a) {
        return a.rating;
      }));
      var ratingZero = ratingMax - 3;
      actionList = actionList.filter(function(a) {
        return a.rating > ratingZero;
      });
      return this.selectAction(actionList, ratingZero);
    }
    return null;
  };

})();
