exports.homePage = function() {
	
	// Create the Home Page Window
	var instance = Ti.UI.createWindow ({
		backgroundImage: 'images/MediumLogoTop.jpg'
	});
	
    /*--------------------------------------------------*/
	
	// BG Music 
	var bgTunes = Ti.Media.createSound({
		url: 'sounds/StartS.mp3',
		looping: true
	});
	bgTunes.play();
	
	/*--------------------------------------------------*/
	
	// Join Game Button
	var button1 = Ti.UI.createButton({
		title:'Join Game',
		height:50,
		width:150,
		top:240
		
	});
	
	// Open Join Game
	button1.addEventListener('click', function(){
		var joinGame = require('ui/common/joinGame');
		var joinGview = new joinGame();
		joinGview.open();
		instance.close();
	});
	
	/*--------------------------------------------------*/
	
	// Create Game Button
	var button2 = Ti.UI.createButton({
		title:'Create Game',
		height:50,
		width:150,
		top:300
	});
	
	
	// Open Create Game
	button2.addEventListener('click', function(){
		var createGame = require('ui/common/createGame');
		var createGameScreen = new createGame();
		createGameScreen.open();
		instance.close();
	});
	
	/*--------------------------------------------------*/
	
	// Button for the About Screen
	var button3 = Ti.UI.createButton({
		title:'About',
		height:50,
		width:150,
		top:360
	});
	
	// Open the About Screen
	button3.addEventListener('click', function(){
		if (globals.osname == 'iphone'){
			var aboutPage = require('ui/common/aboutPage');
			var aboutScreen = new aboutPage();
			aboutScreen.open();
			instance.close();
		} else if (globals.osname == 'android') {
			var newWin = Ti.UI.createWindow({backgroundColor: '#000'})
			newWin.open();
			var aboutPage = require('ui/common/aboutPage');
			var aboutScreen = new aboutPage();
			newWin.add(aboutScreen);
		}
 
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
	instance.add(cheatButton)
	
	/*--------------------------------------------------*/
	
	// Add the Buttons to the Page
	instance.add(button1);
	instance.add(button2);
	instance.add(button3);
	
	/*--------------------------------------------------*/
	
	return instance;
};
