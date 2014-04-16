$(document).keyup(function() {
	pressing = false;
});

$(document).keypress(function() {
	pressing = true;
});

function gravity(){
	if (playerPositionY <= horizon && jump == 0){
		playerPositionY += gravitySpeed * fallLength;
		fallLength++;
		if (playerPositionY >= horizon){
			playerPositionY == horizon;
			fallLength = 1;
			jump = 0;
		}
		updated = true;
	}
	if (jump != 0){
		startJump();
	}
}

function startJump(){
	if (jump == jumpLength){
		jump = 0;
	} else{
		playerPositionY -= jumpHeight - (jumpHeight / jumpLength*jump);
		jump++;
	}
	updated = true;
}

function horizontal(direction){
	if (((-mapPositionX < mapWidth - 600 && direction < 0) || (-mapPositionX > 0 && direction > 0)) && playerPositionX == 270){
		mapPositionX += direction;
		backPositionX-= direction/2;
		updated = true;
	} else if ((-mapPositionX < 10 && direction > 0) || (-mapPositionX > mapWidth-610 && direction < 0)){
		if (playerPositionX > 20 && playerPositionX < 560){
			playerPositionX -= direction;
			updated = true;
		}
	} else{
		playerPositionX -= direction;
		updated = true;		
	}

	overallX = playerPositionX - mapPositionX;

	if (overallX <= 40){
		horizon = 500;
	} else if (overallX >= 520){
		horizon = 250
	} 
	else {
		horizon = 400
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