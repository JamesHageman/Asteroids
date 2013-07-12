require(['js/lib/create.js',
		'js/lib/underscore.js',
		'js/lib/hand.js',
		'js/src/Game.js'],
function() {
	require(['js/src/Background.js',
			'js/src/Bullet.js',
			'js/src/Asteroid.js',
			'js/src/Ship.js',
			'js/src/LevelController.js',
			'js/data/asteroidPoints.js',
			'js/data/shipPoints.js',
			'js/data/asteroidPositions.js'],
	function() {
		Game.init();
	});
});
