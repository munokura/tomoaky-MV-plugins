//=============================================================================
// TMPlugin - メニューバトラー
// バージョン: 0.1.1b
// 最終更新日: 2020/04/06
// 配布元　　: https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2020 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc メニュー画面の顔画像をサイドビューバトラーに変更します。
 *
 * @author tomoaky (https://hikimoki.sakura.ne.jp/)
 * 
 * @param faceImageRule
 * @type select
 * @option 表示しない
 * @value 0
 * @option サイドビュー画像がない場合のみ表示
 * @value 1
 * @option 表示する
 * @value 2
 * @desc 顔画像の表示条件
 * @default 0
 * 
 * @param shiftBattlerX
 * @type number
 * @min -9999
 * @desc サイドビュー画像を横方向にずらす量
 * 初期値: 0
 * @default 0
 * 
 * @param shiftBattlerY
 * @type number
 * @min -9999
 * @desc サイドビュー画像を縦方向にずらす量
 * 初期値: -24
 * @default -24
 * 
 * @help
 * TMPlugin - メニューバトラー ver0.1.1b
 * 
 * 使い方:
 * 
 * 　データベースのシステムタブにある『サイドビュー戦闘を使用』に
 * 　チェックを入れた状態でこのプラグインを導入すると
 * 　メニュー画面の顔画像がサイドビューバトラーに変わります。
 * 　プラグインパラメータで顔画像の表示条件を設定できます。
 * 
 *   このプラグインは RPGツクールMV Version 1.6.2 で動作確認をしています。
 *
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 */

var Imported = Imported || {};
Imported.TMMenuBattler = true;

(function() {

	var parameters = PluginManager.parameters('TMMenuBattler');
	var faceImageRule = +(parameters['faceImageRule'] || 0);
	var shiftBattlerX = +(parameters['shiftBattlerX'] || 0);
	var shiftBattlerY = +(parameters['shiftBattlerY'] || 0);

	//-----------------------------------------------------------------------------
	// Window_Base
	//

	Window_Base.prototype.drawMenuBattler = function(actor, x, y, width, height) {
		if (this.needsFaceDraw(actor)) {
			this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
		}
		width = Math.floor((width || Window_Base._faceWidth) / 2);
		height = height || Window_Base._faceHeight;
		this.menuBattlerSprite(x + width, y + height).setBattler(actor);
	};

	Window_Base.prototype.needsFaceDraw = function(actor) {
		return (faceImageRule === 1 && !actor.battlerName()) || faceImageRule === 2;
	};

	Window_Base.prototype.menuBattlerSprite = function(x, y) {
		if (!this._menuBattlerSprite) {
			this._menuBattlerSprite = new Sprite_MenuBattler();
			x += this.padding + shiftBattlerX;
			y += this.padding + shiftBattlerY;
			this._menuBattlerSprite.setHome(x, y);
			this.addChild(this._menuBattlerSprite);
		}
		return this._menuBattlerSprite;
	};

	//-----------------------------------------------------------------------------
	// Window_MenuStatus
	//

	Window_MenuStatus.prototype.menuBattlerSprite = function(index) {
		if (!this._menuBattlerSprites) {
			this._menuBattlerSprites = [];
		}
		var i = index - this.topIndex();
		if (!this._menuBattlerSprites[i]) {
			this._menuBattlerSprites[i] = new Sprite_MenuBattler();
			var rect = this.itemRect(index);
			var x = rect.x + 1 + Math.floor(Window_Base._faceWidth / 2) + this.padding + shiftBattlerX;
			var y = rect.y + 1 + Window_Base._faceHeight + this.padding + shiftBattlerY;
			this._menuBattlerSprites[i].setHome(x, y);
			this.addChild(this._menuBattlerSprites[i]);
		}
		return this._menuBattlerSprites[i];
	};

	var _Window_MenuStatus_drawItemImage = Window_MenuStatus.prototype.drawItemImage;
	Window_MenuStatus.prototype.drawItemImage = function(index) {
		var actor = $gameParty.members()[index];
		if (this.needsFaceDraw(actor)) {
			_Window_MenuStatus_drawItemImage.call(this, index);
		}
		this.menuBattlerSprite(index).setBattler(actor);
	};
	
	//-----------------------------------------------------------------------------
	// Window_SkillStatus
	//

	Window_SkillStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
		this.drawMenuBattler(actor, x, y, width, height);
	};

	//-----------------------------------------------------------------------------
	// Window_Status
	//

	Window_Status.prototype.drawActorFace = function(actor, x, y, width, height) {
		this.drawMenuBattler(actor, x, y, width, height);
	};

	//-----------------------------------------------------------------------------
	// Sprite_MenuBattler
	//

	function Sprite_MenuBattler() {
		this.initialize.apply(this, arguments);
	}

	Sprite_MenuBattler.prototype = Object.create(Sprite_Actor.prototype);
	Sprite_MenuBattler.prototype.constructor = Sprite_MenuBattler;

	Sprite_MenuBattler.prototype.setBattler = function(battler) {
		Sprite_Battler.prototype.setBattler.call(this, battler);
		var changed = (battler !== this._actor);
		if (changed) {
			this._actor = battler;
			this.refreshMotion();
			this._stateSprite.setup(battler);
		}
	};
	
	Sprite_MenuBattler.prototype.updateVisibility = function() {
		var actor = this._actor;
		this.visible = actor && actor.battlerName();
	};
	
	Sprite_MenuBattler.prototype.startMove = function(x, y, duration) {
	};
	
	Sprite_Actor.prototype.refreshMotion = function() {
		var actor = this._actor;
		if (actor) {
			var stateMotion = actor.stateMotionIndex();
			if (stateMotion === 3) {
				this.startMotion('dead');
			} else if (stateMotion === 2) {
				this.startMotion('sleep');
			} else if (stateMotion === 1) {
				this.startMotion('abnormal');
			} else if (actor.isDying()) {
				this.startMotion('dying');
			} else if (actor.isBattleMember()) {
				this.startMotion('walk');
			} else {
				this.startMotion('wait');
			}
		}
	};

})();
