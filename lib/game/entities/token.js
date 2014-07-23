ig.module(
	'game.entities.token'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityToken = ig.Entity.extend({
	
	size: {x:40, y:40},

	name: 'token', 

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.NEVER,

	health: 1, 
	
	animSheet: new ig.AnimationSheet( 'media/token.png', 40, 40 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		ig.game.token = this; 
	},


	check: function( other ) {
		// The instanceof should always be true, since the player is
		// the only entity with TYPE.A - and we only check against A.
		if( other instanceof EntityPuck ) {
			console.log("picked up " + ig.game.puck.goNuts + " tokens");
			ig.game.puck.nuts(1); // add 1 token to var
			ig.game.puck.powerUP(); // get special powers
			this.kill();

		}
	}

});

});