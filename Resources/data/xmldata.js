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
		var xml = this.responseXML;
		var games = xml.documentElement.getElementsByTagName("game");
			
		for (var i = 0; i < games.length; i++) {
	    	data.push({
	    		gameID: games.item(i).getElementsByTagName("gameID").item(0).text,
	    		accessCode: games.item(i).getElementsByTagName("accessCode").item(0).text,
	    		initiatorID: games.item(i).getElementsByTagName("initiatorID").item(0).text,
	    		gameName: games.item(i).getElementsByTagName("gameName").item(0).text,
	    		gameLatitude: games.item(i).getElementsByTagName("gameLatitude").item(0).text,
	    		gameLongitude: games.item(i).getElementsByTagName("gameLongitude").item(0).text,
	    		flagsPlaced: games.item(i).getElementsByTagName("flagsPlaced").item(0).text,
	    		gameStatus: games.item(i).getElementsByTagName("gameStatus").item(0).text,
	    	}); 	
		}
	 	Ti.App.fireEvent('findGames', {data:data});
	}
}


/*------------------------------------------------------------------------------------------*/

// Return Value:
// xml data of player’s name and ID number
function gamePlayers (gameID) { 
	var data = [];
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action:'gamePlayers',
		gameID:gameID
	});
	
	xhr.onload = function(e) {
		var xml = this.responseXML;
	  		
		var games = xml.documentElement.getElementsByTagName("player");
			
		for (var i = 0; i < player.length; i++) {	
	    	data.push({
	    		userName: games.item(i).getElementsByTagName("userName").item(0).text,
	    		playerID: games.item(i).getElementsByTagName("playerID").item(0).text,
	    	}); 	
		}	
	 	Ti.App.fireEvent('gamePlayers', {data:data});
	}
}

/*------------------------------------------------------------------------------------------*/

// Return Value
// "true" or "false" depending on if the operation occurred successfully
function joinGame (gameID, userID, userName) { 
	var data = [];
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action:'joinGame',
		userID: userID,
		userName: userName
	});
	
	xhr.onload = function(e) {
	 	Ti.App.fireEvent('joinGame', {data:this.responseText});
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
// An integer that denotes the current game status, 0 if not started, 1 if started
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
	  		
		var games = xml.documentElement.getElementsByTagName("player");
			
		for (var i = 0; i < player.length; i++) {	
	    	data.push({
	    		userName: games.item(i).getElementsByTagName("userName").item(0).text,
	    		playerID: games.item(i).getElementsByTagName("playerID").item(0).text,
	    		teamID: games.item(i).getElementsByTagName("teamID").item(0).text,
	    	}); 	
		}	
	 	Ti.App.fireEvent('gamePlayers', {data:data});
	}
}


/*------------------------------------------------------------------------------------------*/

// Return Value:
// the gameID of the newly created Game
function createGame (playerID, gameName, userName, latitude, longitude) { 
	var data = [];
	
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
	 	Ti.App.fireEvent('createGame', {data:this.responseText});
	}
}

/*------------------------------------------------------------------------------------------*/

// Return Value:
// The ID of the Player who initiated the Game if Game exists, and 'false' if Game does not exist
function gameInitator (gameID) {
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'gameInitiator'
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
function playerData (gameID, values) { 
	var data = [];
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'getLocations',
		gameID: gameID,
		playerID: values['playerID'],
		latitude: values['latitude'],
		longitude: ['longitude'],
		canTag: values['canTag'],
		canBeTagged: values['canBeTagged'],
		hasFlag: values['hasFlag']
	});
	
	xhr.onload = function(e) {
		var xml = this.responseXML;
	  		
		var values = xml.documentElement.getElementsByTagName("player");
			
		for (var i = 0; i < values.length; i++) {	
	    	data.push({
	    		playerID: values.item(i).getElementsByTagName("playerID").item(0).text,
	    		latitude: values.item(i).getElementsByTagName("playerLatitude").item(0).text,
	    		longitude: values.item(i).getElementsByTagName("playerLongitude").item(0).text,
	    	}); 	
		}	
	 	Ti.App.fireEvent('getLocations', {data:data});
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
function placeFlag (teamID, latitude, longitude) {
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action: 'placeFlag',
		teamID: teamID,
		latitude: latitude,
		longitude: longitude
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
			
		for (var i = 0; i < teams.length; i++) {	
	    	data.push({
	    		teamID: values.item(i).getElementsByTagName("teamID").item(0).text,
	    		color: values.item(i).getElementsByTagName("color").item(0).text,
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



/*------------------------------------------------------------------------------------------*/



/*------------------------------------------------------------------------------------------*/

// add methods
api.gamePlayers = gamePlayers;
api.findGames = findGames;
api.joinGame = joinGame;
api.gameStatus = gameStatus;
api.startGame = startGame;
api.createGame = createGame;
api.gameReady = gameReady;
api.playerData = playerData;
api.flagsPlaced = flagsPlaced;
api.placeFlag = placeFlag;
api.flagCaptured = flagCaptured;
api.checkCode = checkCode;


//public interface
exports.api = api;


