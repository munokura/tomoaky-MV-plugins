//=============================================================================
// TMPlugin - ランダムネーム
// バージョン: 1.1.0
// 最終更新日: 2017/01/20
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 名前や二つ名をランダムなものに変更する機能を追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param randomKeyName
 * @desc 名前入力の処理コマンドにおけるランダムキーの表示名。
 * 初期値: AT
 * @default AT
 *
 * @help
 * TMPlugin - ランダムネーム ver1.1.0
 *
 * 使い方:
 * 
 *   イベントコマンド『名前入力の処理』にランダムに文字を選択する「AT」が
 *   追加されます。元々あった「～」は英数ページにもあるので、そちらから
 *   入力することができます。
 * 
 *   プラグインコマンドでアクターの名前や二つ名をランダムに変更することも
 *   できます。
 * 
 *   文字の候補を設定するプラグインパラメータはありませんので、プラグインを
 *   直接編集してください。
 * 
 *   アイテムのメモ欄に <nameRandom:5> などのタグをつけることで、
 *   名前変更アイテムを作成することもできます。
 *
 *   このプラグインは RPGツクールMV Version 1.3.4 で動作確認をしています。
 * 
 * 
 * プラグインコマンド:
 * 
 *   setNameRandom 1 5
 *     アクター 1 番の名前を最低 2 文字、最大 5 文字のランダムな名前に
 *     変更します。
 *     文字はカタカナの中からランダムに選ばれます。
 * 
 *   setNameRandom 1 5 1
 *     changeNameRandom に値をひとつ加えると、文字がカタカナではなく
 *     ひらがなになります。
 * 
 *   setNicknameRandom 1
 *     アクター 1 番の二つ名をランダムなものに変更します。
 * 
 *   setProfileRandom 1
 *     アクター 1 番のプロフィールをランダムなものに変更します。
 * 
 * 
 * メモ欄タグ（アイテム）:
 * 
 *   <nameRandom:5>
 *     使用したアクターの名前を最低 2 文字、最大 5 文字のランダムな名前に
 *     変更します。
 * 
 *   <nameRandom:5 1>
 *     ひとつ値を加えると、カタカナではなくひらがなになります。
 * 
 *   <nicknameRandom>
 *     使用したアクターの二つ名をランダムに変更します。
 * 
 *   <profileRandom>
 *     使用したアクターのプロフィールをランダムに変更します。
 * 
 * 
 * スクリプトコマンド:
 * 
 *   this.randomKatakana(1, 5)
 *     最低 1 文字、最大 5 文字のカタカナ文字列を返します。
 * 
 *   this.randomHiragana(1, 5)
 *     最低 1 文字、最大 5 文字のカタカナ文字列を返します。
 * 
 *   this.randomNickname()
 *     二つの文字列を組み合わせたものを返します、文字列の候補を
 *     追加したい場合はプラグインを直接編集してください。
 * 
 *   this.randomProfile()
 *     四つの文字列を組み合わせたものを返します、文字列の候補を
 *     追加したり、組み合わせパターンを変更したい場合はプラグインを
 *     直接編集してください。
 */

var Imported = Imported || {};
Imported.TMRandomName = true;

var TMPlugin = TMPlugin || {};
TMPlugin.RandomName = {};
TMPlugin.RandomName.Katakana = [
  'ア','イ','ウ','エ','オ', 'カ','キ','ク','ケ','コ',
  'サ','シ','ス','セ','ソ', 'タ','チ','ツ','テ','ト',
  'ナ','ニ','ヌ','ネ','ノ', 'ハ','ヒ','フ','ヘ','ホ',
  'マ','ミ','ム','メ','モ', 'ヤ','ユ','ヨ',
  'ラ','リ','ル','レ','ロ', 'ワ'
];
TMPlugin.RandomName.KatakanaSp = [
  'ガ','ギ','グ','ゲ','ゴ', 'ザ','ジ','ズ','ゼ','ゾ',
  'ダ','ヂ','ヅ','デ','ド', 'バ','ビ','ブ','ベ','ボ',
  'パ','ピ','プ','ペ','ポ',
  'キャ','キュ','キョ', 'シャ','シュ','ショ', 'チャ','チュ','チョ',
  'ニャ','ニュ','ニョ', 'ヒャ','ヒュ','ヒョ', 'ミャ','ミュ','ミョ',
  'ギャ','ギュ','ギョ', 'ジャ','ジュ','ジョ', 'ビャ','ビュ','ビョ',
  'ピャ','ピュ','ピョ', 'リャ','リュ','リョ', 'ヴァ','ヴィ','ヴェ',
];
TMPlugin.RandomName.KatakanaEx = [
  'ン'
];
TMPlugin.RandomName.KatakanaSpEx = [
  'ッ','ー'
];

// 二つ名（前半）
TMPlugin.RandomName.NicknameHeader = [
  '最弱の', '変態', '闇の', '永遠の'
];
// 二つ名（後半）
TMPlugin.RandomName.NicknameFooter = [
  '紳士', '狂戦士', '魔術師', '探求者'
];

// プロフィール 1
TMPlugin.RandomName.Profile1 = [
  '元魔王軍幹部、', '新聞配達が趣味の', '世界を救った英雄、', '凄腕の剣士、', '妹思いの優しい魔術師、'
];
// プロフィール 2
TMPlugin.RandomName.Profile2 = [
  '14歳', '17歳', '21歳', '24歳', '30歳'
];
// プロフィール 3
TMPlugin.RandomName.Profile3 = [
  'たい焼き', 'ドールコレクション', '愛刀', 'ペット'
];
// プロフィール 4
TMPlugin.RandomName.Profile4 = [
  '納豆', '負けること', 'ハロルド', 'モンスター'
];
// プロフィール（組み合わせパターン）
TMPlugin.RandomName.ProfileTemplate = '%1%2\n好きなもの:%3 / 嫌いなもの:%4';

TMPlugin.RandomName.Parameters = PluginManager.parameters('TMRandomName');
TMPlugin.RandomName.RandomKeyName = TMPlugin.RandomName.Parameters['randomKeyName'] || 'AT';

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
  // Game_Interpreter
  //

  Game_Interpreter.prototype.randomKatakana = function(minLength, maxLength) {
    var name = '';
    var katakanaSum = TMPlugin.RandomName.Katakana.concat(TMPlugin.RandomName.KatakanaEx);
    var katakanaSpSum = TMPlugin.RandomName.KatakanaSp.concat(TMPlugin.RandomName.KatakanaSpEx);
    var n = Math.max(Math.randomInt(maxLength) + 1, minLength);
    for (var i = 0; i < n; i++) {
      var r = Math.randomInt(5);
      if (i === 0 || (TMPlugin.RandomName.KatakanaEx.contains(name[i - 1]))) {
        name += r > 0 ? TMPlugin.RandomName.Katakana[Math.randomInt(TMPlugin.RandomName.Katakana.length)] :
                        TMPlugin.RandomName.KatakanaSp[Math.randomInt(TMPlugin.RandomName.KatakanaSp.length)];
      } else {
        name += r > 0 ? katakanaSum[Math.randomInt(katakanaSum.length)] :
                        katakanaSpSum[Math.randomInt(katakanaSpSum.length)];
      }
    }
    return name.slice(0, maxLength);
  };

  Game_Interpreter.prototype.randomHiragana = function(minLength, maxLength) {
    var result = this.randomKatakana(minLength, maxLength);
    return result.replace(/[\u30a1-\u30f6]/g, function(match) {
      var chr = match.charCodeAt(0) - 0x60;
  		return String.fromCharCode(chr);
  	});
  };

  Game_Interpreter.prototype.randomName = function(minLength, maxLength, hiragana) {
    if (hiragana) return this.randomHiragana(minLength, maxLength);
    return this.randomKatakana(minLength, maxLength);
  };

  Game_Interpreter.prototype.randomNickname = function() {
    return TMPlugin.RandomName.NicknameHeader[Math.randomInt(TMPlugin.RandomName.NicknameHeader.length)] +
           TMPlugin.RandomName.NicknameFooter[Math.randomInt(TMPlugin.RandomName.NicknameFooter.length)];
  };

  Game_Interpreter.prototype.randomProfile = function() {
    var text1 = TMPlugin.RandomName.Profile1[Math.randomInt(TMPlugin.RandomName.Profile1.length)];
    var text2 = TMPlugin.RandomName.Profile2[Math.randomInt(TMPlugin.RandomName.Profile2.length)];
    var text3 = TMPlugin.RandomName.Profile3[Math.randomInt(TMPlugin.RandomName.Profile3.length)];
    var text4 = TMPlugin.RandomName.Profile4[Math.randomInt(TMPlugin.RandomName.Profile4.length)];
    return TMPlugin.RandomName.ProfileTemplate.format(text1, text2, text3, text4);
  };

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'setNameRandom') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var actor = $gameActors.actor(+arr[0]);
      if (actor) actor.setName(this.randomName(2, +arr[1], arr[2]));
    } else if (command === 'setNicknameRandom') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var actor = $gameActors.actor(+arr[0]);
      if (actor) actor.setNickname(this.randomNickname());
    } else if (command === 'setProfileRandom') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var actor = $gameActors.actor(+arr[0]);
      if (actor) actor.setProfile(this.randomProfile());
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_NameEdit
  //

  Window_NameEdit.prototype.random = function(hiragana) {
    this._name = hiragana ? $gameMap._interpreter.randomHiragana(2, this._maxLength) :
                            $gameMap._interpreter.randomKatakana(2, this._maxLength);
    this._index = this._name.length;
    this.refresh();
  };

  //-----------------------------------------------------------------------------
  // Window_NameInput
  //

  Window_NameInput.JAPAN1.splice(76, 1);
  Window_NameInput.JAPAN1.splice(79, 0, TMPlugin.RandomName.RandomKeyName);
  Window_NameInput.JAPAN2.splice(76, 1);
  Window_NameInput.JAPAN2.splice(79, 0, TMPlugin.RandomName.RandomKeyName);

  Window_NameInput.prototype.isRandom = function() {
    return $gameSystem.isJapanese() && this._page < 2 && this._index === 79;
  };

  var _Window_NameInput_processOk = Window_NameInput.prototype.processOk;
  Window_NameInput.prototype.processOk = function() {
    if (this.isRandom()) {
      this._editWindow.random(this._page === 0);
      SoundManager.playOk();
    } else {
      _Window_NameInput_processOk.call(this);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Item
  //

  var _Scene_Item_useItem = Scene_Item.prototype.useItem;
  Scene_Item.prototype.useItem = function() {
    this.checkRandomName();
    _Scene_Item_useItem.call(this);
  };

  Scene_Item.prototype.checkRandomName = function() {
    var item = this.item();
    var nameRandom = item.meta.nameRandom;
    if (nameRandom) {
      var nameRandomParams = nameRandom.split(' ');
      this.itemTargetActors().forEach(function(target) {
        if (nameRandomParams[1]) {
          target.setName($gameMap._interpreter.randomHiragana(2, +nameRandomParams[0]));
        } else {
          target.setName($gameMap._interpreter.randomKatakana(2, +nameRandomParams[0]));
        }
      }, this);
    }
    if (item.meta.nicknameRandom) {
      this.itemTargetActors().forEach(function(target) {
        target.setNickname($gameMap._interpreter.randomNickname());
      }, this);
    }
    if (item.meta.profileRandom) {
      this.itemTargetActors().forEach(function(target) {
        target.setProfile($gameMap._interpreter.randomProfile());
      }, this);
    }
  };

  var _Scene_Item_isItemEffectsValid = Scene_Item.prototype.isItemEffectsValid;
  Scene_Item.prototype.isItemEffectsValid = function() {
    _Scene_Item_isItemEffectsValid.call(this);
    var item = this.item();
    return _Scene_Item_isItemEffectsValid.call(this) || item.meta.nameRandom ||
           item.meta.nicknameRandom || item.meta.profileRandom;
  };

})();
