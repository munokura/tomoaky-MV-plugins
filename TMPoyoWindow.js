//=============================================================================
// TMPlugin - ぽよウィンドウ
// バージョン: 1.0.0
// 最終更新日: 2016/10/21
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 一部ウィンドウのオープン演出をぽよっとさせます。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param openSpeed
 * @desc ウィンドウが開く速度。
 * 初期値: 16
 * @default 16
 *
 * @help
 * 使い方:
 *
 *   ウィンドウのオープン演出の最後が少しやわらかくなります。
 *   プラグインを導入していない状態と比べて、完全に開くまでの時間が
 *   倍になっています。
 *   プラグインパラメータ openSpeed を 32 にすると同じ時間になります。
 *
 *   タイトルコマンドやメッセージウィンドウなど、元々オープン演出のある
 *   一部のウィンドウのみが対象となります。
 *
 *   プラグインコマンドはありません。
 *
 *   このプラグインは RPGツクールMV Version 1.3.2 で動作確認をしています。
 */

var Imported = Imported || {};
Imported.TMPoyoWindow = true;

var TMPlugin = TMPlugin || {};
TMPlugin.PoyoWindow = {};
TMPlugin.PoyoWindow.Parameters = PluginManager.parameters('TMPoyoWindow');
TMPlugin.PoyoWindow.OpenSpeed = +(TMPlugin.PoyoWindow.Parameters['openSpeed'] || 16);

(function() {

  //-----------------------------------------------------------------------------
  // Window
  //

  Object.defineProperty(Window.prototype, 'openness', {
    get: function() {
      return this._openness;
    },
    set: function(value) {
      if (this._openness !== value) {
        this._openness = value.clamp(0, 255);
        if (this._opening) {
          if (this._openness < 64) {
            this._windowSpriteContainer.scale.y = this._openness / 64;
            this._windowSpriteContainer.y = this.height / 2 * (1 - this._openness / 64);
          } else {
            if (this._openness === 255) {
              var scale = 1;
            } else {
              var scale = 1 + Math.sin(Math.PI * ((this._openness - 64) / 96)) * 0.3;
            }
            this._windowSpriteContainer.scale.y = scale;
            this._windowSpriteContainer.y = this.height / 2 * (1 - scale);
          }
        } else {
          this._windowSpriteContainer.scale.y = this._openness / 255;
          this._windowSpriteContainer.y = this.height / 2 * (1 - this._openness / 255);
        }
      }
    },
    configurable: true
  });

  //-----------------------------------------------------------------------------
  // Window_Base
  //

  Window_Base.prototype.updateOpen = function() {
    if (this._opening) {
      this.openness += TMPlugin.PoyoWindow.OpenSpeed;
      if (this.isOpen()) {
        this._opening = false;
      }
    }
  };

})();
