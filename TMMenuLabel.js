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
 * @plugindesc メニューシーンに変数の値を表示します。
 * 歩数や戦闘回数などを表示することもできます。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param labelAName
 * @desc ラベルＡの名前
 * 初期値: ラベルＡ
 * @default ラベルＡ
 *
 * @param labelAId
 * @desc ラベルＡのゲーム変数番号
 * 初期値: 10（ 0 で非表示 / 1 以上で表示）
 * @default 10
 *
 * @param labelAMax
 * @desc ラベルＡの最大値
 * 初期値: 9999
 * @default 9999
 *
 * @param labelAFooter
 * @desc ラベルＡのフッターテキスト
 * 初期値: 
 * @default 
 *
 * @param labelBName
 * @desc ラベルＢの名前
 * 初期値: ラベルＢ
 * @default ラベルＢ
 *
 * @param labelBId
 * @desc ラベルＢのゲーム変数番号
 * 初期値: 0（ 0 で非表示 / 1 以上で表示）
 * @default 0
 *
 * @param labelBMax
 * @desc ラベルＢの最大値
 * 初期値: 9999
 * @default 9999
 *
 * @param labelBFooter
 * @desc ラベルＢのフッターテキスト
 * 初期値: 
 * @default 
 *
 * @param labelCName
 * @desc ラベルＣの名前
 * 初期値: ラベルＣ
 * @default ラベルＣ
 *
 * @param labelCId
 * @desc ラベルＣのゲーム変数番号
 * 初期値: 0（ 0 で非表示 / 1 以上で表示）
 * @default 0
 *
 * @param labelCMax
 * @desc ラベルＣの最大値
 * 初期値: 9999
 * @default 9999
 *
 * @param labelCFooter
 * @desc ラベルＣのフッターテキスト
 * 初期値: 
 * @default 
 *
 * @param labelDName
 * @desc ラベルＤの名前
 * 初期値: ラベルＤ
 * @default ラベルＤ
 *
 * @param labelDId
 * @desc ラベルＤのゲーム変数番号
 * 初期値: 0（ 0 で非表示 / 1 以上で表示）
 * @default 0
 *
 * @param labelDMax
 * @desc ラベルＤの最大値
 * 初期値: 9999
 * @default 9999
 *
 * @param labelDFooter
 * @desc ラベルＤのフッターテキスト
 * 初期値: 
 * @default 
 *
 * @param labelNameWidth
 * @desc ラベル名の表示幅
 * 初期値: 128
 * @default 128
 *
 * @param labelValueWidth
 * @desc ラベル値の表示幅
 * 初期値: 72
 * @default 72
 *
 * @param labelNameColorId
 * @desc ラベル名の文字色番号
 * 初期値: 16
 * @default 16
 *
 * @param labelValueColorId
 * @desc ラベル値の文字色番号
 * 初期値: 0
 * @default 0
 *
 * @param labelMaxColorId
 * @desc ラベル値が最大のときの文字色番号
 * 初期値: 2
 * @default 2
 *
 * @param labelFooterColorId
 * @desc フッターの文字色番号
 * 初期値: 0
 * @default 0
 *
 * @param footerSpace
 * @desc フッターとラベル値の間隔
 * 初期値: 0
 * @default 0
 *
 * @param reverseMenuWindow
 * @desc メニューシーンのウィンドウ配置を左右反転
 * 初期値: 0 ( 0 = 無効 / 1 = 有効)
 * @default 0
 *
 * @param menuTextAlign
 * @desc メニューコマンド項目の描画位置
 * 初期値: left ( left / center / right)
 * @default left
 *
 * @help
 * TMPlugin - メニューラベル ver1.1.1

 * 使い方:
 *
 *   このプラグインを導入するとメインメニューの左下にゲーム変数の
 *   値（以下ラベル）を最大で 4 つまで表示することができるようになります。
 *
 *   このプラグインは RPGツクールMV Version 1.3.4 で動作確認をしています。
 *
 *
 * プラグインコマンド:
 *
 *   stopMenuLabel
 *     メニューラベルを無効にします。この設定はセーブデータにも記録され、
 *     startMenuLabel コマンドが実行されるまでラベルが表示されなくなります。
 *
 *   startMenuLabel
 *     無効になっているメニューラベルを有効にします。
 *     ゲーム開始時の状態ではメニューラベルは有効になっています。
 *
 *
 * プラグインパラメータ補足:
 *
 *   labelAId ～ labelDId
 *     この値が 1 以上のときは変数の値が表示され、それ以外の場合は
 *     以下のようなルールで表示される値が変化します。
 *      0 … ラベルの無効化（何も表示しない）
 *     -1 … 歩数
 *     -2 … セーブ回数
 *     -3 … 戦闘回数
 *     -4 … 勝利回数
 *     -5 … 敗北回数
 *
 *   labelAMax ～ labelDMax
 *     ゲーム変数の値がこれらの値以上だった場合、ラベルに表示される値の
 *     文字色番号が labelValueColorId から labelMaxColorId に変化します。
 *     また、ゲーム変数の値が最大値よりも大きい場合は、最大値を表示します。
 *     0 を設定すると上記機能が無効になります。
 *
 *   labelAFooter ～ labelDFooter
 *     ラベル値の後ろに表示する文字列を設定します。
 *     『1234 点』、『12 日目』のような表示にするための機能です、値との間の
 *     スペースは半角スペースなどで調整してください。
 *
 *   labelNameColorId
 *   labelValueColorId
 *   labelMaxColorId
 *   labelFooterColorId
 *     ラベルの各部分ごとの文字色番号を設定します。
 *     番号はイベントコマンド『文章の表示』などで使う制御文字 \C[n] の
 *     n の部分と同じものになります。
 * 
 *   footerSpace
 *     ラベル値とフッターの表示位置を所持金ウィンドウとそろえたいときは
 *     このパラメータを調節してください。フッターと通貨単位がともに
 *     全角 1 文字の場合は 6 を設定するとちょうど同じになります。
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
