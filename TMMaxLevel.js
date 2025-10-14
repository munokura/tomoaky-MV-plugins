//=============================================================================
// TMVplugin - レベル上限操作
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2015/12/29
//=============================================================================
/*:
@plugindesc v1.0.1 You can increase the level cap during the game.
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
Plugin Commands:
gainMaxLevel 1 5
# Increase Actor 1's level cap by 5
getMaxLevel 2 10
# Assign Actor 2's level cap to variable 10
getMaxLevelPlus 2 3
# Assign Actor 2's level cap (additional value) to variable 3

v1.0.1 Plugin parameters adjusted and help text typos fixed by Munokura

@param maxMaxLevel
@text Level Cap
@desc Maximum level including additional value Initial value: 99
@default 99
@type number
@min 1
@max 99
*/


/*:ja
@plugindesc v1.0.1 レベル上限をゲーム中に増やすことができます。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT

@help
プラグインコマンド:
gainMaxLevel 1 5
     # アクター１番のレベル上限を５増やす
getMaxLevel 2 10
     # アクター２番のレベル上限を変数１０番に代入
getMaxLevelPlus 2 3
     # アクター２番のレベル上限(加算値)を変数３番に代入

v1.0.1 プラグインパラメーターの調整と、ヘルプの誤字を修正 by ムノクラ

@param maxMaxLevel
@text レベル上限
@desc 加算値込みのレベル上限 初期値: 99
@default 99
@type number
@min 1
@max 99
*/

var Imported = Imported || {};
Imported.TMMaxLevel = true;

(function () {

  var parameters = PluginManager.parameters('TMMaxLevel');
  var maxMaxLevel = parameters['maxMaxLevel'];

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'gainMaxLevel') {
      var actor = $gameActors.actor(args[0]);
      if (actor) {
        actor.gainMaxLevel(Number(args[1]));
      }
    } else
      if (command === 'getMaxLevel') {
        var actor = $gameActors.actor(args[0]);
        if (actor) {
          $gameVariables.setValue(args[1], actor.maxLevel())
        }
      }
    if (command === 'getMaxLevelPlus') {
      var actor = $gameActors.actor(args[0]);
      if (actor) {
        if (actor._maxLevelPlus === undefined) {
          actor.gainMaxLevel(0);
        }
        $gameVariables.setValue(args[1], actor._maxLevelPlus)
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Actor
  //

  var _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
  Game_Actor.prototype.initMembers = function () {
    _Game_Actor_initMembers.call(this);
    this._maxLevelPlus = 0;
  };

  var _Game_Actor_maxLevel = Game_Actor.prototype.maxLevel;
  Game_Actor.prototype.maxLevel = function () {
    if (this._maxLevelPlus === undefined) {
      this._maxLevelPlus = 0;
    }
    return _Game_Actor_maxLevel.call(this) + this._maxLevelPlus;
  };

  Game_Actor.prototype.gainMaxLevel = function (n) {
    if (this._maxLevelPlus === undefined) {
      this._maxLevelPlus = 0;
    }
    this._maxLevelPlus += n;
    var m = maxMaxLevel - this.actor().maxLevel;
    this._maxLevelPlus = this._maxLevelPlus.clamp(0, m);
  };

})();