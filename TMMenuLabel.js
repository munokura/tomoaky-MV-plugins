//=============================================================================
// TMPlugin - メニューラベル
// バージョン: 1.1.1
// 最終更新日: 2017/02/07
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc Display the value of the variable in the menu scene.
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
TMPlugin - Menu Labels ver1.1.1

How to Use:

This plugin allows you to display up to four game variable values (labels) in the bottom left corner of the main menu.

This plugin has been tested with RPG Maker MV Version 1.3.4.

Plugin Commands:

stopMenuLabel
Disables menu labels. This setting is also saved in save data, and labels will not be displayed until the startMenuLabel command is executed.

startMenuLabel
Enables disabled menu labels.
Menu labels are enabled at the start of the game.

Plugin Parameter Notes:

labelAId - labelDId
If this value is 1 or greater, the variable value will be displayed. Otherwise,
the displayed value will change according to the following rules.
0 ... Disable label (disables label)
-1 ... Steps
-2 ... Saves
-3 ... Battles
-4 ... Wins
-5 ... Losses

labelAMax - labelDMax
If the game variable value is equal to or greater than these values, the text color number of the value displayed in the label will change from labelValueColorId to labelMaxColorId.
Also, if the game variable value is greater than the maximum value, the maximum value will be displayed.
Setting this to 0 disables this function.

labelAFooter - labelDFooter
Sets the text to display after the label value.
This function allows you to display values such as "1234 points" or "12th day."
Adjust the space between the value and the value using a half-width space.

labelNameColorId
labelValueColorId
labelMaxColorId
labelFooterColorId
Sets the text color number for each part of the label.
The number is the same as the "n" part of the control character \C[n] used in the "Show Text" Event's Contents.

footerSpace
Adjust this parameter if you want the label value and footer to be aligned with the balance window.
If both the footer and currency unit are single-byte characters, setting this to 6 will ensure they are exactly the same.

@param labelAName
@desc Name of Label A Initial value: Label A
@default Label Ａ

@param labelAId
@desc Label A game variable number Initial value: 10 (0: hidden / 1 or more: visible)
@default 10

@param labelAMax
@desc Maximum value of label A Initial value: 9999
@default 9999

@param labelAFooter
@desc Label A footer text Default:

@param labelBName
@desc Name of Label B Default: Label B
@default Label B

@param labelBId
@desc Label B game variable number Initial value: 0 (0: hidden / 1 or more: displayed)
@default 0

@param labelBMax
@desc Maximum value of label B Initial value: 9999
@default 9999

@param labelBFooter
@desc Label B footer text Default:

@param labelCName
@desc Name of Label C Initial value: Label C
@default Label C

@param labelCId
@desc Label C game variable number Initial value: 0 (0: hidden / 1 or more: displayed)
@default 0

@param labelCMax
@desc Maximum value of label C Initial value: 9999
@default 9999

@param labelCFooter
@desc Label C footer text Initial value:

@param labelDName
@desc Name of Label D Initial value: Label D
@default Label D

@param labelDId
@desc Game variable number for label D Initial value: 0 (0: hidden / 1 or more: visible)
@default 0

@param labelDMax
@desc Maximum value of label D Initial value: 9999
@default 9999

@param labelDFooter
@desc Label D footer text Default:

@param labelNameWidth
@desc Label name display width Default: 128
@default 128

@param labelValueWidth
@desc Label value display width Default: 72
@default 72

@param labelNameColorId
@desc Label name text color number Initial value: 16
@default 16

@param labelValueColorId
@desc Label value text color number Initial value: 0
@default 0

@param labelMaxColorId
@desc Text color number when label value is maximum Initial value: 2
@default 2

@param labelFooterColorId
@desc Footer text color number Initial value: 0
@default 0

@param footerSpace
@desc Gap between footer and label value Initial value: 0
@default 0

@param reverseMenuWindow
@desc Flip the window layout in the menu scene. Default: 0 (0 = Disabled / 1 = Enabled)
@default 0

@param menuTextAlign
@desc Draw position of menu command item Initial value: left ( left / center / right)
@default left
*/


/*:ja
@plugindesc メニューシーンに変数の値を表示します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - メニューラベル ver1.1.1

使い方:

  このプラグインを導入するとメインメニューの左下にゲーム変数の
  値（以下ラベル）を最大で 4 つまで表示することができるようになります。

  このプラグインは RPGツクールMV Version 1.3.4 で動作確認をしています。


プラグインコマンド:

  stopMenuLabel
    メニューラベルを無効にします。この設定はセーブデータにも記録され、
    startMenuLabel コマンドが実行されるまでラベルが表示されなくなります。

  startMenuLabel
    無効になっているメニューラベルを有効にします。
    ゲーム開始時の状態ではメニューラベルは有効になっています。


プラグインパラメータ補足:

  labelAId ～ labelDId
    この値が 1 以上のときは変数の値が表示され、それ以外の場合は
    以下のようなルールで表示される値が変化します。
     0 … ラベルの無効化（何も表示しない）
    -1 … 歩数
    -2 … セーブ回数
    -3 … 戦闘回数
    -4 … 勝利回数
    -5 … 敗北回数

  labelAMax ～ labelDMax
    ゲーム変数の値がこれらの値以上だった場合、ラベルに表示される値の
    文字色番号が labelValueColorId から labelMaxColorId に変化します。
    また、ゲーム変数の値が最大値よりも大きい場合は、最大値を表示します。
    0 を設定すると上記機能が無効になります。

  labelAFooter ～ labelDFooter
    ラベル値の後ろに表示する文字列を設定します。
    『1234 点』、『12 日目』のような表示にするための機能です、値との間の
    スペースは半角スペースなどで調整してください。

  labelNameColorId
  labelValueColorId
  labelMaxColorId
  labelFooterColorId
    ラベルの各部分ごとの文字色番号を設定します。
    番号はイベントコマンド『文章の表示』などで使う制御文字 \C[n] の
    n の部分と同じものになります。

  footerSpace
    ラベル値とフッターの表示位置を所持金ウィンドウとそろえたいときは
    このパラメータを調節してください。フッターと通貨単位がともに
    全角 1 文字の場合は 6 を設定するとちょうど同じになります。

@param labelAName
@desc ラベルＡの名前 初期値: ラベルＡ
@default ラベルＡ

@param labelAId
@desc ラベルＡのゲーム変数番号 初期値: 10（ 0 で非表示 / 1 以上で表示）
@default 10

@param labelAMax
@desc ラベルＡの最大値 初期値: 9999
@default 9999

@param labelAFooter
@desc ラベルＡのフッターテキスト 初期値:

@param labelBName
@desc ラベルＢの名前 初期値: ラベルＢ
@default ラベルＢ

@param labelBId
@desc ラベルＢのゲーム変数番号 初期値: 0（ 0 で非表示 / 1 以上で表示）
@default 0

@param labelBMax
@desc ラベルＢの最大値 初期値: 9999
@default 9999

@param labelBFooter
@desc ラベルＢのフッターテキスト 初期値:

@param labelCName
@desc ラベルＣの名前 初期値: ラベルＣ
@default ラベルＣ

@param labelCId
@desc ラベルＣのゲーム変数番号 初期値: 0（ 0 で非表示 / 1 以上で表示）
@default 0

@param labelCMax
@desc ラベルＣの最大値 初期値: 9999
@default 9999

@param labelCFooter
@desc ラベルＣのフッターテキスト 初期値:

@param labelDName
@desc ラベルＤの名前 初期値: ラベルＤ
@default ラベルＤ

@param labelDId
@desc ラベルＤのゲーム変数番号 初期値: 0（ 0 で非表示 / 1 以上で表示）
@default 0

@param labelDMax
@desc ラベルＤの最大値 初期値: 9999
@default 9999

@param labelDFooter
@desc ラベルＤのフッターテキスト 初期値:

@param labelNameWidth
@desc ラベル名の表示幅 初期値: 128
@default 128

@param labelValueWidth
@desc ラベル値の表示幅 初期値: 72
@default 72

@param labelNameColorId
@desc ラベル名の文字色番号 初期値: 16
@default 16

@param labelValueColorId
@desc ラベル値の文字色番号 初期値: 0
@default 0

@param labelMaxColorId
@desc ラベル値が最大のときの文字色番号 初期値: 2
@default 2

@param labelFooterColorId
@desc フッターの文字色番号 初期値: 0
@default 0

@param footerSpace
@desc フッターとラベル値の間隔 初期値: 0
@default 0

@param reverseMenuWindow
@desc メニューシーンのウィンドウ配置を左右反転 初期値: 0 ( 0 = 無効 / 1 = 有効)
@default 0

@param menuTextAlign
@desc メニューコマンド項目の描画位置 初期値: left ( left / center / right)
@default left
*/

var Imported = Imported || {};
Imported.TMMenuLabel = true;

var TMPlugin = TMPlugin || {};
TMPlugin.MenuLabel = {};
TMPlugin.MenuLabel.Parameters = PluginManager.parameters('TMMenuLabel');
TMPlugin.MenuLabel.Labels = [];
TMPlugin.MenuLabel.Labels[0] = {name: TMPlugin.MenuLabel.Parameters['labelAName'],
                                id: +(TMPlugin.MenuLabel.Parameters['labelAId'] || 10),
                                max: +(TMPlugin.MenuLabel.Parameters['labelAMax'] || 9999),
                                footer: TMPlugin.MenuLabel.Parameters['labelAFooter']};
TMPlugin.MenuLabel.Labels[1] = {name: TMPlugin.MenuLabel.Parameters['labelBName'],
                                id: +(TMPlugin.MenuLabel.Parameters['labelBId'] || 10),
                                max: +(TMPlugin.MenuLabel.Parameters['labelBMax'] || 9999),
                                footer: TMPlugin.MenuLabel.Parameters['labelBFooter']};
TMPlugin.MenuLabel.Labels[2] = {name: TMPlugin.MenuLabel.Parameters['labelCName'],
                                id: +(TMPlugin.MenuLabel.Parameters['labelCId'] || 10),
                                max: +(TMPlugin.MenuLabel.Parameters['labelCMax'] || 9999),
                                footer: TMPlugin.MenuLabel.Parameters['labelCFooter']};
TMPlugin.MenuLabel.Labels[3] = {name: TMPlugin.MenuLabel.Parameters['labelDName'],
                                id: +(TMPlugin.MenuLabel.Parameters['labelDId'] || 10),
                                max: +(TMPlugin.MenuLabel.Parameters['labelDMax'] || 9999),
                                footer: TMPlugin.MenuLabel.Parameters['labelDFooter']};
TMPlugin.MenuLabel.NameWidth     = +(TMPlugin.MenuLabel.Parameters['labelNameWidth'] || 160);
TMPlugin.MenuLabel.ValueWidth    = +(TMPlugin.MenuLabel.Parameters['labelValueWidth'] || 96);
TMPlugin.MenuLabel.NameColorId   = +(TMPlugin.MenuLabel.Parameters['labelNameColorId'] || 16);
TMPlugin.MenuLabel.ValueColorId  = +(TMPlugin.MenuLabel.Parameters['labelValueColorId'] || 0);
TMPlugin.MenuLabel.MaxColorId    = +(TMPlugin.MenuLabel.Parameters['labelMaxColorId'] || 2);
TMPlugin.MenuLabel.FooterColorId = +(TMPlugin.MenuLabel.Parameters['labelFooterColorId'] || 0);
TMPlugin.MenuLabel.FooterSpace   = +(TMPlugin.MenuLabel.Parameters['footerSpace'] || 0);
TMPlugin.MenuLabel.ReverseMenuWindow = TMPlugin.MenuLabel.Parameters['reverseMenuWindow'] === '1';
TMPlugin.MenuLabel.MenuTextAlign = TMPlugin.MenuLabel.Parameters['menuTextAlign'] || 'left';

(function() {

  //-----------------------------------------------------------------------------
  // Game_System
  //

  Game_System.prototype.isMenuLabelEnabled = function() {
    if (this._menuLabelEnabled === undefined) this._menuLabelEnabled = true;
    return this._menuLabelEnabled;
  };

  Game_System.prototype.setMenuLabel = function(flag) {
    this._menuLabelEnabled = flag;
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'startMenuLabel') {
      $gameSystem.setMenuLabel(true);
    } else if (command === 'stopMenuLabel') {
      $gameSystem.setMenuLabel(false);
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_MenuCommand
  //

  Window_MenuCommand.prototype.itemTextAlign = function() {
    return TMPlugin.MenuLabel.MenuTextAlign;
  };

  //-----------------------------------------------------------------------------
  // Window_MenuLabel
  //

  function Window_MenuLabel() {
    this.initialize.apply(this, arguments);
  }

  Window_MenuLabel.prototype = Object.create(Window_Base.prototype);
  Window_MenuLabel.prototype.constructor = Window_MenuLabel;

  Window_MenuLabel.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
  };

  Window_MenuLabel.prototype.maxItems = function() {
    var n = 0;
    for (var i = 0; i < 4; i++) {
      if (TMPlugin.MenuLabel.Labels[i].id !== 0) n++;
    }
    return n;
  };

  Window_MenuLabel.prototype.windowWidth = function() {
    return 240;
  };

  Window_MenuLabel.prototype.windowHeight = function() {
    return this.fittingHeight(this.maxItems());
  };

  Window_MenuLabel.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    var lineHeight = this.lineHeight();
    this.contents.clear();
    var x = this.contents.width - this.textPadding();
    var y = 0;
    for (var i = 0; i < 4; i++) {
      var label = TMPlugin.MenuLabel.Labels[i];
      var value = this.labelValue(label.id);
      if (value != null) {
        this.drawMenuLabel(x, y, label, value);
        y += lineHeight;
      }
    }
  };

  Window_MenuLabel.prototype.labelValue = function(id) {
    if (id > 0) {
      return $gameVariables.value(id);
    } else if (id === -1) {
      return $gameParty.steps();
    } else if (id === -2) {
      return $gameSystem.saveCount();
    } else if (id === -3) {
      return $gameSystem.battleCount();
    } else if (id === -4) {
      return $gameSystem.winCount();
    } else if (id === -5) {
      return $gameSystem.escapeCount();
    }
    return null;
  };

  Window_MenuLabel.prototype.drawMenuLabel = function(x, y, label, value) {
    if (label.footer) {
      var footerWidth = this.textWidth(label.footer);
      x -= footerWidth;
      this.changeTextColor(this.textColor(TMPlugin.MenuLabel.FooterColorId));
      this.drawText(label.footer, x, y, footerWidth);
      x -= TMPlugin.MenuLabel.FooterSpace;
    }
    x -= TMPlugin.MenuLabel.ValueWidth;
    this.changeTextColor(this.textColor(TMPlugin.MenuLabel.ValueColorId));
    if (label.max && value >= label.max) {
      value = label.max;
      this.changeTextColor(this.textColor(TMPlugin.MenuLabel.MaxColorId));
    }
    this.drawText(value, x, y, TMPlugin.MenuLabel.ValueWidth, 'right');
    if (label.name) {
      this.changeTextColor(this.textColor(TMPlugin.MenuLabel.NameColorId));
      this.drawText(label.name, this.textPadding(), y, TMPlugin.MenuLabel.NameWidth);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Menu
  //

  var _Scene_Menu_create = Scene_Menu.prototype.create;
  Scene_Menu.prototype.create = function() {
    _Scene_Menu_create.call(this);
    if ($gameSystem.isMenuLabelEnabled()) this.createMenuLabelWindow();
    if (TMPlugin.MenuLabel.ReverseMenuWindow) {
      this._statusWindow.x = 0;
      this._commandWindow.x = this._statusWindow.width;
      this._goldWindow.x = this._commandWindow.x
      if (this._menuLabelWindow) this._menuLabelWindow.x = this._commandWindow.x
    }
  };

  Scene_Menu.prototype.createMenuLabelWindow = function() {
    this._menuLabelWindow = new Window_MenuLabel(0, 0);
    this._menuLabelWindow.y = this._goldWindow.y - this._menuLabelWindow.height;
    this.addWindow(this._menuLabelWindow);
  };

})();