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
@target MZ MV
@plugindesc Set a common event to any key and use it as a shortcut key in the map scene.
@author tomoaky
@url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/TMCommonEventKey.js
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/tomoaky-MV-plugins ).
Original plugin by tomoaky.
-----
TMPlugin - Common Event Key ver1.0.2

How to Use:

Set the number of the common event you want to trigger in the plugin parameters.
Press the corresponding key in the map scene to execute the common event.

The common event key will be disabled in the following situations:

- Scene switching

- Player movement

- Event execution

Note:

Using keys used by RPG Maker's standard functions or other plugins

will cause conflicts and errors.

The number keys are not the numeric keypad, but the keys above the alphabet.

Terms of Use:
MIT License.
https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
You may modify and redistribute this plugin without permission, and there are no restrictions on its use (commercial, 18+, etc.).

@param freeMove
@text On-the-move activation key
@desc The key is enabled even when the player is moving. Default: OFF ( false = OFF disabled / true = ON enabled )
@default false
@type boolean
@on Enable
@off Disable

@param commonKey0
@text Common 0 key
@desc Common event triggered by 0 key Initial value: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKey1
@text Common 1 Key
@desc Common event triggered by key 1 Initial value: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKey2
@text Common 2 Keys
@desc Common event triggered by key 2 Initial value: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKey3
@text Common 3 Keys
@desc Common event triggered by pressing the 3 key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKey4
@text Common 4 Keys
@desc Common event triggered by pressing 4 key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKey5
@text Common 5 Key
@desc Common event triggered by pressing the 5 key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKey6
@text Common 6 Keys
@desc Common event triggered by pressing 6 key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKey7
@text Common 7 Key
@desc Common event triggered by pressing the 7 key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKey8
@text Common 8 Keys
@desc Common event triggered by 8 keys Initial value: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKey9
@text Common 9 Key
@desc Common event triggered by pressing the 9 key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyA
@text Common A Key
@desc Common event triggered by A key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyB
@text Common B key
@desc Common event triggered by B key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyC
@text Common C key
@desc Common event triggered by C key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyD
@text Common D key
@desc Common event triggered by D key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyE
@text Common E key
@desc Common event triggered by E key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyF
@text Common F Key
@desc Common event triggered by F key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyG
@text Common G Key
@desc Common event triggered by G key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyH
@text Common H key
@desc Common event triggered by H key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyI
@text Common I key
@desc Common event triggered by I key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyJ
@text Common J key
@desc Common event triggered by J key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyK
@text Common K key
@desc Common event triggered by K key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyL
@text Common L key
@desc Common event triggered by pressing the L key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyM
@text Common M key
@desc Common event triggered by M key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyN
@text Common N Key
@desc Common event triggered by N key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyO
@text Common O key
@desc Common event triggered by pressing the O key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyP
@text Common P Key
@desc Common event triggered by pressing the P key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyQ
@text Common Q Key
@desc Common event triggered by Q key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyR
@text Common R Key
@desc Common event triggered by R key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyS
@text Common S Key
@desc Common event triggered by S key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyT
@text Common T Key
@desc Common event triggered by T key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyU
@text Common U Key
@desc Common event triggered by U key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyV
@text Common V Key
@desc Common event triggered by V key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyW
@text Common W Key
@desc Common event triggered by W key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyX
@text Common X Key
@desc Common event triggered by X key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyY
@text Common Y Key
@desc Common event triggered by pressing the Y key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyZ
@text Common Z key
@desc Common event triggered by Z key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyF1
@text Common F1 key
@desc Common event triggered by F1 key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyF2
@text Common F2 key
@desc Common event triggered by F2 key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyF3
@text Common F3 key
@desc Common event triggered by F3 key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyF4
@text Common F4 key
@desc Common event triggered by F4 key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyF5
@text Common F5 key
@desc Common event triggered by F5 key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyF6
@text Common F6 key
@desc Common event triggered by F6 key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyF7
@text Common F7 key
@desc Common event triggered by F7 key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyF8
@text Common F8 key
@desc Common event triggered by F8 key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyF9
@text Common F9 key
@desc Common event triggered by F9 key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyF10
@text Common F10 key
@desc Common event triggered by F10 key Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyF11
@text Common F11 key
@desc Common event triggered by F11 key. Default: 0 (enabled with 1 or higher)
@default 0
@type common_event

@param commonKeyF12
@text Common F12 key
@desc Common event triggered by F12 key Default: 0 (enabled with 1 or higher)
@default 0
@type common_event
*/


/*:ja
@target MZ MV
@plugindesc 任意のキーにコモンイベントを設定し、マップシーンでショートカットキーとして利用できるようにします。
@author tomoaky
@url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/TMCommonEventKey.js
@license MIT License

@help
TMPlugin - コモンイベントキー ver1.0.2

使い方:

  プラグインパラメータに起動したいコモンイベントの番号を設定してください、
  マップシーンで対応するキーを押せばコモンイベントが実行されます。

  下記の状況ではコモンイベントキーが無効化されます。
  ・シーン切り替え中
  ・プレイヤー移動中
  ・イベント実行中


注意:

  RPGツクールの標準機能、または他のプラグインで使用しているキーを使うと
  競合によるエラーの原因になります。

  数字キーはテンキーではなく、アルファベットの上部にあるキーです。


利用規約:
  MITライセンスです。
  https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。

@param freeMove
@text 移動中有効化キー
@desc プレイヤーが移動中でもキーが有効になります。 初期値: OFF ( false = OFF 無効 / true = ON 有効 )
@default false
@type boolean
@on 有効化
@off 無効化

@param commonKey0
@text コモン0キー
@desc 0キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKey1
@text コモン1キー
@desc 1キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKey2
@text コモン2キー
@desc 2キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKey3
@text コモン3キー
@desc 3キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKey4
@text コモン4キー
@desc 4キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKey5
@text コモン5キー
@desc 5キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKey6
@text コモン6キー
@desc 6キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKey7
@text コモン7キー
@desc 7キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKey8
@text コモン8キー
@desc 8キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKey9
@text コモン9キー
@desc 9キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyA
@text コモンAキー
@desc Aキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyB
@text コモンBキー
@desc Bキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyC
@text コモンCキー
@desc Cキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyD
@text コモンDキー
@desc Dキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyE
@text コモンEキー
@desc Eキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyF
@text コモンFキー
@desc Fキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyG
@text コモンGキー
@desc Gキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyH
@text コモンHキー
@desc Hキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyI
@text コモンIキー
@desc Iキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyJ
@text コモンJキー
@desc Jキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyK
@text コモンKキー
@desc Kキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyL
@text コモンLキー
@desc Lキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyM
@text コモンMキー
@desc Mキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyN
@text コモンNキー
@desc Nキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyO
@text コモンOキー
@desc Oキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyP
@text コモンPキー
@desc Pキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyQ
@text コモンQキー
@desc Qキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyR
@text コモンRキー
@desc Rキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyS
@text コモンSキー
@desc Sキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyT
@text コモンTキー
@desc Tキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyU
@text コモンUキー
@desc Uキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyV
@text コモンVキー
@desc Vキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyW
@text コモンWキー
@desc Wキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyX
@text コモンXキー
@desc Xキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyY
@text コモンYキー
@desc Yキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyZ
@text コモンZキー
@desc Zキーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyF1
@text コモンF1キー
@desc F1キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyF2
@text コモンF2キー
@desc F2キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyF3
@text コモンF3キー
@desc F3キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyF4
@text コモンF4キー
@desc F4キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyF5
@text コモンF5キー
@desc F5キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyF6
@text コモンF6キー
@desc F6キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyF7
@text コモンF7キー
@desc F7キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyF8
@text コモンF8キー
@desc F8キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyF9
@text コモンF9キー
@desc F9キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyF10
@text コモンF10キー
@desc F10キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyF11
@text コモンF11キー
@desc F11キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event

@param commonKeyF12
@text コモンF12キー
@desc F12キーで起動するコモンイベント 初期値: 0( 1 以上で有効)
@default 0
@type common_event
*/

var Imported = Imported || {};
Imported.TMCommonEventKey = true;

(function () {

  var parameters = PluginManager.parameters('TMCommonEventKey');
  var commonKeyCodes = {
    48: '0', 49: '1', 50: '2', 51: '3', 52: '4',
    53: '5', 54: '6', 55: '7', 56: '8', 57: '9',
    65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E',
    70: 'F', 71: 'G', 72: 'H', 73: 'I', 74: 'J',
    75: 'K', 76: 'L', 77: 'M', 78: 'N', 79: 'O',
    80: 'P', 81: 'Q', 82: 'R', 83: 'S', 84: 'T',
    85: 'U', 86: 'V', 87: 'W', 88: 'X', 89: 'Y',
    90: 'Z',
    112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4',
    116: 'F5', 117: 'F6', 118: 'F7', 119: 'F8',
    120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12'
  };
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
  Scene_Map.prototype.updateScene = function () {
    _Scene_Map_updateScene.call(this);
    if (!SceneManager.isSceneChanging() && !$gameMap.isEventRunning() &&
      (!$gamePlayer.isMoving() || freeMove)) {
      Object.keys(commonKeys).some(function (key) {
        if (Input.isTriggered(key)) {
          $gameTemp.reserveCommonEvent(commonKeys[key]);
          return true;
        }
      });
    }
  };

})();