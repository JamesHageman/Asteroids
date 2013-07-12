var Asteroid = (function(createjs) {

	var setupGraphics = function() {
		var points = this.vertices;
		this.graphics
			.setStrokeStyle(4)
			.beginStroke('#fff')
			.beginFill('#000')
			.moveTo(points[0][0], points[0][1]);
		for (var i = 1; i < points.length; i++) {
			this.graphics.lineTo(points[i][0], points[i][1]);
		}
		this.graphics
			.closePath()
			.endFill()
			.endStroke();
	};

	var setScale = function() {
		var scale = 0;
		var speed = 0;
		if (this.state == Asteroid.LARGE) {
			scale = 80;
			speed = 40;
		} else if (this.state == Asteroid.MEDIUM) {
			scale = 50;
			speed = 70;
		} else if (this.state == Asteroid.SMALL) {
			scale = 20;
			speed = 100;
		}
		this.scale = scale;
		this.speed = speed;
	};

	var randomizeVertices = function() {
		_.each(this.vertices, function(vertex) {
			var range = 0;
			vertex[0] -= Math.random() * range * ((vertex[0] < 0) ? -1 : 1);
			vertex[1] -= Math.random() * range * ((vertex[0] < 0) ? -1 : 1);
		});
	};

	function Asteroid(x, y, state, stage) {
		var _super = new createjs.Shape();
		_.extend(this, _super);

		this.x = x;
		this.y = y;
		this.state = state;
		this.vertices = Game.Resources.asteroidPoints.slice(0);
		this.speed = 0;

		this.rotation = Math.random() * 360;
		this.direction = Math.random() * 360;
		randomizeVertices.call(this);
		setScale.call(this);
		this.vertices = Game.scaleVertices(this, this.scale);

		setupGraphics.call(this);
		Game.cacheShape(this, this.scale + 5);
		this.stage = stage;
		stage.addChild(this);
	}

	Asteroid.prototype.checkBulletCollision = function(bullet) {
		var point = this.globalToLocal(bullet.x, bullet.y);
		if (this.hitTest(point.x, point.y)) {
			if (this.state == Asteroid.LARGE || this.state == Asteroid.MEDIUM) {
				var state = (this.state == Asteroid.LARGE) ? Asteroid.MEDIUM : Asteroid.SMALL;
				Game.addAsteroid(this.x, this.y, state);
				Game.addAsteroid(this.x, this.y, state);
			}
			Game.removeAsteroid(this);
			bullet.alive = false;
		}
	};

	Asteroid.prototype.updatePosition = function(delta) {
		this.x += Math.cos(this.direction * Math.PI / 180) * this.speed * delta;
		this.y += Math.sin(this.direction * Math.PI / 180) * this.speed * delta;

		var canvas = this.stage.canvas;

		if (this.x + this.scale < 0) {
			this.x = canvas.width + this.scale;
		} else if (this.x - this.scale > canvas.width) {
			this.x = -this.scale;
		}

		if (this.y + this.scale < 0) {
			this.y = canvas.height + this.scale;
		} else if (this.y - this.scale > canvas.height) {
			this.y = -this.scale;
		}
	};

	Asteroid.LARGE = 0;
	Asteroid.MEDIUM = 1;
	Asteroid.SMALL = 2;

	return Asteroid;
})(createjs);