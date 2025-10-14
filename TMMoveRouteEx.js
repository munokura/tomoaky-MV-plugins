//=============================================================================
// TMVplugin - 自律移動拡張
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.1
// 最終更新日: 2016/04/12
//=============================================================================
/*:
@plugindesc Adds a new autonomous movement pattern to the event.
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/tomoaky-MV-plugins ).
Original plugin by tomoaky.
-----
How to Use:
Set the event's autonomous movement type to custom and run the following script
on the movement route. Check "Repeat Action" to complete the setup.
This can also be used with the "Movement Route" Event's Contents.

this.moveTowardEvent(10);
Approaching event #10

this.moveAwayFromEvent(5);
Moving away from event #5

this.moveLeft45();
Move diagonally forward and left from the current direction

this.moveRight45();
Move diagonally forward and right from the current direction

this.moveLeft135();
Move diagonally backward and left from the current direction

this.moveRight135();
Move diagonally backward and right from the current direction

this.moveRouteEx1();
Continue moving with your right hand on the wall. Setting this.moveRouteEx1(true);
Limits the movement range to the same region.

this.moveRouteEx2();
Place your left hand on the wall and continue moving. If you set this.moveRouteEx2(true);
The movement range will be limited to the same region.

There is no plugin command.
*/


/*:ja
@plugindesc イベントに新しい自律移動パターンを追加します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT

@help
使い方:
  イベントの自律移動タイプをカスタムに設定し、移動ルートで
  以下のスクリプトを実行してください。『動作を繰り返す』に
  チェックをいれれば設定は完了です。
  イベントコマンド『移動ルートの設定』でも同様に使用できます。

  this.moveTowardEvent(10);
  イベント１０番に近づく

  this.moveAwayFromEvent(5);
  イベント５番から遠ざかる

  this.moveLeft45();
  今向いている方向から左斜め前へ移動する

  this.moveRight45();
  今向いている方向から右斜め前へ移動する

  this.moveLeft135();
  今向いている方向から左斜め後ろへ移動する

  this.moveRight135();
  今向いている方向から右斜め後ろへ移動する

  this.moveRouteEx1();
  壁に右手を付いて移動し続けます。this.moveRouteEx1(true); にすると
  移動可能範囲が同じリージョン内に限定されます。

  this.moveRouteEx2();
  壁に左手を付いて移動し続けます。this.moveRouteEx2(true); にすると
  移動可能範囲が同じリージョン内に限定されます。

プラグインコマンドはありません。
*/

var Imported = Imported || {};
Imported.TMMoveRouteEx = true;

(function() {

  //-----------------------------------------------------------------------------
  // Game_Character
  //

  Game_Character.prototype.moveTowardEvent = function(eventId) {
    var event = $gameMap.event(eventId);
    if (event) this.moveTowardCharacter(event);
  };

  Game_Character.prototype.moveAwayFromEvent = function(eventId) {
    var event = $gameMap.event(eventId);
    if (event) this.moveAwayFromCharacter(event);
  };

  Game_Character.prototype.moveLeft45 = function() {
    var d = this.direction();
    var horz = d / 2 % 2 === 1 ? 6 : 4;
    var vert = d <= 4 ? 2 : 8;
    this.moveDiagonally(horz, vert);
  };
  
  Game_Character.prototype.moveRight45 = function() {
    var d = this.direction();
    var horz = d <= 4 ? 4 : 6;
    var vert = d / 2 % 2 === 1 ? 2 : 8;
    this.moveDiagonally(horz, vert);
  };
  
  Game_Character.prototype.moveLeft135 = function() {
    var d = this.direction();
    var horz = d <= 4 ? 6 : 4;
    var vert = d / 2 % 2 === 1 ? 8 : 2;
    this.moveDiagonally(horz, vert);
  };
  
  Game_Character.prototype.moveRight135 = function() {
    var d = this.direction();
    var horz = d / 2 % 2 === 1 ? 4 : 6;
    var vert = d <= 4 ? 8 : 2;
    this.moveDiagonally(horz, vert);
  };
  
  Game_Character.prototype.moveRouteEx1 = function(sameRegion) {
    this.turnRight90();
    if (this.canPassSameRegion(this.x, this.y, this.direction(), sameRegion)) {
      var x = $gameMap.roundXWithDirection(this.x, this.direction());
      var y = $gameMap.roundYWithDirection(this.y, this.direction());
      var d = this.directionTurnRight90();
      if (!this.canPassSameRegion(x, y, d, sameRegion)) {
        this.moveStraight(this.direction());
        return;
      }
    }
    for (var i = 0; i < 3; i++) {
      this.turnLeft90();
      if (this.moveStraightSameRegion(this.direction(), sameRegion)) return;
    }
  };

  Game_Character.prototype.moveRouteEx2 = function(sameRegion) {
    this.turnLeft90();
    if (this.canPassSameRegion(this.x, this.y, this.direction(), sameRegion)) {
      var x = $gameMap.roundXWithDirection(this.x, this.direction());
      var y = $gameMap.roundYWithDirection(this.y, this.direction());
      var d = this.directionTurnLeft90();
      if (!this.canPassSameRegion(x, y, d, sameRegion)) {
        this.moveStraight(this.direction());
        return;
      }
    }
    for (var i = 0; i < 3; i++) {
      this.turnRight90();
      if (this.moveStraightSameRegion(this.direction(), sameRegion)) return;
    }
  };

  Game_Character.prototype.moveStraightSameRegion = function(d, sameRegion) {
    if (!this.canPassSameRegion(this.x, this.y, d, sameRegion)) return false;
    this.moveStraight(d);
    return true;
  };
  
  Game_Character.prototype.canPassSameRegion = function(x, y, d, sameRegion) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
    if (sameRegion && $gameMap.regionId(x, y) !== $gameMap.regionId(x2, y2)) {
      return false;
    }
    return this.canPass(x, y, d);
  };
  
  Game_Character.prototype.directionTurnRight90 = function() {
    var d = this.direction();
    return d === 2 ? 4 : (d === 4 ? 8 : (d === 6 ? 2 : 6));
  };

  Game_Character.prototype.directionTurnLeft90 = function() {
    var d = this.direction();
    return d === 2 ? 6 : (d === 4 ? 2 : (d === 6 ? 8 : 4));
  };

})();