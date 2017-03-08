$(document).ready(function(){
//We create some variables in order to hold the objects and values we will use further on
var $block;
var $rowInit;
var $rowClose;
var colorBlack = '#000000';
var currentColor = colorBlack;
var currentSize = 32;
var drawing = false;

//We draw the canvas with default settings
makeCanvas(800, 600, currentSize);

$('#canvas').on('click', function(){
	drawing = !drawing;
});

//This is the main painting tool, the color is changed here
$('.block').on('mouseenter', function(){
	if (drawing){
		$(this).css('background-color', 'currentColor');
	}
});

$('#clearButton').on('click', function(){
	$('#canvas').find('.block').css('background-color', '#ffffff');
});
//I use this mainly for debugging purposes, these returns the blocks we exit the mouse out of to their regular color
/*$('.block').on('mouseleave', function(){
	$(this).css('background-color', '#ffffff');
});*/







//This function is what redraws the canvas in case of any changes
function makeCanvas(width, height, size){
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

});