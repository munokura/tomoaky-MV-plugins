//=============================================================================
// TMPlugin - 別マップでニューゲーム
// バージョン: 2.0.0
// 最終更新日: 2017/10/04
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc Add a command to start the game on a different map to the title command.
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
TMPlugin - New Game on a Different Map ver. 2.0.0

How to Use:

Add as many commands as necessary (ex1 through ex5) to the plugin parameter titleCommands (separated by spaces).
You can also remove existing commands by deleting continue or options.

Next, set the command name and parameters you want to add.
For ex1, you'll need command1 and params1.
For params1, enter the following four parameters, separated by spaces: map number, X coordinate, Y coordinate, and player direction.
The player direction is up = 8, down = 2, left = 4, and right = 6.

There are no plugin commands.

This plugin has been tested with RPG Maker MV Version 1.5.1.

This plugin is distributed under the MIT License and is free for commercial use, modification, and redistribution.

Using with Plugins with Similar Functions:

When using with a plugin that adds title commands, add the symbol of the command added by the other plugin to titleCommands.
(The symbol is the value of the second argument to addCommand.)

In this case, be sure to install TMNewGameEx.js below the other plugin.

@param titleCommands
@desc Title command order Default: newGame continue options ex1
@default newGame continue options ex1
@type string

@param command1
@desc Additional Command 1 Item Name Default: From another map
@default From another map
@type string

@param params1
@desc Additional command 1 parameters Default: 1 4 5 6
@default 1 4 5 6
@type string

@param command2
@desc Additional command 2 item name Default value:
@type string

@param params2
@desc Additional command 2 parameters Default:
@type string

@param command3
@desc Additional command 3 item name Default value:
@type string

@param params3
@desc Additional command 3 parameters Default:
@type string

@param command4
@desc Additional command 4 item name Default value:
@type string

@param params4
@desc Additional command 4 parameters Default:
@type string

@param command5
@desc Additional command 5 item name Default value:
@type string

@param params5
@desc Additional command 5 parameters Default:
@type string

@param numVisibleRows
@desc Number of lines of title commands that can be displayed at once. Default: 0 (If 0, all commands are displayed.)
@default 0
@type number
*/


/*:ja
@plugindesc タイトルコマンドに別マップからゲームを始めるコマンドを追加します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - 別マップでニューゲーム ver2.0.0

使い方:

  プラグインパラメータ titleCommands に ex1 ～ ex5 までを
  必要な分だけ追加してください。(半角スペースで区切る)
  continue や options を削除すれば、既存のコマンドを
  除外することもできます。

  次に、追加したいコマンド名とパラメータを設定してください、
  ex1 なら command1 と params1 の設定が必要になります。
  params1 には マップ番号 X座標 Y座標 プレイヤーの向き の 4 つを
  半角スペースで区切って入力します。
  プレイヤーの向きは 上=8 下=2 左=4 右=6 となっています。

  プラグインコマンドはありません。

  このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。

  このプラグインはMITライセンスのもとに配布しています、商用利用、
  改造、再配布など、自由にお使いいただけます。


類似機能をもつプラグインとの併用:

  タイトルコマンドを追加するプラグインと併用する場合、titleCommands に
  他プラグインで追加されるコマンドのsymbol(シンボル)を追加してください。
  (symbol は addCommand の 2 番目の引数の値です)

  その際、TMNewGameEx.js は他プラグインよりも下に導入してください。

@param titleCommands
@desc タイトルコマンドの並び順 初期値: newGame continue options ex1
@default newGame continue options ex1
@type string

@param command1
@desc 追加コマンド 1 の項目名 初期値: 別マップから
@default 別マップから
@type string

@param params1
@desc 追加コマンド 1 のパラメータ 初期値: 1 4 5 6
@default 1 4 5 6
@type string

@param command2
@desc 追加コマンド 2 の項目名 初期値:
@type string

@param params2
@desc 追加コマンド 2 のパラメータ 初期値:
@type string

@param command3
@desc 追加コマンド 3 の項目名 初期値:
@type string

@param params3
@desc 追加コマンド 3 のパラメータ 初期値:
@type string

@param command4
@desc 追加コマンド 4 の項目名 初期値:
@type string

@param params4
@desc 追加コマンド 4 のパラメータ 初期値:
@type string

@param command5
@desc 追加コマンド 5 の項目名 初期値:
@type string

@param params5
@desc 追加コマンド 5 のパラメータ 初期値:
@type string

@param numVisibleRows
@desc 一度に表示できるタイトルコマンドの行数 初期値: 0 ( 0 の場合コマンドをすべて表示)
@default 0
@type number
*/

var Imported = Imported || {};
Imported.TMNewGameEx = true;

(function() {

  var parameters = PluginManager.parameters('TMNewGameEx');
  var titleCommands = parameters['titleCommands'].split(' ');
  var commands = {};
  var transferParams = {};
  for (var i = 1; i < 6; i++) {
    commands['ex' + i] = parameters['command' + i];
    transferParams['ex' + i] = parameters['params' + i].split(' ').map(Number);
  }
  var numVisibleRows = +(parameters['numVisibleRows'] || 0);
  
  //-----------------------------------------------------------------------------
  // Window_TitleCommand
  //

  var _Window_TitleCommand_numVisibleRows = Window_Command.prototype.numVisibleRows;
  Window_Command.prototype.numVisibleRows = function() {
    if (numVisibleRows) return numVisibleRows;
    return _Window_TitleCommand_numVisibleRows.call(this);
  };

  var _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
  Window_TitleCommand.prototype.makeCommandList = function() {
    _Window_TitleCommand_makeCommandList.call(this);
    var listEx = [];
    for (var i = 0; i < titleCommands.length; i++) {
      for (var j = 0; j < this._list.length; j++) {
        if (titleCommands[i] === this._list[j].symbol) {
          listEx.push({
            name: this._list[j].name,
            symbol: this._list[j].symbol,
            enabled: this._list[j].enabled,
            ext: this._list[j].ext
          });
        }
      }
      if (commands[titleCommands[i]]) {
        listEx.push({
          name: commands[titleCommands[i]],
          symbol: titleCommands[i],
          enabled: true,
          ext: null
        });
      }
    }
    this._list = listEx;
  };

  //-----------------------------------------------------------------------------
  // Scene_Title
  //

  var _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
  Scene_Title.prototype.createCommandWindow = function() {
    _Scene_Title_createCommandWindow.call(this);
    for (var i = 1; i < 6; i++) {
      var symbol = 'ex' + i;
      this._commandWindow.setHandler(symbol, this.commandNewGameEx.bind(this, symbol));
    }
  };

  Scene_Title.prototype.commandNewGameEx = function(symbol) {
    DataManager.setupNewGame();
    $gamePlayer.reserveTransfer.apply($gamePlayer, transferParams[symbol]);
    this._commandWindow.close();
    this.fadeOutAll();
    SceneManager.goto(Scene_Map);
  };

})();