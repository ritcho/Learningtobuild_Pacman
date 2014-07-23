ig.module( 'game.entities.blobby' )

.requires( 'impact.entity' )

.defines (function(){


EntityBlobby = ig.Entity.extend({

	size: {x:42, y:44},
	//offset: {x:24, y:0},
	maxVel: {x:100, y:100},
	friction: {x:150, y:0},

	speed: 36,
	flip: false,


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




	}, // end INIT

	update: function(){

		

		// if going left -1 on x or else 1
		var xdir = this.flip ? -1 : 1; 
		
		// speed controlled by turning durection
		this.vel.x = this.speed * xdir; 
		this.vel.y = this.speed * xdir;

		this.currentAnim.flip.x = !this.flip; 

		this.parent(); 
		// console.log(this.vel.x); 

		

		// SCATTER MODE

		//this.pos.x = 96;
		//this.pos.y = -34; 


		///*
		
		// ENEMY TO MOVE TOWARDS PLAYER 

		var puck = ig.game.getEntitiesByType( EntityPuck )[0];

    	
        if ( this.distanceTo( ig.game.puck) < 250 ) {
        var targetX = 0;
        var targetY = 0;
        
        targetX = puck.pos.x;
        targetY = puck.pos.y;
       
        }

        // Facing Left or Right

        if ( targetX < this.pos.x ) {
            
            this.flip = true;
            this.speed = 120;
            this.vel.x = this.speed * xdir;
            
        } 

        

        else if ( targetX > this.pos.x ) {
            
            this.flip = false;
            this.speed = 120;
            this.vel.x = this.speed * xdir;
            
        } 


        // Up & Down

        else if ( targetY > this.pos.y ) {
            
            this.flip = false;
            this.speed = 120;
            this.vel.y = this.speed * xdir;
            
        } 

        else if ( targetY > this.pos.y ) {
            
            this.flip = false;
            this.speed = 120;
            this.vel.y = this.speed * xdir;
            
        } 



        // NORMAL

        else {
            
            this.speed = 36;
            this.vel.x = this.speed * xdir;
            
        }


        // Shortcut to other side

		if (this.pos.x > 768){


			this.pos.x = 2;
			this.pos.y = 312; 

		}


		else if (this.pos.x < 0){


			this.pos.x = 760;
			this.pos.y = 312; 

		}






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



