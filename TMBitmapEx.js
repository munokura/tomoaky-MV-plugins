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
@plugindesc Adds the ability to draw rounded rectangles and stars.
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
TMPlugin - Bitmap Extension ver. 2.0.2

How to Use:

This plugin changes the shape of the HP and MP gauges to rounded rectangles.

It also adds several methods to Bitmap.

There are no plugin commands.

This plugin has been tested with RPG Maker MV Version 1.5.0.

This plugin is distributed under the MIT License and is free to use for commercial purposes, modifications, and redistribution.

Added methods (Bitmap):

fillRoundRect(x, y, width, height, radius, color)
Draws a rounded rectangle with coordinates (x, y) at the top left, width, and height.
The radius parameter specifies the radius of the rounded portion, and the color parameter specifies the fill color.
Example: bitmap.fillRoundRect(0, 0, 200, 48, 6, '#000000');

gradientFillRoundRect(x, y, width, height, radius, color1, color2, vertical)
Draws a rounded rectangle with a gradient. If vertical is true,
the gradient will be oriented vertically.

fillStar(x, y, width, height, color)
Draws a star with the coordinates (x, y) at the top left and inscribed within the range of width and height.
Example: bitmap.fillStar(0, 0, 48, 48, '#ffff00');

gradientFillStar(x, y, width, height, color1, color2, vertical)
Draws a star with a gradient. If vertical is true,
the gradient will be oriented vertically.

Additional Plugin Parameters:

gaugeReduction
The reduction size is set in dots.

cornerRadius
If this value is 0, the gauge's rounded corners will be disabled.

minGaugeRate
To avoid display distortion when the rounded gauge is too short, the gauge will not be shorter than the length
set here.
The actual lower limit is determined by multiplying the cornerRadius value by this value.
The default value of 1.5 should generally be fine, but adjust it if the display looks strange.

@param gaugeHeight
@desc Thickness of the rounded corner gauge. Default: 18
@default 18
@type number

@param gaugeReduction
@desc The size of the gauge itself, leaving the gauge background as is. Default: 2
@default 2
@type number

@param cornerRadius
@desc Radius of the rounded corners of the rounded gauge. Default: 6
@default 6
@type number

@param minGaugeRate
@desc The minimum length of the rounded corner gauge (factor of cornerRadius). Default: 1.5
@default 1.5
@type string
*/


/*:ja
@plugindesc 角丸の矩形や星を描画する機能を追加します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - ビットマップ拡張 ver2.0.2

使い方:

  このプラグインを導入すると、ＨＰやＭＰのゲージの形状が角丸の矩形に
  変更されます。また、Bitmapに複数のメソッドを追加します。

  プラグインコマンドはありません。

  このプラグインは RPGツクールMV Version 1.5.0 で動作確認をしています。

  このプラグインはMITライセンスのもとに配布しています、商用利用、
  改造、再配布など、自由にお使いいただけます。


追加されるメソッド（Bitmap）:

  fillRoundRect(x, y, width, height, radius, color)
    座標(x, y)を左上として幅width、高さheightの角丸矩形を描画します、
    radiusは丸部分の半径、colorは塗りつぶす色を文字列で指定してください。
    例）bitmap.fillRoundRect(0, 0, 200, 48, 6, '#000000');

  gradientFillRoundRect(x, y, width, height, radius, color1, color2, vertical)
    グラデーション付きの角丸矩形を描画します。verticalが真なら
    グラデーションの向きが縦方向になります。

  fillStar(x, y, width, height, color)
    座標(x, y)を左上として幅width、高さheightの範囲に内接する星を
    描画します。
      例: bitmap.fillStar(0, 0, 48, 48, '#ffff00');

  gradientFillStar(x, y, width, height, color1, color2, vertical)
    グラデーション付きの星を描画します。verticalが真ならグラデーションの向きが
    縦方向になります。


プラグインパラメータ補足:

  gaugeReduction
    縮小するサイズはドット数で設定します。

  cornerRadius
    この値が 0 の場合、ゲージの角丸矩形化が無効になります。

  minGaugeRate
    角丸ゲージが短すぎる場合に表示が乱れるのを回避するために、ゲージが
    ここで設定した長さよりも短くならないようにします。
    cornerRadius の値にこの値を乗算したものが実際の下限値になります、
    基本的には初期値の 1.5 で問題ないはずですが、表示に違和感があれば
    調整してください。

@param gaugeHeight
@desc 角丸ゲージの太さ。 初期値: 18
@default 18
@type number

@param gaugeReduction
@desc ゲージ背景はそのままにゲージだけを縮小するサイズ。 初期値: 2
@default 2
@type number

@param cornerRadius
@desc 角丸ゲージの角丸部分の半径。 初期値: 6
@default 6
@type number

@param minGaugeRate
@desc 角丸ゲージの長さの下限値（cornerRadiusの倍率）。 初期値: 1.5
@default 1.5
@type string
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