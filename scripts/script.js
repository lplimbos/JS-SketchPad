$(document).ready(function(){
//We create some variables in order to hold the objects and values we will use further on
var $block;
var $rowInit;
var $rowClose;
var colorBlack = '#000000';
var currentColor = colorBlack;
var currentSize = 32;

//We make the size of the canvas to be the exact same width and height as the sum of all the blocks
$('#canvas').css('width', ((Math.ceil(800 / currentSize))*currentSize) + 'px');
$('#canvas').css('height', ((Math.ceil(600 / currentSize))*currentSize) + 'px');

//We fill out the canvas with the rows that will hold our blocks
for(var i=0; i<currentSize; i++){
	$rowInit = $("<div class='rowContainer'>");
	$('#canvas').append($rowInit);
}
//We make the rows be the exact height we need to fill our canvas
$('.rowContainer').css('height', Math.ceil(600 / currentSize) + 'px');

//This is used for the same reason as the rows but instead we fill all the rows with our blocks(at the same time!)
for(var j=0; j<currentSize; j++){
	$block = $("<div class='block'></div>");
	$('.rowContainer').append($block);
}
//The blocks are then fitted to the canvas perfectly
$('.block').css('width', Math.ceil(800 / currentSize) + 'px');

//This is the main painting tool, the color is changed here
$('.block').on('mouseenter', function(){
	$(this).css('background-color', 'currentColor');
});

//I use this mainly for debugging purposes, these returns the blocks we exit the mouse out of to their regular color
/*$('.block').on('mouseleave', function(){
	$(this).css('background-color', '#ffffff');
});*/

});