//=============================================================================
// TMPlugin - さよならコマンド
// バージョン: 1.0.0
// 最終更新日: 2017/01/12
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc メニューコマンドに仲間と別れる機能を追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param byeCommand
 * @desc さよならコマンドのコマンド名。
 * 初期値: 別れる
 * @default 別れる
 *
 * @param byeSe
 * @desc さよならコマンド実行時に鳴らす効果音のファイル名
 * 初期値: Decision1
 * @default Decision1
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @param byeSeParam
 * @desc さよならコマンド効果音のパラメータ
 * 初期値: {"volume":90, "pitch":100, "pan":0}
 * @default {"volume":90, "pitch":100, "pan":0}
 * 
 * @help
 * TMPlugin - さよならコマンド ver1.0.0
 *
 * 使い方:
 *
 *   このプラグインを導入するとメニューコマンドに『別れる』が追加されます。
 *   パーティメンバーが 1 名以下の場合、コマンドを実行することはできません。
 *
 *   このプラグインは RPGツクールMV Version 1.3.4 で動作確認をしています。
 * 
 * 
 * プラグインコマンド:
 * 
 *   disableBye
 *     さよならコマンドをメニューコマンドから除外します。
 * 
 *   enableBye
 *     除外したさよならコマンドを元に戻します。
 * 
 * 
 * メモ欄タグ（アクター）:
 * 
 *   <disableBye>
 *     メモ欄にこのタグがついているアクターは別れることができません。
 */

var Imported = Imported || {};
Imported.TMByeCommand = true;

var TMPlugin = TMPlugin || {};
TMPlugin.ByeCommand = {};
TMPlugin.ByeCommand.Parameters = PluginManager.parameters('TMByeCommand');
TMPlugin.ByeCommand.ByeCommand = TMPlugin.ByeCommand.Parameters['byeCommand'] || '別れる';
TMPlugin.ByeCommand.ByeSe = JSON.parse(TMPlugin.ByeCommand.Parameters['byeSeParam'] || '{}');
TMPlugin.ByeCommand.ByeSe.name = TMPlugin.ByeCommand.Parameters['byeSe'] || '';
(function() {

  //-----------------------------------------------------------------------------
  // Game_System
  //

  Game_System.prototype.isByeEnabled = function() {
    if (this._byeEnabled == null) this._byeEnabled = true;
    return this._byeEnabled;
  };

  Game_System.prototype.disableBye = function() {
    this._byeEnabled = false;
  };

  Game_System.prototype.enableBye = function() {
    this._byeEnabled = true;
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'disableBye') {
      $gameSystem.disableBye();
    } else if (command === 'enableBye') {
      $gameSystem.enableBye();
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_MenuCommand
  //

  var _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
  Window_MenuCommand.prototype.addOriginalCommands = function() {
    var enabled = this.isByeEnabled();
    this.addCommand(TMPlugin.ByeCommand.ByeCommand, 'bye', enabled);
    _Window_MenuCommand_addOriginalCommands.call(this);
  };

  Window_MenuCommand.prototype.isByeEnabled = function() {
    return $gameParty.size() >= 2 && $gameSystem.isByeEnabled();
  };

  //-----------------------------------------------------------------------------
  // Window_MenuStatus
  //

  Window_MenuStatus.prototype.setByeMode = function(byeMode) {
    this._byeMode = byeMode;
  };

  var _Window_MenuStatus_processOk = Window_MenuStatus.prototype.processOk;
  Window_MenuStatus.prototype.processOk = function() {
    if (this._byeMode) {
      Window_Selectable.prototype.processOk.call(this);
    } else {
      _Window_MenuStatus_processOk.call(this);
    }
  };

  var _Window_MenuStatus_isCurrentItemEnabled = Window_MenuStatus.prototype.isCurrentItemEnabled;
  Window_MenuStatus.prototype.isCurrentItemEnabled = function() {
    if (this._byeMode) {
      var actor = $gameParty.members()[this.index()];
      return actor && !actor.actor().meta.disableBye;
    } else {
      return _Window_MenuStatus_isCurrentItemEnabled.call(this);
    }
  };

  var _Window_MenuStatus_playOkSound = Window_Selectable.prototype.playOkSound;
  Window_Selectable.prototype.playOkSound = function() {
    if (this._byeMode) {
      AudioManager.playSe(TMPlugin.ByeCommand.ByeSe);
    } else {
      _Window_MenuStatus_playOkSound.call(this);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Menu
  //

  var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('bye', this.commandBye.bind(this));
  };

  Scene_Menu.prototype.commandBye = function() {
    this._statusWindow.setByeMode(true);
    this._statusWindow.selectLast();
    this._statusWindow.activate();
    this._statusWindow.setHandler('ok',     this.onByeOk.bind(this));
    this._statusWindow.setHandler('cancel', this.onByeCancel.bind(this));
  };

  Scene_Menu.prototype.onByeOk = function() {
    var index = this._statusWindow.index();
    var actor = $gameParty.members()[index];
    $gameParty.removeActor(actor.actorId());
    this._statusWindow.refresh();
    var n = $gameParty.size();
    if (n === 1) {
      this._commandWindow.refresh();
      this.onByeCancel();
    } else {
      if (this._statusWindow.index() >= n) {
        this._statusWindow.select(n - 1);
      }
      this._statusWindow.activate();
    }
  };

  Scene_Menu.prototype.onByeCancel = function() {
    this._statusWindow.deselect();
    this._statusWindow.setByeMode(false);
    this._commandWindow.activate();
  };

})();
