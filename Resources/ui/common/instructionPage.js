exports.instructionPage = function() {
	
	var instance = Ti.UI.createWindow({
		backgroundImage:'images/SmallLogoTop.jpg'
		// backgroundColor:'#000'
	});
	
	
	var readContents;
	var readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'instructions.txt');        
 
	if (readFile.exists()) {
	     readContents = readFile.read();
	     Ti.API.info('File Exists');  
	}
	var instructions = readContents.text();
	Ti.API.info('Contents = ' + doc);
	
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
	
	//creates a label
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
	
	
	
	//creates a Continue Button
	var continueButton = Ti.UI.createButton({
		height:50,
		top:390,
		width:120,
		title:'Continue'
	})
	instance.add(continueButton);
	
	
	//listens for continue button to be clicked
	continueButton.addEventListener('click', function() {	
		//var instructionPage = require('ui/common/instructionPage')
		//instructionPage();
	});
	
	
	return instance;
};