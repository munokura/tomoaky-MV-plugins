//=============================================================================
// TMPlugin - 装備スロット拡張
// バージョン: 1.0.0
// 最終更新日: 2017/02/09
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc アクターごとに部位設定を自由に変更できるようにします。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @help
 * TMPlugin - 装備スロット拡張 ver1.0.0
 * 
 * 使い方:
 * 
 *   アクターのメモ欄に <equipSlotEx:1 2 5 5 5> のようなタグを書き込んで
 *   ください。この例では武器、盾、装飾品３つという部位構成になります。
 *   タグがなければ通常の部位構成が採用されます。また、二刀流が設定されて
 *   いる場合は２つ目の部位が武器に置き換わります。
 *
 * 
 * プラグインコマンド:
 * 
 *   changeEquipSlotEx 1 3 10
 *   アクター１番の装備スロット 3 番（一番上を 0 番とする）に 10 番の装備品を
 *   装備します。装備品が武器か防具かは指定したスロットによって自動的に判断
 *   されます。
 *
 *   forceChangeEquipSlotEx 1 3 10
 *   changeEquipSlotEx とは違い、パーティが対象となる装備品を所持している必要
 *   がありません。
 * 
 *   clearEquipmentsSlotEx 1
 *   アクター 1 番の装備をすべてはずします。
 *
 * 
 * 注意事項:
 * 
 *   データベースの初期装備やイベントコマンド『装備の変更』など、エディタ側は
 *   スロット拡張に対応していないため、イベント処理としてアクターの装備を変更
 *   したい場合はプラグインコマンドを使ってください。
 */

var Imported = Imported || {};
Imported.TMEquipSlotEx = true;

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
  // Game_Actor
  //

  var _Game_Actor_equipSlots = Game_Actor.prototype.equipSlots;
  Game_Actor.prototype.equipSlots = function() {
    var equipSlotEx = this.actor().meta.equipSlotEx;
    if (equipSlotEx) {
      var slots = equipSlotEx.split(' ').map(Number);
      if (slots.length >= 2 && this.isDualWield()) slots[1] = 1;
      return slots;
    } else {
      return _Game_Actor_equipSlots.call(this);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'changeEquipSlotEx') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var actor = $gameActors.actor(+arr[0]);
      if (actor) {
        var item = +arr[1] === 0 || (+arr[1] === 1 && actor.isDualWield()) ?
          $dataWeapons[+arr[2]] : $dataArmors[+arr[2]];
        actor.changeEquip(+arr[1], item);
      }
    } else if (command === 'forceChangeEquipSlotEx') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var actor = $gameActors.actor(+arr[0]);
      if (actor) {
        var item = +arr[1] === 0 || (+arr[1] === 1 && actor.isDualWield()) ?
          $dataWeapons[+arr[2]] : $dataArmors[+arr[2]];
        actor.forceChangeEquip(+arr[1], item);
      }
    } else if (command === 'clearEquipmentsSlotEx') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var actor = $gameActors.actor(+arr[0]);
      if (actor) actor.clearEquipments();
    }
  };

})();
