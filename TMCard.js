//=============================================================================
// TMPlugin - カードゲーム
// バージョン: 0.1.7b
// 最終更新日: 2019/05/14
// 配布元　　: https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc デッキ構成で勝敗が決まるタイプのカードゲームが
 * 遊べるようになります。
 *
 * @author tomoaky (https://hikimoki.sakura.ne.jp/)
 *
 * @param vnResult
 * @desc カードゲームの結果が代入されるゲーム変数番号。
 * 初期値: 1
 * @default 1
 *
 * @param vnMaxDeck
 * @desc 登録可能なデッキの最大数として扱うゲーム変数番号。
 * 初期値: 2
 * @default 2
 *
 * @param vnMaxCard
 * @desc 組み込めるカードの最大数として扱うゲーム変数番号。
 * 初期値: 3
 * @default 3
 *
 * @param vnMaxCost
 * @desc デッキのコスト上限として扱うゲーム変数番号。
 * 初期値: 4
 * @default 4
 *
 * @param fixCardNum
 * @desc デッキのカード枚数を最大値に固定するかどうか。
 * 初期値: 1 ( 0 で少ない枚数を許可 / 1 で最大値に限定 )
 * @default 1
 *
 * @param sameCard
 * @desc 同じカードを複数組み込めるかどうか。
 * 初期値: 1 ( 0 で組み込めない / 1 で組み込める )
 * @default 1
 *
 * @param useItemCard
 * @desc アイテムカードを利用するかどうか。
 * 初期値: 1 ( 0 で利用しない / 1 で利用する )
 * @default 1
 *
 * @param useAutoText
 * @desc カードグラフィックをスクリプトで生成するかどうか。
 * 初期値: 1 ( 0 で画像そのまま / 1 で自動生成 )
 * @default 1
 *
 * @param commandDeckEdit
 * @desc メニューのデッキ編集コマンド。
 * 初期値: デッキ編集
 * @default デッキ編集
 * 
 * @param statusWindowWidth
 * @desc デッキ編集のカードステータスウィンドウの幅。
 * 初期値: 360
 * @default 360
 *
 * @param maxAtk
 * @desc 攻撃力の上限。
 * 初期値: 8
 * @default 8
 *
 * @param maxTurn
 * @desc このターン数を超えたら引き分けにする。
 * 初期値: 50
 * @default 50
 *
 * @param animationAttack
 * @desc 攻撃のアニメーション番号。
 * 初期値: 1
 * @default 1
 * @require 1
 * @type animation
 * 
 * @param animationEnemyAttack
 * @desc 攻撃のアニメーション番号（エネミーカード）。
 * 初期値: 1
 * @default 1
 * @require 1
 * @type animation
 * 
 * @param animationTypeBonus
 * @desc タイプボーナスのアニメーション番号。
 * 初期値: 52
 * @default 52
 * @require 1
 * @type animation
 * 
 * @param paramNames
 * @desc 各種パラメータの名称。
 * 初期値: 名前 レア度 コスト ＨＰ 攻撃力 タイプ スキル 固有スキル 継承スキル 属性
 * @default 名前 レア度 コスト ＨＰ 攻撃力 タイプ スキル 固有スキル 継承スキル 属性
 *
 * @param itemCardParamNames
 * @desc アイテムカードの各種パラメータのの名称。
 * 初期値: ため時間 基本効果 特殊効果
 * @default ため時間 基本効果 特殊効果
 *
 * @param typeIcons
 * @desc カードタイプのアイコン番号。
 * 初期値: 76 77 81 79 176
 * @default 76 77 81 79 176
 *
 * @param typeSpeed
 * @desc カードタイプのスピード値。
 * 初期値: 1 4 0 2
 * @default 1 4 0 2
 *
 * @param elementIcons
 * @desc カード属性のアイコン番号。
 * 初期値: 64 65 66 67 68 69 70 71
 * @default 64 65 66 67 68 69 70 71
 *
 * @param rareNames
 * @desc カード稀少度の名称。
 * 初期値: Common Uncommon Rare Legend
 * @default Common Uncommon Rare Legend
 *
 * @param costIcon
 * @desc コスト表示のアイコン番号。
 * 初期値: 87
 * @default 87
 *
 * @param costIconSpace
 * @desc コスト表示のアイコン間隔。
 * 初期値: 20
 * @default 20
 *
 * @param positionNames
 * @desc カードポジションの名称。
 * 初期値: 1st 2nd 3rd 4th 5th
 * @default 1st 2nd 3rd 4th 5th
 *
 * @param itemCardPositionName
 * @desc アイテムカードのポジションの名称。
 * 初期値: ITM
 * @default ITM
 *
 * @param deckNames
 * @desc デッキの名称。
 * 初期値: デッキＡ デッキＢ デッキＣ デッキＤ デッキＥ
 * @default デッキＡ デッキＢ デッキＣ デッキＤ デッキＥ
 *
 * @param playerCardPositions
 * @desc プレイヤーカードの表示座標。
 * 初期値: 128,264 272,184 368,184 464,184 560,184
 * @default 128,264 272,184 368,184 464,184 560,184
 *
 * @param playerItemCardPosition
 * @desc プレイヤーアイテムカードの表示座標。
 * 初期値: 272,344
 * @default 272,344
 *
 * @param enemyCardPositions
 * @desc エネミーカードの表示座標。
 * 初期値: 688,264 544,344 448,344 352,344 256,344
 * @default 688,264 544,344 448,344 352,344 256,344
 *
 * @param enemyItemCardPosition
 * @desc エネミーアイテムカードの表示座標。
 * 初期値: 544,184
 * @default 544,184
 *
 * @param numberPositions
 * @desc ＨＰと攻撃力の表示座標。
 * 初期値: 128,488 208,456 688,488 608,456
 * @default 128,488 208,456 688,488 608,456
 * 
 * @param messageWindowY
 * @type number
 * @desc カードゲームのメッセージウィンドウＹ座標
 * 初期値: 544
 * @default 544
 *
 * @requiredAssets img/pictures/c_back_0
 * @requiredAssets img/pictures/c_back_1
 * @requiredAssets img/pictures/c_back_2
 * @requiredAssets img/pictures/c_back_3
 * @requiredAssets img/pictures/c_back_i
 * @requiredAssets img/pictures/c_cursor
 * @requiredAssets img/pictures/c_frame_0
 * @requiredAssets img/pictures/c_frame_1
 * @requiredAssets img/pictures/c_frame_2
 * @requiredAssets img/pictures/c_frame_3
 * @requiredAssets img/pictures/c_frame_4
 * @requiredAssets img/pictures/c_frame_5
 * @requiredAssets img/pictures/c_frame_6
 * @requiredAssets img/pictures/c_frame_7
 * @requiredAssets img/pictures/c_frame_i
 * @requiredAssets img/pictures/c_rare_0
 * @requiredAssets img/pictures/c_rare_1
 * @requiredAssets img/pictures/c_rare_2
 * @requiredAssets img/pictures/c_rare_3
 * @requiredAssets img/pictures/c_rare_4
 * @requiredAssets img/pictures/c_rare_5
 * @requiredAssets img/pictures/c_rare_6
 * @requiredAssets img/pictures/c_rare_7
 * @requiredAssets img/pictures/card_0
 * 
 * @noteParam cardImage
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData items
 * 
 * @noteParam cardAttackAnimation
 * @noteRequire 1
 * @noteType animation
 * @noteData items
 * 
 * @help
 * TMPlugin - カードゲーム ver0.1.7b
 *
 * 使い方:
 *
 *   このプラグインを動作させるために必要な準備等については配布サイトを
 * 　参照してください。
 *
 *   このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。
 *
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 *
 * 
 * メモ欄タグ (アイテム):
 * 
 *   <cardCost:1>
 *     このアイテムをコスト 1 のカードとして扱うようになります。
 * 
 *   <cardHp:10>
 *     このアイテムのカードとしての耐久値を 10 に設定します。
 * 
 *   <cardAtk:2>
 *     このアイテムのカードとしての攻撃力を 2 に設定します。 
 * 
 *   <cardType:0>
 *     このアイテムのカードタイプを 0 番のものに設定します。
 *     タイプ値が 4 のカードはアイテムカードとして扱われます。
 * 
 *   <cardElement:1>
 *     このアイテムのカード属性を 1 番のものに設定します。
 * 
 *   <cardRare:2>
 *     このアイテムのカード稀少度を 2 番のものに設定します。
 * 
 *   <unitSkill:20>
 *     このアイテムの固有スキルとして 20 番のスキルを設定します。
 * 
 *   <partySkill:21>
 *     このアイテムのパーティスキルとして 21 番のスキルを設定します。
 * 
 *   <cardAttackAnimation:2>
 *     このアイテムの攻撃アニメーションを 2 番に設定します。
 *     省略された場合はプラグインパラメータ『animationAttack』及び
 *     『animationEnemyAttack』が適用されます。
 * 
 *   <cardImage:sample_card>
 *     img/pictures フォルダ内の sample_card.png というファイルを
 *     カード画像として設定します。
 *     このタグがない場合 card_ という文字列にアイテム番号を
 *     付与したファイル名になります。
 *
 *
 *   メモ欄タグ (スキル):
 *
 *   <cardEffect:1,2> 
 *     カードスキルとしての効果を設定します。
 * 
 *   <cardRules:2,0 7,5>
 *     カードスキルとしての発動条件を設定します。
 *     半角スペースで区切ることで複数の条件を設定できます。
 * 
 *   <cardRepeats:2>
 *     カードスキルの効果が発動する回数を設定します。
 *
 * 
 * プラグインコマンド:
 * 
 *   startCardBattle 村人Ａ 0 1,2,3
 *     対戦相手の名前、アイテムカード番号、デッキ(カンマで区切ったカード番号)
 *     を指定してカードゲームを開始します。
 *     プレイヤーが使用するデッキは、カードがセットされているデッキの中で
 *     最も上にあるものとなります。
 * 
 *   startDeckSelect 村人Ａ 0 1,2,3
 *     カードゲーム開始前にプレイヤーがデッキを選択することができます。
 *     デッキ選択がキャンセルされた場合、結果変数に -1 が代入されます。
 * 
 *   isDeckReady 1
 *     プレイヤーが有効なデッキをひとつ以上組んでいるかどうかを判定します。
 *     カードゲームが可能な状態であれば、指定した番号のゲームスイッチが
 *     オンになり、不可能な状態(カードをセットしたデッキがない)であれば
 *     オフになります。
 * 
 *   startDeckEdit
 *     デッキ編集シーンを呼び出します。
 * 
 *   disableTypeBonus
 *     タイプボーナスの機能を無効にします。
 *     ゲーム開始時にはタイプボーナスが有効になっています。
 * 
 *   enableTypeBonus
 *     無効にしたタイプボーナスの機能を元に戻します。
 *	
 * 
 * 注意:
 * 
 *   登録できるデッキの最大数が 0 の場合、メインメニューにデッキ編集コマンドが
 *   表示されなくなります。
 */

var Imported = Imported || {};
Imported.TMCard = true;

var TMPlugin = TMPlugin || {};
TMPlugin.Card = {};
TMPlugin.Card.Parameters = PluginManager.parameters('TMCard');
TMPlugin.Card.VNResult	= +(TMPlugin.Card.Parameters['vnResult'] || 1);
TMPlugin.Card.VNMaxDeck = +(TMPlugin.Card.Parameters['vnMaxDeck'] || 2);
TMPlugin.Card.VNMaxCard = +(TMPlugin.Card.Parameters['vnMaxCard'] || 3);
TMPlugin.Card.VNMaxCost = +(TMPlugin.Card.Parameters['vnMaxCost'] || 4);
TMPlugin.Card.FixCardNum = TMPlugin.Card.Parameters['fixCardNum'] === '1';
TMPlugin.Card.SameCard = TMPlugin.Card.Parameters['sameCard'] === '1';
TMPlugin.Card.UseItemCard = TMPlugin.Card.Parameters['useItemCard'] === '1';
TMPlugin.Card.UseAutoText = TMPlugin.Card.Parameters['useAutoText'] === '1';
TMPlugin.Card.CommandDeckEdit = TMPlugin.Card.Parameters['commandDeckEdit'] || 'デッキ編集';
TMPlugin.Card.StatusWindowWidth = +(TMPlugin.Card.Parameters['statusWindowWidth'] || 360);
TMPlugin.Card.MaxAtk = +(TMPlugin.Card.Parameters['maxAtk'] || 9);
TMPlugin.Card.MaxTurn = +(TMPlugin.Card.Parameters['maxTurn'] || 50);
TMPlugin.Card.AnimationAttack = +(TMPlugin.Card.Parameters['animationAttack'] || 1);
TMPlugin.Card.AnimationEnemyAttack = +(TMPlugin.Card.Parameters['animationEnemyAttack'] || 1);
TMPlugin.Card.AnimationTypeBonus = +(TMPlugin.Card.Parameters['animationTypeBonus'] || 52);
TMPlugin.Card.ParamNames = TMPlugin.Card.Parameters['paramNames'].split(' ');
TMPlugin.Card.ItemCardParamNames = TMPlugin.Card.Parameters['itemCardParamNames'].split(' ');
TMPlugin.Card.TypeIcons = TMPlugin.Card.Parameters['typeIcons'].split(' ').map(Number);
TMPlugin.Card.TypeSpeed = TMPlugin.Card.Parameters['typeSpeed'].split(' ').map(Number);
TMPlugin.Card.ElementIcons = TMPlugin.Card.Parameters['elementIcons'].split(' ').map(Number);
TMPlugin.Card.RareNames = TMPlugin.Card.Parameters['rareNames'].split(' ');
TMPlugin.Card.CostIcon = +(TMPlugin.Card.Parameters['costIcon'] || 87);
TMPlugin.Card.CostIconSpace = +(TMPlugin.Card.Parameters['costIconSpace'] || 20);
TMPlugin.Card.PositionNames = TMPlugin.Card.Parameters['positionNames'].split(' ');
TMPlugin.Card.ItemCardPositionName = TMPlugin.Card.Parameters['itemCardPositionName'] || 'ITM';
TMPlugin.Card.DeckNames = TMPlugin.Card.Parameters['deckNames'].split(' ');
TMPlugin.Card.PlayerCardPositions = TMPlugin.Card.Parameters['playerCardPositions'].split(' ').map(function(pos) {
	return pos.split(',').map(Number);
});
TMPlugin.Card.PlayerItemCardPosition = TMPlugin.Card.Parameters['playerItemCardPosition'].split(',').map(Number);
TMPlugin.Card.EnemyCardPositions = TMPlugin.Card.Parameters['enemyCardPositions'].split(' ').map(function(pos) {
	return pos.split(',').map(Number);
});
TMPlugin.Card.EnemyItemCardPosition = TMPlugin.Card.Parameters['enemyItemCardPosition'].split(',').map(Number);
TMPlugin.Card.NumberPositions = TMPlugin.Card.Parameters['numberPositions'].split(' ').map(function(pos) {
	return pos.split(',').map(Number);
});
TMPlugin.Card.MessageWindowY = +(TMPlugin.Card.Parameters['messageWindowY'] || 544);

if (!TMPlugin.InterpreterBase) {
	TMPlugin.InterpreterBase = true;
	(function() {

		Game_Interpreter.prototype.convertEscapeCharactersTM = function(text) {
			text = text.replace(/\\/g, '\x1b');
			text = text.replace(/\x1b\x1b/g, '\\');
			text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
				return $gameVariables.value(parseInt(arguments[1]));
			}.bind(this));
			text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
				return $gameVariables.value(parseInt(arguments[1]));
			}.bind(this));
			text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
				return this.actorNameTM(parseInt(arguments[1]));
			}.bind(this));
			text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
				return this.partyMemberNameTM(parseInt(arguments[1]));
			}.bind(this));
			text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
			return text;
		};
	
		Game_Interpreter.prototype.actorNameTM = function(n) {
			var actor = n >= 1 ? $gameActors.actor(n) : null;
			return actor ? actor.name() : '';
		};

		Game_Interpreter.prototype.partyMemberNameTM = function(n) {
			var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
			return actor ? actor.name() : '';
		};

	})();
} // TMPlugin.InterpreterBase

(function() {

	//-----------------------------------------------------------------------------
	// Game_System
	//

	Game_System.prototype.isTypeBonusEnabled = function() {
		return this._typeBonusEnabled == null ? true : this._typeBonusEnabled;
	};

	Game_System.prototype.setTypeBonusEnabled = function(enabled) {
		this._typeBonusEnabled = enabled;
	};

	//-----------------------------------------------------------------------------
	// Game_Party
	//

	var _Game_Party_initialize = Game_Party.prototype.initialize;
	Game_Party.prototype.initialize = function() {
		_Game_Party_initialize.call(this);
		this._deck = [];
		this._itemCards = [];
		this._activeDeck = 0;
	};

	Game_Party.prototype.maxDeck = function() {
		return $gameVariables.value(TMPlugin.Card.VNMaxDeck);
	};

	Game_Party.prototype.maxCard = function() {
		return $gameVariables.value(TMPlugin.Card.VNMaxCard);
	};

	Game_Party.prototype.maxCost = function() {
		return $gameVariables.value(TMPlugin.Card.VNMaxCost);
	};

	// 指定したデッキを返す
	Game_Party.prototype.deck = function(index) {
		if (this._deck[index] == null) {
			this._deck[index] = [];
			for (var i = 0; i < this.maxCard(); i++) {
				this._deck[index][i] = 0;
			}
		}
		return this._deck[index];
	};

	// アクティブデッキを返す
	Game_Party.prototype.activeDeck = function() {
		return this.deck(this._activeDeck);
	};

	// 指定したデッキのカードオブジェクトの配列を返す
	Game_Party.prototype.cards = function(index) {
		var deck = this.deck(index);
		return deck.map(function(cardId) {
			return $dataItems[cardId];
		});
	};

	// 指定したデッキのアイテムカードオブジェクトを返す
	Game_Party.prototype.itemCard = function(index) {
		if (index == null) index = this._activeDeck;
		if (this._itemCards[index] == null) this._itemCards[index] = 0;
		return $dataItems[this._itemCards[index]];
	};

	// 指定したデッキの合計コストを返す
	Game_Party.prototype.deckCost = function(index) {
		var cards = this.cards(index).concat(this.itemCard(index));
		return cards.reduce(function(r, card) {
			return r + (card ? +card.meta.cardCost : 0);
		}, 0);
	};

	// 指定したデッキが有効かどうかを返す
	Game_Party.prototype.isDeckValid = function(index) {
		var deck = this.deck(index);
		if (TMPlugin.Card.FixCardNum) {
			return !deck.contains(0);
		} else {
			return deck.some(function(cardId) {
				return cardId > 0;
			});
		}
	};

	// 有効なデッキがひとつ以上あるかどうかを返す
	Game_Party.prototype.isDeckReady = function() {
		for (var i = 0; i < this.maxDeck(); i++) {
			if (this.isDeckValid(i)) return true;
		}
		return false;
	};

	// アクティブデッキを設定する
	Game_Party.prototype.setActiveDeck = function(index) {
		if (index === -1) {
			for (var i = 0; i < this.maxDeck(); i++) {
				if (this.isDeckValid(i)) {
					this._activeDeck = i;
					break;
				}
			}
		} else {
			this._activeDeck = index.clamp(0, this.maxDeck() - 1);
		}
	};

	// カードをデッキにセットする
	Game_Party.prototype.changeCard = function(deckId, slotId, item) {
		if (item && !this.hasItem(item)) return;
		$gameParty.loseItem(item, 1);
		if (slotId === this.maxCard()) {
			$gameParty.gainItem(this.itemCard(deckId), 1);
			this._itemCards[deckId] = item ? item.id : 0;
		} else {
			$gameParty.gainItem(this.cards(deckId)[slotId], 1);
			var deck = this.deck(deckId);
			deck[slotId] = item ? item.id : 0;
		}
	};

	//-----------------------------------------------------------------------------
	// Game_CardBattle
	//

	function Game_CardBattle() {
		this.initialize.apply(this, arguments);
	}

	Game_CardBattle.prototype.initialize = function() {
		this._maxAtk = TMPlugin.Card.MaxAtk;
	};

	Object.defineProperties(Game_CardBattle.prototype, {
		maxAtk: { get: function() { return this._maxAtk; }, configurable: true },
		turn: { get: function() { return this._turn; }, configurable: true }
	});

	Game_CardBattle.prototype.setDecks = function(enemyName, enemyItemCardId, enemyCardIds) {
		this._maxAtk = TMPlugin.Card.MaxAtk;
		var playerName = $gameParty.battleMembers().length === 0 ? 'プレイヤー' : $gameParty.leader().name();
		var playerItemCard = $gameParty.itemCard();
		this._playerDeck = new Game_Deck(playerName, playerItemCard ? playerItemCard.id : 0, $gameParty.activeDeck().concat());
		this._enemyDeck = new Game_EnemyDeck(enemyName, enemyItemCardId, enemyCardIds);
		this._turn = this.makeOrders();
		this._firstAttack = this._turn;
		this._turnCount = 0;
		this._phase = 0;
		this._damage = 0;
		this._typeBonus = true;
		this._messages = [];
		this._waitCount = 0;
	};

	// 先攻を決定する (プレイヤーが先攻なら true を返す)
	Game_CardBattle.prototype.makeOrders = function() {
		// 合計コスト比較
		var a = this._playerDeck.cost();
		var b = this._enemyDeck.cost();
		if (a !== b) return a < b;
		// 先鋒カードのスピード比較
		a = TMPlugin.Card.TypeSpeed[this._playerDeck.cardType(0)];
		b = TMPlugin.Card.TypeSpeed[this._enemyDeck.cardType(0)];
		if (a !== b) return a > b;
		// 先鋒カードのＨＰ比較
		a = this._playerDeck.card(0).hp();
		b = this._enemyDeck.card(0).hp();
		if (a !== b) return a < b;
		// 先鋒カードの攻撃力比較
		a = this._playerDeck.card(0).atk();
		b = this._enemyDeck.card(0).atk();
		if (a !== b) return a < b;
		// ここまでで決着がつかなければ敵が先攻
		return false;
	};

	Game_CardBattle.prototype.playerDeck = function() {
		return this._playerDeck;
	};

	Game_CardBattle.prototype.enemyDeck = function() {
		return this._enemyDeck;
	};

	Game_CardBattle.prototype.attackerDeck = function() {
		return this._turn ? this._playerDeck : this._enemyDeck;
	};

	Game_CardBattle.prototype.targetDeck = function() {
		return this._turn ? this._enemyDeck : this._playerDeck;
	};

	Game_CardBattle.prototype.changeMaxAtk = function(value) {
		this._maxAtk = Math.max(value, 1);
	};

	Game_CardBattle.prototype.update = function() {
		this.updateWaitCount();
		this._playerDeck.update();
		this._enemyDeck.update();
		if (this.isPhaseUpdateEnable()) {
			if (this._phase === 0) {
				this.updatePreparationPhase();
			} else if (this._phase === 1) {
				this.updateCalculationPhase();
			} else if (this._phase === 2) {
				this.updateAttackPhase();
			} else if (this._phase === 3) {
				this.updateJudgmentPhase();
			} else if (this._phase === 4) {
				this.updateEndPhase();
			} else {
				AudioManager.stopMe();
				SceneManager.pop();
			}
		}
	};

	Game_CardBattle.prototype.updateWaitCount = function() {
		if (this._waitCount > 0) this._waitCount -= 1;
	};

	Game_CardBattle.prototype.isPhaseUpdateEnable = function() {
		if (this._messages.length > 0) return false;
		if (this._waitCount > 0) return false;
		if (this._playerDeck.isAnyCardShaked()) return false;
		if (this._enemyDeck.isAnyCardShaked()) return false;
		return true;
	};

	Game_CardBattle.prototype.updatePreparationPhase = function() {
		var attacker = this.attackerDeck();
		var target = this.targetDeck();
		attacker.card().open();
		target.card().open();
		attacker.initTurnStart();
		this.addMessage(0, attacker.userName() + 'のターン');
		this.updateRebound(attacker);
		this.checkSkill(attacker, target, true);
		this.checkSkill(target, attacker, false);
		this._phase += 1;
	};

	Game_CardBattle.prototype.updateCalculationPhase = function() {
		var attacker = this.attackerDeck();
		var target = this.targetDeck();
		this.addMessage(0, attacker.card().name() + ' の攻撃');
		this._damage = attacker.atk;
		this.applyTypeBonus(attacker, target);
		this.checkSkill(attacker, target, true);
		this.checkSkill(target, attacker, false);
		this._phase += 1;
	};

	Game_CardBattle.prototype.updateAttackPhase = function() {
		var attacker = this.attackerDeck();
		var target = this.targetDeck();
		var animationId = attacker.card().attackAnimation();
		target.gainHp(-this._damage);
		if (this._turn) {
			this.addMessage(2, animationId || TMPlugin.Card.AnimationAttack);
		} else {
			this.addMessage(1, animationId || TMPlugin.Card.AnimationEnemyAttack);
		}
		this.addMessage(0, target.card().name() + ' に ' + this._damage + ' ダメージ');
		this.addMessage(4, 0);
		for (;;) {
			var attackerLastHp = attacker.hp;
			var targetLastHp = target.hp;
			this.checkSkill(attacker, target, true);
			this.checkSkill(target, attacker, false);
			if (attackerLastHp === attacker.hp && targetLastHp === target.hp) break;
		}
		this.addMessage(4, 0);
		this._phase += 1;
	};

	Game_CardBattle.prototype.updateJudgmentPhase = function() {
		var attacker = this.attackerDeck();
		var target = this.targetDeck();
		attacker.refreshItemCardTone();
		target.refreshItemCardTone();
		if (attacker.hp === 0) attacker.knockout();
		if (target.hp === 0) target.knockout();
		this._phase += this.judgeWinLoss() ? 2 : 1;
	};

	Game_CardBattle.prototype.updateEndPhase = function() {
		this._turn = !this._turn;
		if (this._turn === this._firstAttack) this._turnCount += 1;
		if (this._turnCount === TMPlugin.Card.MaxTurn) {
			this.addMessage(3, 1);
			this.addMessage(0, '時間切れ');
			this.addMessage(0, '');
			$gameVariables.setValue(TMPlugin.Card.VNResult, 3);
			this._phase = 5;
		} else {
			this._phase = 0;
		}
	};

	// スキルの反動
	Game_CardBattle.prototype.updateRebound = function(attacker) {
		// 毎ターン攻撃力 +1
		if (attacker.isStateAffected(2) && attacker.atk < this.maxAtk) {
			attacker.atk += 1;
			this.addMessage(0, 'スキルの反動!! ' + TMPlugin.Card.ParamNames[4] + ' + 1');
		}
		// 毎ターン攻撃力 -1
		if (attacker.isStateAffected(3) && attacker.atk > 1) {
			attacker.atk -= 1;
			this.addMessage(0, 'スキルの反動!! ' + TMPlugin.Card.ParamNames[4] + ' - 1');
		}
	};

	// タイプボーナスの適用
	Game_CardBattle.prototype.applyTypeBonus = function(attacker, target) {
		if (this._typeBonus && $gameSystem.isTypeBonusEnabled()) {
			var a = attacker.cardType();
			var b = target.cardType();
			if ((a === 0 && b === 2) || (a === 1 && b === 0) ||
					(a === 2 && b === 1) || (a === 3 && b === 3)) {
				this._damage += 1;
				this.addMessage(this._turn ? 1 : 2, TMPlugin.Card.AnimationTypeBonus);
				this.addMessage(0, 'タイプボーナス!! 与えるダメージ + 1');
			}
		}
	};

	// スキル発動チェック
	Game_CardBattle.prototype.checkSkill = function(attacker, target, active) {
		var deckSize = attacker.size();
		this.useSkill(attacker, deckSize, target, active);
		for (var i = attacker.lose; i >= 0; i--) {
			this.useSkill(attacker, i, target, active);
			if (attacker.isStateAffected(1)) break;
		}
		if (attacker.isItemCardReady()) {
			this.useSkill(attacker, deckSize + 1, target, active);
			this.useSkill(attacker, deckSize + 2, target, active);
		}
	};

	// 勝敗判定
	Game_CardBattle.prototype.judgeWinLoss = function() {
		if (this.isGameover()) {
			this.addMessage(0, '勝負あり!!');
			this.addMessage(4, 120);
			if (this._playerDeck.lose === this._playerDeck.size() &&
					this._enemyDeck.lose === this._enemyDeck.size()) {
				this.addMessage(3, 1);
				this.addMessage(0, '引き分け');
				$gameVariables.setValue(TMPlugin.Card.VNResult, 0);
			} else if (this._playerDeck.lose === this._playerDeck.size()) {
				this.addMessage(3, 1);
				this.addMessage(0, '負けてしまった…');
				$gameVariables.setValue(TMPlugin.Card.VNResult, 1);
			} else {
				this.addMessage(3, 2);
				this.addMessage(0, this._playerDeck.userName() + ' の勝ち');
				$gameVariables.setValue(TMPlugin.Card.VNResult, 2);
			}
			this.addMessage(0, '');
			return true;
		}
		return false;
	};

	// 決着が着いているかを返す
	Game_CardBattle.prototype.isGameover = function() {
		return this._playerDeck.lose === this._playerDeck.size() ||
					 this._enemyDeck.lose === this._enemyDeck.size();
	};

	// メッセージの追加
	Game_CardBattle.prototype.addMessage = function(type, value) {
		var message = {
			type: type,
			value: value,
			playerHp: this._playerDeck.hp,
			playerAtk: this._playerDeck.atk.clamp(1, this.maxAtk),
			enemyHp: this._enemyDeck.hp,
			enemyAtk: this._enemyDeck.atk.clamp(1, this.maxAtk),
		};
		this._messages.push(message);
	};

	// たまっているメッセージを返す
	Game_CardBattle.prototype.getMessage = function() {
		if (this._messages.length > 0) {
			var message = this._messages.shift();
			this._playerDeck.setDrawNumber(message.playerHp, message.playerAtk);
			this._enemyDeck.setDrawNumber(message.enemyHp, message.enemyAtk);
			switch (message.type) {
			case 1:
				this._playerDeck.card().startAnimation(message.value, false, 0);
				break;
			case 2:
				this._enemyDeck.card().startAnimation(message.value, false, 0);
				break;
			case 3:
				if (message.value === 1) {
					BattleManager.playDefeatMe();
				} else if (message.value === 2) {
					BattleManager.playVictoryMe();
				}
				BattleManager.replayBgmAndBgs();
				break;
			case 4:
				this._waitCount = message.value;
				break;
			case 5:
				if (message.value) {
					this._playerDeck.itemCard().open();
				} else {
					this._enemyDeck.itemCard().open();
				}
				break;
			default:
				return message.value;
			}
		}
		return null;
	};

	// スキルの使用
	Game_CardBattle.prototype.useSkill = function(user, index, target, active) {
		var skill = user.skill(index);
		if (!skill) return;
		if (!this.meetsConditions(skill, user, index, target, active)) return;
		var effect = skill.meta.cardEffect.split(',').map(Number);
		var param = effect[1];
		if (index > user.size()) {
			userCardName = user.itemCard().name();
			this.addMessage(5, active ? this._turn : !this._turn);
		} else {
			userCardName = user.card().name();
		}
		var targetCardName = target.card().name();
		var message = null;
		switch (effect[0]) {
		case 1:	 // 相手に与えるダメージ＋○○
			this._damage = Math.max(this._damage + param, 0);
			message = '与えるダメージ ' + (param < 0 ? '- ' : '+ ') + Math.abs(param);
			break;
		case 2:	 // 相手に与えるダメージが２倍になる
			this._damage *= 2;
			message = '与えるダメージ 2 倍';
			break;
		case 3:	 // 相手から受けるダメージ＋○○
			this._damage = Math.max(this._damage + param, 0);
			message = '受けるダメージ ' + (param < 0 ? '- ' : '+ ') + Math.abs(param);
			break;
		case 4:	 // 相手から受けるダメージが半分になる
			this._damage /= 2;
			message = '受けるダメージ 半分';
			break;
		case 5:	 // 相手の継承スキルを無効化
			target.addState(1);
			message = targetCardName + ' の継承スキルを無効化';
			break;
		case 6:	 // 相手の攻撃をスルー
			this._phase = 2;
			message = '相手の攻撃を無視';
			break;
		case 7:	 // 自分のHP＋○○
			user.gainHp(param);
			message = TMPlugin.Card.ParamNames[3] + (param < 0 ? ' - ' : ' + ') + Math.abs(param);
			break;
		case 8:	 // 自分の攻撃力＋○○
			user.gainAtk(param);
			message = TMPlugin.Card.ParamNames[4] + (param < 0 ? ' - ' : ' + ') + Math.abs(param);
			break;
		case 9:	 // 自分の攻撃力を○○にする
			user.gainAtk(param - user.atk);
			message = TMPlugin.Card.ParamNames[4] + ' が ' + param + ' になった';
			break;
		case 10:	// 相手のHP＋○○
			target.gainHp(param);
			message = targetCardName + ' の' + TMPlugin.Card.ParamNames[3] +
								(param < 0 ? ' - ' : ' + ') + Math.abs(param);
			break;
		case 11:	// 相手の攻撃力＋○○
			target.gainAtk(param);
			message = targetCardName + ' の' + TMPlugin.Card.ParamNames[4] +
								(param < 0 ? ' - ' : ' + ') + Math.abs(param);
			break;
		case 12:	// 相手の攻撃力を○○にする
			target.gainAtk(param - target.atk);
			message = targetCardName + ' の' + TMPlugin.Card.ParamNames[4] +
								'が ' + param + ' になった';
			break;
		case 13:	// ○○の攻撃力を最大にする ( 0 = 自分 / 1 = 相手 )
			if (param === 0) {
				user.gainAtk(this.maxAtk - user.atk);
				message = userCardName + ' の' + TMPlugin.Card.ParamNames[4] + 'が 最大 になった';
			} else {
				target.gainAtk(this.maxAtk - target.atk);
				message = targetCardName + ' の' + TMPlugin.Card.ParamNames[4] + 'が 最大 になった';
			}
			break;
		case 14:	// 自分のHP－○○、与えるダメージ＋○○
			this._damage = Math.max(this._damage + param, 0);
			user.gainHp(-param);
			message = '与えるダメージ ' + (param < 0 ? '- ' : '+ ') + Math.abs(param) + ' / ' +
								 TMPlugin.Card.ParamNames[3] + (param < 0 ? ' + ' : ' - ') + Math.abs(param);
			break;
		case 15:	// 自分と相手の○○を入れ替える ( 0 = HP / 1 = 攻撃力 )
			if (param === 0) {
				var tempValue = user.hp;
				user.gainHp(target.hp - user.hp);
				target.gainHp(tempValue - target.hp);
				message = TMPlugin.Card.ParamNames[3] + '入れ替え';
			} else {
				var tempValue = user.atk;
				user.gainAtk(target.atk - user.atk);
				target.gainAtk(tempValue - target.atk);
				message = TMPlugin.Card.ParamNames[4] + '入れ替え';
			}
			break;
		case 16:	// 自分と相手の○○を平均化 ( 0 = HP / 1 = 攻撃力 )
			if (param === 0) {
				var n = Math.floor((user.hp + target.hp) / 2);
				user.gainHp(n - user.hp);
				target.gainHp(n - target.hp);
				message = TMPlugin.Card.ParamNames[3] + '平均化';
			} else {
				var n = Math.floor((user.atk + target.atk) / 2);
				user.gainAtk(n - user.atk);
				target.gainAtk(n - target.atk);
				message = TMPlugin.Card.ParamNames[4] + '平均化';
			}
			break;
		case 17:	// 相手に○○のダメージ
			target.gainHp(-param);
			message = targetCardName + ' に ' + param + ' ダメージ';
			break;
		case 18:	// 自分と相手に○○のダメージ
			user.gainHp(-param);
			target.gainHp(-param);
			message = userCardName + ' と ' + targetCardName + ' に ' +
								param + ' ダメージ';
			break;
		case 20:	// 自分の継承スキルを相手と同じにする
			user.changeSkill(index, target.skill(target.lose).id);
			message = '相手の' + TMPlugin.Card.ParamNames[7] + 'をコピー';
			break;
		case 21:	// 相手の継承スキルを奪う
			user.changeSkill(index, target.skill(target.lose).id);
			target.changeSkill(target.lose, 0);
			message = '相手の' + TMPlugin.Card.ParamNames[7] + 'を奪った';
			break;
		case 22:	// 相手の継承スキルを○○にすりかえる
			target.changeSkill(target.lose, param);
			message = targetCardName + ' の ' + TMPlugin.Card.ParamNames[7] +
								'が ' + $dataSkills[param].name + ' になった';
			break;
		case 23:	// 相手の固有スキルを○○にすりかえる
			target.changeSkill(target.size(), param);
			message = targetCardName + ' の ' + TMPlugin.Card.ParamNames[8] +
								'が ' + $dataSkills[param].name + ' になった';
			break;
		case 24:	// 使用済みスキルが復活する
			user.resetSkillCount();
			message = userCardName + ' の ' + TMPlugin.Card.ParamNames[6] + 'が復活';
			break;
		case 25:	// 以降のタイプボーナスを無効化
			this._typeBonus = false;
			message = '以降のタイプボーナスを無効化';
			break;
		case 26:	// 以降の攻撃力上限を○○にする
			this.changeMaxAtk(param);
			message = TMPlugin.Card.ParamNames[4] + '上限が' + param + ' に変更';
			break;
		case 27:	// 以降の攻撃力上限＋○○
			this.changeMaxAtk(this.maxAtk + param);
			message = TMPlugin.Card.ParamNames[4] + '上限 ' + (param < 0 ? '- ' : '+ ') +
								Math.abs(param);
			break;
		case 28:	// 自分の攻撃力を以降の攻撃力上限にする
			this.changeMaxAtk(user.atk);
			message = TMPlugin.Card.ParamNames[4] + '上限が' + this.maxAtk + ' に変更';
			break;
		case 29:	// 攻撃力を１にするが、毎ターン攻撃力＋１ ( 0 = 自分 / 1 = 相手 )
			if (param === 0) {
				user.gainAtk(1 - user.atk);
				user.addState(2);
				message = userCardName + ' の' + TMPlugin.Card.ParamNames[4] + 'が 1 になった';
			} else {
				target.gainAtk(1 - target.atk);
				target.addState(2);
				message = targetCardName + ' の' + TMPlugin.Card.ParamNames[4] + 'が 1 になった';
			}
			break;
		case 30:	// 攻撃力を最大にするが、毎ターン攻撃力ー１ ( 0 = 自分 / 1 = 相手 )
			if (param === 0) {
				user.gainAtk(this.maxAtk - user.atk);
				user.addState(3);
				message = userCardName + ' の' + TMPlugin.Card.ParamNames[4] + 'が 最大 になった';
			} else {
				target.gainAtk(this.maxAtk - target.atk);
				target.addState(3);
				message = targetCardName + ' の' + TMPlugin.Card.ParamNames[4] + 'が 最大 になった';
			}
			break;
		}
		var isPlayer = active ? this._turn : !this._turn;
		this.addMessage(isPlayer ? 1 : 2, skill.animationId);
		this.addMessage(0, userCardName + ' の ' + skill.name + ' 発動!!');
		this.addMessage(0, message);
		user.useSkill(index);
	};

	// 発動条件のチェック
	Game_CardBattle.prototype.meetsConditions = function(skill, user, index, target, active) {
		if (!user.checkSkillCount(index)) return false;
		if (user.isSkillUsed(index)) return false;
		if (!this.meetsEffectConditions(skill, active)) return false;
		var rules = skill.meta.cardRules;
		if (rules) {
			rules = rules.split(' ');
			for (var i = 0; i < rules.length; i++) {
				var rule = rules[i].split(',').map(Number);
				var param = rule[1];
				switch (rule[0]) {
				case 1:	// 自分のターンの○○フェイズ
					if (!active || this._phase !== param) return false;
					break;
				case 2:	// 相手のターンの○○フェイズ
					if (active || this._phase !== param) return false;
					break;
				case 3:	 // ターン指定
					if (user.turnCount !== param) return false;
					break;
				case 4:	 // 相手が○○タイプ
					if (param === -1 && user.cardType() === target.cardType()) return false;
					if (param === -2 && user.cardType() !== target.cardType()) return false;
					if (param >= 0 && target.cardType() !== param) return false;
					break;
				case 5:	 // 相手が○○属性
					if (param === -1 && user.cardElement() === target.cardElement()) return false;
					if (param === -2 && user.cardElement() !== target.cardElement()) return false;
					if (param >= 0 && target.cardElement() !== param) return false;
					break;
				case 6:	 // 相手の稀少度が○○
					if (param === -1 && user.cardRare() === target.cardRare()) return false;
					if (param === -2 && user.cardRare() !== target.cardRare()) return false;
					if (param >= 0 && target.cardRare() !== param) return false;
					break;
				case 7:	 // 相手のポジションが○○
					if (target.lose !== param) return false;
					break;
				case 8:	 // 相手のHPが○○以上
					if (target.hp < param) return false;
					break;
				case 9:	 // 相手のHPが○○以下
					if (target.hp > param) return false;
					break;
				case 10:	// 相手のHPが○○になった
					if (target.hp !== param) return false;
					break;
				case 11:	// 相手のHPが○○ ( 0 = 偶数 / 1 = 奇数 )
					if (target.hp % 2 !== param) return false;
					break;
				case 12:	// 相手の攻撃力が○○以上
					if (target.atk < param) return false;
					break;
				case 13:	// 相手の攻撃力が○○以下
					if (target.atk > param) return false;
					break;
				case 14:	// 相手の攻撃力が○○になった
					if (target.atk !== param) return false;
					break;
				case 15:	// 相手の攻撃力が○○ ( 0 = 偶数 / 1 = 奇数)
					if (target.atk % 2 !== param) return false;
					break;
				case 16:	// 自分が○○タイプ
					if (user.cardType() !== param) return false;
					break;
				case 17:	// 自分が○○属性
					if (user.cardElement() !== param) return false;
					break;
				case 18:	// 自分の稀少度が○○
					if (user.cardRare() !== param) return false;
					break;
				case 19:	// 自分のポジションが○○
					if (user.lose !== param) return false;
					break;
				case 20:	// 自分のHPが○○以上
					if (user.hp < param) return false;
					break;
				case 21:	// 自分のHPが○○以下
					if (user.hp > param) return false;
					break;
				case 22:	// 自分のHPが○○になった
					if (user.hp !== param) return false;
					break;
				case 23:	// 自分のHPが○○ ( 0 = 偶数 / 1 = 奇数)
					if (user.hp % 2 !== param) return false;
					break;
				case 24:	// 自分の攻撃力が○○以上
					if (user.atk < param) return false;
					break;
				case 25:	// 自分の攻撃力が○○以下
					if (user.atk > param) return false;
					break;
				case 26:	// 自分の攻撃力が○○になった
					if (user.atk !== param) return false;
					break;
				case 27:	// 自分の攻撃力が○○ ( 0 = 偶数 / 1 = 奇数)
					if (user.atk % 2 !== param) return false;
					break;
				case 28:	// 自分が○○を継承している
					var result = false;
					for (var i = 0; i <= index; i++) {
						if (user.skill(i).id === param) result = true;
					}
					if (!result) return false;
					break;
				case 29:	// 自分のコストが相手より低い
					if (user.cardCost() >= target.cardCost()) return false;
					break;
				case 30:	// 自分のコストが相手より高い
					if (user.cardCost() <= target.cardCost()) return false;
					break;
				case 31:	// 自分のカードタイプが統一されている
					for (var i = 0; i < user.size(); i++) {
						if (user.card(i).type() !== user.cardType()) return false;
					}
					break;
				case 32:	// 自分のデッキのカード属性が統一されている
					for (var i = 0; i < user.size(); i++) {
						if (user.card(i).element() !== user.cardElement()) return false;
					}
					break;
				case 33:	// 自分のデッキの合計コストが○○以上
					if (user.cost() < param) return false;
					break;
				case 34:	// 自分のデッキの合計コストが○○以下
					if (user.cost() > param) return false;
					break;
				}
			}
		}
		return true;
	};

	// スキル効果の発動タイミング判定
	Game_CardBattle.prototype.meetsEffectConditions = function(skill, active) {
		if (!skill.meta.cardEffect) return false;
		var effect = skill.meta.cardEffect.split(',').map(Number);
		if ([1, 2, 14].contains(effect[0])) {
			return active && this._phase === 1;
		} else if ([3, 4].contains(effect[0])) {
			return !active && this._phase === 1;
		} else if ([6].contains(effect[0])) {
			return !active && this._phase === 0;
		} else if ([17, 18].contains(effect[0])) {
			return active && this._phase === 0;
		}
		return true;
	};

	var $gameCardBattle = new Game_CardBattle();

	//-----------------------------------------------------------------------------
	// Game_Deck
	//

	function Game_Deck() {
		this.initialize.apply(this, arguments);
	}

	Object.defineProperties(Game_Deck.prototype, {
		lose: { get: function() { return this._lose; }, configurable: true },
		turnCount: { get: function() { return this._turnCount; }, configurable: true },
		chargeTime: { get: function() { return this._chargeTime; }, configurable: true },
		hp: { get: function() { return this._hp; }, configurable: true },
		atk: { get: function() { return this._atk; }, configurable: true },
		hpDraw: { get: function() { return this._hpDraw; }, configurable: true },
		atkDraw: { get: function() { return this._atkDraw; }, configurable: true }
	});

	Game_Deck.prototype.initialize = function(userName, itemCardId, cardIds) {
		this._userName = userName;
		this._itemCardId = itemCardId;
		this._cardIds = cardIds;
		this.initMembers();
		this.initCardStatus();
		this.initCardPositions();
	};

	Game_Deck.prototype.initMembers = function() {
		this._lose = 0;
		this._cost = 0;
		this._cards = [];
		this._skills = [];
		this._skillCount = [];
		this._usedSkills = [];
		this._chargeTime = 0;
		for (var i = 0; i < this._cardIds.length; i++) {
			if (this._cardIds[i] === 0) continue;
			var card = new Game_Card(this._cardIds[i]);
			var index = this._cards.length;
			if (index > 0) card.setScale(0.5, 0.5);
			this._cards.push(card);
			this._skills.push(card.partySkill());
			this._skillCount.push(0);
			this._cost += card.cost();
		}
		this._skills.push(null);
		this._skillCount.push(0);
		if (this._itemCardId !== 0) {
			this._itemCard = new Game_Card(this._itemCardId);
			this._itemCard.setScale(0.5, 0.5);
			this._skills.push(this._itemCard.unitSkill());
			this._skills.push(this._itemCard.partySkill());
			this._skillCount.push(0);
			this._skillCount.push(0);
			this._cost += this._itemCard.cost();
		}
		this._hpDraw = 0;
		this._atkDraw = 0;
	};

	Game_Deck.prototype.initCardStatus = function() {
		this._turnCount = 0;
		this._states = [];
		var card = this.card();
		this._hp = card.hp();
		this._atk = card.atk().clamp(1, $gameCardBattle.maxAtk);
		this._skills[this.size()] = card.unitSkill();
	};

	Game_Deck.prototype.initCardPositions = function() {
		for (var i = 0; i < this.size(); i++) {
			this.card(i).setPosition(TMPlugin.Card.PlayerCardPositions[i][0],
															 TMPlugin.Card.PlayerCardPositions[i][1])
		}
		if (this._itemCard) {
			this._itemCard.setPosition(TMPlugin.Card.PlayerItemCardPosition[0],
																 TMPlugin.Card.PlayerItemCardPosition[1])
		}
	};

	// ターン開始時の初期化処理
	Game_Deck.prototype.initTurnStart = function() {
		this._usedSkills = [];
		this._turnCount += 1;
		this.decreaseChargeTime();
	};

	Game_Deck.prototype.decreaseChargeTime = function() {
		if (this._chargeTime > 0) {
			this._chargeTime -= 1;
			if (this._chargeTime === 0) this.refreshItemCardTone();
		}
	};

	Game_Deck.prototype.refreshItemCardTone = function() {
		if (!this._itemCard) return;
		var value = this.isItemCardReady() ? 0 : 255;
		this._itemCard.changeColorToneGray(value);
	};

	// 戦闘不能時の処理
	Game_Deck.prototype.knockout = function() {
		this.card().changeColorToneGray(255);
		this._lose += 1;
		if (this._lose < this.size()) this.setNextCard();
	};

	// 次のカードをセット
	Game_Deck.prototype.setNextCard = function() {
		this.initCardStatus();
		this.resetSkillCount();
		this.refreshCardPositions();
		this._hpDraw = this._hp;
		this._atkDraw = this._atk;
	};

	// カードの位置をリフレッシュ
	Game_Deck.prototype.refreshCardPositions = function() {
		var size = this.size();
		for (var i = 0; i < size; i++) {
			var index = (i - this._lose + size) % size;
			var x = TMPlugin.Card.PlayerCardPositions[index][0];
			var y = TMPlugin.Card.PlayerCardPositions[index][1];
			var scale = index === 0 ? 1.0 : 0.5;
			this.card(i).setMove(x, y, scale, scale);
		}
	};

	Game_Deck.prototype.isAnyCardShaked = function() {
		return this._cards.some(function(card) {
			return card.isShaking();
		});
	};

	Game_Deck.prototype.gainHp = function(value) {
		this._hp = Math.max(this._hp + value, 0);
	};

	Game_Deck.prototype.gainAtk = function(value) {
		this._atk += value;
		this._atk = this._atk.clamp(0, $gameCardBattle.maxAtk);
	};

	// 状態の付加
	Game_Deck.prototype.addState = function(stateId) {
		this._states.push(stateId);
	};

	// 指定した状態が付加されているかを返す
	Game_Deck.prototype.isStateAffected = function(stateId) {
		return this._states.contains(stateId);
	};

	Game_Deck.prototype.setDrawNumber = function(hpDraw, atkDraw) {
		if (this._hpDraw > hpDraw) this.card().shake();
		this._hpDraw = hpDraw;
		this._atkDraw = atkDraw;
	};

	// スキル使用回数のリセット
	Game_Deck.prototype.resetSkillCount = function() {
		for (var i = 0; i <= this.size(); i++) {
			this._skillCount[i] = 0;
		}
	};

	// 指定したスキルの使用回数が残っているかを返す
	Game_Deck.prototype.checkSkillCount = function(index) {
		var skill = $dataSkills[this._skills[index]];
		var maxCount = skill.meta.cardRepeats ? +skill.meta.cardRepeats : 0;
		return this._skillCount[index] < maxCount;
	};

	// 指定したスキルがターン内に使用済みかどうかを返す
	Game_Deck.prototype.isSkillUsed = function(index) {
		return this._usedSkills[index];
	};

	// スキルを変更する
	Game_Deck.prototype.changeSkill = function(index, skillId) {
		this._skills[index] = skillId;
	};

	// スキル使用による後処理
	Game_Deck.prototype.useSkill = function(index) {
		if (index > this.size()) {
			this._chargeTime = this.itemCard().hp() + 1;
		}
		this._skillCount[index] += 1;
		this._usedSkills[index] = true;
	};

	// アイテムカードが発動可能かどうかを返す
	Game_Deck.prototype.isItemCardReady = function() {
		if (this._itemCardId === 0) return false;
		return this._chargeTime === 0;
	};

	// ユーザー名を返す
	Game_Deck.prototype.userName = function() {
		return this._userName;
	};

	// デッキサイズを返す
	Game_Deck.prototype.size = function() {
		return this._cards.length;
	};

	// デッキの合計コスト値を返す
	Game_Deck.prototype.cost = function() {
		return this._cost;
	};

	// 指定したインデックスのスキルオブジェクトを返す
	Game_Deck.prototype.skill = function(index) {
		return $dataSkills[this._skills[index]];
	};

	// 指定したカードを返す
	Game_Deck.prototype.card = function(index) {
		if (index == null) index = this._lose;
		return this._cards[index];
	};

	// アイテムカードを返す
	Game_Deck.prototype.itemCard = function() {
		return this._itemCard;
	};

	// カードのコスト値を返す
	Game_Deck.prototype.cardCost = function(index) {
		return this.card(index).cost();
	};

	// カードのタイプ値を返す
	Game_Deck.prototype.cardType = function(index) {
		return this.card(index).type();
	};

	// カードの属性値を返す
	Game_Deck.prototype.cardElement = function(index) {
		return this.card(index).element();
	};

	// カードの稀少度を返す
	Game_Deck.prototype.cardRare = function(index) {
		return this.card(index).rare();
	};

	Game_Deck.prototype.update = function() {
		for (var i = 0; i < this.size(); i++) {
			this.card(i).update();
		}
	};

	//-----------------------------------------------------------------------------
	// Game_EnemyDeck
	//

	function Game_EnemyDeck() {
		this.initialize.apply(this, arguments);
	}

	Game_EnemyDeck.prototype = Object.create(Game_Deck.prototype);
	Game_EnemyDeck.prototype.constructor = Game_EnemyDeck;

	Game_EnemyDeck.prototype.initialize = function(userName, itemCardId, cardIds) {
		Game_Deck.prototype.initialize.call(this, userName, itemCardId, cardIds);
	};

	Game_EnemyDeck.prototype.initCardPositions = function() {
		for (var i = 0; i < this.size(); i++) {
			this.card(i).setPosition(TMPlugin.Card.EnemyCardPositions[i][0],
															 TMPlugin.Card.EnemyCardPositions[i][1])
		}
		if (this._itemCard) {
			this._itemCard.setPosition(TMPlugin.Card.EnemyItemCardPosition[0],
																 TMPlugin.Card.EnemyItemCardPosition[1])
		}
	};

	// カードの位置をリフレッシュ
	Game_EnemyDeck.prototype.refreshCardPositions = function() {
		var size = this.size();
		for (var i = 0; i < size; i++) {
			var index = (i - this._lose + size) % size;
			var x = TMPlugin.Card.EnemyCardPositions[index][0];
			var y = TMPlugin.Card.EnemyCardPositions[index][1];
			var scale = index === 0 ? 1.0 : 0.5;
			this.card(i).setMove(x, y, scale, scale);
		}
	};

	//-----------------------------------------------------------------------------
	// Game_Card
	//

	function Game_Card() {
		this.initialize.apply(this, arguments);
	}

	Game_Card.prototype.initialize = function(cardId) {
		this._cardId = Math.abs(cardId);
		this._item = $dataItems[this._cardId];
		this._hide = cardId < 0;
		this.initMembers();
	};

	Game_Card.prototype.initMembers = function() {
		this._x = 0;
		this._y = 0;
		this._shiftX = 0;
		this._scaleX = 1.0;
		this._scaleY = 1.0;
		this._shakeX = 0;
		this._shakeAngle = 0.0;
		this._moveCount = 64;
		this._targetPosition = [0, 0, 1.0, 1.0];
		this._lastPosition = [0, 0, 1.0, 1.0];
		this._animations = [];
		this._colorToneGray = 0;
	};

	Game_Card.prototype.isAnimationRequested = function() {
		return this._animations.length > 0;
	};

	Game_Card.prototype.shiftAnimation = function() {
		return this._animations.shift();
	};

	Game_Card.prototype.startAnimation = function(animationId, mirror, delay) {
		var data = { animationId: animationId, mirror: mirror, delay: delay };
		this._animations.push(data);
	};

	// 位置の変更
	Game_Card.prototype.setPosition = function(x, y) {
		this._x = x;
		this._y = y;
		this._targetPosition[0] = x;
		this._targetPosition[1] = y;
	};

	// 拡大率の変更
	Game_Card.prototype.setScale = function(scaleX, scaleY) {
		this._scaleX = scaleX;
		this._scaleY = scaleY;
		this._targetPosition[2] = scaleX;
		this._targetPosition[3] = scaleY;
	};

	// 移動先の設定
	Game_Card.prototype.setMove = function(x, y, scaleX, scaleY) {
		this._lastPosition = [this._x, this._y, this._scaleX, this._scaleY];
		this._targetPosition = [x - this._x, y - this._y,
														scaleX - this._scaleX, scaleY - this._scaleY];
		this._moveCount = 0;
	};

	// 揺らす
	Game_Card.prototype.shake = function() {
		this._shakeX = 32;
		this._shakeAngle = 0.0;
	};

	// 揺れているかどうかを返す
	Game_Card.prototype.isShaking = function() {
		return this._shakeX > 0;
	};

	Game_Card.prototype.screenX = function() {
		return this._x + this._shiftX;
	};

	Game_Card.prototype.screenY = function() {
		return this._y;
	};

	Game_Card.prototype.scaleX = function() {
		return this._scaleX;
	};

	Game_Card.prototype.scaleY = function() {
		return this._scaleY;
	};

	Game_Card.prototype.isHiding = function() {
		return this._hide;
	};

	Game_Card.prototype.open = function() {
		this._hide = false;
	};

	Game_Card.prototype.colorToneGray = function() {
		return this._colorToneGray;
	};

	Game_Card.prototype.changeColorToneGray = function(colorToneGray) {
		this._colorToneGray = colorToneGray;
	};

	Game_Card.prototype.fileName = function() {
		return this._item.meta.cardImage || 'card_' + this._cardId;
	};

	Game_Card.prototype.id = function() {
		return this._cardId;
	};

	Game_Card.prototype.name = function() {
		return this._item ? this._item.name : '';
	};

	Game_Card.prototype.cost = function() {
		return this._item ? +this._item.meta.cardCost : 0;
	};

	Game_Card.prototype.hp = function() {
		return this._item ? +this._item.meta.cardHp : 0;
	};

	Game_Card.prototype.atk = function() {
		return this._item ? +this._item.meta.cardAtk : 0;
	};

	Game_Card.prototype.type = function() {
		return this._item ? +this._item.meta.cardType : 0;
	};

	Game_Card.prototype.element = function() {
		return this._item ? +this._item.meta.cardElement : 0;
	};

	Game_Card.prototype.rare = function() {
		return this._item ? +this._item.meta.cardRare : 0;
	};

	Game_Card.prototype.unitSkill = function() {
		return this._item ? +this._item.meta.unitSkill : 0;
	};

	Game_Card.prototype.partySkill = function() {
		return this._item ? +this._item.meta.partySkill : 0;
	};

	Game_Card.prototype.attackAnimation = function() {
		return this._item ? +this._item.meta.cardAttackAnimation : 0;
	};

	Game_Card.prototype.update = function() {
		if (this.isShaking()) {
			this._shakeAngle += 0.7;
			this._shakeX -= 1;
			this._shiftX = Math.floor(Math.cos(this._shakeAngle) * this._shakeX);
		}
		if (this._moveCount < 64) {
			this._moveCount += 4;
			var d = Math.sin(this._moveCount * Math.PI / 128);
			this._x = this._lastPosition[0] + d * this._targetPosition[0];
			this._y = this._lastPosition[1] + d * this._targetPosition[1];
			this._scaleX = this._lastPosition[2] + d * this._targetPosition[2];
			this._scaleY = this._lastPosition[3] + d * this._targetPosition[3];
		}
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'startCardBattle') {
			var arr = args.map(this.convertEscapeCharactersTM, this);
			var enemyName = arr[0];
			var enemyItemCardId = +arr[1];
			var enemyCardIds = arr[2].split(',').map(Number);
			$gameParty.setActiveDeck(-1);
			SceneManager.push(Scene_CardBattle);
			SceneManager.prepareNextScene(enemyName, enemyItemCardId, enemyCardIds);
		} else if (command === 'startDeckSelect') {
			var arr = args.map(this.convertEscapeCharactersTM, this);
			var enemyName = arr[0];
			var enemyItemCardId = +arr[1];
			var enemyCardIds = arr[2].split(',').map(Number);
			SceneManager.push(Scene_DeckSelect);
			SceneManager.prepareNextScene(enemyName, enemyItemCardId, enemyCardIds);
		} else if (command === 'isDeckReady') {
			var arr = args.map(this.convertEscapeCharactersTM, this);
			$gameSwitches.setValue(arr[0], $gameParty.isDeckReady());
		} else if (command === 'startDeckEdit') {
			SceneManager.push(Scene_DeckEdit);
		} else if (command === 'disableTypeBonus') {
			$gameSystem.setTypeBonusEnabled(false);
		} else if (command === 'enableTypeBonus') {
			$gameSystem.setTypeBonusEnabled(true);
		}
	};
	
	//-----------------------------------------------------------------------------
	// Sprite_Card
	//

	function Sprite_Card() {
		this.initialize.apply(this, arguments);
	}

	Sprite_Card.prototype = Object.create(Sprite_Base.prototype);
	Sprite_Card.prototype.constructor = Sprite_Card;

	Sprite_Card.prototype.initialize = function(card) {
		Sprite_Base.prototype.initialize.call(this);
		this.bitmap = new Bitmap(192, 288);
		this.bitmap.smooth = true;
		this.anchor.x = 0.5;
		this.anchor.y = 0.5;
		this._hide = card.isHiding();
		this.setCard(card);
	};

	Sprite_Card.prototype.initMembers = function() {
		this._colorToneGray = 0;
	};

	Sprite_Card.prototype.setCard = function(card) {
		this._card = card;
		this.initMembers();
		this.loadCardBitmap();
	};

	Sprite_Card.prototype.loadCardBitmap = function() {
		if (this._hide || this._card.id() === 0) {
			this._cardBitmap = ImageManager.loadPicture('card_0');
		} else {
			this._cardBitmap	= ImageManager.loadPicture(this._card.fileName());
			if (TMPlugin.Card.UseAutoText) {
				if (this._card.type() === 4) {
					this._backBitmap	= ImageManager.loadPicture('c_back_i');
					this._frameBitmap = ImageManager.loadPicture('c_frame_i');
				} else {
					this._backBitmap	= ImageManager.loadPicture('c_back_' + this._card.type());
					this._frameBitmap = ImageManager.loadPicture('c_frame_' + this._card.element());
				}
				this._rareBitmap	= ImageManager.loadPicture('c_rare_' + this._card.rare());
			}
		}
		this._bitmapLoading = true;
	};

	Sprite_Card.prototype.createCardBitmap = function() {
		this.bitmap.clear();
		if (!this._hide && this._card.id() > 0 && TMPlugin.Card.UseAutoText) {
			this.bitmap.blt(this._backBitmap, 0, 0, 192, 288, 0, 0);
			this.bitmap.blt(this._cardBitmap, 0, 0, 192, 288, 0, 0);
			this.bitmap.blt(this._frameBitmap, 0, 0, 192, 288, 0, 0);
			this.bitmap.blt(this._rareBitmap, 0, 0, 192, 288, 0, 0);
			this.drawIcon(TMPlugin.Card.TypeIcons[this._card.type()], 8, 10, 24, 24);
			for (var i = 0; i < this._card.cost(); i++) {
				this.drawIcon(TMPlugin.Card.CostIcon, 160, i * TMPlugin.Card.CostIconSpace + 44, 24, 24);
			}
			this.bitmap.fontSize = 18;
			this.bitmap.textColor = '#000000';
			this.bitmap.outlineWidth = 2;
			this.bitmap.outlineColor = '#ffffff';
			this.bitmap.drawText(this._card.name(), 32, 10, 152, 24, 'left');
			var unitSkill = $dataSkills[this._card.unitSkill()];
			if (unitSkill) {
				this.drawIcon(unitSkill.iconIndex, 8, 226, 24, 24);
				this.bitmap.drawText(unitSkill.name, 32, 226, 152, 24, 'left');
			}
			var partySkill = $dataSkills[this._card.partySkill()];
			if (partySkill) {
				this.drawIcon(partySkill.iconIndex, 8, 254, 24, 24);
				this.bitmap.drawText(partySkill.name, 32, 254, 152, 24, 'left');
			}
			this.bitmap.fontSize = 28;
			this.bitmap.drawText(this._card.hp(), 10, 182, 48, 32, 'center');
			if (this._card.type() < 4) {
				this.bitmap.drawText(this._card.atk(), 134, 182, 48, 32, 'center');
			}
		} else {
			this.bitmap.blt(this._cardBitmap, 0, 0, 192, 288, 0, 0);
		}
		this._bitmapLoading = false;
	};

	Sprite_Card.prototype.drawIcon = function(iconIndex, x, y, width, height) {
		var bitmap = ImageManager.loadSystem('IconSet');
		var pw = Window_Base._iconWidth;
		var ph = Window_Base._iconHeight;
		var sx = iconIndex % 16 * pw;
		var sy = Math.floor(iconIndex / 16) * ph;
		this.bitmap.blt(bitmap, sx, sy, pw, ph, x, y, width, height);
	};

	// おもてにする
	Sprite_Card.prototype.open = function() {
		this._hide = false;
		this.loadCardBitmap();
	};

	Sprite_Card.prototype.update = function() {
		Sprite_Base.prototype.update.call(this);
		if (this._bitmapLoading && ImageManager.isReady()) {
			this.createCardBitmap();
		}
		this.x = this._card.screenX();
		this.y = this._card.screenY();
		this.scale.x = this._card.scaleX();
		this.scale.y = this._card.scaleY();
		if (this._hide && !this._card.isHiding()) this.open();
		this.updateAnimation();
		this.updateColorTone();
	};

	Sprite_Card.prototype.updateAnimation = function() {
		this.setupAnimation();
	};

	Sprite_Card.prototype.setupAnimation = function() {
		while (this._card.isAnimationRequested()) {
			var data = this._card.shiftAnimation();
			var animation = $dataAnimations[data.animationId];
			var mirror = data.mirror;
			var delay = animation.position === 3 ? 0 : data.delay;
			this.startAnimation(animation, mirror, delay);
			for (var i = 0; i < this._animationSprites.length; i++) {
				var sprite = this._animationSprites[i];
			}
		}
	};

	Sprite_Card.prototype.updateColorTone = function() {
		if (this._colorToneGray !== this._card.colorToneGray()) {
			this._colorToneGray = this._card.colorToneGray();
			this.setColorTone([0, 0, 0, this._colorToneGray]);
		}
	};

	Sprite_Card.prototype.isGray = function() {
		return this._colorToneGray === 255;
	};

	//-----------------------------------------------------------------------------
	// Sprite_Number
	//

	function Sprite_Number() {
		this.initialize.apply(this, arguments);
	}

	Sprite_Number.prototype = Object.create(Sprite.prototype);
	Sprite_Number.prototype.constructor = Sprite_Number;

	Sprite_Number.prototype.initialize = function(x, y, width, height, fontSize,
																								textColor, outlineWidth, outlineColor) {
		Sprite.prototype.initialize.call(this);
		this.bitmap = new Bitmap(width, height);
		this.bitmap.fontSize = fontSize;
		this.bitmap.textColor = textColor;
		this.bitmap.outlineWidth = outlineWidth;
		this.bitmap.outlineColor = outlineColor;
		this.anchor.x = 0.5;
		this.anchor.y = 0.5;
		this.x = x;
		this.y = y;
		this._currentNumber = 0;
		this._newNumber = 0;
		this._waitCount = 0;
		this.refresh();
	};

	Sprite_Number.prototype.setNumber = function(value) {
		if (this._newNumber !== value) {
			this._newNumber = value;
			this.updateNumber();
		}
	};

	Sprite_Number.prototype.update = function() {
		Sprite.prototype.update.call(this);
		if (this._waitCount > 0) {
			this._waitCount -= 1;
		} else {
			this.updateNumber();
		}
	};

	Sprite_Number.prototype.updateNumber = function() {
		if (this._currentNumber !== this._newNumber) {
			if (this._currentNumber < this._newNumber) {
				this._currentNumber += 1;
			} else {
				this._currentNumber -= 1;
			}
			this.refresh();
			this._waitCount = 3;
		}
	};

	Sprite_Number.prototype.refresh = function() {
		this.bitmap.clear();
		var width = this.bitmap.width;
		var height = this.bitmap.height;
		this.bitmap.drawText(this._currentNumber + '', 0, 0, width, height, 'center');
	};

	//-----------------------------------------------------------------------------
	// Sprite_TurnCursor
	//

	function Sprite_TurnCursor() {
		this.initialize.apply(this, arguments);
	}

	Sprite_TurnCursor.prototype = Object.create(Sprite.prototype);
	Sprite_TurnCursor.prototype.constructor = Sprite_TurnCursor;

	Sprite_TurnCursor.prototype.initialize = function() {
		Sprite.prototype.initialize.call(this);
		this.bitmap = ImageManager.loadPicture('c_cursor');
		this.anchor.x = 0.5;
		this.anchor.y = 0.5;
		this._turn = null;
		var x = TMPlugin.Card.NumberPositions[0][0] +
						(TMPlugin.Card.NumberPositions[2][0] - TMPlugin.Card.NumberPositions[0][0]) / 2;
		var y = TMPlugin.Card.NumberPositions[0][1] +
						(TMPlugin.Card.NumberPositions[2][1] - TMPlugin.Card.NumberPositions[0][1]) / 2;
		this.move(x, y);
		this._lastPosition = [this.x, this.y];
		this._targetPosition = [this.x, this.y];
		this._moveCount = 8;
		this._scaleCount = 0;
	};

	Sprite_TurnCursor.prototype.update = function() {
		this.rotation += 0.02;
		this._scaleCount += 1;
		if (this._scaleCount >= 240) this._scaleCount = 0;
		this.scale.x = Math.sin(Math.PI * this._scaleCount / 120) * 0.2 + 1.0;
		this.scale.y = this.scale.x;
		if (this._turn !== $gameCardBattle.turn) {
			this._turn = $gameCardBattle.turn;
			this.setMove.apply(this, TMPlugin.Card.NumberPositions[this._turn ? 0 : 2]);
		}
		if (this._moveCount < 8) {
			this._moveCount += 1;
			var d = Math.sin(this._moveCount * Math.PI / 16);
			this.x = this._lastPosition[0] + d * this._targetPosition[0];
			this.y = this._lastPosition[1] + d * this._targetPosition[1];
		}
	};

	Sprite_TurnCursor.prototype.setMove = function(x, y) {
		this._lastPosition = [this.x, this.y];
		this._targetPosition = [x - this.x, y - this.y];
		this._moveCount = 0;
	};

	//-----------------------------------------------------------------------------
	// Spriteset_CardBattle
	//

	function Spriteset_CardBattle() {
		this.initialize.apply(this, arguments);
	}

	Spriteset_CardBattle.prototype = Object.create(Spriteset_Base.prototype);
	Spriteset_CardBattle.prototype.constructor = Spriteset_CardBattle;

	Spriteset_CardBattle.prototype.initialize = function() {
		Spriteset_Base.prototype.initialize.call(this);
	};

	Spriteset_CardBattle.prototype.createLowerLayer = function() {
		Spriteset_Base.prototype.createLowerLayer.call(this);
		this.createBackground();
		this.createBattleField();
		this.createTurnCursor();
		this.createPlayerCards();
		this.createEnemyCards();
		this.createNumberSprites();
	};

	Spriteset_CardBattle.prototype.createBackground = function() {
		this._backgroundSprite = new Sprite();
		this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
		this._baseSprite.addChild(this._backgroundSprite);
	};

	Spriteset_CardBattle.prototype.createBattleField = function() {
		var width = Graphics.boxWidth;
		var height = Graphics.boxHeight;
		var x = (Graphics.width - width) / 2;
		var y = (Graphics.height - height) / 2;
		this._battleField = new Sprite();
		this._battleField.setFrame(x, y, width, height);
		this._battleField.x = x;
		this._battleField.y = y;
		this._baseSprite.addChild(this._battleField);
	};

	Spriteset_CardBattle.prototype.createTurnCursor = function() {
		this._turnCursorSprite = new Sprite_TurnCursor();
		this._baseSprite.addChild(this._turnCursorSprite);
	};

	Spriteset_CardBattle.prototype.createPlayerCards = function() {
		this._playerCardSprites = [];
		var playerDeck = $gameCardBattle.playerDeck();
		for (var i = 0; i < playerDeck.size(); i++) {
			this._playerCardSprites[i] = new Sprite_Card(playerDeck.card(i), false);
			this._baseSprite.addChild(this._playerCardSprites[i]);
		}
		var itemCard = playerDeck.itemCard();
		if (itemCard) {
			var sprite = new Sprite_Card(itemCard, false);
			this._playerCardSprites.push(sprite);
			this._baseSprite.addChild(sprite);
		}
	};

	Spriteset_CardBattle.prototype.createEnemyCards = function() {
		this._enemyCardSprites = [];
		var enemyDeck = $gameCardBattle.enemyDeck();
		for (var i = 0; i < enemyDeck.size(); i++) {
			var hide = false;
			this._enemyCardSprites[i] = new Sprite_Card(enemyDeck.card(i), hide);
			this._baseSprite.addChild(this._enemyCardSprites[i]);
		}
		var itemCard = enemyDeck.itemCard();
		if (itemCard) {
			var sprite = new Sprite_Card(itemCard, false);
			this._enemyCardSprites.push(sprite);
			this._baseSprite.addChild(sprite);
		}
	};

	Spriteset_CardBattle.prototype.createNumberSprites = function() {
		var pos = TMPlugin.Card.NumberPositions[0];
		this._playerHpSprite = new Sprite_Number(pos[0], pos[1], 256, 128, 120, '#000000', 3, '#ffffff');
		this._baseSprite.addChild(this._playerHpSprite);
		pos = TMPlugin.Card.NumberPositions[1];
		this._playerAtkSprite = new Sprite_Number(pos[0], pos[1], 128, 64, 60, '#ff0000', 3, '#000000');
		this._baseSprite.addChild(this._playerAtkSprite);
		pos = TMPlugin.Card.NumberPositions[2];
		this._enemyHpSprite = new Sprite_Number(pos[0], pos[1], 256, 128, 120, '#000000', 3, '#ffffff');
		this._baseSprite.addChild(this._enemyHpSprite);
		pos = TMPlugin.Card.NumberPositions[3];
		this._enemyAtkSprite = new Sprite_Number(pos[0], pos[1], 128, 64, 60, '#ff0000', 3, '#000000');
		this._baseSprite.addChild(this._enemyAtkSprite);
		if ($gameCardBattle.playerDeck().itemCard()) {
			pos = TMPlugin.Card.PlayerItemCardPosition;
			this._playerChargeTimeSprite = new Sprite_Number(pos[0], pos[1], 96, 48, 45, '#0000ff', 3, '#ffffff');
			this._baseSprite.addChild(this._playerChargeTimeSprite);
		}
		if ($gameCardBattle.enemyDeck().itemCard()) {
			pos = TMPlugin.Card.EnemyItemCardPosition;
			this._enemyChargeTimeSprite = new Sprite_Number(pos[0], pos[1], 96, 48, 45, '#0000ff', 3, '#ffffff');
			this._baseSprite.addChild(this._enemyChargeTimeSprite);
		}
	};

	Spriteset_CardBattle.prototype.update = function() {
		Spriteset_Base.prototype.update.call(this);
		this.updateNumberSprites();
	};

	Spriteset_CardBattle.prototype.updateNumberSprites = function() {
		this._playerHpSprite.setNumber($gameCardBattle.playerDeck().hpDraw);
		this._playerAtkSprite.setNumber($gameCardBattle.playerDeck().atkDraw);
		this._enemyHpSprite.setNumber($gameCardBattle.enemyDeck().hpDraw);
		this._enemyAtkSprite.setNumber($gameCardBattle.enemyDeck().atkDraw);
		if (this._playerChargeTimeSprite) {
			this._playerChargeTimeSprite.visible = this._playerCardSprites[this._playerCardSprites.length - 1].isGray();
			this._playerChargeTimeSprite.setNumber($gameCardBattle.playerDeck().chargeTime - 1);
		}
		if (this._enemyChargeTimeSprite) {
			this._enemyChargeTimeSprite.visible = this._enemyCardSprites[this._enemyCardSprites.length - 1].isGray();
			this._enemyChargeTimeSprite.setNumber($gameCardBattle.enemyDeck().chargeTime - 1);
		}
	};

	//-----------------------------------------------------------------------------
	// Window_MenuCommand
	//

	var _Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
	Window_MenuCommand.prototype.addMainCommands = function() {
		_Window_MenuCommand_addMainCommands.call(this);
		if ($gameParty.maxDeck() > 0) {
			this.addCommand(TMPlugin.Card.CommandDeckEdit, 'deckEdit', true);
		}
	};

	//-----------------------------------------------------------------------------
	// Window_DeckEdit
	//

	function Window_DeckEdit() {
		this.initialize.apply(this, arguments);
	}

	Window_DeckEdit.prototype = Object.create(Window_Selectable.prototype);
	Window_DeckEdit.prototype.constructor = Window_DeckEdit;

	Window_DeckEdit.prototype.initialize = function(x, y, selectMode) {
		var width = this.windowWidth();
		var height = this.fittingHeight(Math.min($gameParty.maxDeck(), 7));
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);
		this._selectMode = selectMode;
		this.select(0);
		this.activate();
		this.refresh();
	};

	Window_DeckEdit.prototype.windowWidth = function() {
		return TMPlugin.Card.StatusWindowWidth;
	};

	Window_DeckEdit.prototype.update = function() {
		Window_Selectable.prototype.update.call(this);
		if (this._slotWindow) this._slotWindow.setDeckId(this.index());
	};

	Window_DeckEdit.prototype.maxItems = function() {
		return $gameParty.maxDeck();
	};

	Window_DeckEdit.prototype.drawItem = function(index) {
		var deckName = TMPlugin.Card.DeckNames[index];
		if (deckName) {
			var maxCost = $gameParty.maxCost();
			var deckCost = $gameParty.deckCost(index);
			var rect = this.itemRectForText(index);
			this.changePaintOpacity(this.isEnabled(index));
			this.drawText(deckName, rect.x, rect.y, rect.width);
			this.drawText(deckCost + '/' + maxCost, rect.x, rect.y, rect.width, 'right');
			this.changePaintOpacity(1);
		}
	};

	Window_DeckEdit.prototype.isEnabled = function(index) {
		return this._selectMode ? $gameParty.isDeckValid(index) : true;
	};

	Window_DeckEdit.prototype.isCurrentItemEnabled = function() {
		return this.isEnabled(this.index());
	};

	Window_DeckEdit.prototype.setSlotWindow = function(slotWindow) {
		this._slotWindow = slotWindow;
		this.callUpdateHelp();
	};

	Window_DeckEdit.prototype.updateHelp = function() {
		Window_Selectable.prototype.updateHelp.call(this);
		if (this._selectMode) {
			this._helpWindow.setText('使用するデッキを選択してください。');
		} else {
			this._helpWindow.setText('編集するデッキを選択してください。');
		}
	};

	//-----------------------------------------------------------------------------
	// Window_DeckEditStatus
	//

	function Window_DeckEditStatus() {
		this.initialize.apply(this, arguments);
	}

	Window_DeckEditStatus.prototype = Object.create(Window_Base.prototype);
	Window_DeckEditStatus.prototype.constructor = Window_DeckEditStatus;

	Window_DeckEditStatus.prototype.initialize = function(x, y) {
		var width = this.windowWidth();
		var height = Graphics.boxHeight - y;
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this.createCardObject(0);
		this.createCardSprite();
		this.refresh();
		this.hide();
	};

	Window_DeckEditStatus.prototype.windowWidth = function() {
		return TMPlugin.Card.StatusWindowWidth;
	};

	Window_DeckEditStatus.prototype.setCard = function(card) {
		var cardId = card ? card.id : 0;
		if (this._card.id() !== cardId) {
			this.createCardObject(cardId);
			this._cardSprite.setCard(this._card);
			this.refresh();
		}
	};

	Window_DeckEditStatus.prototype.createCardObject = function(cardId) {
		this._card = new Game_Card(cardId);
		var padding = this.standardPadding();
		this._card.setPosition(padding + 96, padding + 144);
	};

	Window_DeckEditStatus.prototype.createCardSprite = function() {
		this._cardSprite = new Sprite_Card(this._card, false, 1000000);
		this.addChild(this._cardSprite);
	};

	Window_DeckEditStatus.prototype.refresh = function() {
		this.contents.clear();
		if (this._card.id() > 0) {
			var x = this.textPadding() + 200;
			var width = this.contents.width - x - this.textPadding();
			var x2 = this.textPadding();
			var width2 = this.contents.width - x2 - this.textPadding();
			var x3 = x + width - Window_Base._iconWidth;
			var lineHeight = this.lineHeight();
			this.changeTextColor(this.systemColor());
			this.contents.fontSize = 16;
			this.drawText(TMPlugin.Card.ParamNames[2], x, 0, width);
			this.drawText(TMPlugin.Card.ParamNames[1], x, lineHeight * 6, width);
			if (this._card.type() === 4) {
				this.drawText(TMPlugin.Card.ItemCardParamNames[0], x, lineHeight, width);
				this.drawText(TMPlugin.Card.ParamNames[5], x,	lineHeight * 2,	width);
				this.drawText(TMPlugin.Card.ItemCardParamNames[1], x2, lineHeight * 8, width2);
				this.drawText(TMPlugin.Card.ItemCardParamNames[2], x2, lineHeight * 11, width2);
			} else {
				this.drawText(TMPlugin.Card.ParamNames[3], x, lineHeight, width);
				this.drawText(TMPlugin.Card.ParamNames[4], x, lineHeight * 2, width);
				this.drawText(TMPlugin.Card.ParamNames[5], x, lineHeight * 3, width);
				this.drawText(TMPlugin.Card.ParamNames[9], x, lineHeight * 4, width);
				this.drawText(TMPlugin.Card.ParamNames[7], x2, lineHeight * 8, width2);
				this.drawText(TMPlugin.Card.ParamNames[8], x2, lineHeight * 11, width2);
			}
			this.changeTextColor(this.normalColor());
			this.contents.fontSize = 28;
			this.drawText(this._card.cost(), x, 0, width, 'right');
			this.drawText(TMPlugin.Card.RareNames[this._card.rare()], x, lineHeight * 7 - 8, width, 'right');
			if (this._card.type() === 4) {
				this.drawText(this._card.hp(), x, lineHeight, width, 'right');
				this.drawIcon(TMPlugin.Card.TypeIcons[this._card.type()], x3, lineHeight * 2);
			} else {
				this.drawText(this._card.hp(), x, lineHeight, width, 'right');
				this.drawText(this._card.atk(), x, lineHeight * 2, width, 'right');
				this.drawIcon(TMPlugin.Card.TypeIcons[this._card.type()], x3, lineHeight * 3);
				this.drawIcon(TMPlugin.Card.ElementIcons[this._card.element()], x3, lineHeight * 4);
			}
			var unitSkill = $dataSkills[this._card.unitSkill()];
			if (unitSkill) this.drawSkill(unitSkill, x2, lineHeight * 9, width2);
			var partySkill = $dataSkills[this._card.partySkill()];
			if (partySkill) this.drawSkill(partySkill, x2, lineHeight * 12, width2);
		}
	};

	Window_DeckEditStatus.prototype.drawSkill = function(skill, x, y, width) {
		this.contents.fontSize = 28;
		this.drawItemName(skill, x, y - 8, width);
		this.contents.fontSize = 16;
		skill.description.split('\n').map(function(text, i) {
			this.drawText(text, x, y + this.lineHeight() - 16 + i * 20, width);
		}, this);
	};

	//-----------------------------------------------------------------------------
	// Window_DeckEditSlot
	//

	function Window_DeckEditSlot() {
		this.initialize.apply(this, arguments);
	}

	Window_DeckEditSlot.prototype = Object.create(Window_Selectable.prototype);
	Window_DeckEditSlot.prototype.constructor = Window_DeckEditSlot;

	Window_DeckEditSlot.prototype.initialize = function(x, y, width) {
		var height = this.fittingHeight(this.maxItems());
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);
		this._deckId = 0;
		this.refresh();
	};

	Window_DeckEditSlot.prototype.setDeckId = function(deckId) {
		if (this._deckId !== deckId) {
			this._deckId = deckId;
			this.refresh();
			if (this._itemWindow) this._itemWindow.setDeckId(this._deckId);
		}
	};

	Window_DeckEditSlot.prototype.update = function() {
		Window_Selectable.prototype.update.call(this);
		if (this._itemWindow) this._itemWindow.setSlotId(this.index(),
																										 this.isItemCardSlot(this.index()));
	};

	Window_DeckEditSlot.prototype.maxItems = function() {
		return $gameParty.maxCard() + (TMPlugin.Card.UseItemCard ? 1 : 0);
	};

	Window_DeckEditSlot.prototype.item = function() {
		if (this._deckId < 0) return null;
		if (this.isItemCardSlot(this.index())) return $gameParty.itemCard(this._deckId);
		return $gameParty.cards(this._deckId)[this.index()];
	};

	Window_DeckEditSlot.prototype.isItemCardSlot = function(index) {
		return TMPlugin.Card.UseItemCard && (index === $gameParty.maxCard());
	};

	Window_DeckEditSlot.prototype.drawItem = function(index) {
		if (this.isItemCardSlot(index)) {
			var positionName = TMPlugin.Card.ItemCardPositionName;
			var card = $gameParty.itemCard(this._deckId);
		} else {
			var positionName = TMPlugin.Card.PositionNames[index];
			var card = $gameParty.cards(this._deckId)[index];
		}
		var rect = this.itemRectForText(index);
		this.changeTextColor(this.systemColor());
		this.contents.fontSize = 16;
		var positionNameWidth = this.textWidth(positionName);
		this.drawText(positionName, rect.x, rect.y, positionNameWidth);
		if (card) {
			this.changeTextColor(this.normalColor());
			this.contents.fontSize = 28;
			var x = rect.x + positionNameWidth + 8;
			this.drawItemName(card, x, rect.y, rect.width - x);
		}
	};

	Window_DeckEditSlot.prototype.isEnabled = function(index) {
		return true;
	};

	Window_DeckEditSlot.prototype.isCurrentItemEnabled = function() {
		return this.isEnabled(this.index());
	};

	Window_DeckEditSlot.prototype.setStatusWindow = function(statusWindow) {
		this._statusWindow = statusWindow;
		this.callUpdateHelp();
	};

	Window_DeckEditSlot.prototype.setItemWindow = function(itemWindow) {
		this._itemWindow = itemWindow;
		this.update();
	};

	Window_DeckEditSlot.prototype.updateHelp = function() {
		Window_Selectable.prototype.updateHelp.call(this);
		var maxCost = $gameParty.maxCost();
		var deckCost = $gameParty.deckCost(this._deckId);
		this._helpWindow.setText(TMPlugin.Card.DeckNames[this._deckId] +
														 ' ( 合計' + TMPlugin.Card.ParamNames[2] +
														 ' ' + deckCost + ' / ' + maxCost + ' )');
		if (this._statusWindow) {
			this._statusWindow.setCard(this.item());
		}
	};

	//-----------------------------------------------------------------------------
	// Window_DeckEditItem
	//

	function Window_DeckEditItem() {
		this.initialize.apply(this, arguments);
	}

	Window_DeckEditItem.prototype = Object.create(Window_ItemList.prototype);
	Window_DeckEditItem.prototype.constructor = Window_DeckEditItem;

	Window_DeckEditItem.prototype.initialize = function(x, y, width, height) {
		Window_ItemList.prototype.initialize.call(this, x, y, width, height);
		this._deckId = 0;
		this._slotId = -1;
	};

	Window_DeckEditItem.prototype.maxCols = function() {
		return 1;
	};

	Window_DeckEditItem.prototype.setDeckId = function(deckId) {
		this._deckId = deckId;
	};

	Window_DeckEditItem.prototype.setSlotId = function(slotId, itemSlot) {
		if (this._slotId !== slotId) {
			this._slotId = slotId;
			var deckCost = $gameParty.deckCost(this._deckId);
			var cards = $gameParty.cards(this._deckId);
			var card = itemSlot ? $gameParty.itemCard(this._deckId) : cards[this._slotId];
			this._capacity = $gameParty.maxCost() - deckCost + (card ? +card.meta.cardCost : 0);
			this._otherSlotCardIds = [];
			for (var i = 0; i < $gameParty.maxCard(); i++) {
				if (this._slotId !== i && cards[i]) {
					this._otherSlotCardIds.push(cards[i].id)
				}
			}
			this.refresh();
			this.resetScroll();
		}
	};

	Window_DeckEditItem.prototype.includes = function(item) {
		if (item === null) return true;
		if (item.meta.cardCost == null) return false;
		if (TMPlugin.Card.UseItemCard && this._slotId === $gameParty.maxCard()) {
			return +item.meta.cardType === 4;
		}
		return +item.meta.cardType < 4;
	};

	Window_DeckEditItem.prototype.isEnabled = function(item) {
		if (item === null) return true;
		if (!TMPlugin.Card.SameCard && this._otherSlotCardIds.contains(item.id)) {
			return false;
		}
		return this._capacity >= +item.meta.cardCost && item.id !== this._currentCardId;
	};

	Window_DeckEditItem.prototype.selectLast = function() {
	};

	Window_DeckEditItem.prototype.setStatusWindow = function(statusWindow) {
		this._statusWindow = statusWindow;
		this.callUpdateHelp();
	};

	Window_DeckEditItem.prototype.updateHelp = function() {
		if (this._statusWindow) this._statusWindow.setCard(this.item());
	};

	Window_DeckEditItem.prototype.playOkSound = function() {
	};

	//-----------------------------------------------------------------------------
	// Window_DeckSelectStatus
	//

	function Window_DeckSelectStatus() {
		this.initialize.apply(this, arguments);
	}

	Window_DeckSelectStatus.prototype = Object.create(Window_Base.prototype);
	Window_DeckSelectStatus.prototype.constructor = Window_DeckSelectStatus;

	Window_DeckSelectStatus.prototype.initialize = function(enemyName, enemyItemCardId, enemyCardIds) {
		this._enemyName = enemyName;
		this._enemyItemCardId = enemyItemCardId;
		this._enemyCardIds = enemyCardIds;
		var width = this.windowWidth();
		var height = this.fittingHeight(2) + 144;
		var x = (Graphics.boxWidth - width) / 2;
		var y = Graphics.boxHeight - height;
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this.createCardObjects();
		this.createCardSprites();
		this.refresh();
	};

	Window_DeckSelectStatus.prototype.isItemCardValid = function() {
		return this._enemyItemCardId !== 0;
	};

	Window_DeckSelectStatus.prototype.windowWidth = function() {
		return (this._enemyCardIds.length + (this.isItemCardValid() ? 1 : 0)) * 112 - 16 +
					 this.standardPadding() * 2;
	};

	Window_DeckSelectStatus.prototype.createCardObjects = function() {
		this._cards = [];
		var cardIds = this._enemyCardIds.concat(); 
		if (this.isItemCardValid()) cardIds.push(this._enemyItemCardId);
		for (var i = 0; i < cardIds.length; i++) {
			var card = new Game_Card(cardIds[i]);
			var x = this.standardPadding() + i * 112 + 48;
			var y = this.standardPadding() + this.lineHeight() * 2 + 72;
			card.setPosition(x, y);
			card.setScale(0.5, 0.5);
			this._cards.push(card);
		}
	};

	Window_DeckSelectStatus.prototype.createCardSprites = function() {
		this._cardSprites = [];
		for (var i = 0; i < this._cards.length; i++) {
			var sprite = new Sprite_Card(this._cards[i], false, 1000000);
			this._cardSprites.push(sprite);
			this.addChild(sprite);
		}
	};

	Window_DeckSelectStatus.prototype.refresh = function() {
		this.contents.clear();
		this.changeTextColor(this.normalColor());
		this.drawText(this._enemyName, 0, 0, this.contents.width, 'center');
		this.changeTextColor(this.systemColor());
		for (var i = 0; i < this._enemyCardIds.length; i++) {
			var x = i * 112;
			this.drawText(TMPlugin.Card.PositionNames[i], x, this.lineHeight(), 96, 'center');
		}
		if (this.isItemCardValid()) {
			this.drawText(TMPlugin.Card.ItemCardPositionName, (this._cards.length - 1) * 112,
										this.lineHeight(), 96, 'center');
		}
	};

	//-----------------------------------------------------------------------------
	// Window_CardBattleStatus
	//

	function Window_CardBattleStatus() {
		this.initialize.apply(this, arguments);
	}

	Window_CardBattleStatus.prototype = Object.create(Window_Base.prototype);
	Window_CardBattleStatus.prototype.constructor = Window_CardBattleStatus;

	Window_CardBattleStatus.prototype.initialize = function(x, y) {
		var width = this.windowWidth();
		var height = this.lineHeight() + 20 + this.standardPadding() * 2;
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this.refresh();
	};

	Window_CardBattleStatus.prototype.windowWidth = function() {
		return Graphics.boxWidth;
	};

	Window_CardBattleStatus.prototype.refresh = function() {
		this.contents.clear();
		var x = this.textPadding();
		var width = this.contents.width - x * 2;
		var lineHeight = this.lineHeight();
		this.contents.fontSize = 28;
		this.drawText($gameCardBattle.playerDeck().userName(), x, 0, width, 'left');
		this.drawText($gameCardBattle.enemyDeck().userName(), x, 0, width, 'right');
		this.contents.fontSize = 16;
		this.contents.drawText('合計' + TMPlugin.Card.ParamNames[2] + ': ' +
													 $gameCardBattle.playerDeck().cost(), x, lineHeight,
													 width, 20, 'left');
		this.contents.drawText('合計' + TMPlugin.Card.ParamNames[2] + ': ' +
													 $gameCardBattle.enemyDeck().cost(), x, lineHeight,
													 width, 20, 'right');
	};


	//-----------------------------------------------------------------------------
	// Window_CardBattleMessage
	//

	function Window_CardBattleMessage() {
		this.initialize.apply(this, arguments);
	}

	Window_CardBattleMessage.prototype = Object.create(Window_Base.prototype);
	Window_CardBattleMessage.prototype.constructor = Window_CardBattleMessage;

	Window_CardBattleMessage.prototype.initialize = function(x, y) {
		var width = this.windowWidth();
		var height = this.fittingHeight(1);
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this.setBackgroundType(1);
		this._waitFlag = false;
	};

	Window_CardBattleMessage.prototype.windowWidth = function() {
		return Graphics.boxWidth;
	};

	Window_CardBattleMessage.prototype.refresh = function() {
		this.contents.clear();
		this.drawText(this._message, 0, 0, this.contents.width, 'center');
	};

	Window_CardBattleMessage.prototype.update = function() {
		Window_Base.prototype.update.call(this);
		if (this._waitFlag) {
			if (Input.isRepeated('ok') || TouchInput.isRepeated()) {
				this._waitFlag = false;
			}
		} else {
			this._message = $gameCardBattle.getMessage(); 
			if (this._message) {
				this.refresh();
				this._waitFlag = true;
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Scene_Menu
	//

	var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
		_Scene_Menu_createCommandWindow.call(this);
		this._commandWindow.setHandler('deckEdit', this.commandDeckEdit.bind(this));
	};

	Scene_Menu.prototype.commandDeckEdit = function() {
		SceneManager.push(Scene_DeckEdit);
	};

	//-----------------------------------------------------------------------------
	// Scene_DeckEdit
	//

	function Scene_DeckEdit() {
		this.initialize.apply(this, arguments);
	}

	Scene_DeckEdit.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_DeckEdit.prototype.constructor = Scene_DeckEdit;

	Scene_DeckEdit.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};

	Scene_DeckEdit.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this.createHelpWindow();
		this.createDeckWindow();
		this.createStatusWindow();
		this.createSlotWindow();
		this.createItemWindow();
	};

	Scene_DeckEdit.prototype.createHelpWindow = function() {
		this._helpWindow = new Window_Help(1);
		this.addWindow(this._helpWindow);
	};

	Scene_DeckEdit.prototype.createDeckWindow = function() {
		this._deckWindow = new Window_DeckEdit(0, this._helpWindow.height, false);
		this._deckWindow.setHandler('ok',		 this.onDeckOk.bind(this));
		this._deckWindow.setHandler('cancel', this.popScene.bind(this));
		this._deckWindow.setHelpWindow(this._helpWindow);
		this.addWindow(this._deckWindow);
	};

	Scene_DeckEdit.prototype.createStatusWindow = function() {
		this._statusWindow = new Window_DeckEditStatus(0, this._helpWindow.height);
		this.addWindow(this._statusWindow);
	};

	Scene_DeckEdit.prototype.createSlotWindow = function() {
		var wx = this._statusWindow.width;
		var wy = this._helpWindow.height;
		var ww = Graphics.boxWidth - this._statusWindow.width;
		this._slotWindow = new Window_DeckEditSlot(wx, wy, ww);
		this._slotWindow.setHelpWindow(this._helpWindow);
		this._slotWindow.setStatusWindow(this._statusWindow);
		this._slotWindow.setHandler('ok',		 this.onSlotOk.bind(this));
		this._slotWindow.setHandler('cancel', this.onSlotCancel.bind(this));
		this._deckWindow.setSlotWindow(this._slotWindow);
		this.addWindow(this._slotWindow);
	};

	Scene_DeckEdit.prototype.createItemWindow = function() {
		var wx = this._slotWindow.x;
		var wy = this._slotWindow.y + this._slotWindow.height;
		var ww = Graphics.boxWidth - wx;
		var wh = Graphics.boxHeight - wy;
		this._itemWindow = new Window_DeckEditItem(wx, wy, ww, wh);
		this._itemWindow.setHelpWindow(this._helpWindow);
		this._itemWindow.setStatusWindow(this._statusWindow);
		this._itemWindow.setHandler('ok',		 this.onItemOk.bind(this));
		this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
		this._slotWindow.setItemWindow(this._itemWindow);
		this.addWindow(this._itemWindow);
	};

	Scene_DeckEdit.prototype.onDeckOk = function() {
		this._slotWindow.activate();
		this._slotWindow.select(0);
		this._deckWindow.hide();
		this._statusWindow.show();
	};

	Scene_DeckEdit.prototype.onSlotOk = function() {
		this._itemWindow.activate();
		this._itemWindow.select(0);
	};

	Scene_DeckEdit.prototype.onSlotCancel = function() {
		this._slotWindow.deselect();
		this._deckWindow.refresh();
		this._deckWindow.activate();
		this._deckWindow.show();
		this._statusWindow.hide();
	};

	Scene_DeckEdit.prototype.onItemOk = function() {
		SoundManager.playEquip();
		$gameParty.changeCard(this._deckWindow.index(), this._slotWindow.index(),
													this._itemWindow.item());
		this._slotWindow.activate();
		this._slotWindow.refresh();
		this._itemWindow.deselect();
		this._itemWindow.refresh();
		this._statusWindow.refresh();
	};

	Scene_DeckEdit.prototype.onItemCancel = function() {
		this._slotWindow.activate();
		this._itemWindow.deselect();
	};

	//-----------------------------------------------------------------------------
	// Scene_DeckSelect
	//

	function Scene_DeckSelect() {
		this.initialize.apply(this, arguments);
	}

	Scene_DeckSelect.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_DeckSelect.prototype.constructor = Scene_DeckSelect;

	Scene_DeckSelect.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};

	Scene_DeckSelect.prototype.prepare = function(enemyName, enemyItemCardId, enemyCardIds) {
		this._enemyName = enemyName;
		this._enemyItemCardId = enemyItemCardId;
		this._enemyCardIds = enemyCardIds;
	};

	Scene_DeckSelect.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this.createHelpWindow();
		this.createDeckWindow();
		this.createSlotWindow();
		this.createStatusWindow();
	};

	Scene_DeckSelect.prototype.createHelpWindow = function() {
		this._helpWindow = new Window_Help(1);
		this.addWindow(this._helpWindow);
	};

	Scene_DeckSelect.prototype.createDeckWindow = function() {
		this._deckWindow = new Window_DeckEdit(0, this._helpWindow.height, true);
		this._deckWindow.setHandler('ok',		 this.onDeckOk.bind(this));
		this._deckWindow.setHandler('cancel', this.popScene.bind(this));
		this._deckWindow.setHelpWindow(this._helpWindow);
		this.addWindow(this._deckWindow);
	};

	Scene_DeckSelect.prototype.createSlotWindow = function() {
		var wx = this._deckWindow.width;
		var wy = this._helpWindow.height;
		var ww = Graphics.boxWidth - wx;
		this._slotWindow = new Window_DeckEditSlot(wx, wy, ww);
		this._deckWindow.setSlotWindow(this._slotWindow);
		this.addWindow(this._slotWindow);
	};

	Scene_DeckSelect.prototype.createStatusWindow = function() {
		this._statusWindow = new Window_DeckSelectStatus(this._enemyName,
																										 this._enemyItemCardId, this._enemyCardIds);
		this.addWindow(this._statusWindow);
	};

	Scene_DeckSelect.prototype.onDeckOk = function() {
		$gameParty.setActiveDeck(this._deckWindow.index());
		SceneManager.goto(Scene_CardBattle);
		SceneManager.prepareNextScene(this._enemyName, this._enemyItemCardId, this._enemyCardIds);
	};

	Scene_DeckSelect.prototype.popScene = function() {
		Scene_MenuBase.prototype.popScene.call(this);
		$gameVariables.setValue(TMPlugin.Card.VNResult, -1);
	};

	//-----------------------------------------------------------------------------
	// Scene_CardBattle
	//

	function Scene_CardBattle() {
		this.initialize.apply(this, arguments);
	}

	Scene_CardBattle.prototype = Object.create(Scene_Base.prototype);
	Scene_CardBattle.prototype.constructor = Scene_CardBattle;

	Scene_CardBattle.prototype.initialize = function() {
		Scene_Base.prototype.initialize.call(this);
		BattleManager.saveBgmAndBgs();
		BattleManager.playBattleBgm();
	};

	Scene_CardBattle.prototype.prepare = function(enemyName, enemyItemCardId, enemyCardIds) {
		$gameCardBattle.setDecks(enemyName, enemyItemCardId, enemyCardIds);
	};

	Scene_CardBattle.prototype.create = function() {
		Scene_Base.prototype.create.call(this);
		this.createDisplayObjects();
	};

	Scene_CardBattle.prototype.createDisplayObjects = function() {
		this.createSpriteset();
		this.createWindowLayer();
		this.createAllWindows();
	};

	Scene_CardBattle.prototype.createSpriteset = function() {
		this._spriteset = new Spriteset_CardBattle();
		this.addChild(this._spriteset);
	};

	Scene_CardBattle.prototype.createAllWindows = function() {
		this.createStatusWindow();
		this.createMessageWindow();
	};

	Scene_CardBattle.prototype.createStatusWindow = function() {
		this._statusWindow = new Window_CardBattleStatus(0, 0);
		this.addWindow(this._statusWindow);
	};

	Scene_CardBattle.prototype.createMessageWindow = function() {
		this._messageWindow = new Window_CardBattleMessage(0, TMPlugin.Card.MessageWindowY);
		this.addWindow(this._messageWindow);
	};

	Scene_CardBattle.prototype.update = function() {
		this.updateMain();
		Scene_Base.prototype.update.call(this);
	};

	Scene_CardBattle.prototype.updateMain = function() {
		var active = this.isActive();
		$gameCardBattle.update(active);
	};

})();
