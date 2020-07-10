//=============================================================================
// TMPlugin - スキルカテゴリからの解放
// バージョン: 1.0.1
// 最終更新日: 2017/10/05
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc スキルシーンからカテゴリ選択の処理を除外します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @help
 * TMPlugin - スキルカテゴリからの解放 ver1.0.1
 *
 * 使い方:
 *
 *   プラグインコマンドはありません。
 *
 *   このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。
 * 
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 */

var Imported = Imported || {};
Imported.TMOmitSkillCategory = true;

(function() {

  //-----------------------------------------------------------------------------
  // Scene_Skill
  //

  var _Scene_Skill_start = Scene_Skill.prototype.start;
  Scene_Skill.prototype.start = function() {
    _Scene_Skill_start.call(this);
    this._skillTypeWindow.deactivate();
    this._skillTypeWindow.hide();
    this._itemWindow.setStypeId(this._skillTypeWindow.currentExt());
    this._itemWindow.setHandler('cancel', this.popScene.bind(this));
    this._itemWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._itemWindow.setHandler('pageup', this.previousActor.bind(this));
    this._itemWindow.activate();
    this._itemWindow.selectLast();
  };

  var _Scene_Skill_onActorChange = Scene_Skill.prototype.onActorChange;
  Scene_Skill.prototype.onActorChange = function() {
    _Scene_Skill_onActorChange.call(this);
    this._skillTypeWindow.deactivate();
    this._itemWindow.activate();
  };

})();
