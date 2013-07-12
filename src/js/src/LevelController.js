var LevelController = (function(createjs) {

	function LevelController(ship, stage) {
		this.asteroidPositions = Game.Resources.asteroidPositions;
		this.stage = stage;
		this.ship = ship;
	}

	LevelController.prototype.initLevel = function(levelNumber) {
		var canvas = this.stage.canvas;
		this.ship.x = canvas.width / 2;
		this.ship.y = canvas.height / 2;
		this.ship.velocity.x = 0;
		this.ship.velocity.y = 0;
		this.ship.rotation = 0;
		this.asteroidPositions = _.shuffle(this.asteroidPositions);
		for (var i = 1; i <= levelNumber + 2; i++) {
			if (!this.asteroidPositions[i-1]) {
				break;
			}
			Game.addAsteroid(this.asteroidPositions[i-1][0], this.asteroidPositions[i-1][1]);
		}
	};

	return LevelController;
})(createjs);