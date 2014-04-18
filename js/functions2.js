
// Sets positions at beginning of update
	function setValues(){
		originalMapX = mapPositionX;
		originalPlayerX = playerPositionX;
		originalPlayerY = playerPositionY;
	}

//Applies gravity
	function gravity(){
		if (playerPositionY <= horizon && jump == 0){ // If falling, fall
			playerPositionY += gravitySpeed * fallLength;
			fallLength++;

			updated = true;
		} else if (fallLength != 1){ // If falling, but below horizon
			playerPositionY -= 50;
			horizon -= 50;

			fallLength = 1;
			updated = true;
		} 
		if (jump != 0){ // If jumping
			startJump();
		}
		if (playerPositionY > 600){
			alert('Womp, womp, womp');
			window.location="index.html";
		}
	}

//If jumping during gravity()
	function startJump(){
		if (jump == jumpLength){ // If it max height, end jump and start falling.
			jump = 0;
			horizon = 900;
		} else{ // otherwise keep jumping.
			playerPositionY -= jumpHeight - (jumpHeight / jumpLength*jump);
			jump++;
		}
		updated = true;
	}
// Horizontal movement
horizonCheck=0
	function horizontal(direction2){
		direction = direction2; //Sets direction globally to be used for sprites
		if (((-mapPositionX < mapWidth - 600 && direction < 0) || (-mapPositionX > 0 && direction > 0)) && playerPositionX == 270){ // Move map if there's space.
			mapPositionX += direction;
			backPositionX-= direction*7/8;
			updated = true;
		} else if ((-mapPositionX < 10 && direction > 0) || (-mapPositionX > mapWidth-610 && direction < 0)){ //Move the player if at edge of map.
			if (playerPositionX > 4 && playerPositionX < 548){
				playerPositionX -= direction;
				updated = true;
			}
		} else{ //If running into map border.
			playerPositionX -= direction;
			updated = true;	
		}
		overallX = playerPositionX - mapPositionX; //Sets overall position that map elements are based upon.
		horizonCheck ++;
		if ( collision == false){
			horizonCheck = 1;
			playerPositionY += 50;
			horizon -= 50;

			fallLength = 1;
			updated = true;
		}
	}

//Collision testing
	function collisionTest(){
		i = 0;
		collisionNum++;

		while (i != 2){
		i++;
		checkCollision('platform' + i);

		}

		if (collision == false && collisionNum == 50){
			jump = jumpLength;
			startJump();
			collisionNum = 0;
		}
		// Check goal
			if (overallX + 20 > goalX && overallX < goalX +60 && playerPositionY < goalY && playerPositionY > goalY -60){
				clearInterval(intervalId);
				window.location="index.html";
			}
	}

function checkCollision(object){
		platformLeft = $("#" + object +"").css('left');
		platformLeft = parseFloat(platformLeft.substr(0, (platformLeft.length - 2)));

		platformRight = $("#" + object +"").css('width');
		platformRight = parseFloat(platformRight.substr(0, (platformRight.length - 2)));
		platformRight += platformLeft;


		platformTop = $("#" + object +"").css('top');
		platformTop = parseFloat(platformTop.substr(0, (platformTop.length - 2)));

		platformBottom = $("#" + object +"").css('height');
		platformBottom = parseFloat(platformBottom.substr(0, (platformBottom.length - 2)));
		platformBottom += platformTop;

			if (overallX > platformLeft && overallX < platformRight && playerPositionY < platformBottom && playerPositionY > platformTop){
				if (originalPlayerY < platformTop){
					horizon = platformTop;
					jump = 0;

				}
					collision = true;
			}
}

function jwertyTest(){
	jwerty.key('w', function () { 
		if (playerPositionY > horizon){
			startJump(); 
		}
	});
	jwerty.key('d', function () { horizontal(-speed); });
	jwerty.key('a', function () { horizontal(speed); });
}
spriteLoop=1

function runSprites(){

	if (direction < 0){
		spriteNum = 1;
	} else {
		spriteNum = 2;
	}
	if (spriteLoop <= spriteCount){
		spriteCount = 0;
		sprites -= 63;
		if (sprites < -spriteWidth){
			sprites = 0;
		}
		$('#player').css("background","url('imgs/sprites" + spriteNum + ".png') " + sprites + "px 0px");
	}

	spriteCount++;
}