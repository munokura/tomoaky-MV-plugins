//=============================================================================
// TMPlugin - USG_Matter.js拡張
// バージョン: 1.1.1
// 最終更新日: 2017/10/05
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc ふしぎうさぎ様の USG_Matter.js を各種パラメータの
 * 設定ができるように拡張します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param gravityX
 * @type number
 * @min -100
 * @decimals 2
 * @desc 横方向の重力
 * 初期値: 0
 * @default 0
 *
 * @param gravityY
 * @type number
 * @min -100
 * @decimals 2
 * @desc 縦方向の重力
 * 初期値: 0
 * @default 0
 *
 * @param maxSpeed
 * @type number
 * @decimals 2
 * @desc 最高速度の補正倍率
 * 初期値: 1
 * @default 1
 * 
 * @param controlType
 * @type select
 * @option FLICK
 * @option FREE
 * @desc 操作タイプを設定する
 * 初期値: FLICK ( FLICK / FREE )
 * @default FLICK
 * 
 * @param eventControl
 * @type boolean
 * @desc イベントを操作できるかどうか
 * 初期値: OFF ( false = OFF 操作不可 / true = ON 操作可能 )
 * @default false
 * 
 * @param flickCommonEvent
 * @type common_event
 * @desc フリック操作時に実行するコモンイベント
 * 初期値: 0
 * @default 0
 * 
 * @param seFlick
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc フリック操作の効果音
 * 初期値: Wind4
 * @default Wind4
 * 
 * @requiredAssets img/system/SwipeArrow
 * 
 * @help
 * TMPlugin - USG_Matter.js拡張 ver1.0.0
 *
 * 使い方:
 * 
 *   ツクマテにてふしぎうさぎ様が公開されている USG_Matter.js を拡張します。
 *   http://tm.lucky-duet.com/viewtopic.php?t=4387
 * 
 *   この拡張プラグインは tomoaky が個人的に作成したものです、不具合修正などの
 *   サポートを元プラグイン作者のふしぎうさぎ様に求めるようなことは
 *   絶対にしないでください。
 * 
 *   プラグインコマンドはありません。
 *
 *   このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。
 * 
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 */

var Imported = Imported || {};
Imported.TMMatterEx = true;

var parameters = PluginManager.parameters('TMMatterEx');
var gravityX = +(parameters['gravityX'] || 0);
var gravityY = +(parameters['gravityY'] || 0);
var maxSpeed = +(parameters['maxSpeed'] || 1);
var controlType = parameters['controlType'] || 'FLICK';
var eventControl = JSON.parse(parameters['eventControl']);
var flickCommonEvent = +(parameters['flickCommonEvent'] || 0);
var seFlick = parameters['seFlick'] || 'Wind4';

(function() {

  //-----------------------------------------------------------------------------
  // Game_Temp
  //

  Game_Temp.prototype.isDestinationValid = function() {
    return false;
  };

  //-----------------------------------------------------------------------------
  // Game_Map
  //

  Game_Map.prototype.gravityX = function() {
    return gravityX;
  };

  Game_Map.prototype.gravityY = function() {
    return gravityY;
  };

  Game_Map.prototype.matterControlType = function() {
    if (this._matterControlType != null) return this._matterControlType;
    return controlType;
  };

  Game_Map.prototype.matterEventControl = function() {
    if (this._matterEventControl != null) return this._matterEventControl;
    return eventControl;
  };

  Game_Map.prototype.activeMatterEvent = function() {
    if (this._matterMapId !== this.mapId()) {
      this._activeMatterEventId = null;
    }
    switch (this._activeMatterEventId) {
    case null:
      return null;
    case -1:
      return $gamePlayer;
    default:
      return this.event(this._activeMatterEventId);
    }
  };

  Game_Map.prototype.setActiveMatterEventId = function(eventId) {
    this._activeMatterEventId = eventId;
    this._matterMapId = this.mapId();
  };

  //-----------------------------------------------------------------------------
  // Game_Character
  //

  Game_Character.prototype.screenAngle = function() {
    return this._angle;
  };

  var _Game_Character_update = Game_Character.prototype.update;
  Game_Character.prototype.update = function() {
    if (this.body) this._angle = this.body._body.angle;
    _Game_Character_update.call(this);
  };

  var _Game_Character_bodyData = Game_Character.prototype.bodyData;
  Game_Character.prototype.bodyData = function() {
    var data = _Game_Character_bodyData.call(this);
    var meta = this.metaData();
    if (meta.rotate) data.option.inertia = 0;
    return data;
  };

  var _Game_Character_maxSpeed = Game_Character.prototype.maxSpeed;
  Game_Character.prototype.maxSpeed = function() {
    return _Game_Character_maxSpeed.call(this) * maxSpeed;
  };

  Game_Character.prototype.addVelocityToPosition = function(
      realX, realY, commonEventId, seFileName) {
    var x = realX - (this._realX + 0.5);
    var y = realY - (this._realY + 0.5);
    var rad = Math.atan2(y, x);
    var distance = (x * x + y * y);
    var vx = Math.cos(rad) * distance;
    var vy = Math.sin(rad) * distance;
    this.body.addVelocity(vx, vy);
    this.setFront(vx, vy);
    this.resetStopCount();
    if (commonEventId) $gameTemp.reserveCommonEvent(commonEventId);
    if (seFileName) {
      var power = distance.clamp(10, 30);
      AudioManager.playSe({
        name: seFileName,
        volume: 90 - power,
        pitch: power * 5,
        pan: 0
      });
    }
  };

  Game_Character.prototype.moveFlick = function() {
    this.addVelocityToPosition(TouchInput.x / $gameMap.tileWidth(),
                               TouchInput.y / $gameMap.tileHeight(),
                               flickCommonEvent,
                               seFlick);
  };

  Game_Character.prototype.moveFree = function() {
    this.addVelocityToPosition(TouchInput.x / $gameMap.tileWidth(),
                               TouchInput.y / $gameMap.tileHeight(),
                               0,
                               null);
  };

  //-----------------------------------------------------------------------------
  // Game_Player
  //

  Game_Player.prototype.moveByInput = function() {
  };

  //-----------------------------------------------------------------------------
  // Sprite_Character
  //

  var _Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
  Sprite_Character.prototype.initMembers = function() {
    _Sprite_Character_initMembers.call(this);
    this.anchor.y = 0.5;
  };

  var _Sprite_Character_updatePosition = Sprite_Character.prototype.updatePosition;
  Sprite_Character.prototype.updatePosition = function() {
    _Sprite_Character_updatePosition.call(this);
    this.y -= 0.5 * $gameMap.tileHeight();
    var rotation = this._character.screenAngle();
    if (rotation != null) this.rotation = rotation;
  };

  //-----------------------------------------------------------------------------
  // Sprite_Balloon
  //

  var _Sprite_Balloon_initMembers = Sprite_Balloon.prototype.initMembers;
  Sprite_Balloon.prototype.initMembers = function() {
    _Sprite_Balloon_initMembers.call(this);
    this.anchor.y = 0.5;
  };

  //-----------------------------------------------------------------------------
  // Sprite_SwipeArrow
  //

  function Sprite_SwipeArrow() {
    this.initialize.apply(this, arguments);
  }

  Sprite_SwipeArrow.prototype = Object.create(Sprite_Base.prototype);
  Sprite_SwipeArrow.prototype.constructor = Sprite_SwipeArrow;

  Sprite_SwipeArrow.prototype.initialize = function() {
    Sprite_Base.prototype.initialize.call(this);
    this.bitmap = ImageManager.loadSystem('SwipeArrow');
    this.anchor.y = 0.5;
    this.z = 4;
    this.opacity = 160;
  };

  Sprite_SwipeArrow.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    var matterEvent = $gameMap.activeMatterEvent();
    if (matterEvent) {
      this.visible = true;
      this.x = (matterEvent._realX + 0.5) * $gameMap.tileWidth();
      this.y = (matterEvent._realY + 0.5) * $gameMap.tileHeight();
      var dx = TouchInput.x - this.x;
      var dy = TouchInput.y - this.y;
      if (dx !== 0 || dy !== 0) {
        this.rotation = Math.atan2(dy, dx);
      }
      this.scale.x = Math.sqrt(dx * dx + dy * dy) / 64;
    } else {
      this.visible = false;
    }
  };

  //-----------------------------------------------------------------------------
  // Spriteset_Map
  //

  var _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    _Spriteset_Map_createLowerLayer.call(this);
    if ($gameMap.matterControlType() === 'FLICK') this.createSwipeArrow();
  };

  Spriteset_Map.prototype.createSwipeArrow = function() {
    this._swipeArrowSprite = new Sprite_SwipeArrow();
    this._tilemap.addChild(this._swipeArrowSprite);
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this);
    this.updateMatterControl();
  };

  Scene_Map.prototype.updateMatterControl = function() {
    if ($gameMap.isEventRunning() || $gameMessage.isBusy()) {
      $gameMap.setActiveMatterEventId(null);
      return;
    }
    if ($gameMap.matterControlType() === 'FLICK') {
      this.updateMatterFlick();
    } else {
      this.updateMatterFree();
    }
  };

  Scene_Map.prototype.updateMatterFlick = function() {
    var matterEvent = $gameMap.activeMatterEvent();
    if (matterEvent) {
      if (!TouchInput.isPressed()) {
        matterEvent.moveFlick();
        $gameMap.setActiveMatterEventId(null);
      }
    } else {
      if (TouchInput.isTriggered()) {
        var x = TouchInput.x / $gameMap.tileWidth();
        var y = TouchInput.y / $gameMap.tileHeight();
        var events = $gameMap.pointCharacters({x: x, y: y}, false);
        for (var i = 0; i < events.length; i++) {
          if (events[i].constructor === Game_Player) {
            $gameMap.setActiveMatterEventId(-1);
            break;
          } else if ($gameMap.matterEventControl()) {
            $gameMap.setActiveMatterEventId(events[i].eventId());
            break;
          }
        }
      }
    }
  };

  Scene_Map.prototype.updateMatterFree = function() {
    var matterEvent = $gameMap.activeMatterEvent();
    if (matterEvent) {
      if (TouchInput.isPressed()) {
        matterEvent.moveFree();
      } else {
        $gameMap.setActiveMatterEventId(null);
      }
    } else {
      if (TouchInput.isTriggered()) {
        var x = TouchInput.x / $gameMap.tileWidth();
        var y = TouchInput.y / $gameMap.tileHeight();
        var events = $gameMap.pointCharacters({x: x, y: y}, false);
        for (var i = 0; i < events.length; i++) {
          if (events[i].constructor === Game_Player) {
            $gameMap.setActiveMatterEventId(-1);
            break;
          } else if ($gameMap.matterEventControl()) {
            $gameMap.setActiveMatterEventId(events[i].eventId());
            break;
          }
        }
      }
    }
  };

})();