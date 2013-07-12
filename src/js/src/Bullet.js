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

		ship.stage.addChildAt(this, ship.stage.getChildIndex(ship));
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
	};

	return Bullet;
})(createjs);