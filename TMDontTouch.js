//=============================================================================
// TMVplugin - ドントタッチ
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2015/11/07
//=============================================================================

/*:
 * @plugindesc 指定したリージョンをタップ（クリック）できなくします。
 * 
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param Dont Touch Region
 * @desc タップ（クリック）できないリージョン番号。
 * 初期値: 1
 * @default 1
 *
 * @help TMVplugin - ボタンピクチャと併用する場合、PluginManager内の
 * 並び順によって優先度が変わります。
 * ドントタッチリージョンとボタンピクチャの領域が重なっている場合、
 * ドントタッチが下にあればボタンピクチャは反応しません。
 * 逆にボタンピクチャが下にあるとボタンピクチャが反応します。
 *
 * プラグインコマンドはありません。
 */

var Imported = Imported || {};
Imported.TMDontTouch = true;

var Tomoaky = Tomoaky || {};
Tomoaky.DT = Tomoaky.DT || {};

Tomoaky.Parameters = PluginManager.parameters('TMDontTouch');
Tomoaky.Param = Tomoaky.Param || {};

Tomoaky.Param.DTRegion = Number(Tomoaky.Parameters['Dont Touch Region']);

Tomoaky.DT.Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {
  var x = $gameMap.canvasToMapX(TouchInput.x);
  var y = $gameMap.canvasToMapY(TouchInput.y);
  if (!$gameMap.regionId(x, y) == Tomoaky.Param.DTRegion) {
    Tomoaky.DT.Scene_Map_processMapTouch.call(this);
  }
};

