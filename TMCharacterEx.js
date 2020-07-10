//=============================================================================
// TMPlugin - キャラクター表示拡張
// バージョン: 2.0.2
// 最終更新日: 2016/12/03
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc イベントに表示位置補正、回転、拡大の機能を追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param landingAnimation
 * @desc ジャンプ後の着地時に拡大補正率を自動的に適用する。
 * 初期値: 1 ( 0 で無効 / 1 で有効 )
 * @default 1
 *
 * @help
 * 使い方:
 *
 *   イベントのメモ欄にタグを書き込むことで、表示位置や拡大率、回転角度の
 *   設定ができます。
 *
 *   グラフィックの中心を軸に回転させたい場合は angle タグと一緒に
 *   <anchorY:0.5> を設定してください。
 *
 *   イベントページが変化した際、次のページでタグ設定がないパラメータは
 *   変化前の状態がそのまま引き継がれます。
 *
 *   このプラグインは RPGツクールMV Version 1.3.4 で動作確認をしています。
 *
 *
 * メモ欄（イベント）タグ:
 *
 *   <chrShift:0 0>         # 表示位置補正値を変更
 *   <chrAngle:0>           # 回転角度を変更 ( 0 ～ 359 )
 *   <chrScale:1.0 1.0>     # 拡大率を変更 ( 1.0 で等倍)
 *   <chrAnchor:0.5 1.0>    # 中心位置を変更
 *
 *   数値が 2 つあるタグはＸ方向とＹ方向の設定をそれぞれ指定してください。
 * 
 *   イベントのメモ欄以外に、実行内容の一番上にある注釈コマンド内でも
 *   同様のタグでパラメータを設定することができます。
 *   メモ欄と注釈の両方にタグがある場合は注釈が優先されます。
 *
 *
 * プラグインコマンド:
 *
 *   chrShift 1 5 -3
 *     イベント 1 番を右に 5、上に 3 ドットずらします。
 *
 *   chrAngle 1 90
 *     イベント 1 番を右に 90 度回転させます。
 *
 *   chrScale 2 1.5 0.5
 *     イベント 2 番の幅を 50% 拡大し、高さを半分に縮小します。
 *
 *   chrScaleRate 3 1.3 0.7
 *     イベント 3 番の拡大補正率を幅 1.3 倍、高さ 0.7 倍に設定します。
 *     拡大補正率は setChrScale による拡大率とは別に乗算され、時間経過で
 *     等倍に戻ります。
 *
 *   chrClear 1
 *     イベント 1 番に適用されている chrShift、chrAngle、chrScale の効果を
 *     すべて解除します。
 *
 *   イベント番号（ひとつ目の数値）は以下の規則にしたがって対象を指定します。
 *     -1     … プレイヤーを対象にする
 *     0      … コマンドを実行しているイベントを対象にする
 *     1 以上 … その番号のイベントを対象にする
 *
 *
 * スクリプトコマンド:
 *
 *   this.setChrShift(-10, 5)
 *     このイベントの表示位置を左に１０、下に５ずらす。
 *
 *   this.setChrAngle(180)
 *     このイベントを１８０度回転させる。
 *
 *   this.setChrScale(2, 1)
 *     このイベントの幅だけを２倍に拡大する。
 *
 *   this.setChrScaleRate(1, 1.5)
 *     このイベントの拡大補正率を幅はそのまま、高さ 1.5 倍に設定します。
 *
 *   イベントコマンド『移動ルートの設定』ではプラグインコマンドが
 *   使用できないので、上記のスクリプトを代用してください。
 */

var Imported = Imported || {};
Imported.TMCharacterEx = true;

var TMPlugin = TMPlugin || {};
TMPlugin.CharacterEx = {};
TMPlugin.CharacterEx.Parameters = PluginManager.parameters('TMCharacterEx');
TMPlugin.CharacterEx.LandingAnimation = TMPlugin.CharacterEx.Parameters['landingAnimation'] === '1';

if (!TMPlugin.EventBase) {
  TMPlugin.EventBase = true;
  (function() {

    var _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
      _Game_Event_setupPage.call(this);
      if (this._pageIndex >= 0) this.loadCommentParams();
    };

    Game_Event.prototype.loadCommentParams = function() {
      this._commentParams = {};
      var re = /<([^<>:]+)(:?)([^>]*)>/g;
      var list = this.list();
      for (var i = 0; i < list.length; i++) {
        var command = list[i];
        if (command && command.code == 108 || command.code == 408) {
          for (;;) {
            var match = re.exec(command.parameters[0]);
            if (match) {
              this._commentParams[match[1]] = match[2] === ':' ? match[3] : true;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
    };

    Game_Event.prototype.loadTagParam = function(paramName) {
      return this._commentParams[paramName] || this.event().meta[paramName];
    };

  })();
} // TMPlugin.EventBase

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
  // Game_CharacterBase
  //

  var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    _Game_CharacterBase_initMembers.call(this);
    this.initChrParams();
  }
  
  Game_CharacterBase.prototype.initChrParams = function() {
    this._chrShiftX     = 0;
    this._chrShiftY     = 0;
    this._chrAngle      = 0;
    this._chrScaleX     = 1.0;
    this._chrScaleY     = 1.0;
    this._chrAnchorX    = 0.5;
    this._chrAnchorY    = 1;
    this._chrScaleRateX = 1;
    this._chrScaleRateY = 1;
  };

  var _Game_CharacterBase_screenX = Game_CharacterBase.prototype.screenX;
  Game_CharacterBase.prototype.screenX = function() {
    return _Game_CharacterBase_screenX.call(this) + this._chrShiftX;
  };

  var _Game_CharacterBase_screenY = Game_CharacterBase.prototype.screenY;
  Game_CharacterBase.prototype.screenY = function() {
    return _Game_CharacterBase_screenY.call(this) + this._chrShiftY;
  };

  Game_CharacterBase.prototype.screenAngle = function() {
    return this._chrAngle;
  };

  Game_CharacterBase.prototype.screenScaleX = function() {
    return this._chrScaleX * this._chrScaleRateX;
  };

  Game_CharacterBase.prototype.screenScaleY = function() {
    return this._chrScaleY * this._chrScaleRateY;
  };
  
  Game_CharacterBase.prototype.screenAnchorX = function() {
    return this._chrAnchorX;
  };
  
  Game_CharacterBase.prototype.screenAnchorY = function() {
    return this._chrAnchorY;
  };
  
  Game_CharacterBase.prototype.setChrShift = function(shiftX, shiftY) {
    if (shiftX != null && shiftY != null) {
      this._chrShiftX = +shiftX;
      this._chrShiftY = +shiftY;
    }
  };
  
  Game_CharacterBase.prototype.setChrAngle = function(angle) {
    if (angle != null) {
      this._chrAngle = angle * Math.PI / 180;
    }
  };
  
  Game_CharacterBase.prototype.setChrScale = function(scaleX, scaleY) {
    if (scaleX != null && scaleY != null) {
      this._chrScaleX = +scaleX;
      this._chrScaleY = +scaleY;
    }
  };

  Game_CharacterBase.prototype.setChrScaleRate = function(scaleRateX, scaleRateY) {
    if (scaleRateX != null && scaleRateY != null) {
      this._chrScaleRateX = +scaleRateX;
      this._chrScaleRateY = +scaleRateY;
    }
  };

  Game_CharacterBase.prototype.setChrAnchor = function(anchorX, anchorY) {
    if (anchorX != null && anchorY != null) {
      this._chrAnchorX = +anchorX;
      this._chrAnchorY = +anchorY;
    }
  };

  var _Game_CharacterBase_updateJump = Game_CharacterBase.prototype.updateJump;
  Game_CharacterBase.prototype.updateJump = function() {
    _Game_CharacterBase_updateJump.call(this);
    if (TMPlugin.CharacterEx.LandingAnimation && this._jumpCount === 0) {
      this.setChrScaleRate(1.3, 0.7);
    }
  };

  var _Game_CharacterBase_updateAnimation = Game_CharacterBase.prototype.updateAnimation;
  Game_CharacterBase.prototype.updateAnimation = function() {
    _Game_CharacterBase_updateAnimation.call(this);
    if (this._chrScaleRateX < 1) {
      this._chrScaleRateX = Math.min(this._chrScaleRateX + 0.05, 1);
    } else if (this._chrScaleRateX > 1) {
      this._chrScaleRateX = Math.max(this._chrScaleRateX - 0.05, 1);
    }
    if (this._chrScaleRateY < 1) {
      this._chrScaleRateY = Math.min(this._chrScaleRateY + 0.05, 1);
    } else if (this._chrScaleRateY > 1) {
      this._chrScaleRateY = Math.max(this._chrScaleRateY - 0.05, 1);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //
  
  var _Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function() {
    _Game_Event_setupPage.call(this);
    if (this._pageIndex >= 0) {
      var chrShift = this.loadTagParam('chrShift');
      if (chrShift) this.setChrShift.apply(this, chrShift.split(' '));
      this.setChrAngle(this.loadTagParam('chrAngle'));
      var chrScale = this.loadTagParam('chrScale');
      if (chrScale) this.setChrScale.apply(this, chrScale.split(' '));
      var chrAnchor = this.loadTagParam('chrAnchor');
      if (chrAnchor) this.setChrAnchor.apply(this, chrAnchor.split(' '));
    } else {
      this.initChrParams();
    }
  };
  
  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'chrShift') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var character = this.character(+arr[0]);
      if (character) character.setChrShift(arr[1], arr[2]);
    } else if (command === 'chrAngle') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var character = this.character(+arr[0]);
      if (character) character.setChrAngle(arr[1]);
    } else if (command === 'chrScale') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var character = this.character(+arr[0]);
      if (character) character.setChrScale(arr[1], arr[2]);
    } else if (command === 'chrScaleRate') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var character = this.character(+arr[0]);
      if (character) character.setChrScaleRate(arr[1], arr[2]);
    } else if (command === 'chrClear') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var character = this.character(+arr[0]);
      if (character) {
        character.setChrShift(0, 0);
        character.setChrAngle(0);
        character.setChrScale(1.0, 1.0);
      }
    }
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_Character
  //
  
  var _Sprite_Character_updateOther = Sprite_Character.prototype.updateOther;
  Sprite_Character.prototype.updateOther = function() {
    _Sprite_Character_updateOther.call(this);
    this.rotation = this._character.screenAngle();
    this.scale.set(this._character.screenScaleX(), this._character.screenScaleY());
    this.anchor.set(this._character.screenAnchorX(), this._character.screenAnchorY());
  };

})();
