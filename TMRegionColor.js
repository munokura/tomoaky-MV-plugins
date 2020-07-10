//=============================================================================
// TMVplugin - リージョンカラー
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.1
// 最終更新日: 2016/04/07
//=============================================================================

/*:
 * @plugindesc 指定したリージョンにだけ色をつけて表示します。
 * 対象となるリージョンや色はプラグインコマンドで変更できます。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param regionAlpha
 * @desc リージョンカラーの不透明度（ 0 ～ 255 ）
 * 初期値: 128
 * @default 128
 *
 * @param useColorReset
 * @desc マップ移動時にリージョンカラーを初期化するかどうか
 * 初期値: 0（ 1 で初期化する）
 * @default 0
 *
 * @help
 * プラグインコマンド:
 *   setRegionColor 1 #ff0000     # リージョン１番を赤色にする
 *   resetRegionColor 1           # リージョン１番の色設定を解除
 *   changeRegion 1 2             # マップ内のリージョン１番を２番に変更
 *   changeRegionXy 5 3 255       # 座標(5, 3)のリージョンを３番に変更
 *   setStepRegion 1              # プレイヤーが移動した座標のリージョンを１番に
 *                                  変更します（ -1 で解除）
 *
 * 注意事項:
 *   このプラグインの機能によるリージョン変更は一時的なものです、
 *   マップ移動によって変更前の状態に戻ります。
 */

var Imported = Imported || {};
Imported.TMRegionColor = true;

(function() {

  var parameters = PluginManager.parameters('TMRegionColor');
  var regionAlpha   = +parameters['regionAlpha'];
  var useColorReset =  parameters['useColorReset'] === '1' ? true : false;
  
  //-----------------------------------------------------------------------------
  // Tilemap
  //
  
  Tilemap.prototype._paintTiles = function(startX, startY, x, y) {
    var tableEdgeVirtualId = 10000;
    var mx = startX + x;
    var my = startY + y;
    var dx = (mx * this._tileWidth).mod(this._layerWidth);
    var dy = (my * this._tileHeight).mod(this._layerHeight);
    var lx = dx / this._tileWidth;
    var ly = dy / this._tileHeight;
    var tileId0 = this._readMapData(mx, my, 0);
    var tileId1 = this._readMapData(mx, my, 1);
    var tileId2 = this._readMapData(mx, my, 2);
    var tileId3 = this._readMapData(mx, my, 3);
    var shadowBits = this._readMapData(mx, my, 4);
    var upperTileId1 = this._readMapData(mx, my - 1, 1);
    var lowerTiles = [];
    var upperTiles = [];

    if (this._isHigherTile(tileId0)) {
      upperTiles.push(tileId0);
    } else {
      lowerTiles.push(tileId0);
    }
    if (this._isHigherTile(tileId1)) {
      upperTiles.push(tileId1);
    } else {
      lowerTiles.push(tileId1);
    }

    lowerTiles.push(-shadowBits);

    if (this._isTableTile(upperTileId1) && !this._isTableTile(tileId1)) {
      if (!Tilemap.isShadowingTile(tileId0)) {
        lowerTiles.push(tableEdgeVirtualId + upperTileId1);
      }
    }

    if (this._isOverpassPosition(mx, my)) {
      upperTiles.push(tileId2);
      upperTiles.push(tileId3);
    } else {
      if (this._isHigherTile(tileId2)) {
        upperTiles.push(tileId2);
      } else {
        lowerTiles.push(tileId2);
      }
      if (this._isHigherTile(tileId3)) {
        upperTiles.push(tileId3);
      } else {
        lowerTiles.push(tileId3);
      }
    }

    var regionVirtualId = 100000;
    var regionId = this._readMapData(mx, my, 5);
    if ($gameMap.regionColor(regionId)) {
      lowerTiles.push(regionVirtualId + regionId);
    }
    
    var count = 1000 + this.animationCount - my;
    var frameUpdated = (count % 30 === 0);
    this._animationFrame = Math.floor(count / 30);

    var lastLowerTiles = this._readLastTiles(0, lx, ly);
    if (!lowerTiles.equals(lastLowerTiles) ||
        (Tilemap.isTileA1(tileId0) && frameUpdated)) {
      this._lowerBitmap.clearRect(dx, dy, this._tileWidth, this._tileHeight);
      for (var i = 0; i < lowerTiles.length; i++) {
        var lowerTileId = lowerTiles[i];
        if (lowerTileId < 0) {
          this._drawShadow(this._lowerBitmap, shadowBits, dx, dy);
        } else if (lowerTileId >= regionVirtualId) {
          if ($gameMap._regionColor[regionId]) {
            this._lowerBitmap.paintOpacity = regionAlpha;
            this._lowerBitmap.fillRect(dx, dy, 48, 48, $gameMap.regionColor(regionId));
            this._lowerBitmap.paintOpacity = 255;
          }
        } else if (lowerTileId >= tableEdgeVirtualId) {
          this._drawTableEdge(this._lowerBitmap, upperTileId1, dx, dy);
        } else {
          this._drawTile(this._lowerBitmap, lowerTileId, dx, dy);
        }
      }
      this._writeLastTiles(0, lx, ly, lowerTiles);
    }

    var lastUpperTiles = this._readLastTiles(1, lx, ly);
    if (!upperTiles.equals(lastUpperTiles)) {
      this._upperBitmap.clearRect(dx, dy, this._tileWidth, this._tileHeight);
      for (var j = 0; j < upperTiles.length; j++) {
        this._drawTile(this._upperBitmap, upperTiles[j], dx, dy);
      }
      this._writeLastTiles(1, lx, ly, upperTiles);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Map
  //

  var _Game_Map_initialize = Game_Map.prototype.initialize;
  Game_Map.prototype.initialize = function() {
    _Game_Map_initialize.call(this);
    this._regionColor = [];
  };

  var _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    if (useColorReset) this._regionColor = [];
  };

  Game_Map.prototype.setRegionColor = function(id, color) {
    this._regionColor = this._regionColor || [];
    this._regionColor[id] = color;
  };

  Game_Map.prototype.regionColor = function(id) {
    this._regionColor = this._regionColor || [];
    return this._regionColor[id];
  };
  
  Game_Map.prototype.changeRegionXy = function(x, y, regionId) {
    var width = $dataMap.width;
    var height = $dataMap.height;
    $dataMap.data[(5 * height + y) * width + x] = regionId;
  };
  
  Game_Map.prototype.changeRegion = function(targetRegionId, regionId) {
    var width = $dataMap.width;
    var height = $dataMap.height;
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < width; y++) {
        if (this.regionId(x, y) === targetRegionId) {
          this.changeRegionXy(x, y, regionId);
        }
      }
    }
  };
  
  //-----------------------------------------------------------------------------
  // Game_Player
  //

  Game_Player.prototype.stepRegionId = function() {
    if (this._stepRegionId === undefined) {
      this._stepRegionId = -1;
    }
    return this._stepRegionId;
  };

  Game_Player.prototype.setStepRegionId = function(stepRegionId) {
    this._stepRegionId = stepRegionId;
  };
  
  var _Game_Player_moveStraight = Game_Player.prototype.moveStraight;
  Game_Player.prototype.moveStraight = function(d) {
    lastX = this._x;
    lastY = this._y;
    _Game_Player_moveStraight.call(this, d);
    var stepRegionId = this.stepRegionId();
    if (stepRegionId >= 0 && this.isMovementSucceeded()) {
      $gameMap.changeRegionXy(lastX, lastY, stepRegionId);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'setRegionColor') {
      $gameMap.setRegionColor(+args[0], args[1]);
    } else if (command === 'resetRegionColor') {
      $gameMap.setRegionColor(+args[0], undefined);
    } else if (command === 'changeRegion') {
      $gameMap.changeRegion(+args[0], +args[1]);
    } else if (command === 'changeRegionXy') {
      $gameMap.changeRegionXy(+args[0], +args[1], +args[2]);
    } else if (command === 'setStepRegion') {
      $gamePlayer.setStepRegionId(+args[0]);
    }
  };
  
})();
