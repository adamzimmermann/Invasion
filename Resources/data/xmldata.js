/*

Copyright (c) 2011 MIT

Bradley University - Interactive Media Department

Authors-
Adam Zimmerman
Jesse White

*/

/*-------------------------------------------------------------------*/




var api = {};

/*------------------------------------------------------------------------------------------*/

// Return Value:
// array of information about all games within 10 mile radius
function findGames (latitude, longitude) { 
	var data = [];
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action:'findGames',
		latitude: latitude,
		longitude: longitude
	});
	
	xhr.onload = function(e) {
		
		if(this.responseText != 'false') {
			var xml = this.responseXML;
			var games = xml.documentElement.getElementsByTagName("game");
				
			for (var i = 0; i < games.length; i++) {
		    	data.push({
		    		gameID: games.item(i).getElementsByTagName("gameID").item(0).text,
		    		accessCode: games.item(i).getElementsByTagName("accessCode").item(0).text,
		    		//initiatorID: games.item(i).getElementsByTagName("initiatorID").item(0).text,
		    		gameName: games.item(i).getElementsByTagName("gameName").item(0).text,
		    		gameLatitude: games.item(i).getElementsByTagName("gameLatitude").item(0).text,
		    		gameLongitude: games.item(i).getElementsByTagName("gameLongitude").item(0).text,
		    		//flagsPlaced: games.item(i).getElementsByTagName("flagsPlaced").item(0).text,
		    		gameStatus: games.item(i).getElementsByTagName("gameStatus").item(0).text,
		    	}); 	
			}
		 	Ti.App.fireEvent('findGames', {data:data});
		 }
		 else {
		 	Ti.App.fireEvent('findGames', {data:'false'});
		 }
	}
}


/*------------------------------------------------------------------------------------------*/

// Return Value:
// xml data of player’s name and ID number
function gamePlayers (gameID, players) { 
	var data = [];

	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	var playersJSON = JSON.stringify(players);
	
	//alert('playerJSON going to web: ' + playersJSON);
	
	xhr.send({
		action:'gamePlayers',
		gameID:gameID,
		players: playersJSON
	});
	
	xhr.onload = function(e) {
		//Ti.API.debug(this.responseText);
		
		//alert('response: ' + this.responseText);
		
		//checks if no data is returned
		if(this.responseText != 'false') {
		
			var xml = this.responseXML;
		  		
			var games = xml.documentElement.getElementsByTagName("player");
				
			for (var i = 0; i < games.length; i++) {	
		    	data.push({
		    		userName: games.item(i).getElementsByTagName("userName").item(0).text,
		    		playerID: games.item(i).getElementsByTagName("playerID").item(0).text,
		    	}); 	
			}	
		 	Ti.App.fireEvent('gamePlayers', {data:data});
		 }
	}
}


/*------------------------------------------------------------------------------------------*/

// Return Value
// "true" or "false" depending on if the operation occurred successfully
function joinGame (input) { 
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	//alert('input data: ' + input);
	
	xhr.send({
		action:'joinGame',
		userID: input.userID,
		userName: input.userName,
		gameID: input.gameID
	});
	
	xhr.onload = function(e) {
		var xml = this.responseXML;
		
		//alert('response xml: ' + xml);
		
    	var data = {
    		gameID: xml.documentElement.getElementsByTagName("gameID").item(0).text,
    		gameName: xml.documentElement.getElementsByTagName("gameName").item(0).text,
    		accessCode: xml.documentElement.getElementsByTagName("accessCode").item(0).text,
    	};
		//alert(data.gameName);
	    Ti.App.fireEvent('joinGame', {data:data});	
	}
	
}


/*------------------------------------------------------------------------------------------*/

// Return Value:
// The ID of the Player who initiated the Game if Game exists, and 'false' if Game does not exist
function gameInitiator (gameID) { 
	var data = [];
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action:'gameInitiator',
		gameID:gameID
	});
	xhr.onload = function(e) {	
	 	Ti.App.fireEvent('gameInitiator', {data:this.responseText});
	}
}

/*------------------------------------------------------------------------------------------*/

// Return Value:
// String that denotes the current game status, false if not started, true if started
function gameStatus (gameID) { 
	var data = [];
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'gameStatus',
		gameID: gameID
	});
	xhr.onload = function(e) {	
	 	Ti.App.fireEvent('gameStatus', {data:this.responseText});
	}
}

/*------------------------------------------------------------------------------------------*/

// Return Value:
// array of information about all the players in the Game
function startGame (gameID) { 
	var data = [];
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'startGame',
		gameID: gameID
	});
	
	xhr.onload = function(e) {
		var xml = this.responseXML;
	  	
	  	//alert('show up1');
		var players = xml.documentElement.getElementsByTagName("player");
			
		for (var i = 0; i < players.length; i++) {	
	    	
	    	data.push({
	    		userName: players.item(i).getElementsByTagName("userName").item(0).text,
	    		playerID: players.item(i).getElementsByTagName("playerID").item(0).text,
	    		teamID: players.item(i).getElementsByTagName("teamID").item(0).text,
	    		flagPlacer: players.item(i).getElementsByTagName("flagPlacer").item(0).text,
	    	}); 
	    	//Ti.API.debug('in loop');	
		}
		//alert('show up2');
		
		//Ti.API.debug
		
	 	Ti.App.fireEvent('startGame', {data:data});
	}
}


/*------------------------------------------------------------------------------------------*/

// Return Value:
// the gameID of the newly created Game
function createGame (playerID, gameName, userName, latitude, longitude) { 
	//var data = [];
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'createGame',
		playerID: playerID,
		gameName: gameName,
		userName: userName,
		latitude: latitude,
		longitude: longitude
	});
	xhr.onload = function(e) {	
	 	var xml = this.responseXML;
		
	 	//var games = xml.documentElement.getElementsByTagName("game");
		
		//for (var i = 0; i < games.length; i++) {	
	    	var data = {
	    		gameID: xml.getElementsByTagName("gameID").item(0).text,
	    		gameName: xml.getElementsByTagName("gameName").item(0).text,
	    		accessCode: xml.getElementsByTagName("accessCode").item(0).text,
	    	};
	    //}
	    //alert('gameID: ' + data.gameID);
	    //alert('gameName: ' + data.gameName);

	    Ti.App.fireEvent('createGame', data);
	}
}

/*------------------------------------------------------------------------------------------*/

// Return Value:
// The ID of the Player who initiated the Game if Game exists, and 'false' if Game does not exist
function gameInitiator (gameID, userID) {
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'gameInitiator',
		gameID: gameID,
		userID: userID
	});
	xhr.onload = function(e) {	
	 	Ti.App.fireEvent('gameInitiator', {data:this.responseText});
	}
}


/*------------------------------------------------------------------------------------------*/

// Return Value:
// An integer that denotes the current game status, 0 if not started, 1 if started
function flagsPlaced (gameID) {
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'flagsPlaced'
	});
	xhr.onload = function(e) {	
	 	Ti.App.fireEvent('flagsPlaced', {data:this.responseText});
	}
}

/*------------------------------------------------------------------------------------------*/

// Parameters:
// the gameID and an array with the Player's information

// Return Value:
// xml array of locations if other players found or “false” if no results found
function playerData (input) { 
	
	var data = [];
	//Ti.API.debug('values thrown to getplayerData: ' + input.gameID);
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	xhr.send({
		action: 'playerData',
		gameID: input.gameID,
		playerID: input.playerID,
		latitude: input.latitude,
		longitude: input.longitude
	});
	
	xhr.onload = function(e) {
		var players = this.responseText;
		
		data = JSON.parse(players);
		
		alert('parsed players from JSON: ' + data['players']);
		alert('parsed flags from JSON: ' + data['flags']);
		
	 	Ti.App.fireEvent('playerData', {data:data});
	 	
	 	
	}
}
/*------------------------------------------------------------------------------------------*/

// Parameters:
// the gameID and an array with the Player's information

// Return Value:
// xml array of locations if other players found or “false” if no results found
function updatePlayerData (input) {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	xhr.send({
		action: 'updatePlayerData',
		gameID: input.gameID,
		playerID: input.playerID,
		latitude: input.latitude,
		longitude: input.longitude,
	});
	
	xhr.onload = function(e) {
	
	 	Ti.App.fireEvent('updatePlayerData', {data:this.responseText});
	 	
	}
}

/*------------------------------------------------------------------------------------------*/

// Return Value:
// true if all flags are placed, false if all flags have not been placed yet
function gameReady (gameID) {
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'gameReady',
		gameID: gameID
	});
	xhr.onload = function(e) {	
	 	Ti.App.fireEvent('gameReady', {data:this.responseText});
	}
}


/*------------------------------------------------------------------------------------------*/

// Return Value:
// true if it worked, false if something didn’t go right
function placeFlag (input) {
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'placeFlag',
		teamID: input.teamID,
		latitude: input.latitude,
		longitude: input.longitude
	});
	xhr.onload = function(e) {	
	 	Ti.App.fireEvent('placeFlag', {data:this.responseText});
	}
}


/*------------------------------------------------------------------------------------------*/

// Return Value:
// true if it worked, false if something went wrong
function flagCaptured (teamID) {
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'placeFlag',
		teamID: teamID
	});
	xhr.onload = function(e) {	
	 	Ti.App.fireEvent('flagCaptured', {data:this.responseText});
	}
}


/*------------------------------------------------------------------------------------------*/

function checkScore (gameID) { 
	var data = [];
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'checkScore',
		gameID: gameID
	});
	
	xhr.onload = function(e) {
		var xml = this.responseXML;
	  		
		var values = xml.documentElement.getElementsByTagName("team");
			
		for (var i = 0; i < values.length; i++) {	
	    	data.push({
	    		teamID: values.item(i).getElementsByTagName("teamID").item(0).text,
	    		teamName: values.item(i).getElementsByTagName("teamName").item(0).text,
	    		points: values.item(i).getElementsByTagName("points").item(0).text,
	    	}); 	
		}	
	 	Ti.App.fireEvent('checkScore', {data:data});
	}
}

/*------------------------------------------------------------------------------------------*/

function checkCode (gameID, accessCode) {
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'checkCode',
		gameID: gameID,
		accessCode: accessCode
	});
	xhr.onload = function(e) {	
	 	Ti.App.fireEvent('checkCode', {data:this.responseText});
	}
}
/*------------------------------------------------------------------------------------------*/

// Return Value:
// the gameID of the newly created Game
function teamInformation (input) { 
	var data = [];
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'teamInformation',
		userID: input.userID,
		gameID: input.gameID,
	});
	xhr.onload = function(e) {	
	 	var xml = this.responseXML;
	 	
	 	//alert('team data');
		
	 	var players = xml.documentElement.getElementsByTagName("player");
		
		//alert('players: ' + players);
		
		for (var i = 0; i < players.length; i++) {	
	    	data.push({
	    		teamName: players.item(i).getElementsByTagName("teamName").item(0).text,
	    		teamID: players.item(i).getElementsByTagName("teamID").item(0).text,
	    		userName: players.item(i).getElementsByTagName("userName").item(0).text,
	    		userID: players.item(i).getElementsByTagName("playerID").item(0).text,
	    	});
	    }
	    //alert('team data: ' + data);
	    
	    Ti.App.fireEvent('teamInformation', {data:data});
	}
}


/*------------------------------------------------------------------------------------------*/

// Return Value:
// information about the status of each flag
function flagStatus (input) { 
	var data = [];
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'flagStatus',
		gameID: input.gameID,
	});
	xhr.onload = function(e) {	
	 	var xml = this.responseXML;
	 	
	 	//alert('team data');
		
	 	var results = xml.documentElement.getElementsByTagName("flag");
		
		for (var i = 0; i < results.length; i++) {	
	    	data.push({
	    		flagTaken: results.item(i).getElementsByTagName("flagTaken").item(0).text,
	    		teamID: results.item(i).getElementsByTagName("teamID").item(0).text,
	    		teamName: results.item(i).getElementsByTagName("teamName").item(0).text,
	    	});
	    }
	    
	    Ti.App.fireEvent('flagStatus', {data:data});
	}
}

/*------------------------------------------------------------------------------------------*/

// Finds the initial locations of both team's flags

// Return Value:
// information about flag locations
function flagLocations (input) { 
	var data = [];
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'flagLocations',
		gameID: input.gameID,
	});
	xhr.onload = function(e) {	
	 	var xml = this.responseXML;
		
	 	var results = xml.documentElement.getElementsByTagName("flag");
		
		for (var i = 0; i < results.length; i++) {	
	    	data.push({
	    		teamID: results.item(i).getElementsByTagName("teamID").item(0).text,
	    		teamName: results.item(i).getElementsByTagName("teamName").item(0).text,
	    		latitude: results.item(i).getElementsByTagName("flagLatitude").item(0).text,
	    		longitude: results.item(i).getElementsByTagName("flagLongitude").item(0).text,
	    	});
	    }
	    
	    Ti.App.fireEvent('flagLocations', {data:data});
	}
}
/*------------------------------------------------------------------------------------------*/

// Called when a team's flag is taken, but not captured

// Return Value:
// true if it worked or false if it didn't work
function flagTaken (input) { 
	var data = [];
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'flagTaken',
		teamID: input.teamID,
	});
	xhr.onload = function(e) {	
	    
	    Ti.App.fireEvent('flagTaken', {data:this.responseText});
	}
}
/*------------------------------------------------------------------------------------------*/

// Return Value:
// true if they are the placer, false if they are not the placer
function userInfo (input) { 
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	xhr.send({
		action: 'userInfo',
		gameID: input.gameID,
		userID: input.userID,
	});
	xhr.onload = function(e) {	
	 	var xml = this.responseXML;
    	var data = {
    		flagPlacer: xml.documentElement.getElementsByTagName("flagPlacer").item(0).text,
    		teamID: xml.documentElement.getElementsByTagName("teamID").item(0).text,
    		teamName: xml.documentElement.getElementsByTagName("teamName").item(0).text,
    		userID: xml.documentElement.getElementsByTagName("playerID").item(0).text,
    		userName: xml.documentElement.getElementsByTagName("userName").item(0).text,
    	};
 
    	Ti.App.fireEvent('userInfo', {data:data});
	}
}
/*------------------------------------------------------------------------------------------*/

// checks if 2 or more people are in a game

// Return Value:
// true if 2 or more, otherwise false
function startGameReady (input) { 
	var data = [];
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'startGameReady',
		gameID: input.gameID
	});
	xhr.onload = function(e) {	
	    //alert('startGameReady condition: ' + this.responseText);
	    Ti.App.fireEvent('startGameReady', {data:this.responseText});
	}
}

/*------------------------------------------------------------------------------------------*/

// checks if 2 or more people are in a game

// Return Value:
// true if 2 or more, otherwise false
function resetFlag (input) { 
	var data = [];
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'resetFlag',
		gameID: input.gameID,
		teamID: input.teamID
	});
	xhr.onload = function(e) {	
	    //alert('startGameReady condition: ' + this.responseText);
	    Ti.App.fireEvent('resetFlag', {data:this.responseText});
	}
}


/*------------------------------------------------------------------------------------------*/

// add methods
api.gamePlayers = gamePlayers;
api.findGames = findGames;
api.joinGame = joinGame;
api.gameStatus = gameStatus;
api.startGame = startGame;
api.createGame = createGame;
api.gameReady = gameReady;
// api.getPlayerData = getPlayerData;
api.updatePlayerData = updatePlayerData;
api.playerData = playerData;
//api.flagsPlaced = flagsPlaced;
api.placeFlag = placeFlag;
api.flagCaptured = flagCaptured;
api.checkCode = checkCode;
api.gameInitiator = gameInitiator;
api.teamInformation = teamInformation;
api.flagStatus = flagStatus;
api.flagTaken = flagTaken;
api.flagLocations = flagLocations;
api.userInfo = userInfo;
api.checkScore = checkScore;
api.startGameReady = startGameReady;
api.resetFlag = resetFlag;

//public interface
exports.api = api;


