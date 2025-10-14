//=============================================================================
// TMPlugin - XPキャラクター
// バージョン: 1.0.0
// 最終更新日: 2018/04/21
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2018 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc Compatible with RPG Maker XP standard character materials.
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/tomoaky-MV-plugins ).
Original plugin by tomoaky.
-----
TMPlugin - XP Character ver. 1.0.0

How to Use:

Walking graphics with the string _xp at the end of the filename are automatically recognized as XP-standard characters.

If the image contains only one character, a $ is required at the beginning of the filename.

There is no plugin command.

This plugin has been tested with RPG Maker MV Version 1.5.1.

This plugin is distributed under the MIT License and is free to use, modify, redistribute, and otherwise use commercially.
*/


/*:ja
@plugindesc RPGツクールXP規格のキャラクター素材に対応します。
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - XPキャラクター ver1.0.0

使い方:

  ファイル名の末尾に _xp という文字列がついている歩行グラフィックを
  自動的にXP規格のキャラクターとして認識します。
  1キャラクターのみの画像であればファイル名の先頭に $ が必要になります。

  プラグインコマンドはありません。

  このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。

  このプラグインはMITライセンスのもとに配布しています、商用利用、
  改造、再配布など、自由にお使いいただけます。
*/

var Imported = Imported || {};
Imported.TMXpCharacter = true;

(function() {

  //-----------------------------------------------------------------------------
  // ImageManager
  //

  ImageManager.isXpCharacter = function(filename) {
    return filename.match(/_xp$/);
  };

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //

  var _Game_CharacterBase_pattern = Game_CharacterBase.prototype.pattern;
  Game_CharacterBase.prototype.pattern = function() {
    if (this._isXpCharacter) return this._pattern;
    return _Game_CharacterBase_pattern.call(this);
  };

  var _Game_CharacterBase_setImage = Game_CharacterBase.prototype.setImage;
  Game_CharacterBase.prototype.setImage = function(characterName, characterIndex) {
    _Game_CharacterBase_setImage.call(this, characterName, characterIndex);
    this._isXpCharacter = ImageManager.isXpCharacter(characterName);
  };

  //-----------------------------------------------------------------------------
  // Sprite_Character
  //

  var _Sprite_Character_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
  Sprite_Character.prototype.setCharacterBitmap = function() {
    _Sprite_Character_setCharacterBitmap.call(this);
    this._isXpCharacter = ImageManager.isXpCharacter(this._characterName);
  };

  var _Sprite_Character_patternWidth = Sprite_Character.prototype.patternWidth;
  Sprite_Character.prototype.patternWidth = function() {
    if (this._isXpCharacter) {
      return this.bitmap.width / (this._isBigCharacter ? 4 : 16);
    }
    return _Sprite_Character_patternWidth.call(this);
  };

})();