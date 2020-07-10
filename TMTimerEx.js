//=============================================================================
// TMVplugin - タイマー拡張
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2016/07/29
//=============================================================================

/*:
 * @plugindesc タイマー表示を秒単位からミリ秒単位に変更します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param timerX
 * @desc タイマーを表示するＸ座標。
 * 初期値: 816（ウィンドウの幅以上の値の場合は右端）
 * @default 816
 *
 * @param timerY
 * @desc タイマーを表示するＹ座標。
 * 初期値: 0（ウィンドウの高さ以上の値の場合は右端）
 * @default 0
 *
 * @param showMinutes
 * @desc タイマーを 分 : 秒 の書式で表示する。
 * 初期値: 1（ 0 で秒のみ / 1 で分 : 秒）
 * @default 1
 *
 * @param msecShiftY
 * @desc ミリ秒表示のＹ座標を調整します。
 * 初期値: 36
 * @default 36
 *
 * @help
 * 使用方法:
 * 
 *   プラグインを導入するだけで特に何もしなくてもタイマー機能が拡張されます。
 *
 *   イベントコマンド『条件分岐』のタイマー判定を使用すると、ミリ秒単位では
 *   まだ時間が残っているのにも関わらず時間切れと判定されてしまいます。
 *   プラグインコマンド timerMsec でゲーム変数に残り時間を代入してから、その
 *   変数を使って条件分岐を実行することでこの問題を回避できます。
 *
 *   ミリ秒表示は毎フレーム再描画を実行するため、処理が重くなります。
 *
 *
 * プラグインコマンド:
 *
 *   timerMsec 5
 *     ゲーム変数５番にタイマーの残り時間をミリ秒単位で代入します。
 * 
 */

var Imported = Imported || {};
Imported.TMTimerEx = true;

(function() {

  var parameters = PluginManager.parameters('TMTimerEx');
  var timerX      = +parameters['timerX'];
  var timerY      = +parameters['timerY'];
  var showMinutes =  parameters['showMinutes'] === '1';
  var msecShiftY  = +parameters['msecShiftY'];
  
  //-----------------------------------------------------------------------------
  // Game_Timer
  //

  Game_Timer.prototype.msec = function() {
    return Math.floor(this._frames / 60 * 1000);
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'timerMsec') {
      $gameVariables.setValue(+args[0], $gameTimer.msec());
    }
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_Timer
  //

  Sprite_Timer.prototype.createBitmap = function() {
    this.bitmap = new Bitmap(160, 48);
  };

  var _Sprite_Timer_updateBitmap = Sprite_Timer.prototype.updateBitmap;
  Sprite_Timer.prototype.updateBitmap = function() {
    _Sprite_Timer_updateBitmap.call(this);
    var msec = $gameTimer.msec();
    if (this._msec !== msec) {
      this._msec = msec;
      this.redrawMsec();
    }
  };

  Sprite_Timer.prototype.redraw = function() {
    this.bitmap.fontSize = 32;
    var text = showMinutes ? this.timerText() : '' + this._seconds;
    var height = this.bitmap.height;
    this.bitmap.clearRect(0, 0, 96, height);
    this.bitmap.drawText(text, 0, 0, 96, height, 'right');
  };

  Sprite_Timer.prototype.redrawMsec = function() {
    this.bitmap.fontSize = 16;
    var text = '.' + (this._msec % 1000).padZero(3);
    var y = this.bitmap.height - msecShiftY;
    var width = this.bitmap.width - 96;
    this.bitmap.clearRect(96, y, width, msecShiftY);
    this.bitmap.drawText(text, 96, y, width, msecShiftY, 'left');
  };
  
  Sprite_Timer.prototype.updatePosition = function() {
    if (timerX >= Graphics.width) {
      this.x = Graphics.width - this.bitmap.width;
    } else {
      this.x = timerX;
    }
    if (timerY >= Graphics.height) {
      this.y = Graphics.height - this.bitmap.height;
    } else {
      this.y = timerY;
    }
  };

})();
