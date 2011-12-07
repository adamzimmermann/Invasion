exports.aboutPage = function() {
	
	
	// Creates the About Page Window
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
	
	
	var title = Ti.UI.createLabel({
		text: '  About',
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
	
	
	/*--------------------------------------------------*/
	
	// Back Button
	
	var back = Ti.UI.createButton({
		title:'Home',
		height: 20,
		width: 100,
		bottom:10
	});
	instance.add(back);
	back.addEventListener('click', function(e){
		
		var homePage = require('ui/common/homePage')
		var homePageScreen = new homePage();
		homePageScreen.open();
		instance.close();
	});
	
	
	
	/*--------------------------------------------------*/
	
	//Adds Everything to the Window
	
	
	scrollyPolly.add(instructionsText)
	instance.add(scrollyPolly);
	instance.add(title);
	
	
	/*--------------------------------------------------*/
	
	
	return instance;
};
