//=============================================================================
// TMVplugin - SameGame
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 0.31b
// 最終更新日: 2016/03/04
//=============================================================================
/*:
@plugindesc We will add something that looks like Samegame.
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/tomoaky-MV-plugins ).
Original plugin by tomoaky.
-----
Preparation:
Place the image file SamegameCursor.png in the img/system folder.
It is distributed together with this plugin on the distribution page.
https://github.com/munokura/tomoaky-MV-plugins/tree/master/img/system

Rules:
Click (tap) on an area where two or more icons of the same type are adjacent to each other to remove them.
The more icons you remove at once, the higher your score.

How to Use:
Start SameGame by entering [samegame]
in option 1 of the "Show Options" Event's Contents. (The brackets are half-width characters.)
In option 2, enter the following five numbers, separated by a space:
- Number of icons arranged horizontally
- Number of icons arranged vertically
- Width of each icon (number of dots)
- Height of each icon (number of dots)
- Type of icon
Example: 14 8 32 32 5
In this example, we start with five types of 32x32 dot icons, arranged randomly, 14 horizontally and 8 vertically, for a total of 112 icons.

When there are no more icons to clear, the game ends and option 1 is executed.

You can set a time limit in option 3 using half-width numbers. After the number of seconds you entered has elapsed, SameGame will be forced to close and option 3 will be executed.

Plugin Commands:
samegameScore 4 # Assign score to variable 4
samegameTime 5 # Assign required time to variable 5
samegameAllIcons 7 # Assign total remaining icons to variable 7
samegameIcons 0 8 # Assign remaining icons by type to variable 8
The first number specifies the icon type.
If there are 5 icon types, use 0 to 4.
samegameAllIconsS 9 # Assign total initial icons to variable 9
samegameIconsS 0 11 # Assign initial initial icons by type to variable 11.

The results obtained from these commands will be those of the most recently executed SameGame. If you save and load between the execution of SameGame and the execution of the plugin command, you will not be able to obtain the results.

The value obtained from the samegameTime command is in milliseconds.
To convert it to seconds, use the "Variable Operation" Event's Contents and divide the value by 1000.

Notes:
If you launch SameGame immediately after issuing the "Show Text" command,
the message window will not close and SameGame will launch without closing.
If you want to launch SameGame after closing the message window,
add a "Wait" of at least one frame between "Show Text" and "Show Choices."

Also, the vertical position of the SameGame window is affected by the vertical position of the message window, so you can change the vertical position of the SameGame window by using a message window with a transparent background and empty content.

Special Uses:
By using a plugin command with a parallel event while SameGame is running,
you can obtain the current score and time required.
This allows for a variety of tweaks, such as notifying players with pictures or sound effects when time is running low.

@param samegameCommand
@desc SameGame launch string used for the "Show options" command. Default: [samegame]
@default [samegame]

@param samegameIcons
@desc Icon numbers to be used in the game (separated by spaces) Default: 97 128 176 265 301
@default 97 128 176 265 301

@param timeupSe
@desc Sound effect played when time runs out (file name, volume, pitch, pan) Default: Explosion2 90 100 0
@default Explosion2 90 100 0

@param clearSe
@desc Sound effect played when the game ends (file name, volume, pitch, pan) Default: Applause1 90 100 0
@default Applause1 90 100 0
*/


/*:ja
@plugindesc いわゆるさめがめっぽいものを追加します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT

@help
準備:
  画像ファイル SamegameCursor.png を img/system フォルダに置いてください。
  このプラグインの配布元ページで一緒に配布しています。
https://github.com/munokura/tomoaky-MV-plugins/tree/master/img/system

ルール:
  同じ種類のアイコンが２個以上隣接しているところをクリック（タップ）
  することでそのアイコンを消すことができます。
  同時により多くの数のアイコンを消すと得られる得点がアップします。

使い方:
  イベントコマンド『選択肢の表示』の選択肢１番に [samegame] と
  入力することでSameGameが起動します。（括弧は半角です）
  選択肢２番には以下の５つの数値を半角スペースで区切って入力します。
  ・横に並ぶアイコンの数
  ・縦に並ぶアイコンの数
  ・アイコン１つの幅（ドット数）
  ・アイコン１つの高さ（ドット数）
  ・アイコンの種類
  例）14 8 32 32 5
  この例では１つが32*32ドットのアイコン５種類を、横に１４、縦に８、
  計１１２個ランダムに並べた状態でスタートします。

  これ以上消せるアイコンがない状態になるとゲーム終了となり、選択肢１番の
  処理が実行されます。

  選択肢３番に半角数字で制限時間を設定することができます。入力した秒数が
  経過するとSameGameが強制終了し、選択肢３番の処理が実行されます。

プラグインコマンド:
  samegameScore 4        # 得点を変数４番に代入
  samegameTime 5         # 所要時間を変数５番に代入
  samegameAllIcons 7     # 残りの総アイコン数を変数７番に代入
  samegameIcons 0 8      # 種類別の残りアイコン数を変数８番に代入
                           最初の数値でアイコンの種類を指定します
                           アイコンが５種類なら 0 ～ 4
  samegameAllIconsS 9    # 開始時の総アイコン数を変数９番に代入
  samegameIconsS 0 11    # 開始時の種類別アイコン数を変数１１番に代入

  これらのコマンドで得られる結果は直前に実行されたSamegameのものに
  なります。SameGameとプラグインコマンド実行までの間にセーブ＆ロードを
  はさむと結果が取得できなくなります。

  samegameTime コマンドで得られる値の単位はミリ秒になっていますので、
  秒に変換したい場合はイベントコマンド『変数の操作』を使い、この値を
  1000 で割ってください。

注意事項:
  『文章の表示』コマンドの直後にSameGameを起動した場合、
  メッセージウィンドウが閉じずにそのままSameGameが起動します。
  メッセージウィンドウを閉じてからSameGameを起動したい場合は
  『文章の表示』と『選択肢の表示』の間に『ウェイト』を 1 フレーム以上
  入れてください。

  また、SameGameウィンドウの上下位置はメッセージウィンドウの
  上下位置に影響を受けるので、背景が透明で内容が空のメッセージウィンドウを
  使えばSameGameウィンドウの上下位置を変更することができます。

特殊な使い方:
  SameGameの実行中に並列イベントを使ってプラグインコマンドを使用すると
  現在の得点や所要時間を取得することができます。
  これを使えば残り時間が少なくなったときにピクチャや効果音で知らせるなど
  いろいろとアレンジができると思います。

@param samegameCommand
@desc 『選択肢の表示』コマンドで使用するSameGame起動文字列。 初期値: [samegame]
@default [samegame]

@param samegameIcons
@desc ゲームに使用するアイコン番号（半角スペース区切り） 初期値: 97 128 176 265 301
@default 97 128 176 265 301

@param timeupSe
@desc 時間切れ時に鳴らす効果音（ファイル名 音量 ピッチ パン） 初期値: Explosion2 90 100 0
@default Explosion2 90 100 0

@param clearSe
@desc ゲーム終了時に鳴らす効果音（ファイル名 音量 ピッチ パン） 初期値: Applause1 90 100 0
@default Applause1 90 100 0
*/

var Imported = Imported || {};
Imported.TMSameGame = true;

(function() {

  var parameters = PluginManager.parameters('TMSameGame');
  var samegameCommand = parameters['samegameCommand'];
  var a = parameters['samegameIcons'].split(' ');
  var samegameIcons = [];
  for (var i = 0; i < a.length; i++) {
    samegameIcons[i] = Number(a[i]);
  }
  var a = parameters['timeupSe'].split(' ');
  var timeupSe = { name: a[0], volume: a[1], pitch: a[2], pan: a[3] };
  var a = parameters['clearSe'].split(' ');
  var clearSe = { name: a[0], volume: a[1], pitch: a[2], pan: a[3] };
  
  //-----------------------------------------------------------------------------
  // Game_Temp
  //

  var _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.call(this);
    this._samegameScore = 0;
    this._samegameTime  = 0;
  };

  Game_Temp.prototype.setSamegameScore = function(score, time) {
    this._samegameScore = score;
    this._samegameTime  = time;
  };
  
  Game_Temp.prototype.setSamegameStartIcons = function(samegameMap) {
    this._samegameAllIconsS = samegameMap.length;
    this._samegameIcons = [];
    this._samegameIconsS = [];
    for (var i = 0; i < samegameMap.length; i++) {
      var index = samegameMap[i];
      this._samegameIconsS[index] = this._samegameIconsS[index] || 0;
      this._samegameIconsS[index]++;
    }
    for (var i = 0; i < this._samegameIconsS.length; i++) {
      this._samegameIcons[i] = this._samegameIconsS[i];
    }
  };
  
  Game_Temp.prototype.loseSamegameIcon = function(index, value) {
    this._samegameIcons[index] -= value;
  };
  
  Game_Temp.prototype.samegameScore = function() {
    return this._samegameScore;
  };
  
  Game_Temp.prototype.samegameTime = function() {
    return this._samegameTime;
  };
  
  Game_Temp.prototype.samegameAllIcons = function() {
    if (!this._samegameIcons) return 0;
    var result = 0;
    for (var i = 0; i < this._samegameIcons.length; i++) {
      result += this._samegameIcons[i];
    }
    return result;
  };
  
  Game_Temp.prototype.samegameIcons = function(index) {
    return this._samegameIcons ? this._samegameIcons[index] : 0
  };
  
  Game_Temp.prototype.samegameAllIconsS = function() {
    return this._samegameAllIconsS || 0;
  };
  
  Game_Temp.prototype.samegameIconsS = function(index) {
    return this._samegameIconsS ? this._samegameIconsS[index] : 0;
  };
  
  //-----------------------------------------------------------------------------
  // Game_Message
  //

  var _Game_Message_clear = Game_Message.prototype.clear;
  Game_Message.prototype.clear = function() {
    _Game_Message_clear.call(this);
    this._samegameWidth      = 0;
    this._samegameHeight     = 0;
    this._samegameCellWidth  = 0;
    this._samegameCellHeight = 0;
  };

  Game_Message.prototype.samegameWidth = function() {
    return this._samegameWidth;
  };

  Game_Message.prototype.samegameHeight = function() {
    return this._samegameHeight;
  };

  Game_Message.prototype.samegameCellWidth = function() {
    return this._samegameCellWidth;
  };

  Game_Message.prototype.samegameCellHeight = function() {
    return this._samegameCellHeight;
  };

  Game_Message.prototype.samegameIcons = function() {
    return this._samegameIcons;
  };

  Game_Message.prototype.setSamegame = function(choices, cancelType) {
    var a = choices[1].split(' ');
    this._samegameWidth      = Number(a[0]);
    this._samegameHeight     = Number(a[1]);
    this._samegameCellWidth  = Number(a[2]);
    this._samegameCellHeight = Number(a[3]);
    this._samegameIcons      = Number(a[4]);
    this._samegameTimeLimit  = choices[2] ? Number(choices[2]) * 1000 : 0;
    this._choiceCancelType = cancelType;
  };

  Game_Message.prototype.isSamegame = function() {
    return this._samegameWidth > 0;
  };

  var _Game_Message_isBusy = Game_Message.prototype.isBusy;
  Game_Message.prototype.isBusy = function() {
    return (_Game_Message_isBusy.call(this) || this.isSamegame());
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
  Game_Interpreter.prototype.setupChoices = function(params) {
    var choices = params[0].clone();
    if (choices[0] === samegameCommand) {
      var cancelType = params[1];
      var defaultType = params.length > 2 ? params[2] : 0;
      var positionType = params.length > 3 ? params[3] : 2;
      var background = params.length > 4 ? params[4] : 0;
      if (cancelType >= choices.length) {
        cancelType = -2;
      }
      $gameMessage.setSamegame(choices, cancelType);
      $gameMessage.setChoiceBackground(background);
      $gameMessage.setChoicePositionType(positionType);
      $gameMessage.setChoiceCallback(function(n) {
        this._branch[this._indent] = n;
      }.bind(this));
    } else {
      _Game_Interpreter_setupChoices.call(this, params);
    }
  };

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    if (command === 'samegameScore') {
      $gameVariables.setValue(+args[0], $gameTemp.samegameScore());
    } else if (command === 'samegameTime') {
      $gameVariables.setValue(+args[0], $gameTemp.samegameTime());
    } else if (command === 'samegameAllIcons') {
      $gameVariables.setValue(+args[0], $gameTemp.samegameAllIcons());
    } else if (command === 'samegameIcons') {
      $gameVariables.setValue(+args[1], $gameTemp.samegameIcons(+args[0]));
    } else if (command === 'samegameAllIconsS') {
      $gameVariables.setValue(+args[0], $gameTemp.samegameAllIconsS());
    } else if (command === 'samegameIconsS') {
      $gameVariables.setValue(+args[1], $gameTemp.samegameIconsS(+args[0]));
    } else {
      _Game_Interpreter_pluginCommand.call(this, command, args);
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_Samegame
  //

  function Window_Samegame() {
      this.initialize.apply(this, arguments);
  }

  Window_Samegame.prototype = Object.create(Window_Selectable.prototype);
  Window_Samegame.prototype.constructor = Window_Samegame;

  Window_Samegame.prototype.initialize = function(messageWindow) {
    this._messageWindow = messageWindow;
    Window_Selectable.prototype.initialize.call(this, 0, 0, 0, 0);
    this.openness = 0;
    this.deactivate();
  };
  
  Window_Samegame.prototype.lineHeight = function() {
    return 32;
  };

  Window_Samegame.prototype.maxCols = function() {
    return this._samegameWidth || 1;
  };

  Window_Samegame.prototype.maxItems = function() {
    return this._samegameCellNumber || 0;
  };

  Window_Samegame.prototype.spacing = function() {
    return 0;
  };

  Window_Samegame.prototype.isCursorMovable = function() {
    return Window_Selectable.prototype.isCursorMovable &&
           this._samegameState === -1;
  };

  Window_Samegame.prototype.start = function() {
    this._samegameWidth      = $gameMessage.samegameWidth();
    this._samegameHeight     = $gameMessage.samegameHeight();
    this._samegameCellWidth  = $gameMessage.samegameCellWidth();
    this._samegameCellHeight = $gameMessage.samegameCellHeight();
    this._samegameCellNumber = this._samegameWidth * this._samegameHeight;
    this._samegameIcons      = $gameMessage.samegameIcons();
    this.setupSamegame();
    this._samegameState = -1;
    this._samegameScore = 0;
    this._samegameStartTime = new Date();
    this._lastRefreshTime = this._samegameStartTime;
    this.updatePlacement();
    this.updateBackground();
    this.select(0);
    this.createContents();
    this.refresh();
    this.open();
    this.activate();
  };

  Window_Samegame.prototype.setupSamegame = function() {
    this._samegameMap = [];
    var a = [];
    for (var i = 0; i < this._samegameCellNumber; i++) {
      a[i] = i % this._samegameIcons;
    }
    for (var i = 0; i < this._samegameCellNumber; i++) {
      var index = a.splice(Math.randomInt(a.length), 1)[0];
      this._samegameMap[i] = index;
    }
    $gameTemp.setSamegameStartIcons(this._samegameMap);
  };
  
  Window_Samegame.prototype.isIndexValid = function(index) {
    return index >= 0 && index < this._samegameCellNumber;
  };
  
  Window_Samegame.prototype.updatePlacement = function() {
    var positionType = $gameMessage.choicePositionType();
    var messageY = this._messageWindow.y;
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    switch (positionType) {
    case 0:
      this.x = 0;
      break;
    case 1:
      this.x = (Graphics.boxWidth - this.width) / 2;
      break;
    case 2:
      this.x = Graphics.boxWidth - this.width;
      break;
    }
    if (messageY >= Graphics.boxHeight / 2) {
      this.y = messageY - this.height;
    } else {
      this.y = messageY + this._messageWindow.height;
    }
  };

  Window_Samegame.prototype.updateBackground = function() {
    this._background = $gameMessage.choiceBackground();
    this.setBackgroundType(this._background);
  };

  Window_Samegame.prototype.windowWidth = function() {
    var width = $gameMessage.samegameWidth() * $gameMessage.samegameCellWidth() +
                this.padding * 2;
    return Math.min(width, Graphics.boxWidth);
  };

  Window_Samegame.prototype.windowHeight = function() {
    return this.fittingHeight($gameMessage.samegameHeight()) + 72;
  };

  Window_Samegame.prototype.update = function() {
    var lastIndex = this.index();
    Window_Selectable.prototype.update.call(this);
    if (this.active) {
      if (this._samegameState === -1) {
        this.updateTime();
        this.updateScore();
      } else if (Input.isTriggered('ok') || (TouchInput.isTriggered())) {
        $gameMessage.onChoice(this._samegameState);
        this.endSamegame();
        SoundManager.playOk();
      } else if (Input.isTriggered('escape') || (TouchInput.isCancelled())) {
        $gameMessage.onChoice(this._samegameState);
        this.endSamegame();
        SoundManager.playCancel();
      }
      if (lastIndex !== this.index()) {
        this.redrawItem(lastIndex);
        this.redrawItem(this.index());
      }
    }
  };
  
  Window_Samegame.prototype.updateTime = function() {
    var currentTime = new Date();
    if (currentTime - this._lastRefreshTime > 1000) {
      this.refreshTime();
      this._lastRefreshTime = currentTime;
    }
  };
  
  Window_Samegame.prototype.updateScore = function() {
    var time = new Date();
    $gameTemp.setSamegameScore(this._samegameScore, time - this._samegameStartTime);
  };
  
  Window_Samegame.prototype.gameOver = function(state) {
    this._samegameState = state;
    this.updateScore();
    if (this._samegameState === 2) {
      AudioManager.playSe(timeupSe);
    } else {
      AudioManager.playSe(clearSe);
    }
  };
  
  Window_Samegame.prototype.endSamegame = function() {
    this._messageWindow.terminateMessage();
    this.deactivate();
    this.close();
  };
  
  Window_Samegame.prototype.isCurrentItemEnabled = function() {
    var index = this.index();
    if (this._samegameMap[index] === -1) {
      return false;
    }
    this._checkTargets = [];
    this._deleteTargets = [];
    this.sweep(this.index());
    return this._checkTargets.length > 0;
  };

  Window_Samegame.prototype.drawItem = function(index) {
    var rect = this.itemRect(index);
    var iconIndex = this._samegameMap[index];
    if (iconIndex >= 0) {
      this.drawIcon(samegameIcons[iconIndex], rect.x, rect.y);
    }
    if (index === this.index()) {
      bitmap = ImageManager.loadSystem('SamegameCursor');
      this.contents.blt(bitmap, 0, 0, 32, 32, rect.x, rect.y,
                        this._samegameCellWidth, this._samegameCellHeight);
    }
  };

  Window_Samegame.prototype.refresh = function() {
    if (this.contents) {
        this.contents.clear();
        this.drawAllItems();
        this.refreshTime();
        this.refreshScore();
    }
  };

  Window_Samegame.prototype.refreshTime = function() {
    var time = new Date();
    time -= this._samegameStartTime;
    if ($gameMessage._samegameTimeLimit) {
      time = $gameMessage._samegameTimeLimit - time;
      if (time < 0) {
        time = 0;
        this.gameOver(2);
      }
    }
    var width = this.contents.width - this.textPadding();
    var height = 36;
    var y = this.contents.height - height;
    this.contents.clearRect(0, y, width, height);
    this.drawText(Math.floor(time / 1000) + ' 秒', 0, y, width, 'right');
  };
  
  Window_Samegame.prototype.refreshScore = function() {
    var width = this.contents.width - this.textPadding();
    var height = 36;
    var y = this._samegameHeight * this._samegameCellHeight;
    this.contents.clearRect(0, y, width, height);
    this.drawText(this._samegameScore + ' 点', 0, y, width, 'right')
  };
  
  Window_Samegame.prototype.isOkEnabled = function() {
    return true;
  };

  Window_Samegame.prototype.isCancelEnabled = function() {
    return $gameMessage.choiceCancelType() !== -1;
  };

  Window_Samegame.prototype.processOk = function() {
    if (this._samegameState === -1) {
      Window_Selectable.prototype.processOk.call(this);
    }
  };

  Window_Samegame.prototype.callOkHandler = function() {
    if (this._samegameMap[this.index()] === -1) {
      SoundManager.playBuzzer();
    } else {
      this._checkTargets = [this.index()];
      this._deleteTargets = [];
      while (this._checkTargets.length > 0) {
        this.sweep(this._checkTargets.pop());
      }
      var n = this._deleteTargets.length;
      if (n >= 2) {
        this.gainScore(n);
        $gameTemp.loseSamegameIcon(this._samegameMap[this._deleteTargets[0]], n);
        this.deleteIcons();
        this.sortIcons();
        this.refresh();
      }
      if (this._samegameState === -1) {
        this.checkGameComplete();
      }
    }
    this.activate();
  };

  Window_Samegame.prototype.sweep = function(index) {
    var iconIndex = this._samegameMap[index];
    this._deleteTargets.push(index);
    this.addSweepTarget(index - this._samegameWidth, iconIndex);
    this.addSweepTarget(index + this._samegameWidth, iconIndex);
    if (index % this._samegameWidth > 0) {
      this.addSweepTarget(index - 1, iconIndex);
    }
    if (index % this._samegameWidth < this._samegameWidth - 1) {
      this.addSweepTarget(index + 1, iconIndex);
    }
  };
  
  Window_Samegame.prototype.addSweepTarget = function(index, targetIcon) {
    var iconIndex = this._samegameMap[index];
    if (iconIndex === targetIcon &&
        this._deleteTargets.indexOf(index) === -1 &&
        this._checkTargets.indexOf(index) === -1 &&
        this.isIndexValid(index)) {
      this._checkTargets.push(index);
    }
  };
  
  Window_Samegame.prototype.gainScore = function(n) {
    this._samegameScore += n * n * 100;
  };
  
  Window_Samegame.prototype.deleteIcons = function() {
    for (var i = 0; i < this._deleteTargets.length; i++) {
      this._samegameMap[this._deleteTargets[i]] = -1;
    }
  };
  
  Window_Samegame.prototype.sortIcons = function() {
    for (var x = 0; x < this._samegameWidth; x++) {
      var a = [];
      for (var y = this._samegameHeight - 1; y >= 0; y--) {
        var index = x + y * this._samegameWidth;
        if (this._samegameMap[index] >= 0) {
          a.push(this._samegameMap[index]);
          this._samegameMap[index] = -1;
        }
      }
      for (var i = 0; i < a.length; i++) {
        var y = this._samegameHeight - 1 - i;
        var index = x + y * this._samegameWidth;
        this._samegameMap[index] = a[i];
      }
    }
    for (var x = 0; x < this._samegameWidth; x++) {
      var y = this._samegameHeight - 1
      if (this._samegameMap[x + y * this._samegameWidth] === -1) {
        for (var x2 = x + 1; x2 < this._samegameWidth; x2++) {
          if (this._samegameMap[x2 + y * this._samegameWidth] >= 0) {
            for (var i = 0; i < this._samegameHeight; i++) {
              var index  = x + i * this._samegameWidth;
              var index2 = x2 + i * this._samegameWidth;
              this._samegameMap[index]  = this._samegameMap[index2];
              this._samegameMap[index2] = -1;
            }
            break;
          }
        }
      }
    }
  };
  
  Window_Samegame.prototype.checkGameComplete = function() {
    for (var x = 0; x < this._samegameWidth; x++) {
      for (var y = 0; y < this._samegameHeight; y++) {
        var index = x + y * this._samegameWidth;
        if (this._samegameMap[index] === -1) {
          continue;
        }
        this._checkTargets = [];
        this._deleteTargets = [];
        this.sweep(index);
        if (this._checkTargets.length > 0) {
          return;
        }
      }
    }
    this.gameOver(0);
  };
  
  Window_Samegame.prototype.processCancel = function() {
    if (this._samegameState === -1) {
      Window_Selectable.prototype.processCancel.call(this);
    }
  };

  Window_Samegame.prototype.callCancelHandler = function() {
    $gameMessage.onChoice($gameMessage.choiceCancelType());
    this._messageWindow.terminateMessage();
    this.close();
  };
  
  //-----------------------------------------------------------------------------
  // Window_Message
  //

  var _Window_Message_subWindows = Window_Message.prototype.subWindows;
  Window_Message.prototype.subWindows = function() {
    return _Window_Message_subWindows.call(this).concat(this._samegameWindow);
  };

  var _Window_Message_createSubWindows = Window_Message.prototype.createSubWindows;
  Window_Message.prototype.createSubWindows = function() {
    _Window_Message_createSubWindows.call(this);
    this._samegameWindow = new Window_Samegame(this);
  };

  var _Window_Message_isAnySubWindowActive = Window_Message.prototype.isAnySubWindowActive;
  Window_Message.prototype.isAnySubWindowActive = function() {
    return (_Window_Message_isAnySubWindowActive.call(this) ||
            this._samegameWindow.active);
  };

  var _Window_Message_startInput = Window_Message.prototype.startInput;
  Window_Message.prototype.startInput = function() {
    if ($gameMessage.isSamegame()) {
      this._samegameWindow.start();
      return true;
    }
    return _Window_Message_startInput.call(this);
  };

  //-----------------------------------------------------------------------------
  // Scene_Boot
  //

  var _Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function() {
    _Scene_Boot_loadSystemImages.call(this);
    ImageManager.loadSystem('SamegameCursor');
  };

})();