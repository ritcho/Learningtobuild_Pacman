ig.module(
	'game.entities.token'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityToken = ig.Entity.extend({
	
	size: {x:40, y:40},

	type: ig.Entity.TYPE.B, // Player friendly group
	checkAgainst: ig.Entity.TYPE.A,
	
	collides: ig.Entity.COLLIDES.LITE,

	health: 1, 
	
	animSheet: new ig.AnimationSheet( 'media/token.png', 40, 40 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
	},


	kill: function(){

		this.parent();


	},

});

});