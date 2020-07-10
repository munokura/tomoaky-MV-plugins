//=============================================================================
// TMVplugin - タイピング
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.1
// 最終更新日: 2016/03/16
//=============================================================================

/*:
 * @plugindesc ミニタイピングゲームが遊べるコマンドを追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param typingCommand
 * @desc 選択肢の表示コマンドで使用するタイピング起動文字列。
 * 初期値: [タイピング]
 * @default [タイピング]
 *
 * @param typingColor
 * @desc 入力済みの文字に使用する文字色番号。
 * 初期値: 2 (文章の表示コマンドで使用する文字色番号と同じ)
 * @default 2
 *
 * @param typingSe
 * @desc タイプ時に鳴らす効果音のファイル名（拡張子は付けない）
 * 初期値: Switch1
 * @default Switch1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param typingSeVolume
 * @desc タイプ時に鳴らす効果音の音量
 * 初期値: 90
 * @default 90
 *
 * @param typingSePitch
 * @desc タイプ時に鳴らす効果音のピッチ
 * 初期値: 130
 * @default 130
 *
 * @param typingSePan
 * @desc タイプ時に鳴らす効果音の位相
 * 初期値: 0
 * @default 0
 *
 * @help
 * 使い方:
 *   イベントコマンド『選択肢の表示』の選択肢１番に [タイピング] と
 *   入力することでタイピングゲームが起動します。（括弧は半角です）
 *   選択肢２番に問題文、選択肢３番に問題文を全角カタカナにしたものを
 *   忘れずに入力してください。
 *
 *   全角カタカナ以外に使える文字はこちら
 *   ０ １ ２ ３ ４ ５ ６ ７ ８ ９ ！ ？ 、 。 ー
 *   ただし、！と？のタイプにはShiftキーの入力も必要になります。
 *
 *   問題文をすべてタイプし終えると選択肢１番の処理が実行されます。
 *   Esc, Insert, Num0 キーなどでキャンセルした場合は、通常の選択肢と
 *   同様にキャンセル時の処理が実行されます。
 *
 *   選択肢４番に半角数字で制限時間を設定することができます。
 *   入力した秒数が経過するとタイピングゲームが強制終了し、
 *   選択肢４番の処理が実行されます。
 *
 * ローマ字入力の設定:
 *   このプラグインを導入すると、メインメニューのオプションに
 *   ローマ字入力関連の設定項目が追加されます。
 *   入力方法が複数ある文字をどの方法で出題するか設定することができます。
 *
 *   『ン』は NN と N,NN が選べますが、後者は次の文字が子音の場合にのみ
 *   N が適用されます。
 *
 * プラグインコマンド:
 *   typingTime 1     # 直前のタイピングゲームの所要時間を変数１番に代入
 *   typingMiss 2     # 直前のタイピングゲームのミス回数を変数２番に代入
 *
 *   typingTime コマンドで得られる値の単位はミリ秒になっていますので、
 *   秒に変換したい場合はイベントコマンド『変数の操作』を使い、この値を
 *   1000 で割ってください。
 *
 *   typingTime (typingMiss) で得られる結果は直前に実行された
 *   タイピングゲームのものになります。
 *   また、タイピングゲームとプラグインコマンド実行までの間に
 *   セーブ＆ロードをはさむと結果が取得できなくなります。
 * 
 * 注意事項:
 *   キーボードが必要なため、PC環境でしか動作しません。
 *   動作環境を自動的にチェックする機能は付いていませんので、
 *   たとえばタップ操作しかできない端末でキャンセル禁止設定の
 *   タイピングゲームを起動した場合、進行不能になってしまいます。
 */

var Imported = Imported || {};
Imported.TMTyping = true;

(function() {

  var parameters = PluginManager.parameters('TMTyping');
  var typingCommand = parameters['typingCommand'];
  var typingColor = parameters['typingColor'];
  var typingSe = {
    name:   parameters['typingSe'],
    volume: +parameters['typingSeVolume'],
    pitch:  +parameters['typingSePitch'],
    pan:    +parameters['typingSePan']
  };
  
  //-----------------------------------------------------------------------------
  // Input
  //
  
  Input.keyMapperRoma = {
    16: 'shift',    // shift
    27: 'escape',   // escape
    45: 'escape',   // insert
    48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7',
    56: '8', 57: '9',
    65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E', 70: 'F', 71: 'G', 72: 'H',
    73: 'I', 74: 'J', 75: 'K', 76: 'L', 77: 'M', 78: 'N', 79: 'O', 80: 'P',
    81: 'Q', 82: 'R', 83: 'S', 84: 'T', 85: 'U', 86: 'V', 87: 'W', 88: 'X',
    89: 'Y', 90: 'Z',
    96: 'escape',   // numpad 0
    188: ',',       // 、
    189: '-',       // 伸ばす
    190: '.',       // 。
    191: '/'        // /
  };

  //-----------------------------------------------------------------------------
  // TextManager
  //
  
  Object.defineProperties(TextManager, {
    '０': {value: '0'},  '１': {value: '1'},  '２': {value: '2'},  '３': {value: '3'},  '４': {value: '4'},
    '５': {value: '5'},  '６': {value: '6'},  '７': {value: '7'},  '８': {value: '8'},  '９': {value: '9'},
    'ア': {value: 'A'},  'イ': {value: 'I'},  'ウ': {value: 'U'},  'エ': {value: 'E'},  'オ': {value: 'O'},
    'カ': {value: 'KA'}, 'キ': {value: 'KI'}, 'ク': {value: 'KU'}, 'ケ': {value: 'KE'}, 'コ': {value: 'KO'},
    'サ': {value: 'SA'}, 'ス': {value: 'SU'}, 'セ': {value: 'SE'}, 'ソ': {value: 'SO'},
    'タ': {value: 'TA'}, 'テ': {value: 'TE'}, 'ト': {value: 'TO'},
    'ナ': {value: 'NA'}, 'ニ': {value: 'NI'}, 'ヌ': {value: 'NU'}, 'ネ': {value: 'NE'}, 'ノ': {value: 'NO'},
    'ハ': {value: 'HA'}, 'ヒ': {value: 'HI'}, 'ヘ': {value: 'HE'}, 'ホ': {value: 'HO'},
    'マ': {value: 'MA'}, 'ミ': {value: 'MI'}, 'ム': {value: 'MU'}, 'メ': {value: 'ME'}, 'モ': {value: 'MO'},
    'ヤ': {value: 'YA'}, 'ユ': {value: 'YU'}, 'イェ': {value: 'YE'}, 'ヨ': {value: 'YO'},
    'ラ': {value: 'RA'}, 'リ': {value: 'RI'}, 'ル': {value: 'RU'}, 'レ': {value: 'RE'}, 'ロ': {value: 'RO'},
    'ワ': {value: 'WA'}, 'ウィ': {value: 'WI'}, 'ウェ': {value: 'WE'}, 'ウォ': {value: 'WHO'}, 'ヲ': {value: 'WO'},
    'ヴァ': {value: 'VA'}, 'ヴィ': {value: 'VI'}, 'ヴ': {value: 'VU'}, 'ヴェ': {value: 'VE'}, 'ヴォ': {value: 'VO'},
    'ァ': {value: 'LA'}, 'ィ': {value: 'LI'}, 'ゥ': {value: 'LU'}, 'ェ': {value: 'LE'}, 'ォ': {value: 'LO'},
    'ガ': {value: 'GA'}, 'ギ': {value: 'GI'}, 'グ': {value: 'GU'}, 'ゲ': {value: 'GE'}, 'ゴ': {value: 'GO'},
    'ザ': {value: 'ZA'}, 'ズ': {value: 'ZU'}, 'ゼ': {value: 'ZE'}, 'ゾ': {value: 'ZO'},
    'ダ': {value: 'DA'}, 'ヂ': {value: 'DI'}, 'ヅ': {value: 'DU'}, 'デ': {value: 'DE'}, 'ド': {value: 'DO'},
    'バ': {value: 'BA'}, 'ビ': {value: 'BI'}, 'ブ': {value: 'BU'}, 'ベ': {value: 'BE'}, 'ボ': {value: 'BO'},
    'パ': {value: 'PA'}, 'ピ': {value: 'PI'}, 'プ': {value: 'PU'}, 'ペ': {value: 'PE'}, 'ポ': {value: 'PO'},
    'ッ': {value: 'LTU'}, 'ャ': {value: 'LYA'}, 'ュ': {value: 'LYU'}, 'ョ': {value: 'LYO'},
    'キャ': {value: 'KYA'}, 'キュ': {value: 'KYU'}, 'キョ': {value: 'KYO'},
    'ギャ': {value: 'GYA'}, 'ギュ': {value: 'GYU'}, 'ギョ': {value: 'GYO'},
    'ティ': {value: 'THI'}, 'トゥ': {value: 'TWU'},
    'ディ': {value: 'DHI'}, 'ドゥ': {value: 'DWU'},
    'ニャ': {value: 'NYA'}, 'ニュ': {value: 'NYU'}, 'ニョ': {value: 'NYO'},
    'ヒャ': {value: 'HYA'}, 'ヒュ': {value: 'HYU'}, 'ヒョ': {value: 'HYO'},
    'ビャ': {value: 'BYA'}, 'ビュ': {value: 'BYU'}, 'ビョ': {value: 'BYO'},
    'ピャ': {value: 'PYA'}, 'ピュ': {value: 'PYU'}, 'ピョ': {value: 'PYO'},
    'ファ': {value: 'FA'},  'フィ': {value: 'FI'},  'フェ': {value: 'FE'}, 'フォ': {value: 'FO'},
    'ミャ': {value: 'MYA'}, 'ミュ': {value: 'MYU'}, 'ミョ': {value: 'MYO'},
    'リャ': {value: 'RYA'}, 'リュ': {value: 'RYU'}, 'リョ': {value: 'RYO'},
    'シ': {get: function() { return ['SI', 'SHI', 'CI'][ConfigManager['typingSI']]; }},
    'チ': {get: function() { return ['TI', 'CHI'][ConfigManager['typingTI']]; }},
    'ツ': {get: function() { return ['TU', 'TSU'][ConfigManager['typingTU']]; }},
    'フ': {get: function() { return ['HU', 'FU'][ConfigManager['typingHU']]; }},
    'ン': {get: function() { return ['NN', 'N,NN'][ConfigManager['typingNN']]; }},
    'ジ': {get: function() { return ['JI', 'ZI'][ConfigManager['typingJI']]; }},
    'シャ': {get: function() { return ['SHA', 'SYA'][ConfigManager['typingSHA']]; }},
    'シュ': {get: function() { return ['SHU', 'SYU'][ConfigManager['typingSHA']]; }},
    'シェ': {get: function() { return ['SHE', 'SYE'][ConfigManager['typingSHA']]; }},
    'ショ': {get: function() { return ['SHO', 'SYO'][ConfigManager['typingSHA']]; }},
    'チャ': {get: function() { return ['CHA', 'CYA', 'TYA'][ConfigManager['typingCHA']]; }},
    'チュ': {get: function() { return ['CHU', 'CYU', 'TYU'][ConfigManager['typingCHA']]; }},
    'チェ': {get: function() { return ['CHE', 'CYE', 'TYE'][ConfigManager['typingCHA']]; }},
    'チョ': {get: function() { return ['CHO', 'CYO', 'TYO'][ConfigManager['typingCHA']]; }},
    'ジャ': {get: function() { return ['JA', 'JYA', 'ZYA'][ConfigManager['typingJA']]; }},
    'ジュ': {get: function() { return ['JU', 'JYU', 'ZYU'][ConfigManager['typingJA']]; }},
    'ジェ': {get: function() { return ['JE', 'JYE', 'ZYE'][ConfigManager['typingJA']]; }},
    'ジョ': {get: function() { return ['JO', 'JYO', 'ZYO'][ConfigManager['typingJA']]; }},
    '、': {value: ','}, 'ー': {value: '-'}, '。': {value: '.'}, '？': {value: '?'}, '！': {value: '!'}
  });
  
  //-----------------------------------------------------------------------------
  // ConfigManager
  //
  
  ConfigManager.typingSI = 0;
  ConfigManager.typingTI = 0;
  ConfigManager.typingTU = 0;
  ConfigManager.typingHU = 0;
  ConfigManager.typingNN = 0;
  ConfigManager.typingJI = 0;
  ConfigManager.typingSHA = 0;
  ConfigManager.typingJA = 0;
  ConfigManager.typingCHA = 0;
  
  var _ConfigManager_makeData = ConfigManager.makeData;
  ConfigManager.makeData = function() {
    var config = _ConfigManager_makeData.call(this);
    config.typingSI = this.typingSI;
    config.typingTI = this.typingTI;
    config.typingTU = this.typingTU;
    config.typingHU = this.typingHU;
    config.typingNN = this.typingNN;
    config.typingJI = this.typingJI;
    config.typingSHA = this.typingSHA;
    config.typingJA = this.typingJA;
    config.typingCHA = this.typingCHA;
    return config;
  };

  var _ConfigManager_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function(config) {
    _ConfigManager_applyData.call(this, config);
    this.typingSI = this.readTyping(config, 'typingSI');
    this.typingTI = this.readTyping(config, 'typingTI');
    this.typingTU = this.readTyping(config, 'typingTU');
    this.typingHU = this.readTyping(config, 'typingHU');
    this.typingNN = this.readTyping(config, 'typingNN');
    this.typingJI = this.readTyping(config, 'typingJI');
    this.typingSHA = this.readTyping(config, 'typingSHA');
    this.typingJA = this.readTyping(config, 'typingJA');
    this.typingCHA = this.readTyping(config, 'typingCHA');
  };

  ConfigManager.readTyping = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
      if (name === 'typingSI' || name === 'typingCHA' || name === 'typingJA') {
        return Number(value).clamp(0, 2);
      }
      return Number(value).clamp(0, 1);
    } else {
      return 0;
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Temp
  //

  var _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.call(this);
    this._typingTime = 0;
    this._typingMiss = 0;
  };

  Game_Temp.prototype.setTypingScore = function(time, miss) {
    this._typingTime = time;
    this._typingMiss = miss;
  };
  
  Game_Temp.prototype.typingTime = function() {
    return this._typingTime;
  };
  
  Game_Temp.prototype.typingMiss = function() {
    return this._typingMiss;
  };
  
  //-----------------------------------------------------------------------------
  // Game_Message
  //

  var _Game_Message_clear = Game_Message.prototype.clear;
  Game_Message.prototype.clear = function() {
    _Game_Message_clear.call(this);
    this._typingText = '';
    this._typingTextRoma = '';
    this._typingTimeLimit = 0;
  };

  Game_Message.prototype.typingText = function() {
    return this._typingText;
  };

  Game_Message.prototype.typingTextRoma = function() {
    return this._typingTextRoma;
  };

  Game_Message.prototype.setTyping = function(choices, cancelType) {
    this._typingText       = choices[1];
    this._typingTextRoma   = this.kanaToRoma(choices[2]);
    this._typingTimeLimit  = choices[3] ? +choices[3] * 1000 : 0;
    this._choiceCancelType = cancelType;
  };

  Game_Message.prototype.kanaToRoma = function(text) {
    var result = '';
    var twice = false;
    for (var i = 0, len = text.length; i < len; i++) {
      var s = text.charAt(i);
      var s2 = text.charAt(i + 1);
      if (s2 && TextManager[s + s2]) {
        s += s2;
        i++;
      }
      if (s === 'ッ' && i < len - 1) {
        twice = true;
      } else {
        if (twice) {
          result += TextManager[s].charAt(0);
          twice = false;
        }
        if (s === 'ン') {
          if (ConfigManager['typingNN'] === 1 && s2 && (s2 !== 'ア' && s2 !== 'イ' &&
              s2 !== 'ウ' && s2 !== 'エ' && s2 !== 'オ' && s2 !== 'ナ' && s2 !== 'ニ' &&
              s2 !== 'ヌ' && s2 !== 'ネ' && s2 !== 'ノ')) {
            result += 'N';
          } else {
            result += 'NN';
          }
        } else {
          result += TextManager[s];
        }
      }
    }
    return result;
  };
  
  Game_Message.prototype.hasTypingText = function() {
    return this._typingText.length > 0;
  };

  var _Game_Message_isBusy = Game_Message.prototype.isBusy;
  Game_Message.prototype.isBusy = function() {
    return (_Game_Message_isBusy.call(this) || this.hasTypingText());
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
  Game_Interpreter.prototype.setupChoices = function(params) {
    var choices = params[0].clone();
    if (choices[0] === typingCommand) {
      var cancelType = params[1];
      var defaultType = params.length > 2 ? params[2] : 0;
      var positionType = params.length > 3 ? params[3] : 2;
      var background = params.length > 4 ? params[4] : 0;
      if (cancelType >= choices.length) {
        cancelType = -2;
      }
      $gameMessage.setTyping(choices, cancelType);
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
    if (command === 'typingTime') {
      $gameVariables.setValue(+args[0], $gameTemp.typingTime());
    } else if (command === 'typingMiss') {
      $gameVariables.setValue(+args[0], $gameTemp.typingMiss());
    } else {
      _Game_Interpreter_pluginCommand.call(this, command, args);
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_Options
  //

  var _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
  Window_Options.prototype.makeCommandList = function() {
    _Window_Options_makeCommandList.call(this);
    this.addTypingOptions();
  };

  Window_Options.prototype.addTypingOptions = function() {
    this.addCommand('ローマ字入力[シ]', 'typingSI');
    this.addCommand('ローマ字入力[チ]', 'typingTI');
    this.addCommand('ローマ字入力[ツ]', 'typingTU');
    this.addCommand('ローマ字入力[フ]', 'typingHU');
    this.addCommand('ローマ字入力[ン]', 'typingNN');
    this.addCommand('ローマ字入力[ジ]', 'typingJI');
    this.addCommand('ローマ字入力[シャ]', 'typingSHA');
    this.addCommand('ローマ字入力[ジャ]', 'typingJA');
    this.addCommand('ローマ字入力[チャ]', 'typingCHA');
  };

  var _Window_Options_statusText = Window_Options.prototype.statusText;
  Window_Options.prototype.statusText = function(index) {
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isTypingSymbol(symbol)) {
      var re = /\[(.+)\]/;
      var match = re.exec(this.commandName(index));
      return TextManager[match[1]];
    } else {
      return _Window_Options_statusText.call(this, index);
    }
  };

  Window_Options.prototype.isTypingSymbol = function(symbol) {
    return symbol.contains('typing');
  };

  var _Window_Options_processOk = Window_Options.prototype.processOk;
  Window_Options.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isTypingSymbol(symbol)) {
      value++;
      if (value > this.typingMaxValue(symbol)) {
        value = 0;
      }
      this.changeValue(symbol, value);
    } else {
      _Window_Options_processOk.call(this)
    }
  };
  
  Window_Options.prototype.typingMaxValue = function(symbol) {
    return (symbol === 'typingSI' || symbol === 'typingCHA' ||
            symbol === 'typingJA') ? 2 : 1;
  };

  var _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
  Window_Options.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isTypingSymbol(symbol)) {
      value++;
      value = value.clamp(0, this.typingMaxValue(symbol));
      this.changeValue(symbol, value);
    } else {
      _Window_Options_cursorRight.call(this, wrap);
    }
  };

  var _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
  Window_Options.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isTypingSymbol(symbol)) {
      value--;
      value = value.clamp(0, this.typingMaxValue(symbol));
      this.changeValue(symbol, value);
    } else {
      _Window_Options_cursorLeft.call(this, wrap);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_Typing
  //

  function Window_Typing() {
    this.initialize.apply(this, arguments);
  }

  Window_Typing.prototype = Object.create(Window_Base.prototype);
  Window_Typing.prototype.constructor = Window_Typing;

  Window_Typing.prototype.initialize = function(messageWindow) {
    this._messageWindow = messageWindow;
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
    this.openness = 0;
    this.deactivate();
};

  Window_Typing.prototype.start = function() {
    this._typingText = $gameMessage.typingText();
    this._typingTextRoma = $gameMessage.typingTextRoma();
    this._textWidthRoma = this.textWidthEx(this._typingTextRoma);
    this._typingIndex = 0;
    this._typingTimeOver = false;
    this._typingStartTime = new Date();
    this._lastRefreshTime = this._typingStartTime;
    this._typingMissCount = 0;
    this.updatePlacement();
    this.updateBackground();
    this.refresh();
    this.open();
    this.activate();
    this._lastKeyMapper = JSON.stringify(Input.keyMapper);
    Input.keyMapper = Input.keyMapperRoma;
    Input.clear();
  };

  Window_Typing.prototype.updatePlacement = function() {
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

  Window_Typing.prototype.updateBackground = function() {
    this._background = $gameMessage.choiceBackground();
    this.setBackgroundType(this._background);
  };

  Window_Typing.prototype.windowWidth = function() {
    var width = this.maxTypingWidth() + this.padding * 2 +
                this.textPadding() * 2;
    return Math.min(width, Graphics.boxWidth);
  };

  Window_Typing.prototype.windowHeight = function() {
    return this.fittingHeight(3);
  };

  Window_Typing.prototype.maxTypingWidth = function() {
    var maxWidth = 200;
    var width = this.textWidth($gameMessage.typingText());
    if (maxWidth < width) {
      maxWidth = width;
    }
    return Math.max(maxWidth, this._textWidthRoma);
  };

  Window_Typing.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
  };

  Window_Typing.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this.active) {
      this.updateTime();
      if (this._typingTimeOver) {
        $gameMessage.onChoice(3);
        this.endTyping();
      } else if (Input.isTriggered('escape')) {
        if ($gameMessage.choiceCancelType() !== -1) {
          $gameMessage.onChoice($gameMessage.choiceCancelType());
          this.endTyping();
          SoundManager.playCancel();
        } else {
          SoundManager.playBuzzer();
        }
      } else {
        var s = this._typingTextRoma.charAt(this._typingIndex);
        var needShift = false;
        if (s === '!') {
          s = '1';
          needShift = true;
        }
        if (s === '?') {
          s = '/';
          needShift = true;
        }
        if (Input.isTriggered(s) && (needShift === Input.isPressed('shift'))) {
          this._typingIndex++;
          this.refreshRoma();
          if (this._typingIndex === this._typingTextRoma.length) {
            $gameMessage.onChoice(0);
            this.endTyping();
          }
          AudioManager.playSe(typingSe);    // タイプ音を鳴らす
        } else if (Input._latestButton && Input._latestButton !== 'shift' &&
                   Input._pressedTime === 0) {
          this._typingMissCount++;
          SoundManager.playBuzzer();
        }
      }
    }
  };

  Window_Typing.prototype.updateTime = function() {
    var currentTime = new Date();
    if (currentTime - this._lastRefreshTime > 1000) {
      this.refreshTime();
      this._lastRefreshTime = currentTime;
    }
  };
  
  Window_Typing.prototype.endTyping = function() {
    var time = new Date();
    $gameTemp.setTypingScore(time - this._typingStartTime, this._typingMissCount);
    this._messageWindow.terminateMessage();
    this.deactivate();
    this.close();
    Input.keyMapper = JSON.parse(this._lastKeyMapper);
    Input.clear();
  };
  
  Window_Typing.prototype.refresh = function() {
    this.createContents();
    this.refreshRoma();
    this.refreshTime();
    var width = this.contents.width;
    this.drawText(this._typingText, 0, this.lineHeight() * 1, width, 'center');
  };

  Window_Typing.prototype.refreshRoma = function() {
    var width = this.contents.width;
    var height = this.lineHeight();
    var text = this._typingTextRoma;
    text = '\\C[' + typingColor + ']' + text.slice(0, this._typingIndex) +
           '\\C[0]' + text.slice(this._typingIndex, text.length);
    this.contents.clearRect(0, 0, width, height);
    this.drawTextEx(text, (width - this._textWidthRoma) / 2, 0)
  };
  
  Window_Typing.prototype.refreshTime = function() {
    var time = new Date();
    time -= this._typingStartTime;
    if ($gameMessage._typingTimeLimit) {
      time = $gameMessage._typingTimeLimit - time;
      if (time < 0) {
        time = 0;
        this._typingTimeOver = true;
      }
    }
    var width = this.contents.width - this.textPadding();
    var height = this.lineHeight();
    this.contents.clearRect(0, this.lineHeight() * 2, width, height);
    this.drawText(Math.floor(time / 1000) + ' 秒', 0, this.lineHeight() * 2,
                  width, 'right');
  };
  
  //-----------------------------------------------------------------------------
  // Window_Message
  //

  var _Window_Message_subWindows = Window_Message.prototype.subWindows;
  Window_Message.prototype.subWindows = function() {
    return _Window_Message_subWindows.call(this).concat(this._typingWindow);
  };

  var _Window_Message_createSubWindows = Window_Message.prototype.createSubWindows;
  Window_Message.prototype.createSubWindows = function() {
    _Window_Message_createSubWindows.call(this);
    this._typingWindow = new Window_Typing(this);
  };

  var _Window_Message_isAnySubWindowActive = Window_Message.prototype.isAnySubWindowActive;
  Window_Message.prototype.isAnySubWindowActive = function() {
    return (_Window_Message_isAnySubWindowActive.call(this) ||
            this._typingWindow.active);
  };

  var _Window_Message_startInput = Window_Message.prototype.startInput;
  Window_Message.prototype.startInput = function() {
    if ($gameMessage.hasTypingText()) {
      this._typingWindow.start();
      return true;
    }
    return _Window_Message_startInput.call(this);
  };

})();
