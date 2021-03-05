//=============================================================================
// TMPlugin - 付け替え二つ名
// バージョン: 1.0.1
// 最終更新日: 2018/06/03
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 二つ名に実績機能と付け替えによるパラメータ変化を追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param secondNameCommand
 * @desc メニューコマンド名
 * 初期値: 二つ名
 * @default 二つ名
 *
 * @param defaultSecondNameId
 * @type number
 * @desc アクターの初期二つ名ID
 * 初期値: 1
 * @default 1
 *
 * @param vnSecondNameExp
 * @type number
 * @desc 獲得済み二つ名の合計価値を代入するゲーム変数番号
 * 初期値: 0（ 0 で無効 / 1 以上で有効 )
 * @default 0
 *
 * @param dateFontSize
 * @type number
 * @desc 日付表示のフォントサイズ
 * 初期値: 20
 * @default 20
 *
 * @param equipText
 * @desc 装備中テキスト
 * 初期値: 【装備中】
 * @default 【装備中】
 *
 * @param infoWindowWidth
 * @type number
 * @desc 情報ウィンドウの幅
 * 初期値: 240
 * @default 240
 *
 * @param infoWindowNumberText
 * @desc 二つ名獲得数のテキスト
 * 初期値: 集めた数
 * @default 集めた数
 *
 * @param infoWindowExpText
 * @desc 合計価値のテキスト（空欄なら合計価値を表示しない）
 * 初期値: スコア
 * @default スコア
 * 
 * @param hidePartyMember
 * @type boolean
 * @desc パーティメンバーの二つ名装備状況を無視する
 * ( 一人旅ゲームにおいて先頭アクター以外を隠したい時のため )
 * @default false
 *
 * @help
 * TMPlugin - 付け替え二つ名 ver1.0.1
 * 
 * 使い方:
 * 
 *   二つ名（実績）はデータベースの『防具』に設定します。
 *
 *   設定した二つ名はプラグインコマンド gainSecondName を使って獲得できます。
 *   獲得後はメニューの『二つ名』コマンドから確認することができ、アクターに
 *   装備させることが可能になります。
 *
 *   アクターが装備できない防具は二つ名としてセットすることができません。また、
 *   別のアクターがすでにセットしている二つ名もセットできません。
 * 
 *   このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。
 *
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 *
 *
 * 使用例:
 *
 *   １番の防具に名前（二つ名のテキスト）と、説明（二つ名の効果や獲得条件）、
 *   特徴（とりあえずわかりやすく最大ＨＰ * 110%）を設定します。
 *   この状態でゲームを開始すると、アクターの二つ名として１番の防具がセット
 *   され、最大ＨＰが１０％上昇しているはずです。メニューの『二つ名』から
 *   二つ名を獲得した日時も確認することができます。
 *
 *   同様に２番の防具に別の二つ名を設定し、下記のプラグインコマンドを実行
 *   してください。
 *     gainSecondName 2
 *   メニューの『二つ名』に新しい二つ名が追加され、アクターの二つ名を自由に
 *   付け替えることができるようになっているはずです。
 *   付け替えできない場合は防具の装備条件を満たしているかどうかを確認して
 *   ください。
 *
 *
 * メモ欄タグ（アクター）:
 *
 *   <secondName:1>
 *     １番の防具をこのアクターの初期二つ名として設定します。アクターが加入
 *     した時点でこの二つ名を獲得していない場合、一度別の二つ名をセットすると
 *     元の二つ名に戻せなくなります。アクターの加入と同時に獲得処理を実行して
 *     ください。
 *     このタグがないアクターには、プラグインパラメータ defaultSecondNameId
 *     に設定された番号の防具が二つ名としてセットされます。
 *
 *
 * メモ欄タグ（防具）:
 *
 *   <secondNameExp:1>
 *     二つ名の価値を設定します。プラグインパラメータ vnSecondNameExp に
 *     1 以上の値が設定されていれば、その番号のゲーム変数に獲得済み二つ名の
 *     合計価値が自動的に代入されます。
 *
 *
 * プラグインコマンド:
 *
 *   gainSecondName 1
 *     １番の防具を二つ名として獲得します。視覚効果などはありませんので、
 *     ピクチャやアニメーションを使って作成してください。
 *
 *   hasSecondName 1 5
 *     １番の防具を二つ名として獲得しているかどうかを取得します。獲得済みの
 *     場合はゲームスイッチ５番がオンに、まだの場合はオフになります。
 *
 *
 * プラグインパラメータ補足:
 *
 *   defaultSecondNameId
 *     ここに設定された防具（二つ名）はアクターの初期二つ名として利用される
 *     と同時に、ゲーム開始時に自動的に獲得します。
 */

var Imported = Imported || {};
Imported.TMSecondName = true;

(function() {

  var parameters = PluginManager.parameters('TMSecondName');
  var secondNameCommand    =  parameters['secondNameCommand'];
  var defaultSecondNameId  = +parameters['defaultSecondNameId'];
  var vnSecondNameExp      = +parameters['vnSecondNameExp'];
  var dateFontSize         = +parameters['dateFontSize'];
  var equipText            =  parameters['equipText'];
  var infoWindowWidth      = +parameters['infoWindowWidth'];
  var infoWindowNumberText =  parameters['infoWindowNumberText'];
  var infoWindowExpText    =  parameters['infoWindowExpText'];
  var hidePartyMember = JSON.parse(parameters['hidePartyMember'] || 'false');
  
  //-----------------------------------------------------------------------------
  // Game_Party
  //

  var _Game_Party_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function() {
    _Game_Party_initialize.call(this);
    this._secondNames = [];
  };
  
  var _Game_Party_setupStartingMembers = Game_Party.prototype.setupStartingMembers;
  Game_Party.prototype.setupStartingMembers = function() {
    _Game_Party_setupStartingMembers.call(this);
    this.gainSecondName(defaultSecondNameId);
  };

  Game_Party.prototype.secondNames = function() {
    return this._secondNames;
  };
  
  Game_Party.prototype.gainSecondName = function(id) {
    if (this.hasSecondName(id)) {
      return false;
    }
    var obj = {};
    var date = new Date();
    obj.id = id;
    obj.date = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join( '/' ) +
               ' ' + date.toLocaleTimeString();
    this._secondNames.push(obj);
    if (vnSecondNameExp) {
      $gameVariables.setValue(vnSecondNameExp, this.secondNameExp());
    }
    return true;
  };
  
  Game_Party.prototype.secondNameExp = function() {
    var result = 0;
    for (var i = 0, len = this._secondNames.length; i < len; i++) {
      var item = $dataArmors[this._secondNames[i].id];
      if (item.meta.secondNameExp) {
        result += +item.meta.secondNameExp;
      }
    }
    return result;
  };
  
  Game_Party.prototype.hasSecondName = function(id) {
    return this._secondNames.some(function(secondName) {
      return secondName.id === id;
    }, this);
  };
  
  Game_Party.prototype.isSecondNameUsing = function(id) {
    if (hidePartyMember) {
      var actor = $gameParty.leader();
      if (actor) return actor.secondName() === id;
      return false;
    };
    var members = this.allMembers();
    return members.some(function(actor) {
      return actor.secondName() === id;
    }, this);
  };

  //-----------------------------------------------------------------------------
  // Game_Actor
  //

  var _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
  Game_Actor.prototype.initMembers = function() {
    _Game_Actor_initMembers.call(this);
    this._secondName = 0;
  };

  var _Game_Actor_setup = Game_Actor.prototype.setup;
  Game_Actor.prototype.setup = function(actorId) {
    _Game_Actor_setup.call(this, actorId);
    var secondNameId = this.actor().meta.secondName || defaultSecondNameId;
    this.setSecondName($dataArmors[secondNameId]);
  };

  var _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
  Game_Actor.prototype.paramPlus = function(paramId) {
    var value = _Game_Actor_paramPlus.call(this, paramId);
    var secondNameArmor = this.secondNameArmor();
    if (secondNameArmor) {
      value += secondNameArmor.params[paramId];
    }
    return value;
  };

  var _Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
  Game_Actor.prototype.traitObjects = function() {
    var objects = _Game_Actor_traitObjects.call(this);
    var secondNameArmor = this.secondNameArmor();
    if (secondNameArmor) {
      objects.push(secondNameArmor);
    }
    return objects;
  };
  
  Game_Actor.prototype.setSecondName = function(item) {
    this._secondName = item.id;
    this.setNickname(item.name);
    this.refresh();
  };
  
  Game_Actor.prototype.secondName = function() {
    return this._secondName;
  };
  
  Game_Actor.prototype.secondNameArmor = function() {
    return $dataArmors[this._secondName];
  };
  
  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'gainSecondName') {
      $gameParty.gainSecondName(+args[0]);
    } else if (command === 'hasSecondName') {
      $gameSwitches.setValue(+args[1], $gameParty.hasSecondName(+args[0]));
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_Base
  //

  Window_Base.prototype.drawActorSecondName = function(actor, x, y, width) {
    width = width || 270;
    this.resetTextColor();
    var text = actor.nickname() + actor.currentClass().name;
    this.drawText(text, x, y, width);
  };

  //-----------------------------------------------------------------------------
  // Window_MenuCommand
  //

  var _Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
  Window_MenuCommand.prototype.addMainCommands = function() {
    _Window_MenuCommand_addMainCommands.call(this);
    if (secondNameCommand) {
      var enabled = this.areMainCommandsEnabled();
      this.addCommand(secondNameCommand, 'secondName', enabled);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_SecondNameInfo
  //

  function Window_SecondNameInfo() {
    this.initialize.apply(this, arguments);
  }

  Window_SecondNameInfo.prototype = Object.create(Window_Base.prototype);
  Window_SecondNameInfo.prototype.constructor = Window_SecondNameInfo;

  Window_SecondNameInfo.prototype.initialize = function(x, y) {
    Window_Base.prototype.initialize.call(this, x, y, this.windowWidth(),
                                          this.fittingHeight(4));
    this.refresh();
  };

  Window_SecondNameInfo.prototype.windowWidth = function() {
    return infoWindowWidth;
  };

  Window_SecondNameInfo.prototype.refresh = function() {
    if (this.contents) {
      this.contents.clear();
      var lineHeight = this.lineHeight();
      var x = this.textPadding();
      var width = this.contents.width - this.textPadding() * 2;
      this.changeTextColor(this.systemColor());
      this.drawText(infoWindowNumberText, x, 0, width);
      this.changeTextColor(this.normalColor());
      this.drawText('' + $gameParty.secondNames().length, x, 0, width, 'right');
      if (infoWindowExpText) {
        this.changeTextColor(this.systemColor());
        this.drawText(infoWindowExpText, x, lineHeight, width);
        this.changeTextColor(this.normalColor());
        this.drawText('' + $gameParty.secondNameExp(), x, lineHeight, width, 'right');
      }
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_SecondName
  //

  function Window_SecondName() {
    this.initialize.apply(this, arguments);
  }

  Window_SecondName.prototype = Object.create(Window_Selectable.prototype);
  Window_SecondName.prototype.constructor = Window_SecondName;

  Window_SecondName.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.select(0);
    this.activate();
  };

  Window_SecondName.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
      this._actor = actor;
      this.refresh();
    }
  };

  Window_SecondName.prototype.maxItems = function() {
    return Math.max($gameParty.secondNames().length, 1);
  };

  Window_SecondName.prototype.item = function() {
    return $gameParty.secondNames()[this.index()];
  };

  Window_SecondName.prototype.armor = function() {
    var item = this.item();
    return item ? $dataArmors[item.id] : null;
  };
  
  Window_SecondName.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.armor());
  };

  Window_SecondName.prototype.isEnabled = function(item) {
    if (!item || !this._actor || $gameParty.isSecondNameUsing(item.id)) {
      return false;
    }
    return this._actor.canEquip(item);
  };

  Window_SecondName.prototype.drawItem = function(index) {
    var item = $gameParty.secondNames()[index];
    if (item) {
      var armor = $dataArmors[item.id];
      var rect = this.itemRect(index);
      rect.width -= this.textPadding();
      this.changeTextColor(this.normalColor());
      this.changePaintOpacity(this.isEnabled(armor));
      this.contents.fontSize = this.standardFontSize();
      this.drawItemName(armor, rect.x, rect.y, rect.width);
      this.changePaintOpacity(1);
      this.contents.fontSize = dateFontSize;
      this.drawText(item.date, rect.x, rect.y, rect.width, 'right');
      if ($gameParty.isSecondNameUsing(item.id)) {
//        rect.width -= 224;
        this.changeTextColor(this.systemColor());
        this.changePaintOpacity(this._actor.secondNameArmor() === armor);
        this.contents.fontSize = this.standardFontSize();
        this.drawText(equipText, rect.x, rect.y, rect.width - 224, 'right');
      }
    }
  };

  Window_SecondName.prototype.updateHelp = function() {
    var armor = this.armor();
    if (armor) {
      this._helpWindow.setItem(armor);
    }
  };

  Window_SecondName.prototype.playOkSound = function() {
    SoundManager.playEquip();
  };

  //-----------------------------------------------------------------------------
  // Scene_Menu
  //

  var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('secondName', this.commandPersonal.bind(this));
  };

  var _Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
  Scene_Menu.prototype.onPersonalOk = function() {
    _Scene_Menu_onPersonalOk.call(this);
    if (this._commandWindow.currentSymbol() === 'secondName') {
      SceneManager.push(Scene_SecondName);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_SecondName
  //

  function Scene_SecondName() {
    this.initialize.apply(this, arguments);
  }

  Scene_SecondName.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_SecondName.prototype.constructor = Scene_SecondName;

  Scene_SecondName.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_SecondName.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createInfoWindow();
    this.createStatusWindow();
    this.createSecondNameWindow();
    this.refreshActor();
  };

  Scene_SecondName.prototype.createStatusWindow = function() {
    var wx = this._infoWindow.width;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - wx;
    var wh = this._infoWindow.height;
    this._statusWindow = new Window_SkillStatus(wx, wy, ww, wh);
    this.addWindow(this._statusWindow);
  };

  Scene_SecondName.prototype.createInfoWindow = function() {
    var wy = this._helpWindow.height;
    this._infoWindow = new Window_SecondNameInfo(0, wy);
    this.addWindow(this._infoWindow);
  }

  Scene_SecondName.prototype.createSecondNameWindow = function() {
    var wy = this._helpWindow.height + this._statusWindow.height;
    var wh = Graphics.boxHeight - wy;
    this._secondNameWindow = new Window_SecondName(0, wy, Graphics.boxWidth, wh);
    this._secondNameWindow.setHandler('ok',     this.onSecondNameOk.bind(this));
    this._secondNameWindow.setHandler('cancel', this.popScene.bind(this));
    this._secondNameWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._secondNameWindow.setHandler('pageup',   this.previousActor.bind(this));
    this._secondNameWindow.setHelpWindow(this._helpWindow);
    this.addWindow(this._secondNameWindow);
  };

  Scene_SecondName.prototype.refreshActor = function() {
    var actor = this.actor();
    this._secondNameWindow.setActor(actor);
    this._statusWindow.setActor(actor);
  };

  Scene_SecondName.prototype.onSecondNameOk = function() {
    var armor = this._secondNameWindow.armor();
    var actor = this.actor();
    actor.setSecondName(armor);
    this._statusWindow.refresh();
    this._secondNameWindow.refresh();
    this._secondNameWindow.activate();
  };

  Scene_SecondName.prototype.onActorChange = function() {
    this.refreshActor();
    this._secondNameWindow.activate();
  };

})();
