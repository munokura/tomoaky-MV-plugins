//=============================================================================
// TMPlugin - 最強全脱ぎコマンド削除
// バージョン: 1.1.1
// 最終更新日: 2017/10/06
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc Remove the command window from the equipment scene.
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
TMPlugin - Remove All Undress Command ver. 1.1.1

How to Use:

With the slot window active, press Shift to equip the strongest gear,

Press Ctrl or Alt to undress all gear.

You can also use the Q or W key to change actors while the slot window is active.

The current version does not support mouse or touch controls.

There are no plugin commands.

This plugin has been tested with RPG Maker MV Version 1.5.1.

This plugin is distributed under the MIT License and is free for commercial use, modification, and redistribution.

@param useOptimize
@desc Use the Optimize with the Shift key. Default: ON ( false = OFF disabled / true = ON enabled )
@default true
@type boolean

@param useClear
@desc Use Ctrl (Alt) key to clear all. Default: ON (false = OFF disabled / true = ON enabled)
@default true
@type boolean
*/


/*:ja
@plugindesc 装備シーンからコマンドウィンドウを削除し、
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - 最強全脱ぎコマンド削除 ver1.1.1

使い方:

  スロットウィンドウがアクティブな状態で Shift キーを押せば最強装備、
  Ctrl または Alt キーを押せば全て外すが実行されます。

  Q または W キーによるアクター変更もスロットウィンドウが
  アクティブな状態で実行できます。

  現在のバージョンではマウス、タッチ操作には対応していません。

  プラグインコマンドはありません。

  このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。

  このプラグインはMITライセンスのもとに配布しています、商用利用、
  改造、再配布など、自由にお使いいただけます。

@param useOptimize
@desc Shiftキーによる最強装備を利用する。 初期値: ON ( false = OFF 無効 / true = ON 有効 )
@default true
@type boolean

@param useClear
@desc Ctrl(Alt)キーによる全て外すを利用する。 初期値: ON ( false = OFF 無効 / true = ON 有効 )
@default true
@type boolean
*/

var Imported = Imported || {};
Imported.TMOmitEquipCommand = true;

(function() {

  var parameters = PluginManager.parameters('TMOmitEquipCommand');
  var useOptimize = JSON.parse(parameters['useOptimize']);
  var useClear = JSON.parse(parameters['useClear']);

  //-----------------------------------------------------------------------------
  // Scene_Equip
  //

  var _Scene_Equip_create = Scene_Equip.prototype.create;
  Scene_Equip.prototype.create = function() {
    _Scene_Equip_create.call(this);
    this._slotWindow.activate();
    this._slotWindow.select(0);
  };

  var _Scene_Equip_createCommandWindow = Scene_Equip.prototype.createCommandWindow;
  Scene_Equip.prototype.createCommandWindow = function() {
    _Scene_Equip_createCommandWindow.call(this);
    this._commandWindow.hide();
    this._commandWindow.deactivate();
  };

  Scene_Equip.prototype.createSlotWindow = function() {
    var wx = this._statusWindow.width;
    var wy = this._statusWindow.y;
    var ww = Graphics.boxWidth - this._statusWindow.width;
    var wh = this._statusWindow.height;
    this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
    this._slotWindow.setHelpWindow(this._helpWindow);
    this._slotWindow.setStatusWindow(this._statusWindow);
    this._slotWindow.setHandler('ok', this.onSlotOk.bind(this));
    this._slotWindow.setHandler('cancel', this.popScene.bind(this));
    this._slotWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._slotWindow.setHandler('pageup', this.previousActor.bind(this));
    this.addWindow(this._slotWindow);
  };

  Scene_Equip.prototype.onActorChange = function() {
    this.refreshActor();
    this._slotWindow.activate();
  };
  
  Scene_Equip.prototype.commandOptimize = function() {
    SoundManager.playEquip();
    this.actor().optimizeEquipments();
    this._itemWindow.refresh();
    this._statusWindow.refresh();
    this._slotWindow.refresh();
    this._slotWindow.activate();
  };

  Scene_Equip.prototype.commandClear = function() {
    SoundManager.playEquip();
    this.actor().clearEquipments();
    this._itemWindow.refresh();
    this._statusWindow.refresh();
    this._slotWindow.refresh();
    this._slotWindow.activate();
  };

  var _Scene_Equip_update = Scene_Equip.prototype.update;
  Scene_Equip.prototype.update = function() {
    _Scene_Equip_update.call(this);
    if (this._slotWindow.active) {
      if (Input.isTriggered('shift') && useOptimize) {
        this.commandOptimize();
      } else if (Input.isTriggered('control') && useClear) {
        this.commandClear();
      }
    }
  };

})();