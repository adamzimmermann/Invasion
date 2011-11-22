var api = {};


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

// returns "true" or "false"
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






/*------------------------------------------------------------------------------------------*/

// add methods
api.gamePlayers = gamePlayers;
api.findGames = findGames;
api.joinGame = joinGame;
api.gameStatus = gameStatus;
api.startGame = startGame;

//public interface
exports.api = api;


