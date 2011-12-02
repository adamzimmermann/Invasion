exports.gameLobby = function (input) {
	
	
	
	var instance = Ti.UI.createWindow({
		backgroundImage:'images/SmallLogoTop.jpg'
		//backgroundColor:'#000'
	});
	
	//var webAPI = new globals.xml.gamePlayers(gameID);
	
	
	var webAPI = new globals.xml.gamePlayers(input.gameID);
	Ti.App.addEventListener('gamePlayers', function(input){
	
		var data = [];
		for(var key in input.data){
			var g = input.data[key]
			var rowdata = {
				title: g.userName
			};
			data.push(rowdata);
		}
		var lobbyTable = Ti.UI.createTableView({
			top: 140,
			height: 260,
			width: 250,
			borderColor: '#d6d6d6',
			borderRadius: 2,	 
			borderWidth: 3,
			data: data,
		});
		var title = Ti.UI.createLabel({
			text: '  Game Lobby',
			color: '#fff',
			bottom: 315,
			height:50,
			width: 250,
			font: {fontFamily:'arial', fontSize: 22},
			borderColor: '#d6d6d6',
			borderRadius: 2,	 
			borderWidth: 3,
			backgroundColor: '#000'
		})
		instance.add(title);
		instance.add(lobbyTable);
	});
	
	userID = Ti.Platform.id;
	var webAPI2 = new globals.xml.gameInitiator(input.gameID, userID);
	// if game initiator
	Ti.App.addEventListener('gameInitiator', function(input){
		
		// if (input.data == "true")
		// {
			var startButton = Ti.UI.createButton({
				bottom: 15,
				height:30,
				width:100,
				title: 'Start Game!'
			});
			
			startButton.addEventListener('click', function() {	
				alert('gameID: ' + input.gameID)
				var webAPI3 = new globals.xml.startGame('1');
				
				//var gamePage = require('ui/common/gamePage')
				//gamePage();
			});
			instance.add(startButton)
		// }
		// else{
			// var standby = Ti.UI.createLabel({
			// text: 'Standby to Start the Game'
			// });
			// alert('not the game initiator');
			// instance.add(standby);
		// }
	});
	
	Ti.App.addEventListener('startGame', function(e) {
		alert('start game data: ' + e.data);
		
	});
	
	
	instance.open();
	
	return instance;
	
	
}
