var currentPushups = 0;
var demoTimer = 0; //set to 1 to activate timer

$(document).ready(function () {
	$("#btnExit").hide();
	getUserData("start", loadOpeningPage);
	
	$("#btnStart").click(function(){	loadPushups();});
	$("#btnPushups").click(function(){	loadPushups();});
	$("#btnCooldown").click(function(){	loadCooldown();});
	$("#btnExit").click(function(){		loadWelcome();});
	$("#btnNewPlayer").click(function(){initialTest();});
	$("#btnFinal").click(function(){	completeFinal();});
});

//Choose which page to load based on whether the user is logged in
function loadOpeningPage(){	

	$(".page").css("width", window.innerWidth - 215);
	
	if(user.loggedin && user.level == -1)
		changePage($("#newPlayer"));
	else if(user.level >= program.length)
		changePage($("#challengeSuccess"));
	else if(user.loggedin)
		loadWelcome();
	else
		changePage($("#login"));
}
function initialTest(){
	
	var initialPushups = parseInt($("#numPushups").val());
	
	if(initialPushups != null && initialPushups > 0){
		setInitialPushups(initialPushups);
		changePage($("#success"));
	} else
		alert("That's not a number!");
}


function loadWelcome(){
	$(".p0").text(program[user.level][0]);
	$(".p1").text(program[user.level][1]);
	$(".p2").text(program[user.level][2]);
	$(".p3").text(program[user.level][3]);
	$(".p4").text(program[user.level][4]);
	
	$("#btnExit").hide();
	currentPushups = 0;
	changePage($("#welcome"));
}

function loadPushups(){
	$("#btnExit").show();
	$(".currentPushups").text(program[user.level][currentPushups]);
	if(currentPushups == 4)  //change back to 4
		changePage($("#pushupFinal"));
	else{
		currentPushups = currentPushups + 1;
		changePage($("#pushups"));
	}
}


function completeFinal(){
	$("#btnExit").hide();
	var minPushups = program[user.level][currentPushups];
	var numPushups = parseInt($("#numPushupsFinal").val());
	
	if(numPushups != null && numPushups > 0){
		if(numPushups >= minPushups){
			//Increase level on DB
			adjustLevel(user.level + 1);
			changePage($("#success"));
			//link to success page
		}else{
			changePage($("#failure"));
			//link to falure page
		}
	} else
		alert("That's not a number!");
}


function loadCooldown(){
	var waitTime = (30 + user.level%3 * 30)*demoTimer;
	$("#btnPushups").hide();
	$(".cooldownTime").show();
	$(".cooldownTime").xotimer(waitTime, doneCoolDown);
	changePage($("#coolDown"));
}
	
function doneCoolDown(){ 
	$("#btnPushups").show();
	$(".cooldownTime").hide();
}

/*
window.onresize = function(event) {
	$(".page").css("width", document.width - 215);
}
*/