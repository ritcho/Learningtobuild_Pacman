ig.module(
	'game.entities.puck'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPuck = ig.Entity.extend({

	size: {x:40, y:43},
    //offset: {x: 27, y: 10},
	//maxVel: {x:400, y:800},
	//friction: {x: 800, y: 0},
	
	flip: false,
	//accelGround:1200,
	//jump: 950,	
	//accelAir: 600,
	
	
	// Let's handle group and collisions

	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.PASSIVE,


	// animations sheet

	animSheet: new ig.AnimationSheet( 'media/pac.png', 40, 43 ),

	

	init: function(x,y,settings){

		this.parent(x,y,settings);

		this.addAnim( 'idle', 0.2, [0,1] );

		// set ref to player on the game instance 

		ig.game.puck = this; 

		ig.global.countPills = 0;
		ig.global.livesLeft = 3;



		


	}, // init 

	update: function(){

		

		// PLAYER CONTROLS


		// accelation = if still moveforward or jump depending. 
		var accel = this.standing ? this.accelGround : this.accelAir; 
		
		// LEFT: GO BACK
		if (ig.input.state('left')){

			this.vel.x = -260;
			this.currentAnim.flip.x = true;  
		}

		// RIGHT: GO FORWARD

		else if (ig.input.state('right')){

			this.vel.x = 260; 
			this.currentAnim.flip.x = false;  
		}

		// UP:

		else if (ig.input.state('up')){

			this.vel.y = -260
			//this.currentAnim.flip.y = true;  
		}

		// DOWN:

		else if (ig.input.state('down')){

			this.vel.y = 260 
			//this.currentAnim.flip.y = false;  
		}

		// OR BE STILL
		else { this.vel.x = 0, this.vel.y = 0; }

		
		// MOVE!!
		this.parent(); 






		// Pick up Pill and then remove from background

		var pillsMap = ig.game.getMapByName("pillMap"); 

		var checkX = this.pos.x;
		var checkY = this.pos.y;

		var tileX = checkX;
		var tileY = checkY;

		var findTile = pillsMap.getTile(tileX,tileY);

		

		if (findTile === 1){
			
			pillsMap.setTile(tileX, tileY, 0);
			countPills ++;  
			//console.log(tileX,tileY); 
			
		}

		console.log(countPills); 



		// CHECK TO SEE IF COLLECTED ALL 107

		if(countPills === 107){

			console.log("you won!");

			// Restart this level
			ig.game.loadLevel( LevelMain );
		
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





		}, // update
	
	
		kill: function() {

		livesLeft -= 1; 
		console.log("you have " + livesLeft + " lives left"); 

		// check if lives left is -3
		if (livesLeft < 1){
			
			// Reload this level
			ig.game.loadLevel( LevelMain );
			console.log("you have died"); 
			livesLeft = 3;

		}

		else {

			ig.game.puck.pos.x = 2;
			ig.game.puck.pos.y = 312;

		}


		//this.parent();

		
		
		
		},


		check: function(other){

		var tokens = this.getEntityByType('EntityToken'); 

		if(other = tokens){

			console.log("it works"); 
			other.receiveDamage(1, this); 

		} 

		else {console.log("nothing")}

		}	
		


		

    

}); // entityplayer 

}); // defines