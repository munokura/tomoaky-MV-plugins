//=============================================================================
// TMPlugin - アイテムカテゴリ拡張
// バージョン: 1.0.1
// 最終更新日: 2018/05/01
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc アイテムカテゴリの追加、削除をおこないます。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param categoryList
 * @desc アイテムカテゴリの一覧 (詳しくはヘルプにて)
 * 初期値: item weapon armor keyItem
 * @default item weapon armor keyItem
 *
 * @help
 * TMPlugin - アイテムカテゴリ拡張 ver1.0.1
 *
 * 使い方:
 *
 *   プラグインパラメータでアイテムカテゴリを設定してください。
 *   item, weapon, armor, keyItem は アイテム, 武器, 防具, 大事なもの に
 *   対応しています。
 *   たとえばアイテムと武器の間に 書物 というカテゴリを追加したい場合は
 *   item 書物 weapon armor keyItem
 *   というような設定になります。
 * 
 *   追加したカテゴリは itemCategory タグを使ってアイテムに設定することが
 *   できます。タグを設定したアイテムは通常のアイテムカテゴリには
 *   表示されなくなります。
 * 
 *   また、不要なカテゴリを削除することもできます。
 *   カテゴリが 1 個しかない場合はカテゴリ選択の処理自体が省略されます。
 * 
 *   プラグインコマンドはありません。
 *
 *   このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。
 *
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 *  
 * 
 * メモ欄タグ（アイテム）:
 * 
 *   <itemCategory:書物>
 *     このアイテムのカテゴリを 書物 に設定します。
 *     プラグインパラメータ categoryList に 書物 というカテゴリが
 *     あればそこに表示されます。
 */

var Imported = Imported || {};
Imported.TMItemCategoryEx = true;

(function() {

  var parameters = PluginManager.parameters('TMItemCategoryEx');
  var categoryList = (parameters['categoryList'] || 'item weapon armor keyItem').split(' ');

  //-----------------------------------------------------------------------------
  // Window_ItemCategory
  //

  Window_ItemCategory.prototype.maxCols = function() {
    return categoryList.length;
  };

  Window_ItemCategory.prototype.makeCommandList = function() {
    var symbol;
    for (var i = 0; i < this.maxCols(); i++) {
      symbol = categoryList[i];
      if (symbol === 'item') {
        this.addCommand(TextManager.item, 'item');
      } else if (symbol === 'weapon') {
        this.addCommand(TextManager.weapon, 'weapon');
      } else if (symbol === 'armor') {
        this.addCommand(TextManager.armor, 'armor');
      } else if (symbol === 'keyItem') {
        this.addCommand(TextManager.keyItem, 'keyItem');
      } else {
        this.addCommand(symbol, symbol);
      }
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_ItemList
  //

  var _Window_ItemList_includes = Window_ItemList.prototype.includes;
  Window_ItemList.prototype.includes = function(item) {
    if (item && item.meta.itemCategory) return this._category === item.meta.itemCategory;
    return _Window_ItemList_includes.call(this, item);
  };

  //-----------------------------------------------------------------------------
  // Scene_Item
  //

  var _Scene_Item_create = Scene_Item.prototype.create;
  Scene_Item.prototype.create = function() {
    _Scene_Item_create.call(this);
    if (categoryList.length === 1) {
      this._categoryWindow.deactivate();
      this._categoryWindow.hide();
      this._itemWindow.move(this._itemWindow.x, this._categoryWindow.y, this._itemWindow.width,
                            this._itemWindow.height + this._categoryWindow.height);
      this._itemWindow.setHandler('cancel', this.popScene.bind(this));
      this._itemWindow.setCategory(this._categoryWindow.currentSymbol());
      this.onCategoryOk();
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Shop
  //

  var _Scene_Shop_create = Scene_Shop.prototype.create;
  Scene_Shop.prototype.create = function() {
    _Scene_Shop_create.call(this);
    if (categoryList.length === 1) {
      this._sellWindow.move(this._sellWindow.x, this._categoryWindow.y, this._sellWindow.width,
                            this._sellWindow.height + this._categoryWindow.height);
      this._sellWindow.setCategory(this._categoryWindow.currentSymbol());
    }
  };

  var _Scene_Shop_commandSell = Scene_Shop.prototype.commandSell;
  Scene_Shop.prototype.commandSell = function() {
    _Scene_Shop_commandSell.call(this);
    if (categoryList.length === 1) {
      this._sellWindow.activate();
      this._statusWindow.hide();
      this._sellWindow.select(0);
      this._categoryWindow.hide();
    }
  };

  var _Scene_Shop_onSellCancel = Scene_Shop.prototype.onSellCancel;
  Scene_Shop.prototype.onSellCancel = function() {
    _Scene_Shop_onSellCancel.call(this);
    if (categoryList.length === 1) {
      this.onCategoryCancel();
    }
  };

})();
