// Update 
    function updateGame(){
        collisionTest();
      setValues();
        jwertyTest();
    	gravity();

    }
//draw
    function drawGame(){
    	$('.bg').css('left',mapPositionX + 'px');
    	$('.bg').css('top',mapPositionY + 'px');
        $('.background').css('left',backPositionX + 'px');
        $('.background').css('top',backPositionY + 'px');
    	$('#player').css('left',playerPositionX + 'px');
    	$('#player').css('top',playerPositionY + 'px');
        runSprites();
    }

// Game Loop
    var mainloop = function() {
        updateGame();
        if (updated){
        	drawGame();
    	}
    	updated = false;
    };


    var ONE_FRAME_TIME = 1000.0 / 120.0 ;
    intervalId = setInterval( mainloop, ONE_FRAME_TIME );
