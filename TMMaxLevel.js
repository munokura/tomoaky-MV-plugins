//=============================================================================
// TMVplugin - レベル上限操作
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2015/12/29
//=============================================================================

/*:
 * @plugindesc レベル上限をゲーム中に増やすことができます。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param maxMaxLevel
 * @desc 加算値込みのレベル上限
 * 初期値: 99
 * @default 99
 *
 * @help
 * プラグインコマンド:
 *   gainMaxLevel 1 5     # アクター１番のレベル上限を５増やす
 *   getMaxLevel 2 10     # アクター２番のレベル上限を変数１０番に代入
 *   getMaxLevel 2 3      # アクター２番のレベル上限(加算値)を変数３番に代入
 * 
 */

var Imported = Imported || {};
Imported.TMMaxLevel = true;

(function() {

  var parameters = PluginManager.parameters('TMMaxLevel');
  var maxMaxLevel = parameters['maxMaxLevel'];
  
  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
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
  Game_Actor.prototype.initMembers = function() {
    _Game_Actor_initMembers.call(this);
    this._maxLevelPlus = 0;
  };

  var _Game_Actor_maxLevel = Game_Actor.prototype.maxLevel;
  Game_Actor.prototype.maxLevel = function() {
    if (this._maxLevelPlus === undefined) {
      this._maxLevelPlus = 0;
    }
    return _Game_Actor_maxLevel.call(this) + this._maxLevelPlus;
  };
  
  Game_Actor.prototype.gainMaxLevel = function(n) {
    if (this._maxLevelPlus === undefined) {
      this._maxLevelPlus = 0;
    }
    this._maxLevelPlus += n;
    var m = maxMaxLevel - this.actor().maxLevel;
    this._maxLevelPlus = this._maxLevelPlus.clamp(0, m);
  };

})();
