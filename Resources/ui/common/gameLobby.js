exports.gameLobby = function (input) {
	
	//Create the Game Lobby Window
	var instance = Ti.UI.createWindow({
		backgroundImage:'images/SmallLogoTop.jpg'
	});
	
	/*--------------------------------------------------*/
	
	// Simplifies Arguments  
	
	accessCode = input.accessCode;
	gameID = input.gameID;
	userID = Ti.Platform.id;
	
	
	/*--------------------------------------------------*/
	
	
	// Loads the initial data
	var gamePlayerData = new globals.xml.gamePlayers(input.gameID);
	
	
	/*--------------------------------------------------*/
	
	
	// Creates a lobby update timer
	lobbyUpdateTimer = setInterval(lobbyData, 5000);
	
	
	/*--------------------------------------------------*/
	
	
	// Calls gamePlayers to get list of players
	function lobbyData() {
		var gamePlayerData = new globals.xml.gamePlayers(input.gameID);
	};
	
	
	/*--------------------------------------------------*/
	
	
	// Checks the game status
	function statusUpdate() {
		var webAPI3 = new globals.xml.gameStatus(gameID);
	};
	
	
	/*--------------------------------------------------*/
	
	// Creates the Game Lobby Table with Game Players
	
	// Listens for data from gamePlayers
	// Displays list of registered players
	Ti.App.addEventListener('gamePlayers', function(input) {

		var data = [];
		
		for(var key in input.data){
			var g = input.data[key]
			var rowdata = {
				title: g.userName
			};
			data.push(rowdata);
		}
		
		// The Lobby Table
		var lobbyTable = Ti.UI.createTableView({
			top: 140,
			height: 170,
			width: 250,
			borderColor: '#d6d6d6',
			borderRadius: 2,	 
			borderWidth: 3,
			data: data,
		});
		
		// The Table Title
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
		});
		
		//instance.remove(title);
		//instance.remove(lobbyTable)
		
		instance.add(title);
		instance.add(lobbyTable);
	});
	
	
	/*--------------------------------------------------*/
	
	// This is what the 'Game Initiator will see
	
	
	// Checks if current user is the game initiator
	var webAPI2 = new globals.xml.gameInitiator(input.gameID, userID);
	
	
	// Gets information about whether current user is the game initiator
	Ti.App.addEventListener('gameInitiator', function(input){
		
		// just a test. this has to key the number of players
		numPlayers = 2;
		
		// If they are the game initiator
		if (input.data == "true" & numPlayers >= 2) {
			
			// Creates a start button
			var startButton = Ti.UI.createButton({
				bottom: 35,
				height:25,
				width:100,
				title: 'Start Game!'
			});
			
			// Add the button to the Window
			instance.add(startButton);
				
			// Listens for start button to be clicked
			startButton.addEventListener('click', function() {	
				
				// Creates teams and assigns players to teams
				
				
				
		
				var webAPI3 = new globals.xml.startGame(gameID);
				var teamRoster = require('ui/common/teamRoster');
				var teamRosterScreen = new teamRoster({gameID: gameID, userID: userID});
				teamRosterScreen.open();
				
				// Stop the Lobby Refresh
				clearInterval(lobbyUpdateTimer);	
			});
		}
		// If they just joined the game and aren't the initiator
		else {
			// Displays standby text
			var standby = Ti.UI.createLabel({
				text: 'Please Wait...',
				color: '#fff',
				bottom: 50,
				height: 25,
				width:150,
				left: 100
			});
			instance.add(standby);
			
			
			// Check if the game has started
			var webAPI3 = new globals.xml.gameStatus(gameID);
			
			// Start game status timer
			gameStatusTimer = setInterval(statusUpdate, 5000);
			
			// Listens for the game status information
			Ti.App.addEventListener('gameStatus', function(e){
				// game has started
				if(e.data == 'true') { //
					clearInterval(gameStatusTimer);
					clearInterval(lobbyUpdateTimer);
					Ti.API.debug('game has started');
					//fires when the game has been started by game initiator					
					var teamRoster = require('ui/common/teamRoster')
					var teamRosterScreen = new teamRoster({gameID: gameID, userID: userID});
					teamRosterScreen.open();
				}
				//game has not started
				else {
					Ti.API.debug('game has not started');			
				}
			})
		}
	});
	
	
	/*--------------------------------------------------*/
	
	
	// Displays the access code
	
	var accessCodeLabel = Ti.UI.createLabel({
		text: '  Access Code: ' + accessCode,
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
	// Add the Access Code Label
	instance.add(accessCodeLabel);
	
	
	/*--------------------------------------------------*/
	
	
	// Back Button
	
	
	// Creates a Back Button
	var backButton = Ti.UI.createButton({
		title:'Home',
		height: 20,
		width: 100,
		bottom:10
	});
	instance.add(backButton);
	
	// Listens for back button to be clicked
	backButton.addEventListener('click', function(e){
		clearInterval(lobbyUpdateTimer);
		if (exists(gameStatusTimer)){
			clearInterval(gameStatusTimer);
		};
		var homePage = require('ui/common/homePage')
		var homePageScreen = new homePage();
		homePageScreen.open();
		instance.close();
	});
	
	/*--------------------------------------------------*/
	
	return instance;
};
