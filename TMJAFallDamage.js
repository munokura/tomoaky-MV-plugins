//=============================================================================
// TMVplugin - 落下ダメージ（ジャンプアクション拡張）
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 0.11b
// 最終更新日: 2015/11/02
//=============================================================================
/*:
@plugindesc Adds damage when falling from a high place.
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/tomoaky-MV-plugins ).
Original plugin by tomoaky.
-----
is required. Be sure to install this plugin below.

Damage will occur if the difference in height between the highest point reached during a jump and the landing point is greater than the Damage Fall Height value.

By adding <fall_guard:3> to the actor, equipment, or state notes, you can gain fall damage resistance (3 in this case).

The final damage is calculated as
(height difference - Damage Fall Height) * (Damage Fall Rate - Resistance)

@param Damage Fall Rate
@desc Fall damage multiplier. Default: 10
@default 10

@param Damage Fall Height
@desc Height at which you take fall damage. Default: 5
@default 5
*/


/*:ja
@plugindesc 高所から落下したときのダメージ機能を追加します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT

@help
が必要です。必ずこちらのプラグインを下に導入してください。

ジャンプ中の最高到達点と着地地点の高低差が
Damage Fall Height の値より大きければダメージが発生します。

アクター、装備、ステートのメモに
<fall_guard:3> と書くことで落下ダメージへの耐性（この場合は 3）を得ます。

最終的なダメージは
(高低差 - Damage Fall Height) * (Damage Fall Rate - 耐性)

@param Damage Fall Rate
@desc 落下ダメージの倍率。 初期値: 10
@default 10

@param Damage Fall Height
@desc 落下ダメージを受ける高さです。 初期値: 5
@default 5
*/

var Imported = Imported || {};
Imported.TMJAFallDamage = true;

var Tomoaky = Tomoaky || {};
Tomoaky.JAFD = Tomoaky.JAFD || {};

Tomoaky.Parameters = PluginManager.parameters('TMJAFallDamage');
Tomoaky.Param = Tomoaky.Param || {};

Tomoaky.Param.JADamageFallRate = Number(Tomoaky.Parameters['Damage Fall Rate']);
Tomoaky.Param.JADamageFallHeight = Number(Tomoaky.Parameters['Damage Fall Height']);

 //-----------------------------------------------------------------------------
// Game_CharacterBase
//

// メンバ変数の初期化
Tomoaky.JAFD.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
  Tomoaky.JAFD.Game_CharacterBase_initMembers.call(this);
  this._fallGuard = 0;
};

// 指定位置に移動
Tomoaky.JAFD.Game_CharacterBase_locate = Game_CharacterBase.prototype.locate;
Game_CharacterBase.prototype.locate = function(x, y) {
  Tomoaky.JAFD.Game_CharacterBase_locate.call(this, x, y);
  this.resetPeak();
};

// 重力の処理
Tomoaky.JAFD.Game_CharacterBase_updateGravity = Game_CharacterBase.prototype.updateGravity;
Game_CharacterBase.prototype.updateGravity = function() {
  if (this._jumpPeak > this._realY && this._gravity > 0) {
    this.resetPeak();
  }
  Tomoaky.JAFD.Game_CharacterBase_updateGravity.call(this);
};

// 地面に降りる
Tomoaky.JAFD.Game_CharacterBase_getLand = Game_CharacterBase.prototype.getLand;
Game_CharacterBase.prototype.getLand = function(y) {
  Tomoaky.JAFD.Game_CharacterBase_getLand.call(this, y);
  this.updateDamageFall();
};


// 落下ダメージの処理
Game_CharacterBase.prototype.updateDamageFall = function() {
  if (this.isBattler()) {
    var n = this._realY - this._jumpPeak - Tomoaky.Param.JADamageFallHeight;
    if (n > 0 && !this.isSwimming()) {
      var damage = Math.floor(Math.max(n * (Tomoaky.Param.JADamageFallRate - this._fallGuard), 1));
      this.battler().clearResult();
      this.battler().gainHp(-damage);
    }
  }
  this.resetPeak();
};

// 最高到達点のリセット
Game_CharacterBase.prototype.resetPeak = function() {
  this._jumpPeak = this._realY;
};

//-----------------------------------------------------------------------------
// Game_Player
//

// はしごにつかまる
Tomoaky.JAFD.Game_Player_getOnLadder = Game_Player.prototype.getOnLadder;
Game_Player.prototype.getOnLadder = function(downFlag) {
  Tomoaky.JAFD.Game_Player_getOnLadder.call(this, downFlag);
  this.resetPeak();
};

// 重力の処理
Tomoaky.JAFD.Game_Player_updateGravity = Game_Player.prototype.updateGravity;
Game_Player.prototype.updateGravity = function() {
  if (this._ladder || (this._jumpPeak > this._realY && this._gravity > 0)) {
    this.resetPeak();
  }
  Tomoaky.JAFD.Game_Player_updateGravity.call(this);
};

// 壁ジャンプの X 方向処理
Tomoaky.JAFD.Game_Player_wallJump = Game_Player.prototype.wallJump;
Game_Player.prototype.wallJump = function() {
  Tomoaky.JAFD.Game_Player_wallJump.call(this);
  this.resetPeak();
};

// 泳ぎ状態の更新
Tomoaky.JAFD.Game_Player_updateSwiming = Game_Player.prototype.updateSwiming;
Game_Player.prototype.updateSwiming = function() {
  Tomoaky.JAFD.Game_Player_updateSwiming.call(this);
  this.resetPeak();
};

// リフレッシュ
Tomoaky.JAFD.Game_Player_refresh = Game_Player.prototype.refresh;
Game_Player.prototype.refresh = function() {
  Tomoaky.JAFD.Game_Player_refresh.call(this);
  if (this.actor()) {
    this._fallGuard = this.actor().loadTagParam('fall_guard', 0);
  }
};