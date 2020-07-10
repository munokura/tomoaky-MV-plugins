//=============================================================================
// TMPlugin - ビットマップ拡張
// バージョン: 2.0.2
// 最終更新日: 2017/06/30
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 角丸の矩形や星を描画する機能を追加します。
 * 各種ゲージの形状を角丸矩形に自動変更する機能もあります。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param gaugeHeight
 * @type number
 * @desc 角丸ゲージの太さ。
 * 初期値: 18
 * @default 18
 *
 * @param gaugeReduction
 * @type number
 * @desc ゲージ背景はそのままにゲージだけを縮小するサイズ。
 * 初期値: 2
 * @default 2
 *
 * @param cornerRadius
 * @type number
 * @desc 角丸ゲージの角丸部分の半径。
 * 初期値: 6
 * @default 6
 *
 * @param minGaugeRate
 * @type string
 * @desc 角丸ゲージの長さの下限値（cornerRadiusの倍率）。
 * 初期値: 1.5
 * @default 1.5
 *
 * @help
 * TMPlugin - ビットマップ拡張 ver2.0.2
 * 
 * 使い方:
 *
 *   このプラグインを導入すると、ＨＰやＭＰのゲージの形状が角丸の矩形に
 *   変更されます。また、Bitmapに複数のメソッドを追加します。
 *
 *   プラグインコマンドはありません。
 *
 *   このプラグインは RPGツクールMV Version 1.5.0 で動作確認をしています。
 *
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 *
 *
 * 追加されるメソッド（Bitmap）:
 *
 *   fillRoundRect(x, y, width, height, radius, color)
 *     座標(x, y)を左上として幅width、高さheightの角丸矩形を描画します、
 *     radiusは丸部分の半径、colorは塗りつぶす色を文字列で指定してください。
 *     例）bitmap.fillRoundRect(0, 0, 200, 48, 6, '#000000');
 *
 *   gradientFillRoundRect(x, y, width, height, radius, color1, color2, vertical)
 *     グラデーション付きの角丸矩形を描画します。verticalが真なら
 *     グラデーションの向きが縦方向になります。
 *
 *   fillStar(x, y, width, height, color)
 *     座標(x, y)を左上として幅width、高さheightの範囲に内接する星を
 *     描画します。
 *       例: bitmap.fillStar(0, 0, 48, 48, '#ffff00');
 *
 *   gradientFillStar(x, y, width, height, color1, color2, vertical)
 *     グラデーション付きの星を描画します。verticalが真ならグラデーションの向きが
 *     縦方向になります。
 *
 *
 * プラグインパラメータ補足:
 *
 *   gaugeReduction
 *     縮小するサイズはドット数で設定します。
 *
 *   cornerRadius
 *     この値が 0 の場合、ゲージの角丸矩形化が無効になります。
 *
 *   minGaugeRate
 *     角丸ゲージが短すぎる場合に表示が乱れるのを回避するために、ゲージが
 *     ここで設定した長さよりも短くならないようにします。
 *     cornerRadius の値にこの値を乗算したものが実際の下限値になります、
 *     基本的には初期値の 1.5 で問題ないはずですが、表示に違和感があれば
 *     調整してください。
 */

var Imported = Imported || {};
Imported.TMBitmapEx = true;

var TMPlugin = TMPlugin || {};
TMPlugin.BitmapEx = {};
TMPlugin.BitmapEx.Parameters = PluginManager.parameters('TMBitmapEx');
TMPlugin.BitmapEx.GaugeHeight    = +(TMPlugin.BitmapEx.Parameters['gaugeHeight'] || 18);
TMPlugin.BitmapEx.GaugeReduction = +(TMPlugin.BitmapEx.Parameters['gaugeReduction'] || 2);
TMPlugin.BitmapEx.CornerRadius   = +(TMPlugin.BitmapEx.Parameters['cornerRadius'] || 6);
TMPlugin.BitmapEx.MinGaugeRate   = +(TMPlugin.BitmapEx.Parameters['minGaugeRate'] || 1.5);
TMPlugin.BitmapEx.MinGaugeWidth  = Math.floor(TMPlugin.BitmapEx.MinGaugeRate *
                                              TMPlugin.BitmapEx.CornerRadius);

(function() {

  //-----------------------------------------------------------------------------
  // Bitmap
  //

  Bitmap.prototype.fillRoundRect = function(x, y, width, height, radius, color) {
    var context = this._context;
    var pi = Math.PI;
    context.save();
    context.fillStyle = color;
    context.beginPath();
    context.arc(x + radius, y + radius, radius, -pi, -0.5 * pi, false);
    context.arc(x + width - radius, y + radius, radius, -0.5 * pi, 0, false);
    context.arc(x + width - radius, y + height - radius, radius, 0, 0.5 * pi, false);
    context.arc(x + radius, y + height - radius, radius, 0.5 * pi, pi, false);
    context.fill();
    context.restore();
    this._setDirty();
  };

  Bitmap.prototype.gradientFillRoundRect = function(x, y, width, height, radius,
                                                    color1, color2, vertical) {
    var context = this._context;
    var pi = Math.PI;
    var grad = vertical ? context.createLinearGradient(x, y, x, y + height) :
               context.createLinearGradient(x, y, x + width, y);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    context.save();
    context.fillStyle = grad;
    context.beginPath();
    context.arc(x + radius, y + radius, radius, -pi, -0.5 * pi, false);
    context.arc(x + width - radius, y + radius, radius, -0.5 * pi, 0, false);
    context.arc(x + width - radius, y + height - radius, radius, 0, 0.5 * pi, false);
    context.arc(x + radius, y + height - radius, radius, 0.5 * pi, pi, false);
    context.fill();
    context.restore();
    this._setDirty();
  };

  Bitmap.prototype.fillStar = function(x, y, width, height, color) {
    var context = this._context;
    var pi = Math.PI;
    var cx = x + width / 2;
    var cy = y + height / 2;
    var r = pi + pi / 2;
    context.save();
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(Math.cos(r) * width / 2 + cx, Math.sin(r) * height / 2 + cy);
    for (var i = 0; i < 5; i++) {
      r += pi * 4 / 5;
      context.lineTo(Math.cos(r) * width / 2 + cx, Math.sin(r) * height / 2 + cy);
    }
    context.fill();
    context.restore();
    this._setDirty();
  };

  Bitmap.prototype.gradientFillStar = function(x, y, width, height, color1, color2,
                                               vertical) {
    var context = this._context;
    var pi = Math.PI;
    var cx = x + width / 2;
    var cy = y + height / 2;
    var r = pi + pi / 2;
    var grad = vertical ? context.createLinearGradient(x, y, x, y + height) :
               context.createLinearGradient(x, y, x + width, y);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    context.save();
    context.fillStyle = grad;
    context.beginPath();
    context.moveTo(Math.cos(r) * width / 2 + cx, Math.sin(r) * height / 2 + cy);
    for (var i = 0; i < 5; i++) {
      r += pi * 4 / 5;
      context.lineTo(Math.cos(r) * width / 2 + cx, Math.sin(r) * height / 2 + cy);
    }
    context.fill();
    context.restore();
    this._setDirty();
  };

  //-----------------------------------------------------------------------------
  // Window_Base
  //

  var _Window_Base_drawGauge = Window_Base.prototype.drawGauge;
  Window_Base.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    if (TMPlugin.BitmapEx.CornerRadius > 0) {
      y = y + this.lineHeight() - TMPlugin.BitmapEx.GaugeHeight - 2;
      this.contents.fillRoundRect(x, y, width, TMPlugin.BitmapEx.GaugeHeight,
                                  TMPlugin.BitmapEx.CornerRadius, this.gaugeBackColor());
      var fillW = Math.floor((width - TMPlugin.BitmapEx.GaugeReduction * 2) * rate);
      if (fillW > 0) {
        fillW = Math.max(fillW, TMPlugin.BitmapEx.MinGaugeWidth);
        var fillH = TMPlugin.BitmapEx.GaugeHeight - TMPlugin.BitmapEx.GaugeReduction * 2
        this.contents.gradientFillRoundRect(x + TMPlugin.BitmapEx.GaugeReduction,
                                            y + TMPlugin.BitmapEx.GaugeReduction,
                                            fillW, fillH, TMPlugin.BitmapEx.CornerRadius,
                                            color1, color2);
      }
    } else {
      _Window_Base_drawGauge.call(this, x, y, width, rate, color1, color2)
    }
  };

})();
