//============================================================================
// TMPlugin - ショップコマンド省略
// バージョン: 1.0.0
// 最終更新日: 2018/04/25
// 配布元    : http://hikimoki.sakura.ne.jp/
//----------------------------------------------------------------------------
// Copyright (c) 2018 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//============================================================================

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/TMOmitShopCommand.js
 * @plugindesc 購入または売却のみの場合にショップコマンドを省略します。SupponShopStockの競合対策
 *
 * @author tomoaky (改変 Suppon)
 *
 * @help
 * TMPlugin - ショップコマンド省略 ver1.0.0
 *
 * 使い方:
 *
 *   イベントコマンド『ショップの処理』で、購入のみ にチェックが入れる、
 *   または、商品をひとつも設定せずに実行した場合にショップコマンドが
 *   省略されます。
 *
 *   プラグインコマンドはありません。
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

var Imported = Imported || {};
Imported.TMOmitShopCommand = true;

(function() {
    'use strict';

    //----------------------------------------------------------------------------
    // Scene_Shop
    //

    var _Scene_Shop_create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() {
        _Scene_Shop_create.call(this);
        if (this._goods.length == 0) { return } //★ここを追加 Suppon
        if (this._goods[0][1] === 0) {
            this._commandWindow.hide();
            this._commandWindow.deactivate();
            this._commandWindow.select(1);
            this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
            this.commandSell();
        } else if (this._purchaseOnly) {
            this._commandWindow.hide();
            this._commandWindow.deactivate();
            this._commandWindow.select(0);
            this._buyWindow.setHandler('cancel', this.popScene.bind(this));
            this.commandBuy();
        }
    };

})();