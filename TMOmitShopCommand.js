//=============================================================================
// TMPlugin - ショップコマンド省略
// バージョン: 1.0.0
// 最終更新日: 2018/04/25
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2018 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 購入または売却のみの場合にショップコマンドを省略します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
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
 *   このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。
 * 
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 */

var Imported = Imported || {};
Imported.TMOmitShopCommand = true;

(function() {

  //-----------------------------------------------------------------------------
  // Scene_Shop
  //

  var _Scene_Shop_create = Scene_Shop.prototype.create;
  Scene_Shop.prototype.create = function() {
    _Scene_Shop_create.call(this);
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