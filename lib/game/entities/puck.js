ig.module(
	'game.entities.puck'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPuck = ig.Entity.extend({

	size: {x:40, y:43},
    
	//flip: false,
	
	goNuts: 0, // STORE TOTAL TOKENS

	nutsTime: false,
	
	
	// Let's handle group and collisions

	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.PASSIVE,


	// animations sheet

	animSheet: new ig.AnimationSheet( 'media/pac.png', 40, 43 ),

	

	init: function(x,y,settings){

		this.parent(x,y,settings);

		this.addAnim( 'idle', 0.2, [0,1] );
		this.addAnim( 'crazy', 0.1, [0,1] );

		// set ref to player on the game instance 

		ig.game.puck = this; 

		ig.global.countPills = 0;
		ig.global.livesLeft = 3;
		ig.global.myTimer = new ig.Timer();
		
		
		


	}, // init 

	update: function(){

		

		// PLAYER CONTROLS


		// accelation = if still moveforward or jump depending. 
		var accel = this.standing ? this.accelGround : this.accelAir; 
		
		// LEFT: GO BACK
		if (ig.input.state('left')){

			this.vel.x = -260;
			this.currentAnim.angle = -110;
			//this.currentAnim.flip.x = true;  
		}

		// RIGHT: GO FORWARD

		else if (ig.input.state('right')){

			this.vel.x = 260; 
			//this.currentAnim.flip.x = false; 
			this.currentAnim.angle = 0; 
		}

		// UP:

		else if (ig.input.state('up')){

			this.vel.y = -260
			this.currentAnim.angle = -165;
		}

		// DOWN:

		else if (ig.input.state('down')){

			this.vel.y = 260 
			this.currentAnim.angle = -55;  
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

		}

		console.log(countPills); 



		// CHECK TO SEE IF COLLECTED ALL 107 IE WON GAME

		if(countPills === 103){

			console.log("you won!");

			// Restart this level
			ig.game.loadLevel( LevelMain );
		
		}



		// Shortcut to other side

		if (this.pos.x > 768){

			this.pos.x = 2;
			this.pos.y = 312; }

		else if (this.pos.x < 0){

			this.pos.x = 760;
			this.pos.y = 312; }



		
		// CONTROL DURATION OF TOKEN POWERS

		var getSec = myTimer.delta();
		//console.log(getSec); 

		// crap timer should get updated but works
		if( getSec > -5 && getSec  < -4){

		console.log("powerUP mode OFF");
		ig.game.puck.nutsTime = false; 

		// Make Pac bite normal
		ig.game.puck.currentAnim = ig.game.puck.anims.idle;
		
		// Make Ghosts change Anim back to normal 
		ig.game.blobby.currentAnim = ig.game.blobby.anims.crawl;
		ig.game.e_green.currentAnim = ig.game.e_green.anims.crawl;
		ig.game.e_pink.currentAnim = ig.game.e_pink.anims.crawl;
		ig.game.e_orange.currentAnim = ig.game.e_orange.anims.crawl;
		
		} // if




		}, // update


		// What happens when you collect a token

		powerUP: function(){

		// start the timer at -10
		myTimer.set(10);
		
		ig.game.puck.nutsTime = true;
		console.log("powerUP mode ON " + ig.game.puck.nutsTime); 
		
		// Make Pac bite faster 
		ig.game.puck.currentAnim = ig.game.puck.anims.crazy;
		// Make Ghosts change to Blue
		ig.game.blobby.currentAnim = ig.game.blobby.anims.ghost;
		ig.game.e_green.currentAnim = ig.game.e_green.anims.ghost;
		ig.game.e_pink.currentAnim = ig.game.e_pink.anims.ghost;
		ig.game.e_orange.currentAnim = ig.game.e_orange.anims.ghost;

		}, //powerUp
	




	
		kill: function() {

		livesLeft -= 1; 
		console.log("you have " + livesLeft + " lives left"); 

		// check if lives left is -3
		if (livesLeft < 1){
			
			// Reload this level
			ig.game.loadLevel( LevelMain );
			ig.game.getMapByName("pillMap").setTile(1);
			console.log("you have died"); 
			livesLeft = 3;

		}

		else {

			// lose a life and restart here
			ig.game.puck.pos.x = 2;
			ig.game.puck.pos.y = 312;

		}


		//this.parent();

		
		}, // kill

		// FUNCTION TO ADD TOKEN TO VAR

		nuts: function(amount){

			ig.game.puck.goNuts += amount;
			
			
		},



		check: function(other){

		// if collected token then can kill ghost

		if(ig.game.puck.nutsTime === true){

			other.receiveDamage(1, this); 

			}
		}
		


		

    

}); // entityplayer 

}); // defines