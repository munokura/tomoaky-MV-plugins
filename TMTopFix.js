//=============================================================================
// TMPlugin - 先頭並び替え不可
// バージョン: 1.0.1
// 最終更新日: 2017/02/17
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2015 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc パーティの先頭にいるアクターの並び替えを禁止します。
 * 
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @help
 * TMPlugin - 先頭並び替え不可 ver1.0.1
 * 
 * 使い方:
 * 
 *   ゲーム開始時は先頭アクターの並び替えが禁止の状態になります。
 *   必要に応じてプラグインコマンドで解除してください。
 * 
 *   このプラグインは RPGツクールMV Version 1.3.5 で動作確認をしています。
 *
 * プラグインコマンド:
 * 
 *   stopTopFix
 *     先頭並び替え禁止を解除します。
 * 
 *   startTopFix
 *     先頭並び替えを禁止します。
 */

var Imported = Imported || {};
Imported.TMTopFix = true;

(function() {

  //-----------------------------------------------------------------------------
  // Game_System
  //

  Game_System.prototype.setTopFix = function(topFix) {
    this._topFix = topFix;
  };

  Game_System.prototype.isTopFix = function() {
    if (this._topFix == null) this._topFix = true;
    return this._topFix;
  };
  
  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'stopTopFix') {
      $gameSystem.setTopFix(false);
    } else if (command === 'startTopFix') {
      $gameSystem.setTopFix(true);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_MenuStatus
  //

  var _Window_MenuStatus_isCurrentItemEnabled = Window_MenuStatus.prototype.isCurrentItemEnabled;
  Window_MenuStatus.prototype.isCurrentItemEnabled = function() {
    if ($gameSystem.isTopFix() && this._formationMode && this.index() === 0) {
      return false;
    }
    return _Window_MenuStatus_isCurrentItemEnabled.call(this);
  };

})();
