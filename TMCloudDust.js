//=============================================================================
// TMPlugin - つちけむり
// バージョン: 2.1.0
// 最終更新日: 2017/08/10
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc ジャンプとダッシュに土煙のエフェクトを追加します。
 * 任意のタイミングで土煙を表示することもできます。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param dustImage
 * @desc 土煙として利用する画像ファイル名。
 * 初期値: Dust1
 * @default Dust1
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param maxDusts
 * @type number
 * @desc 同時に表示できるスプライトの数。
 * 初期値: 64
 * @default 64
 *
 * @param jumpDusts
 * @type number
 * @desc ジャンプの着地時に表示するスプライト数。
 * 初期値: 5
 * @default 5
 *
 * @param dashDusts
 * @type number
 * @desc ダッシュ時に表示するスプライト数。
 * 初期値: 3
 * @default 3
 *
 * @help
 * TMPlugin - つちけむり ver2.1.0
 * 
 * 使い方:
 *
 *   プラグインと一緒に配布している土煙の画像を img/system フォルダに
 *   保存してください。ファイル名は Dust1.png となっています。
 *   ファイル名を変更しなければならない場合はプラグインパラメータの
 *   dustImage も一緒に変更してください。
 *
 *   プラグインを有効にすると、キャラクターがジャンプ後に着地したタイミング
 *   で土煙が表示されるようになります。
 *   また、プレイヤーがダッシュ（shiftキー押しながら or クリック）で移動する
 *   ときにも土煙が表示されます。
 *
 *   プラグインコマンドを使用することによって任意のタイミングで指定した座標
 *   に土煙を表示することもできます。
 *
 *   このプラグインは RPGツクールMV Version 1.5.0 で動作確認をしています。
 *
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 * 
 *
 * プラグインコマンド:
 *
 *   setDustXy 5 8
 *     指定した座標に土煙を表示します。数値はイベントコマンド『場所移動』で
 *     利用する座標と同じです、画面のドット数ではありません。
 *     setDustXy 5.5 8 のように小数点以下を入力することによって座標(5, 8)と
 *     座標(6, 8)の中間を指定することもできます。
 *
 *   setDustXy 5 8 3
 *     指定した座標に土煙を 3 つ表示します。設定が省略された場合は 1 つしか
 *     表示されません。
 *
 *   setDustXy 5 8 1 0.04
 *     表示する土煙の移動速度を設定します。設定が省略された場合は 0.02 が
 *     適用されます。
 *
 *   setDustXy 5 8 1 0.02 3.14
 *     表示する土煙の移動方向を限定します。数値は右を 0 として、時計回りに
 *     6.28 で 1 周となります。
 *     上記のように3.14を指定した場合は土煙が左に向かって少し移動します。
 *
 *   setDustEvent 3
 *     イベント 3 番の足元に土煙を表示します。0 を指定した場合はコマンドを
 *     実行しているイベント自体が、-1 を指定した場合はプレイヤーが対象に
 *     なります。
 *     setDustXy と同様に土煙の数や移動方向、移動速度も指定できます。
 *     イベント番号に続けて、土煙の数、移動速度、移動方向の順に数値を
 *     足していってください。
 * 
 *   setJumpDusts 5
 *     ジャンプの着地時に表示するスプライト数を指定した値に変更します。
 * 
 *   setDashDusts 3
 *     ダッシュ時に表示するスプライト数を指定した値に変更します。
 * 
 *   stopDust
 *     新しい土煙が表示できなくなります。
 *     すでに表示されている土煙には影響しません。
 * 
 *   startDust
 *     stopDust の効果を解除し、新しい土煙を表示できるようにします。
 *
 *   コマンドに続くパラメータは、途中のものだけを省略することができません。
 *   移動方向を指定する場合は個数と移動速度も指定する必要があります。
 *
 *
 * プラグインパラメータ補足:
 *
 *   dustImage
 *     土煙の画像ファイル名を拡張子抜きで指定します。ファイルは img/system
 *     フォルダに保存してください。
 *
 *   maxDusts
 *     このパラメータに指定した数を超える土煙を同時に表示しようとした場合は
 *     何も表示されず、プラグインコマンドは無視されます。
 *     数値を大きくすればたくさんの土煙を表示することができますが、それだけ
 *     処理が重くなり、低スペック環境ではFPSが低下する原因になります。
 *
 *   jumpDusts
 *     キャラクターをイベントコマンド『移動ルートの設定』などでジャンプ
 *     させた後、着地の際に表示する土煙の数です。数値の分だけ土煙が重なり、
 *     より濃い土煙になります。
 *     0 を指定すれば着地時の土煙は表示されなくなります。
 * 
 *   dashDusts
 *     プレイヤーがダッシュで移動した際に表示する土煙の数です。数値の分だけ
 *     土煙が重なり、より濃い土煙になります。
 *     0 を指定すればダッシュ時の土煙は表示されなくなります。
 * 
 */

var Imported = Imported || {};
Imported.TMCloudDust = true;

var TMPlugin = TMPlugin || {};
TMPlugin.CloudDust = {};
TMPlugin.CloudDust.Parameters = PluginManager.parameters('TMCloudDust');
TMPlugin.CloudDust.DustImage = TMPlugin.CloudDust.Parameters['dustImage'] || Dust1;
TMPlugin.CloudDust.MaxDusts = +(TMPlugin.CloudDust.Parameters['maxDusts'] || 64);
TMPlugin.CloudDust.JumpDusts = +(TMPlugin.CloudDust.Parameters['jumpDusts'] || 5);
TMPlugin.CloudDust.DashDusts = +(TMPlugin.CloudDust.Parameters['dashDusts'] || 3);

function Game_CloudDust() {
  this.initialize.apply(this, arguments);
}

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
  // Game_System
  //

  Game_System.prototype.jumpDusts = function() {
    if (this._jumpDusts != null) return this._jumpDusts;
    return TMPlugin.CloudDust.JumpDusts;
  };

  Game_System.prototype.dashDusts = function() {
    if (this._dashDusts != null) return this._dashDusts;
    return TMPlugin.CloudDust.DashDusts;
  };

  Game_System.prototype.setJumpDusts = function(n) {
    this._jumpDusts = n;
  };

  Game_System.prototype.setDashDusts = function(n) {
    this._dashDusts = n;
  };

  Game_System.prototype.isDustEnabled = function() {
    if (this._dustEnabled == null) this._dustEnabled = true;
    return this._dustEnabled;
  };

  Game_System.prototype.enableDust = function() {
    this._dustEnabled = true;
  };

  Game_System.prototype.disableDust = function() {
    this._dustEnabled = false;
  };

  //-----------------------------------------------------------------------------
  // Game_Map
  //

  var _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    this.setupCloudDusts();
  };

  Game_Map.prototype.setupCloudDusts = function() {
    this._cloudDusts = [];
    for (var i = 0; i < TMPlugin.CloudDust.MaxDusts; i++) {
      this._cloudDusts.push(new Game_CloudDust());
    }
  };

  Game_Map.prototype.cloudDusts = function() {
    return this._cloudDusts;
  };
  
  Game_Map.prototype.addCloudDust = function(x, y, speed, radian) {
    if (!$gameSystem.isDustEnabled()) return;
    for (var i = 0; i < TMPlugin.CloudDust.MaxDusts; i++) {
      if (!this._cloudDusts[i].exists()) {
        this._cloudDusts[i].setup(x, y, speed, radian);
        break;
      }
    }
  };

  var _Game_Map_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function(sceneActive) {
    _Game_Map_update.call(this, sceneActive);
    this.updateCloudDusts();
  };

  Game_Map.prototype.updateCloudDusts = function() {
    this.cloudDusts().forEach(function(cloudDust) {
      cloudDust.update();
    });
  };
  
  //-----------------------------------------------------------------------------
  // Game_CloudDust
  //

  Game_CloudDust.prototype.initialize = function() {
    this._x = 0;
    this._y = 0;
    this._count = 0;
    this._scale = new Point(1.0, 1.0);
  };

  Game_CloudDust.prototype.setup = function(x, y, speed, radian) {
    this._x = +x;
    this._y = +y;
    this._opacity = 180;
    this._count = 30;
    if (radian != null) {
      radian = +radian + Math.random() * 1.5 - 0.75;
    } else {
      radian = Math.random() * Math.PI * 2;
    }
    speed = +(speed || 0.02);
    this._vx = Math.cos(radian) * speed;
    this._vy = Math.sin(radian) * speed;
    this._rotation = radian;
    this._scale.x = 1.0;
    this._scale.y = 1.0;
  };

  Game_CloudDust.prototype.screenX = function() {
    var tw = $gameMap.tileWidth();
    return Math.round($gameMap.adjustX(this._x) * tw);
  };

  Game_CloudDust.prototype.screenY = function() {
    var th = $gameMap.tileHeight();
    return Math.round($gameMap.adjustY(this._y) * th);
  };

  Game_CloudDust.prototype.opacity = function() {
    return this._opacity;
  };

  Game_CloudDust.prototype.rotation = function() {
    return this._rotation;
  };

  Game_CloudDust.prototype.scale = function() {
    return this._scale;
  };

  Game_CloudDust.prototype.exists = function() {
    return this._count > 0;
  };

  Game_CloudDust.prototype.update = function() {
    if (this._count > 0) {
      this._count--;
      this._x += this._vx;
      this._y += this._vy;
      this._vy -= 0.0008;
      this._opacity -= 6;
      this._scale.x += 0.02;
      this._scale.y += 0.02;
    }
  };

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //

  Game_CharacterBase.prototype.addCloudDust = function(speed, radian) {
    $gameMap.addCloudDust(this._realX + 0.5, this._realY + 1.0, speed, radian);
  };

  var _Game_CharacterBase_updateJump = Game_CharacterBase.prototype.updateJump;
  Game_CharacterBase.prototype.updateJump = function() {
    _Game_CharacterBase_updateJump.call(this);
    if (this._jumpCount === 0) {
      for (var i = 0; i < $gameSystem.jumpDusts(); i++) {
        this.addCloudDust(0.02, i % 2 * Math.PI);
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Player
  //

  var _Game_Player_moveStraight = Game_Player.prototype.moveStraight;
  Game_Player.prototype.moveStraight = function(d) {
    var n = $gameSystem.dashDusts();
    if (n > 0) {
      if (this.isDashing() && this.canPass(this.x, this.y, d)) {
        if (d === 2) {
          var radian = Math.PI * 1.5;
        } else if (d === 4) {
          var radian = 0;
        } else if (d === 6) {
          var radian = Math.PI;
        } else {
          var radian = Math.PI / 2;
        }
        for (var i = 0; i < n; i++) {
          this.addCloudDust(0.03, radian);
        }
      }
    }
    _Game_Player_moveStraight.call(this, d);
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'setDustXy') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var n = parseInt(arr[2] || 1);
      for (var i = 0; i < n; i++) {
        $gameMap.addCloudDust(arr[0], arr[1], arr[3], arr[4]);
      }
    } else if (command === 'setDustEvent') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var character = this.character(+arr[0]);
      if (character) {
        var n = parseInt(arr[1] || 1);
        for (var i = 0; i < n; i++) {
          character.addCloudDust(arr[2], arr[3]);
        }
      }
    } else if (command === 'setJumpDusts') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      $gameSystem.setJumpDusts(+arr[0]);
    } else if (command === 'setDashDusts') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      $gameSystem.setDashDusts(+arr[0]);
    } else if (command === 'stopDust') {
      $gameSystem.disableDust();
    } else if (command === 'startDust') {
      $gameSystem.enableDust();
    }
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_CloudDust
  //

  function Sprite_CloudDust() {
    this.initialize.apply(this, arguments);
  }

  Sprite_CloudDust.prototype = Object.create(Sprite.prototype);
  Sprite_CloudDust.prototype.constructor = Sprite_CloudDust;

  Sprite_CloudDust.prototype.initialize = function(cloudDust) {
    Sprite.prototype.initialize.call(this);
    this._cloudDust = cloudDust;
    this.scale = this._cloudDust.scale();
    this.visible = false;
    this.createBitmap();
  };

  Sprite_CloudDust.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._cloudDust.exists()) {
      this.visible = true;
      this.x = this._cloudDust.screenX();
      this.y = this._cloudDust.screenY();
      this.opacity = this._cloudDust.opacity();
      this.rotation = this._cloudDust.rotation();
    } else {
      this.visible = false;
    }
  };

  Sprite_CloudDust.prototype.createBitmap = function() {
    this.bitmap = ImageManager.loadSystem(TMPlugin.CloudDust.DustImage);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.z = 3;
  };

  //-----------------------------------------------------------------------------
  // Spriteset_Map
  //

  var _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    _Spriteset_Map_createLowerLayer.call(this);
    this.createCloudDust();
  };

  Spriteset_Map.prototype.createCloudDust = function() {
    this._cloudDustSprites = [];
    $gameMap.cloudDusts().forEach(function(cloudDust) {
      this._cloudDustSprites.push(new Sprite_CloudDust(cloudDust));
    }, this);
    for (var i = 0; i < this._cloudDustSprites.length; i++) {
      this._tilemap.addChild(this._cloudDustSprites[i]);
    }
  };
  
})();
