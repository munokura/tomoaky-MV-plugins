//=============================================================================
// TMVplugin - シューティング（ジャンプアクション拡張）
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 0.2b
// 最終更新日: 2015/11/13
//=============================================================================

/*:
 * @plugindesc プレイヤーとイベントに弾を発射する機能を追加します。
 * (必ず TMJumpAction より下に導入してください)
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param Player Bullets Max
 * @desc プレイヤーの弾の最大数。
 * 初期値: 32
 * @default 32
 *
 * @param Enemy Bullets Max
 * @desc イベントの弾の最大数。
 * 初期値: 256
 * @default 256
 *
 * @param Weapon Sprite
 * @desc 弾発射時に武器画像を表示する。
 * 初期値: true（ false で武器画像なし）
 * @default true
 *
 * @param Bullet Type1 Name
 * @desc 弾タイプ１の画像ファイル名。
 * 初期値: Bullet1
 * @default Bullet1
 *
 * @param Bullet Type1 Size
 * @desc 弾タイプ１の当たり判定のサイズ。
 * 初期値: 6（半径をドット数で指定）
 * @default 6
 *
 * @param Bullet Type2 Name
 * @desc 弾タイプ２の画像ファイル名。
 * 初期値: Bullet1
 * @default Bullet1
 *
 * @param Bullet Type2 Size
 * @desc 弾タイプ２の当たり判定のサイズ。
 * 初期値: 6（半径をドット数で指定）
 * @default 6
 *
 * @param Bullet Type3 Name
 * @desc 弾タイプ３の画像ファイル名。
 * 初期値: Bullet1
 * @default Bullet1
 *
 * @param Bullet Type3 Size
 * @desc 弾タイプ３の当たり判定のサイズ。
 * 初期値: 6（半径をドット数で指定）
 * @default 6
 *
 * @param Bullet Type4 Name
 * @desc 弾タイプ４の画像ファイル名。
 * 初期値: Bullet1
 * @default Bullet1
 *
 * @param Bullet Type4 Size
 * @desc 弾タイプ４の当たり判定のサイズ。
 * 初期値: 6（半径をドット数で指定）
 * @default 6
 *
 * @help このプラグインの動作には TMVplugin - ジャンプアクション Ver0.2b 以上
 * が必要です。必ずこちらのプラグインを下に導入してください。
 *
 * A キーで弾を発射します。
 *
 * 弾を横に８個ならべたものを弾画像として扱います。
 * 画像ファイル名の頭文字が ! の場合、ブレンドモードが加算になります。
 *
 * 弾に設定したスキルのメモ欄に <map_through> タグがある場合、
 * 弾が地形を貫通するようになります。
 *
 * アクター、装備、ステートのいずれにも弾発射効果音のタグがない場合は
 * 無音になります。
 * 逆に複数のタグが見つかった場合は、ステート、装備、アクターの順に
 * タグを探し、最初に発見したものが採用されます。
 *
 * メモ欄（アクター、装備、ステート）タグ:
 *   <invincible_time:30>     # 被ダメージ後の無敵時間
 *   <shot_way:1>             # 同時に発射する弾の数
 *   <shot_space:0.2>         # 弾同士の間隔（ラジアン）
 *   <shot_speed:0.07>        # 弾の移動速度
 *   <shot_count:30>          # 弾の寿命
 *   <shot_type:1>            # 弾のタイプ
 *   <shot_index:0>           # 弾画像のインデックス
 *   <shot_skill:1>           # 弾のスキル番号
 *   <shot_delay:10>          # 発射後の硬直時間
 *   <shot_se_name:Attack2>   # 弾発射効果音のファイル名
 *   <shot_se_volume:90>      # 弾発射効果音のボリューム
 *   <shot_se_pitch:150>      # 弾発射効果音のピッチ
 *
 * プラグインコマンド:
 *   JumpAction nway_shot eventId n space angle speed count type index skillId
 *     eventId: 弾を発射するイベントの番号（ -1 でプレイヤー）
 *     n:       同時に発射する弾の数
 *     space:   弾同士の間隔（ラジアン）
 *     angle:   発射する方向（ラジアン）
 *     speed:   弾の移動速度
 *     count:   弾の寿命
 *     type:    弾のタイプ
 *     index:   弾画像のインデックス
 *     skillId: 弾のスキル（ダメージ計算用、省略可）
 *
 *   JumpAction nway_aim eventId n space angle speed count type index skillId
 *     nway_shot と同様ですが、angleにプレイヤーがいる方向（ラジアン）を
 *     自動的に加算します。angleが 0 なら自機狙いになります。
 *
 *   JumpAction nall_shot eventId n angle speed count type index skillId
 *     全方位に向けて弾を発射します、弾同士の間隔は自動で設定されます。
 *
 *   JumpAction nall_aim eventId n space angle speed count type index skillId
 *     nall_shot の自機狙い版です。
 */

var Imported = Imported || {};
Imported.TMJAShooting = true;

var Tomoaky = Tomoaky || {};
Tomoaky.JAST = Tomoaky.JAST || {};

Tomoaky.Parameters = PluginManager.parameters('TMJAShooting');
Tomoaky.Param = Tomoaky.Param || {};

Tomoaky.Param.JASTPlayerBulletsMax = Number(Tomoaky.Parameters['Player Bullets Max']);
Tomoaky.Param.JASTEnemyBulletsMax = Number(Tomoaky.Parameters['Enemy Bullets Max']);
Tomoaky.Param.JASTWeaponSprite = (Tomoaky.Parameters['Weapon Sprite']) === 'true' ? true : false;
Tomoaky.Param.JASTBulletNames = [];
Tomoaky.Param.JASTBulletNames[1] = String(Tomoaky.Parameters['Bullet Type1 Name']);
Tomoaky.Param.JASTBulletNames[2] = String(Tomoaky.Parameters['Bullet Type2 Name']);
Tomoaky.Param.JASTBulletNames[3] = String(Tomoaky.Parameters['Bullet Type3 Name']);
Tomoaky.Param.JASTBulletNames[4] = String(Tomoaky.Parameters['Bullet Type4 Name']);
Tomoaky.Param.JASTBulletSizes = [];
Tomoaky.Param.JASTBulletSizes[1] = Number(Tomoaky.Parameters['Bullet Type1 Size']) / 48;
Tomoaky.Param.JASTBulletSizes[2] = Number(Tomoaky.Parameters['Bullet Type2 Size']) / 48;
Tomoaky.Param.JASTBulletSizes[3] = Number(Tomoaky.Parameters['Bullet Type3 Size']) / 48;
Tomoaky.Param.JASTBulletSizes[4] = Number(Tomoaky.Parameters['Bullet Type4 Size']) / 48;
Tomoaky.Param.JASTSeShot = (new Function("return " + Tomoaky.Parameters['Se Shot']))();

//-----------------------------------------------------------------------------
// Game_Map
//

// セットアップ
Tomoaky.JAST.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
  Tomoaky.JAST.Game_Map_setup.call(this, mapId);
  this.setupBullets();
};

// 弾のセットアップ
Game_Map.prototype.setupBullets = function() {
  this._playerBullets = [];
  this._alivePlayerBullets = [];
  this._blankPlayerBullets = [];
  for (var i = 0; i < Tomoaky.Param.JASTPlayerBulletsMax; i++) {
    this._playerBullets.push(new Game_Bullet());
    this._blankPlayerBullets.push(i);
  }
  this._enemyBullets = [];
  this._aliveEnemyBullets = [];
  this._blankEnemyBullets = [];
  for (var i = 0; i < Tomoaky.Param.JASTEnemyBulletsMax; i++) {
    this._enemyBullets.push(new Game_Bullet());
    this._blankEnemyBullets.push(i);
  }
};

// 自機弾を返す
Game_Map.prototype.playerBullets = function() {
  return this._playerBullets;
};

// 敵機弾を返す
Game_Map.prototype.enemyBullets = function() {
  return this._enemyBullets;
};

// 弾の通行チェック
Game_Map.prototype.checkPassageBullet = function(x, y) {
  if (!this.isValid(x, y)) {
    return false;
  }
  var rg = this.tileId(x, y, 5);
  if (rg == Tomoaky.Param.JAWallRegion) {
    return false;
  }
  var flags = this.tilesetFlags();
  var tiles = this.layeredTiles(x, y);
  for (var i = 0; i < tiles.length; i++) {
    var flag = flags[tiles[i]];
    if ((flag & 0x10) !== 0) {
      continue;
    }
    if ((flag & 0x0f) !== 0x0f) {
      return true;
    }
    if ((flag & 0x0f) !== 0) {
      return false;
    }
  }
  return false;
};

// フレーム更新
Tomoaky.JAST.Game_Map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
  Tomoaky.JAST.Game_Map_update.call(this, sceneActive);
  this.updateBullets();
};

// 弾の更新
Game_Map.prototype.updateBullets = function() {
  for (var i = this._alivePlayerBullets.length - 1; i >= 0; i--) {
    var bi = this._alivePlayerBullets[i];
    if (!this._playerBullets[bi].update()) {
      this._alivePlayerBullets.splice(i, 1);
      this._blankPlayerBullets.push(bi);
    }
  }
  for (var i = this._aliveEnemyBullets.length - 1; i >= 0; i--) {
    var bi = this._aliveEnemyBullets[i];
    if (!this._enemyBullets[bi].update()) {
      this._aliveEnemyBullets.splice(i, 1);
      this._blankEnemyBullets.push(bi);
    }
  }
};

// 弾の追加
Game_Map.prototype.addBullet = function(x, y, z, vx, vy, angle, count, type, index, id, enemyFlag, skillId, owner) {
  if (enemyFlag) {
    if (this._blankEnemyBullets.length > 0) {
      var bi = this._blankEnemyBullets.shift();
      this._enemyBullets[bi].setup(x, y, z, vx, vy, angle, count, type, index, id, true, skillId, owner);
      this._aliveEnemyBullets.push(bi);
    }
  } else {
    if (this._blankPlayerBullets.length > 0) {
      var bi = this._blankPlayerBullets.shift();
      this._playerBullets[bi].setup(x, y, z, vx, vy, angle, count, type, index, id, false, skillId, owner);
      this._alivePlayerBullets.push(bi);
    }
  }
};

// 自機弾の全削除
Game_Map.prototype.clearPlayerBullets = function() {
  for (var i = 0; i < this._alivePlayerBullets.length; i++) {
    this._playerBullets[this._alivePlayerBullets[i]].erase();
  }
  this._blankPlayerBullets.concat(this._alivePlayerBullets);
  this._alivePlayerBullets = [];
};

// 敵機弾の全削除
Game_Map.prototype.clearEnemyBullets = function() {
  for (var i = 0; i < this._aliveEnemyBullets.length; i++) {
    this._enemyBullets[this._aliveEnemyBullets[i]].erase();
  }
  this._blankEnemyBullets.concat(this._aliveEnemyBullets);
  this._aliveEnemyBullets = [];
};

// すべての弾を削除
Game_Map.prototype.clearAllBullets = function() {
  this.clearPlayerBullets();
  this.clearEnemyBullets();
};

//-----------------------------------------------------------------------------
// Game_Action
//

Tomoaky.JAST.Game_Action_setSubject = Game_Action.prototype.setSubject;
Game_Action.prototype.setSubject = function(subject) {
  if (!subject.isActor() && !$gameParty.inBattle()) {
    this._subjectEnemyIndex = subject._screenX;
    this._subjectActorId = 0;
  } else {
    Tomoaky.JAST.Game_Action_setSubject.call(this, subject);
  }
};

Tomoaky.JAST.Game_Action_subject = Game_Action.prototype.subject;
Game_Action.prototype.subject = function() {
  if (this._subjectActorId == 0 && !$gameParty.inBattle()) {
    return $gameMap.event(this._subjectEnemyIndex).battler();
  } else {
    return Tomoaky.JAST.Game_Action_subject.call(this);
  }
};


//-----------------------------------------------------------------------------
// Game_Bullet
//

function Game_Bullet() {
  this.initialize.apply(this, arguments);
}

// 初期化
Game_Bullet.prototype.initialize = function() {
  this._opacity = 0;
};

// セットアップ
Game_Bullet.prototype.setup = function(x, y, z, vx, vy, angle, count, type, index, eventId, enemyFlag, skillId, owner) {
  this._opacity = 255;
  this._x = x;
  this._y = y;
  this._z = z;
  this._vx = vx;
  this._vy = vy;
  this._angle = angle;
  this._count = count;
  this._type = type;
  this._characterName = Tomoaky.Param.JASTBulletNames[this._type];
  this._characterIndex = index;
  this._eventId = eventId;
  this._enemyFlag = enemyFlag;
  this._skillId = skillId;
  this._owner = owner;
  this._collideSize = Tomoaky.Param.JASTBulletSizes[this._type];
  this._mapCollide = !$dataSkills[this._skillId].meta['map_through'];
};

// 存在状態判定
Game_Bullet.prototype.isExist = function() {
  return this._characterName !== '';
};

// 敵機の弾判定
Game_Bullet.prototype.isEnemy = function() {
  return this._enemyFlag;
};

// 弾タイプの取得
Game_Bullet.prototype.type = function() {
  return this._type;
};

// 角度の取得
Game_Bullet.prototype.angle = function() {
  return this._angle;
};

// 画面 X 座標の取得
Game_Bullet.prototype.screenX = function() {
  var tw = $gameMap.tileWidth();
  return Math.round($gameMap.adjustX(this._x) * tw);
};

// 画面 Y 座標の取得
Game_Bullet.prototype.screenY = function() {
  var th = $gameMap.tileHeight();
  return Math.round($gameMap.adjustY(this._y) * th);
};

// キャラクターがいる方向（角度）を取得
Game_Bullet.prototype.angleToCharacter = function(character) {
  return Math.atan2(character._realY - character.collideH / 2 - this._y, character._realX - this._x);
};

// プレイヤーがいる方向（角度）を取得
Game_Bullet.prototype.angleToPlayer = function() {
  return this.angleToCharacter($gamePlayer);
};

// フレーム更新
Game_Bullet.prototype.update = function() {
  this._x += this._vx;
  this._y += this._vy;
  this._count--;
  if (this._count <= 0 || this.updateCollide()) {
    this.erase();
  }
  return this.isExist();
};

// 削除
Game_Bullet.prototype.erase = function() {
  this._characterName = '';
  this._opacity = 0;
};

// 接触判定
Game_Bullet.prototype.updateCollide = function() {
  if (this._mapCollide && this.collideMap()) {
    return true;
  } else {
    if (this._enemyFlag) {
      if (this.collideCharacter($gamePlayer)) {
        this.executeDamage($gamePlayer);
        return true;
      }
    } else {
      var targets = $gameMap.events();
      for (i = 0; i < targets.length; i++) {
        var character = targets[i];
        if (this.collideCharacter(character)) {
          this.executeDamage(character);
          return true;
        }
      }
    }
  }
  return false;
};

// 弾によるダメージ処理
Game_Bullet.prototype.executeDamage = function(character) {
  if (character.isBattler() && this._owner.isBattler() && !character.isInvincible()) {
    character.applySkill(this._owner, this._skillId);
    if (character.battler()._result.isHit()) {
      character.setupInvincible();
    }
  }
};

// キャラクターと接触しているかどうかを返す
Game_Bullet.prototype.collideCharacter = function(character) {
  if (character._through) {
    return false;
  }
  if (this._x - this._collideSize <= character._realX + character._collideW) {
    if (this._x + this._collideSize >= character._realX - character._collideW) {
      if (this._y - this._collideSize <= character._realY) {
        if (this._y + this._collideSize >= character._realY - character._collideH) {
          return true;
        }
      }
    }
  }
  return false;
};

// マップと接触しているかどうかを返す
Game_Bullet.prototype.collideMap = function() {
  var x = Math.floor(this._x);
  var y = Math.floor(this._y);
  return !$gameMap.checkPassageBullet(x, y);
}

//-----------------------------------------------------------------------------
// Game_CharacterBase
//

// メンバ変数の初期化
Tomoaky.JAST.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
  Tomoaky.JAST.Game_CharacterBase_initMembers.call(this);
  this._invincibleCount = 0;
  this._invincibleTime = 10;
};

// 被弾後の無敵状態判定
Game_CharacterBase.prototype.isInvincible = function() {
  return this._invincibleCount > 0;
};

// 無敵状態のセット
Game_CharacterBase.prototype.setupInvincible = function() {
  this._invincibleCount = this._invincibleTime;
  this.battler().requestEffect('blink');
};

// フレーム更新
Tomoaky.JAST.Game_CharacterBase_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
  Tomoaky.JAST.Game_CharacterBase_update.call(this);
  if (this.isInvincible()) {
    this._invincibleCount--;
  }
};

//-----------------------------------------------------------------------------
// Game_Character
//

// キャラクターのいる方向（角度）を取得
Game_Character.prototype.angleToCharacter = function(character) {
  return Math.atan2(character._realY - character._collideH / 2 - (this._realY - this._collideH / 2), character._realX - this._realX);
};

// プレイヤーのいる方向（角度）を取得
Game_Character.prototype.angleToPlayer = function() {
  return this.angleToCharacter($gamePlayer);
};

// ｎ方向ショット
Game_Character.prototype.nwayShot = function(n, space, angle, speed, count, type, index, skillId) {
  angle = angle - (space * (n - 1) / 2);
  for (var i = 0; i < n; i++) {
    $gameMap.addBullet(this._realX, this._realY - this._collideH / 2, 200 + i,
      Math.cos(angle) * speed, Math.sin(angle) * speed, angle, count, type, index,
      this.eventId(), this.battler().isEnemy(), skillId, this);
    angle += space;
  }
};

// 自機狙いｎ方向ショット
Game_Character.prototype.nwayAim = function(n, space, angle, speed, count, type, index, skillId) {
  var a = angle + this.angleToPlayer();
  this.nwayShot(n, space, a, speed, count, type, index, skillId);
};

// 全方位ショット
Game_Character.prototype.nallShot = function(n, angle, speed, count, type, index, skillId) {
  var space = Math.PI * 2 / n;
  for (var i = 0; i < n; i++) {
    $gameMap.addBullet(this._realX, this._realY - this._collideH / 2, 200 + i,
      Math.cos(angle) * speed, Math.sin(angle) * speed, angle, count, type, index,
      this.eventId(), this.battler().isEnemy(), skillId, this);
    angle += space;
  }
};

// 自機狙い全方位ショット
Game_Character.prototype.nallAim = function(n, angle, speed, count, type, index, skillId) {
  var a = angle + this.angleToPlayer()
  this.nallShot(n, a, speed, count, type, index, skillId);
};

//-----------------------------------------------------------------------------
// Game_Player
//

// メンバ変数の初期化
Tomoaky.JAST.Game_Player_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
  Tomoaky.JAST.Game_Player_initMembers.call(this);
  this._shotWay = 0;
  this._shotSpace = 0.2;
  this._shotSpeed = 0.1;
  this._shotCountTime = 30;
  this._shotDelayTime = 10;
  this._shotType = 1;
  this._shotIndex = 0;
  this._shotSkillId = 0;
  this._shotSeName = "";
  this._shotSeVolume = 0;
  this._shotSePitch = 0;
};

// 入力の処理
Tomoaky.JAST.Game_Player_updateInput = Game_Player.prototype.updateInput;
Game_Player.prototype.updateInput = function() {
  this.attackByInput();
  Tomoaky.JAST.Game_Player_updateInput.call(this);
};

// ボタン入力による攻撃
Game_Player.prototype.attackByInput = function() {
  if (this._shotDelay > 0) {
    this._shotDelay--;
  } else {
    var n = this._shotWay;
    if (Input.isTriggered('attack') && n > 0) {
      var space = this._shotSpace;
      var speed = this._shotSpeed;
      var count = this._shotCountTime;
      var type = this._shotType;
      var index = this._shotIndex;
      if (this._shotSkillId > 0) {
        var skillId = this._shotSkillId;
      } else {
        var skillId = this.battler().attackSkillId();
      }
      if (this._ladder) {
        if (Input.isPressed('left')) {
          this.setDirection(4);
        } else if (Input.isPressed('right')) {
          this.setDirection(6);
        }
      }
      var pan = 0;
      if (this._direction == 4) {
        this.nwayShot(n, space, Math.PI, speed, count, type, index, skillId)
        pan = -10;
      } else if (this._direction == 6){
        this.nwayShot(n, space, 0, speed, count, type, index, skillId)
        pan = 10;
      } else {
        this.nwayShot(n, space, Math.PI * 1.5, speed, count, type, index, skillId)
      }
      this._shotDelay = this._shotDelayTime;
      if (Tomoaky.Param.JASTWeaponSprite) {
        this.battler().performAttack();
      }
      var se = {};
      se.name = this._shotSeName;
      se.pitch = this._shotSePitch;
      se.volume = this._shotSeVolume;
      se.pan = pan;
      AudioManager.playSe(se);
    }
  }
};

// リフレッシュ
Tomoaky.JAST.Game_Player_refresh = Game_Player.prototype.refresh;
Game_Player.prototype.refresh = function() {
  Tomoaky.JAST.Game_Player_refresh.call(this);
  var actor = this.actor();
  if (actor) {
    this._invincibleTime = actor.loadTagParam('invincible_time', 30);
    this._shotWay = actor.loadTagParam('shot_way', 0);
    this._shotSpace = actor.loadTagParam('shot_space', 0.2);
    this._shotSpeed = actor.loadTagParam('shot_speed', 0.1);
    this._shotCountTime = actor.loadTagParam('shot_count', 30);
    this._shotDelayTime = actor.loadTagParam('shot_delay', 10);
    this._shotType = Number(actor.loadTagString('shot_type', "1"));
    this._shotIndex = Number(actor.loadTagString('shot_index', "0"));
    this._shotSkillId = Number(actor.loadTagString('shot_skill', "0"));
    this._shotSeName = actor.loadTagString('shot_se_name', "");
    this._shotSeVolume = Number(actor.loadTagString('shot_se_volume', "90"));
    this._shotSePitch = Number(actor.loadTagString('shot_se_pitch', "100"));
  }
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//

// プラグインコマンド
Tomoaky.JAST.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Tomoaky.JAST.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'JumpAction') {
    switch (args[0]) {
    case 'nway_shot':
      var character = this.character(args[1]);
      if (character && character.isBattler()) {
        if (!args[9]) {
          args[9] = character.battler().attackSkillId();
        }
        character.nwayShot(Number(args[2]), Number(args[3]), Number(args[4]), Number(args[5]),
          Number(args[6]), Number(args[7]), Number(args[8]), Number(args[9]));
      }
      break;
    case 'nway_aim':
      var character = this.character(args[1]);
      if (character && character.isBattler()) {
        if (!args[9]) {
          args[9] = character.battler().attackSkillId();
        }
        character.nwayAim(Number(args[2]), Number(args[3]), Number(args[4]), Number(args[5]),
          Number(args[6]), Number(args[7]), Number(args[8]), Number(args[9]));
      }
      break;
    case 'nall_shot':
      var character = this.character(args[1]);
      if (character && character.isBattler()) {
        if (!args[8]) {
          args[8] = character.battler().attackSkillId();
        }
        character.nallShot(Number(args[2]), Number(args[3]), Number(args[4]), Number(args[5]),
          Number(args[6]), Number(args[7]), Number(args[8]));
      }
      break;
    case 'nall_aim':
      var character = this.character(args[1]);
      if (character && character.isBattler()) {
        if (!args[8]) {
          args[8] = character.battler().attackSkillId();
        }
        character.nallAim(Number(args[2]), Number(args[3]), Number(args[4]), Number(args[5]),
          Number(args[6]), Number(args[7]), Number(args[8]));
      }
      break;
    }
  }
};

//-----------------------------------------------------------------------------
// Sprite_Character
//

// メンバ変数の初期化
Tomoaky.JAST.Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
Sprite_Character.prototype.initMembers = function() {
  Tomoaky.JAST.Sprite_Character_initMembers.call(this);
  this.createWeaponSprite();
};

// 武器スプライトの作成
Sprite_Character.prototype.createWeaponSprite = function() {
  this._weaponSprite = new Sprite_Weapon();
  this.addChild(this._weaponSprite);
};

// 武器アニメーションのセットアップ
Sprite_Character.prototype.setupWeaponAnimation = function() {
  if (this._character.battler().isWeaponAnimationRequested()) {
    this._weaponSprite.setup(this._character.battler().weaponImageId());
    this._character.battler().clearWeaponAnimation();
  }
};

// フレーム更新
Tomoaky.JAST.Sprite_Character_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
  Tomoaky.JAST.Sprite_Character_update.call(this);
  if (this._character.isBattler()) {
    this.updateMotion();
  }
};

// モーションの更新
Sprite_Character.prototype.updateMotion = function() {
  this.setupWeaponAnimation();
  if (this._weaponSprite.isPlaying()) {
    if (this._character._direction == 4) {
      this._weaponSprite.scale.x = 1;
      this._weaponSprite.x = -16;
    } else {
      this._weaponSprite.scale.x = -1;
      this._weaponSprite.x = 16;
    }
  }
};


//-----------------------------------------------------------------------------
// Sprite_Bullet
//

function Sprite_Bullet() {
  this.initialize.apply(this, arguments);
}

Sprite_Bullet.prototype = Object.create(Sprite.prototype);
Sprite_Bullet.prototype.constructor = Sprite_Bullet;

// 初期化
Sprite_Bullet.prototype.initialize = function(bullet) {
  Sprite.prototype.initialize.call(this);
  this.anchor.x = 0.5;
  this.anchor.y = 0.5;
  this._bullet = bullet;
  this._characterName = '';
  this._characterIndex = 0;
};

// フレーム更新
Sprite_Bullet.prototype.update = function() {
  Sprite.prototype.update.call(this);
  this.opacity = this._bullet._opacity;
  if (this.opacity > 0) {
    this.updateBitmap();
    this.x = this._bullet.screenX();
    this.y = this._bullet.screenY();
    this.z = this._bullet._z;
    this.rotation = this._bullet.angle();
  }
};

// 転送元ビットマップの更新
Sprite_Bullet.prototype.updateBitmap = function() {
  if (this.isImageChanged()) {
    this._characterName = this._bullet._characterName;
    this._characterIndex = this._bullet._characterIndex;
    this.setCharacterBitmap();
  }
};

// グラフィックの変更判定
Sprite_Bullet.prototype.isImageChanged = function() {
  if (this._characterName !== this._bullet.characterName) {
    return true;
  }
  if (this._characterIndex !== this._bullet.characterIndex) {
    return true;
  }
  return false;
};

// ビットマップの設定
Sprite_Bullet.prototype.setCharacterBitmap = function() {
  this.bitmap = ImageManager.loadSystem(this._characterName);
  var pw = Math.floor(this.bitmap.width / 8);
  var sx = this._characterIndex * pw;
  this.setFrame(sx, 0, pw, this.bitmap.height);
  this.blendMode = this._characterName.charAt(0) === '!' ? 1 : 0;
};

//-----------------------------------------------------------------------------
// Spriteset_Map
//

Tomoaky.JAST.Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
  Tomoaky.JAST.Spriteset_Map_createLowerLayer.call(this);
  this.createBullets();
};

// 弾スプライトの作成
Spriteset_Map.prototype.createBullets = function() {
  this._bulletSprites = [];
  $gameMap.playerBullets().forEach(function(bullet) {
    this._bulletSprites.push(new Sprite_Bullet(bullet));
    this._baseSprite.addChild(this._bulletSprites[this._bulletSprites.length - 1]);
  }, this);
  $gameMap.enemyBullets().forEach(function(bullet) {
    this._bulletSprites.push(new Sprite_Bullet(bullet));
    this._baseSprite.addChild(this._bulletSprites[this._bulletSprites.length - 1]);
  }, this);
};

