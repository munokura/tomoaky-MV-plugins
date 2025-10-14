//=============================================================================
// TMPlugin - スキルカテゴリからの解放
// バージョン: 1.0.1
// 最終更新日: 2017/10/05
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@target MZ MV
@plugindesc Exclude category selection processing from skill scenes.
@author tomoaky
@url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/TMOmitSkillCategory.js
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/tomoaky-MV-plugins ).
Original plugin by tomoaky.
-----
TMPlugin - Unlocked from Skill Categories ver. 1.0.1

How to Use:

No plugin commands.

Terms of Use:
MIT License.
https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
You may modify and redistribute this without permission from the author, and there are no restrictions on its use (commercial, 18+, etc.).
*/


/*:ja
@target MZ MV
@plugindesc スキルシーンからカテゴリ選択の処理を除外します。
@author tomoaky
@url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/TMOmitSkillCategory.js
@license MIT License

@help
TMPlugin - スキルカテゴリからの解放 ver1.0.1

使い方:

  プラグインコマンドはありません。


利用規約:
  MITライセンスです。
  https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。
*/

var Imported = Imported || {};
Imported.TMOmitSkillCategory = true;

(function() {
    'use strict';

    //-----------------------------------------------------------------------------
    // Scene_Skill
    //

    var _Scene_Skill_start = Scene_Skill.prototype.start;
    Scene_Skill.prototype.start = function() {
        _Scene_Skill_start.call(this);
        this._skillTypeWindow.deactivate();
        this._skillTypeWindow.hide();
        this._itemWindow.setStypeId(this._skillTypeWindow.currentExt());
        this._itemWindow.setHandler('cancel', this.popScene.bind(this));
        this._itemWindow.setHandler('pagedown', this.nextActor.bind(this));
        this._itemWindow.setHandler('pageup', this.previousActor.bind(this));
        this._itemWindow.activate();
        this._itemWindow.selectLast();
    };

    var _Scene_Skill_onActorChange = Scene_Skill.prototype.onActorChange;
    Scene_Skill.prototype.onActorChange = function() {
        _Scene_Skill_onActorChange.call(this);
        this._skillTypeWindow.deactivate();
        this._itemWindow.activate();
    };

})();