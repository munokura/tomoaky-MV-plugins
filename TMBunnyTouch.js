//=============================================================================
// TMPlugin - バニータッチ
// バージョン: 1.1.0
// 最終更新日: 2018/03/02
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2018 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 数字を順番にタッチしていくミニゲームを追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param characterName
 * @type file
 * @desc バニーとして使用する歩行画像のファイル名
 * 初期値: People2
 * @default People2
 * @require 1
 * @dir img/characters/
 * 
 * @param characterIndex
 * @type number
 * @desc バニーとして使用する歩行画像のインデックス
 * 初期値: 7
 * @default 7
 * 
 * @param numberColor
 * @desc バニーに描画する数字の色
 * 初期値: #000000
 * @default #000000
 * 
 * @param numberOutlineColor
 * @desc バニーに描画する数字の縁の色
 * 初期値: #ffffff
 * @default #ffffff
 * 
 * @param selectColor
 * @desc バニーに描画する数字の色 (選択中)
 * 初期値: #e02000
 * @default #e02000
 * 
 * @param selectOutlineColor
 * @desc バニーに描画する数字の縁の色 (選択中)
 * 初期値: #ffffe0
 * @default #ffffe0
 * 
 * @param helpLines
 * @number
 * @desc ヘルプテキストを表示するウィンドウの行数
 * 初期値: 2
 * @default 2
 * 
 * @param helpTexts
 * @type struct<HelpText>
 * @desc ヘルプテキストの表示内容 (バニータッチ)
 * @default {"prestart":"数字が小さい順にタッチしてね!!\\n(クリック or タップ でタッチ開始)","end":"\\C[2]タッチ完了!!\\C[0]\\n所要時間: %1秒 (ミス%2回 × %3秒)", "timeup":"\\C[2]時間切れ!!\\C[0]\\n成功タッチ: %1回 (ミス%2回 × %3秒)"}
 * 
 * @param helpCalcTexts
 * @type struct<HelpText>
 * @desc ヘルプテキストの表示内容 (バニー計算)
 * @default {"prestart":"合計がお題と同じになるようにタッチしてね!!\\n(クリック or タップ でタッチ開始)","end":"\\C[2]タッチ完了!!\\C[0]\\n所要時間: %1秒", "timeup":"\\C[2]時間切れ!!\\C[0]"}
 * 
 * @param stateText
 * @desc 連続プレイオプションが有効なときのプレイ回数の書式
 * (%1 = 現在のプレイ数 / %2 = 最大プレイ数)
 * @default %1/%2回
 * 
 * @param giveupText
 * @desc shiftキーによるギブアップで表示されるメッセージ
 * @default ギブアップしました。
 * 
 * @param penalty
 * @type number
 * @desc ミスタッチのペナルティ時間 (ミリ秒)
 * 初期値: 1000
 * @default 1000
 * 
 * @param vnResultTime
 * @type variable
 * @desc 結果（所要時間）を代入するゲーム変数
 * 初期値: 1
 * @default 1
 * 
 * @param vnResultSuccess
 * @type variable
 * @desc 結果（成功タッチ）を代入するゲーム変数
 * 初期値: 2
 * @default 2
 * 
 * @param seTouchSuccess
 * @type struct<SoundEffect>
 * @desc 成功タッチの効果音
 * @default {"name":"Item3","volume":"90","pitch":"150","pan":"0"}
 *
 * @param seTouchMiss
 * @type struct<SoundEffect>
 * @desc ミスタッチの効果音
 * @default {"name":"Buzzer2","volume":"90","pitch":"100","pan":"0"}
 *
 * @param seCalcSelectOn
 * @type struct<SoundEffect>
 * @desc 選択タッチの効果音 (バニー計算)
 * @default {"name":"Cursor2","volume":"90","pitch":"100","pan":"0"}
 *
 * @param seCalcSelectOff
 * @type struct<SoundEffect>
 * @desc 解除タッチの効果音 (バニー計算)
 * @default {"name":"Cancel1","volume":"90","pitch":"100","pan":"0"}
 *
 * @param seTouchStart
 * @type struct<SoundEffect>
 * @desc タッチ開始の効果音
 * @default {"name":"Magic3","volume":"90","pitch":"120","pan":"0"}
 *
 * @param seTouchEnd
 * @type struct<SoundEffect>
 * @desc タッチ終了の効果音
 * @default {"name":"Applause1","volume":"90","pitch":"100","pan":"0"}
 *
 * @param seTimeup
 * @type struct<SoundEffect>
 * @desc タイムアップの効果音
 * @default {"name":"Applause2","volume":"90","pitch":"80","pan":"0"}
 *
 * @help
 * TMPlugin - バニータッチ ver1.1.0
 *
 * 使い方:
 *
 *   イベントコマンド『プラグインコマンド』で startBunnyTouch を
 *   実行するとバニータッチゲームが起動します。
 * 
 *   バニータッチが終わると結果がゲーム変数に代入されます、
 *   この値で条件分岐させることで、結果に応じた処理が作れます。
 *   初期設定では1番に所要時間、2番に成功タッチ数が代入されます。
 *   時間切れの場合は所要時間に -1 が代入されます。
 * 
 *   BGMを再生する機能はありません、バニータッチ起動直前に
 *   イベントコマンドで好きなBGMを流してください。
 *
 *   このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。
 * 
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 * 
 * 
 * プラグインコマンド:
 * 
 *   startBunnyTouch 5 3 2 10 1.0
 *     バニータッチを開始します。
 *     数値は順に バニーの数、列数、行数、制限時間、拡大率 となります。
 *     上記の例は、横3マス×縦2マスの場に5人のバニーさんが配置され、
 *     制限時間は10秒という設定になっています。
 *     制限時間に 0 を設定すると、制限時間がなくなります。
 * 
 *     場が狭く、画面の余白が広くなってしまう場合は、拡大率の値を
 *     大きく設定することで、場を拡大表示することができます。
 * 
 *     また、下記のようにオプション値を付けることもできます。
 *     startBunnyTouch 5 3 2 10 1.0 rm
 *     r = 数字が連続しなくなる
 *     m = 数字が左右反転する
 *     rm なら両方のオプションが有効になります。
 * 
 *   startBunnyCalc 6 4 3 2 30 1.0
 *     バニー計算を開始します。
 *     数値は順に バニーの数、お題バニーの数、列数、行数、制限時間、
 *     拡大率 となります。
 *     上記の例では6人のバニーのうち、4人の合計がお題となり、
 *     合計がお題と同じになるようにタッチするゲームになります。
 * 
 *     他の数値はバニータッチと同様です、オプション値も利用できます。
 * 
 * 
 * プラグインパラメータ補足:
 * 
 *   helpTexts
 *     \C[n] や \} などの制御文字も利用できます、改行したい場合は
 *     \n で改行することができます。
 * 
 *   helpCalcTexts
 *     バニー計算のルールでは成功タッチ、ミス回数がカウントされません。
 */
/*~struct~SoundEffect:
 *
 * @param name
 * @type file
 * @dir audio/se/
 * @desc 効果音のファイル名
 * @default 
 * @require 1
 *
 * @param volume
 * @type number
 * @max 100
 * @desc 効果音の音量
 * 初期値: 90
 * @default 90
 *
 * @param pitch
 * @type number
 * @min 50
 * @max 150
 * @desc 効果音のピッチ
 * 初期値: 100
 * @default 100
 *
 * @param pan
 * @type number
 * @min -100
 * @max 100
 * @desc 効果音の位相
 * 初期値: 0
 * @default 0
 *
 */
/*~struct~HelpText:
 *
 * @param prestart
 * @desc バニータッチ開始前に表示するヘルプテキスト
 *
 * @param end
 * @desc バニータッチ終了時に表示するヘルプテキスト
 * (%1 = 所要時間 / %2 = ミス回数 / %3 = ペナルティ秒数)
 *
 * @param timeup
 * @desc 時間切れの際に表示するヘルプテキスト
 * (%1 = 成功タッチ / %2 = ミス回数 / %3 = ペナルティ秒数)
 *
 */

var Imported = Imported || {};
Imported.TMBunnyTouch = true;

(function() {

  var parameters = PluginManager.parameters('TMBunnyTouch');
  var characterName = parameters['characterName'] || 'People2';
  var characterIndex = +(parameters['characterIndex'] || 7);
  var numberColor = parameters['numberColor'] || '#000000';
  var numberOutlineColor = parameters['numberOutlineColor'] || '#ffffff';
  var selectColor = parameters['selectColor'] || '#e02000';
  var selectOutlineColor = parameters['selectOutlineColor'] || '#ffffe0';
  var helpLines = +(parameters['helpLines'] || 2);
  var helpTexts = JSON.parse(parameters['helpTexts'] || "{}");
  var helpCalcTexts = JSON.parse(parameters['helpCalcTexts'] || "{}");
  var stateText = parameters['stateText'] || '%1/%2回';
  var giveupText = parameters['giveupText'] || '';
  var penalty = +(parameters['penalty'] || 1000);
  var vnResultTime = +(parameters['vnResultTime'] || 1);
  var vnResultSuccess = +(parameters['vnResultSuccess'] || 2);
  var seTouchSuccess = JSON.parse(parameters['seTouchSuccess'] || "{}");
  var seTouchMiss = JSON.parse(parameters['seTouchMiss'] || "{}");
  var seCalcSelectOn = JSON.parse(parameters['seCalcSelectOn'] || "{}");
  var seCalcSelectOff = JSON.parse(parameters['seCalcSelectOff'] || "{}");
  var seTouchStart = JSON.parse(parameters['seTouchStart'] || "{}");
  var seTouchEnd = JSON.parse(parameters['seTouchEnd'] || "{}");
  var seTimeup = JSON.parse(parameters['seTimeup'] || "{}");

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'startBunnyTouch') {
      SceneManager.push(Scene_BunnyTouch);
      SceneManager.prepareNextScene.apply(SceneManager, args);
    } else if (command === 'startBunnyCalc') {
      SceneManager.push(Scene_BunnyCalc);
      SceneManager.prepareNextScene.apply(SceneManager, args);
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_Bunny
  //

  function Window_Bunny() {
    this.initialize.apply(this, arguments);
  }

  Window_Bunny.prototype = Object.create(Window_Base.prototype);
  Window_Bunny.prototype.constructor = Window_Bunny;

  Window_Bunny.prototype.initialize = function(cellWidth, cellHeight, scale) {
    var width = cellWidth * 48 * scale + this.standardPadding() * 2;
    var height = cellHeight * 48 * scale + this.standardPadding() * 2;
    var x = (Graphics.width - width) / 2;
    Window_Base.prototype.initialize.call(this, x, 0, width, height);
    this.refresh();
  };

  Window_Bunny.prototype.refresh = function() {
    this.contents.clear();
  };

  //-----------------------------------------------------------------------------
  // Window_BunnyTimer
  //

  function Window_BunnyTimer() {
    this.initialize.apply(this, arguments);
  }

  Window_BunnyTimer.prototype = Object.create(Window_Base.prototype);
  Window_BunnyTimer.prototype.constructor = Window_BunnyTimer;

  Window_BunnyTimer.prototype.initialize = function(timeLimit) {
    var width = this.windowWidth();
    var height = this.fittingHeight(1);
    var x = (Graphics.width - width) / 2;
    Window_Base.prototype.initialize.call(this, x, 0, width, height);
    this._timeLimit = timeLimit;
    this._time = 0;
    this._stop = true;
    this.refresh();
  };

  Window_BunnyTimer.prototype.windowWidth = function() {
    return 240;
  };

  Window_BunnyTimer.prototype.setTimeupHandler = function(method) {
    this._timeupHandler = method;
  };

  Window_BunnyTimer.prototype.isTimeup = function() {
    return this._timeLimit && this._time >= this._timeLimit;
  };

  Window_BunnyTimer.prototype.refresh = function() {
    this.contents.clear();
    var n = this._timeLimit ? Math.max(this._timeLimit - this._time, 0) : this._time;
    this.drawText((n / 1000).toFixed(3) + " 秒", 0, 0, this.contents.width, 'right');
  };

  Window_BunnyTimer.prototype.start = function() {
    this._stop = false;
    this._startTime = Date.now();
  };

  Window_BunnyTimer.prototype.stop = function() {
    this._stop = true;
    return this._time;
  };

  Window_BunnyTimer.prototype.applyPenalty = function() {
    this._startTime -= penalty;
  };

  Window_BunnyTimer.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (!this._stop) {
      this._time = Date.now() - this._startTime;
      if (this.isTimeup()) this._timeupHandler();
    }
    if (Graphics.frameCount % 4 === 0) {
      this.refresh();
    }
  };

  //-----------------------------------------------------------------------------
  // Window_BunnyState
  //

  function Window_BunnyState() {
    this.initialize.apply(this, arguments);
  }

  Window_BunnyState.prototype = Object.create(Window_Base.prototype);
  Window_BunnyState.prototype.constructor = Window_BunnyState;

  Window_BunnyState.prototype.initialize = function(repeatTimes) {
    var width = this.windowWidth();
    var height = this.fittingHeight(1);
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this._repeatTimes = repeatTimes;
    this._count = 1;
    this.refresh();
  };

  Window_BunnyState.prototype.windowWidth = function() {
    return 140;
  };

  Window_BunnyState.prototype.increaseCount = function() {
    this._count++;
    this.refresh();
  };

  Window_BunnyState.prototype.refresh = function() {
    this.contents.clear();
    var text = stateText.format(this._count, this._repeatTimes);
    this.drawText(text, 0, 0, this.contents.width, 'right');
  };

  //-----------------------------------------------------------------------------
  // Window_BunnyCalc
  //

  function Window_BunnyCalc() {
    this.initialize.apply(this, arguments);
  }

  Window_BunnyCalc.prototype = Object.create(Window_Base.prototype);
  Window_BunnyCalc.prototype.constructor = Window_BunnyCalc;

  Window_BunnyCalc.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.fittingHeight(1);
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
  };

  Window_BunnyCalc.prototype.windowWidth = function() {
    return 240;
  };

  Window_BunnyCalc.prototype.setNumber = function(current, target) {
    this._currentNumber = current;
    this._targetNumber = target;
    this.refresh();
  };

  Window_BunnyCalc.prototype.refresh = function() {
    this.contents.clear();
    var textWidth = this.textWidth('/');
    var w = Math.floor((this.contents.width - textWidth) / 2);
    this.drawText('/', 0, 0, this.contents.width, 'center');
    this.drawText(this._currentNumber, 0, 0, w, 'center');
    this.drawText(this._targetNumber, w + textWidth, 0, w, 'center');
  };

  //-----------------------------------------------------------------------------
  // Sprite_Bunny
  //

  function Sprite_Bunny() {
    this.initialize.apply(this, arguments);
  }

  Sprite_Bunny.prototype = Object.create(Sprite.prototype);
  Sprite_Bunny.prototype.constructor = Sprite_Bunny;

  Sprite_Bunny.prototype.initialize = function(id, scale, mirror) {
    Sprite.prototype.initialize.call(this);
    this.createBitmap();
    this.setId(id);
    this._mirror = mirror;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this._baseX = 0;
    this._baseY = 0;
    this._baseScale = scale;
    this.updateScale();
  };

  Sprite_Bunny.prototype.id = function() {
    return this._id;
  };

  Sprite_Bunny.prototype.setId = function(id) {
    this._id = id;
    this.drawBunny();
    this.drawNumber();
    this.opacity = 255;
    this._active = true;
    this._touching = false;
    this._effectType = 0;
    this._effectDuration = 0;
    this._offsetX = 0;
    this._offsetY = 0;
    this._offsetScale = 1;
  };

  Sprite_Bunny.prototype.createBitmap = function() {
    var bitmap = ImageManager.loadCharacter(characterName);
    this._isBigCharacter = ImageManager.isBigCharacter(characterName);
    var pw = bitmap.width / (this._isBigCharacter ? 3 : 12);
    var ph = bitmap.height / (this._isBigCharacter ? 4 : 8);
    this.bitmap = new Bitmap(pw, ph);
  };

  Sprite_Bunny.prototype.drawBunny = function() {
    this.bitmap.clear();
    var pw = this.bitmap.width;
    var ph = this.bitmap.height;
    var sx = (this.characterBlockX() + 1) * pw;
    var sy = (this.characterBlockY() + 0) * ph;
    var bitmap = ImageManager.loadCharacter(characterName);
    this.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);
  };

  Sprite_Bunny.prototype.characterBlockX = function() {
    return this._isBigCharacter ? 0 : characterIndex % 4 * 3;
  };

  Sprite_Bunny.prototype.characterBlockY = function() {
    return this._isBigCharacter ? 0 : Math.floor(characterIndex / 4) * 4;
  };

  Sprite_Bunny.prototype.drawNumber = function(select) {
    this.bitmap.textColor = select ? selectColor : numberColor;
    this.bitmap.outlineWidth = 8;
    this.bitmap.outlineColor = select ? selectOutlineColor : numberOutlineColor;
    this.bitmap.drawText(this._id, 0, 0, this.bitmap.width, this.bitmap.height, 'center');
  };

  Sprite_Bunny.prototype.setBasePosition = function(x, y) {
    this._baseX = x;
    this._baseY = y;
    this.updatePosition();
  };

  Sprite_Bunny.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updatePosition();
    this.updateScale();
    this.processTouch();
    this.updateEffect();
  };

  Sprite_Bunny.prototype.updatePosition = function() {
    this.x = this._baseX + this._offsetX;
    this.y = this._baseY + this._offsetY;
  };

  Sprite_Bunny.prototype.updateScale = function() {
    this.scale.y = this._baseScale * this._offsetScale;
    this.scale.x = this._mirror ? 0 - this.scale.y : this.scale.y;
  };

  Sprite_Bunny.prototype.updateEffect = function() {
    if (this._effectDuration > 0) {
      this._effectDuration--;
      if (this._effectType === 1) {
        this.opacity -= 16;
        this._offsetScale += 0.03;
      } else if (this._effectType === 2) {
        if (this._effectDuration === 0) {
          this._offsetX = 0;
        } else {
          this._offsetX = Math.sin(this._effectDuration) * 8;
        }
      } else if (this._effectType === 3) {
        if (this._effectDuration === 0) {
          this._offsetScale = 1.0;
        } else {
          this._offsetScale += 0.02;
        }
      }
    }
  };

  Sprite_Bunny.prototype.setClickHandler = function(method) {
    this._clickHandler = method;
  };

  Sprite_Bunny.prototype.callClickHandler = function() {
    if (this._clickHandler) this._clickHandler(this);
  };

  Sprite_Bunny.prototype.processSuccess = function() {
    AudioManager.playSe(seTouchSuccess);
    this._effectType = 1;
    this._effectDuration = 16;
    this._offsetScale = 0.75;
    this._active = false;
  };

  Sprite_Bunny.prototype.processMiss = function() {
    AudioManager.playSe(seTouchMiss);
    this._effectType = 2;
    this._effectDuration = 16;
  };
  
  Sprite_Bunny.prototype.processCalc = function(select) {
    AudioManager.playSe(select ? seCalcSelectOn : seCalcSelectOff);
    this.drawBunny();
    this.drawNumber(select);
    this._effectType = 3;
    this._effectDuration = 16;
    this._offsetScale = 0.68;
  };

  Sprite_Bunny.prototype.processTouch = function() {
    if (this._active) {
      if (TouchInput.isTriggered() && this.isTouched()) {
        this._touching = true;
      }
      if (this._touching) {
        if (TouchInput.isReleased() || !this.isTouched()) {
          this._touching = false;
          if (TouchInput.isReleased()) this.callClickHandler();
        }
      }
    } else {
      this._touching = false;
    }
  };

  Sprite_Bunny.prototype.isTouched = function() {
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    var w = this.width / 2 * this._baseScale;
    var h = this.height / 2 * this._baseScale;
    return x >= -w && y >= -h && x < w && y < h;
  };

  Sprite_Bunny.prototype.canvasToLocalX = function(x) {
    var node = this;
    while (node) {
      x -= node.x;
      node = node.parent;
    }
    return x;
  };

  Sprite_Bunny.prototype.canvasToLocalY = function(y) {
    var node = this;
    while (node) {
      y -= node.y;
      node = node.parent;
    }
    return y;
  };

  //-----------------------------------------------------------------------------
  // Scene_BunnyBase
  //

  function Scene_BunnyBase() {
    this.initialize.apply(this, arguments);
  }

  Scene_BunnyBase.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_BunnyBase.prototype.constructor = Scene_BunnyBase;

  Scene_BunnyBase.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
    ImageManager.reserveCharacter(characterName);
    this._sceneState = 0;
    this._waitCount = 0;
    this._missCount = 0;
    this._successCount = 0;
  };

  Scene_BunnyBase.prototype.prepare = function(num, targetNum, w, h, time, scale, options) {
    this._bunnyNum = +(num || 5);
    this._cellWidth = +(w || 3);
    this._cellHeight = +(h || 3);
    this._targetNum = +(targetNum || Math.max(Math.floor(num / 2), 1));
    this._timeLimit = +(time || 0) * 1000;
    this._scale = +(scale || 1);
    this._random = options && options.indexOf('r') >= 0;
    this._mirror = options && options.indexOf('m') >= 0;
    this._repeatTimes = this.repeatTimes(options);
  };

  Scene_BunnyBase.prototype.repeatTimes = function(options) {
    var re = /\d+/g;
    var match = re.exec(options);
    return match ? +match[0] : 1;
  };

  Scene_BunnyBase.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createWindows();
    this._helpWindow.setText(this.helpTexts().prestart.replace(/\\n/g, '\n'));
    this._helpWindow.openness = 0;
    this._helpWindow.open();
    this.setWindowPosition();
  };

  Scene_BunnyBase.prototype.createWindows = function() {
    this.createTimerWindow();
    this.createBunnyWindow();
    this.createHelpWindow(helpLines);
    if (this._repeatTimes > 1) this.createStateWindow();
  };

  Scene_BunnyBase.prototype.createTimerWindow = function() {
    this._timerWindow = new Window_BunnyTimer(this._timeLimit);
    this._timerWindow.setTimeupHandler(this.processTimeup.bind(this));
    this.addWindow(this._timerWindow);
  };

  Scene_BunnyBase.prototype.createCalcWindow = function() {
    this._calcWindow = new Window_BunnyCalc();
    this.addWindow(this._calcWindow);
  };

  Scene_BunnyBase.prototype.createBunnyWindow = function() {
    this._bunnyWindow = new Window_Bunny(this._cellWidth, this._cellHeight, this._scale);
    this.addWindow(this._bunnyWindow);
  };

  Scene_BunnyBase.prototype.createStateWindow = function() {
    this._stateWindow = new Window_BunnyState(this._repeatTimes);
    this.addWindow(this._stateWindow);
  };

  Scene_BunnyBase.prototype.setWindowPosition = function() {
    this._helpWindow.y = (Graphics.height - this._helpWindow.height) / 2;
    var wy = (Graphics.height - this._bunnyWindow.height) / 2;
    this._bunnyWindow.y = Math.max(wy, this._timerWindow.height);
    this._timerWindow.y = this._bunnyWindow.y - this._timerWindow.height;
    if (this._stateWindow) {
      this._stateWindow.x = this._timerWindow.x + this._timerWindow.width;
      this._stateWindow.y = this._timerWindow.y;
    }
  };

  Scene_BunnyBase.prototype.createBunnySprites = function() {
    var ids = this.spriteIds();
    this._bunnySprites = [];
    for (var i = 0; i < this._bunnyNum; i++) {
      var sprite = new Sprite_Bunny(ids[i], this._scale, this._mirror);
      sprite.setClickHandler(this.processTouch.bind(this));
      this._bunnySprites.unshift(sprite);
      this._bunnyWindow.addChild(sprite);
    }
    this.setSpritePosition();
  };

  Scene_BunnyBase.prototype.spriteIds = function() {
    var result = [];
    var n = 1;
    for (var i = 0; i < this._bunnyNum; i++) {
      result.unshift(n++);
      if (this._random) n += Math.randomInt(Math.randomInt(10) + 1);
    }
    return result;
  };

  Scene_BunnyBase.prototype.setSpritePosition = function() {
    var points = [];
    for (var i = 0; i < this._cellWidth * this._cellHeight; i++) {
      points.push(i);
    }
    var len = points.length;
    var w = 48 * this._scale;
    var padding = this._bunnyWindow.standardPadding();
    for (var i = 0; i < this._bunnySprites.length; i++) {
      var r = Math.randomInt(len);
      var x = (points[r] % this._cellWidth) * w + w / 2;
      var y = Math.floor(points[r] / this._cellWidth) * w + w / 2;
      this._bunnySprites[i].setBasePosition(x + padding, y + padding);
      len--;
      points[r] = points[len];
    }
  };

  Scene_BunnyBase.prototype.processTimeup = function() {
    AudioManager.playSe(seTimeup);
    this._resultTime = this._timerWindow.stop();
    $gameVariables.setValue(vnResultTime, -1);
    $gameVariables.setValue(vnResultSuccess, this._successCount);
    var text = this.helpTexts().timeup;
    var n = this._successCount;
    this._helpWindow.setText(text.replace(/\\n/g, '\n').format(n, this._missCount,
                             (penalty / 1000).toFixed(3)));
    this._helpWindow.open();
    this._sceneState = 2;
    this._waitCount = 0;
  };

  Scene_BunnyBase.prototype.processEnd = function() {
    this._repeatTimes--;
    if (this._repeatTimes === 0) {
      AudioManager.playSe(seTouchEnd);
      this._resultTime = this._timerWindow.stop();
      $gameVariables.setValue(vnResultTime, this._resultTime);
      $gameVariables.setValue(vnResultSuccess, this._successCount);
      var text = this.helpTexts().end;
      var n = (this._resultTime / 1000).toFixed(3);
      this._helpWindow.setText(text.replace(/\\n/g, '\n').format(n, this._missCount,
                               (penalty / 1000).toFixed(3)));
      this._helpWindow.open();
      this._sceneState = 2;
      this._waitCount = 0;
    } else {
      this.restartTouch();
    }
  };

  Scene_BunnyBase.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    if (this._sceneState === 0) {
      this.updatePrestart();
    } else if (this._sceneState === 1) {
      if (Input.isTriggered('shift')) {
        this._timerWindow.stop();
        $gameVariables.setValue(vnResultTime, -1);
        $gameVariables.setValue(vnResultSuccess, 0);
        this._helpWindow.setText(giveupText.replace(/\\n/g, '\n'));
        this._helpWindow.open();
        this._sceneState = 2;
        this._waitCount = 0;
      }
    } else {
      this.updateEnding();
    }
  };

  Scene_BunnyBase.prototype.updatePrestart = function() {
    if (Input.isTriggered('ok') || TouchInput.isTriggered()) this.startTouch();
  }

  Scene_BunnyBase.prototype.startTouch = function() {
    AudioManager.playSe(seTouchStart);
    this._helpWindow.close();
    this.createBunnySprites();
    this._timerWindow.start();
    this._sceneState = 1;
    this.reset();
  };

  Scene_BunnyBase.prototype.restartTouch = function() {
    AudioManager.playSe(seTouchStart);
    var ids = this.spriteIds().reverse();
    this._bunnySprites.forEach(function(sprite, i) {
      sprite.setId(ids[i]);
    });
    this.setSpritePosition();
    this.reset();
    if (this._stateWindow) this._stateWindow.increaseCount();
  };

  Scene_BunnyBase.prototype.updateEnding = function() {
    this._waitCount++;
    if (this._waitCount >= 60) {
      if (Input.isTriggered('ok') || TouchInput.isTriggered()) this.popScene();
    }
  }
  
  //-----------------------------------------------------------------------------
  // Scene_BunnyTouch
  //

  function Scene_BunnyTouch() {
    this.initialize.apply(this, arguments);
  }

  Scene_BunnyTouch.prototype = Object.create(Scene_BunnyBase.prototype);
  Scene_BunnyTouch.prototype.constructor = Scene_BunnyTouch;

  Scene_BunnyTouch.prototype.prepare = function(num, w, h, time, scale, options) {
    Scene_BunnyBase.prototype.prepare.call(this, num, null, w, h, time, scale, options);
  };

  Scene_BunnyTouch.prototype.helpTexts = function() {
    return helpTexts;
  };

  Scene_BunnyTouch.prototype.processTouch = function(sprite) {
    if (this._sceneState !== 1) return;
    if (sprite === this._bunnySprites[this._targetIndex]) {
      sprite.processSuccess();
      this._successCount++;
      this.setNextTarget();
    } else {
      sprite.processMiss();
      this._missCount++;
      this._timerWindow.applyPenalty();
    }
  };

  Scene_BunnyTouch.prototype.setNextTarget = function() {
    this._targetIndex++;
    if (!this._bunnySprites[this._targetIndex]) this.processEnd();
  };

  Scene_BunnyTouch.prototype.reset = function() {
    this._targetIndex = 0;
  };

  //-----------------------------------------------------------------------------
  // Scene_BunnyCalc
  //

  function Scene_BunnyCalc() {
    this.initialize.apply(this, arguments);
  }

  Scene_BunnyCalc.prototype = Object.create(Scene_BunnyBase.prototype);
  Scene_BunnyCalc.prototype.constructor = Scene_BunnyCalc;

  Scene_BunnyCalc.prototype.prepare = function(num, targetNum, w, h, time, scale, options) {
    Scene_BunnyBase.prototype.prepare.call(this, num, targetNum, w, h, time, scale, options);
  };

  Scene_BunnyCalc.prototype.helpTexts = function() {
    return helpCalcTexts;
  };

  Scene_BunnyCalc.prototype.createWindows = function() {
    this.createCalcWindow();
    Scene_BunnyBase.prototype.createWindows.call(this);
  };

  Scene_BunnyCalc.prototype.setWindowPosition = function() {
    Scene_BunnyBase.prototype.setWindowPosition.call(this);
    this._timerWindow.x = Math.floor(Graphics.width / 2);
    this._calcWindow.x = this._timerWindow.x - this._calcWindow.width;
    this._calcWindow.y = this._timerWindow.y;
    if (this._stateWindow) this._stateWindow.x = this._timerWindow.x + this._timerWindow.width;
  };

  Scene_BunnyCalc.prototype.processTouch = function(sprite) {
    if (this._sceneState !== 1) return;
    var id = sprite.id();
    var index = this._selectSpriteIds.indexOf(id);
    if (index >= 0) {
      sprite.processCalc(false);
      this._selectSpriteIds.splice(index, 1);
    } else {
      sprite.processCalc(true);
      this._selectSpriteIds.push(id);
    }
    var currentNumber = this.currentNumber();
    this._calcWindow.setNumber(currentNumber, this._totalNumber);
    if (currentNumber === this._totalNumber) {
      this.processEnd();
    }
  };

  Scene_BunnyCalc.prototype.currentNumber = function() {
    return this._selectSpriteIds.reduce(function(r, id) {
      return r + id;
    }, 0);
  };

  Scene_BunnyCalc.prototype.reset = function() {
    this._selectSpriteIds = [];
    this.setTarget();
    this._calcWindow.setNumber(0, this._totalNumber);
  };

  Scene_BunnyCalc.prototype.setTarget = function() {
    var ids = [];
    for (var i = 0; i < this._bunnySprites.length; i++) {
      ids.push(this._bunnySprites[i].id());
    }
    var len = ids.length;
    this._totalNumber = 0;
    for (var i = 0; i < this._targetNum; i++) {
      var r = Math.randomInt(len);
      this._totalNumber += ids[r];
      len--;
      ids[r] = ids[len];
    }
  };

})();