//=============================================================================
// TMPlugin - 誘導弾（シューティング拡張）
// バージョン: 0.1.0b
// 最終更新日: 2019/07/26
//=============================================================================

/*:
 * @plugindesc 対象を追尾する誘導弾を追加します。
 *
 * @author tomoaky (https://hikimoki.sakura.ne.jp/)
 *
 * @help
 * TMPlugin - 誘導弾（シューティング拡張） ver0.1.0b
 *
 * 使い方:
 *
 *   TMShooting.js よりも下にこのプラグインを導入してください。
 *   スキルのメモ欄に <induction:6 0.5 120> のようにタグを追加することで、
 *   弾に誘導機能を付与することができます。
 * 
 *   このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。
 *
 * 
 * メモ欄タグ（スキル）:
 *
 *   <induction:6 0.5 120>
 *     弾に誘導機能を付与します。
 *     敵弾ならプレイヤーを、プレイヤー弾なら一番近くの敵を追尾します。
 *     （すり抜け にチェックの入ったイベントは追尾の対象外となります）
 *     値は角度補正の更新間隔（フレーム数）と角度補正上限、
 *     最後に追尾時間です。
 *     更新間隔が 6 の場合は 6 フレームごとに角度を補正します、
 *     この数値が小さいほどなめらかな追尾になりますが負荷は増します。
 *     また、角度補正上限の値が小さいほど避けやすい誘導弾になります。
 */

var Imported = Imported || {};
Imported.TMInductionBullet = true;

(function() {

	//-----------------------------------------------------------------------------
	// Game_Bullet
	//

	// セットアップ
	var _Game_Bullet_setup = Game_Bullet.prototype.setup;
	Game_Bullet.prototype.setup = function(x, y, z, vx, vy, angle, count, type, index, skillId, ownerId) {
		_Game_Bullet_setup.call(this, x, y, z, vx, vy, angle, count, type, index, skillId, ownerId);
		this.setupInduction();
	};

	// 追尾機能を付与
	Game_Bullet.prototype.setupInduction = function() {
		var skill = $dataSkills[this._skillId];
		this._induction = skill.meta.induction;
		if (this._induction) {
			this._induction = this._induction.split(' ').map(Number);
			this._inductionCount = 0;
			this._inductionSpeed = this._vx / Math.cos(this._angle);
			this._inductionTargetId = this.searchInductionTarget();
		}
	};

	// 追尾対象を探し、そのオーナーIDを返す
	Game_Bullet.prototype.searchInductionTarget = function() {
		var result = null;
		if (this._ownerId < 0) {
			var events = $gameMap.events();
			var d1 = 99999;
			for (var i = 0; i < events.length; i++) {
				var event = events[i];
				var battler = event.battler();
				if (!event.isThrough() && battler && battler.isAlive()) {
					var d2 = Math.abs(this._x - event._realX) + Math.abs(this._y - event._realY);
					if (d1 > d2) {
						result = event.ownerId();
						d1 = d2;
					}
				}
			}
		} else {
			result = -1;
		}
		return result;
	};

	// フレーム更新
	var _Game_Bullet_update = Game_Bullet.prototype.update;
	Game_Bullet.prototype.update = function() {
		if (this._induction) {
			this.updateInduction();
		}
		return _Game_Bullet_update.call(this);
	};

	// 誘導弾の更新
	Game_Bullet.prototype.updateInduction = function() {
		this._inductionCount++;
		if (this._inductionCount % this._induction[0] === 0) {

			if (this._inductionTargetId == null) {
				var target = null;
			} else if (this._inductionTargetId < 0) {
				var target = $gamePlayer;
			} else {
				var target = $gameMap.bulletEvent(this._inductionTargetId);
			}

			if (target && !target.isThrough() && target.battler() && target.battler().isAlive()) {
				var lastAngle = this._angle;
				var angle = this.angleToCharacter(target);
				var dr = angle - lastAngle;
				if (dr > Math.PI) {
					dr -= Math.PI * 2;
				} else if (dr < -Math.PI) {
					dr += Math.PI * 2;
				}
	
				// 角度補正上限（下限）を適用
				if (dr > this._induction[1]) {
					dr = this._induction[1];
				} else if (dr < -this._induction[1]) {
					dr = -this._induction[1];
				}
	
				this._angle += dr;
				this._vx = Math.cos(this._angle) * this._inductionSpeed;
				this._vy = Math.sin(this._angle) * this._inductionSpeed;
			} else {
				this._induction = null;
				return;
			}

		}
		if (this._inductionCount === this._induction[2]) {
			this._induction = null;
		}
	};

	//-----------------------------------------------------------------------------
	// Game_DummyBullet
	//

	// ダミーには追尾機能を付与しない
	Game_DummyBullet.prototype.setupInduction = function() {
	};

})();
