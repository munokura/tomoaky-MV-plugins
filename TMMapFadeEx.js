//=============================================================================
// TMPlugin - フェードイン調整
// バージョン: 1.0.1
// 最終更新日: 2017/06/16
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc Adjust the map scene fade-in (out) time.
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
TMPlugin - Fade-in Adjustment ver. 1.0.1

How to Use:

You can adjust various fade-in (fade-out) times by changing the plugin parameters.

This plugin has been tested with RPG Maker MV Version 1.5.0.

@param fadeSpeed
@desc Time taken for fading. Default: 24
@default 24
@type number

@param slowFadeSpeed
@desc Time spent on slow fade processing. Default: 48
@default 48
@type number

@param eventFadeSpeed
@desc Time taken for fade processing by Event's Contents. Default: 24
@default 24
@type number

@param snapBlur
@desc Blur menu background Default: ON ( false = OFF / true = ON )
@default true
@type boolean
*/


/*:ja
@plugindesc マップシーンのフェードイン（アウト）時間を調整します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - フェードイン調整 ver1.0.1

使い方:

  プラグインパラメータを変更することで各種フェードイン（アウト）時間を
  調整することができます。

  このプラグインは RPGツクールMV Version 1.5.0 で動作確認をしています。

@param fadeSpeed
@desc フェード処理にかける時間。 初期値: 24
@default 24
@type number

@param slowFadeSpeed
@desc スローフェード処理にかける時間。 初期値: 48
@default 48
@type number

@param eventFadeSpeed
@desc イベントコマンドによるフェード処理にかける時間。 初期値: 24
@default 24
@type number

@param snapBlur
@desc メニュー背景のブラー処理 初期値: ON ( false = OFF / true = ON )
@default true
@type boolean
*/

var Imported = Imported || {};
Imported.TMMapFadeEx = true;

(function() {

  var parameters = PluginManager.parameters('TMMapFadeEx');
  var fadeSpeed = +(parameters['fadeSpeed'] || 24);
  var slowFadeSpeed = +(parameters['slowFadeSpeed'] || 48);
  var eventFadeSpeed = +(parameters['eventFadeSpeed'] || 24);
  var snapBlur = JSON.parse(parameters['snapBlur']);

  //-----------------------------------------------------------------------------
  // SceneManager
  //

  SceneManager.snapForBackground = function() {
    this._backgroundBitmap = this.snap();
    if (snapBlur) this._backgroundBitmap.blur();
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  Game_Interpreter.prototype.fadeSpeed = function() {
    return eventFadeSpeed;
  };

  //-----------------------------------------------------------------------------
  // Scene_Base
  //

  Scene_Base.prototype.fadeSpeed = function() {
    return fadeSpeed;
  };

  Scene_Base.prototype.slowFadeSpeed = function() {
    return slowFadeSpeed;
  };

})();