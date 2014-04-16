function updateGame(){
	gravity();
	jwertyTest();
}

function drawGame(){
    $('.bg').css('left',mapPositionX + 'px');
    $('.bg').css('top',mapPositionY + 'px');
    $('.background').css('left',backPositionX + 'px');
    $('.background').css('top',backPositionY + 'px');
    $('#player').css('left',playerPositionX + 'px');
    $('#player').css('top',playerPositionY + 'px');
    runSprites();
}

<!-- Game Loop -->
    var mainloop = function() {
        updateGame();
        if (updated){
        	drawGame();
    	}
    	updated = false;
    };

var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var lastTime;
function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    updateGame(dt);
    drawGame();

    lastTime = now;
    requestAnimFrame(main);
};

main();