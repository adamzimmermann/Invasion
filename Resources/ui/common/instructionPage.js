/*

Copyright (c) 2011 MIT

Bradley University - Interactive Media Department

Authors-
Adam Zimmerman
Jesse White

*/

/*-------------------------------------------------------------------*/



exports.instructionPage = function(input) {
	
	// Creates the Instruction Page Window
	var instance = Ti.UI.createWindow({
		backgroundImage:'images/SmallLogoTop.jpg'
	});
	
	/*--------------------------------------------------*/
	
	// Reads a specific txt file and loads it into an uneditable text area
	
	var readContents;
	var resourcesDir = Titanium.Filesystem.getResourcesDirectory();
    var readFile = Titanium.Filesystem.getFile(resourcesDir, 'data/instructions.txt');
   
	if (readFile.exists()) {
	     readContents = readFile.read().toString();
	}
	var instructions = readContents.toString();
	
	
	var scrollyPolly = Titanium.UI.createScrollableView({
		top:150,
		height:225,
		width: 250,
		borderColor: '#d6d6d6',
		borderRadius: 2,	 
		borderWidth: 3,
	
	});
	
	// Text area that holds instructions
	var instructionsText = Ti.UI.createTextArea({
		color: '#fff',
		editable: 0,
		backgroundColor: '#000',
		font: {fontFamily:'arial', fontSize: 15},
		value:instructions
	});
	
	scrollyPolly.add(instructionsText)
	
	instance.add(scrollyPolly);
	
	
	
	/*--------------------------------------------------*/
	
	// Creates a Title
	
	var title = Ti.UI.createLabel({
		text: '  Instructions',
		color: '#fff',
		top: 100,
		height:50,
		width: 250,
		font: {fontFamily:'arial', fontSize: 22},
		borderColor: '#d6d6d6',
		borderRadius: 2,	 
		borderWidth: 3,
		backgroundColor: '#000'
	});
	instance.add(title);
	
	/*--------------------------------------------------*/
	
	// Creates a Continue Button
	
	
	var continueButton = Ti.UI.createButton({
		height:40,
		top:390,
		width:120,
		backgroundImage: 'images/buttons/continuebutton.png',
	})
	instance.add(continueButton);
	
	//listens for continue button to be clicked
	continueButton.addEventListener('click', function() {	
		// var buttonClick= Ti.Media.createSound({
				// url: 'sounds/radiobeeps.mp3',
		// });
		// buttonClick.play();
		//alert(input);
		bgTunes.stop();
		var gamePage = require('ui/common/gamePage')
		var gamePageScreen = new gamePage(input);
		gamePageScreen.open();
	});
	
	
	
	/*--------------------------------------------------*/
	
	
	
	// Back Button
	
	
	// Creates a Back Button
	var backButton = Ti.UI.createButton({
		backgroundImage: 'images/buttons/backbutton.png',
		height: 40,
		width: 120,
		bottom:10	});
	instance.add(backButton);
	
	// Listens for back button to be clicked
	backButton.addEventListener('click', function(e){
		
		var homePage = require('ui/common/homePage');
		var homePageScreen = new homePage();
		homePageScreen.open();
		instance.close();
	});
	
	/*--------------------------------------------------*/

	return instance;
};