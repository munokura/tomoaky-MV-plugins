//=============================================================================
// TMPlugin - アニメ付き明かり
// バージョン: 2.0.1
// 最終更新日: 2016/12/02
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc イベントにアニメーション付きの明かりを表示します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param range
 * @desc アニメーションの大きさ。
 * 初期値: 0.1 ( 0.1 でプラスマイナス 10% の拡大縮小アニメ)
 * @default 0.1
 *
 * @param defaultZ
 * @desc アニメーションのＺ座標。
 * 初期値: 4
 * @default 4
 *
 * @param frames
 * @desc アニメーションにかけるフレーム数。
 * 初期値: 30
 * @default 30
 *
 * @help
 * 準備:
 *
 *   プラグインと一緒に配布している明かり画像を img/system フォルダに
 *   保存してください。ファイル名は自由に変更可能です。
 *   使用する画像はどんなものでもかまいません、イベントごとに違う画像を
 *   表示することもできます。
 *
 *
 * 使い方:
 *
 *   イベントのメモ欄に <animeLight:ファイル名> というタグを書き込めば、
 *   明かりが表示されるようになります。
 *
 *   明かりの位置もタグを使って調整することができます。
 *
 *   このプラグインは RPGツクールMV Version 1.3.4 で動作確認をしています。
 *
 *
 * メモ欄（イベント）タグ:
 *
 *   <animeLight:TMAnimeLight1 192 24 -44 4>
 *     画像 TMAnimeLight1.png を不透明度 192 で、イベントの足元から右に 24、
 *     上に 44 ドットずらした位置にＺ座標 4 で表示します。
 *     不透明度の最大値は 255 です。
 *
 *   イベントのメモ欄以外に、実行内容の一番上にある注釈コマンド内でも
 *   同様のタグで名前を設定することができます。
 *   メモ欄と注釈の両方にタグがある場合は注釈が優先されます。
 *
 *
 * プラグインコマンド:
 *
 *   animeLight 1 TMAnimeLight1 255 0 -44 4
 *     イベント 1 番に明かりを適用します。
 *     イベント番号、ファイル名、不透明度、Ｘ座標補正、Ｙ座標補正、Ｚ座標
 *     の順に設定してください。
 *     Ｚ座標を省略した場合はプラグインパラメータ animeLightZ の値を
 *     使用します。
 *
 *   animeLight 1
 *     イベント 1 番の明かりを削除します。
 *
 *   イベント番号（ひとつ目の数値）は以下の規則にしたがって対象を指定します。
 *     -1     … プレイヤーを対象にする
 *     0      … コマンドを実行しているイベントを対象にする
 *     1 以上 … その番号のイベントを対象にする
 *
 *
 * おまけ機能:
 *
 *   メモ欄タグ、注釈、プラグインコマンドすべてに共通で、Ｚ座標のあとに
 *   1 という数値を付与することでアニメーションのない画像を表示できます。
 *   例: <animeLight:TMAnimeLight1 192 0 0 4 1>
 *   この場合Ｚ座標を省略することはできません。
 *
 *
 * プラグインパラメータ補足:
 *
 *   defaultZ
 *     明かりの描画順を設定します、これによりイベントよりも下に表示するか
 *     上に表示するかが決まります。
 *     0 … プライオリティ『通常キャラの下』より下
 *     2 … プライオリティ『通常キャラと同じ』より下
 *     4 … プライオリティ『通常キャラと同じ』より上
 *     6 … プライオリティ『通常キャラの上』より上
 */

var Imported = Imported || {};
Imported.TMAnimeLight = true;

var TMPlugin = TMPlugin || {};
TMPlugin.AnimeLight = {};
TMPlugin.AnimeLight.Parameters = PluginManager.parameters('TMAnimeLight');
TMPlugin.AnimeLight.Range = +(TMPlugin.AnimeLight.Parameters['range'] || 0.1);
TMPlugin.AnimeLight.DefaultZ = +(TMPlugin.AnimeLight.Parameters['defaultZ'] || 4);
TMPlugin.AnimeLight.Frames = +(TMPlugin.AnimeLight.Parameters['frames'] || 30);

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
  // Game_Temp
  //
  
  var _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.call(this);
    this.createAnimeLightSinTable();
  };

  Game_Temp.prototype.createAnimeLightSinTable = function() {
    this._animeLightSinTable = [];
    for (var i = 0; i < TMPlugin.AnimeLight.Frames; i++) {
      this._animeLightSinTable[i] = Math.sin(Math.PI * i / (TMPlugin.AnimeLight.Frames / 2)) *
                                    TMPlugin.AnimeLight.Range + 1;
    }
  };
  
  Game_Temp.prototype.animeLightSin = function(index) {
    return this._animeLightSinTable[index];
  };
  
  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //

  Game_CharacterBase.prototype.requestAnimeLight = function() {
    this._requestAnimeLight = true;
  };

  Game_CharacterBase.prototype.onChangeAnimeLight = function() {
    this._requestAnimeLight = false;
  };

  Game_CharacterBase.prototype.isAnimeLightRequested = function() {
    return this._requestAnimeLight;
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //

  var _Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function() {
    _Game_Event_setupPage.call(this);
    if (this._pageIndex >= 0) {
      var animeLight = this.loadTagParam('animeLight');
      if (animeLight) {
        var arr = animeLight.split(' ');
        this._animeLight = arr[0];
        this._animeLightOpacity = arr[1] || 255;
        this._animeLightShiftX  = arr[2] || 0;
        this._animeLightShiftY  = arr[3] || 0;
        this._animeLightZ       = arr[4] || TMPlugin.AnimeLight.DefaultZ;
        this._animeLightNone    = arr[5] === '1';
      }
    } else {
      this._animeLight = '';
      this._animeLightOpacity = 255;
      this._animeLightShiftX = 0;
      this._animeLightShiftY = 0;
      this._animeLightZ = TMPlugin.AnimeLight.DefaultZ;
      this._animeLightNone = false;
    }
    this.requestAnimeLight();
  };
  
  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'animeLight') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var character = this.character(+arr[0]);
      if (character) {
        character._animeLight = arr[1];
        character._animeLightOpacity = arr[2] || 255;
        character._animeLightShiftX  = arr[3] || 0;
        character._animeLightShiftY  = arr[4] || 0;
        character._animeLightZ       = arr[5] || TMPlugin.AnimeLight.DefaultZ;
        character._animeLightNone    = arr[6] === '1';
        character.requestAnimeLight();
      }
    }
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_Character
  //

  var _Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function() {
    _Sprite_Character_update.call(this);
    this.updateAnimeLight();
  };

  Sprite_Character.prototype.updateAnimeLight = function() {
    if (this._character.isAnimeLightRequested() ||
        this._animeLight !== this._character._animeLight) {
      this._character.onChangeAnimeLight();
      this._animeLight = this._character._animeLight;
      if (this._animeLight) {
        if (!this._animeLightSprite) {
          this._animeLightSprite = new Sprite_AnimeLight(this);
          this.parent.addChild(this._animeLightSprite);
        }
        this._animeLightSprite.refresh(this._animeLight);
      } else {
        this.parent.removeChild(this._animeLightSprite);
        this._animeLightSprite = null;
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_AnimeLight
  //

  function Sprite_AnimeLight() {
    this.initialize.apply(this, arguments);
  }

  Sprite_AnimeLight.prototype = Object.create(Sprite.prototype);
  Sprite_AnimeLight.prototype.constructor = Sprite_AnimeLight;

  Sprite_AnimeLight.prototype.initialize = function(characterSprite) {
    Sprite.prototype.initialize.call(this);
    this._characterSprite = characterSprite;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.blendMode = 1;
    this._animeCount = 0;
  };

  Sprite_AnimeLight.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.x = this._characterSprite.x + this._shiftX;
    this.y = this._characterSprite.y + this._shiftY;
    if (!this._characterSprite._character._animeLightNone) {
      this._animeCount++;
      if (this._animeCount === TMPlugin.AnimeLight.Frames) this._animeCount = 0;
      var n = $gameTemp.animeLightSin(this._animeCount);
      this.scale.set(n, n);
    }
  };

  Sprite_AnimeLight.prototype.refresh = function(fileName) {
    this.bitmap = ImageManager.loadSystem(fileName);
    this.opacity = +this._characterSprite._character._animeLightOpacity;
    this._shiftX = +this._characterSprite._character._animeLightShiftX;
    this._shiftY = +this._characterSprite._character._animeLightShiftY;
    this.x = this._characterSprite.x + this._shiftX;
    this.y = this._characterSprite.y + this._shiftY;
    this.z = +this._characterSprite._character._animeLightZ;
  };
  
})();
