//=============================================================================
// TMPlugin - メッセージ制御文字拡張
// バージョン: 1.4.1
// 最終更新日: 2018/05/01
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 文章の表示に使える制御文字を追加します。
 * 
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @help
 * TMPlugin - メッセージ制御文字拡張 ver1.4.1
 * 
 * 使い方:
 * 
 *   イベントコマンド『文章の表示』と『選択肢の表示』、
 *   データベースの『説明』などで下記の制御文字が使えるようになります。
 *
 *   \J[n]      # n 番の職業名に置き換えます。
 *   \AJ[n]     # n 番のアクターの現在の職業名に置き換えます。
 *   \PJ[n]     # n 番目のパーティメンバーの現在の職業名に置き換えます。
 *   \ANN[n]    # n 番のアクターの現在の二つ名に置き換えます。
 *   \PNN[n]    # n 番目のパーティメンバーの現在の二つ名に置き換えます。
 *   \IN[n]     # n 番のアイテム名（アイコン付き）に置き換えます。
 *   \WN[n]     # n 番の武器名（アイコン付き）に置き換えます。
 *   \AN[n]     # n 番の防具名（アイコン付き）に置き換えます。
 *   \SN[n]     # n 番のスキル名（アイコン付き）に置き換えます。
 *   \ML[n]     # n 番のアクターのレベル上限に置き換えます。
 *   \INUM[n]   # n 番のアイテムの所持数に置き換えます。( 0 番 = 所持金 )
 *   \WNUM[n]   # n 番の武器の所持数に置き換えます。
 *   \ANUM[n]   # n 番の防具の所持数に置き換えます。
 *   \MAP[n]    # n 番のマップ名（表示名ではない）に置き換えます。
 * 
 *   以下はイベントコマンド『文章の表示』でのみ有効な機能です。
 *   \AF[n]     # n 番のアクターの現在の顔グラフィックを表示します。
 * 
 *   このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。
 *
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 * 
 * 
 * おまけ機能:
 * 
 *   動的な説明が設定されたアイテム（スキル）の説明文が戦闘中に
 *   更新されない場合があるという不都合を修正します。
 */

var Imported = Imported || {};
Imported.TMTextEscape = true;

(function() {

  var _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
  Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = _Window_Base_convertEscapeCharacters.call(this, text);
    text = text.replace(/\x1b([A-Z]+)\[(\d+)\]/gi, function() {
      switch (arguments[1].toUpperCase()) {
      case 'J':
        return this._className(+arguments[2]);
      case 'AJ':
        return this.actorClassName(+arguments[2]);
      case 'PJ':
        return this.partyMemberClassName(+arguments[2]);
      case 'ANN':
        return this.actorNickname(+arguments[2]);
      case 'PNN':
        return this.partyMemberNickname(+arguments[2]);
      case 'IN':
        return this.itemName(+arguments[2]);
      case 'WN':
        return this.weaponName(+arguments[2]);
      case 'AN':
        return this.armorName(+arguments[2]);
      case 'SN':
        return this.skillName(+arguments[2]);
      case 'ML':
        return this.maxLevel(+arguments[2]);
      case 'INUM':
        return this.itemNumber(+arguments[2]);
      case 'WNUM':
        return this.weaponNumber(+arguments[2]);
      case 'ANUM':
        return this.armorNumber(+arguments[2]);
      case 'MAP':
        return this.mapName(+arguments[2]);
      case 'AF':
        return this.actorFace(+arguments[2]);
      default:
        return '\x1b' + arguments[1] + '[' + arguments[2] + ']';
      }
    }.bind(this));
    return text;
  };

  Window_Base.prototype._className = function(n) {
    var _class = n >= 1 ? $dataClasses[n] : null;
    return _class ? _class.name : '';
  };

  Window_Base.prototype.actorClassName = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.currentClass().name : '';
  };

  Window_Base.prototype.partyMemberClassName = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.currentClass().name : '';
  };

  Window_Base.prototype.actorNickname = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.nickname() : '';
  };

  Window_Base.prototype.partyMemberNickname = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.nickname() : '';
  };

  Window_Base.prototype.itemName = function(n) {
    var item = n >= 1 ? $dataItems[n] : null;
    return item ? '\x1bI[' + item.iconIndex + ']' + item.name : '';
  };

  Window_Base.prototype.weaponName = function(n) {
    var item = n >= 1 ? $dataWeapons[n] : null;
    return item ? '\x1bI[' + item.iconIndex + ']' + item.name : '';
  };

  Window_Base.prototype.armorName = function(n) {
    var item = n >= 1 ? $dataArmors[n] : null;
    return item ? '\x1bI[' + item.iconIndex + ']' + item.name : '';
  };

  Window_Base.prototype.skillName = function(n) {
    var item = n >= 1 ? $dataSkills[n] : null;
    return item ? '\x1bI[' + item.iconIndex + ']' + item.name : '';
  };

  Window_Base.prototype.maxLevel = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.maxLevel() : '';
  };

  Window_Base.prototype.itemNumber = function(n) {
    if (n === 0) return $gameParty.gold();
    var item = n >= 1 ? $dataItems[n] : null;
    return item ? $gameParty.numItems(item) : '';
  };

  Window_Base.prototype.weaponNumber = function(n) {
    var item = n >= 1 ? $dataWeapons[n] : null;
    return item ? $gameParty.numItems(item) : '';
  };

  Window_Base.prototype.armorNumber = function(n) {
    var item = n >= 1 ? $dataArmors[n] : null;
    return item ? $gameParty.numItems(item) : '';
  };

  Window_Base.prototype.mapName = function(n) {
    var mapInfo = n === 0 ? $dataMapInfos[$gameMap.mapId()] : $dataMapInfos[n];
    return mapInfo ? mapInfo.name : '';
  };

  Window_Base.prototype.actorFace = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    if (actor) {
      $gameMessage.setFaceImage(actor.faceName(), actor.faceIndex());
    }
    return '';
  };

  //-----------------------------------------------------------------------------
  // Scene_Battle
  //

  var _Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
  Scene_Battle.prototype.commandSkill = function() {
    _Scene_Battle_commandSkill.call(this);
    this._helpWindow.refresh();
  };

})();
