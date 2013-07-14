var Ship = (function(createjs) {

	function Ship(x, y, stage) {
		var _super = new createjs.Shape();
		_.extend(this, _super);
		this.x = x;
		this.y = y;
		this.stage = stage;
		this.bullets = [];
		this.accelerating = false;
		this.velocity = {
			x: 0,
			y: 0
		};
		this.rotationPoint = {
			x: this.x,
			y: this.y
		};

		this.vertices = Game.Resources.shipPoints;
		// this.thrustLength = 0;
		// this.thrustShape = new createjs.Shape();
		// this.thrustShape.visible = false;
		stage.addChild(this.thrustShape);

		setupGraphics.call(this);

		this.alive = true;
		this.invincible = false;

		stage.addChild(this);
		Game.cacheShape(this, 40);
	}

	var setupGraphics = function() {
		this.graphics
			.setStrokeStyle(4)
			.beginFill('#000')
			.beginStroke('#fff')
			.moveTo(this.vertices[0][0], this.vertices[0][1]);
		for (var i = 1; i < this.vertices.length; i++) {
			var point = this.vertices[i];
			this.graphics.lineTo(point[0], point[1]);
		}
		this.graphics
			.closePath()
			.endStroke()
			.endFill();
		// console.log(this.vertices);
	};

	Ship.prototype.updatePositions = function(delta) {
		if (this.accelerating) {
			this.velocity.x += Math.cos(this.rotation * Math.PI / 180) * 10;
			this.velocity.y += Math.sin(this.rotation * Math.PI / 180) * 10;
		}

		// Move
		this.x += this.velocity.x * delta;
		this.y += this.velocity.y * delta;

		// DON'T Apply friction
		// this.velocity.x *= 0.99;
		// this.velocity.y *= 0.99;

		// Update rotation
		updateRotation.call(this);

		var _this = this;
		this.bullets = _.filter(this.bullets, function(bullet) {
			if (!bullet.alive) {
				_this.stage.removeChild(bullet);
				return false;
			}
			return true;
		});

		_.each(this.bullets, function(bullet) {
			bullet.updatePosition(delta);
			if (bullet.timeAlive > Bullet.LIFE_LEN) {
				bullet.alive = false;
			}
		});
	};

	Ship.prototype.updateGraphics = function() {
		// if (this.thrustLength > 0) {
		// 	var thrustPoints = Game.Resources.shipThrustPoints;

		// 	this.thrustShape.visible = true;
		// 	this.thrustShape.x = this.x;
		// 	this.thrustShape.y = this.y;
		// 	this.thrustShape.rotation = this.rotation;

		// 	this.thrustShape.graphics
		// 		.setStrokeStyle(4)
		// 		.beginStroke('#fff')
		// 		.moveTo(thrustPoints[0][0], thrustPoints[0][1])
		// 		.lineTo(thrustPoints[1][0] - this.thrustLength, thrustPoints[1][1])
		// 		.lineTo(thrustPoints[2][0], thrustPoints[2][1])
		// 		.endStroke();

		// } else {
		// 	this.thrustShape.visible = false;
		// }

	};

	Ship.prototype.shoot = function() {
		if (this.alive) {
			this.bullets.push(new Bullet(this));
		}
	};

	Ship.prototype.setAccelerating = function(bool) {
		if (bool) {
			this.accelerating = true;
			createjs.Tween.get(this)
				.to( { thrustLength: 10 }, 1000);
		} else {
			this.accelerating = false;
			createjs.Tween.get(this)
				.to( {thrustLength: 0 }, 1000);
		}
	};

	var updateRotation = function() {
		this.rotation = Math.atan2(
			this.rotationPoint.y - this.y,
			this.rotationPoint.x - this.x
			) * 180 / Math.PI;
	};

	Ship.prototype.checkCollisons = function(asteroids) {
		var retVal = null;
		if (this.invincible) {
			return null;
		}
		for (var i = 0; i < asteroids.length; i++) {
			var asteroid = asteroids[i];
			var dist = Math.sqrt(Math.pow(asteroid.x - this.x, 2) + Math.pow(asteroid.y - this.y, 2));
			if (dist > 40 + asteroid.state.scale * 1.2) continue;
			var avertices = Game.localToLocalVertices(this, asteroid).slice(0);
			var svertices = Game.localToLocalVertices(asteroid, this).slice(0);
			var j, vertex;
			for (j = 0; j < avertices.length; j++) {
				vertex = avertices[j];
				if (asteroid.hitTest(vertex[0], vertex[1])) {
					retVal = asteroid;
					break;
				}
			}
			for (j = 0; j < svertices.length; j++) {
				vertex = svertices[j];
				if (this.hitTest(vertex[0], vertex[1])) {
					retVal = asteroid;
					break;
				}
			}
			if (retVal) break;
		}
		return retVal;
	};

	Ship.prototype.checkBulletCollisions = function(asteroids) {
		_.each(this.bullets, function(bullet) {
			_.each(asteroids, function(asteroid) {
				asteroid.checkBulletCollision(bullet);
			});
		});
	};

	Ship.prototype.setRotationPoint = function(x, y) {
		this.rotationPoint.x = x;
		this.rotationPoint.y = y;
	};

	Ship.prototype.die = function() {
		this.alive = false;
		this.visible = false;
	};

	Ship.prototype.revive = function() {
		this.alive = true;
		this.visible = true;
	};

	Ship.prototype.setInvincible = function(val) {
		if (val) {
			this.alpha = 0.5;
			createjs.Tween.get(this, { loop: true, override: true })
				.to( { alpha: 0.1 }, 500)
				.to( { alpha: 0.5 }, 500);
			this.invincible = true;
		} else {
			createjs.Tween.removeTweens(this);
			this.invincible = false;
			this.alpha = 1;
		}
	};

	return Ship;
})(createjs);