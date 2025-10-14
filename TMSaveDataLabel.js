//=============================================================================
// TMPlugin - セーブデータラベル
// バージョン: 2.0.0
// 最終更新日: 2016/08/12
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc Displays the value of the variable in the save file window.
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
How to Use:

This plugin allows you to display up to two game variable values (labels) in the upper right corner of the save file window.

For save data created before installing the plugin, labels will not be displayed until the save is replayed.

There are no plugin commands.

This plugin has been tested with RPG Maker MV Version 1.3.0.

Plugin Parameter Notes:

labelAFooter / labelBFooter
Sets the string to be displayed after the label value.
This function allows you to display values such as "1234 points" or "12th day." Adjust the space between the values using a half-width space.

labelAMax / labelBMax
If the game variable value is equal to or greater than these values, the text color number of the value displayed in the label will change from labelValueColorId to labelMaxColorId.
Also, if the game variable value is greater than the maximum value, the maximum value will be displayed.
Setting this to 0 will disable this function.

labelNameColorId
labelValueColorId
labelMaxColorId
labelFooterColorId
Sets the text color number for each part of the label.
The number is the same as the "n" part of the control character \C[n] used in the Event's Contents "Show Text," etc.

@param labelAName
@desc Name of Label A Initial value: Label A
@default Label A

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
@desc Label B game variable number Initial value: 0 (0: hidden / 1 or more: visible)
@default 0

@param labelBMax
@desc Maximum value of label B Initial value: 9999
@default 9999

@param labelBFooter
@desc Label B footer text Default:

@param labelNameWidth
@desc Label name display width Default: 160
@default 160

@param labelValueWidth
@desc Label value display width Default: 96
@default 96

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
*/


/*:ja
@plugindesc セーブファイルウィンドウに変数の値を表示します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
使い方:

  このプラグインを導入するとセーブファイルウィンドウの右上にゲーム変数の
  値（以下ラベル）を最大で２つまで表示することができるようになります。

  プラグイン導入前に作成されたセーブデータは、再度セーブが実行されるまで
  ラベルは表示されません。

  プラグインコマンドはありません。

  このプラグインは RPGツクールMV Version 1.3.0 で動作確認をしています。


プラグインパラメータ補足:

  labelAFooter / labelBFooter
    ラベル値の後ろに表示する文字列を設定します。
    『1234 点』、『12 日目』のような表示にするための機能です、値との間の
    スペースは半角スペースなどで調整してください。

  labelAMax / labelBMax
    ゲーム変数の値がこれらの値以上だった場合、ラベルに表示される値の
    文字色番号が labelValueColorId から labelMaxColorId に変化します。
    また、ゲーム変数の値が最大値よりも大きい場合は、最大値を表示します。
    0 を設定すると上記機能が無効になります。

  labelNameColorId
  labelValueColorId
  labelMaxColorId
  labelFooterColorId
    ラベルの各部分ごとの文字色番号を設定します。
    番号はイベントコマンド『文章の表示』などで使う制御文字 \C[n] の
    n の部分と同じものになります。

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

@param labelNameWidth
@desc ラベル名の表示幅 初期値: 160
@default 160

@param labelValueWidth
@desc ラベル値の表示幅 初期値: 96
@default 96

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
*/

var Imported = Imported || {};
Imported.TMSaveDataLabel = true;

var TMPlugin = TMPlugin || {};
TMPlugin.SaveDataLabel = {};
TMPlugin.SaveDataLabel.Parameters = PluginManager.parameters('TMSaveDataLabel');
TMPlugin.SaveDataLabel.LabelAName = TMPlugin.SaveDataLabel.Parameters['labelAName'];
TMPlugin.SaveDataLabel.LabelAId = +(TMPlugin.SaveDataLabel.Parameters['labelAId'] || 10);
TMPlugin.SaveDataLabel.LabelAMax = +(TMPlugin.SaveDataLabel.Parameters['labelAMax'] || 9999);
TMPlugin.SaveDataLabel.LabelAFooter = TMPlugin.SaveDataLabel.Parameters['labelAFooter'];
TMPlugin.SaveDataLabel.LabelBName = TMPlugin.SaveDataLabel.Parameters['labelBName'];
TMPlugin.SaveDataLabel.LabelBId = +(TMPlugin.SaveDataLabel.Parameters['labelBId'] || 0);
TMPlugin.SaveDataLabel.LabelBMax = +(TMPlugin.SaveDataLabel.Parameters['labelBMax'] || 9999);
TMPlugin.SaveDataLabel.LabelBFooter = TMPlugin.SaveDataLabel.Parameters['labelBFooter'];
TMPlugin.SaveDataLabel.NameWidth = +(TMPlugin.SaveDataLabel.Parameters['labelNameWidth'] || 160);
TMPlugin.SaveDataLabel.ValueWidth = +(TMPlugin.SaveDataLabel.Parameters['labelValueWidth'] || 96);
TMPlugin.SaveDataLabel.NameColorId = +(TMPlugin.SaveDataLabel.Parameters['labelNameColorId'] || 16);
TMPlugin.SaveDataLabel.ValueColorId = +(TMPlugin.SaveDataLabel.Parameters['labelValueColorId'] || 0);
TMPlugin.SaveDataLabel.MaxColorId = +(TMPlugin.SaveDataLabel.Parameters['labelMaxColorId'] || 2);
TMPlugin.SaveDataLabel.FooterColorId = +(TMPlugin.SaveDataLabel.Parameters['labelFooterColorId'] || 0);
  
(function() {

  //-----------------------------------------------------------------------------
  // DataManager
  //
  
  var _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
  DataManager.makeSavefileInfo = function() {
    var info = _DataManager_makeSavefileInfo.call(this);
    info.labelA = TMPlugin.SaveDataLabel.LabelAId ? $gameVariables.value(TMPlugin.SaveDataLabel.LabelAId) : 0;
    info.labelB = TMPlugin.SaveDataLabel.LabelBId ? $gameVariables.value(TMPlugin.SaveDataLabel.LabelBId) : 0;
    return info;
  };

  //-----------------------------------------------------------------------------
  // Window_SavefileList
  //
  
  var _Window_SavefileList_drawItem = Window_SavefileList.prototype.drawItem;
  Window_SavefileList.prototype.drawItem = function(index) {
    _Window_SavefileList_drawItem.call(this, index);
    var id = index + 1;
    var valid = DataManager.isThisGameFile(id);
    var info = DataManager.loadSavefileInfo(id)
    if (info && valid) {
      var rect = this.itemRectForText(index);
      var x = rect.width + this.textPadding();
      if (TMPlugin.SaveDataLabel.LabelAId && info.labelA != null) {
        var label = {name: TMPlugin.SaveDataLabel.LabelAName, value: info.labelA,
                     max: TMPlugin.SaveDataLabel.LabelAMax,
                     footer: TMPlugin.SaveDataLabel.LabelAFooter};
        this.drawSaveDataLabel(x, rect.y, label);
      }
      if (TMPlugin.SaveDataLabel.LabelBId && info.labelB != null) {
        var label = {name: TMPlugin.SaveDataLabel.LabelBName, value: info.labelB,
                     max: TMPlugin.SaveDataLabel.LabelBMax,
                     footer: TMPlugin.SaveDataLabel.LabelBFooter};
        this.drawSaveDataLabel(x, rect.y + this.lineHeight(), label);
      }
    }
  };

  Window_SavefileList.prototype.drawSaveDataLabel = function(x, y, label) {
    if (label.footer) {
      var footerWidth = this.textWidth(label.footer);
      x -= footerWidth;
      this.changeTextColor(this.textColor(TMPlugin.SaveDataLabel.FooterColorId));
      this.drawText(label.footer, x, y, footerWidth);
    }
    x -= TMPlugin.SaveDataLabel.ValueWidth;
    this.changeTextColor(this.textColor(TMPlugin.SaveDataLabel.ValueColorId));
    if (label.max && label.value >= label.max) {
      label.value = label.max;
      this.changeTextColor(this.textColor(TMPlugin.SaveDataLabel.MaxColorId));
    }
    this.drawText(label.value, x, y, TMPlugin.SaveDataLabel.ValueWidth, 'right');
    if (label.name) {
      x -= TMPlugin.SaveDataLabel.NameWidth;
      this.changeTextColor(this.textColor(TMPlugin.SaveDataLabel.NameColorId));
      this.drawText(label.name, x, y, TMPlugin.SaveDataLabel.NameWidth);
    }
  };

})();