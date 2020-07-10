//=============================================================================
// TMPlugin - アイテム制約拡張
// バージョン: 1.0.1
// 最終更新日: 2017/02/14
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc アイテムの対象アクターに関する制約を追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @help
 * TMPlugin - アイテム制約拡張 ver1.0.1
 *
 * 使い方:
 * 
 *   アイテムのメモ欄にタグをつけることで対象として選択できるアクターを
 *   制限できるようになります。
 *
 *   このプラグインは RPGツクールMV Version 1.3.4 で動作確認をしています。
 * 
 * 
 * メモ欄タグ (アイテム):
 * 
 *   <justOnce>
 *     メモ欄にこのタグがついているアイテムは、同じアクターに対して 1 回しか
 *     使えなくなります。
 * 
 *   <targetActor:1 2>
 *     メモ欄にこのタグがついているアイテムは、1 番と 2 番のアクターにのみ
 *     使用できるようになります。
 * 
 * 
 * プラグインコマンド:
 * 
 *   clearItemRestriction 1
 *     アクター 1 番のアイテム使用履歴を初期化し、<justOnce> タグのついた
 *     アイテムを再び使用できる状態にします。
 */

var Imported = Imported || {};
Imported.TMItemRestriction = true;

var TMPlugin = TMPlugin || {};

if (!TMPlugin.InterpreterBase) {
  TMPlugin.InterpreterBase = true;
  (function() {

    Game_Interpreter.prototype.convertEscapeCharactersTM = function(text) {
      text = text.replace(/\\/g, '\x1b');
      text = text.replace(/\x1b\x1b/g, '\\');
      text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
        return this.actorNameTM(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
        return this.partyMemberNameTM(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
      return text;
    };
  
    Game_Interpreter.prototype.actorNameTM = function(n) {
      var actor = n >= 1 ? $gameActors.actor(n) : null;
      return actor ? actor.name() : '';
    };

    Game_Interpreter.prototype.partyMemberNameTM = function(n) {
      var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
      return actor ? actor.name() : '';
    };

  })();
} // TMPlugin.InterpreterBase

(function() {

  //-----------------------------------------------------------------------------
  // Game_BattlerBase
  //

  Game_BattlerBase.prototype.clearItemRestriction = function() {
    this._alreadyUsed = [];
  };

  Game_BattlerBase.prototype.alreadyUsed = function() {
    if (this._alreadyUsed == null) this.clearItemRestriction();
    return this._alreadyUsed;
  };

  Game_BattlerBase.prototype.isAlreadyUsed = function(item) {
    return this.alreadyUsed().contains(item.id);
  };

  Game_BattlerBase.prototype.setAlreadyUsed = function(item) {
    this.alreadyUsed().push(item.id);
  };

  //-----------------------------------------------------------------------------
  // Game_Actor
  //

  var _Game_Actor_setup = Game_Actor.prototype.setup;
  Game_Actor.prototype.setup = function(actorId) {
    _Game_Actor_setup.call(this, actorId);
    this.clearItemRestriction();
  };

  //-----------------------------------------------------------------------------
  // Game_Action
  //

  var _Game_Action_testApply = Game_Action.prototype.testApply;
  Game_Action.prototype.testApply = function(target) {
    if (this.isAlreadyUsed(target)) return false;
    if (!this.isTargetActorValid(target)) return false;
    return _Game_Action_testApply.call(this, target);
  };

  Game_Action.prototype.isAlreadyUsed = function(target) {
    var item = this.item();
    return this.isItem() && item.meta.justOnce && target.isAlreadyUsed(item);
  };

  Game_Action.prototype.isTargetActorValid = function(target) {
    if (target.isActor() && this.isItem()) {
      var item = this.item();
      if (item.meta.targetActor) {
        var targetActors = item.meta.targetActor.split(' ').map(Number);
        return targetActors.contains(target.actorId());
      }
    }
    return true;
  };

  var _Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function(target) {
    _Game_Action_apply.call(this, target);
    if (target.result().isHit()) this.setAlreadyUsed(target);
  };

  Game_Action.prototype.setAlreadyUsed = function(target) {
    var item = this.item();
    if (this.isItem() && item.meta.justOnce) target.setAlreadyUsed(item);
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'clearItemRestriction') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var actor = $gameActors.actor(+arr[0]);
      if (actor) actor.clearItemRestriction();
    }
  };

  //-----------------------------------------------------------------------------
  // Window_BattleActor
  //

  Window_BattleActor.prototype.playOkSound = function() {
  };

  Window_BattleActor.prototype.playBuzzerSound = function() {
  };

  //-----------------------------------------------------------------------------
  // Scene_Battle
  //

  var _Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
  Scene_Battle.prototype.onActorOk = function() {
    var action = BattleManager.inputtingAction();
    var actor = this._actorWindow.actor();
    if (action.isAlreadyUsed(actor) || !action.isTargetActorValid(actor)) {
      SoundManager.playBuzzer();
      this._actorWindow.activate();
    } else {
      SoundManager.playOk();
      _Scene_Battle_onActorOk.call(this);
    }
  };

})();
