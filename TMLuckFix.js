//=============================================================================
// TMPlugin - 因果の調律
// バージョン: 1.0.0
// 最終更新日: 2017/10/16
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@target MZ MV
@plugindesc Customize the factors that luck affects.
@author tomoaky
@url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/TMLuckFix.js
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/tomoaky-MV-plugins ).
Original plugin by tomoaky.
-----
TMPlugin - Causal Tuning ver1.0.0

How to Use:

There are no plugin commands.

This plugin has been tested with RPG Maker MV Version 1.5.1.

This plugin is distributed under the MIT License and is free for commercial use, modification, and redistribution.

Plugin Parameter Notes:

effectRate
The success rate correction factor is calculated by multiplying the difference in luck between the battler who performed the state grant and the battler who received it by this value and adding 1.
If a battler with luck 10 grants a state with a 50% success rate to a battler with luck 5 (effectRate is 0.001), the correction factor is 1.005, and the success rate of granting the state is 50.25%.

@param effectRate
@text Correction magnification
@desc Correction factor for success rate of granting state. Default: 0.001
@default 0.001
@type number
@decimals 3
*/


/*:ja
@target MZ MV
@plugindesc 運の値が影響する要素をカスタマイズします。
@author tomoaky
@url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/TMLuckFix.js
@license MIT License

@help
TMPlugin - 因果の調律 ver1.0.0

使い方:

  プラグインコマンドはありません。

  このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。

  このプラグインはMITライセンスのもとに配布しています、商用利用、
  改造、再配布など、自由にお使いいただけます。


プラグインパラメータ補足:

  effectRate
    ステート付与を実行したバトラーと実行されたバトラーの運の差に
    この値をかけて、1 を足したものが成功率の補正倍率になります。
    運10のバトラーが運5のバトラーに対して成功率50%のステート付与を
    実行した場合（effectRate は 0.001 とする）、補正倍率は 1.005 で
    ステート付与の成功率は 50.25% になります。

@param effectRate
@text 補正倍率
@desc ステート付与成功率の補正倍率。 初期値: 0.001
@default 0.001
@type number
@decimals 3
*/

var Imported = Imported || {};
Imported.TMLuckFix = true;

(function () {

  var parameters = PluginManager.parameters('TMLuckFix');
  var effectRate = +(parameters['effectRate'] || 0.001);

  //-----------------------------------------------------------------------------
  // Game_Action
  //

  Game_Action.prototype.lukEffectRate = function (target) {
    return Math.max(1.0 + (this.subject().luk - target.luk) * effectRate, 0.0);
  };

})();