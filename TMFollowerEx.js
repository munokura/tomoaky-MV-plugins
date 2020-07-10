//=============================================================================
// TMVplugin - 隊列拡張
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.1
// 最終更新日: 2016/02/02
//=============================================================================

/*:
 * @plugindesc 隊列人数を増やしたり、パーティ外のアクターを隊列に
 * 加えたりすることができます。
 * 
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param additionalFollower
 * @desc 戦闘メンバー人数にこの値を加算したものが隊列人数になります。
 * 初期値: 4
 * @default 4
 *
 * @param headerFollower
 * @desc 隊列の先頭にパーティ外のアクターを挿入します。
 * 初期値: 0 (アクター番号を入れると有効になります)
 * @default 0
 
 * @param footerFollower
 * @desc 隊列の最後尾にパーティ外のアクターを挿入します。
 * 初期値: 0 (アクター番号を入れると有効になります)
 * @default 0
 *
 * @help
 * additionalFollower で指定した人数まで、戦闘に参加しない
 * パーティメンバーを隊列に追加します。
 *
 * headerFollower に 1 以上の値を設定すると、隊列の先頭に
 * 対応する番号のアクターが挿入されます。
 * 隊列人数をオーバーする場合、最後尾のアクターが押し出されます。
 *
 * footerFollower に 1 以上の値を設定すると、隊列の最後尾に
 * 対応する番号のアクターが挿入されます。
 * 隊列人数をオーバーする場合、元々最後尾にいたアクターと入れ替わります。
 *
 * headerFollower と footerFollower のパラメータは初期値として扱われます、
 * ゲーム中にプラグインコマンドを使って別のアクターに入れ替えたり、
 * 挿入を解除することができます。
 *
 * プラグインコマンド:
 *   headerFollower 9     # アクター９番を隊列の先頭に挿入します、
 *                          パーティに加入している必要はありません。
 *                          0 を指定することで挿入を解除できます。
 *
 *   footerFollower 10    # アクター１０番を隊列の最後尾に挿入します、
 *                          パーティに加入している必要はありません。
 *                          0 を指定することで挿入を解除できます。
 *
 *   collideFollower 1    # プレイヤーと隊列メンバーの衝突判定をオンにします。
 *                          0 を指定することで解除できます。
 *
 *   touchFollower 1      # イベントのトリガーが『イベントから接触』の場合に
 *                          隊列メンバーとの接触でも起動するようにします。
 *                          0 を指定することで解除できます。
 *
 * 注意事項:
 *   collideFollower コマンドで隊列メンバーとの衝突をオンにすると
 *   袋小路などでゲーム進行が不可能になる場合があります。
 *
 */

var Imported = Imported || {};
Imported.TMTopFix = true;

(function() {

  var parameters = PluginManager.parameters('TMFollowerEx');
  var additionalFollower = Number(parameters['additionalFollower']);
  var headerFollower = Number(parameters['headerFollower']);
  var footerFollower = Number(parameters['footerFollower']);

  //-----------------------------------------------------------------------------
  // Game_System
  //

  Game_System.prototype.isCollideFollowerEnabled = function() {
    if (this._collideFollowerEnabled === undefined) {
      this._collideFollowerEnabled = false;
    }
    return this._collideFollowerEnabled;
  };

  Game_System.prototype.setCollideFollowerEnabled = function(flag) {
    this._collideFollowerEnabled = flag === '1' ? true : false;
  };
  
  Game_System.prototype.isTouchFollowerEnabled = function() {
    if (this._touchFollowerEnabled === undefined) {
      this._touchFollowerEnabled = false;
    }
    return this._touchFollowerEnabled;
  };

  Game_System.prototype.setTouchFollowerEnabled = function(flag) {
    this._touchFollowerEnabled = flag === '1' ? true : false;
  };
  
  //-----------------------------------------------------------------------------
  // Game_Party
  //

  var _Game_Party_leader = Game_Party.prototype.leader;
  Game_Party.prototype.leader = function() {
    if ($gamePlayer.headerFollower() >= 1) {
      return $gameActors.actor($gamePlayer.headerFollower());
    } else {
      return _Game_Party_leader.call(this);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Player
  //

  var _Game_Player_initMembers = Game_Player.prototype.initMembers;
  Game_Player.prototype.initMembers = function() {
    _Game_Player_initMembers.call(this);
    this._headerFollower = headerFollower;
    this._footerFollower = footerFollower;
  };
  
  Game_Player.prototype.headerFollower = function() {
    return this._headerFollower;
  };
  
  Game_Player.prototype.setHeaderFollower = function(actorId) {
    this._headerFollower = actorId;
    this.refresh();
  };

  Game_Player.prototype.footerFollower = function() {
    return this._footerFollower;
  };
  
  Game_Player.prototype.setFooterFollower = function(actorId) {
    this._footerFollower = actorId;
    this.refresh();
  };

  var _Game_Player_isCollidedWithCharacters =
      Game_Player.prototype.isCollidedWithCharacters;
  Game_Player.prototype.isCollidedWithCharacters = function(x, y) {
    var result = _Game_Player_isCollidedWithCharacters.call(this, x, y);
    if (!result) {
      result = this.isCollidedWithFollowers(x, y);
    }
    return result;
  };
  
  Game_Player.prototype.isCollidedWithFollowers = function(x, y) {
    if ($gameSystem.isCollideFollowerEnabled()) {
      return this._followers.isSomeoneCollided(x, y)
    }
    return false;
  };

  //-----------------------------------------------------------------------------
  // Game_Follower
  //

  Game_Follower.prototype.actor = function() {
    if ($gamePlayer.footerFollower() >= 1) {
      var index = $gameParty.size();
      if ($gamePlayer.headerFollower() >= 1) {
        index++;
      }
      index = Math.min(index, $gameParty.maxBattleMembers() + additionalFollower - 1);
      if (this._memberIndex === index) {
        return $gameActors.actor($gamePlayer.footerFollower());
      }
    }
    if ($gamePlayer.headerFollower() >= 1) {
      return $gameParty.members()[this._memberIndex - 1];
    } else {
      return $gameParty.members()[this._memberIndex];
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Followers
  //

  var _Game_Followers_initialize = Game_Followers.prototype.initialize;
  Game_Followers.prototype.initialize = function() {
    _Game_Followers_initialize.call(this);
    for (var i = 0; i < additionalFollower; i++) {
      this._data.push(new Game_Follower($gameParty.maxBattleMembers() + i));
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //

  var _Game_Event_checkEventTriggerTouch = Game_Event.prototype.checkEventTriggerTouch;
  Game_Event.prototype.checkEventTriggerTouch = function(x, y) {
    if ($gameSystem.isTouchFollowerEnabled() && !$gameMap.isEventRunning()) {
      if (this._trigger === 2 && $gamePlayer.followers().isSomeoneCollided(x, y)) {
        if (!this.isJumping() && this.isNormalPriority()) {
          var lastDirectionFix = this._directionFix;
          this._directionFix = true;
          this.start();
          this._directionFix = false;
        }
      }
    }
    _Game_Event_checkEventTriggerTouch.call(this, x, y);
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    if (command === 'headerFollower') {
      $gamePlayer.setHeaderFollower(Number(args[0]));
    } else if (command === 'footerFollower') {
      $gamePlayer.setFooterFollower(Number(args[0]));
    } else if (command === 'collideFollower') {
      $gameSystem.setCollideFollowerEnabled(args[0]);
    } else if (command === 'touchFollower') {
      $gameSystem.setTouchFollowerEnabled(args[0]);
    } else {
      _Game_Interpreter_pluginCommand.call(this, command, args);
    }
  };
  
})();
