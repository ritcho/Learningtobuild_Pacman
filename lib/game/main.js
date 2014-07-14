ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	
	'game.entities.puck',
	'game.entities.blobby',
	
	'game.levels.main'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font for me
	font: new ig.Font( 'media/04b03.font.png' ),

	
	
	
	init: function() {
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );

		
		this.loadLevel( LevelMain );


	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
});


ig.main( '#canvas', MyGame, 60, 768, 672, 1 );

});
