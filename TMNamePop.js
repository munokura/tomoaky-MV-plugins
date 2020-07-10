//=============================================================================
// TMPlugin - ネームポップ
// バージョン: 2.0.0
// 最終更新日: 2016/08/12
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc イベントの頭上に文字列を表示する機能を追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param backOpacity
 * @desc ネームポップの背景の不透明度。
 * 初期値: 96 ( 0 ～ 255 )
 * @default 96
 *
 * @param fontSize
 * @desc ネームポップのフォントサイズ。
 * 初期値: 20
 * @default 20
 *
 * @param outlineWidth
 * @desc ネームポップの縁取りの太さ。
 * 初期値: 4
 * @default 4
 *
 * @param outlineColor
 * @desc ネームポップの縁取りの色。
 * 初期値: rgba(0, 0, 0, 0.5)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param width
 * @desc ネームポップの幅
 * 初期値: 160
 * @default 160
 *
 * @param roundRectRadius
 * @desc TMBitmapEx.js導入時の、角丸矩形の丸部分の半径。
 * 初期値: 6
 * @default 6
 *
 * @help
 * 使い方:
 *
 *   イベントのメモ欄（または注釈コマンド）にタグを書き込むか、あるいは
 *   プラグインコマンドを使って後からネームポップを設定することで、
 *   キャラクターの頭上に文字列を表示することができます。
 *
 *   イベントの透明化をオンにするとネームポップも非表示になります。
 *   ネームポップだけを表示したい場合はイベントの画像を (なし) に
 *   してください。
 *
 *   このプラグインは RPGツクールMV Version 1.3.0 で動作確認をしています。
 *
 *
 * プラグインコマンド:
 *
 *   namePop 1 名前
 *     イベント１番の頭上に 名前 という文字列を表示します。
 *
 *   namePop 1 名前 -48
 *     ネームポップを上へ 48 ドットずらして表示します。
 *
 *   namePop 1 名前 -48 blue
 *     ネームポップの縁取りの色を青色で表示します。
 *
 *   namePop 1
 *     イベント１番のネームポップを消去します。
 *
 *   イベント番号（ひとつ目の数値）は以下の規則にしたがって対象を指定します。
 *     -1     … プレイヤーを対象にする
 *     0      … コマンドを実行しているイベントを対象にする
 *     1 以上 … その番号のイベントを対象にする
 *
 *
 * メモ欄（イベント）タグ:
 *
 *   <namePop:名前 12 red>
 *     頭上に 名前 という文字列を、通常よりも下へ 12 ドットずらして、
 *     文字の縁取りを赤色にして表示します。
 *
 *   イベントのメモ欄以外に、実行内容の一番上にある注釈コマンド内でも
 *   同様のタグでネームポップを設定することができます。
 *   メモ欄と注釈の両方にタグがある場合は注釈が優先されます。
 *
 *   ネームポップには一部の制御文字を使用することもできます。
 *   \V, \N, \P, \G, \\, \C が使えます、使い方は『文章の表示』と同じですが、
 *   \C はネームポップ全体の文字色を変更します。
 *
 *   制御文字による置換はプラグインコマンドやイベントページの切り替えにより
 *   名前が変化したときにのみ実行されます。つまり \V で変数の値を名前として
 *   設定し、その後変数の値を別の値に変更してもネームポップは変化しません。
 *
 *
 * プラグインパラメータ補足:
 *
 *   namePopOutlineColor
 *     縁取りの色は rgba(0, 0, 0, 0.5) のような形式でRGB値と不透明度を
 *     設定します。RGB値は 0 ～ 255、不透明度は 0 ～ 1.0 の範囲で値を
 *     設定してください。
 *       例: rgba(255, 0, 255, 0.5)    # 不透明度５０％のピンク
 *
 *     また、上記の形式以外に black や blue といったカラーネームと、
 *     #000000 や #0000ff のようなカラーコードを指定することもできます。
 *
 *   roundRectRadius
 *     TMBitmapEx.js をこのプラグインよりも上の位置に導入し、
 *     このパラメータの値を 1 以上にすることで、ネームポップ背景を
 *     角丸の矩形にすることができます。
 */

var Imported = Imported || {};
Imported.TMNamePop = true;

var TMPlugin = TMPlugin || {};
TMPlugin.NamePop = {};
TMPlugin.NamePop.Parameters = PluginManager.parameters('TMNamePop');
TMPlugin.NamePop.BackOpacity =  +(TMPlugin.NamePop.Parameters['backOpacity'] || 96);
TMPlugin.NamePop.FontSize = +(TMPlugin.NamePop.Parameters['fontSize'] || 20);
TMPlugin.NamePop.OutlineWidth = +(TMPlugin.NamePop.Parameters['outlineWidth'] || 4);
TMPlugin.NamePop.OutlineColor = TMPlugin.NamePop.Parameters['outlineColor'] || 'rgba(0, 0, 0, 0.5)';
TMPlugin.NamePop.Width = +(TMPlugin.NamePop.Parameters['width'] || 160);
TMPlugin.NamePop.RoundRectRadius = +(TMPlugin.NamePop.Parameters['roundRectRadius'] || 6);


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

  Game_CharacterBase.prototype.setNamePop = function(namePop, shiftY) {
    if (namePop) {
      namePop = $gameMap._interpreter.convertEscapeCharactersTM(namePop);
    }
    this._namePop  = namePop;
    this._namePopY = shiftY || 0;
  };

  Game_CharacterBase.prototype.namePopOutlineColor = function() {
    return this._namePopOutlineColor || TMPlugin.NamePop.OutlineColor;
  };
  
  Game_CharacterBase.prototype.setNamePopOutlineColor = function(outlineColor) {
    this._namePopOutlineColor = outlineColor;
  };
  
  Game_CharacterBase.prototype.requestNamePop = function() {
    this._requestNamePop = true;
  };

  Game_CharacterBase.prototype.onChangeNamePop = function() {
    this._requestNamePop = false;
  };

  Game_CharacterBase.prototype.isNamePopRequested = function() {
    return this._requestNamePop;
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //

  var _Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function() {
    _Game_Event_setupPage.call(this);
    if (this._pageIndex >= 0) {
      var namePop = this.loadTagParam('namePop');
      if (namePop) {
        var arr = namePop.split(' ');
        this.setNamePop(arr[0], arr[1]);
        this.setNamePopOutlineColor(arr[2]);
      }
    } else {
      this.setNamePop(null, 0);
    }
    this.requestNamePop();
  };
  
  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'namePop') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var character = this.character(+arr[0]);
      if (character) {
        character.setNamePop(args[1], arr[2]);
        character.setNamePopOutlineColor(arr[3]);
        character.requestNamePop();
      }
    }
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_Character
  //

  var _Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function() {
    _Sprite_Character_update.call(this);
    this.updateNamePop();
  };

  Sprite_Character.prototype.updateNamePop = function() {
    if (this._character.isNamePopRequested() ||
        this._namePop !== this._character._namePop) {
      this._character.onChangeNamePop();
      this._namePop = this._character._namePop;
      if (this._namePop) {
        if (!this._namePopSprite) {
          this._namePopSprite = new Sprite_NamePop();
          this.addChild(this._namePopSprite);
          this._namePopSprite.y = this.namePopShiftY();
        }
        this._namePopSprite.refresh(this._namePop,
                                    this._character.namePopOutlineColor());
      } else {
        this.removeChild(this._namePopSprite);
        this._namePopSprite = null;
      }
    }
  };

  Sprite_Character.prototype.namePopShiftY = function() {
    return this._character._namePopY - this.patternHeight();
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_NamePop
  //

  function Sprite_NamePop() {
    this.initialize.apply(this, arguments);
  }

  Sprite_NamePop.prototype = Object.create(Sprite.prototype);
  Sprite_NamePop.prototype.constructor = Sprite_NamePop;

  Sprite_NamePop.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.bitmap = new Bitmap(TMPlugin.NamePop.Width, TMPlugin.NamePop.FontSize + 4);
    this.bitmap.fontSize = TMPlugin.NamePop.FontSize;
    this.bitmap.outlineWidth = TMPlugin.NamePop.OutlineWidth;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
  };

  Sprite_NamePop.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.y = this.parent.namePopShiftY();
  };

  Sprite_NamePop.prototype.refresh = function(text, outlineColor) {
    this.bitmap.clear();
    this.bitmap.textColor = '#ffffff';
    this.bitmap.outlineColor = outlineColor;
    text = this.convertEscapeCharacters(text);
    var tw = this.bitmap.measureTextWidth(text);
    var x = Math.max((this.width - tw) / 2 - 4, 0);
    var w = Math.min(tw + 8, this.width);
    this.bitmap.paintOpacity = TMPlugin.NamePop.BackOpacity;
    if (Imported.TMBitmapEx && TMPlugin.NamePop.RoundRectRadius) {
      this.bitmap.fillRoundRect(x, 0, w, this.height, TMPlugin.NamePop.RoundRectRadius, '#000000');
    } else {
      this.bitmap.fillRect(x, 0, w, this.height, '#000000');
    }
    this.bitmap.paintOpacity = 255;
    this.bitmap.drawText(text, 0, 0, this.width, this.height, 'center');
  };
  
  Sprite_NamePop.prototype.convertEscapeCharacters = function(text) {
    text = text.replace(/\x1bC\[(\d+)\]/gi, function() {
      this.bitmap.textColor = this.textColor(arguments[1]);
      return '';
    }.bind(this));
    return text;
  };

  Sprite_NamePop.prototype.textColor = function(n) {
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    var windowskin = ImageManager.loadSystem('Window');
    return windowskin.getPixel(px, py);
  };

})();
