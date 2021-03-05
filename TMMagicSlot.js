//=============================================================================
// TMPlugin - 魔法スロット
// バージョン: 1.2.0
// 最終更新日: 2018/10/25
// 配布元　　: https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 通常の装備とは別に魔法を記憶するシステムを追加します。
 *
 * @author tomoaky (https://hikimoki.sakura.ne.jp/)
 *
 * @param menuCommand
 * @desc メニューシーンに追加するコマンド。
 * 初期値: 魔法の記憶
 * @default 魔法の記憶
 * 
 * @param actorSelectCommand
 * @desc 魔法記憶シーンで表示するアクター選択コマンド。
 * 初期値: アクター選択 (未入力ならコマンドを非表示にする)
 * @default アクター選択
 *
 * @param magicSlot
 * @desc 魔法記憶シーンで表示する魔法スロットのパラメータ名。
 * 初期値: 記憶スロット
 * @default 記憶スロット
 *
 * @param equipCommand
 * @desc 魔法記憶シーンで表示する装備コマンド。
 * 初期値: 記憶
 * @default 記憶
 *
 * @param clearCommand
 * @type string
 * @desc 魔法記憶シーンで表示する全て外すコマンド。
 * 初期値: 全て忘れる
 * @default 全て忘れる
 *
 * @param magicTypeName
 * @type string
 * @desc 魔法として扱う武器タイプ名。
 * 初期値: 魔法
 * @default 魔法
 *
 * @param blankText
 * @type string
 * @desc 空きスロットに表示するテキスト。
 * 初期値: 空きスロット
 * @default 空きスロット
 *
 * @param slotCostColor
 * @type number
 * @max 31
 * @desc 必要な空きスロット数の文字色番号。
 * 初期値: 31
 * @default 31
 *
 * @param statusWidth
 * @type number
 * @desc 魔法記憶シーンのステータスウィンドウの幅。
 * 初期値: 340
 * @default 340
 *
 * @param maxMpText
 * @type string
 * @desc 魔法記憶シーンの最大MPの項目名。
 * 初期値: 最大%1
 * @default 最大%1
 *
 * @help
 * TMPlugin - 魔法スロット ver1.2.0
 * 
 * 使い方:
 *
 *   データベースのタイプタブにある『武器タイプ』に 魔法 という名前の
 *   新しいタイプを追加してください。このタイプを設定した武器は魔法として
 *   扱われるようになります。
 *
 *   次に、魔法として扱う武器の特徴『スキル追加』に実際に記憶する魔法を
 *   設定してください。
 *
 *   アクター、あるいは職業のメモ欄に <magicSlot:1> というタグを
 *   設定してください。ここで設定した数値が記憶できる魔法の最大数になります。
 *
 *   あとはゲーム内で魔法として設定した武器を入手し、魔法記憶シーンで
 *   アクターに記憶させれば、魔法が使えるようになります。
 *
 *   このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。
 *
 *
 * メモ欄タグ（アクター、職業、武器、防具）:
 *
 *   <magicSlot:1>
 *     記憶できる魔法の最大数が 1 増えます。実際の最大数はアクター、職業、
 *     装備している武器と防具に設定されたこのタグの合計値が採用されます。
 *
 *
 * メモ欄タグ（スキル）:
 *
 *   <magicSlotCost:1>
 *     記憶に必要なスロット数を 1 に設定します。たとえばこの値が 2 のスキルは
 *     スロットに 2 空きがないと記憶することができません。
 * 
 * 
 * メモ欄タグ（武器）:
 * 
 *   <equippableActor:1 2>
 *     魔法を記憶することができるアクターを番号で指定します、
 *     複数のアクターを設定する場合は半角スペースで区切ってください。
 *     このタグを省略した場合はすべてのアクターが記憶可能になります。
 * 
 *   <equippableClass:3>
 *     魔法を記憶することができる職業を番号で指定します、
 *     複数の職業を設定する場合は半角スペースで区切ってください。
 *     このタグを省略した場合はすべての職業が記憶可能になります。
 *
 *
 * プラグインコマンド:
 *
 *   callMagicEquip
 *     魔法記憶シーンを呼び出します。
 * 
 *   callMagicEquip 2
 *     アクター 2 番の魔法記憶シーンを呼び出します。
 *     指定したアクターがパーティにいない場合はパーティの先頭にいるアクターが
 *     対象になります。
 *
 *   addMagicSlot 3 1
 *     アクター 3 番の空きスロットを 1 増やします。
 *     数値には制御文字 \V[n] が使用できます。
 *
 *
 * プラグインパラメータ補足:
 *
 *   menuCommand
 *     このパラメータに何も入力しなかった場合、メニューから魔法記憶シーンを
 *     開くことができなくなります。
 *     特定の場所でのみ魔法の入れ替えをしたい場合に利用してください、
 *     その場合はプラグインコマンド callMagicEquip で魔法記憶シーンを
 *     呼び出す必要があります。
 *
 *   magicTypeName
 *     魔法として扱う武器タイプ名を変更することができます。
 *     『魔法』というタイプ名をすでに使用している場合に変更してください。
 *
 *   slotCostColor
 *     イベントコマンド『文章の表示』などで使用する制御文字 \C[n] と同じです。
 *     0 ～ 31 の範囲で値を設定してください。
 *
 *   maxMpText
 *     魔法記憶シーンに表示するアクターの最大MPの項目名を設定します。
 *     %1 という文字列がデータベースの用語で設定したMPの文字列と置換。
 *     このパラメータが空の場合は最大MPを表示しなくなります。
 */

var Imported = Imported || {};
Imported.TMMagicSlot = true;

var TMPlugin = TMPlugin || {};
TMPlugin.MagicSlot = {};
TMPlugin.MagicSlot.Parameters = PluginManager.parameters('TMMagicSlot');
TMPlugin.MagicSlot.MenuCommand = TMPlugin.MagicSlot.Parameters['menuCommand'];
TMPlugin.MagicSlot.ActorSelectCommand = TMPlugin.MagicSlot.Parameters['actorSelectCommand'];
TMPlugin.MagicSlot.MagicSlot = TMPlugin.MagicSlot.Parameters['magicSlot'] || '記憶スロット';
TMPlugin.MagicSlot.EquipCommand	= TMPlugin.MagicSlot.Parameters['equipCommand'] || '記憶';
TMPlugin.MagicSlot.ClearCommand	= TMPlugin.MagicSlot.Parameters['clearCommand'] || '全て忘れる';
TMPlugin.MagicSlot.MagicTypeName = TMPlugin.MagicSlot.Parameters['magicTypeName'] || '魔法';
TMPlugin.MagicSlot.BlankText = TMPlugin.MagicSlot.Parameters['blankText'] || '空きスロット';
TMPlugin.MagicSlot.SlotCostColor = +(TMPlugin.MagicSlot.Parameters['slotCostColor'] || 31);
TMPlugin.MagicSlot.StatusWidth = +(TMPlugin.MagicSlot.Parameters['statusWidth'] || 340);
TMPlugin.MagicSlot.MaxMpText = TMPlugin.MagicSlot.Parameters['maxMpText'];

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

	var _Game_Actor_setup = Game_Actor.prototype.setup;
	Game_Actor.prototype.setup = function(actorId) {
		_Game_Actor_setup.call(this, actorId);
		this.initMagics();
	};

	var _Game_Actor_refresh = Game_Actor.prototype.refresh;
	Game_Actor.prototype.refresh = function() {
		this.releaseUnequippableMagics();
		_Game_Actor_refresh.call(this);
	};

	var _Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
	Game_Actor.prototype.traitObjects = function() {
		return _Game_Actor_traitObjects.call(this).concat(this.magics());
	};

	Game_Actor.prototype.initMagics = function() {
		this._magics = [];
		this._magicSlotPlus = 0;
	};

	Game_Actor.prototype.magics = function() {
		this._magics = this._magics || [];
		return this._magics.map(function(itemId) {
			return $dataWeapons[itemId];
		});
	};
	
	Game_Actor.prototype.magicSlotPlus = function() {
		this._magicSlotPlus = this._magicSlotPlus || 0;
		return this._magicSlotPlus;
	};

	Game_Actor.prototype.magicSlots = function() {
		var objects = [this.actor(), this.currentClass()];
		var equips = this.equips();
		for (var i = 0; i < equips.length; i++) {
			var item = equips[i];
			if (item) objects.push(item);
		}
		var result = objects.reduce(function(n, item) {
			return n + (+item.meta.magicSlot || 0);
		}.bind(this), this.magicSlotPlus());
		return Math.max(result, 0);
	};

	Game_Actor.prototype.totalMagicSlotCost = function() {
		return this.magics().reduce(function(n, item) {
			return n + (+item.meta.magicSlotCost || 1);
		}.bind(this), 0);
	};

	Game_Actor.prototype.blankMagicSlots = function() {
		return this.magicSlots() - this.totalMagicSlotCost();
	};

	Game_Actor.prototype.releaseUnequippableMagics = function(forcing) {
		for (;;) {
			var magics = this.magics();
			var magicSlots = this.magicSlots();
			var totalCost = this.totalMagicSlotCost();
			if (magicSlots < totalCost) {
				var itemId = this._magics.pop();
				if (!forcing) {
					$gameParty.gainItem($dataWeapons[itemId], 1);
				}
			} else {
				break;
			}
		}
	};

	Game_Actor.prototype.changeMagic = function(slotId, item) {
		var oldItem = this.magics()[slotId];
		if (oldItem) $gameParty.gainItem(oldItem, 1);
		if (item) {
			this._magics[slotId] = item.id;
			$gameParty.loseItem(item, 1);
		} else {
			this._magics.splice(slotId, 1);
		}
	};

	Game_Actor.prototype.clearMagics = function() {
		while (this.magics().length > 0) {
			this.changeMagic(0, null);
		}
	};

	Game_Actor.prototype.addMagicSlot = function(value) {
		this._magicSlotPlus = this._magicSlotPlus || 0;
		this._magicSlotPlus += value;
		this.refresh();
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'callMagicEquip') {
			if (args[0]) {
				var arr = args.map(this.convertEscapeCharactersTM, this);
				var actor = $gameActors.actor(+arr[0]);
				if (actor) {
					$gameParty.setMenuActor(actor);
				}
			}
			SceneManager.push(Scene_MagicEquip);
		} else if (command === 'addMagicSlot') {
			var arr = args.map(this.convertEscapeCharactersTM, this);
			var actor = $gameActors.actor(+arr[0]);
			if (actor) {
				actor.addMagicSlot(+arr[1]);
			}
		}
	};
	
	//-----------------------------------------------------------------------------
	// Window_MenuCommand
	//

	var _Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
	Window_MenuCommand.prototype.addMainCommands = function() {
		_Window_MenuCommand_addMainCommands.call(this);
		var enabled = this.areMainCommandsEnabled();
		if (TMPlugin.MagicSlot.MenuCommand) {
			this.addCommand(TMPlugin.MagicSlot.MenuCommand, 'magicEquip', enabled);
		}
	};

	//-----------------------------------------------------------------------------
	// Window_MagicStatus
	//

	function Window_MagicStatus() {
		this.initialize.apply(this, arguments);
	}

	Window_MagicStatus.prototype = Object.create(Window_Base.prototype);
	Window_MagicStatus.prototype.constructor = Window_MagicStatus;

	Window_MagicStatus.prototype.initialize = function(x, y) {
		var width = this.windowWidth();
		var height = this.windowHeight();
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this._actor = null;
		this.refresh();
	};

	Window_MagicStatus.prototype.windowWidth = function() {
		return TMPlugin.MagicSlot.StatusWidth;
	};

	Window_MagicStatus.prototype.windowHeight = function() {
		return this.fittingHeight(this.numVisibleRows());
	};

	Window_MagicStatus.prototype.numVisibleRows = function() {
		return TMPlugin.MagicSlot.MaxMpText ? 3 : 2;
	};

	Window_MagicStatus.prototype.setActor = function(actor) {
		if (this._actor !== actor) {
			this._actor = actor;
			this.refresh();
		}
	};

	Window_MagicStatus.prototype.refresh = function() {
		this.contents.clear();
		if (this._actor) {
			var x = this.textPadding();
			var lineHeight = this.lineHeight();
			var width = this.contents.width - x * 2;
			this.drawActorName(this._actor, x, 0);
			this.changeTextColor(this.systemColor());
			this.drawText(TMPlugin.MagicSlot.MagicSlot, x, lineHeight, width);
			this.changeTextColor(this.normalColor());
			var text = '' + this._actor.totalMagicSlotCost() + ' / ' + this._actor.magicSlots();
			this.drawText(text, x, lineHeight, width, 'right');
			if (TMPlugin.MagicSlot.MaxMpText) {
				this.changeTextColor(this.systemColor());
				this.drawText(TMPlugin.MagicSlot.MaxMpText.format(TextManager.mp),
											x, lineHeight * 2, width);
				this.changeTextColor(this.normalColor());
				this.drawText(this._actor.mmp, x, lineHeight * 2, width, 'right');
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Window_MagicCommand
	//

	function Window_MagicCommand() {
		this.initialize.apply(this, arguments);
	}

	Window_MagicCommand.prototype = Object.create(Window_HorzCommand.prototype);
	Window_MagicCommand.prototype.constructor = Window_MagicCommand;

	Window_MagicCommand.prototype.initialize = function(x, y, width) {
		this._windowWidth = width;
		Window_HorzCommand.prototype.initialize.call(this, x, y);
	};

	Window_MagicCommand.prototype.windowWidth = function() {
		return this._windowWidth;
	};

	Window_MagicCommand.prototype.maxCols = function() {
		return TMPlugin.MagicSlot.ActorSelectCommand ? 3 : 2;
	};

	Window_MagicCommand.prototype.makeCommandList = function() {
		this.addCommand(TMPlugin.MagicSlot.EquipCommand, 'equip');
		this.addCommand(TMPlugin.MagicSlot.ClearCommand, 'clear');
		if (TMPlugin.MagicSlot.ActorSelectCommand) {
			this.addCommand(TMPlugin.MagicSlot.ActorSelectCommand, 'actorSelect');
		}
	};

	//-----------------------------------------------------------------------------
	// Window_MagicSlot
	//

	function Window_MagicSlot() {
		this.initialize.apply(this, arguments);
	}

	Window_MagicSlot.prototype = Object.create(Window_Selectable.prototype);
	Window_MagicSlot.prototype.constructor = Window_MagicSlot;

	Window_MagicSlot.prototype.initialize = function(x, y, width) {
		var height = this.fittingHeight(5);
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);
		this._actor = null;
		this.refresh();
	};

	Window_MagicSlot.prototype.setActor = function(actor) {
		if (this._actor !== actor) {
			this._actor = actor;
			this.refresh();
		}
	};

	Window_MagicSlot.prototype.update = function() {
		Window_Selectable.prototype.update.call(this);
		if (this._itemWindow) {
			var blankSlots = this._actor && this.index() >= 0 ? this._actor.blankMagicSlots() : 0;
			var item = this.item();
			if (item) blankSlots += (+item.meta.magicSlotCost || 1);
			this._itemWindow.setBlankSlots(blankSlots);
		}
	};

	Window_MagicSlot.prototype.maxItems = function() {
		return this._actor ? this._actor.magics().length + this._actor.blankMagicSlots() : 0;
	};

	Window_MagicSlot.prototype.item = function() {
		return this._actor ? this._actor.magics()[this.index()] : null;
	};

	Window_MagicSlot.prototype.drawItem = function(index) {
		if (this._actor) {
			var rect = this.itemRectForText(index);
			var item = this._actor.magics()[index];
			this.changeTextColor(this.normalColor());
			if (item) {
				this.drawItemName(item, rect.x, rect.y, rect.width);
				this.changeTextColor(this.textColor(TMPlugin.MagicSlot.SlotCostColor));
				this.drawText(item.meta.magicSlotCost || '1', rect.x, rect.y, rect.width, 'right');
			} else {
				this.drawText(TMPlugin.MagicSlot.BlankText, rect.x, rect.y, rect.width);
			}
		}
	};

	Window_MagicSlot.prototype.isEnabled = function(index) {
		return true;
	};

	Window_MagicSlot.prototype.isCurrentItemEnabled = function() {
		return this.isEnabled(this.index());
	};

	Window_MagicSlot.prototype.setItemWindow = function(itemWindow) {
		this._itemWindow = itemWindow;
		this.update();
	};

	Window_MagicSlot.prototype.updateHelp = function() {
		Window_Selectable.prototype.updateHelp.call(this);
		this.setHelpWindowItem(this.item());
	};

	//-----------------------------------------------------------------------------
	// Window_MagicItem
	//

	function Window_MagicItem() {
		this.initialize.apply(this, arguments);
	}

	Window_MagicItem.prototype = Object.create(Window_ItemList.prototype);
	Window_MagicItem.prototype.constructor = Window_MagicItem;

	Window_MagicItem.prototype.initialize = function(x, y, width, height) {
		Window_ItemList.prototype.initialize.call(this, x, y, width, height);
		this._actor = null;
		this._blankSlots = 0;
	};

	Window_MagicItem.prototype.setActor = function(actor) {
		if (this._actor !== actor) {
			this._actor = actor;
			this.refresh();
			this.resetScroll();
		}
	};

	Window_MagicItem.prototype.setBlankSlots = function(blankSlots) {
		if (this._blankSlots !== blankSlots) {
			this._blankSlots = blankSlots;
			this.refresh();
			this.resetScroll();
		}
	};

	Window_MagicItem.prototype.includes = function(item) {
		if ($dataSystem.weaponTypes[item.wtypeId] !== TMPlugin.MagicSlot.MagicTypeName) {
			return false;
		}
		if (this._actor.magics().some(function(magic) {
			return item == magic;
		})) return false;
		if (item.meta.equippableActor) {
			var actorId = this._actor.actorId();
			if (!item.meta.equippableActor.split(" ").map(Number).some(function(id) {
				return actorId === id;
			})) return false;
		}
		if (item.meta.equippableClass) {
			var classId = this._actor._classId;
			if (!item.meta.equippableClass.split(" ").map(Number).some(function(id) {
				return classId === id;
			})) return false;
		}
		return this._blankSlots >= +(item.meta.magicSlotCost || 1);
	};

	Window_MagicItem.prototype.isEnabled = function(item) {
		return true;
	};

	Window_MagicItem.prototype.makeItemList = function() {
		this._data = $gameParty.weapons().filter(function(item) {
			return this.includes(item);
		}, this);
		this._data.push(null);
	};

	Window_MagicItem.prototype.selectLast = function() {
	};

	Window_MagicItem.prototype.playOkSound = function() {
	};

	//-----------------------------------------------------------------------------
	// Scene_Menu
	//

	var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
		_Scene_Menu_createCommandWindow.call(this);
		this._commandWindow.setHandler('magicEquip', this.commandPersonal.bind(this));
	};

	var _Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
	Scene_Menu.prototype.onPersonalOk = function() {
		_Scene_Menu_onPersonalOk.call(this);
		if (this._commandWindow.currentSymbol() === 'magicEquip') {
			SceneManager.push(Scene_MagicEquip);
		}
	};

	//-----------------------------------------------------------------------------
	// Scene_MagicEquip
	//

	function Scene_MagicEquip() {
		this.initialize.apply(this, arguments);
	}

	Scene_MagicEquip.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_MagicEquip.prototype.constructor = Scene_MagicEquip;

	Scene_MagicEquip.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};

	Scene_MagicEquip.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this.createHelpWindow();
		this.createStatusWindow();
		this.createCommandWindow();
		this.createSlotWindow();
		this.createItemWindow();
		this.createActorSelectWindow();
		this.refreshActor();
	};

	Scene_MagicEquip.prototype.start = function() {
		Scene_MenuBase.prototype.start.call(this);
		if (TMPlugin.MagicSlot.ActorSelectCommand) {
			this._actorSelectWindow.refresh();
		}
	};
	
	Scene_MagicEquip.prototype.createStatusWindow = function() {
		this._statusWindow = new Window_MagicStatus(0, this._helpWindow.height);
		this.addWindow(this._statusWindow);
	};

	Scene_MagicEquip.prototype.createCommandWindow = function() {
		var wx = this._statusWindow.width;
		var wy = this._helpWindow.height;
		var ww = Graphics.boxWidth - this._statusWindow.width;
		this._commandWindow = new Window_MagicCommand(wx, wy, ww);
		this._commandWindow.setHelpWindow(this._helpWindow);
		this._commandWindow.setHandler('equip',	this.commandEquip.bind(this));
		this._commandWindow.setHandler('clear',	this.commandClear.bind(this));
		this._commandWindow.setHandler('actorSelect', this.commandActorSelect.bind(this));
		this._commandWindow.setHandler('cancel', this.popScene.bind(this));
		this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
		this._commandWindow.setHandler('pageup', this.previousActor.bind(this));
		this.addWindow(this._commandWindow);
	};

	Scene_MagicEquip.prototype.createSlotWindow = function() {
		var wx = this._statusWindow.width;
		var wy = this._commandWindow.y + this._commandWindow.height;
		var ww = Graphics.boxWidth - this._statusWindow.width;
		this._slotWindow = new Window_MagicSlot(wx, wy, ww);
		this._slotWindow.setHelpWindow(this._helpWindow);
		this._slotWindow.setHandler('ok', this.onSlotOk.bind(this));
		this._slotWindow.setHandler('cancel', this.onSlotCancel.bind(this));
		this.addWindow(this._slotWindow);
	};

	Scene_MagicEquip.prototype.createItemWindow = function() {
		var wx = 0;
		var wy = Math.max(this._statusWindow.y + this._statusWindow.height,
				this._slotWindow.y + this._slotWindow.height);
		var ww = Graphics.boxWidth;
		var wh = Graphics.boxHeight - wy;
		this._itemWindow = new Window_MagicItem(wx, wy, ww, wh);
		this._itemWindow.setHelpWindow(this._helpWindow);
		this._itemWindow.setHandler('ok',		 this.onItemOk.bind(this));
		this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
		this._slotWindow.setItemWindow(this._itemWindow);
		this.addWindow(this._itemWindow);
	};
	
	Scene_MagicEquip.prototype.createActorSelectWindow = function() {
		if (TMPlugin.MagicSlot.ActorSelectCommand) {
			this._actorSelectWindow = new Window_MenuStatus(0, 0);
			this._actorSelectWindow.setHandler('ok', this.onActorSelectOk.bind(this));
			this._actorSelectWindow.setHandler('cancel', this.onActorSelectCancel.bind(this));
			this._actorSelectWindow.reserveFaceImages();
			this._actorSelectWindow.hide();
			this.addWindow(this._actorSelectWindow);
		}
	};

	Scene_MagicEquip.prototype.refreshActor = function() {
		var actor = this.actor();
		this._statusWindow.setActor(actor);
		this._slotWindow.setActor(actor);
		this._itemWindow.setActor(actor);
	};

	Scene_MagicEquip.prototype.commandEquip = function() {
		this._slotWindow.activate();
		this._slotWindow.select(0);
	};

	Scene_MagicEquip.prototype.commandClear = function() {
		SoundManager.playEquip();
		this.actor().clearMagics();
		this._statusWindow.refresh();
		this._slotWindow.refresh();
		this._commandWindow.activate();
	};

	Scene_MagicEquip.prototype.commandActorSelect = function() {
		this._actorSelectWindow.selectLast();
		this._actorSelectWindow.show();
		this._actorSelectWindow.activate();
	};

	Scene_MagicEquip.prototype.onSlotOk = function() {
		this._itemWindow.activate();
		this._itemWindow.select(0);
	};

	Scene_MagicEquip.prototype.onSlotCancel = function() {
		this._slotWindow.deselect();
		this._commandWindow.activate();
	};

	Scene_MagicEquip.prototype.onItemOk = function() {
		SoundManager.playEquip();
		var slotId = this._slotWindow.index();
		if (slotId > this.actor().magics().length) {
			slotId = this.actor().magics().length;
		}
		this.actor().changeMagic(slotId, this._itemWindow.item());
		this._slotWindow.activate();
		this._slotWindow.refresh();
		this._itemWindow.deselect();
		this._itemWindow.refresh();
		this._statusWindow.refresh();
	};

	Scene_MagicEquip.prototype.onItemCancel = function() {
		this._slotWindow.activate();
		this._itemWindow.deselect();
	};

	Scene_MagicEquip.prototype.onActorSelectOk = function() {
		this._actorSelectWindow.hide();
		$gameParty.setMenuActor($gameParty.members()[this._actorSelectWindow.index()]);
		this.updateActor();
		this.onActorChange();
	};

	Scene_MagicEquip.prototype.onActorSelectCancel = function() {
		this._actorSelectWindow.hide();
		this._commandWindow.activate();
	};

	Scene_MagicEquip.prototype.onActorChange = function() {
		this.refreshActor();
		this._commandWindow.activate();
	};

})();
