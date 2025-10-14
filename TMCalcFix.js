//=============================================================================
// TMPlugin - HP再生率を倍率ではなく回復量にします
// バージョン: 0.1.0b
// 最終更新日: 2020/03/15
// 配布元    : https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2020 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc HP regeneration rate etc. will now be treated as a recovery amount rather than a multiplier.
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
TMPlugin - Changes HP regeneration rate to recovery amount instead of multiplier ver0.1.0b

How to use:

Simply installing this plugin will not affect anything.
You must select the desired calculation formula in the plugin parameters.

This plugin has been tested with RPG Maker MV Version 1.6.2.

This plugin is distributed under the MIT License. You are free to use it commercially, modify it, and redistribute it.

@param hrgFix
@desc Treat HP regeneration rate as recovery amount instead of multiplier. Default: OFF (ON = recovery amount / OFF = multiplier)
@default false
@type boolean

@param mrgFix
@desc Treat MP regeneration rate as recovery amount instead of multiplier. Default: OFF (ON = recovery amount / OFF = multiplier)
@default false
@type boolean
*/


/*:ja
@plugindesc HP再生率などを倍率ではなく回復量として扱うように変更します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - HP再生率を倍率ではなく回復量にします ver0.1.0b

使い方:

  このプラグインを導入するだけでは何も変化は起きません。
  プラグインパラメータで変更したい計算式を選択する必要があります。

  このプラグインは RPGツクールMV Version 1.6.2 で動作確認をしています。

  このプラグインはMITライセンスのもとに配布しています、商用利用、
  改造、再配布など、自由にお使いいただけます。

@param hrgFix
@desc HP再生率を倍率ではなく回復量として扱う 初期値: OFF ( ON = 回復量 / OFF = 倍率 )
@default false
@type boolean

@param mrgFix
@desc MP再生率を倍率ではなく回復量として扱う 初期値: OFF ( ON = 回復量 / OFF = 倍率 )
@default false
@type boolean
*/

var Imported = Imported || {};
Imported.TMCalcFix = true;

(function() {

	var parameters = PluginManager.parameters('TMCalcFix');
	var hrgFix = JSON.parse(parameters['hrgFix'] || 'false');
	var mrgFix = JSON.parse(parameters['mrgFix'] || 'false');

	//-----------------------------------------------------------------------------
	// Game_Battler
	//

	var _Game_Battler_regenerateHp = Game_Battler.prototype.regenerateHp;
	Game_Battler.prototype.regenerateHp = function() {
		if (hrgFix) {
			var value = Math.floor(100 * this.hrg);
			value = Math.max(value, -this.maxSlipDamage());
			if (value !== 0) {
				this.gainHp(value);
			}
		} else {
			_Game_Battler_regenerateHp.call(this);
		}
	};
	
	var _Game_Battler_regenerateMp = Game_Battler.prototype.regenerateMp;
	Game_Battler.prototype.regenerateMp = function() {
		if (mrgFix) {
			var value = Math.floor(100 * this.mrg);
			if (value !== 0) {
				this.gainMp(value);
			}
		} else {
			_Game_Battler_regenerateMp.call(this);
		}
	};
	
})();