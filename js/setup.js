mapPositionX=0;
mapPositionY=0;
playerPositionX=270;
playerPositionY=400;
backPositionX=0;
backPositionY=0;
horizon=450;
direction = 1;
spriteWidth = 1000;

sprites = 0;
spriteCount = 0;
direction2 = -5;

goalX = 900;
goalY = 270;

overallX = playerPositionX - mapPositionX;

speed=1/10;

jump=0;
jumpHeight = 10;
jumpLength = 50;
fallLength = 0;
gravitySpeed = 1/2;

mapWidth = document.getElementById('currentBG').clientWidth;

collision = false;
collisionNum= 0;