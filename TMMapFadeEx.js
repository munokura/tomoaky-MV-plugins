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
 * @plugindesc マップシーンのフェードイン（アウト）時間を調整します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param fadeSpeed
 * @type number
 * @desc フェード処理にかける時間。
 * 初期値: 24
 * @default 24
 *
 * @param slowFadeSpeed
 * @type number
 * @desc スローフェード処理にかける時間。
 * 初期値: 48
 * @default 48
 *
 * @param eventFadeSpeed
 * @type number
 * @desc イベントコマンドによるフェード処理にかける時間。
 * 初期値: 24
 * @default 24
 *
 * @param snapBlur
 * @type boolean
 * @desc メニュー背景のブラー処理
 * 初期値: ON ( false = OFF / true = ON )
 * @default true
 *
 * @help
 * TMPlugin - フェードイン調整 ver1.0.1
 *
 * 使い方:
 *
 *   プラグインパラメータを変更することで各種フェードイン（アウト）時間を
 *   調整することができます。
 *
 *   このプラグインは RPGツクールMV Version 1.5.0 で動作確認をしています。
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
