//=============================================================================
// TMPlugin - 衣装アイテム
// バージョン: 1.0.1
// 最終更新日: 2017/01/11
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc アイテムによるグラフィック変更機能を追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @help
 * TMPlugin - 衣装アイテム ver1.0.1
 * 
 * 使い方:
 * 
 *   アイテムのメモ欄に characterCostume / faceCostume / battlerCostume
 *   タグでグラフィックを設定します。
 *   このアイテムを使用すればアクターのグラフィックを変更することができます。
 * 
 *   すでにその衣装に着替えている場合は、アクターの初期衣装に戻ります。
 * 
 *   このプラグインは RPGツクールMV Version 1.3.4 で動作確認をしています。
 *
 * 
 * メモ欄タグ（アイテム）:
 * 
 *   <characterCostume:People1 0>   # 歩行グラフィックの衣装効果を設定
 *   <faceCostume:People1 0>        # 顔グラフィックの衣装効果を設定
 *   <battlerCostume:Actor3_6>      # サイドビューバトラーの衣装効果を設定
 * 
 * 
 * プラグインコマンド:
 * 
 *   useCostume 51 1
 *     アイテム番号 51 番の衣装を 1 番のアクターに適用します。
 *     アクター番号を省略した場合はパーティの先頭にいるアクターが
 *     対象になります。
 * 
 *     数値の代わりに /V[n] などの制御文字も使えます。
 *     useCostume /V[1] 1
 *     このコマンドを実行した場合、ゲーム変数 1 番の値を衣装の
 *     アイテム番号として、その衣装を 1 番のアクターに適用します。
 * 
 *   resetCostume 1
 *     1 番のアクターのすべてのグラフィックを初期状態に戻します。
 * 
 *   saveCostume 1
 *     1 番のアクターの現在のグラフィックを初期状態として記憶します。
 * 
 *   isCostume 1 51 3
 *     1 番のアクターが 51 番の衣装アイテムを使用した状態ならば
 *     ゲームスイッチ 3 番をオンに、そうでなければオフにします。
 * 
 * 
 * スクリプトコマンド:
 * 
 *   this.isCostume(1, 51)
 *     1 番のアクターが 51 番の衣装アイテムを使用した状態ならば
 *     true、そうでなければ false を返します。
 *     イベントコマンド『条件分岐』『スクリプト』などで使用できます。
 */

var Imported = Imported || {};
Imported.TMCostume = true;

if (!TMPlugin.InterpreterBase) {
  TMPlugin.InterpreterBase = true;
  (function() {

    Game_Interpreter.prototype.convertEscapeCharactersTM = function(text) {
      text = text.replace(/\\/g, '\x1b');
      text = text.replace(/\x1b\x1b/g, '\\');
      text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
        return this.actorNameTM(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
        return this.partyMemberNameTM(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
      return text;
    };
  
    Game_Interpreter.prototype.actorNameTM = function(n) {
      var actor = n >= 1 ? $gameActors.actor(n) : null;
      return actor ? actor.name() : '';
    };

    Game_Interpreter.prototype.partyMemberNameTM = function(n) {
      var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
      return actor ? actor.name() : '';
    };

  })();
} // TMPlugin.InterpreterBase

(function() {

  //-----------------------------------------------------------------------------
  // Game_Actor
  //

  var _Game_Actor_initImages = Game_Actor.prototype.initImages;
  Game_Actor.prototype.initImages = function() {
    _Game_Actor_initImages.call(this);
    this.setOriginImages();
  };

  Game_Actor.prototype.setOriginImages = function() {
    this._characterNameOrigin = this._characterName;
    this._characterIndexOrigin = this._characterIndex;
    this._faceNameOrigin = this._faceName;
    this._faceIndexOrigin = this._faceIndex;
    this._battlerNameOrigin = this._battlerName;
  };

  Game_Actor.prototype.characterNameOrigin = function() {
    if (this._characterNameOrigin == null) this._characterNameOrigin = this.actor().characterName;
    return this._characterNameOrigin;
  };

  Game_Actor.prototype.characterIndexOrigin = function() {
    if (this._characterIndexOrigin == null) this._characterIndexOrigin = this.actor().characterIndex;
    return this._characterIndexOrigin;
  };

  Game_Actor.prototype.faceNameOrigin = function() {
    if (this._faceNameOrigin == null) this._faceNameOrigin = this.actor().faceName;
    return this._faceNameOrigin;
  };

  Game_Actor.prototype.faceIndexOrigin = function() {
    if (this._faceIndexOrigin == null) this._faceIndexOrigin = this.actor().faceIndex;
    return this._faceIndexOrigin;
  };

  Game_Actor.prototype.battlerNameOrigin = function() {
    if (this._battlerNameOrigin == null) this._battlerNameOrigin = this.actor().battlerName;
    return this._battlerNameOrigin;
  };

  Game_Actor.prototype.useCostume = function(item) {
    var characterCostume = item.meta.characterCostume;
    var faceCostume = item.meta.faceCostume;
    var battlerCostume = item.meta.battlerCostume;
    if (characterCostume) {
      var a = characterCostume.split(' ');
      this.changeCharacterCostume(a[0], +a[1]);
    }
    if (faceCostume) {
      var a = faceCostume.split(' ');
      this.changeFaceCostume(a[0], +a[1]);
    }
    if (battlerCostume) {
      this.changeBattlerCostume(battlerCostume);
    }
  };
  
  Game_Actor.prototype.changeCharacterCostume = function(characterName, characterIndex) {
    if (this._characterName === characterName && this._characterIndex === characterIndex) {
      this.loadOriginCharacterImage();
    } else {
      this.setCharacterImage(characterName, characterIndex);
    }
  };
  
  Game_Actor.prototype.loadOriginCharacterImage = function() {
    this.setCharacterImage(this.characterNameOrigin(), this.characterIndexOrigin());
  };
  
  Game_Actor.prototype.changeFaceCostume = function(faceName, faceIndex) {
    if (this._faceName === faceName && this._faceIndex === faceIndex) {
      this.loadOriginFaceImage();
    } else {
      this.setFaceImage(faceName, faceIndex);
    }
  };
  
  Game_Actor.prototype.loadOriginFaceImage = function() {
    this.setFaceImage(this.faceNameOrigin(), this.faceIndexOrigin());
  };

  Game_Actor.prototype.changeBattlerCostume = function(battlerName) {
    if (this._battlerName === battlerName) {
      this.loadOriginBattlerImage();
    } else {
      this.setBattlerImage(battlerName);
    }
  };
  
  Game_Actor.prototype.loadOriginBattlerImage = function() {
    this.setBattlerImage(this.battlerNameOrigin());
  };

  Game_Actor.prototype.resetCostume = function() {
    this.loadOriginCharacterImage();
    this.loadOriginFaceImage();
    this.loadOriginBattlerImage();
  };

  Game_Actor.prototype.isCostume = function(itemId) {
    var item = $dataItems[itemId];
    if (!item) return fakse;
    var characterCostume = item.meta.characterCostume;
    var faceCostume = item.meta.faceCostume;
    var battlerCostume = item.meta.battlerCostume;
    if (characterCostume) {
      var a = characterCostume.split(' ');
      if (this._characterName !== a[0] || this._characterIndex !== +a[1]) return false;
    }
    if (faceCostume) {
      var a = faceCostume.split(' ');
      if (this._faceName !== a[0] || this._faceIndex !== +a[1]) return false;
    }
    if (battlerCostume && this._battlerName !== battlerCostume) return false;
    return true;
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'useCostume') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var item = $dataItems[+arr[0]];
      if (item) {
        var actor = arr[1] ? $gameActors.actor(+arr[1]) : $gameParty.leader();
        if (actor) actor.useCostume(item);
        $gamePlayer.refresh();
      }
    } else if (command === 'resetCostume') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var actor = arr[0] ? $gameActors.actor(+arr[0]) : $gameParty.leader();
      if (actor) {
        actor.resetCostume();
        $gamePlayer.refresh();
      }
    } else if (command === 'saveCostume') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var actor = arr[0] ? $gameActors.actor(+arr[0]) : $gameParty.leader();
      if (actor) actor.setOriginImages();
    } else if (command === 'isCostume') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      $gameSwitches.setValue(+arr[2], this.isCostume(+arr[0], +arr[1]));
    }
  };

  Game_Interpreter.prototype.isCostume = function(actorId, itemId) {
    var actor = actorId ? $gameActors.actor(actorId) : $gameParty.leader();
    return actor ? actor.isCostume(itemId) : false;
  };

  //-----------------------------------------------------------------------------
  // Scene_Item
  //

  var _Scene_Item_useItem = Scene_Item.prototype.useItem;
  Scene_Item.prototype.useItem = function() {
    this.checkCostume();
    _Scene_Item_useItem.call(this);
  };

  Scene_Item.prototype.checkCostume = function() {
    var item = this.item();
    var characterCostume = item.meta.characterCostume;
    var faceCostume = item.meta.faceCostume;
    var battlerCostume = item.meta.battlerCostume;
    if (characterCostume || faceCostume || battlerCostume) {
      this.itemTargetActors().forEach(function(target) {
        target.useCostume(item);
      }, this);
      this._costumeChanged = true;
      $gamePlayer.refresh();
    }
  };

  var _Scene_Item_isItemEffectsValid = Scene_Item.prototype.isItemEffectsValid;
  Scene_Item.prototype.isItemEffectsValid = function() {
    _Scene_Item_isItemEffectsValid.call(this);
    var item = this.item();
    var characterCostume = item.meta.characterCostume;
    var faceCostume = item.meta.faceCostume;
    var battlerCostume = item.meta.battlerCostume;
    return _Scene_Item_isItemEffectsValid.call(this) || characterCostume || faceCostume || battlerCostume;
  };

  var _Scene_Item_update = Scene_Item.prototype.update;
  Scene_Item.prototype.update = function() {
    _Scene_Item_update.call(this);
    if (this._costumeChanged && ImageManager.isReady()) {
      this._actorWindow.refresh();
      this._costumeChanged = false;
    }
  };

})();