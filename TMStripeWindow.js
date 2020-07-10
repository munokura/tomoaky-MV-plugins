//=============================================================================
// TMPlugin - ストライプウィンドウ
// バージョン: 1.0.0
// 最終更新日: 2017/01/05
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 項目が 1 列に並ぶコマンドウィンドウの背景を縞々にします。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param backColor1
 * @desc 縞色1
 * 初期値: #000000
 * @default #000000
 *
 * @param backColor2
 * @desc 縞色2
 * 初期値: #201018
 * @default #201018
 *
 * @param stripeOpacity
 * @desc 縞色の不透明度
 * 初期値: 192 ( 0 ～ 255 )
 * @default 192
 *
 * @help
 * TMPlugin - ストライプウィンドウ ver1.0.0
 *
 * 使い方:
 * 
 *   スクリプトを導入すると自動的にコマンドウィンドウの背景が縞々になります。
 *
 *   プラグインコマンドはありません。
 *
 *   このプラグインは RPGツクールMV Version 1.3.4 で動作確認をしています。
 * 
 * 
 * プラグインパラメータ補足:
 * 
 *   backColor1 / backColor2
 *     半角のシャープに続けて赤、緑、青の 3 つの色成分を 2 桁の 2 進数で
 *     設定してください。
 *     完全な赤なら #ff0000、白なら #ffffff となります。
 * 
 *   stripeOpacity
 *     実際に表示される際の不透明度はウィンドウ側の設定も影響するため、
 *     ここで設定した値よりも低く（薄く）なります。
 */

var Imported = Imported || {};
Imported.TMStripeWindow = true;

var TMPlugin = TMPlugin || {};
TMPlugin.StripeWindow = {};
TMPlugin.StripeWindow.Parameters = PluginManager.parameters('TMStripeWindow');
TMPlugin.StripeWindow.BackColor1 = TMPlugin.StripeWindow.Parameters['backColor1'] || '#000000';
TMPlugin.StripeWindow.BackColor2 = TMPlugin.StripeWindow.Parameters['backColor2'] || '#221100';
TMPlugin.StripeWindow.StripeOpacity = +(TMPlugin.StripeWindow.Parameters['stripeOpacity'] || 192);

(function() {

  //-----------------------------------------------------------------------------
  // Window_Command
  //

  var _Window_Command__refreshBack = Window_Command.prototype._refreshBack;
  Window_Command.prototype._refreshBack = function() {
    if (this.maxCols() === 1) {
      var m = this._margin;
      var w = this._width - m * 2;
      var h = this._height - m * 2;
      var bitmap = new Bitmap(w, h);

      this._windowBackSprite.bitmap = bitmap;
      this._windowBackSprite.setFrame(0, 0, w, h);
      this._windowBackSprite.move(m, m);
      if (w > 0 && h > 0 && this._windowskin) {
        var p = 96;
        var lineHeight = this.lineHeight();
        bitmap.paintOpacity = TMPlugin.StripeWindow.StripeOpacity;
        for (var i = -1; i <= this.numVisibleRows(); i++) {
          var y = this.standardPadding() - this._margin + lineHeight * i;
          if (i % 2 === 0) {
            bitmap.fillRect(0, y, w, lineHeight, TMPlugin.StripeWindow.BackColor1);
          } else {
            bitmap.fillRect(0, y, w, lineHeight, TMPlugin.StripeWindow.BackColor2);
          }
        }
        bitmap.paintOpacity = 255;
        for (var y = 0; y < h; y += p) {
          for (var x = 0; x < w; x += p) {
            bitmap.blt(this._windowskin, 0, p, p, p, x, y, p, p);
          }
        }
        var tone = this._colorTone;
        bitmap.adjustTone(tone[0], tone[1], tone[2]);
      }
    } else {
      _Window_Command__refreshBack.call(this);
    }
  };

})();
