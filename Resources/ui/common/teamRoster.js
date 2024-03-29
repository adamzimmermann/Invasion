/*

Copyright (c) 2011 MIT

Bradley University - Interactive Media Department

Authors-
Adam Zimmerman
Jesse White

*/

/*-------------------------------------------------------------------*/




exports.teamRoster = function(input){
	
	// Create the Team Roster Window
	var instance = Ti.UI.createWindow({
		backgroundImage: 'images/SmallLogoTop.jpg'
	});
	
	/*--------------------------------------------------*/
	
	
	//alert(input);
	// Game & Team Information Calls
	
	// gameInformation({gameID: input.gameID, userID: input.userID});
	// function gameInformation(input) {
		//alert('start game data: ' + input.gameID);
		//userID =Ti.Platform.id;	
		// alert('the input here was' + input.gameID);
		// pass game ID and player ID to the team info
		Ti.API.debug('right before problem');
		Ti.API.debug('userID: ' + input.userID)
		//alert('the values: ' + input.userID);
		var webAPI9 = new globals.xml.teamInformation({gameID:input.gameID, userID: input.userID});
		//}	
	/*--------------------------------------------------*/
	
	
	// Listens for information about team members
	
	
	Ti.App.addEventListener('teamInformation', function(input){
		//display team members
		//alert('team members: ' + input.data);
		var data = [];
		for(var key in input.data){
			var player = input.data[key]
			var rowdata = {
				title: player.userName
			};
			data.push(rowdata);
		}
		var teamMembers = Ti.UI.createTableView({
			top: 140,
			height: 220,
			width: 250,
			borderColor: '#d6d6d6',
			borderRadius: 2,
			borderWidth: 3,
			data: data,
		});
		instance.add(teamMembers);
		var title = Ti.UI.createLabel({
			text: '  Team: ' + input.data[0].teamName,
			color: '#fff',
			bottom: 315,
			height:50,
			width: 250,
			font: {fontFamily:'arial', fontSize: 22},
			borderColor: '#d6d6d6',
			borderRadius: 2,	 
			borderWidth: 3,
			backgroundColor: '#000'
		});
		instance.add(title);
	})
	
	
	/*--------------------------------------------------*/
	
	
	// Creates the Continue Button
	
	
	var continueButton = Ti.UI.createButton({
		height:40,
		top:370,
		width:120,
		backgroundImage: 'images/buttons/continuebutton.png',
		backgroundSelectedImage: 'images/buttons/scontinuebutton.png',
	});
	
	instance.add(continueButton);
	
	// Listens for continue button to be clicked
	continueButton.addEventListener('click', function() {
		// var buttonClick= Ti.Media.createSound({
				// url: 'sounds/radiobeeps.mp3',
		// });
		// buttonClick.play();
		//alert(input);
		var instructionPage = require('ui/common/instructionPage');
		var instructionPageScreen = new instructionPage(input);
		instructionPageScreen.open();
		
	});
	
	
	/*--------------------------------------------------*/
	
	
	// Back Button
	
	
	// Creates a Back Button
	var backButton = Ti.UI.createButton({
		backgroundImage: 'images/buttons/backbutton.png',
		backgroundSelectedImage: 'images/buttons/backbutton.png',
		height: 40,
		width: 120,
		bottom:10
	});
	instance.add(backButton);
	
	// Listens for back button to be clicked
	backButton.addEventListener('click', function(e){
		// var buttonClick= Ti.Media.createSound({
				// url: 'sounds/radiobeeps.mp3',
		// });
		// buttonClick.play();
		var homePage = require('ui/common/homePage');
		var homePageScreen = new homePage();
		homePageScreen.open();
		instance.close();
	});
	
	/*--------------------------------------------------*/
	
	
	return instance;
};
