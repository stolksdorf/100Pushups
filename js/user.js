


//User object
function userObject(){
	this.loggedin = false;
	this.name = "";
	this.level = 0;
	this.loginUrl = "";
	this.logoutUrl = "";
}

var user = new userObject();

/*
function setInitialPushups(pushups){
	user.level = Math.floor(pushups/5);  //fix this up later
	sendUserData("level="+user.level+"&startpushups="+pushups);
}

function adjustLevel(level){
	user.level = level;
	sendUserData("level=" + level);
	populateFields();
}
*/


function passedBenchmark(pushups, callback){
	var data = 	"challenge=false" +
				"&passed=true" +
				"&total=" + sumOfPushups(user.level, pushups) +
				"&limit=" + pushups;
	
	addRecord(data, callback);
}

function failedBenchmark(pushups, callback){
	alert(sumOfPushups(user.level, pushups));
	var data = 	"challenge=false" +
				"&passed=false" +
				"&total=" + sumOfPushups(user.level, pushups) +
				"&limit=" + pushups;
	
	addRecord(data, callback);
}

//Sends off the number of pushups you did for the challenge as well as
//the challenge's name and increments your level by 1 
function completeChallenge(pushups, callback){
	var data = 	"challenge=true" +
				"&passed=true" +
				"&total=" + pushups +
				"&limit=" + pushups;
	
	addRecord(data, callback);
}


function sumOfPushups(level, goToFailPushups){

var temp = program[level][0] + program[level][1] + program[level][2] 
			+ program[level][3] + parseInt(goToFailPushups);


	return temp;
}
	

//Populates all elements with the appropirate classes with the data from the server
function populateFields(){
	$(".userLogoutUrl").attr("href", user.logoutUrl);
	$(".userLoginUrl").attr("href", user.loginUrl);
	$(".userName").text(user.name);
	$(".userlevel").text(user.level);
	
	if(user.loggedin){
		$(".userLoggedinShow").show();
		$(".userLoggedoutShow").hide();
	}else{
		$(".userLoggedinShow").hide();
		$(".userLoggedoutShow").show();
	}
}

function addRecord(data, callback){
	$.ajax({
		type: "GET",
		url: "/addrecord",
		data: data,
		success: function(response){
			if(callback != null) callback();
		}
	});
}

function updateLevel(level, callback){
	$.ajax({
		type: "GET",
		url: "/setlevel",
		data: "level="+level,
		success: function(response){
			populateFields();
			if(callback != null) callback();
		}
	});
}

function getUserData(redirect, callback){
	$.ajax({
		type: "GET",
		url: "/getUserData",
		data: "redirect=" + redirect,
		success: function(response){
			//update the user object with the data from the server
			user = JSON.parse(response);
			populateFields();
			if(callback != null) callback();
		}
	});
}