var slideSpeed = 500;
var currentPage = null;


//User object
function userObject(){
	this.loggedin = false;
	this.name = "";
	this.level = 0;
	this.loginUrl = "";
	this.logoutUrl = "";
}

var user = new userObject();

function setInitialPushups(pushups){
		user.level = Math.floor(pushups/5);  //fix this up later
		sendUserData("level="+user.level+"&startpushups="+pushups);
	}
	
function adjustLevel(level){
	user.level = level;
	sendUserData("level=" + level);
	populateFields();
}

//Populates all elements with the appropirate classes with the data from the server
function populateFields(){
	$(".userLogoutUrl").attr("href", user.logoutUrl);
	$(".userLoginUrl").attr("href", user.loginUrl);
	$(".userName").text(user.name);
	$(".userLevel").text(user.level);
	
	if(user.loggedin){
		$(".userLogoutUrl").show();
		$(".userLoginUrl").hide();
	}else{
		$(".userLogoutUrl").hide();
		$(".userLoginUrl").show();
	}
}

//////////Don't touch these! Used for communicating with the server//////////////

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







//Probably depricate
/*
function changePage(container){
	if(container != currentPage){
		container.animate({
			left: '0px'
			}, slideSpeed, function(){}
		);
		if(currentPage != null){
			currentPage.animate({
				left: '-' + screen.width + 'px'
				}, slideSpeed, function(){
					$(this).css("left",screen.width+ "px");
			});
		}
		//Swap the pages
		currentPage = container;
	}
}
*/



/*
$(document).ready(function () {
	
	getUserData(); //fetch the user data from the server
	
	var workoutPage = $("#workout");
	var homePage =    $("#home");
	var accountPage = $("#account");
	var aboutPage =   $("#about");
	
	//setup the pages
	setupPage(workoutPage, "workout.html");
	setupPage(accountPage, "account.html");
	setupPage(aboutPage,   "about.html");
	
	//Setup the home page
	homePage.load("pages/home.html", function(){
		$("#initLoad").hide();
		changePage(homePage);
	});
	
	
	
	$("#startNav").click(function(){	changePage(workoutPage, startWorkout());});
	$("#homeNav").click(function(){		changePage(homePage);});
	$("#accountNav").click(function(){	changePage(accountPage);});
	$("#aboutNav").click(function(){	changePage(aboutPage);});
	
});

/*
function changePage(pageName){
	waitingPage.load("pages/" + pageName, function(){
		$(this).animate({
			left: '0px'
			}, slideSpeed, function(){
		});
		currentPage.animate({
			left: '-' + screen.width + 'px'
			}, slideSpeed, function(){
				$(this).css("left",screen.width+ "px");
		});

		//Swap the pages
		var tempPage = currentPage;
		currentPage = waitingPage;
		waitingPage = tempPage;
	});
}*/



/*
function setupPage(container, file){
	container.load("pages/" + file);
	container.css("left",screen.width+ "px");
}
*/






/*

function searchItem(query, callback){
	$.ajax({
		type: "GET",
		url: "/search",
		data: query,
		success: function(response){
			callback(response);
		}
	});
}

var searchCallback = function(response){
	var searchResults =	JSON.parse(response);
	
	var newHtml = "";
	
	for(i=0;i<searchResults.length;i++){
		newHtml += "<div class='searchItem orange rounded' id='" + searchResults[i].id + "'>" +
					searchResults[i].name + 
					//"<div style='display:none;'>" 

					//"</div>"+
					"</div>";
	} 
	$("#searchResults").html(newHtml);
}

*/