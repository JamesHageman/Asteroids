require(['js/lib/create.js',
		'js/lib/underscore.js',
		'js/lib/hand.js'],
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
			Game.init();
		});
	});
});
