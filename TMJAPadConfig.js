//=============================================================================
// TMVplugin - パッドコンフィグ（ジャンプアクション拡張）
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 0.1b
// 最終更新日: 2015/11/16
//=============================================================================

/*:
 * @plugindesc オプションシーンにパッドのボタン配置変更機能を追加します。
 * (必ず TMJumpAction より下に導入してください)
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param optionWindowWidth
 * @desc オプションウィンドウの幅
 * 初期値: 500
 * @default 500
 *
 * @param optionWindowStatusWidth
 * @desc オプションウィンドウの設定値の幅
 * 初期値: 220
 * @default 220
 *
 * @param padButton1
 * @desc ボタン１の初期設定
 * 初期値: ok
 * @default ok
 *
 * @param padButton2
 * @desc ボタン２の初期設定
 * 初期値: cancel
 * @default cancel
 *
 * @param padButton3
 * @desc ボタン３の初期設定
 * 初期値: dash
 * @default dash
 *
 * @param padButton4
 * @desc ボタン４の初期設定
 * 初期値: jump
 * @default jump
 *
 * @param padButton5
 * @desc ボタン５の初期設定
 * 初期値: pageup
 * @default pageup
 *
 * @param padButton6
 * @desc ボタン６の初期設定
 * 初期値: pagedown
 * @default pagedown
 *
 * @param padButton7
 * @desc ボタン７の初期設定
 * 初期値: menu
 * @default menu
 *
 * @param padButton8
 * @desc ボタン８の初期設定
 * 初期値: attack
 * @default attack
 *
 * @param padButton9
 * @desc ボタン９の初期設定
 * 初期値: ok
 * @default ok
 *
 * @param padButton10
 * @desc ボタン１０の初期設定
 * 初期値: ok
 * @default ok
 *
 * @param padButton11
 * @desc ボタン１１の初期設定
 * 初期値: ok
 * @default ok
 *
 * @param padButton12
 * @desc ボタン１２の初期設定
 * 初期値: ok
 * @default ok
 *
 * @help このプラグインの動作には TMVplugin - ジャンプアクション Ver0.2b 以上
 * が必要です。必ずこちらのプラグインを下に導入してください。
 *
 */
var Imported = Imported || {};
Imported.TMJAPadConfig = true;

(function() {

  var parameters = PluginManager.parameters('TMJAPadConfig');
  var optionWindowWidth = Number(parameters['optionWindowWidth']);
  var optionWindowStatusWidth = Number(parameters['optionWindowStatusWidth']);
  var defaultPadButtons = {};
  defaultPadButtons['padButton1'] = parameters['padButton1'];
  defaultPadButtons['padButton2'] = parameters['padButton2'];
  defaultPadButtons['padButton3'] = parameters['padButton3'];
  defaultPadButtons['padButton4'] = parameters['padButton4'];
  defaultPadButtons['padButton5'] = parameters['padButton5'];
  defaultPadButtons['padButton6'] = parameters['padButton6'];
  defaultPadButtons['padButton7'] = parameters['padButton7'];
  defaultPadButtons['padButton8'] = parameters['padButton8'];
  defaultPadButtons['padButton9'] = parameters['padButton9'];
  defaultPadButtons['padButton10'] = parameters['padButton10'];
  defaultPadButtons['padButton11'] = parameters['padButton11'];
  defaultPadButtons['padButton12'] = parameters['padButton12'];

  //-----------------------------------------------------------------------------
  // ConfigManager
  //

  Object.defineProperty(ConfigManager, 'padButton1', {
    get: function() {
      return Input.gamepadMapper[0];
    },
    set: function(value) {
      Input.gamepadMapper[0] = value;
    },
    configurable: true
  });

  Object.defineProperty(ConfigManager, 'padButton2', {
    get: function() {
      return Input.gamepadMapper[1];
    },
    set: function(value) {
      Input.gamepadMapper[1] = value;
    },
    configurable: true
  });

  Object.defineProperty(ConfigManager, 'padButton3', {
    get: function() {
      return Input.gamepadMapper[2];
    },
    set: function(value) {
      Input.gamepadMapper[2] = value;
    },
    configurable: true
  });

  Object.defineProperty(ConfigManager, 'padButton4', {
    get: function() {
      return Input.gamepadMapper[3];
    },
    set: function(value) {
      Input.gamepadMapper[3] = value;
    },
    configurable: true
  });

  Object.defineProperty(ConfigManager, 'padButton5', {
    get: function() {
      return Input.gamepadMapper[4];
    },
    set: function(value) {
      Input.gamepadMapper[4] = value;
    },
    configurable: true
  });

  Object.defineProperty(ConfigManager, 'padButton6', {
    get: function() {
      return Input.gamepadMapper[5];
    },
    set: function(value) {
      Input.gamepadMapper[5] = value;
    },
    configurable: true
  });

  Object.defineProperty(ConfigManager, 'padButton7', {
    get: function() {
      return Input.gamepadMapper[6];
    },
    set: function(value) {
      Input.gamepadMapper[6] = value;
    },
    configurable: true
  });

  Object.defineProperty(ConfigManager, 'padButton8', {
    get: function() {
      return Input.gamepadMapper[7];
    },
    set: function(value) {
      Input.gamepadMapper[7] = value;
    },
    configurable: true
  });

  Object.defineProperty(ConfigManager, 'padButton9', {
    get: function() {
      return Input.gamepadMapper[8];
    },
    set: function(value) {
      Input.gamepadMapper[8] = value;
    },
    configurable: true
  });

  Object.defineProperty(ConfigManager, 'padButton10', {
    get: function() {
      return Input.gamepadMapper[9];
    },
    set: function(value) {
      Input.gamepadMapper[9] = value;
    },
    configurable: true
  });

  Object.defineProperty(ConfigManager, 'padButton11', {
    get: function() {
      return Input.gamepadMapper[10];
    },
    set: function(value) {
      Input.gamepadMapper[10] = value;
    },
    configurable: true
  });

  Object.defineProperty(ConfigManager, 'padButton12', {
    get: function() {
      return Input.gamepadMapper[11];
    },
    set: function(value) {
      Input.gamepadMapper[11] = value;
    },
    configurable: true
  });

  var _ConfigManager_makeData = ConfigManager.makeData;
  ConfigManager.makeData = function() {
    var config = _ConfigManager_makeData.call(this);
    config.padButton1 = this.padButton1;
    config.padButton2 = this.padButton2;
    config.padButton3 = this.padButton3;
    config.padButton4 = this.padButton4;
    config.padButton5 = this.padButton5;
    config.padButton6 = this.padButton6;
    config.padButton7 = this.padButton7;
    config.padButton8 = this.padButton8;
    config.padButton9 = this.padButton9;
    config.padButton10 = this.padButton10;
    config.padButton11 = this.padButton11;
    config.padButton12 = this.padButton12;
    return config;
  };

  var _ConfigManager_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function(config) {
    _ConfigManager_applyData.call(this, config);
    this.padButton1 = this.readPadButton(config, 'padButton1');
    this.padButton2 = this.readPadButton(config, 'padButton2');
    this.padButton3 = this.readPadButton(config, 'padButton3');
    this.padButton4 = this.readPadButton(config, 'padButton4');
    this.padButton5 = this.readPadButton(config, 'padButton5');
    this.padButton6 = this.readPadButton(config, 'padButton6');
    this.padButton7 = this.readPadButton(config, 'padButton7');
    this.padButton8 = this.readPadButton(config, 'padButton8');
    this.padButton9 = this.readPadButton(config, 'padButton9');
    this.padButton10 = this.readPadButton(config, 'padButton10');
    this.padButton11 = this.readPadButton(config, 'padButton11');
    this.padButton12 = this.readPadButton(config, 'padButton12');
  };

  ConfigManager.readPadButton = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
      return value;
    } else {
      return defaultPadButtons[name];
    }
  };

  //-----------------------------------------------------------------------------
  // Window_Option
  //

  Window_Options.prototype.windowWidth = function() {
    return optionWindowWidth;
  };

  var _Window_Option_makeCommandList = Window_Options.prototype.makeCommandList;
  Window_Options.prototype.makeCommandList = function() {
    _Window_Option_makeCommandList.call(this);
    this.addPadOptions();
    this._padButtons = ['ok', 'cancel', 'menu', 'pageup',
                      'pagedown', 'attack', 'jump', 'dash'];
    this._padButtonNames = ['決定', 'キャンセル', 'メニュー', 'キャラ変更(前)',
                            'キャラ変更(次)', '攻撃', 'ジャンプ', 'ダッシュ'];
  };

  Window_Options.prototype.addPadOptions = function() {
    this.addCommand('パッドボタン１', 'padButton1');
    this.addCommand('パッドボタン２', 'padButton2');
    this.addCommand('パッドボタン３', 'padButton3');
    this.addCommand('パッドボタン４', 'padButton4');
    this.addCommand('パッドボタン５', 'padButton5');
    this.addCommand('パッドボタン６', 'padButton6');
    this.addCommand('パッドボタン７', 'padButton7');
    this.addCommand('パッドボタン８', 'padButton8');
    this.addCommand('パッドボタン９', 'padButton9');
    this.addCommand('パッドボタン１０', 'padButton10');
    this.addCommand('パッドボタン１１', 'padButton11');
    this.addCommand('パッドボタン１２', 'padButton12');
  };

  Window_Options.prototype.statusWidth = function() {
    return optionWindowStatusWidth;
  };

  var _Window_Options_statusText = Window_Options.prototype.statusText;
  Window_Options.prototype.statusText = function(index) {
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol)
    if (this.isPadSymbol(symbol)) {
      return this.padStatusText(value);
    } else {
      return _Window_Options_statusText.call(this, index);
    }
  };

  Window_Options.prototype.isPadSymbol = function(symbol) {
    return symbol.contains('padButton');
  };

  Window_Options.prototype.padStatusText = function(value) {
    var index = this._padButtons.indexOf(value);
    return this._padButtonNames[index];
  };

  var _Window_Options_processOk = Window_Options.prototype.processOk;
  Window_Options.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    value = this._padButtons.indexOf(value);
    if (this.isPadSymbol(symbol)) {
      value += 1;
      if (value >= this._padButtons.length) {
        value = 0;
      }
      value = value.clamp(0, this._padButtons.length - 1);
      this.changeValue(symbol, this._padButtons[value]);
    } else {
      _Window_Options_processOk.call(this);
    }
  };

  var _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
  Window_Options.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    value = this._padButtons.indexOf(value);
    if (this.isPadSymbol(symbol)) {
      value += 1;
      value = value.clamp(0, this._padButtons.length - 1);
      this.changeValue(symbol, this._padButtons[value]);
    } else {
      _Window_Options_cursorRight.call(this);
    }
  };

  var _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
  Window_Options.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    value = this._padButtons.indexOf(value);
    if (this.isPadSymbol(symbol)) {
      value -= 1;
      value = value.clamp(0, this._padButtons.length - 1);
      this.changeValue(symbol, this._padButtons[value]);
    } else {
      _Window_Options_cursorLeft.call(this);
    }
  };

})();
