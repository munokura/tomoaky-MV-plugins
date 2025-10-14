//=============================================================================
// TMPlugin - 通常攻撃スキル拡張
// バージョン: 1.1.0
// 最終更新日: 2019/04/15
// 配布元    : https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@target MZ MV
@plugindesc Skills used in attack and defense commands
@author tomoaky
@url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/TMAttackSkillEx.js
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/tomoaky-MV-plugins ).
Original plugin by tomoaky.
-----
TMPlugin - Normal Attack Skill Extension Ver. 1.1.0

How to Use:

You can change normal attack and defense skills by setting tags in the Note fields for actors, classes, weapons, armor, and states.
When multiple tagged equipment or states are applied, the order of priority is:
State > Weapon > Armor > Class > Actor.

Note field Tags (Actor, Class, Weapon, Armor, State):

<attackSkill:3>
Changes the skill used by the actor in an attack command to skill number 3.

<guardSkill:7>
Changes the skill used by the actor in a defense command to skill number 7.

Terms of Use:
MIT License.
https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
Modifications and redistribution are permitted without permission from the author, and there are no restrictions on usage (commercial, R18, etc.).

@param skillNameCommand
@text Show skill names in commands
@desc Apply the skill name to the command.
@default true
@type boolean
*/


/*:ja
@target MZ MV
@plugindesc 攻撃コマンドや防御コマンドで使用するスキルを
@author tomoaky
@url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/TMAttackSkillEx.js
@license MIT License

@help
TMPlugin - 通常攻撃スキル拡張 Ver1.1.0

使い方:

  アクター、職業、武器、防具、ステートのメモ欄にタグを設定することで
  通常攻撃や防御のスキルを変更することができます。
  タグが設定された装備やステートが複数適用されている場合の優先度は
  ステート ＞ 武器 ＞ 防具 ＞ 職業 ＞ アクター
  となっています。


メモ欄タグ（アクター、職業、武器、防具、ステート）:

  <attackSkill:3>
  アクターが攻撃コマンドで使用するスキルを３番のものに変更します。

  <guardSkill:7>
  アクターが防御コマンドで使用するスキルを７番のものに変更します。


利用規約:
  MITライセンスです。
  https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。

@param skillNameCommand
@text コマンドにスキル名を表示
@desc コマンドにスキル名を適用する。
@default true
@type boolean
*/

var Imported = Imported || {};
Imported.TMAttackSkillEx = true;

(function () {
	'use strict';

	var parameters = PluginManager.parameters('TMAttackSkillEx');
	var skillNameCommand = JSON.parse(parameters['skillNameCommand'] || 'true');

	//-----------------------------------------------------------------------------
	// Game_Actor
	//

	var _Game_Actor_attackSkillId = Game_Actor.prototype.attackSkillId;
	Game_Actor.prototype.attackSkillId = function () {
		var a = this.traitObjectsTMASE().filter(function (obj) {
			return obj.meta.attackSkill;
		});
		return a[0] ? +a[0].meta.attackSkill : _Game_Actor_attackSkillId.call(this);
	};

	var _Game_Actor_guardSkillId = Game_Actor.prototype.guardSkillId;
	Game_Actor.prototype.guardSkillId = function () {
		var a = this.traitObjectsTMASE().filter(function (obj) {
			return obj.meta.guardSkill;
		});
		return a[0] ? +a[0].meta.guardSkill : _Game_Actor_guardSkillId.call(this);
	};

	// ステート、武器、防具、職業、アクターの順で並ぶ効果オブジェクト配列を返す
	Game_Actor.prototype.traitObjectsTMASE = function () {
		var objects = Game_Battler.prototype.traitObjects.call(this);
		var equips = this.equips();
		for (var i = 0; i < equips.length; i++) {
			var item = equips[i];
			if (item) {
				objects.push(item);
			}
		}
		objects = objects.concat([this.currentClass(), this.actor()]);
		return objects;
	};

	//-----------------------------------------------------------------------------
	// Window_ActorCommand
	//

	var _Window_ActorCommand_addAttackCommand = Window_ActorCommand.prototype.addAttackCommand;
	Window_ActorCommand.prototype.addAttackCommand = function () {
		_Window_ActorCommand_addAttackCommand.call(this);
		if (skillNameCommand) {
			var skill = $dataSkills[this._actor.attackSkillId()];
			this._list[this.maxItems() - 1].name = skill.name;
		}
	};

	var _Window_ActorCommand_addGuardCommand = Window_ActorCommand.prototype.addGuardCommand;
	Window_ActorCommand.prototype.addGuardCommand = function () {
		_Window_ActorCommand_addGuardCommand.call(this);
		if (skillNameCommand) {
			var skill = $dataSkills[this._actor.guardSkillId()];
			this._list[this.maxItems() - 1].name = skill.name;
		}
	};

})();