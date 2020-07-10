//=============================================================================
// TMVplugin - ＨＰゲージ（ジャンプアクション拡張）
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 0.3b
// 最終更新日: 2016/01/19
//=============================================================================

/*:
 * @plugindesc マップシーンに顔グラフィックとＨＰゲージを表示します。
 * (必ず TMJumpAction より下に導入してください)
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param Gauge Window X
 * @desc ＨＰゲージウィンドウの X 座標。
 * 初期値: 0
 * @default 0
 *
 * @param Gauge Window Y
 * @desc ＨＰゲージウィンドウの Y 座標。
 * 初期値: 0
 * @default 0
 *
 * @param Gauge Offset X
 * @desc ＨＰゲージの X 座標補正値。
 * 初期値: 12
 * @default 12
 *
 * @param Gauge Offset Y
 * @desc ＨＰゲージの Y 座標補正値。
 * 初期値: 0
 * @default 0
 *
 * @param Face Offset X
 * @desc 顔グラフィックの X 座標補正値。
 * 初期値: -4
 * @default -4
 *
 * @param Face Offset Y
 * @desc 顔グラフィックの Y 座標補正値。
 * 初期値: -4
 * @default -4
 *
 * @param Shake Time
 * @desc ダメージを受けたときにウィンドウを揺らす時間。
 * 初期値: 20（ 0 で揺らさない）
 * @default 20
 *
 * @param Start Visible
 * @desc ゲーム開始時の表示状態。
 * 初期値: 1（ 0 で非表示）
 * @default 1
 *
 * @param Collide Opacity
 * @desc プレイヤーと重なったときの不透明度。
 * 初期値: 128（ 0 ～ 255 ）
 * @default 128
 *
 * @param messageBusyHide
 * @desc メッセージウィンドウ表示中はログウィンドウを隠す。
 * 初期値: 1（ 0 で隠さない）
 * @default 1
 *
 * @param eventBusyHide
 * @desc イベント起動中はログウィンドウを隠す。
 * 初期値: 1（ 0 で隠さない）
 * @default 1
 *
 * @help このプラグインの動作には TMVplugin - ジャンプアクション Ver0.2b 以上
 * が必要です。必ずこちらのプラグインを下に導入してください。
 *
 * プラグインコマンド:
 *   JumpAction show_hp_gauge      # ＨＰゲージを表示する
 *   JumpAction hide_hp_gauge      # ＨＰゲージを隠す
 */

var Imported = Imported || {};
Imported.TMJAHpGauge = true;

var Tomoaky = Tomoaky || {};

Tomoaky.Parameters = PluginManager.parameters('TMJAHpGauge');
Tomoaky.Param = Tomoaky.Param || {};

Tomoaky.Param.JAHGGaugeWindowX = Number(Tomoaky.Parameters['Gauge Window X']);
Tomoaky.Param.JAHGGaugeWindowY = Number(Tomoaky.Parameters['Gauge Window Y']);
Tomoaky.Param.JAHGGaugeOffsetX = Number(Tomoaky.Parameters['Gauge Offset X']);
Tomoaky.Param.JAHGGaugeOffsetY = Number(Tomoaky.Parameters['Gauge Offset Y']);
Tomoaky.Param.JAHGFaceOffsetX = Number(Tomoaky.Parameters['Face Offset X']);
Tomoaky.Param.JAHGFaceOffsetY = Number(Tomoaky.Parameters['Face Offset Y']);
Tomoaky.Param.JAHGShakeTime = Number(Tomoaky.Parameters['Shake Time']);
Tomoaky.Param.JAHGStartVisible = Tomoaky.Parameters['Start Visible'] === '1' ? true : false;
Tomoaky.Param.JAHGCollideOpacity = Number(Tomoaky.Parameters['Collide Opacity']);
Tomoaky.Param.JAHGMessageBusyHide = Tomoaky.Parameters['messageBusyHide'] === '1' ? true : false;
Tomoaky.Param.JAHGEventBusyHide = Tomoaky.Parameters['eventBusyHide'] === '1' ? true : false;

(function() {

  //-----------------------------------------------------------------------------
  // Game_System
  //

  Game_System.prototype.isVisibleMapHpGauge = function() {
    if (this._visibleMapHpGauge === undefined) {
      this._visibleMapHpGauge = Tomoaky.Param.JAHGStartVisible;
    }
    return this._visibleMapHpGauge;
  };
  
  Game_System.prototype.setVisibleMapHpGauge = function(flag) {
    this._visibleMapHpGauge = flag;
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  // Change Party Member
  var _Game_Interpreter_command129 = Game_Interpreter.prototype.command129;
  Game_Interpreter.prototype.command129 = function() {
    _Game_Interpreter_command129.call(this);
    if (this._params[1] === 0) {
      var actor = $gameActors.actor(this._params[0]);
      var bitmap = ImageManager.loadFace(actor._faceName);
    }
    return true;
  };

  // プラグインコマンド
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'JumpAction') {
      switch (args[0]) {
      case 'show_hp_gauge':
        $gameSystem.setVisibleMapHpGauge(true);
        break;
      case 'showHpGauge':
        $gameSystem.setVisibleMapHpGauge(true);
        break;
      case 'hide_hp_gauge':
        $gameSystem.setVisibleMapHpGauge(false);
        break;
      case 'hideHpGauge':
        $gameSystem.setVisibleMapHpGauge(false);
        break;
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Window_MapHpGauge
  //

  function Window_MapHpGauge() {
    this.initialize.apply(this, arguments);
  }

  Window_MapHpGauge.prototype = Object.create(Window_Base.prototype);
  Window_MapHpGauge.prototype.constructor = Window_MapHpGauge;

  Window_MapHpGauge.prototype.initialize = function() {
    var x = Tomoaky.Param.JAHGGaugeWindowX;
    var y = Tomoaky.Param.JAHGGaugeWindowY;
    var wight = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, wight, height);
    this.openness = $gameSystem.isVisibleMapHpGauge() ? 255 : 0;
    this.opacity = 255;
    this.contentsOpacity = 255;
    this._hp = -1;
    this._mhp = -1;
    this._actorId = -1;
    this._shakeDuration = 0;
    this._baseX = x;
    this.loadImages();
    this.refresh();
  };

  // ウィンドウの幅を取得
  Window_MapHpGauge.prototype.windowWidth = function() {
    return 288;
  };

  // ウィンドウの高さを取得
  Window_MapHpGauge.prototype.windowHeight = function() {
    return 64;
  };

  // 標準パディングを取得
  Window_MapHpGauge.prototype.standardPadding = function() {
    return 0;
  };

  // 画像の読み込み
  Window_MapHpGauge.prototype.loadImages = function() {
      $gameParty.members().forEach(function(actor) {
          ImageManager.loadFace(actor.faceName());
      }, this);
  };

  // フレーム更新
  Window_MapHpGauge.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    var visible = this.isVisible();
    if (visible) {
      this.open();
      if (this.isNeedRefresh()) {
        var actor = $gamePlayer.actor();
        if (this._hp > actor.hp && this._actorId === actor.actorId()) {
          this._shakeDuration = Tomoaky.Param.JAHGShakeTime;
        }
        this._hp = actor.hp;
        this._mhp = actor.mhp;
        this._actorId = actor.actorId();
        this.refresh();
      }
      if (this._shakeDuration > 0) {
        this._shakeDuration--;
        this.x = this._baseX;
        if (this._shakeDuration > 0) {
          this.x += Math.floor(Math.sin((this._shakeDuration % 10) * Math.PI / 5) * 8);
        }
      }
      this.updateOpacity();
    } else {
      this.close();
    }
  };

  // リフレッシュが必要かどうかを返す
  Window_MapHpGauge.prototype.isNeedRefresh = function() {
    var actor = $gamePlayer.actor();
    return this._hp !== actor.hp || this._mhp !== actor.mhp ||
           this._actorId !== actor.actorId();
  };

  // ウィンドウを表示するか
  Window_MapHpGauge.prototype.isVisible = function() {
    if (Tomoaky.Param.JAHGEventBusyHide && $gameMap.isEventRunning()) {
      return false;
    }
    if (Tomoaky.Param.JAHGMessageBusyHide && $gameMessage.isBusy()) {
      return false;
    }
    return $gameSystem.isVisibleMapHpGauge() && $gameParty.size() > 0;
  };

  // 不透明度の更新
  Window_MapHpGauge.prototype.updateOpacity = function() {
    if (this.x < $gamePlayer.screenX() + 24 &&
        this.x + this.windowWidth() > $gamePlayer.screenX() - 24 &&
        this.y < $gamePlayer.screenY() &&
        this.y + this.windowHeight() > $gamePlayer.screenY() - 48) {
      this.opacity = Tomoaky.Param.JAHGCollideOpacity;
    } else {
      this.opacity = 255;
    }
    this.contentsOpacity = this.opacity;
  };

  // リフレッシュ
  Window_MapHpGauge.prototype.refresh = function() {
    this.contents.clear();
    var actor = $gamePlayer.actor();
    if (actor) {
      var x = this.windowWidth() - 144 + Tomoaky.Param.JAHGFaceOffsetX;
      var y = Tomoaky.Param.JAHGFaceOffsetY;
      this.drawFace(actor._faceName, actor._faceIndex, x, y, 144, this.windowHeight());
      x = Tomoaky.Param.JAHGGaugeOffsetX;
      y = (this.windowHeight() - this.lineHeight()) / 2 + Tomoaky.Param.JAHGGaugeOffsetY;
      this.drawActorHp(actor, x, y, 144);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);
    this.createMapHpGaugeWindow();
  };

  // HPゲージウィンドウの作成
  Scene_Map.prototype.createMapHpGaugeWindow = function() {
    this._mapHpGaugeWindow = new Window_MapHpGauge();
    this.addChild(this._mapHpGaugeWindow);
  };

  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    if (!SceneManager.isNextScene(Scene_Battle)) {
      this._mapHpGaugeWindow.hide();
    }
    _Scene_Map_terminate.call(this);
  };
  
  var _Scene_Map_launchBattle = Scene_Map.prototype.launchBattle;
  Scene_Map.prototype.launchBattle = function() {
    this._mapHpGaugeWindow.hide();
    this.removeChild(this._mapHpGaugeWindow);
    this._mapHpGaugeWindow = null;
    _Scene_Map_launchBattle.call(this);
  };
  
})();
