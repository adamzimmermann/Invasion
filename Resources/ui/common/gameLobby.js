exports.gameLobby = function (input) {
	
	var instance = Ti.UI.createWindow({
		backgroundImage:'images/SmallLogoTop.jpg'
		//backgroundColor:'#000'
	});
	
	var accessCode = input.accessCode;
	var gameID = input.gameID;
	var playerID = Ti.Platform.id;
	
	//var webAPI = new globals.xml.gamePlayers(gameID);
	
	// displays list of registered players
	
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
	
	//checks if current user is the game initiator
	
	var webAPI2 = new globals.xml.gameInitiator(input.gameID, playerID);
	
	
	// gets information about whether current user is the game initiator
	Ti.App.addEventListener('gameInitiator', function(input){
		
		// if they are the game initiator
		if (input.data == "true") {
			//creates a start button
			var startButton = Ti.UI.createButton({
				bottom: 15,
				height:30,
				width:100,
				title: 'Start Game!'
			});
			instance.add(startButton);
			
			
			// displays the access code
			var accessCodeLabel = Ti.UI.createLabel({
				text: 'Access Code: ' + accessCode,
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
			instance.add(accessCodeLabel);			

			
			// listens for start button to be clicked
			startButton.addEventListener('click', function() {	
				//creates teams and assigns players to teams
				alert('start game clicked and game ID is' + gameID + playerID);
				
				var webAPI3 = new globals.xml.startGame(gameID);
				var teamRoster = require('ui/common/teamRoster')
				//alert('right before gameInformation call');
				//gets information about who is on the user's team
				teamRoster({gameID: gameID, playerID: playerID});
			});
		}
		// if they just joined the game and aren't the initiator
		else {
			//displays standby text
			var standby = Ti.UI.createLabel({
				text: 'Standby to Start the Game'
			});
			instance.add(standby);
			
			
			//check if the game has started
			var webAPI3 = new globals.xml.gameStatus(gameID);
			
			
			//listens for the game status information
			Ti.App.addEventListener('gameStatus', function(e){
				// game has started
				if(e.data == 'true') {
					//fires when the game has been started by game initiator
					gameInformation({gameID: gameID, playerID: playerID});
				}
				//game has not started
				else {
					//wait for 3 seconds
					Ti.API.debug('game has not started');
					
					//check if game has started
					//var webAPI6 = new globals.xml.gameStatus(gameID); // NEED A GAMEID ************			
				}
			})
			
		}
	});
	
	
	
	
	
	
	// Back Button
	var back = Ti.UI.createButton({
		title:'back',
		height: 20,
		width: 100,
		bottom:0
	});
	instance.add(back);
	back.addEventListener('click', function(e){
		var win1 = Titanium.UI.createWindow();
		win1.open()
		var homePage = require('ui/common/homePage');
		var Home = Titanium.UI.createWindow();
		var homeScreen = new homePage();
		Home.add(homeScreen);
		win1.add(Home);
	});
	
	
	instance.open();
	
	return instance;
	
	
}
