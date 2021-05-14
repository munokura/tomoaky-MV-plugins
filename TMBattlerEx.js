//=============================================================================
// TMPlugin - バトラー表示拡張
// バージョン: 2.0.0
// 最終更新日: 2016/08/12
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc エネミーに遠近感や息づかいの表現を追加します。
 *
 * @author tomoaky
 *
 * @param baseY
 * @text 拡大率が等倍になるＹ座標
 * @desc 拡大率が等倍になるＹ座標。
 * 初期値: 400
 * @default 400
 * 
 * @param breathH
 * @text 息づかいの大きさ
 * @desc 息づかいの大きさ。
 * 初期値: 0.05
 * @default 0.05
 * 
 * @param mirrorRate
 * @text 左右反転の確率
 * @desc 左右反転の確率。
 * 初期値: 0.4（ 0 ～ 1 ）
 * @default 0.4
 * 
 * @param breathStop
 * @text 行動不能時呼吸
 * @desc 行動不能時に息づかいを止める。
 * 初期値: true
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * 
 * @param shakeEffect
 * @text 点滅エフェクト差替
 * @desc 点滅エフェクトを揺れエフェクトに差し替える。
 * 初期値: true
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 *
 * @help
 * 使い方:
 *
 *   このプラグインを導入すると、敵キャラの表示に以下の演出が追加されます。
 *     ・画面の上の方に出現する敵が小さく表示される（遠近感）
 *     ・ゆっくりと拡大縮小を繰り返す（息づかい）
 *     ・ランダムに左右が反転する
 *
 *   サイドビューでは左右反転が無効になります。
 *   敵キャラのメモ欄にタグを書き込むことで、敵キャラごとに演出の強弱を
 *   設定することができます。
 *
 *   プラグインコマンドはありません。
 *
 *
 * メモ欄（敵キャラ）タグ:
 *
 *   <scale:1>
 *     拡大率を個別に設定します、このタグがある敵キャラには遠近感の表現が
 *     適用されません。
 *
 *   <breathH:0.05>
 *     息づかいの大きさを個別に設定します。
 *
 *   <noMirror>
 *     左右反転を禁止します。
 * 
 * 2021/5/15 v.2.0.1 プラグインパラメーターの調整
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

var Imported = Imported || {};
Imported.TMBattlerEx = true;

var TMPlugin = TMPlugin || {};
TMPlugin.BattlerEx = {};
TMPlugin.BattlerEx.Parameters = PluginManager.parameters('TMBattlerEx');
TMPlugin.BattlerEx.BaseY = +(TMPlugin.BattlerEx.Parameters['baseY'] || 400);
TMPlugin.BattlerEx.BreathH = +(TMPlugin.BattlerEx.Parameters['breathH'] || 0.05);
TMPlugin.BattlerEx.MirrorRate = +(TMPlugin.BattlerEx.Parameters['mirrorRate'] || 0.4);
TMPlugin.BattlerEx.BreathStop = TMPlugin.BattlerEx.Parameters['breathStop'] === 'true';
TMPlugin.BattlerEx.ShakeEffect = TMPlugin.BattlerEx.Parameters['shakeEffect'] === 'true';

(function () {

  //-----------------------------------------------------------------------------
  // Sprite_Enemy
  //

  var _Sprite_Enemy_initialize = Sprite_Enemy.prototype.initialize;
  Sprite_Enemy.prototype.initialize = function (battler) {
    _Sprite_Enemy_initialize.call(this, battler);
    var r = +(battler.enemy().meta.scale || this.y / (TMPlugin.BattlerEx.BaseY * 2) + 0.5);
    this._baseScale = new Point(r, r);
    if (!$gameSystem.isSideView() && Math.random() < TMPlugin.BattlerEx.MirrorRate &&
      !battler.enemy().meta.noMirror) {
      this._baseScale.x = 0 - r;
      this._stateIconSprite.scale.x = -1;
    }
    this._breathMax = Math.randomInt(90) + 90;
    this._breathCount = Math.randomInt(this._breathMax);
  };

  var _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
  Sprite_Enemy.prototype.update = function () {
    _Sprite_Enemy_update.call(this);
    this.updateScaleEx();
  };

  Sprite_Enemy.prototype.updateScaleEx = function () {
    if (TMPlugin.BattlerEx.BreathStop && !this._enemy.canMove()) return;
    this._breathCount++;
    if (this._breathCount >= this._breathMax) {
      this._breathMax = Math.randomInt(90) + 90;
      this._breathCount = 0;
    }
    var scaleX = this._baseScale.x;
    var scaleY = this._baseScale.y;
    var bh = +(this._enemy.enemy().meta.breathH || TMPlugin.BattlerEx.BreathH);
    scaleY += Math.sin(Math.PI * this._breathCount / (this._breathMax / 2)) * bh;
    this.scale.set(scaleX, scaleY);
  };

  var _Sprite_Enemy_updateBlink = Sprite_Enemy.prototype.updateBlink;
  Sprite_Enemy.prototype.updateBlink = function () {
    if (TMPlugin.BattlerEx.ShakeEffect) {
      var ed = this._effectDuration;
      this.rotation = ed % 4 < 2 ? ed / 200 : 0 - ed / 200;
    } else {
      _Sprite_Enemy_updateBlink.call(this);
    }
  };

})();
