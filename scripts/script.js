$(document).ready(function(){
//We create some variables in order to hold the objects and values we will use further on
//we try to cache as many objects as posible in order to improve performance
var $block;
var $rowInit;
var $rowClose;
var color = "#000000";
var currentSize = 32;
var drawing = false;
var randomColors = false;
var rainButton = $('#rainbowButton');
var myCanvas = $('#canvas');
var header = $('h1');

//We draw the canvas with default settings
makeCanvas(800, 600, currentSize);
$('.size').val(currentSize);

rainButton.on('click', function(){
	randomColors = !randomColors;

	if (randomColors){
		rainButton.css('box-shadow' , '0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)');
		rainButton.css('background-color' , '#9D9D9D');
	}else{
		rainButton.css('box-shadow' , 	'0 4px 4px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)');
		rainButton.css('background-color' , '#CBCBCB');	
	}
});

rainButton.on('mouseenter',function(){
	if (randomColors){
		rainButton.css('background-color' , '#9D9D9D');
		rainButton.css('cursor', 'pointer');
	}else{
		rainButton.css('background-color' , '#CBCBCB');
		rainButton.css('cursor', 'pointer');
	}
});

rainButton.on('mouseleave',function(){
	if (randomColors){
		rainButton.css('box-shadow' , '0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)');
		rainButton.css('background-color' , '#929292');
		rainButton.css('cursor', 'default');
	}else{
		rainButton.css('box-shadow' , 	'0 4px 4px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)');
		rainButton.css('background-color' , '#F9F9F9');	
		rainButton.css('cursor', 'default');
	}
});

myCanvas.on('click', function(){
	drawing = !drawing;
});

//This is the main painting tool, the color is changed here
//You may notice that the way we call this event is different from usual,
//the reason for this is because the new blorainButtoncks from changing sizes are being added after
//this event is called it's necessary for us to use Event delegation (http://learn.jquery.com/events/event-delegation/)
//in order for these new objects to be accessed by our event
myCanvas.on('mouseenter','.block', function(){
	if (drawing){
		if(randomColors){
			this.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
			header.css('color',  '#'+(Math.random()*0xFFFFFF<<0).toString(16));
		}else{
			this.style.backgroundColor = color;
			header.css('color',  '#000000');
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
myCanvas.css('width', ((Math.ceil(width / size))*size) + 'px');
myCanvas.css('height', ((Math.ceil(height / size))*size) + 'px');

//We fill out the canvas with the rows that will hold our blocks
for(var i=0; i<size; i++){
	$rowInit = $("<div class='rowContainer'>");
	myCanvas.append($rowInit);
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