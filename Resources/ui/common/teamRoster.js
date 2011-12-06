exports.teamRoster = function(input){
	var instance = Ti.UI.createWindow({backgroundColor: '#000'});
	instance.open();
	
	//
	// gameInformation({gameID: input.gameID, userID: input.userID});
	// function gameInformation(input) {
		//alert('start game data: ' + input.gameID);
		//userID =Ti.Platform.id;	
		// alert('the input here was' + input.gameID);
		// pass game ID and player ID to the team info
		Ti.API.debug('right before problem');
		Ti.API.debug('userID: ' + input.userID)
		alert('the values: ' + input.userID);
		var webAPI9 = new globals.xml.teamInformation({gameID:input.gameID, userID: input.userID});
		
		//var instructions = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory/data, 'instructions.txt');
		
	// }
	
	// listens for information about team members
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
			height: 260,
			width: 250,
			borderColor: '#d6d6d6',
			borderRadius: 2,
			borderWidth: 3,
			data: data,
		});
		instance.add(teamMembers);
	})
	
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
		var instructionPageWindow = require('ui/common/instructionPage');
		instructionPageWindow(input);
	});
	
	return instance;
};
