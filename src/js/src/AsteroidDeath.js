var AsteroidDeath = (function(createjs) {

	function AsteroidDeath(asteroid, bullet) {
		this.asteroid = asteroid;
		this.lines = [];
		for (var i = 0; i < 8; i++) {
			var length = asteroid.state.scale;
			length += Math.random() * asteroid.state.scale / 3 - asteroid.state.scale / 6;
			var line = new createjs.Shape();
			line.graphics
				.setStrokeStyle(4)
				.beginStroke('#fff')
				.moveTo(-length / 2, 0)
				.lineTo(length / 2, 0)
				.endStroke();
			line.x = asteroid.x;
			line.y = asteroid.y;
			line.rotation = Math.random() * 360 - 180;

			asteroid.stage.addChild(line);

			var rotationTarget = Math.abs(line.rotation) + Math.random() * 180 + 180;
			if (line.rotation < 0) {
				rotationTarget *= -1;
			}

			var distance = asteroid.state.speed * 2;
			var direction = bullet.direction - 60 + Math.random() *  120;
			var targetX = line.x + Math.cos(direction * Math.PI / 180) * distance;
			var targetY = line.y + Math.sin(direction * Math.PI / 180) * distance;

			createjs.Tween.get(line)
				.to({ x: targetX, y: targetY, alpha: 0, rotation: rotationTarget }, 2000, createjs.Ease.linear);
		}
	}

	return AsteroidDeath;
})(createjs);