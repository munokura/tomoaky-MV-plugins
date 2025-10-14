//=============================================================================
// TMVplugin - バナナ
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2016/06/02
//=============================================================================
/*:
@plugindesc Displaying bananas.
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
This banana stands up to fades and scene transitions.

Required Image:
By default, an image file called banana256.png is required in the img/pictures folder.
It is available on the plugin distribution page, so please download it separately.
https://github.com/munokura/tomoaky-MV-plugins/tree/master/img/pictures

There is no plugin command.

@param banana
@desc Banana file name Default: banana256
@default banana256

@param bananaX
@desc X coordinate to display the banana Initial value: 96
@default 96

@param bananaY
@desc Y coordinate to display the banana Initial value: 96
@default 96

@param bananaR
@desc Banana rotation angle Initial value: 0 (3.141592 means 180 degree rotation)
@default 0

@param bananaS
@desc Banana magnification Initial value: 1.0 (1.0 is the same size)
@default 1.0
*/


/*:ja
@plugindesc バナナを表示します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT

@help
フェードにも負けず、シーン遷移にも負けず、そんなバナナ。

必要な画像:
  初期設定では img/pictures フォルダに banana256.png という画像ファイルが
  必要です。プラグイン配布ページにありますので、別途ダウンロードしてくだ
  さい。
https://github.com/munokura/tomoaky-MV-plugins/tree/master/img/pictures

プラグインコマンドはありません。

@param banana
@desc バナナのファイル名 初期値: banana256
@default banana256

@param bananaX
@desc バナナを表示するＸ座標 初期値: 96
@default 96

@param bananaY
@desc バナナを表示するＹ座標 初期値: 96
@default 96

@param bananaR
@desc バナナの回転角度 初期値: 0 ( 3.141592 で１８０度回転します)
@default 0

@param bananaS
@desc バナナの拡大率 初期値: 1.0 ( 1.0 で等倍)
@default 1.0
*/

var Imported = Imported || {};
Imported.TMBanana = true;

(function() {

  var parameters = PluginManager.parameters('TMBanana');
  var banana  = parameters['banana'];
  var bananaX = +parameters['bananaX'];
  var bananaY = +parameters['bananaY'];
  var bananaR = +parameters['bananaR'];
  var bananaS = +parameters['bananaS'];
  
  //-----------------------------------------------------------------------------
  // SceneManager
  //

  var _SceneManager_initialize = SceneManager.initialize;
  SceneManager.initialize = function() {
    _SceneManager_initialize.call(this);
    this.initBananaSprite();
  };

  SceneManager.initBananaSprite = function() {
    this._bananaSprite = new Sprite();
    this._bananaSprite.bitmap = ImageManager.loadPicture(banana);
    this._bananaSprite.anchor.x = 0.5;
    this._bananaSprite.anchor.y = 0.5;
    this._bananaSprite.x = bananaX;
    this._bananaSprite.y = bananaY;
    this._bananaSprite.rotation = bananaR;
    this._bananaSprite.scale.x = bananaS;
    this._bananaSprite.scale.y = bananaS;
  };

  var _SceneManager_onSceneStart = SceneManager.onSceneStart;
  SceneManager.onSceneStart = function() {
    _SceneManager_onSceneStart.call(this);
    this.refreshBananaZ();
  };
  
  SceneManager.refreshBananaZ = function() {
    this._scene.addChild(this._bananaSprite);
  };
  
  var _SceneManager_snapForBackground = SceneManager.snapForBackground;
  SceneManager.snapForBackground = function() {
    this._bananaSprite.visible = false;
    _SceneManager_snapForBackground.call(this);
    this._bananaSprite.visible = true;
  };
  
  //-----------------------------------------------------------------------------
  // Scene_Base
  //

  var _Scene_Base_createFadeSprite = Scene_Base.prototype.createFadeSprite;
  Scene_Base.prototype.createFadeSprite = function(white) {
    _Scene_Base_createFadeSprite.call(this, white);
    SceneManager.refreshBananaZ();
  };

})();