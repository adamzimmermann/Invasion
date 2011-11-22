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
		//3
		//alert('onload called');
		
		var xml = this.responseXML;
	  		
		var games = xml.documentElement.getElementsByTagName("game");
		
			
		for (var i = 0; i < games.length; i++) {
			
	    	data.push({
	    		userName: games.item(i).getElementsByTagName("userName").item(0).text,
	    		playerID: games.item(i).getElementsByTagName("playerID").item(0).text,
	    	}); 	
		}
		
	 	Ti.App.fireEvent('currentPlayers', {data:data});
	}
}


/*------------------------------------------------------------------------------------------*/




function currentPlayers (gameID) { 
	var data = [];
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST','http://ctf.playamericalive.com/form.php');
	
	xhr.send({
		action:'gamePlayers',
		gameID:gameID
	});
	
	xhr.onload = function(e) {
		//3
		//alert('onload called');
		
		var xml = this.responseXML;
	  		
		var games = xml.documentElement.getElementsByTagName("game");
		
			
		for (var i = 0; i < games.length; i++) {
			
	    	data.push({
	    		userName: games.item(i).getElementsByTagName("userName").item(0).text,
	    		playerID: games.item(i).getElementsByTagName("playerID").item(0).text,
	    	}); 	
		}
		
	 	Ti.App.fireEvent('currentPlayers', {data:data});
	}
}

/*------------------------------------------------------------------------------------------*/



/*------------------------------------------------------------------------------------------*/






/*------------------------------------------------------------------------------------------*/



/*------------------------------------------------------------------------------------------*/

// add methods
api.currentPlayers = currentPlayers;
api.findGames = findGames;

//public interface
exports.api = api;


