exports.gameLobby = function (input) {
	
	
	
	var instance = Ti.UI.createWindow({backgroundColor: '#000'});
	
	//var webAPI = new globals.xml.gamePlayers(gameID);
	
	
	alert(input)
	Ti.App.addEventListener('gamePlayers', function(input){
		
	});	
	
	
	
	instance.open();
	
	return instance;
	
	
}
