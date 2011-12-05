exports.teamRoster = function(input){
	var instance = Ti.UI.createWindow({backgroundColor: '#000'});
	instance.open();
	
	
	gameInformation({gameID: input.gameID, playerID: input.playerID});
	
	function gameInformation(input) {
		//alert('start game data: ' + input.gameID);
		//userID =Ti.Platform.id;	
		alert('the input here was' + input.gameID);
		var webAPI9 = new globals.xml.teamInformation({gameID:input.gameID, playerID: input.playerID});
		
		//var instructions = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory/data, 'instructions.txt');
		
	}
	
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
		var teamInformation = Ti.UI.createTableView({
			top: 140,
			height: 260,
			width: 250,
			borderColor: '#d6d6d6',
			borderRadius: 2,	 
			borderWidth: 3,
			data: data,
		});
		
		//display instructions
		//alert('instructions: ' + instructions.text);
		
		
		//var gamePage = require('ui/common/instructionPage')
		//gamePage();
		
		//var gamePage = require('ui/common/gamePage')
		//gamePage();
		
		instance.add(teamInformation);
	})
	
	return instance;
};
