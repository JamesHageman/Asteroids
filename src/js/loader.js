var launchFullScreen = function(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullscreen) {
		element.mozRequestFullscreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	}
};

require(['js/lib/create.js',
		'js/lib/underscore.js',
		'js/lib/hand.js',
		'js/lib/zepto.js'],
function() {
	require(['js/src/Game.js',
			'js/src/Background.js',
			'js/src/Bullet.js',
			'js/src/Asteroid.js',
			'js/src/AsteroidDeath.js',
			'js/src/Ship.js',
			'js/src/ShipDeath.js',
			'js/src/LevelController.js'],
	function() {
		require(['js/data/asteroidPoints.js',
				'js/data/asteroidPositions.js',
				'js/data/shipPoints.js'],
		function() {
			$('#playButton').click(function() {
				var main = $('div.main');
				var canvas = $('<canvas></canvas>');
				canvas.attr('id', 'canvas');
				main.empty();
				main.append(canvas);
				launchFullScreen(document.documentElement);
				canvas.width(window.innerWidth);
				Game.init();
			});
		});
	});
});
