var animationTime = 600;
var demoTimer = 0.1; 
var userLevel = 88;

var currentSet=0;


var state = "";

var benchmark;
var actionSpace;
var infoSpace;
var setBox = new Array();
var timer;


$(document).ready(function () {
	

	loadBenchmarkElements();
	//loadStartStage();
	loadNextSet();
	
});


//Procedurally make all the bench mars we need
function loadBenchmarks(){
	
	
	
	
	
}

function loadBenchmarkElements(){
	benchmark = $("#level"+userLevel);
	
	actionSpace = benchmark.find(".actionSpace");
	infoSpace = benchmark.find(".infoSpace");
	timer = benchmark.find(".timer");
	
	setBox[0] = benchmark.find(".c0");
	setBox[1] = benchmark.find(".c1");
	setBox[2] = benchmark.find(".c2");
	setBox[3] = benchmark.find(".c3");
	setBox[4] = benchmark.find(".c4");
	
	
}


	//Lower the setbox
	//IS -> Cool down time
	//AS - > Ready for the next set? (in grey)
	//start the timer
	//when the timer finishes degrey the next button
	//Click to load step two
function loadCoolDown(){
	
	changeText(infoSpace, "Time to cool down");
	changeText(actionSpace, "Ready for the next set?");
	disableActionSpace();
	lowerSetBox(currentSet);
	
	currentSet = currentSet + 1;
	
	startTimer();
}

	
	//IS - > Complete # pushups
	//AS -> Click here and start doing pushups
	//Move set box up
		//AS click -> Click here when your done
function loadNextSet(){

	changeText(infoSpace, "Complete ## Pushups!");
	changeText(actionSpace, "Click here and start doing pushups");
	
	actionSpace.click(function(){
		changeText(actionSpace, "Click here when your done");
		changeText(infoSpace, "I believe in you");
		raiseSetBox(currentSet);
		actionSpace.unbind("click");
		actionSpace.click(function(){ loadCoolDown();});
	});
}
////////UTILITY FUNCTIONS

function changeText(element, text){
	element.fadeOut(animationTime, function(){
		element.text(text);
		element.fadeIn(animationTime);
	});
}

function startTimer(){
	timer.fadeIn(animationTime, function(){
		var waitTime = (30 + userLevel%3 * 30)*demoTimer;
		timer.xotimer(waitTime, finishTimer);
	});
}

function finishTimer(){
	
	hideAndMoveTimer(currentSet);
	enableActionSpace();
	//activate actionspace
	//rebind action to be awesome
	// HIdeand move timer
}

function hideAndMoveTimer(index){
	timer.fadeOut(animationTime, function(){
		timer.css("marginLeft", 305 + index*120);
	});
}

function disableActionSpace(){
	actionSpace.removeClass("clickable");
	actionSpace.removeClass("redhvr");
	actionSpace.addClass("drkgrey");
	actionSpace.unbind("click");
}

function enableActionSpace(){
	actionSpace.addClass("clickable");
	actionSpace.addClass("redhvr");
	actionSpace.addClass("black");
	actionSpace.removeClass("grey");
	//adda  bind back in?
	
}

function raiseSetBox(index){
	setBox[index].animate({
			marginTop:"-10px"
		  }, animationTime, function() {});
}

function lowerSetBox(index){
	setBox[index].animate({
			marginTop:"20px"
		  }, animationTime, function() {});
}