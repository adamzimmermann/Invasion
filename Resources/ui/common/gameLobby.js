exports.gameLobby = function (input) {
	
	var instance = Ti.UI.createWindow({
		backgroundImage:'images/SmallLogoTop.jpg'
		//backgroundColor:'#000'
	});
	
	var accessCode = input.accessCode;
	var gameID = input.gameID;
	var playerID = Ti.Platform.id;
	
	
	//loads the initial data
	var gamePlayerData = new globals.xml.gamePlayers(input.gameID);
	
	//creates a lobby update timer
	lobbyUpdateTimer = setInterval(lobbyData, 5000);
	
	//calls gamePlayers to get list of players
	function lobbyData() {
		var gamePlayerData = new globals.xml.gamePlayers(input.gameID);
	}
	
	// checks the game status
	function statusUpdate() {
		var webAPI3 = new globals.xml.gameStatus(gameID);
	}
	
	
	//listens for data from gamePlayers
	// displays list of registered players
	Ti.App.addEventListener('gamePlayers', function(input) {
		//alert('data updated');
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
		//instance.remove(title);
		//instance.remove(lobbyTable)
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
			
			
			// listens for start button to be clicked
			startButton.addEventListener('click', function() {	
				//creates teams and assigns players to teams
				alert('start game clicked and game ID is' + gameID + playerID);
				
				var webAPI3 = new globals.xml.startGame(gameID);
				var teamRoster = require('ui/common/teamRoster')
				//alert('right before gameInformation call');
				//gets information about who is on the user's team
				clearInterval(lobbyUpdateTimer);
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
			
			gameStatusTimer = setInterval(statusUpdate, 5000);
			
			//listens for the game status information
			Ti.App.addEventListener('gameStatus', function(e){
				// game has started
				if(e.data == 'true') { //
					clearInterval(gameStatusTimer);
					clearInterval(lobbyUpdateTimer);
					Ti.API.debug('game has started');
					//fires when the game has been started by game initiator					
					var teamRoster = require('ui/common/teamRoster')
					teamRoster({gameID: gameID, playerID: playerID});
					//gameInformation({gameID: gameID, playerID: playerID});
				}
				//game has not started
				else {
					//alert('game has not started');
					//wait for 3 seconds
					Ti.API.debug('game has not started');			
				}
			})
		}
	});
	
	
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
	
	
	
	// Back Button
	var backButton = Ti.UI.createButton({
		title:'back',
		height: 20,
		width: 100,
		bottom:0
	});
	instance.add(backButton);
	
	// listens for back button to be clicked
	backButton.addEventListener('click', function(e){
		clearInterval(gameStatusTimer);
		clearInterval(lobbyUpdateTimer);
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
