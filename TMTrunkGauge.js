//=============================================================================
// TMPlugin - 体幹ゲージ
// バージョン: 0.1.1b
// 最終更新日: 2019/05/13
// 配布元　　: https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2019 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV
 * @plugindesc バトルに体幹による崩し要素を追加します。
 *
 * @author tomoaky (https://hikimoki.sakura.ne.jp/)
 *
 * @param trunkState
 * @text 付与ステート
 * @type state
 * @desc 体幹が崩れた際に付与されるステート
 * @default 10
 * 
 * @param trunkMax
 * @text 体幹の最大値
 * @type number
 * @desc 体幹の最大値
 * @default 100
 * 
 * @param trunkRecover
 * @text 回復体幹値
 * @type number
 * @desc ターン終了時に回復する体幹値
 * @default 50
 * 
 * @param trunkWidth
 * @text 体幹ゲージ幅
 * @type number
 * @desc 体幹ゲージの横幅
 * @default 120
 * 
 * @param trunkHeight
 * @text 体幹ゲージ高
 * @type number
 * @desc 体幹ゲージの高さ
 * @default 12
 * 
 * @param trunkAnimation
 * @text 付与アニメーション
 * @type animation
 * @desc 体幹が崩れた際のアニメーション
 * @default 39
 *
 * @help
 * TMPlugin - 体幹ゲージ ver0.1.1b
 * 
 * 使い方:
 * 
 *   このプラグインを有効にすると、自動的にすべてのアクター、エネミーに
 *   最大体幹値 100 が設定されます。
 *   体幹攻撃力は自動的には設定されないので、スキルのメモ欄に
 *   <trunkAtk:25> タグで体幹攻撃力を設定する必要があります。
 * 
 *   体幹攻撃力が設定されたスキルが命中すると相手に体幹ダメージを与えます。
 *   体幹ダメージが最大体幹値に達すると、アニメーションが再生され、
 *   ステートが付与されます。
 *   最大値に達した体幹ダメージはターン終了時にリセットされます。
 * 
 *   体幹ダメージはターン終了時にある程度回復します。
 *   回復量は残りＨＰによって変化し、残りＨＰが５０％を下回っていると
 *   体幹ダメージの回復は止まります。
 *
 *   このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。
 *
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 * 
 * 
 * メモ欄タグ（アクター、職業、スキル、アイテム、武器、防具、
 * 　　　　　　敵キャラ、ステート）:
 * 
 *   <trunkAtk:25>
 *   スキルに体幹攻撃力を設定します、スキル以外にこのタグを設定すると
 *   スキル使用時に与える体幹ダメージにその値が加算されます。
 *   ただし、体幹攻撃力が設定されていないスキルには加算されません。
 * 
 * 
 * メモ欄タグ（アクター、職業、武器、防具、敵キャラ、ステート）:
 * 
 *   <trunkMax:50>
 *   体幹最大値を加算します。
 *   プラグインパラメータ trunkMax が 100 で、アクターのメモ欄に
 *   <trunkMax:50> タグがある場合、このアクターの体幹最大値は 150 に
 *   なります。
 * 
 *   <trunkDef:50>
 *   体幹防御力を設定します、値が 50 の場合、受ける体幹ダメージが
 *   ５０％に軽減されます。
 * 
 *   <trunkCnt:80>
 *   体幹反撃力を設定します、値が 80 の場合、受けた体幹ダメージの
 *   ８０％を相手にも与えます。
 *   反撃ダメージは体幹防御力よりも前に計算するため、体幹防御力が
 *   １００％であっても反撃ダメージが発生します。
 * 
 * 
 * メモ欄タグ（アクター、エネミー）:
 * 
 *   <trunkWidth:60>
 *   このタグが設定されたバトラーの体幹ゲージの横幅を変更します。
 * 
 *   <trunkHeight:12>
 *   このタグが設定されたバトラーの体幹ゲージの高さを変更します。
 * 
 *   <trunkShiftX:48>
 *   このタグが設定されたバトラーの体幹ゲージの位置を
 *   右に 48 ドットずらします。
 * 
 *   <trunkShiftY:-24>
 *   このタグが設定されたバトラーの体幹ゲージの位置を
 *   上に 24 ドットずらします。
 * 
 * 
 * おまけ機能:
 * 
 *   TMBitmapEx.js を導入している場合、体幹ゲージが角丸になります。
 */

var Imported = Imported || {};
Imported.TMTrunkGauge = true;

(function () {

	var parameters = PluginManager.parameters('TMTrunkGauge');
	var trunkState = +(parameters['trunkState'] || 10);
	var trunkMax = +(parameters['trunkMax'] || 100);
	var trunkRecover = +(parameters['trunkRecover'] || 50);
	var trunkWidth = +(parameters['trunkWidth'] || 120);
	var trunkHeight = +(parameters['trunkHeight'] || 12);
	var trunkAnimation = +(parameters['trunkAnimation'] || 39);

	//-----------------------------------------------------------------------------
	// Game_Action
	//

	var _Game_Action_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function (target) {
		_Game_Action_apply.call(this, target);
		this.applyTrunkDamage(target);
	};

	Game_Action.prototype.applyTrunkDamage = function (target) {
		var item = this.item();
		var damage = +(item.meta.trunkAtk || 0);
		var result = target.result();
		if (result.isHit() && damage !== 0) {
			// 体幹攻撃力がプラスの場合のみ補正処理
			if (damage > 0) {
				// スキルの体幹ダメージ量に行動者の体幹攻撃力を加算
				damage = Math.max(damage + this.subject().trunkAtk(), 1);
				// ターゲットの体幹反撃力によるカウンター
				var trunkCnt = target.trunkCnt();
				if (trunkCnt > 0) {
					var cntDamage = Math.floor(damage * trunkCnt / 100);
					this.subject().applyTrunkDamage(cntDamage);
				}
				// ターゲットの体幹防御力によるダメージ補正
				var trunkDef = target.trunkDef();
				if (trunkDef > 0) {
					damage = Math.max(damage - Math.floor(damage * trunkDef / 100), 0);
				}
			}
			target.applyTrunkDamage(damage);
		}
	};

	//-----------------------------------------------------------------------------
	// Game_BattlerBase
	//

	var _Game_BattlerBase_initialize = Game_BattlerBase.prototype.initialize;
	Game_BattlerBase.prototype.initialize = function () {
		_Game_BattlerBase_initialize.call(this);
		this.initTrunk();
	};

	Game_BattlerBase.prototype.initTrunk = function () {
		this._trunk = 0;
	};

	Game_BattlerBase.prototype.trunk = function () {
		return this._trunk;
	};

	Game_BattlerBase.prototype.trunkMax = function () {
		return this.traitObjects().reduce(function (r, obj) {
			var n = +(obj.meta.trunkMax || 0);
			return r + n;
		}, trunkMax);
	};

	Game_BattlerBase.prototype.trunkAtk = function () {
		return this.traitObjects().reduce(function (r, obj) {
			var n = +(obj.meta.trunkAtk || 0);
			return r + n;
		}, 0);
	};

	Game_BattlerBase.prototype.trunkDef = function () {
		return this.traitObjects().reduce(function (r, obj) {
			var n = +(obj.meta.trunkDef || 0);
			return r + n;
		}, 0);
	};

	Game_BattlerBase.prototype.trunkCnt = function () {
		return this.traitObjects().reduce(function (r, obj) {
			var n = +(obj.meta.trunkCnt || 0);
			return r + n;
		}, 0);
	};

	Game_BattlerBase.prototype.trunkWidth = function () {
		var battler = this.isActor() ? this.actor() : this.enemy();
		if (battler) {
			return +(battler.meta.trunkWidth || trunkWidth);
		}
		return trunkWidth;
	};

	Game_BattlerBase.prototype.trunkHeight = function () {
		var battler = this.isActor() ? this.actor() : this.enemy();
		if (battler) {
			return +(battler.meta.trunkHeight || trunkHeight);
		}
		return trunkHeight;
	};

	Game_BattlerBase.prototype.trunkShiftX = function () {
		var battler = this.isActor() ? this.actor() : this.enemy();
		if (battler) {
			return +(battler.meta.trunkShiftX || 0);
		}
		return 0;
	};

	Game_BattlerBase.prototype.trunkShiftY = function () {
		var battler = this.isActor() ? this.actor() : this.enemy();
		if (battler) {
			return +(battler.meta.trunkShiftY || 0);
		}
		return 0;
	};

	Game_BattlerBase.prototype.applyTrunkDamage = function (damage) {
		var trunkMax = this.trunkMax();
		if (this._trunk < trunkMax) {
			this._trunk = (this._trunk + damage).clamp(0, trunkMax);
			if (this._trunk === trunkMax) {
				this.trunkOver();
			}
		}
	};

	Game_BattlerBase.prototype.trunkOver = function () {
		this.addState(trunkState);
		this.startAnimation(trunkAnimation, false, 0);
	};

	//-----------------------------------------------------------------------------
	// Game_Battler
	//

	var _Game_Battler_regenerateAll = Game_Battler.prototype.regenerateAll;
	Game_Battler.prototype.regenerateAll = function () {
		_Game_Battler_regenerateAll.call(this);
		if (this.isAlive()) {
			this.regenerateTrunk();
		}
	};

	Game_Battler.prototype.regenerateTrunk = function () {
		if (this._trunk === trunkMax) {
			this.initTrunk();
		} else {
			var n = Math.max(Math.floor(this.mhp / 2), 1);
			var value = trunkRecover * (Math.max(this.hp - n, 0) / n);
			if (value !== 0) {
				this.applyTrunkDamage(-value);
			}
		}
	};

	var _Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
	Game_Battler.prototype.onBattleStart = function () {
		_Game_Battler_onBattleStart.call(this);
		this.initTrunk();
	};

	//-----------------------------------------------------------------------------
	// Sprite_Battler
	//

	var _Sprite_Battler_update = Sprite_Battler.prototype.update;
	Sprite_Battler.prototype.update = function () {
		_Sprite_Battler_update.call(this);
		if (this._battler) {
			this.updateTrunk();
		}
	};

	Sprite_Battler.prototype.updateTrunk = function () {
		if (!this._trunkGaugeSprite && this.parent) {
			this._trunkGaugeSprite = new Sprite_TrunkGauge(this);
			this.parent.addChild(this._trunkGaugeSprite);
		}
	};

	//-----------------------------------------------------------------------------
	// Sprite_TrunkGauge
	//

	function Sprite_TrunkGauge() {
		this.initialize.apply(this, arguments);
	}

	Sprite_TrunkGauge.prototype = Object.create(Sprite.prototype);
	Sprite_TrunkGauge.prototype.constructor = Sprite_TrunkGauge;

	Sprite_TrunkGauge.prototype.initialize = function (battlerSprite) {
		Sprite.prototype.initialize.call(this);
		this._battlerSprite = battlerSprite;
		this._battler = battlerSprite._battler;
		var width = this._battler ? this._battler.trunkWidth() : trunkWidth;
		var height = this._battler ? this._battler.trunkHeight() : trunkHeight;
		this.bitmap = new Bitmap(width, height);
		this.anchor.x = 0.5;
		this.anchor.y = 0.75;
		this.z = 10;
		this._trunk = null;
		this._trunkMax = null;
	};

	Sprite_TrunkGauge.prototype.refresh = function () {
		this.bitmap.clear();
		this._battler = this._battlerSprite._battler;
		if (this._battler) {
			this._trunk = this._battler.trunk();
			this._trunkMax = this._battler.trunkMax();
			if (this._trunkMax > 0) {
				var rate = this._trunk / this._trunkMax;
				var width = Math.floor(rate * (this.width - 4));
				var color = rate >= 0.75 ? '#e08020' : '#e0e020';
				if (Imported.TMBitmapEx) {
					this.bitmap.fillRoundRect(0, 0, this.width, this.height, 3, 'rgba(0, 0, 0, 0.6)');
					if (this._trunk > 0) {
						this.bitmap.fillRoundRect((this.width / 2) - width / 2, 2, width, this.height - 4, 3, color);
					}
				} else {
					this.bitmap.fillRect(0, 0, this.width, this.height, 'rgba(0, 0, 0, 0.6)');
					if (this._trunk > 0) {
						this.bitmap.fillRect((this.width / 2) - width / 2, 2, width, this.height - 4, color);
					}
				}
			}
		}
	};

	Sprite_TrunkGauge.prototype.update = function () {
		Sprite.prototype.update.call(this);
		var battler = this._battlerSprite._battler;
		if (this._battler !== battler ||
			(battler && (this._trunk !== battler.trunk() || this._trunkMax !== battler.trunkMax()))) {
			this.refresh();
		}
		this.x = this._battlerSprite.x + (battler ? battler.trunkShiftX() : 0);
		this.y = this._battlerSprite.y + (battler ? battler.trunkShiftY() : 0);
		this.visible = battler && battler.isAlive();
	};

})();