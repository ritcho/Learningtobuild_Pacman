ig.module( 'game.entities.blobby' )

.requires( 'impact.entity' )

.defines (function(){


EntityBlobby = ig.Entity.extend({

	size: {x:42, y:44},
	//offset: {x:24, y:0},
	maxVel: {x:100, y:100},
	friction: {x:150, y:0},

	speed: 56,
	flip: false,
	pathTimer: null,


	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,

	// animation sheet

	animSheet: new ig.AnimationSheet( 'media/enemy_2.png', 44, 42), 
	
	// sound 
	sfxDie: new ig.Sound( 'media/sounds/blob-die.*'),


	// INIT
	init: function ( x,y, settings){

		this.parent(x,y,settings);

		this.addAnim( 'crawl', 0.1, [0] );
		this.addAnim( 'ghost', 1, [4] ); 

		ig.game.blobby = this;

		this.pathTimer = new ig.Timer(2); 
		console.log(ig.game.puck.nutsTime + " ok..."); 


	}, // end INIT

	update: function(){

		// Update it every 2 seconds
		if(this.pathTimer.delta() > 0) {
			// Get the path to the player
			this.getPath(ig.game.puck.pos.x, ig.game.puck.pos.y, false);
			this.speed = 56;
			this.pathTimer.reset();
		}


		// if pac collects a token they need to change path
		// Change Direction

		if (ig.game.puck.nutsTime === true){

			this.speed = 15;
			// Get a path to nowhere
			this.getPath(64, 160, false);

		}


		// Walk the path
		this.followPath(this.speed, false);

		// Update the animation
		this.currentAnim.gotoFrame(this.headingDirection);

		


        // Shortcut to other side

		if (this.pos.x > 768){


			this.pos.x = 2;
			this.pos.y = 312; 

		}


		else if (this.pos.x < 0){


			this.pos.x = 760;
			this.pos.y = 312; 

		}


		this.parent();



//*/

	}, // end UPDATE

	

	kill: function() {

		this.sfxDie.play(); 
		this.parent();
		console.log(ig.game.puck.nutsTime);

	}, // end kill


	handleMovementTrace: function(res){

		this.parent(res); 

		// collision with wall

		if (res.collision.x) {

			//this.flip = !this.flip;
			this.offset.x = this.flip ? 0 :10;

		} // end if 

		else if (res.collision.y) {

			//this.flip = !this.flip;
			this.offset.y = this.flip ? 0 :10;

		} // end if 


	}, // end HANDLEMOVEMENT


	check: function(other){

		// if pac has a token then can kill ghost

		if(ig.game.puck.nutsTime === false){

			other.receiveDamage(1, this); 

			}
		}

	
	







}); // end EntityBlobby



}); // end defines



