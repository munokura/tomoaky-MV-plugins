(function() {

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'nwayShotP') {
			var character = this.character(-1);
			var battler = character.battler();
			if (battler.canMove()) {
				character.nwayShot.apply(character, args.map(Number));
			}
		} else if (command === 'nallShotP') {
			var character = this.character(-1);
			var battler = character.battler();
			if (battler.canMove()) {
				character.nallShot.apply(character, args.map(Number));
			}
		}
	};

})();