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
	
	
	var title = Ti.UI.TextArea({
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
	instance.add(title);
	
	
	var title = Ti.UI.createLabel({
	
	
	
	return instance
};