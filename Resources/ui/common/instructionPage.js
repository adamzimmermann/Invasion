exports.instructionPage = function(input) {
	
	// Creates the Instruction Page Window
	var instance = Ti.UI.createWindow({
		backgroundImage:'images/SmallLogoTop.jpg'
	});
	
	/*--------------------------------------------------*/
	
	/*
	var readContents;
	var readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'instructions.txt');        
 
 	alert('file path: ' + readFile.path);
 
	if (readFile.exists()) {
	     readContents = readFile.read().toString();
	     Ti.API.debug('File Exists');  
	}
	alert('instructions: ' + readFile.read().toString());
	var instructions = readContents.toString();
	Ti.API.debug('Contents = ' + instructions);
	
	
	
	//text area that holds instructions
	var instructionText = Ti.UI.TextArea({
		value: instructions,
		color: '#fff',
		bottom: 315,
		height:50,
		width: 250,
		editable: 0,
		font: {fontFamily:'arial', fontSize: 22},
		borderColor: '#d6d6d6',
		borderRadius: 2,	 
		borderWidth: 3,
		backgroundColor: '#000'
	})
	instance.add(instructionText);
	
	*/
	
	/*--------------------------------------------------*/
	
	// Creates a Title
	
	var title = Ti.UI.createLabel({
		text: 'Instructions',
		color: '#fff',
		bottom: 100,
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
		height:30,
		top:390,
		width:120,
		title:'Continue'
	})
	instance.add(continueButton);
	
	//listens for continue button to be clicked
	continueButton.addEventListener('click', function() {	
		var gamePage = require('ui/common/gamePage')
		gamePage(input);
	});
	
	/*--------------------------------------------------*/
	
	
	
	// Back Button
	
	
	// Creates a Back Button
	var backButton = Ti.UI.createButton({
		title:'back',
		height: 20,
		width: 100,
		bottom:0
	});
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