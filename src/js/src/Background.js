var Background = (function(createjs) {

	function Background(stage) {
		var _super = new createjs.Shape();
		_.extend(this, _super);

		this.graphics
			.beginFill('#000')
			.drawRect(0, 0, stage.canvas.width, stage.canvas.height)
			.endFill();
		this.cache(0, 0, stage.canvas.width, stage.canvas.height);
		stage.addChild(this);
	}

	return Background;
})(createjs);