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
@plugindesc v2.1 Adds the ability to Show Text above the event.
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/tomoaky-MV-plugins ).
Original plugin by tomoaky.
-----
This plugin is a modification of TMNamePop.
Please contact the modifier (munokura) with any inquiries.
Please refrain from causing any inconvenience to the original author.

How to Use:

You can Show Text above a character's head by writing a tag in the event's Note field (or annotation command), or by using a plugin command to later configure the name pop.

The name pop will also be hidden if event transparency is turned on.
If you want to display only the name pop, set the event image to (none).

Plugin Commands:

namePop 1 Name
Displays the string "Name" above event number 1.

namePop 1 Name -48
Shifts the name pop 48 dots upward.

namePop 1 Name -48 Blue
Displays the name pop with a blue border.

namePop 1
Erase the name pop for event number 1.

The event number (the first number) specifies the target according to the following rules: -1 ... Targets the player
0 ... Targets the event executing the command
1 or greater ... Targets the event with that number

Note field (Event) Tag:

<namePop:Name 12 red>
Displays the string "Name" above the player's head, shifted 12 dots lower than normal,
with a red outline around the text.

In addition to the event Note field, you can also set a name pop using the same tag within the annotation command at the top of the action.
If a tag exists in both the Note field and the annotation, the annotation takes priority.

You can also use some control characters in name pops.
\V, \N, \P, \G, \\, and \C are supported. Their usage is the same as for "Show Text,"
but \C changes the text color of the entire name pop.

Control character substitution is only performed when the name changes due to a plugin command or switching event pages. In other words, if you set a variable value as the name with \V,
then changing the variable's value will not change the name pop.

Plugin Parameter Notes:

namePopOutlineColor
Set the outline color using RGB values and opacity in the format rgba(0, 0, 0, 0.5). Set RGB values between 0 and 255, and opacity between 0 and 1.0.

Example: rgba(255, 0, 255, 0.5) # Pink with 50% opacity

In addition to the above format, you can also specify color names such as black or blue, and color codes such as #000000 or #0000ff.

roundRectRadius
By installing TMBitmapEx.js above this plugin and setting this parameter to a value of 1 or greater, you can make the name pop background a rounded rectangle.

Modifications (Additional Traits)

1. Memo (Event) Tag/Annotation Command:
<namePop:name 24,12 red>
Displays the string "name" above the character's head, offset 24 dots to the right and 12 dots down,
with a red border around the text.

2. Plugin Command:
namePop 1 name -12,-48
Displays the name pop offset 12 dots to the left and 48 dots up.

@param backOpacity
@text background opacity
@desc Background opacity of the name pop. Default: 96 (0 to 255)
@default 96

@param fontSize
@text Font size
@desc Name pop font size. Default: 20
@default 20

@param outlineWidth
@text Border Thickness
@desc Name pop border thickness. Default: 4
@default 4

@param outlineColor
@text Border color
@desc Name pop border color. Default: rgba(0, 0, 0, 0.5)
@default rgba(0, 0, 0, 0.5)

@param width
@text Name pop width
@desc Name Pop Width Default: 160
@default 160

@param roundRectRadius
@text Radius when TMBitmapEx.js is installed
@desc The radius of the rounded rectangle when TMBitmapEx.js is installed. Default: 6
@default 6
*/


/*:ja
@plugindesc v2.1 イベントの頭上に文字列を表示する機能を追加します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
このプラグインはTMNamePopを改変したものです。
お問い合わせは改変者（munokura）へお願いいたします。
原作者にご迷惑をおかけしないよう、お願いいたします。


使い方:

  イベントのメモ欄（または注釈コマンド）にタグを書き込むか、あるいは
  プラグインコマンドを使って後からネームポップを設定することで、
  キャラクターの頭上に文字列を表示することができます。

  イベントの透明化をオンにするとネームポップも非表示になります。
  ネームポップだけを表示したい場合はイベントの画像を (なし) に
  してください。


プラグインコマンド:

  namePop 1 名前
    イベント１番の頭上に 名前 という文字列を表示します。

  namePop 1 名前 -48
    ネームポップを上へ 48 ドットずらして表示します。

  namePop 1 名前 -48 blue
    ネームポップの縁取りの色を青色で表示します。

  namePop 1
    イベント１番のネームポップを消去します。

  イベント番号（ひとつ目の数値）は以下の規則にしたがって対象を指定します。
    -1     … プレイヤーを対象にする
    0      … コマンドを実行しているイベントを対象にする
    1 以上 … その番号のイベントを対象にする


メモ欄（イベント）タグ:

  <namePop:名前 12 red>
    頭上に 名前 という文字列を、通常よりも下へ 12 ドットずらして、
    文字の縁取りを赤色にして表示します。

  イベントのメモ欄以外に、実行内容の一番上にある注釈コマンド内でも
  同様のタグでネームポップを設定することができます。
  メモ欄と注釈の両方にタグがある場合は注釈が優先されます。

  ネームポップには一部の制御文字を使用することもできます。
  \V, \N, \P, \G, \\, \C が使えます、使い方は『文章の表示』と同じですが、
  \C はネームポップ全体の文字色を変更します。

  制御文字による置換はプラグインコマンドやイベントページの切り替えにより
  名前が変化したときにのみ実行されます。つまり \V で変数の値を名前として
  設定し、その後変数の値を別の値に変更してもネームポップは変化しません。


プラグインパラメータ補足:

  namePopOutlineColor
    縁取りの色は rgba(0, 0, 0, 0.5) のような形式でRGB値と不透明度を
    設定します。RGB値は 0 ～ 255、不透明度は 0 ～ 1.0 の範囲で値を
    設定してください。
      例: rgba(255, 0, 255, 0.5)    # 不透明度５０％のピンク

    また、上記の形式以外に black や blue といったカラーネームと、
    #000000 や #0000ff のようなカラーコードを指定することもできます。

  roundRectRadius
    TMBitmapEx.js をこのプラグインよりも上の位置に導入し、
    このパラメータの値を 1 以上にすることで、ネームポップ背景を
    角丸の矩形にすることができます。

改変（機能追加）部分

1.メモ欄（イベント）タグ・注釈コマンド:
  <namePop:名前 24,12 red>
    頭上に 名前 という文字列を、右24ドット・下12ドットずらして、
    文字の縁取りを赤色にして表示します。

2.プラグインコマンド:
  namePop 1 名前 -12,-48
    ネームポップを左12ドット・上48ドットずらして表示します。

@param backOpacity
@text 背景不透明度
@desc ネームポップの背景の不透明度。 初期値: 96 ( 0 ～ 255 )
@default 96

@param fontSize
@text フォントサイズ
@desc ネームポップのフォントサイズ。 初期値: 20
@default 20

@param outlineWidth
@text 縁取り太さ
@desc ネームポップの縁取りの太さ。 初期値: 4
@default 4

@param outlineColor
@text 縁取り色
@desc ネームポップの縁取りの色。 初期値: rgba(0, 0, 0, 0.5)
@default rgba(0, 0, 0, 0.5)

@param width
@text ネームポップ幅
@desc ネームポップの幅 初期値: 160
@default 160

@param roundRectRadius
@text TMBitmapEx.js導入時の半径
@desc TMBitmapEx.js導入時の、角丸矩形の丸部分の半径。 初期値: 6
@default 6
*/

var Imported = Imported || {};
Imported.TMNamePop = true;

var TMPlugin = TMPlugin || {};
TMPlugin.NamePop = {};
TMPlugin.NamePop.Parameters = PluginManager.parameters('TMNamePop');
TMPlugin.NamePop.BackOpacity = +(TMPlugin.NamePop.Parameters['backOpacity'] || 96);
TMPlugin.NamePop.FontSize = +(TMPlugin.NamePop.Parameters['fontSize'] || 20);
TMPlugin.NamePop.OutlineWidth = +(TMPlugin.NamePop.Parameters['outlineWidth'] || 4);
TMPlugin.NamePop.OutlineColor = TMPlugin.NamePop.Parameters['outlineColor'] || 'rgba(0, 0, 0, 0.5)';
TMPlugin.NamePop.Width = +(TMPlugin.NamePop.Parameters['width'] || 160);
TMPlugin.NamePop.RoundRectRadius = +(TMPlugin.NamePop.Parameters['roundRectRadius'] || 6);


if (!TMPlugin.EventBase) {
  TMPlugin.EventBase = true;
  (function () {

    var _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function () {
      _Game_Event_setupPage.call(this);
      if (this._pageIndex >= 0) this.loadCommentParams();
    };

    Game_Event.prototype.loadCommentParams = function () {
      this._commentParams = {};
      var re = /<([^<>:]+)(:?)([^>]*)>/g;
      var list = this.list();
      for (var i = 0; i < list.length; i++) {
        var command = list[i];
        if (command && command.code == 108 || command.code == 408) {
          for (; ;) {
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

    Game_Event.prototype.loadTagParam = function (paramName) {
      return this._commentParams[paramName] || this.event().meta[paramName];
    };

  })();
} // TMPlugin.EventBase

if (!TMPlugin.InterpreterBase) {
  TMPlugin.InterpreterBase = true;
  (function () {

    Game_Interpreter.prototype.convertEscapeCharactersTM = function (text) {
      text = text.replace(/\\/g, '\x1b');
      text = text.replace(/\x1b\x1b/g, '\\');
      text = text.replace(/\x1bV\[(\d+)\]/gi, function () {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bV\[(\d+)\]/gi, function () {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bN\[(\d+)\]/gi, function () {
        return this.actorNameTM(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bP\[(\d+)\]/gi, function () {
        return this.partyMemberNameTM(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
      return text;
    };

    Game_Interpreter.prototype.actorNameTM = function (n) {
      var actor = n >= 1 ? $gameActors.actor(n) : null;
      return actor ? actor.name() : '';
    };

    Game_Interpreter.prototype.partyMemberNameTM = function (n) {
      var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
      return actor ? actor.name() : '';
    };

  })();
} // TMPlugin.InterpreterBase

(function () {

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //

  // Game_CharacterBase.prototype.setNamePop = function(namePop, shiftY) {
  Game_CharacterBase.prototype.setNamePop = function (namePop, shiftArr) {
    if (namePop) {
      namePop = $gameMap._interpreter.convertEscapeCharactersTM(namePop);
    }
    this._namePop = namePop;

    this._namePopX = 0;
    this._namePopY = 0;
    if (shiftArr.length === 1) {
      this._namePopY = shiftArr[0] || 0;
    }
    if (shiftArr.length === 2) {
      this._namePopX = shiftArr[0] || 0;
      this._namePopY = shiftArr[1] || 0;
    }
  };

  Game_CharacterBase.prototype.namePopOutlineColor = function () {
    return this._namePopOutlineColor || TMPlugin.NamePop.OutlineColor;
  };

  Game_CharacterBase.prototype.setNamePopOutlineColor = function (outlineColor) {
    this._namePopOutlineColor = outlineColor;
  };

  Game_CharacterBase.prototype.requestNamePop = function () {
    this._requestNamePop = true;
  };

  Game_CharacterBase.prototype.onChangeNamePop = function () {
    this._requestNamePop = false;
  };

  Game_CharacterBase.prototype.isNamePopRequested = function () {
    return this._requestNamePop;
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //

  var _Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function () {
    _Game_Event_setupPage.call(this);
    if (this._pageIndex >= 0) {
      var namePop = this.loadTagParam('namePop');
      if (namePop) {
        var arr = namePop.split(' ');
        // this.setNamePop(arr[0], arr[1]);

        var shiftArr = [];
        if (arr[1]) {
          shiftArr = arr[1].split(',');
        }
        this.setNamePop(arr[0], shiftArr);

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
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'namePop') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var character = this.character(+arr[0]);
      if (character) {
        // character.setNamePop(args[1], arr[2]);

        var shiftArr = [];
        if (arr[2]) {
          shiftArr = arr[2].split(',');
        }
        character.setNamePop(args[1], shiftArr);

        character.setNamePopOutlineColor(arr[3]);
        character.requestNamePop();
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_Character
  //

  var _Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function () {
    _Sprite_Character_update.call(this);
    this.updateNamePop();
  };

  Sprite_Character.prototype.updateNamePop = function () {
    if (this._character.isNamePopRequested() ||
      this._namePop !== this._character._namePop) {
      this._character.onChangeNamePop();
      this._namePop = this._character._namePop;
      if (this._namePop) {
        if (!this._namePopSprite) {
          this._namePopSprite = new Sprite_NamePop();
          this.addChild(this._namePopSprite);
          this._namePopSprite.x = this.namePopShiftX();
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

  Sprite_Character.prototype.namePopShiftX = function () {
    return this._character._namePopX;
  };

  Sprite_Character.prototype.namePopShiftY = function () {
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

  Sprite_NamePop.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.bitmap = new Bitmap(TMPlugin.NamePop.Width, TMPlugin.NamePop.FontSize + 4);
    this.bitmap.fontSize = TMPlugin.NamePop.FontSize;
    this.bitmap.outlineWidth = TMPlugin.NamePop.OutlineWidth;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
  };

  Sprite_NamePop.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.x = this.parent.namePopShiftX();
    this.y = this.parent.namePopShiftY();
  };

  Sprite_NamePop.prototype.refresh = function (text, outlineColor) {
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

  Sprite_NamePop.prototype.convertEscapeCharacters = function (text) {
    text = text.replace(/\x1bC\[(\d+)\]/gi, function () {
      this.bitmap.textColor = this.textColor(arguments[1]);
      return '';
    }.bind(this));
    return text;
  };

  Sprite_NamePop.prototype.textColor = function (n) {
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    var windowskin = ImageManager.loadSystem('Window');
    return windowskin.getPixel(px, py);
  };

})();