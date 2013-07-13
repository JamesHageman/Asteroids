var ShipDeath = (function(createjs) {

	var animDone = (function() {
		console.log('done!');
	}).bind(this);

	function ShipDeath(ship, timeline) {
		this.ship = ship;
		this.lines = [];
		for (var i = 0; i < 15; i++) {
			var line = this.lines[i];
			line = new createjs.Shape();
			line.graphics
				.setStrokeStyle(4)
				.beginStroke('#fff')
				.moveTo(-18, 0)
				.lineTo(18, 0)
				.endStroke();
			line.x = this.ship.x;
			line.y = this.ship.y;
			line.rotation = Math.random() * 360 - 180;

			this.ship.stage.addChild(line);

			var rotationTarget = Math.random() * 720 + 360;
			if (Math.random() > 0.5) {
				rotationTarget *= -1;
			}

			var distance = 300;
			var direction = Math.random() * Math.PI * 2; // radians used is trig functions
			var targetX = line.x + Math.cos(direction) * distance;
			var targetY = line.y + Math.sin(direction) * distance;

			createjs.Tween
				.get(line)
				.to({x: targetX, y: targetY, alpha: 0, rotation: rotationTarget}, 3000, createjs.Ease.quadOut)
				.call(animDone);

		}

	}

	return ShipDeath;
})(createjs);