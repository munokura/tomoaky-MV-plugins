//=============================================================================
// TMPlugin - アクターバトル
// バージョン: 0.1.0a
// 最終更新日: 2019/02/08
// 配布元　　: https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2019 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc アクター同士のバトル（サイドビュー限定）を追加します。
 *
 * @author tomoaky (https://hikimoki.sakura.ne.jp/)
 *
 * @help
 * TMPlugin - アクターバトル ver0.1.0a
 *
 * 使い方:
 *
 *   トループ名に <actorBattle:2,3> というタグがあれば、アクターバトルが
 *   有効になり、２番と３番のアクターがエネミーの代わりに出現します。
 *   パーティ内にいるアクターをエネミーにすることはできません。
 *
 *   このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。
 *
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 */

var Imported = Imported || {};
Imported.TMActorBattle = true;

(function () {

	//-----------------------------------------------------------------------------
	// BattleManager
	//

	// エネミー側アクターをバトル参加者扱いにする。
	var _BattleManager_getNextSubject = BattleManager.getNextSubject;
	BattleManager.getNextSubject = function () {
		if ($gameTroop.isActorBattle()) {
			for (; ;) {
				var battler = this._actionBattlers.shift();
				if (!battler) {
					return null;
				}
				var flag = battler.isBattleMember() || $gameTroop.members().indexOf(battler) >= 0;
				if (flag && battler.isAlive()) {
					return battler;
				}
			}
		} else {
			return _BattleManager_getNextSubject.call(this);
		}
	};

	//-----------------------------------------------------------------------------
	// Game_Action
	//

	// アクションの行動者がエネミー側アクターである目印を付ける。
	Game_Action.prototype.setEnemyActorFlag = function () {
		this._enemyActorFlag = true;
	};

	// 行動者がエネミー側アクターなら敵味方を逆にする。
	var _Game_Action_friendsUnit = Game_Action.prototype.friendsUnit;
	Game_Action.prototype.friendsUnit = function () {
		if (this._enemyActorFlag) {
			return this.subject().opponentsUnit();
		}
		return _Game_Action_friendsUnit.call(this);
	};

	// 行動者がエネミー側アクターなら敵味方を逆にする。
	var _Game_Action_opponentsUnit = Game_Action.prototype.opponentsUnit;
	Game_Action.prototype.opponentsUnit = function () {
		if (this._enemyActorFlag) {
			return this.subject().friendsUnit();
		}
		return _Game_Action_opponentsUnit.call(this);
	};

	//-----------------------------------------------------------------------------
	// Game_Actor
	//

	// Game_EnemyにあってActorにないもの、『○○たちが出現！』で使ったりする。
	Game_Actor.prototype.originalName = function () {
		return this.name();
	};

	// アクターからは経験値をもらえない。
	Game_Actor.prototype.exp = function () {
		return 0;
	};

	// アクターからはお金ももらえない。
	Game_Actor.prototype.gold = function () {
		return 0;
	};

	// アクターは何もドロップしない。
	Game_Actor.prototype.makeDropItems = function () {
		return [];
	};

	// アクターバトル用の行動生成。
	Game_Actor.prototype.makeEnemyActorActions = function () {
		Game_Battler.prototype.makeActions.call(this);
		if (this.isConfused()) {
			this.makeEnemyActorConfusionActions();
		} else {
			this.makeEnemyActorAutoBattleActions();
		}
	};

	// アクションに行動者がエネミー側アクターである目印を付ける。
	Game_Actor.prototype.makeEnemyActorAutoBattleActions = function () {
		for (var i = 0; i < this.numActions(); i++) {
			var list = this.makeActionList();
			var maxValue = Number.MIN_VALUE;
			for (var j = 0; j < list.length; j++) {
				list[j].setEnemyActorFlag();
				var value = list[j].evaluate();
				if (value > maxValue) {
					maxValue = value;
					this.setAction(i, list[j]);
				}
			}
		}
		this.setActionState('waiting');
	};

	// アクションに行動者がエネミー側アクターである目印を付ける。
	Game_Actor.prototype.makeEnemyActorConfusionActions = function () {
		for (var i = 0; i < this.numActions(); i++) {
			this.action(i).setEnemyActorFlag();
			this.action(i).setConfusion();
		}
		this.setActionState('waiting');
	};

	//-----------------------------------------------------------------------------
	// Game_Troop
	//

	// トループがアクターバトルならtrueを返す。
	Game_Troop.prototype.isActorBattle = function () {
		return this._enemyActorIds ? true : false;
	};

	// アクターバトル用のトループならエネミーの代わりにアクターをセットする。
	var _Game_Troop_setup = Game_Troop.prototype.setup;
	Game_Troop.prototype.setup = function (troopId) {
		this.setupActorBattle(troopId);
		if (this.isActorBattle()) {
			this.clear();
			this._troopId = troopId;
			this._enemies = [];
			this._enemyActorIds.forEach(function (actorId) {
				var actor = $gameActors.actor(actorId);
				if (actor) {
					this._enemies.push(actor);
				}
			}, this);
		} else {
			_Game_Troop_setup.call(this, troopId);
		}
	};

	// トループ名からアクターバトルのパラメータを取得する。
	Game_Troop.prototype.setupActorBattle = function (troopId) {
		this._enemyActorIds = null;
		var troop = $dataTroops[troopId];
		if (!troop) {
			return false;
		}
		var re = /<actorBattle:([^>]*)>/g;
		var match = re.exec(troop.name);
		if (match) {
			this._enemyActorIds = match[1].split(',').map(Number);
		}
	};

	// アクターバトルならエネミー側アクター用の行動生成をする。
	var _Game_Troop_makeActions = Game_Troop.prototype.makeActions;
	Game_Troop.prototype.makeActions = function () {
		if (this.isActorBattle()) {
			this.members().forEach(function (member) {
				member.makeEnemyActorActions();
			});
		} else {
			_Game_Troop_makeActions.call(this);
		}
	}

	//-----------------------------------------------------------------------------
	// Sprite_EnemyActor
	//
	// エネミー側用のアクタースプライト、移動演出などのＸ座標を反転。

	function Sprite_EnemyActor() {
		this.initialize.apply(this, arguments);
	}

	Sprite_EnemyActor.prototype = Object.create(Sprite_Actor.prototype);
	Sprite_EnemyActor.prototype.constructor = Sprite_EnemyActor;

	Sprite_EnemyActor.prototype.createMainSprite = function () {
		Sprite_Actor.prototype.createMainSprite.call(this);
		this._mainSprite.scale.x = -1;
	};

	Sprite_EnemyActor.prototype.createWeaponSprite = function () {
		Sprite_Actor.prototype.createWeaponSprite.call(this);
		this._weaponSprite.scale.x = -1;
		this._weaponSprite.x = 16;
	};

	Sprite_EnemyActor.prototype.moveToStartPosition = function () {
		this.startMove(-300, 0, 0);
	};

	Sprite_EnemyActor.prototype.setActorHome = function (index) {
		index = $gameTroop.members().indexOf(this._actor);
		this.setHome(216 - index * 32, 280 + index * 48);
	};

	Sprite_EnemyActor.prototype.stepForward = function () {
		this.startMove(48, 0, 12);
	};

	Sprite_EnemyActor.prototype.retreat = function () {
		this.startMove(-300, 0, 30);
	};

	Sprite_EnemyActor.prototype.damageOffsetX = function () {
		return 0;
	};

	//-----------------------------------------------------------------------------
	// Spriteset_Battle
	//

	// アクターバトルならSprite_Enemyの代わりにSprite_EnemyActorを使う。
	var _Spriteset_Battle_createEnemies = Spriteset_Battle.prototype.createEnemies;
	Spriteset_Battle.prototype.createEnemies = function () {
		if ($gameTroop.isActorBattle()) {
			var enemies = $gameTroop.members();
			var sprites = [];
			for (var i = 0; i < enemies.length; i++) {
				sprites[i] = new Sprite_EnemyActor();
				sprites[i].setBattler(enemies[i]);
			}
			sprites.sort(this.compareEnemySprite.bind(this));
			for (var j = 0; j < sprites.length; j++) {
				this._battleField.addChild(sprites[j]);
			}
			this._enemySprites = sprites;
		} else {
			_Spriteset_Battle_createEnemies.call(this);
		}
	};

	//-----------------------------------------------------------------------------
	// Window_BattleEnemy
	//

	// エネミー側アクターのインデックスを正しく取得する。
	var _Window_BattleEnemy_enemyIndex = Window_BattleEnemy.prototype.enemyIndex;
	Window_BattleEnemy.prototype.enemyIndex = function () {
		if ($gameTroop.isActorBattle()) {
			return $gameTroop.members().indexOf(this.enemy());
		}
		return _Window_BattleEnemy_enemyIndex.call(this);
	};

})();
