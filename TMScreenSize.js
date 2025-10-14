//=============================================================================
// TMVplugin - ゲーム画面解像度変更
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2015/12/25
//=============================================================================
/*:
@plugindesc Change the game screen resolution.
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
There are no plugin commands.

@param graphicsWidth
@desc Game screen width Default: 816
@default 816

@param graphicsHeight
@desc Game screen height Default: 624
@default 624

@param windowResize
@desc Whether to change the size of various windows. Default: 0 (set to 1 to change).
@default 0

@param battleBackWidth
@desc Battle background width Default: 0 (0 fits the game screen)
@default 0

@param battleBackHeight
@desc Battle background height Default: 0 (0 fits the game screen)
@default 0
*/


/*:ja
@plugindesc ゲーム画面の解像度を変更します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT

@help
プラグインコマンドはありません。

@param graphicsWidth
@desc ゲーム画面の幅 初期値: 816
@default 816

@param graphicsHeight
@desc ゲーム画面の高さ 初期値: 624
@default 624

@param windowResize
@desc 各種ウィンドウのサイズも変更するかどうか 初期値: 0（ 1 で変更する）
@default 0

@param battleBackWidth
@desc 戦闘背景の幅 初期値: 0（ 0 でゲーム画面に合わせる）
@default 0

@param battleBackHeight
@desc 戦闘背景の高さ 初期値: 0（ 0 でゲーム画面に合わせる）
@default 0
*/

var Imported = Imported || {};
Imported.TMScreenSize = true;

(function() {

  var parameters = PluginManager.parameters('TMScreenSize');
  var graphicsWidth    = Number(parameters['graphicsWidth']);
  var graphicsHeight   = Number(parameters['graphicsHeight']);
  var windowResize     = parameters['windowResize'] === '1' ? true : false;
  var battleBackWidth  = Number(parameters['battleBackWidth']);
  var battleBackHeight = Number(parameters['battleBackHeight']);

  //-----------------------------------------------------------------------------
  // Scene_Manager
  //

  SceneManager._screenWidth = graphicsWidth;
  SceneManager._screenHeight = graphicsHeight;
  if (windowResize) {
    SceneManager._boxWidth = graphicsWidth;
    SceneManager._boxHeight = graphicsHeight;
  }

  //-----------------------------------------------------------------------------
  // Spriteset_Battle
  //

  Spriteset_Battle.prototype.createBattleback = function() {
    var margin = 32;
    var x = -this._battleField.x - margin;
    var y = -this._battleField.y - margin;
    var width = (battleBackWidth || Graphics.width + margin * 2);
    var height = (battleBackHeight || Graphics.height + margin * 2);
    this._back1Sprite = new TilingSprite();
    this._back2Sprite = new TilingSprite();
    this._back1Sprite.bitmap = this.battleback1Bitmap();
    this._back2Sprite.bitmap = this.battleback2Bitmap();
    this._back1Sprite.move(battleBackWidth ? 0 : x,
                           battleBackHeight ? 0 : y, width, height);
    this._back2Sprite.move(battleBackWidth ? 0 : x,
                           battleBackHeight ? 0 : y, width, height);
    this._battleField.addChild(this._back1Sprite);
    this._battleField.addChild(this._back2Sprite);
  };

})();