var ShipDeath = (function(createjs) {

	var animDone = (function() {
		console.log('done!');
	}).bind(this);

	function ShipDeath(ship, asteroid) {
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

			// var shipSpeed = Math.sqrt(ship.velocity.x * ship.velocity.x + ship.velocity.y * ship.velocity.y);
			// var shipDirection = Math.atan2(ship.velocity.y, ship.velocity.x);

			// var distance = shipSpeed * 3 / 2;
			// var direction = shipDirection - Math.PI / 2 + Math.random() * Math.PI;

			var sv = {
				x: ship.velocity.x,
				y: ship.velocity.y
			};
			var av = {
				x: asteroid.speed * Math.cos(asteroid.direction * Math.PI / 180),
				y: asteroid.speed * Math.sin(asteroid.direction * Math.PI / 180)
			};
			var vel = {
				x: sv.x + av.x,
				y: sv.y + av.y
			};

			var lineSpeed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
			var lineDirection = Math.atan2(vel.y, vel.x) - Math.PI / 3 + Math.random() * Math.PI * 2 / 3;

			var animLength = 3;

			var targetX = line.x + Math.cos(lineDirection) * lineSpeed * animLength;
			var targetY = line.y + Math.sin(lineDirection) * lineSpeed * animLength;



			createjs.Tween
				.get(line)
				.to({
					x: targetX,
					y: targetY,
					alpha: 0,
					rotation: rotationTarget
				}, 1000 * animLength, createjs.Ease.linear)
				.call(animDone);

		}

	}

	return ShipDeath;
})(createjs);