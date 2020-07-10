//=============================================================================
// TMPlugin - パッシヴスキル
// バージョン: 1.1.1
// 最終更新日: 2017/06/17
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 使用せずとも常に効果が発動しつづけるスキルを追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param passiveCommands
 * @type string
 * @desc パッシヴスキルのスキルタイプ番号を半角数字で設定します。
 * 複数指定する場合は半角スペースで区切ってください。
 * @default 
 *
 * @help
 * TMPlugin - パッシヴスキル ver1.1.1
 * 
 * 使い方:
 * 
 *   このプラグインは、データベースに設定されているスキルと武器を紐付けて
 *   パッシヴスキルを作成します。
 *   スキルのメモ欄に <passive:50> というタグを書き込むと、
 *   このスキルを習得している間、50 番の武器を装備したときと
 *   同じ効果が得られるようになります。
 * 
 *   特徴の『スキル追加』ではパッシヴスキルの効果は適用されません。
 *
 *   パッシヴスキルに必要武器が設定されている場合、該当するタイプの武器を
 *   装備している間だけパッシヴスキルの効果が適用されます。
 *   武器タイプ以外にもメモ欄タグを使ってＴＰやステートを効果適用の条件に
 *   指定することができます。
 *
 *   プラグインコマンドはありません。
 * 
 *   このプラグインは RPGツクールMV Version 1.5.0 で動作確認をしています。
 *
 *  
 * メモ欄タグ（スキル）:
 * 
 *   <passive:50>     # 50 番の武器を効果とするパッシヴスキルになる
 *   <passiveTp:75>   # 残りＴＰが 75 以上のときだけパッシヴ効果が適用される
 *   <passiveTp:-25>  # 残りＴＰが 25 未満のときだけパッシヴ効果が適用される
 *   <passiveState:4> # 4 番のステートが有効なときだけパッシヴ効果が適用される
 *   <passiveTurn:2>  # 戦闘中 2 ターン目にのみパッシヴ効果が適用される
 *
 *   パッシヴ効果はスキルだけでなく装備品に設定することもできます。
 * 
 * 
 * プラグインパラメータ補足:
 * 
 *   passiveCommands を設定すると、該当するスキルタイプはバトル中に
 *   表示されなくなります。
 *   パッシヴスキルのスキルタイプ番号を指定すれば、コマンドからパッシヴスキルを
 *   除外することができます。
 */

var Imported = Imported || {};
Imported.TMPassiveSkill = true;

(function() {

  var parameters = PluginManager.parameters('TMPassiveSkill');
  var passiveCommands = parameters['passiveCommands'].split('').map(Number);

  //-----------------------------------------------------------------------------
  // Game_Actor
  //

  var _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
  Game_Actor.prototype.paramPlus = function(paramId) {
    var passiveWeapons = this.passiveWeapons();
    return passiveWeapons.reduce(function(r, weapon) {
      return r + weapon.params[paramId];
    }, _Game_Actor_paramPlus.call(this, paramId));
  };

  var _Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
  Game_Actor.prototype.traitObjects = function() {
    var objects = _Game_Actor_traitObjects.call(this);
    var passiveWeapons = this.passiveWeapons();
    for (var i = 0; i < passiveWeapons.length; i++) {
      objects.push(passiveWeapons[i]);
    }
    return objects;
  };
  
  Game_Actor.prototype.passiveWeapons = function() {
    var result = [];
    var objects = this.equips();
    this._skills.forEach(function(id) {
      objects.push($dataSkills[id]);
    }, this);
    objects.forEach(function(item) {
      if (item && !result.contains(item)) {
        var passiveWeapon = this.passiveWeapon(item);
        if (passiveWeapon) result.push(passiveWeapon);
      }
    }, this);
    return result;
  };
  
  Game_Actor.prototype.passiveWeapon = function(item) {
    if (item.meta.passive &&
        this.isPassiveSkillTpOk(item) &&
        this.isPassiveSkillStateOk(item) &&
        this.isPassiveSkillTurnOk(item) &&
        (!DataManager.isSkill(item) || this.isSkillWtypeOk(item))) {
      return $dataWeapons[+item.meta.passive];
    }
    return null;
  };

  Game_Actor.prototype.isPassiveSkillTpOk = function(item) {
    if (item.meta.passiveTp) {
      var n = +item.meta.passiveTp;
      var tp = this.tp;
      if ((n > 0 && n > tp) || (n < 0 && -n <= tp)) return false;
    }
    return true;
  };
  
  Game_Actor.prototype.isPassiveSkillStateOk = function(item) {
    if (item.meta.passiveState) {
      return this.isStateAffected(+item.meta.passiveState);
    }
    return true;
  };

  Game_Actor.prototype.isPassiveSkillTurnOk = function(item) {
    if (item.meta.passiveTurn) {
      return $gameParty.inBattle() && $gameTroop.turnCount() === +item.meta.passiveTurn;
    }
    return true;
  };
  
  Game_Actor.prototype.addedSkillTypes = function() {
    var skillTypes = Game_BattlerBase.prototype.addedSkillTypes.call(this);
    if ($gameParty.inBattle()) {
      for (var i = 0; i < skillTypes.length; i++) {
        if (passiveCommands.contains(skillTypes[i])) {
          skillTypes.splice(i--, 1);
        }
      }
    }
    return skillTypes;
  };

})();