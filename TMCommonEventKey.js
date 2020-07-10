//=============================================================================
// TMPlugin - コモンイベントキー
// バージョン: 1.0.2
// 最終更新日: 2017/06/28
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 任意のキーにコモンイベントを設定し、マップシーンで
 * ショートカットキーとして利用できるようにします。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param commonKey0
 * @type number
 * @desc ０キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKey1
 * @type number
 * @desc １キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKey2
 * @type number
 * @desc ２キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKey3
 * @type number
 * @desc ３キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKey4
 * @type number
 * @desc ４キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKey5
 * @type number
 * @desc ５キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKey6
 * @type number
 * @desc ６キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKey7
 * @type number
 * @desc ７キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKey8
 * @type number
 * @desc ８キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKey9
 * @type number
 * @desc ９キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyA
 * @type number
 * @desc Ａキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyB
 * @type number
 * @desc Ｂキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyC
 * @type number
 * @desc Ｃキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyD
 * @type number
 * @desc Ｄキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyE
 * @type number
 * @desc Ｅキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyF
 * @type number
 * @desc Ｆキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyG
 * @type number
 * @desc Ｇキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyH
 * @type number
 * @desc Ｈキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyI
 * @type number
 * @desc Ｉキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyJ
 * @type number
 * @desc Ｊキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyK
 * @type number
 * @desc Ｋキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyL
 * @type number
 * @desc Ｌキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyM
 * @type number
 * @desc Ｍキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyN
 * @type number
 * @desc Ｎキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyO
 * @type number
 * @desc Ｏキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyP
 * @type number
 * @desc Ｐキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyQ
 * @type number
 * @desc Ｑキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyR
 * @type number
 * @desc Ｒキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyS
 * @type number
 * @desc Ｓキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyT
 * @type number
 * @desc Ｔキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyU
 * @type number
 * @desc Ｕキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyV
 * @type number
 * @desc Ｖキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyW
 * @type number
 * @desc Ｗキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyX
 * @type number
 * @desc Ｘキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyY
 * @type number
 * @desc Ｙキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyZ
 * @type number
 * @desc Ｚキーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyF1
 * @type number
 * @desc Ｆ１キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyF2
 * @type number
 * @desc Ｆ２キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyF3
 * @type number
 * @desc Ｆ３キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyF4
 * @type number
 * @desc Ｆ４キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyF5
 * @type number
 * @desc Ｆ５キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyF6
 * @type number
 * @desc Ｆ６キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyF7
 * @type number
 * @desc Ｆ７キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyF8
 * @type number
 * @desc Ｆ８キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyF9
 * @type number
 * @desc Ｆ９キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyF10
 * @type number
 * @desc Ｆ１０キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyF11
 * @type number
 * @desc Ｆ１１キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 *
 * @param commonKeyF12
 * @type number
 * @desc Ｆ１２キーで起動するコモンイベント番号
 * 初期値: 0（ 1 以上で有効）
 * @default 0
 * 
 * @param freeMove
 * @type boolean
 * @desc プレイヤーが移動中でもキーが有効になります。
 * 初期値: OFF ( false = OFF 無効 / true = ON 有効 )
 * @default false
 *
 * @help
 * TMPlugin - コモンイベントキー ver1.0.2
 * 
 * 使い方:
 *
 *   プラグインパラメータに起動したいコモンイベントの番号を設定してください、
 *   マップシーンで対応するキーを押せばコモンイベントが実行されます。
 * 
 *   下記の状況ではコモンイベントキーが無効化されます。
 *   ・シーン切り替え中
 *   ・プレイヤー移動中
 *   ・イベント実行中
 *
 *   このプラグインは RPGツクールMV Version 1.5.0 で動作確認をしています。
 *
 *
 * 注意:
 * 
 *   RPGツクールMVの標準機能、または他のプラグインで使用しているキーを使うと
 *   競合によるエラーの原因になります。
 */

var Imported = Imported || {};
Imported.TMCommonEventKey = true;

(function() {

  var parameters = PluginManager.parameters('TMCommonEventKey');
  var commonKeyCodes = {48: '0', 49: '1', 50: '2', 51: '3', 52: '4',
                        53: '5', 54: '6', 55: '7', 56: '8', 57: '9',
                        65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E',
                        70: 'F', 71: 'G', 72: 'H', 73: 'I', 74: 'J',
                        75: 'K', 76: 'L', 77: 'M', 78: 'N', 79: 'O',
                        80: 'P', 81: 'Q', 82: 'R', 83: 'S', 84: 'T',
                        85: 'U', 86: 'V', 87: 'W', 88: 'X', 89: 'Y',
                        90: 'Z',
                        112: 'F1', 113: 'F2',  114: 'F3',  115: 'F4',
                        116: 'F5', 117: 'F6',  118: 'F7',  119: 'F8',
                        120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12'};
  var commonKeys = {};
  var keys = Object.keys(commonKeyCodes);
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i];
    var name = 'commonKey' + commonKeyCodes[key];
    var commonEventId = +parameters[name];
    if (commonEventId > 0) {
      Input.keyMapper[key] = name;
      commonKeys[name] = commonEventId;
    }
  }
  var freeMove = JSON.parse(parameters['freeMove']);

  //-----------------------------------------------------------------------------
  // Scene_Map
  //
  
  var _Scene_Map_updateScene = Scene_Map.prototype.updateScene;
  Scene_Map.prototype.updateScene = function() {
    _Scene_Map_updateScene.call(this);
    if (!SceneManager.isSceneChanging() && !$gameMap.isEventRunning() &&
        (!$gamePlayer.isMoving() || freeMove )) {
      Object.keys(commonKeys).some (function(key) {
        if (Input.isTriggered(key)) {
          $gameTemp.reserveCommonEvent(commonKeys[key]);
          return true;
        }
      });
    }
  };

})();
