//=============================================================================
// TMPlugin - エクストラショット（TMShooting.js拡張）
// バージョン: 1.2.0
// 最終更新日: 2017/10/23
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc TMShooting.jsにもうひとつのショットを追加します。
 * このショットはアクターのパラメータに影響されません。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param shotExKey
 * @type string
 * @desc エクストラショットの発射に使用するキー
 * 初期値: S
 * @default S
 *
 * @param shotExNum
 * @type number
 * @desc エクストラショットの弾数。
 * 初期値: 1
 * @default 1
 *
 * @param shotExSpace
 * @type string
 * @desc エクストラショットの弾間隔。
 * 初期値: 0.4
 * @default 0.4
 *
 * @param shotExSpeed
 * @type string
 * @desc エクストラショットの速度。
 * 初期値: 0.1
 * @default 0.1
 *
 * @param shotExCount
 * @type number
 * @desc エクストラショットの寿命。
 * 初期値: 60
 * @default 60
 *
 * @param shotExType
 * @type number
 * @desc エクストラショットのタイプ。
 * 初期値: 1
 * @default 1
 *
 * @param shotExIndex
 * @type number
 * @desc エクストラショットのインデックス。
 * 初期値: 0
 * @default 0
 *
 * @param shotExSkillId
 * @type number
 * @desc エクストラショットのスキル番号。
 * 初期値: 1
 * @default 1
 *
 * @param shotExInterval
 * @type number
 * @desc エクストラショットの発射間隔。
 * 初期値: 20
 * @default 20
 *
 * @param leaderShotExSe
 * @desc エクストラショット発射効果音のファイル名。
 * 初期値: Shot1
 * @default Shot1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param leaderShotExSeParam
 * @type string
 * @desc エクストラショット発射効果音のパラメータ。
 * 初期値: {"volume":70, "pitch":150, "pan":0}
 * @default {"volume":70, "pitch":150, "pan":0}
 * 
 * @help
 * TMPlugin - エクストラショット（TMShooting.js拡張） ver1.2.0
 *
 * 使い方:
 * 
 *   このプラグインは TMShooting.js の拡張プラグインです、単体では
 *   正しく動作しません。
 *   また、エディタのプラグイン管理において、TMShooting.js よりも
 *   下にこのプラグインを導入してください。
 * 
 *   正しく導入できていれば S キーでエクストラショットが発射されます。
 *   ゲームパッドに対応させたい場合は TMShooting.js 側のプラグイン
 *   パラメータを以下のように編集してください。
 *     padButtons
 *       好きな位置に shotEx を追加してください。
 *     padButtonNames
 *       padButtons に shotEx を追加したのと同じ位置へボタン名を
 *       追加してください。
 *     defaultPadButtons
 *       どれかひとつ、または複数を shotEx に書き換えてください。
 *       （追加ではありません）
 *
 *   プラグインコマンドはありません。
 *
 *   このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。
 *   TMShooting.js は最新のバージョンを導入してください。
 * 
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 * 
 * 
 * ゲーム中にエクストラショットのパラメータを変更する方法:
 * 
 *   エクストラショットのパラメータは $gamePlayer に格納されています。
 *   $gamePlayer._shotExNum        # 弾数
 *   $gamePlayer._shotExSpace      # 弾間隔
 *   $gamePlayer._shotExSpeed      # 速度
 *   $gamePlayer._shotExCount      # 寿命
 *   $gamePlayer._shotExType       # タイプ
 *   $gamePlayer._shotExIndex      # インデックス
 *   $gamePlayer._shotExInterval   # 発射間隔
 * 
 *   イベントコマンド『スクリプト』で
 *   $gamePlayer.shotExNum = 5;
 *   のように各種パラメータの値を変更することができます。
 */

var Imported = Imported || {};
Imported.TMExtraShot = true;

var TMPlugin = TMPlugin || {};
TMPlugin.ExtraShot = {};
TMPlugin.ExtraShot.Parameters = PluginManager.parameters('TMExtraShot');
TMPlugin.Shooting.ShotExNum = +(TMPlugin.ExtraShot.Parameters['shotExNum'] || 1);
TMPlugin.Shooting.ShotExSpace = +(TMPlugin.ExtraShot.Parameters['shotExSpace'] || 0.4);
TMPlugin.Shooting.ShotExSpeed = +(TMPlugin.ExtraShot.Parameters['shotExSpeed'] || 0.1);
TMPlugin.Shooting.ShotExCount = +(TMPlugin.ExtraShot.Parameters['shotExCount'] || 60);
TMPlugin.Shooting.ShotExType = +(TMPlugin.ExtraShot.Parameters['shotExType'] || 1);
TMPlugin.Shooting.ShotExIndex = +(TMPlugin.ExtraShot.Parameters['shotExIndex'] || 0);
TMPlugin.Shooting.ShotExSkillId = +(TMPlugin.ExtraShot.Parameters['shotExSkillId'] || 1);
TMPlugin.Shooting.ShotExInterval = +(TMPlugin.ExtraShot.Parameters['shotExInterval'] || 20);
TMPlugin.Shooting.LeaderShotExSe = JSON.parse(TMPlugin.ExtraShot.Parameters['leaderShotExSeParam'] || '{}');
TMPlugin.Shooting.LeaderShotExSe.name = TMPlugin.ExtraShot.Parameters['leaderShotExSe'] || '';

(function() {

  //-----------------------------------------------------------------------------
  // Input
  //

  if (TMPlugin.ExtraShot.Parameters['shotExKey']) {
    Input.keyMapper[TMPlugin.ExtraShot.Parameters['shotExKey'].charCodeAt()] = 'shotEx';
  }

  //-----------------------------------------------------------------------------
  // Game_Player
  //

  Game_Player.prototype.shotExNum = function() {
    if (this._shotExNum == null) this._shotExNum = TMPlugin.Shooting.ShotExNum;
    return this._shotExNum;
  };

  Game_Player.prototype.shotExSpace = function() {
    if (this._shotExSpace == null) this._shotExSpace = TMPlugin.Shooting.ShotExSpace;
    return this._shotExSpace;
  };

  Game_Player.prototype.shotExSpeed = function() {
    if (this._shotExSpeed == null) this._shotExSpeed = TMPlugin.Shooting.ShotExSpeed;
    return this._shotExSpeed;
  };

  Game_Player.prototype.shotExCount = function() {
    if (this._shotExCount == null) this._shotExCount = TMPlugin.Shooting.ShotExCount;
    return this._shotExCount;
  };

  Game_Player.prototype.shotExType = function() {
    if (this._shotExType == null) this._shotExType = TMPlugin.Shooting.ShotExType;
    return this._shotExType;
  };

  Game_Player.prototype.shotExIndex = function() {
    if (this._shotExIndex == null) this._shotExIndex = TMPlugin.Shooting.ShotExIndex;
    return this._shotExIndex;
  };

  Game_Player.prototype.shotExSkillId = function() {
    if (this._shotExSkillId == null) this._shotExSkillId = TMPlugin.Shooting.ShotExSkillId;
    return this._shotExSkillId;
  };

  Game_Player.prototype.shotExInterval = function() {
    if (this._shotExInterval == null) this._shotExInterval = TMPlugin.Shooting.ShotExInterval;
    return this._shotExInterval;
  };

  Game_Player.prototype.executeShotEx = function() {
    var battler = this.battler();
    if (battler && battler.canMove() && this.shotExNum() > 0) {
      var angle = this._shotAngle == null ? this.shotAngleFromDirection() : this._shotAngle;
      this._shotDelay = this.shotExInterval();
      return this.nwayShot(this.shotExNum(), this.shotExSpace(), angle, this.shotExSpeed(),
                           this.shotExCount(), this.shotExType(), this.shotExIndex(),
                           this.shotExSkillId());
    }
    return false;
  };

  var _Game_Player_shotByInput = Game_Player.prototype.shotByInput;
  Game_Player.prototype.shotByInput = function() {
    _Game_Player_shotByInput.call(this);
    if (this._shotDelay <= 0 && Input.isPressed('shotEx')) {
      if (this.executeShotEx()) {
        if (TMPlugin.Shooting.LeaderShotExSe) {
          AudioManager.playSe(TMPlugin.Shooting.LeaderShotExSe);
        }
      }
    }
  };

})();
