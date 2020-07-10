//=============================================================================
// TMVplugin - 持ち上げ（ジャンプアクション拡張）
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 0.2b
// 最終更新日: 2015/11/13
//=============================================================================

/*:
 * @plugindesc イベントを持ち上げて投げられるようになります。
 * (必ず TMJumpAction より下に導入してください)
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param Carry Weight
 * @desc 持ち上げられる重さの差。
 * 初期値: 1（ 0 なら同じ重さで持ち上げられる）
 * @default 1
 *
 * @param Se Carry
 * @desc イベントを持ち上げたときに鳴らす効果音。
 * 初期値: {name: "Cancel1", volume: 90, pitch: 70, pan: 0}
 * @default {name: "Cancel1", volume: 90, pitch: 70, pan: 0}
 *
 * @param Se Hurl
 * @desc イベントを投げたときに鳴らす効果音。
 * 初期値: {name: "Evasion1", volume: 90, pitch: 70, pan: 0}
 * @default {name: "Evasion1", volume: 90, pitch: 70, pan: 0}
 *
 * @help このプラグインの動作には TMVplugin - ジャンプアクション Ver0.2b 以上
 * が必要です。必ずこちらのプラグインを下に導入してください。
 *
 * イベントの上に乗った状態で ↓ を押しながら A で持ち上げ、
 * 再度 A で持ち上げているイベントを投げます。
 * 
 * イベントの重さ + Carry Weight の値がプレイヤーの重さより重い場合は
 * 持ち上げることができません。
 * 
 * 持ち上げられているイベントはその間すべての動作を停止します、
 * また、壁や他のイベントと接触している間は投げられません。
 * 
 * 拡張プラグイン シューティングを導入している場合、持ち上げ中は
 * 弾を撃つことができなくなります。
 * 
 * プラグインコマンドはありません。
 * 
 */

var Imported = Imported || {};
Imported.TMJACarry = true;

var Tomoaky = Tomoaky || {};
Tomoaky.JACR = Tomoaky.JACR || {};

Tomoaky.Parameters = PluginManager.parameters('TMJACarry');
Tomoaky.Param = Tomoaky.Param || {};

Tomoaky.Param.JACRCarryWeight = Number(Tomoaky.Parameters['Carry Weight']);
Tomoaky.Param.JACRSeCarry = (new Function("return " + Tomoaky.Parameters['Se Carry']))();
Tomoaky.Param.JACRSeHurl = (new Function("return " + Tomoaky.Parameters['Se Hurl']))();

//-----------------------------------------------------------------------------
// Game_CharacterBase
//

// メンバ変数の初期化
Tomoaky.JACR.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
  Tomoaky.JACR.Game_CharacterBase_initMembers.call(this);
  this._carried = false;
  this._carryingObject = null;
};

// 持ち上げられる
Game_CharacterBase.prototype.carry = function() {
  this._carried = true;
  this._through = true;
};

// 投げられる
Game_CharacterBase.prototype.hurl = function() {
  this._carried = false;
  this._through = false;
  this._lastSwim = this.isSwimming();
};

// 指定位置へ移動
Tomoaky.JACR.Game_CharacterBase_locate = Game_CharacterBase.prototype.locate;
Game_CharacterBase.prototype.locate = function(x, y) {
  Tomoaky.JACR.Game_CharacterBase_locate.call(this, x, y);
  this._carried = false;
  this._carryingObject = null;
};

//-----------------------------------------------------------------------------
// Game_Player
//

// メンバ変数の初期化
Tomoaky.JACR.Game_Player_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
  Tomoaky.JACR.Game_Player_initMembers.call(this);
  this._carryingObject = null;
};

// 持ち上げ状態の取得
Game_Player.prototype.isCarrying = function() {
  return this._carryingObject !== null;
};

// 入力の処理
Tomoaky.JACR.Game_Player_updateInput = Game_Player.prototype.updateInput;
Game_Player.prototype.updateInput = function() {
  this.carryByInput();
  if (Imported.TMJAShooting && this.isCarrying()) {
    this._shotDelay = 1;
  }
  Tomoaky.JACR.Game_Player_updateInput.call(this);
};

// ボタン操作による持ち上げ（投げ）
Game_Player.prototype.carryByInput = function() {
  if (this.isCarrying()) {
    if (Input.isTriggered('attack')) {
      var target = this._carryingObject;
      var lastRealX = target._realX;
      target.collideMapLeft();
      if (lastRealX != target._realX) {
        target._realX = lastRealX;
        return;
      }
      target.collideMapRight();
      if (lastRealX != target._realX) {
        target._realX = lastRealX;
        return;
      }
      var lastRealY = target._realY;
      target.collideMapUp();
      if (lastRealY != target._realY) {
        target._realY = lastRealY;
        return;
      }
      target.collideMapDown();
      if (lastRealY != target._realY) {
        target._realY = lastRealY;
        return;
      }
      var targets = target.collideTargets();
      for (var i = 0; i < targets.length; i++) {
        var character = targets[i];
        if (!character._through && target.isCollide(character)) {
          return;
        }
      }
      this.executeHurl();
    }
  } else {
    if (Input.isTriggered('attack') && Input.isPressed('down') &&
        this.isLanding() &&
        Object.prototype.toString.call(this._landingObject) !== '[object Array]') {
      if (this._weight >= this._landingObject._weight + Tomoaky.Param.JACRCarryWeight) {
        this.executeCarry();
      } else {
        if (Imported.TMJAShooting) {
          this._shotDelay = 1;
        }
      }
    }
  }
};

// 持ち上げる
Game_Player.prototype.executeCarry = function() {
  this._carryingObject = $gameMap.event(this._landingObject.eventId());
  this._carryingObject.carry();
  this._landingObject = null;
  AudioManager.playSe(Tomoaky.Param.JACRSeCarry);
};

// 投げる
Game_Player.prototype.executeHurl = function() {
  this._carryingObject.hurl();
  if (this._direction == 4) {
    this._carryingObject.dash(this._direction);
  } else if (this._direction == 6) {
    this._carryingObject.dash(this._direction);
  } else if (this._direction == 8) {
    this._carryingObject._vx = 0;
    this._carryingObject._vy = -this._carryingObject._jumpSpeed;
  } else {
    this._carryingObject._vx = 0;
    this._carryingObject._vy = 0;
  }
  this._carryingObject = null;
  if (Imported.TMJAShooting) {
    this._shotDelay = 1;
  }
  AudioManager.playSe(Tomoaky.Param.JACRSeHurl);
};

//-----------------------------------------------------------------------------
// Game_Event
//

// フレーム更新
Tomoaky.JACR.Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
  if (this._carried) {
    this._realX = $gamePlayer._realX;
    this._realY = $gamePlayer._realY - $gamePlayer._collideH - 0.001;
    this._x = Math.floor(this._realX);
    this._y = Math.floor(this._realY);
  } else {
    Tomoaky.JACR.Game_Event_update.call(this);
  }
};
