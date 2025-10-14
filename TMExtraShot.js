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
@plugindesc Add another shot to TMShooting.js.
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/tomoaky-MV-plugins ).
Original plugin by tomoaky.
-----
TMPlugin - Extra Shot (TMShooting.js Extension) ver1.2.0

How to Use:

This plugin is an extension for TMShooting.js and will not function properly on its own.

Also, please install this plugin below TMShooting.js in the editor's plugin manager.

If installed correctly, pressing the S key will fire the extra shot.

To enable gamepad support, edit the plugin parameters in TMShooting.js as follows:

padButtons
Add shotEx to the desired position.

padButtonNames
Add button names to padButtons in the same position as adding shotEx.

defaultPadButtons
Rewrite one or more to shotEx (not add).

There are no plugin commands.

This plugin has been tested with RPG Maker MV Version 1.5.1.

Please install the latest version of TMShooting.js.

This plugin is distributed under the MIT License and is free for commercial use, modifications, and redistribution.

How to change extra shot parameters during the game:

Extra shot parameters are stored in $gamePlayer.
$gamePlayer._shotExNum # Number of shots
$gamePlayer._shotExSpace # Space between shots
$gamePlayer._shotExSpeed # Speed
$gamePlayer._shotExCount # Lifespan
$gamePlayer._shotExType # Type
$gamePlayer._shotExIndex # Index
$gamePlayer._shotExInterval # Firing interval

You can change the values of various parameters using the "script" Event's Contents, e.g.,
$gamePlayer.shotExNum = 5;

@param shotExKey
@desc Key used to fire extra shot Default: S
@default S
@type string

@param shotExNum
@desc Number of extra shots. Default: 1
@default 1
@type number

@param shotExSpace
@desc Extra shot interval. Default: 0.4
@default 0.4
@type string

@param shotExSpeed
@desc Extra shot speed. Default: 0.1
@default 0.1
@type string

@param shotExCount
@desc Extra Shot Lifespan. Default: 60
@default 60
@type number

@param shotExType
@desc Extra shot type. Default: 1
@default 1
@type number

@param shotExIndex
@desc Extra shot index. Default: 0
@default 0
@type number

@param shotExSkillId
@desc Extra shot skill number. Default: 1
@default 1
@type number

@param shotExInterval
@desc Extra shot firing interval. Default: 20
@default 20
@type number

@param leaderShotExSe
@desc File name of the extra shot firing sound effect. Default: Shot1
@default Shot1
@type file
@require 1
@dir audio/se/

@param leaderShotExSeParam
@desc Extra shot firing sound effect parameters. Default: {"volume":70, "pitch":150, "pan":0}
@default {"volume":70, "pitch":150, "pan":0}
@type string
*/


/*:ja
@plugindesc TMShooting.jsにもうひとつのショットを追加します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - エクストラショット（TMShooting.js拡張） ver1.2.0

使い方:

  このプラグインは TMShooting.js の拡張プラグインです、単体では
  正しく動作しません。
  また、エディタのプラグイン管理において、TMShooting.js よりも
  下にこのプラグインを導入してください。

  正しく導入できていれば S キーでエクストラショットが発射されます。
  ゲームパッドに対応させたい場合は TMShooting.js 側のプラグイン
  パラメータを以下のように編集してください。
    padButtons
      好きな位置に shotEx を追加してください。
    padButtonNames
      padButtons に shotEx を追加したのと同じ位置へボタン名を
      追加してください。
    defaultPadButtons
      どれかひとつ、または複数を shotEx に書き換えてください。
      （追加ではありません）

  プラグインコマンドはありません。

  このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。
  TMShooting.js は最新のバージョンを導入してください。

  このプラグインはMITライセンスのもとに配布しています、商用利用、
  改造、再配布など、自由にお使いいただけます。


ゲーム中にエクストラショットのパラメータを変更する方法:

  エクストラショットのパラメータは $gamePlayer に格納されています。
  $gamePlayer._shotExNum        # 弾数
  $gamePlayer._shotExSpace      # 弾間隔
  $gamePlayer._shotExSpeed      # 速度
  $gamePlayer._shotExCount      # 寿命
  $gamePlayer._shotExType       # タイプ
  $gamePlayer._shotExIndex      # インデックス
  $gamePlayer._shotExInterval   # 発射間隔

  イベントコマンド『スクリプト』で
  $gamePlayer.shotExNum = 5;
  のように各種パラメータの値を変更することができます。

@param shotExKey
@desc エクストラショットの発射に使用するキー 初期値: S
@default S
@type string

@param shotExNum
@desc エクストラショットの弾数。 初期値: 1
@default 1
@type number

@param shotExSpace
@desc エクストラショットの弾間隔。 初期値: 0.4
@default 0.4
@type string

@param shotExSpeed
@desc エクストラショットの速度。 初期値: 0.1
@default 0.1
@type string

@param shotExCount
@desc エクストラショットの寿命。 初期値: 60
@default 60
@type number

@param shotExType
@desc エクストラショットのタイプ。 初期値: 1
@default 1
@type number

@param shotExIndex
@desc エクストラショットのインデックス。 初期値: 0
@default 0
@type number

@param shotExSkillId
@desc エクストラショットのスキル番号。 初期値: 1
@default 1
@type number

@param shotExInterval
@desc エクストラショットの発射間隔。 初期値: 20
@default 20
@type number

@param leaderShotExSe
@desc エクストラショット発射効果音のファイル名。 初期値: Shot1
@default Shot1
@type file
@require 1
@dir audio/se/

@param leaderShotExSeParam
@desc エクストラショット発射効果音のパラメータ。 初期値: {"volume":70, "pitch":150, "pan":0}
@default {"volume":70, "pitch":150, "pan":0}
@type string
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