
/*

//User object
function userObject(){
	this.loggedin = false;
	this.name = "";
	this.level = 0;
	this.loginUrl = "";
	this.logoutUrl = "";
}

var user = new userObject();
*/

$(document).ready(function () {
	
	getUserData("home", loadPage);
	
	
	$("#startJump").click(function(){
		scrollToBenchmark(user.level);
	});
	
});

function loadPage(){
	
	loadBenchmarks();
	loadBenchmarkElements();
	
}



function scrollToBenchmark(benchmarkID, animationTime, callback){
	if(!animationTime) animationTime = 1800;	
	var fromTop = $("#level" + benchmarkID ).offset().top - window.screen.height/2 + 230;
	if(callback)
		$.scrollTo(fromTop, animationTime, {easing:'swing', onAfter:callback()});
	else
		$.scrollTo(fromTop, animationTime, {easing:'swing'});
}

function loadBenchmarks(){
	for(i=program.length-1; i > 0  ; i--){
		var fadeCss = "";
		var hideMasterCss = "";
		var actionHideCss = ""
		if(i > user.level || i<user.level) fadeCss = "faded"; 
		if(i>=user.level) hideMasterCss="hide";
		if(i!=user.level) actionHideCss="hide";
		
		if(user.loggedin == false){
			fadeCss = "faded"; 
			hideMasterCss="hide";
			actionHideCss="hide";
		}
		
			
		if($.isArray(program[i])){
			
			var benchmarkHtml = 
			"<div id='level"+i+"' class='benchmark clear'>\
				<div class='completeBar f2 center "+hideMasterCss+"'> MASTERED </div>\
				<div class='levelSpace float leaguegothic "+fadeCss+"'>"+ i +". </div>\
				<div class='timer f1 float'> 100 </div>\
				<div class='regularContainer contentSpace float "+fadeCss+"'>\
					<div class='contentBox center leaguegothic'> \
						<div class='c0 setBox'>"+ program[i][0]+"</div>\
						<div class='c1 setBox'>"+ program[i][1]+"</div>\
						<div class='c2 setBox'>"+ program[i][2]+"</div>\
						<div class='c3 setBox'>"+ program[i][3]+"</div>\
						<div class='c4 red setBox'>"+ program[i][4]+"</div>\
						<div class='submit hide chunk'>\
							How many pushups did you do?<br>\
							<input id='regularCount' class='f2 center w75 border floatright rounded' type='text' name='regularCount' /> \
						</div>\
					</div>\
					<div class='actionSpace f2 center clear clickable redhvr "+actionHideCss+"'>\
						Start\
					</div>\
				</div>\
			</div>";
			
			$("#content").append(benchmarkHtml);
		}else{
			var challengeHtml = 
			"<div id='level"+i+"' class='benchmark clear'>\
				<div class='completeBar f2 center "+hideMasterCss+"'> MASTERED </div>\
				<div class='levelSpace float leaguegothic "+fadeCss+"'>"+ i +". </div>\
				<div class='challengeContainer contentSpace float "+fadeCss+"'>\
					<div class='contentBox f3'> \
						CHALLENGE\
					</div>\
					<div class='prepmessage hide'>\
						<div class='f2 w500 leaguegothic float'>\
							Do as many pushups as possible\
						</div>\
						<br> \
						<div class='f1 w500 float'>\
							Enter in the number and click Submit\
						</div>\
						<input id='challengeCount' class='f3 w100 border floatright rounded' type='text' name='challengeCount' /> \
					</div>\
					<div class='challengeSent hide'>\
						CHALLENGE COMPLETE\
					</div>\
					<div class='actionSpace f2 center clear clickable redhvr "+actionHideCss+"'> Click here! </div>\
				</div>\
			</div>";
			$("#content").append(challengeHtml);
		}
	}
}


/*

function sendUserData(data, callback){
	$.ajax({
		type: "GET",
		url: "/setUserData",
		data: data,
		success: function(response){
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
*/