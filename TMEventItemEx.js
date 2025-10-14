//=============================================================================
// TMPlugin - アイテム選択拡張
// バージョン: 1.1.0
// 最終更新日: 2017/01/24
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc A help window has been added to the item selection process, and you can configure whether to display the number of items and the number of lines to display for each item type.
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
TMPlugin - Item Selection Extension ver1.1.0

How to Use:

You can change the following settings for each item type:
- Whether to display the help window
- Whether to display the quantity
- The number of lines displayed in the item selection window

You can further refine the items displayed as candidates using memo tags and plugin commands.

Memo Tag (Item):

<subCategory:card>
Sets the subcategory "card" for items tagged with this tag.

Plugin Command:

setEventItemSubCategory card
By executing this command immediately before the "Item Selection Process" Event's Contents, you can display only items in the specified subcategory.

For example, if "Key Item" is selected in the Event's Contents,

only the Key Item you own that have the subcategory "card" will be displayed.

The effect of this command is reset when item selection is completed (or canceled).

@param helpWindowEnabledItem
@text Item selection help display
@desc Whether to display the help window when selecting an item. Default: true (false to not display)
@default true
@type boolean

@param helpWindowEnabledKey
@text Help display for selecting Key Item
@desc Whether to display the help window when selecting Key Item. Default: true (false to not display).
@default true
@type boolean

@param helpWindowEnabledA
@text Display hidden item A selection help
@desc Whether to display the help window when selecting hidden item A. Default: true (false to not display)
@default true
@type boolean

@param helpWindowEnabledB
@text Display hidden item B selection help
@desc Whether to display the help window when selecting hidden item B. Default: true (false to not display)
@default true
@type boolean

@param showItemNumberItem
@text Displaying the number of items
@desc Whether to display the number of items. Default: true (false to not display)
@default true
@type boolean

@param showItemNumberKey
@text Displaying the number of important things
@desc Whether to display the number of Key Item. Default: true ( false to not display)
@default true
@type boolean

@param showItemNumberA
@text Display number of hidden items A
@desc Whether to display the number of hidden items A. Default: true (false to not display)
@default true
@type boolean

@param showItemNumberB
@text Display number of hidden items A
@desc Whether to display the number of hidden items A. Default: true (false to not display)
@default true
@type boolean

@param numVisibleRowsItem
@text Number of item display lines
@desc Number of rows to display for item selection Initial value: 4
@default 4
@type number

@param numVisibleRowsKey
@text Number of lines to display important things
@desc Number of lines to display for important selection Default: 4
@default 4
@type number

@param numVisibleRowsA
@text Number of lines displayed for hidden item A
@desc Number of lines to display for hidden item A selection Initial value: 4
@default 4
@type number

@param numVisibleRowsB
@text Number of lines displayed for hidden item B
@desc Number of lines to display for hidden item B selection Initial value: 4
@default 4
@type number

@param fixPlacement
@text Window Position
@desc Window position when there is no message window. Default: top (top / bottom / unset for no fixed position).
@default top
@type select
@option Top
@value top
@option bottom
@value bottom
@option Not fixed
*/


/*:ja
@plugindesc アイテム選択の処理にヘルプウィンドウを追加し、個数表示の有無と表示行数をアイテムタイプごとに設定できます。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - アイテム選択拡張 ver1.1.0

使い方:

  アイテムタイプごとに以下の設定を変更できます。
  ・ヘルプウィンドウを表示するかどうか
  ・個数を表示するかどうか
  ・アイテム選択ウィンドウの表示行数

  メモ欄タグとプラグインコマンドを使い、候補として表示するアイテムを
  さらに細かく分類することもできます。

メモ欄タグ（アイテム）:

  <subCategory:card>
    このタグがついているアイテムにサブカテゴリーとして card を設定します。


プラグインコマンド:

  setEventItemSubCategory card
    イベントコマンド『アイテム選択の処理』の直前に実行することで、
    指定したサブカテゴリーのアイテムのみを表示することができます。
    たとえば、イベントコマンド側で 大事なもの が選択されている場合、
    所持している大事なものの中からサブカテゴリーに card が設定されている
    アイテムのみを表示します。

    このコマンドの効果はアイテム選択完了（またはキャンセル）時に
    リセットされます。

@param helpWindowEnabledItem
@text アイテム選択ヘルプ表示
@desc アイテム選択でヘルプウィンドウを表示するかどうか 初期値: true（ false で表示しない）
@default true
@type boolean

@param helpWindowEnabledKey
@text 大事なもの選択ヘルプ表示
@desc 大事なもの選択でヘルプウィンドウを表示するかどうか 初期値: true（ false で表示しない）
@default true
@type boolean

@param helpWindowEnabledA
@text 隠しアイテムＡ選択ヘルプ表示
@desc 隠しアイテムＡ選択でヘルプウィンドウを表示するかどうか 初期値: true（ false で表示しない）
@default true
@type boolean

@param helpWindowEnabledB
@text 隠しアイテムＢ選択ヘルプ表示
@desc 隠しアイテムＢ選択でヘルプウィンドウを表示するかどうか 初期値: true（ false で表示しない）
@default true
@type boolean

@param showItemNumberItem
@text アイテム数の表示
@desc アイテムの個数を表示するかどうか 初期値: true（ false で表示しない）
@default true
@type boolean

@param showItemNumberKey
@text 大事なもの数の表示
@desc 大事なものの個数を表示するかどうか 初期値: true（ false で表示しない）
@default true
@type boolean

@param showItemNumberA
@text 隠しアイテムＡ数の表示
@desc 隠しアイテムＡの個数を表示するかどうか 初期値: true（ false で表示しない）
@default true
@type boolean

@param showItemNumberB
@text 隠しアイテムＡ数の表示
@desc 隠しアイテムＡの個数を表示するかどうか 初期値: true（ false で表示しない）
@default true
@type boolean

@param numVisibleRowsItem
@text アイテム表示行数
@desc アイテム選択の表示行数 初期値: 4
@default 4
@type number

@param numVisibleRowsKey
@text 大事なもの表示行数
@desc 大事なもの選択の表示行数 初期値: 4
@default 4
@type number

@param numVisibleRowsA
@text 隠しアイテムＡ表示行数
@desc 隠しアイテムＡ選択の表示行数 初期値: 4
@default 4
@type number

@param numVisibleRowsB
@text 隠しアイテムＢ表示行数
@desc 隠しアイテムＢ選択の表示行数 初期値: 4
@default 4
@type number

@param fixPlacement
@text ウィンドウ位置
@desc メッセージウィンドウがない場合のウィンドウ位置 初期値: top ( top / bottom / 未設定で固定しない )
@default top
@type select
@option 上部
@value top
@option 下部
@value bottom
@option 固定しない
*/

var Imported = Imported || {};
Imported.TMEventItemEx = true;

var TMPlugin = TMPlugin || {};
TMPlugin.EventItemEx = {};
TMPlugin.EventItemEx.Parameters = PluginManager.parameters('TMEventItemEx');
TMPlugin.EventItemEx.HelpWindowEnabledItem = TMPlugin.EventItemEx.Parameters['helpWindowEnabledItem'] === 'true';
TMPlugin.EventItemEx.HelpWindowEnabledKey = TMPlugin.EventItemEx.Parameters['helpWindowEnabledKey'] === 'true';
TMPlugin.EventItemEx.HelpWindowEnabledA = TMPlugin.EventItemEx.Parameters['helpWindowEnabledA'] === 'true';
TMPlugin.EventItemEx.HelpWindowEnabledB = TMPlugin.EventItemEx.Parameters['helpWindowEnabledB'] === 'true';
TMPlugin.EventItemEx.ShowItemNumberItem = TMPlugin.EventItemEx.Parameters['showItemNumberItem'] === 'true';
TMPlugin.EventItemEx.ShowItemNumberKey = TMPlugin.EventItemEx.Parameters['showItemNumberKey'] === 'true';
TMPlugin.EventItemEx.ShowItemNumberA = TMPlugin.EventItemEx.Parameters['showItemNumberA'] === 'true';
TMPlugin.EventItemEx.ShowItemNumberB = TMPlugin.EventItemEx.Parameters['showItemNumberB'] === 'true';
TMPlugin.EventItemEx.NumVisibleRowsItem = +(TMPlugin.EventItemEx.Parameters['numVisibleRowsItem'] || 4);
TMPlugin.EventItemEx.NumVisibleRowsKey = +(TMPlugin.EventItemEx.Parameters['numVisibleRowsKey'] || 4);
TMPlugin.EventItemEx.NumVisibleRowsA = +(TMPlugin.EventItemEx.Parameters['numVisibleRowsA'] || 4);
TMPlugin.EventItemEx.NumVisibleRowsB = +(TMPlugin.EventItemEx.Parameters['numVisibleRowsB'] || 4);
TMPlugin.EventItemEx.FixPlacement = TMPlugin.EventItemEx.Parameters['fixPlacement'];

(function () {

  //-----------------------------------------------------------------------------
  // Game_Temp
  //

  Game_Temp.prototype.setEventItemSubCategory = function (category) {
    this._eventItemSubCategory = category;
  };

  Game_Temp.prototype.eventItemSubCategory = function () {
    return this._eventItemSubCategory;
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'setEventItemSubCategory') {
      $gameTemp.setEventItemSubCategory(args[0]);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_EventItem
  //

  Window_EventItem.prototype.isHelpWindowEnabled = function () {
    var itypeId = $gameMessage.itemChoiceItypeId();
    if (itypeId === 1) {
      return TMPlugin.EventItemEx.HelpWindowEnabledItem;
    } else if (itypeId === 2) {
      return TMPlugin.EventItemEx.HelpWindowEnabledKey;
    } else if (itypeId === 3) {
      return TMPlugin.EventItemEx.HelpWindowEnabledA;
    } else if (itypeId === 4) {
      return TMPlugin.EventItemEx.HelpWindowEnabledB;
    }
    return false;
  };

  var _Window_EventItem_start = Window_EventItem.prototype.start;
  Window_EventItem.prototype.start = function () {
    this.height = this.fittingHeight(this.numVisibleRows());
    _Window_EventItem_start.call(this);
    if (this.isHelpWindowEnabled()) this._helpWindow.open();
  };

  var _Window_EventItem_numVisibleRows = Window_EventItem.prototype.numVisibleRows;
  Window_EventItem.prototype.numVisibleRows = function () {
    var itypeId = $gameMessage.itemChoiceItypeId();
    if (itypeId === 1) {
      return TMPlugin.EventItemEx.NumVisibleRowsItem;
    } else if (itypeId === 2) {
      return TMPlugin.EventItemEx.NumVisibleRowsKey;
    } else if (itypeId === 3) {
      return TMPlugin.EventItemEx.NumVisibleRowsA;
    } else if (itypeId === 4) {
      return TMPlugin.EventItemEx.NumVisibleRowsB;
    }
    return _Window_EventItem_numVisibleRows.call(this);
  };

  var _Window_EventItem_updatePlacement = Window_EventItem.prototype.updatePlacement;
  Window_EventItem.prototype.updatePlacement = function () {
    var enabled = this.isHelpWindowEnabled();
    if (!$gameMessage.hasText() && TMPlugin.EventItemEx.FixPlacement) {
      if (TMPlugin.EventItemEx.FixPlacement === 'top') {
        this.y = enabled ? this._helpWindow.height : 0;
      } else {
        this.y = Graphics.boxHeight - this.height;
      }
    } else if (enabled) {
      if (this._messageWindow.y >= Graphics.boxHeight / 2) {
        this.y = this._helpWindow.height;
      } else {
        this.y = Graphics.boxHeight - this.height;
      }
    } else {
      _Window_EventItem_updatePlacement.call(this);
    }
    if (enabled) this._helpWindow.y = this.y - this._helpWindow.height;
  };

  var _Window_EventItem_includes = Window_EventItem.prototype.includes;
  Window_EventItem.prototype.includes = function (item) {
    if (!_Window_EventItem_includes.call(this, item)) return false;
    var subCategory = $gameTemp.eventItemSubCategory();
    return !subCategory || item.meta.subCategory === subCategory;
  };

  var _Window_EventItem_onOk = Window_EventItem.prototype.onOk;
  Window_EventItem.prototype.onOk = function () {
    _Window_EventItem_onOk.call(this);
    this._helpWindow.close();
    $gameTemp.setEventItemSubCategory(null);
  };

  var _Window_EventItem_onCancel = Window_EventItem.prototype.onCancel;
  Window_EventItem.prototype.onCancel = function () {
    _Window_EventItem_onCancel.call(this);
    this._helpWindow.close();
    $gameTemp.setEventItemSubCategory(null);
  };

  Window_EventItem.prototype.needsNumber = function () {
    var itypeId = $gameMessage.itemChoiceItypeId();
    return (itypeId === 1 && TMPlugin.EventItemEx.ShowItemNumberItem) ||
      (itypeId === 2 && TMPlugin.EventItemEx.ShowItemNumberKey) ||
      (itypeId === 3 && TMPlugin.EventItemEx.ShowItemNumberA) ||
      (itypeId === 4 && TMPlugin.EventItemEx.ShowItemNumberB);
  };

  //-----------------------------------------------------------------------------
  // Window_Message
  //

  var _Window_Message_subWindows = Window_Message.prototype.subWindows;
  Window_Message.prototype.subWindows = function () {
    var subWindows = _Window_Message_subWindows.call(this);
    subWindows.push(this._helpWindow);
    return subWindows;
  };

  var _Window_Message_createSubWindows = Window_Message.prototype.createSubWindows;
  Window_Message.prototype.createSubWindows = function () {
    _Window_Message_createSubWindows.call(this);
    this._helpWindow = new Window_Help();
    this._helpWindow.openness = 0;
    this._itemWindow.setHelpWindow(this._helpWindow);
  };

})();