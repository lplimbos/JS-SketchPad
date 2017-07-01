$(document).ready(function(){
//We create some variables in order to hold the objects and values we will use further on
var $block;
var $rowInit;
var $rowClose;
var color = "#000000";
var currentSize = 32;
var drawing = false;
var randomColors = false;

//We draw the canvas with default settings
makeCanvas(800, 600, currentSize);
$('.size').val(currentSize);

$('#rainbowButton').on('click', function(){
	randomColors = !randomColors;

	if (randomColors){
		$('#rainbowButton').css('box-shadow' , '0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)');
		$('#rainbowButton').css('background-color' , '#9D9D9D');
	}else{
		$('#rainbowButton').css('box-shadow' , 	'0 4px 4px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)');
		$('#rainbowButton').css('background-color' , '#CBCBCB');	
	}
});

$('#rainbowButton').on('mouseenter',function(){
	if (randomColors){
		$('#rainbowButton').css('background-color' , '#9D9D9D');
		$('#rainbowButton').css('cursor', 'pointer');
	}else{
		$('#rainbowButton').css('background-color' , '#CBCBCB');
		$('#rainbowButton').css('cursor', 'pointer');
	}
});

$('#rainbowButton').on('mouseleave',function(){
	if (randomColors){
		$('#rainbowButton').css('box-shadow' , '0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)');
		$('#rainbowButton').css('background-color' , '#929292');
		$('#rainbowButton').css('cursor', 'default');
	}else{
		$('#rainbowButton').css('box-shadow' , 	'0 4px 4px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)');
		$('#rainbowButton').css('background-color' , '#F9F9F9');	
		$('#rainbowButton').css('cursor', 'default');
	}
});

$('#canvas').on('click', function(){
	drawing = !drawing;
});

//This is the main painting tool, the color is changed here
//You may notice that the way we call this event is different from usual,
//the reason for this is because the new blocks from changing sizes are being added after
//this event is called it's necessary for us to use Event delegation (http://learn.jquery.com/events/event-delegation/)
//in order for these new objects to be accessed by our event
$('#canvas').on('mouseenter','.block', function(){
	if (drawing){
		if(randomColors){
			$(this).css('background-color', '#'+(Math.random()*0xFFFFFF<<0).toString(16));
		}else{
			$(this).css('background-color', color);
		}
	}
});

$('#clearButton').on('click', function(){
	$('.rowContainer').remove();
	currentSize = $('.size').val();
	makeCanvas(800, 600, currentSize);
});
//I use this mainly for debugging purposes, these returns the blocks we exit the mouse out of to their regular color
/*$('.block').on('mouseleave', function(){
	$(this).css('background-color', '#ffffff');
});*/




//This function is what redraws the canvas in case of any changes
function makeCanvas(width, height, size){
$('body').append('<div id="canvas"></div>');
//We make the size of the canvas to be the exact same width and height as the sum of all the blocks
$('#canvas').css('width', ((Math.ceil(width / size))*size) + 'px');
$('#canvas').css('height', ((Math.ceil(height / size))*size) + 'px');

//We fill out the canvas with the rows that will hold our blocks
for(var i=0; i<size; i++){
	$rowInit = $("<div class='rowContainer'>");
	$('#canvas').append($rowInit);
}
//We make the rows be the exact height we need to fill our canvas
$('.rowContainer').css('height', Math.ceil(height / size) + 'px');

//This is used for the same reason as the rows but instead we fill all the rows with our blocks(at the same time!)
for(var j=0; j<size; j++){
	$block = $("<div class='block'></div>");
	$('.rowContainer').append($block);
}
//The blocks are then fitted to the canvas perfectly
$('.block').css('width', Math.ceil(width / size) + 'px');
$('.block').css('height', Math.ceil(height / size) + 'px');
}
//We prevent the user from inputting characters into the size field
$('.size').on('keypress',function(event){
	var key = (event.which) ? event.which : event.keyCode;
	if (key > 31 && (key < 48 || key > 57)) 
		return false;
});


});