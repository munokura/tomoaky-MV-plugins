//=============================================================================
// TMVplugin - 角丸ゲージ
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2016/04/18
//=============================================================================
/*:
@plugindesc Changes various gauges to rounded rectangles.
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
Operating Requirements:
This plugin requires the plugin material "Bitmap Extension (TMBitmapEx.js)."
In the Plugin Manager, install this plugin below the Bitmap Extension.

Please install the latest version of the Bitmap Extension.

There are no plugin commands.

@param gaugeHeight
@desc Gauge Thickness Default: 6
@default 6

@param gaugeReduction
@desc The shadow remains the same, but the gauge is reduced by the specified number of dots. Initial value: 0
@default 0

@param cornerRadius
@desc Radius of rounded corners Default: 4
@default 4
*/


/*:ja
@plugindesc 各種ゲージを角丸矩形に変更します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT

@help
動作条件:
  このプラグインの動作にはプラグイン素材『ビットマップ拡張(TMBitmapEx.js)』が
  必要です、プラグイン管理ではビットマップ拡張よりも下にこのプラグインを導入
  してください。
  ビットマップ拡張は最新のものを導入してください。

プラグインコマンドはありません。

@param gaugeHeight
@desc ゲージの太さ 初期値: 6
@default 6

@param gaugeReduction
@desc 影はそのままにゲージだけを指定したドット分縮小する 初期値: 0
@default 0

@param cornerRadius
@desc 角丸部分の半径 初期値: 4
@default 4
*/

var Imported = Imported || {};
Imported.TMRoundRectGauge = true;

(function() {

  var parameters = PluginManager.parameters('TMRoundRectGauge');
  var gaugeHeight    = +parameters['gaugeHeight'];
  var gaugeReduction = +parameters['gaugeReduction'];
  var cornerRadius   = +parameters['cornerRadius'];
  
  if (Imported.TMBitmapEx) {
    Window_Base.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
      var fillW = Math.floor((width - gaugeReduction * 2) * rate);
      var gaugeY = y + this.lineHeight() - 2 - gaugeHeight;
      this.contents.fillRoundRect(x, gaugeY, width, gaugeHeight, cornerRadius,
                                  this.gaugeBackColor());
      this.contents.gradientFillRoundRect(x + gaugeReduction, gaugeY + gaugeReduction,
                                          fillW, gaugeHeight - gaugeReduction * 2,
                                          cornerRadius, color1, color2);
    };
  }

})();