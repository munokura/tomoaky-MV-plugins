//=============================================================================
// TMVplugin - フキダシループ
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.11
// 最終更新日: 2016/06/20
//=============================================================================

/*:
 * @plugindesc フキダシアイコンをループ表示させます。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @help
 * 使い方:
 *   プラグインコマンドまたはメモ欄タグを使ってイベントにフキダシループを設
 *   定すると、指定されたフキダシアイコンが繰り返し表示され続けるようになり
 *   ます。
 *
 *   イベントのメモ欄以外に、実行内容の一番上にある注釈コマンド内でも同様の
 *   タグでフキダシループを設定することができます。メモ欄と注釈の両方にタグ
 *   がある場合は注釈が優先されます。
 *
 *   プラグインコマンドによるフキダシループは、イベントページの切り替わりや
 *   イベントコマンド『イベントの一時消去』などによって解除されます。
 * 
 * プラグインコマンド:
 *   setBalloonLoop 2 1
 *   ２番のイベントにフキダシループとしてびっくりアイコンを設定します。イベ
 *   ント番号は -1 ならプレイヤー、0 ならコマンドを実行しているイベントが対
 *   象となります。
 *   表示するアイコンの番号はイベントコマンド『フキダシアイコンの表示』での
 *   並びに対応していて、0 を指定するとフキダシループが解除されます。
 *
 * メモ欄タグ（イベント）:
 *   <balloonLoop:1>
 *   このタグがついているイベントは setBalloonLoop を実行しなくても自動的に
 *   フキダシループが設定されます。数値は表示するアイコン番号です。
 *
 */

var Imported = Imported || {};
Imported.TMBalloonLoop = true;

if (!Imported.TMEventBase) {
  Imported.TMEventBase = true;
  (function() {
  
    //-----------------------------------------------------------------------------
    // Game_Event
    //
  
    var _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
      _Game_Event_setupPage.call(this);
      if (this._pageIndex >= 0) {
        this.loadCommentParams();
      }
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
              if (match[2] === ':') {
                this._commentParams[match[1]] = match[3];
              } else {
                this._commentParams[match[1]] = true;
              }
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
      if (this._commentParams[paramName]) {
        return this._commentParams[paramName];
      } else if (this.event().meta[paramName]) {
        return this.event().meta[paramName];
      } else {
        return null;
      }
    };

  })();
}

(function() {

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //
  
  var _Game_CharacterBase_endBalloon = Game_CharacterBase.prototype.endBalloon;
  Game_CharacterBase.prototype.endBalloon = function() {
    _Game_CharacterBase_endBalloon.call(this);
    var balloonLoop = this.balloonLoop();
    if (balloonLoop) {
      this.requestBalloon(balloonLoop);
    }
  };

  Game_CharacterBase.prototype.setBalloonLoop = function(balloonLoop) {
    this._balloonLoop = balloonLoop;
  };

  Game_CharacterBase.prototype.balloonLoop = function() {
    return this._balloonLoop;
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //
  
  var _Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function() {
    _Game_Event_setupPage.call(this);
    if (this._pageIndex >= 0) {
      var balloonLoop = +this.loadTagParam('balloonLoop');
      if (balloonLoop) {
        this.setBalloonLoop(balloonLoop);
      }
    } else {
      this.setBalloonLoop(0);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'setBalloonLoop') {
      var character = this.character(+args[0]);
      if (character) {
        character.setBalloonLoop(+args[1]);
      }
    }
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_Character
  //

  var _Sprite_Character_endBalloon = Sprite_Character.prototype.endBalloon;
  Sprite_Character.prototype.endBalloon = function() {
    var balloonLoop = this._character.balloonLoop();
    if (balloonLoop) {
      this._balloonSprite.setup(balloonLoop);
    } else {
      _Sprite_Character_endBalloon.call(this);
    }
  };

})();
