//=============================================================================
// TMPlugin - スキルコスト拡張
// バージョン: 1.2.0
// 最終更新日: 2018/08/23
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc MPやTPの代わりにHPやアイテムを消費するスキルを
 * 設定できるようになります。
 *
 * @author tomoaky (https://hikimoki.sakura.ne.jp/)
 *
 * @param hpVNumberId
 * @type variable
 * @desc ダメージ計算とコスト消費の直前のタイミングで、
 * この変数に『行動者の残りHP』を代入する
 * @default 0
 *
 * @param mpVNumberId
 * @type variable
 * @desc ダメージ計算とコスト消費の直前のタイミングで、
 * この変数に『行動者の残りMP』を代入する
 * @default 0
 *
 * @param tpVNumberId
 * @type variable
 * @desc ダメージ計算とコスト消費の直前のタイミングで、
 * この変数に『行動者の残りTP』を代入する
 * @default 0
 *
 * @param hpCostVNId
 * @type variable
 * @desc ダメージ計算とコスト消費の直前のタイミングで、
 * この変数に『行動者が消費するhP』を代入する
 * @default 0
 *
 * @param mpCostVNId
 * @type variable
 * @desc ダメージ計算とコスト消費の直前のタイミングで、
 * この変数に『行動者が消費するMP』を代入する
 * @default 0
 *
 * @param tpCostVNId
 * @type variable
 * @desc ダメージ計算とコスト消費の直前のタイミングで、
 * この変数に『行動者が消費するTP』を代入する
 * @default 0
 *
 * @param ignoreEnemyItemCost
 * @type select
 * @option パーティのアイテムを消費する
 * @value 0
 * @option 消費しない
 * @value 1
 * @desc 敵がアイテム消費スキルを使用する際の処理方法
 * @default 1
 *
 * @help
 * TMPlugin - スキルコスト拡張 ver1.2.0
 * 
 * 使い方:
 * 
 *   スキルのメモ欄にタグを書き込むことでコストを追加できます。
 *
 *   データベースで 消耗しない に設定したアイテムをコストとした場合、
 *   スキル使用時に必要だが消費はしないという扱いになります。
 *
 *   ＨＰをコストとして設定した場合、残りＨＰがコストと同値では
 *   使用できません。ただし、スキルに hpCostNoSafety タグがある場合は
 *   残りＨＰがコスト以下でもスキルが使用できます。
 *   当然使用したアクターは戦闘不能になります。
 *
 *   経験値をコストとして設定し、一緒に expCostNoLevelDown タグを
 *   設定している場合、コストの支払いによってレベルが下がる状況では
 *   スキルの使用ができなくなります。
 *
 *   プラグインコマンドはありません。
 *
 *   このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。
 * 
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 * 
 * 
 * プラグインパラメータの補足:
 * 
 *   hpVNumberId ( mpVNumberId / tpVNumberId )
 *     コスト消費の直前、使用者の残りHPの値を、設定した変数に代入します。
 *     ダメージ計算式に $gameVariables.value(1) と書けば、
 *     変数 1 番の値を参照することができます。
 *     ダメージ計算式に a.hp と書いた場合も残りHPを参照できますが、
 *     こちらはコストを消費した後の値となります。
 * 
 *   hpCostVNId ( mpCostVNId / tpCostVNId )
 *     コスト消費の直前、使用者が消費するHPの値を、設定した変数に代入します。
 *     hpVNumberId と同様の方法でダメージ計算式に反映させることができます。
 * 
 * 
 * メモ欄タグ（スキル）:
 * 
 *   <hpCost:10>          # スキルのコストとしてＨＰ１０を設定
 *   <hpRateCost:50>      # スキルのコストとして最大ＨＰの５０％を設定
 *   <hpCRateCost:25>     # スキルのコストとして残りＨＰの２５％を設定
 *   <hpCostNoSafety>     # ＨＰコスト支払いによる戦闘不能を許可する
 *   <mpRateCost:100>     # スキルのコストとして最大ＭＰの１００％を設定
 *   <mpCRateCost:50>     # スキルのコストとして残りＭＰの５０％を設定
 *   <mpCostNoMcr>        # ＭＰコストから特徴『ＭＰ消費率』の効果を除外
 *   <tpCRateCost:50>     # スキルのコストとして残りＴＰの５０％を設定
 *   <ignoreTpCost>       # スキルのＴＰコスト不足時、ＴＰ全消費で発動可能
 *   <itemCost:I1*2>      # スキルのコストとしてアイテム１番２個を設定
 *   <itemCost:W2*1>      # スキルのコストとして武器２番１個を設定
 *   <itemCost:A5*1>      # スキルのコストとして防具５番１個を設定
 *   <expCost:50>         # スキルのコストとして経験値５０を設定
 *   <expCostNoLevelDown> # 経験値コストによるレベルダウンを禁止
 *   <goldCost:100>       # スキルのコストとしてお金１００Ｇを設定
 *   <vnCost:3*1>         # スキルのコストとしてゲーム変数３番の値１を設定
 *
 * 
 * vnCostタグの特殊な使い方:
 * 
 *   メモ欄タグ vnCost のみ制御文字を利用して変数の中身をパラメータとして
 *   設定することができます。
 *   <vnCost:\V[14]*\V[15]>
 *   たとえば上記のようなタグがついたスキルを使用する際に、変数１４番の
 *   値が 16 、変数１５番の値が 3 だった場合は、変数１６番の値を３消費
 *   することになります。
 */

var Imported = Imported || {};
Imported.TMSkillCostEx = true;

(function() {

	var parameters = PluginManager.parameters('TMSkillCostEx');
	var HpVNumberId = +(parameters['hpVNumberId'] || 0);
	var MpVNumberId = +(parameters['mpVNumberId'] || 0);
	var TpVNumberId = +(parameters['tpVNumberId'] || 0);
	var HpCostVNId = +(parameters['hpCostVNId'] || 0);
	var MpCostVNId = +(parameters['mpCostVNId'] || 0);
	var TpCostVNId = +(parameters['tpCostVNId'] || 0);
	var IgnoreEnemyItemCost = +(parameters['ignoreEnemyItemCost'] || 1);

	//-----------------------------------------------------------------------------
	// Game_BattleBase
	//

	Game_BattlerBase.prototype.skillHpCost = function(skill) {
		var result = 0;
		if (skill.meta.hpCost) {
			result += +skill.meta.hpCost;
		}
		if (skill.meta.hpRateCost) {
			result += +skill.meta.hpRateCost * this.mhp / 100;
		}
		if (skill.meta.hpCRateCost) {
			result += +skill.meta.hpCRateCost * this._hp / 100;
		}
		return Math.floor(result);
	};

	Game_BattlerBase.prototype.skillMpCost = function(skill) {
		var result = skill.mpCost;
		if (skill.meta.mpRateCost) {
			result += +skill.meta.mpRateCost * this.mmp / 100;
		}
		if (skill.meta.mpCRateCost) {
			result += +skill.meta.mpCRateCost * this._mp / 100;
		}
		if (!skill.meta.mpCostNoMcr) {
			result *= this.mcr;
		}
		return Math.floor(result);
	};

	Game_BattlerBase.prototype.skillTpCost = function(skill) {
		var result = skill.tpCost;
		if (skill.meta.tpCRateCost) {
			result += +skill.meta.tpCRateCost * this._tp / 100;
		}
		result = Math.floor(result);
		if (skill.meta.ignoreTpCost && result > this._tp) {
			result = this._tp;
		}
		return result;
	};

	Game_BattlerBase.prototype.skillItemCost = function(skill) {
		if (!this.isActor() && IgnoreEnemyItemCost === 1) {
			return null;
		}
		if (skill.meta.itemCost) {
			var re = /(i|w|a)(\d+)\*(\d+)/i;
			var match = re.exec(skill.meta.itemCost);
			if (match) {
				var itemCost = {};
				var s = match[1].toUpperCase();
				if (s === 'I') {
					itemCost.item = $dataItems[+match[2]];
				} else if (s === 'W') {
					itemCost.item = $dataWeapons[+match[2]];
				} else {
					itemCost.item = $dataArmors[+match[2]];
				}
				itemCost.num = +match[3];
				return itemCost;
			}
		}
		return null;
	};

	Game_BattlerBase.prototype.skillExpCost = function(skill) {
		return !this.isEnemy() && skill.meta.expCost ? +skill.meta.expCost : 0;
	};

	Game_BattlerBase.prototype.skillGoldCost = function(skill) {
		return !this.isEnemy() && skill.meta.goldCost ? +skill.meta.goldCost : 0;
	};

	Game_BattlerBase.prototype.skillVNumberCost = function(skill) {
		if (skill.meta.vnCost) {
			var result = {};
			var vnCost = skill.meta.vnCost.split('*');
			var re = /\\V\[(\d+)\]/i;
			var match = re.exec(vnCost[0]);
			result.index = match ? $gameVariables.value(+match[1]) : +vnCost[0];
			var match = re.exec(vnCost[1]);
			result.num = match ? $gameVariables.value(+match[1]) : +vnCost[1];
			return result;
		}
		return null;
	};

	var _Game_BattleBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
	Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
		if (!this.canPaySkillHpCost(skill) ||
				!this.canPaySkillItemCost(skill) ||
				!this.canPaySkillExpCost(skill) ||
				!this.canPaySkillGoldCost(skill) ||
				!this.canPaySkillVNumberCost(skill)) {
			return false;
		}
		return _Game_BattleBase_canPaySkillCost.call(this, skill);
	};

	Game_BattlerBase.prototype.canPaySkillHpCost = function(skill) {
		if (skill.meta.hpCostNoSafety) {
			return true;
		}
		var hpCost = this.skillHpCost(skill);
		return hpCost <= 0 || this._hp > hpCost;
	};

	Game_BattlerBase.prototype.canPaySkillItemCost = function(skill) {
		var itemCost = this.skillItemCost(skill);
		return !itemCost || $gameParty.numItems(itemCost.item) >= itemCost.num;
	};
	
	Game_BattlerBase.prototype.canPaySkillExpCost = function(skill) {
		var expCost = this.skillExpCost(skill);
		return expCost === 0 || (this.currentExp() >= expCost &&
				(!skill.meta.expCostNoLevelDown || this.currentExp() - expCost >= this.currentLevelExp()));
	};

	Game_BattlerBase.prototype.canPaySkillGoldCost = function(skill) {
		return $gameParty.gold() >= this.skillGoldCost(skill);
	};

	Game_BattlerBase.prototype.canPaySkillVNumberCost = function(skill) {
		var vnCost = this.skillVNumberCost(skill);
		return !vnCost || $gameVariables.value(vnCost.index) >= vnCost.num;
	};

	var _Game_BattleBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
	Game_BattlerBase.prototype.paySkillCost = function(skill) {
		if (HpVNumberId > 0) {
			$gameVariables.setValue(HpVNumberId, this._hp);
		}
		if (MpVNumberId > 0) {
			$gameVariables.setValue(MpVNumberId, this._mp);
		}
		if (TpVNumberId > 0) {
			$gameVariables.setValue(TpVNumberId, this._tp);
		}
		if (HpCostVNId > 0) {
			$gameVariables.setValue(HpCostVNId, this.skillMpCost(skill));
		}
		if (MpCostVNId > 0) {
			$gameVariables.setValue(MpCostVNId, this.skillMpCost(skill));
		}
		if (TpCostVNId > 0) {
			$gameVariables.setValue(TpCostVNId, this.skillMpCost(skill));
		}
		this.paySkillHpCost(skill);
		this.paySkillItemCost(skill);
		this.paySkillExpCost(skill);
		this.paySkillGoldCost(skill);
		this.paySkillVNumberCost(skill);
		_Game_BattleBase_paySkillCost.call(this, skill);
	};

	Game_BattlerBase.prototype.paySkillHpCost = function(skill) {
		this._hp -= Math.min(this.skillHpCost(skill), this._hp);
	};

	Game_BattlerBase.prototype.paySkillItemCost = function(skill) {
		var itemCost = this.skillItemCost(skill);
		if (itemCost && this.isItemCostValid(itemCost.item)) {
			$gameParty.loseItem(itemCost.item, itemCost.num, false)
		}
	};

	Game_BattlerBase.prototype.isItemCostValid = function(item) {
		return !DataManager.isItem(item) || item.consumable;
	};

	Game_BattlerBase.prototype.paySkillExpCost = function(skill) {
		var expCost = this.skillExpCost(skill);
		if (expCost) {
			var newExp = this.currentExp() - expCost;
			this.changeExp(newExp, this.shouldDisplayLevelUp());
		}
	};

	Game_BattlerBase.prototype.paySkillGoldCost = function(skill) {
		$gameParty.loseGold(this.skillGoldCost(skill));
	};

	Game_BattlerBase.prototype.paySkillVNumberCost = function(skill) {
		var vnCost = this.skillVNumberCost(skill);
		if (vnCost) {
			var n = $gameVariables.value(vnCost.index) - vnCost.num;
			$gameVariables.setValue(vnCost.index, n);
		}
	};

})();
