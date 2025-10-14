//=============================================================================
// TMPlugin - リージョン通行設定
// バージョン: 1.0.0
// 最終更新日: 2018/03/02
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2018 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@target MZ MV
@plugindesc Regions will be able to set whether a location is passable or not.
@author tomoaky
@url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/TMRegionPassable.js
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/tomoaky-MV-plugins ).
Original plugin by tomoaky.
-----
TMPlugin - Region Passage Settings ver. 1.0.0

How to Use:

Set the passable and impassable region numbers in the plugin parameters.

In locations with these regions, tile-based passability is not determined; passability is determined solely by the region itself.

You can also apply passability settings to multiple regions by setting multiple region numbers separated by a space.

There are no plugin commands.

Terms of Use:
MIT License.
https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
You may modify and redistribute this plugin without permission, and there are no restrictions on its use (commercial, 18+, etc.).

@param passableRegions
@text Passable Region
@desc Region number that allows passage regardless of tile. Multiple settings separated by half-width spaces. Default: 251
@default 251
@type string

@param dontPassRegions
@text Impassable Regions
@desc Region numbers that make passage impossible regardless of tile. Multiple settings separated by half-width spaces. Default: 252 253
@default 252 253
@type string

@param counterRegions
@text Counter Elements Region
@desc Region numbers to have counter Elements. Multiple numbers separated by spaces. Default: 253
@default 253
@type string
*/


/*:ja
@target MZ MV
@plugindesc その場所が通行可能かどうかをリージョンで設定できるようになります。
@author tomoaky
@url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/TMRegionPassable.js
@license MIT License

@help
TMPlugin - リージョン通行設定 ver1.0.0

使い方:

  プラグインパラメータで通行可能リージョンと通行不可リージョンの番号を
  それぞれ設定してください。
  これらのリージョンが付加された場所ではタイルによる通行判定を実行せず、
  リージョンでのみ通行できるかどうかが決まります。

  また、リージョン番号を半角スペースで区切って複数設定することで
  複数のリージョンに通行設定を適用できます。

  プラグインコマンドはありません。


利用規約:
  MITライセンスです。
  https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。

@param passableRegions
@text 通行可能リージョン
@desc タイルに関係なく通行を可能にするリージョン番号。 半角スペース区切りで複数設定 初期値: 251
@default 251
@type string

@param dontPassRegions
@text 通行不可リージョン
@desc タイルに関係なく通行を不可にするリージョン番号。 半角スペース区切りで複数設定 初期値: 252 253
@default 252 253
@type string

@param counterRegions
@text カウンター属性リージョン
@desc カウンター属性をもたせるリージョン番号。 半角スペース区切りで複数設定 初期値: 253
@default 253
@type string
*/

var Imported = Imported || {};
Imported.TMRegionPassable = true;

(function() {
    'use strict';

    var parameters = PluginManager.parameters('TMRegionPassable');
    var passableRegions = (parameters['passableRegions'] || '251').split(' ').map(Number);
    var dontPassRegions = (parameters['dontPassRegions'] || '252 253').split(' ').map(Number);
    var counterRegions = (parameters['counterRegions'] || '253').split(' ').map(Number);

    //-----------------------------------------------------------------------------
    // Game_Map
    //

    var _Game_Map_checkPassage = Game_Map.prototype.checkPassage;
    Game_Map.prototype.checkPassage = function(x, y, bit) {
        var regionId = this.regionId(x, y);
        if (passableRegions.indexOf(regionId) >= 0) return true;
        if (dontPassRegions.indexOf(regionId) >= 0) return false;
        return _Game_Map_checkPassage.call(this, x, y, bit);
    };

    var _Game_Map_isCounter = Game_Map.prototype.isCounter;
    Game_Map.prototype.isCounter = function(x, y) {
        var regionId = this.regionId(x, y);
        if (counterRegions.indexOf(regionId) >= 0) return true;
        return _Game_Map_isCounter.call(this, x, y);
    };

})();