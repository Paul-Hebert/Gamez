$(document).keyup(function() {
	pressing = false;
});

$(document).keypress(function() {
	pressing = true;
});

function setValues(){
	originalMapX = mapPositionX;
	originalPlayerX = playerPositionX;
	originalPlayerY = playerPositionY;
}

function gravity(){
	if (playerPositionY <= horizon && jump == 0){
		playerPositionY += gravitySpeed * fallLength;
		fallLength++;
		if (playerPositionY >= horizon - 100 && jump == 0){
			playerPositionY == horizon - 100;
			fallLength = 1;
			jump = 0;
		}
		updated = true;
	}
	if (jump != 0){
		startJump();
	}
	collisionTest();
}

function startJump(){
	if (jump == jumpLength){
		jump = 0;
		horizon = 600;
	} else{
		playerPositionY -= jumpHeight - (jumpHeight / jumpLength*jump);
		jump++;
	}
	updated = true;
	collisionTest();
}

function horizontal(direction){
	direction2 = direction;
	if (((-mapPositionX < mapWidth - 600 && direction < 0) || (-mapPositionX > 0 && direction > 0)) && playerPositionX == 270){
		mapPositionX += direction;
		backPositionX-= direction*7/8;
		updated = true;
	} else if ((-mapPositionX < 10 && direction > 0) || (-mapPositionX > mapWidth-610 && direction < 0)){
		if (playerPositionX > 4 && playerPositionX < 548){
			playerPositionX -= direction;
			updated = true;
		}
	} else{
		playerPositionX -= direction;
		updated = true;		
	}

	overallX = playerPositionX - mapPositionX;

	if (overallX <= 40){
		horizon = 537;
	} else if (overallX >= 520){
		horizon = 260;
	} 
	else {
		horizon = 410;
	}
	collisionTest();
}

function collisionTest(){
	// Check goal
		if (overallX + 20 > goalX && overallX < goalX +60 && playerPositionY < goalY && playerPositionY > goalY -60){
			clearInterval(intervalId);
			window.location="index.html";
		}
}

function jwertyTest(){
	if (pressing == true){
		jwerty.key('w', function () { 
			if (playerPositionY > horizon){
				startJump(); 
			}
		});
		jwerty.key('d', function () { horizontal(-speed); });
		jwerty.key('a', function () { horizontal(speed); });
	}
}

function runSprites(){
	if (jump != 0){
		spriteLoop = 20;
	} else{
	spriteLoop = 1;
	}
	if (direction2 < 0){
		spriteNum = 1;
	} else {
		spriteNum = 2;
	}
	if (spriteLoop <= spriteCount){
		spriteCount = 0;
		sprites -= 63;
		if (sprites < -1000){
			sprites = 0;
		}
		$('#player').css("background","url('imgs/sprites" + spriteNum + ".png') " + sprites + "px 0px");
	}

	spriteCount++;
}