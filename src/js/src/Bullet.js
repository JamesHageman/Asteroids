var Bullet = (function(createjs) {

	function Bullet(ship) {
		var _super = new createjs.Shape();
		_.extend(this, _super);
		this.x = ship.x;
		this.y = ship.y;
		this.direction = ship.rotation;
		this.alive = true;
		this.stage = ship.stage;

		this.graphics
			.beginFill('#fff')
			.drawCircle(0, 0, 3)
			.endFill();

		this.timeAlive = 0;

		Game.cacheShape(this, 4);

		ship.stage.addChildAt(this, ship.stage.getChildIndex(ship));
		createjs.Tween.get(this)
			.wait(Bullet.LIFE_LEN * 800)
			.to({ alpha: 0 }, Bullet.LIFE_LEN * 200);
	}

	Bullet.prototype.updatePosition = function(delta) {
		this.x += Math.cos(this.direction * Math.PI / 180) * 1000 * delta;
		this.y += Math.sin(this.direction * Math.PI / 180) * 1000 * delta;
		var canvas = this.stage.canvas;
		if (this.x < 0) {
			this.x = canvas.width;
		} else if (this.x > canvas.width) {
			this.x = 0;
		}
		if (this.y < 0) {
			this.y = canvas.height;
		} else if (this.y > canvas.height) {
			this.y = 0;
		}
		this.timeAlive += delta;
		if (Game.settings.useParticles) {
			addParticle.call(this);
		}
	};

	var addParticle = function() {
		var particle = new createjs.Shape(this.graphics);
		particle.x = this.x;
		particle.y = this.y;
		this.stage.addChild(particle);
		var stage = this.stage;
		createjs.Tween
			.get(particle)
			.to({ alpha: 0 }, 150, createjs.Ease.quadIn)
			.call(function() {
				stage.removeChild(particle);
			});
	};

	Bullet.LIFE_LEN = 1; // 1 second

	return Bullet;
})(createjs);