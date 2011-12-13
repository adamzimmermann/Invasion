/*

Copyright (c) 2011 MIT

Bradley University - Interactive Media Department

Authors-
Adam Zimmerman
Jesse White

*/

/*-------------------------------------------------------------------*/



require('lib/require').monkeypatch(this);
exports.homePage = function() {
	
	// Create the Home Page Window
	var instance = Ti.UI.createWindow ({
		backgroundImage: 'images/background/background.png'
	});
	
	var logo = Ti.UI.createView({
		backgroundImage: 'images/logo/PNG/logoVertical.png',
		height:179,
		width:150,
		top:10
	})
	
	instance.add(logo);
	
    /*--------------------------------------------------*/
	
	// BG Music 
	
		/*--------------------------------------------------*/
	
	// Join Game Button
	var button1 = Ti.UI.createButton({
		backgroundImage: 'images/buttons/joinGamebutton.png',
		backgroundSelectedImage: 'images/buttons/sjoinGamebutton.png',
		height:50,
		width:150,
		top:240,
		
		
		
	});
	
	// Open Join Game
	button1.addEventListener('click', function(){
		// var buttonClick= Ti.Media.createSound({
			// url: 'sounds/radiobeeps.mp3',
			// });
		// buttonClick.play();
// 		

		var joinGame = require('ui/common/joinGame');
		var joinGview = new joinGame();
		joinGview.open();
		instance.close();
	});
	
	/*--------------------------------------------------*/
	
	// Create Game Button
	var button2 = Ti.UI.createButton({
		backgroundImage: 'images/buttons/createGamebutton.png',
		backgroundSelectedImage: 'images/buttons/screateGamebutton.png',
		height:50,
		width:150,
		top:300,
		borderRadius:1,
		borderWidth:1
	});
	
	
	// Open Create Game
	button2.addEventListener('click', function(){
		// var buttonClick= Ti.Media.createSound({
			// url: 'sounds/radiobeeps.mp3',
		// });
		// buttonClick.play();
// 	

		var createGame = require('ui/common/createGame');
		var createGameScreen = new createGame();
		createGameScreen.open();
		instance.close();
	});
	
	/*--------------------------------------------------*/
	
	// Button for the About Screen
	var button3 = Ti.UI.createButton({
		backgroundImage: 'images/buttons/aboutbutton.png',
		backgroundSelectedImage: 'images/buttons/saboutbutton.png',
		height:50,
		width:150,
		top:360,
		borderRadius:1,
		borderWidth:1
	});
	
	// Open the About Screen
	button3.addEventListener('click', function(){
		// var buttonClick= Ti.Media.createSound({
			// url: 'sounds/radiobeeps.mp3',
		// });
		// buttonClick.play();
		

		var aboutPage = require('ui/common/aboutPage');
		var aboutScreen = new aboutPage();
		aboutScreen.open();
		instance.close();
	});
	
	/*--------------------------------------------------*/
	
	// Skip to Game
	var cheatButton = Ti.UI.createButton({
		title:'Skip to Game',
		height:30,
		width:150,
		top:180
	});
	
	// Skip to Game Listener
	cheatButton.addEventListener('click', function(){
		userID = Ti.Platform.id;
		var gamePage = require('ui/common/gamePage');
		var gameScreen = new gamePage({gameID: 117, userID: userID});
		gameScreen.open();
		instance.close();
	});
	// instance.add(cheatButton)
// 	
	/*--------------------------------------------------*/
	
	// Add the Buttons to the Page
	instance.add(button1);
	instance.add(button2);
	instance.add(button3);
	
	/*--------------------------------------------------*/
	
	// Skip to Lobby Button
	// var lobbyButton = Ti.UI.createButton({
		// title:'Skip to Lobby',
		// height:30,
		// width:150,
		// top:100
	// });
	// lobbyButton.addEventListener('click', function(input){
		// //load game lobby screen
		// var gameLobby = require('ui/common/gameLobby');
		// var gameLobbyScreen = new gameLobby({gameID: 117, userID: Ti.Platform.id, accessCode: 157});
		// gameLobbyScreen.open();
// 			
	// });
	// instance.add(lobbyButton);
// 	
	/*--------------------------------------------------*/
	
	return instance;
};



