/*

Copyright (c) 2011 MIT

Bradley University - Interactive Media Department

Authors-
Adam Zimmerman
Jesse White

*/

/*-------------------------------------------------------------------*/



exports.joinGame = function() {
	
	// Create the Join Game Window
	var instance = Ti.UI.createWindow({
		backgroundImage: 'images/SmallLogoTop.jpg'
	});	
	
	
	/*--------------------------------------------------*/
	//alert('at least it fires');
	// Geolocation Code
	
	
	// Makes sure the Get Location is only fired once.
	var onlyOnce=0;
	
	// Sets up GPS Interface
	Ti.App.GeoApp = {};
	Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
	Ti.Geolocation.purpose = "testing";
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;
	 
	// Checks if GPS is enabled
	if( Titanium.Geolocation.locationServicesEnabled === false ) {
	    Ti.API.debug('Your device has GPS turned off. Please turn it on.');
	}
	
	// Called after location found
	function updatePosition(e) {
		if( ! e.success || e.error ) {
		    alert("Unable to get your location.");
		    Ti.API.debug(JSON.stringify(e));
		    Ti.API.debug(e);
		    return;
		}
		if(onlyOnce == 0) {
			//onlyOnce = 1;
		 	// fires location found event
		    Ti.App.fireEvent("app:got.location", {"coords" : e.coords});
		}
	};
	
	// Waits for location to be found
	Ti.App.addEventListener("app:got.location", function(d) {
	    Ti.API.debug(JSON.stringify(d));
	    Ti.Geolocation.removeEventListener('location', updatePosition);	
		if(onlyOnce == 0) {
			//onlyOnce = 1;
			Ti.API.debug('debug crash');
			//finds games within 10 miles
			var webAPI = new globals.xml.findGames(d.coords.latitude, d.coords.longitude);
		}
	});
	
	// Gets current location
	Titanium.Geolocation.getCurrentPosition( updatePosition );   
	
	
	
	/*--------------------------------------------------*/
	
	
	
	// The event listener to trigger when the data from 'Find Games' has been loaded
	Ti.App.addEventListener('findGames', function(input){
		// if (input.data == 'false'){
			// alert('No games found.');
		// } else {
		//Ti.App.removeEventListener('findGames', findFunction);
		// empty data array
		var data = [];
		
		// for loop to populate the table with the available games
		for(var key in input.data){
			var g = input.data[key]
			// var rowdata = {
				// title: g.gameName,
				// //gameID: g.gameID,
			// };
			var row = Titanium.UI.createTableViewRow({
				title: g.gameName,
				height : 50,
				related : g,
				gameID: g.gameID
			});
			
			row.addEventListener('click', function(e) {
				var currentRow = e.row;
				// var buttonClick= Ti.Media.createSound({
					// url: 'sounds/radiobeeps.mp3',
					// });
				// buttonClick.play();
				// alert('current row is: ' + currentRow)
				// alert('current row data: ' + currentRow.gameID)
				Ti.App.fireEvent('gameSelected', {gameID:currentRow.gameID});
			});
		
			data.push(row);
		}
		// List of games
		var table = Ti.UI.createTableView({
			top: 140,
			height: 250,
			width: 250,
			borderColor: '#d6d6d6',
			borderRadius: 2,	 
			borderWidth: 3,
			data: data,
		});
		// Header label	
		var title = Ti.UI.createLabel({
			text: '  Choose a Game',
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

		// Add the title label
		instance.add(title);
		// Add the table
		instance.add(table);
		// }
	});

	
	
	/*--------------------------------------------------*/
	
	
	// Table click listener
	
	Ti.App.addEventListener('gameSelected', function(data){
		
		
		// Load access code screen
		
		aCode = require('ui/common/aCode');
		accessCodeScreen = new aCode({gameID:data.gameID});
		accessCodeScreen.open();
		
		
		
	});
	
	/*--------------------------------------------------*/
	
	
	//creates back button
	var backButton = Ti.UI.createButton({
		backgroundImage: 'images/buttons/backbutton.png',
		backgroundSelectedImage: 'images/buttons/sbackbutton.png',
		height: 40,
		width: 120,
		bottom:15
	});
	
	//listens for click on back button
	backButton.addEventListener('click', function(e){
		// var buttonClick= Ti.Media.createSound({
			// url: 'sounds/radiobeeps.mp3',
			// });
		// buttonClick.play();
		var homePage = require('ui/common/homePage');
		var homePageScreen = new homePage();
		homePageScreen.open();
		instance.close();
	});
	
	instance.add(backButton);
	
	
	/*--------------------------------------------------*/
	
			
	return instance;
};

