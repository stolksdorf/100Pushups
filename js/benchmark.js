var fadeTime = 500;
var animationTime= 500;
var demoTimer = true;

var benchmark;
var action;
var content;
var container;
var setBox = new Array();

var timer;

//eat keypress to stop the page scrolling with spacebar
window.onkeydown = function(e) { 
  return !(e.keyCode == 32);
};

function loadBenchmarkElements(){
	benchmark = $("#level"+user.level);
	
	actionReg = benchmark.find(".regularContainer .actionSpace");
	actionReg.live("click", function(){
		regularStage(actionReg);
	});
		
	actionChallenge = benchmark.find(".challengeContainer .actionSpace") 
	actionChallenge.live("click", function(){
		challengeStage(actionChallenge);
	});

	content = benchmark.find(".contentBox");
	container = benchmark.find(".contentSpace");

	timer = benchmark.find(".timer");
	
	setBox[0] = benchmark.find(".c0");
	setBox[1] = benchmark.find(".c1");
	setBox[2] = benchmark.find(".c2");
	setBox[3] = benchmark.find(".c3");
	setBox[4] = benchmark.find(".c4");
}

////Action Button
function changeActionText(text){
	action.fadeOut(animationTime, function(){
		action.text(text);
		action.fadeIn(animationTime);
	});
}

function completeBenchmark(){
	var newLevel = user.level + 1;
	var fadeIn = function(){fadeInBenchmark(newLevel)};
	var scrollTo = function(){scrollToBenchmark(newLevel, 1000,fadeIn)};
	fadeOutBenchmark(user.level, scrollTo);
	
	$("#level"+newLevel).find(".actionSpace").text("Come back in a few days!");
	
	
	
	/*
	fadeInBenchmark(newLevel);
	scrollToBenchmark(newLevel, 1000);
	fadeOutBenchmark(currLevel);
	*/
}

function failBenchmark(){
	changeActionText("Try again in a few days");
	disableActionBtn();
}

function fadeInBenchmark(index, callback){
	var newBenchmark = $("#level"+index);
	newBenchmark.find(".levelSpace").animate( 
		{opacity:1.0},animationTime);
		
	newBenchmark.find(".regularContainer").animate( 
		{opacity:1.0},animationTime);
	newBenchmark.find(".actionSpace").fadeIn(animationTime, 
		function(){ if(callback) callback();});
}

function fadeOutBenchmark(index, callback){
	var oldBenchmark = $("#level"+user.level);
	oldBenchmark.find(".completeBar").fadeIn(400);
	oldBenchmark.find(".levelSpace").animate( 
		{opacity:0.4},animationTime);
	oldBenchmark.find(".regularContainer").animate( 
		{opacity:0.4},animationTime);
	oldBenchmark.find(".actionSpace").fadeOut(animationTime, 
		function(){ if(callback) callback();});
}

///////////////////////Regular Animations
var currStage = 3; //change to 0  after testing

//Setup Regular Benchmark process
function regularStage(actionBtn){
	action = actionBtn;
	runStage();
}

function runStage(){
	raiseSetBox(currStage);
	changeActionText("Cooldown Time");
	enableActionBtn(runCoolDown);
}

function runCoolDown(stage){
	lowerSetBox(currStage);
	changeActionText("Begin next set");
	disableActionBtn();
	showTimer(currStage);
	currStage = currStage + 1;
}

function runFinalStage(){
	raiseSetBox(4);
	changeActionText("Go To Fail!");
	enableActionBtn(setupSubmit);
}

function setupSubmit(){
//overlap setboxes
	setBox[4].animate({
			marginTop:"20px"
		  }, animationTime, function() {
		setBox[1].animate({marginLeft:'-80px'}, animationTime);
		setBox[2].animate({marginLeft:'-80px'}, animationTime);
		setBox[3].animate({marginLeft:'-80px'}, animationTime);
		setBox[4].animate({marginLeft:'-80px'}, animationTime, 
			function(){
				benchmark.find(".submit").fadeIn(animationTime);
				changeActionText("Submit");
				enableActionBtn(regularSubmit);
			}
		);
	});
}

function unsetupSubmit(){
	benchmark.find(".submit").fadeOut(animationTime, function(){
		setBox[1].animate({marginLeft:'0px'}, animationTime);
		setBox[2].animate({marginLeft:'0px'}, animationTime);
		setBox[3].animate({marginLeft:'0px'}, animationTime);
		setBox[4].animate({marginLeft:'0px'}, animationTime);
	});
}

function regularSubmit(){
	unsetupSubmit();
	changeActionText("Sending...");
	action.removeClass("clickable");
	action.removeClass("redhvr");
	
	var limitPushups = benchmark.find("#regularCount").val();
	
	if(limitPushups < program[user.level][4])
		failedBenchmark(limitPushups, regularFailedRecieved);
	else
		passedBenchmark(limitPushups, regularPassedRecieved);
}

function regularPassedRecieved(){
	changeActionText("Sent!");
	updateLevel(user.level + 1);
	setTimeout("completeBenchmark()", 700);
}


function regularFailedRecieved(){
	changeActionText("Sent!");
	setTimeout("failBenchmark()", 700);
}


//////WHAT TO DO NEXT
/*
- Build the submitting and submitted functions
- Build the submittal API: Challenge/Regular, Limit reached, total pushups, etc.
 */

 





function enableActionBtn(trigger){
	action.addClass("clickable");
	action.addClass("redhvr");
	action.addClass("black");
	action.removeClass("lghtgrey");
	action.die();
	action.live("click", function(){trigger();});
	
	//Add trigger for space bar
	$("body").unbind("keyup");
	$("body").bind("keyup", function(event){
		if(event.keyCode == 32) trigger();
	});
}

function disableActionBtn(){
	action.removeClass("clickable");
	action.removeClass("redhvr");
	action.removeClass("black");
	action.addClass("lghtgrey");
	action.die();
	$("body").unbind("keyup");
}

////Timer Junk
function showTimer(setBoxIndex){
	timer.css("marginLeft", 275 + setBoxIndex*135);
	var waitTime = (30 + user.level%3 * 30); 
	if(demoTimer) waitTime = 3; //for faster testing
	timer.text(waitTime);
	timer.fadeIn(animationTime, function(){
		timer.xotimer(waitTime, finishTimer);
	});
}

function finishTimer(){
	timer.fadeOut(animationTime);
	if(currStage == 4) 	enableActionBtn(runFinalStage);
	else 				enableActionBtn(runStage);
}

////Manipulation of Setboxes
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



//////////////////////////Challenge Animations

//setup challenge benchmark
function challengeStage(actionBtn){
	action = actionBtn;

	container.fadeOut(fadeTime, function(){
		
	
		action.css("marginTop", "0px");
		content.addClass("hide");
		benchmark.find(".prepmessage").removeClass("hide");
		action.html("Submit");
		action.die();
		action.live("click", function(){challengeSubmit();});
		
		container.fadeIn(fadeTime);
	});
	
}

function challengeSubmit(){
	//extract out the number they enetered
	var tPushups = parseInt($("#challengeCount").val());
	
	if(tPushups != null && tPushups > 0){
		changeActionText("Sending...");
		action.removeClass("clickable");
		action.removeClass("redhvr");
		
		completeChallenge(tPushups, challengeRecieved);
	} else
		alert("That's not a number!");
	

	
	/*
		var initialPushups = parseInt($("#numPushups").val());
	
	if(initialPushups != null && initialPushups > 0){
		setInitialPushups(initialPushups);
		changePage($("#success"));
	} else
		alert("That's not a number!");
		
	*/
	
	//alert(benchmark.find("#challengeCount").val());
	
	
	//on click, change the action to "sending"
	//extract out the number
	// send it via ajax
	//on success fade to "Challenege Complete"
	//then call complete benchmark()
}

function challengeRecieved(){
	changeActionText("Sent!");
	//wait for a second then "complete" the benchmark
	setTimeout("completeBenchmark()", 800);
	
}

