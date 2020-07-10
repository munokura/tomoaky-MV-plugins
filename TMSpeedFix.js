//=============================================================================
// TMPlugin - 行動順から乱数を除外
// バージョン: 2.0.0
// 最終更新日: 2016/08/17
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc バトルの行動順からランダムな要素を除外します。
 * 逃走成功率を固定値にするおまけ機能付きです。
 * 
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param secondParam
 * @desc speedが拮抗した際に比較するパラメータ。
 * 初期値: 7 (運で比較、その他の値はヘルプで確認してください)
 * @default 7
 *
 * @help
 * 使い方:
 *
 *   通常の計算式
 *     speed = 敏捷性 + Math.randomInt(Math.floor(5 + 敏捷性 / 4))
 *
 *   これがごっそり削られて以下のような式になります。
 *     speed = 敏捷性
 *
 *   このプラグインは RPGツクールMV Version 1.3.0 で動作確認をしています。
 *
 *
 * プラグインコマンド:
 *
 *   speedFixStop
 *     行動順の計算式をプラグイン導入前の状態に戻します。ゲーム開始時は
 *     すでにプラグインによる計算式の変更が有効な状態になっています。
 *     この状態はセーブデータに保存されます。
 *
 *   speedFixStart
 *     行動順の計算式からランダム要素を除外します。
 *     speedFixStop の効果を解除する場合に使用してください。
 *
 *   setEscapeRatio 80
 *     バトルからの逃走成功率を 80% に固定します。0 よりも小さい値を
 *     設定すると逃走成功率は固定されず、通常の計算式で算出されます。
 *     ゲーム開始時には -1 が設定されています。
 *     このコマンドで固定した逃走成功率はセーブデータに保存されます、
 *     解除したくなったら setEscapeRatio -1 を実行してください。
 *
 *   setEscapeRatio \V[3]
 *     逃走成功率をゲーム変数 3 番に代入されている値に固定します。
 *
 *   getEscapeRatio 2
 *     ゲーム変数 2 番に現在固定されている逃走成功率を代入します。
 *     代入されている値が 0 以上かどうかで、逃走成功率が固定されているかを
 *     判定することができます。
 *
 *
 * プラグインパラメータ補足
 *
 *   secondParam
 *     secondParam の比較にはスキルやアイテムの速度補正が適用されません。
 *     値は以下のパラメータに対応しています。
 *     -1 … 利用しない
 *     0  … 最大HP
 *     1  … 最大MP
 *     2  … 攻撃力
 *     3  … 防御力
 *     4  … 魔法力
 *     5  … 魔法防御
 *     6  … 敏捷性
 *     7  … 運
 */

var Imported = Imported || {};
Imported.TMSpeedFix = true;

var TMPlugin = TMPlugin || {};
TMPlugin.SpeedFix = {};
TMPlugin.SpeedFix.Parameters = PluginManager.parameters('TMSpeedFix');
TMPlugin.SpeedFix.SecondParam = +(TMPlugin.SpeedFix.Parameters['secondParam'] || 7);

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
  // BattleManager
  //

  var _BattleManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
  BattleManager.makeEscapeRatio = function() {
    if ($gameSystem.exEscapeRatio() >= 0) {
      this._escapeRatio = $gameSystem.exEscapeRatio() / 100;
    } else {
      _BattleManager_makeEscapeRatio.call(this);
    }
  };

  var _BattleManager_makeActionOrders = BattleManager.makeActionOrders;
  BattleManager.makeActionOrders = function() {
    _BattleManager_makeActionOrders.call(this);
    if (TMPlugin.SpeedFix.SecondParam >= 0) {
      this._actionBattlers.sort(function(a, b) {
        if (a.speed() === b.speed()) {
          return b.param(TMPlugin.SpeedFix.SecondParam) - a.param(TMPlugin.SpeedFix.SecondParam);
        } else {
          return b.speed() - a.speed();
        }
      });
    }
  };

  //-----------------------------------------------------------------------------
  // Game_System
  //

  Game_System.prototype.isSpeedFixEnabled = function() {
    if (this._speedFixEnabled == null) this._speedFixEnabled = true;
    return this._speedFixEnabled;
  };

  Game_System.prototype.disableSpeedFix = function() {
    this._speedFixEnabled = false;
  };

  Game_System.prototype.enableSpeedFix = function() {
    this._speedFixEnabled = true;
  };

  Game_System.prototype.exEscapeRatio = function() {
    if (this._exEscapeRatio == null) this._exEscapeRatio = -1;
    return this._exEscapeRatio;
  };

  Game_System.prototype.setExEscapeRatio = function(escapeRatio) {
    this._exEscapeRatio = escapeRatio;
  };

  //-----------------------------------------------------------------------------
  // Game_Action
  //

  var _Game_Action_speed = Game_Action.prototype.speed;
  Game_Action.prototype.speed = function() {
    if ($gameSystem.isSpeedFixEnabled()) {
      var speed = this.subject().agi;
      if (this.item()) speed += this.item().speed;
      if (this.isAttack()) speed += this.subject().attackSpeed();
      return speed;
    }
    return _Game_Action_speed.call(this);
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'speedFixStart') {
      $gameSystem.enableSpeedFix();
    } else if (command === 'speedFixStop') {
      $gameSystem.disableSpeedFix();
    } else if (command === 'setEscapeRatio') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      $gameSystem.setExEscapeRatio(+(arr[0] || -1));
    } else if (command === 'getEscapeRatio') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      $gameVariables.setValue(+(arr[0]), $gameSystem.exEscapeRatio());
    }
  };
  
})();
