exports.joinGame = function() {
	
	// Create the Join Game Window
	var instance = Ti.UI.createWindow({
		backgroundImage: 'images/smallLogoTop.jpg'
	});	
	
	
	/*--------------------------------------------------*/
	
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
			// onlyOnce = 1;
		 	// fires location found event
		    Ti.App.fireEvent("app:got.location", {
		        "coords" : e.coords
			});
		}
	};
	
	// Waits for location to be found
	Ti.App.addEventListener("app:got.location", function(d) {
	    Ti.API.debug(JSON.stringify(d));
	    Ti.Geolocation.removeEventListener('location', updatePosition);	
		if(onlyOnce == 0) {
			onlyOnce = 1;
			//finds games within 10 miles
			var webAPI = new globals.xml.findGames(d.coords.latitude, d.coords.longitude);
		}
	});
	
	// Gets current location
	Titanium.Geolocation.getCurrentPosition( updatePosition );   
	
	
	
	/*--------------------------------------------------*/
	
	
	
	// The event listener to trigger when the data from 'Find Games' has been loaded
	Ti.App.addEventListener('findGames', function(input){
		
		Ti.App.removeEventListener('findGames', function(input){});
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
				// alert('current row is: ' + currentRow)
				// alert('current row data: ' + currentRow.gameID)
				Ti.App.fireEvent('gameSelected', {gameID:currentRow.gameID});
			});
		
			data.push(row);
		}
		// List of games
		var table = Ti.UI.createTableView({
			top: 140,
			height: 280,
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
	});

	
	
	/*--------------------------------------------------*/
	
	
	
	
	// table click listener
	Ti.App.addEventListener('gameSelected', function(data){
		//alert('game selected with gameID: ' + data.gameID);
		
		//load access code screen
		aCode = require('ui/common/aCode');
		accessCodeScreen = new aCode({gameID:data.gameID});
		accessCodeScreen.open();
		
		// var newWin = Ti.UI.createWindow({backgroundColor: '#000'});
		// open it
		// newWin.open();
		// alert('Game ID is: ' + data.gameID)
		// alert('aCode gameID' + data.gameID);
		//newWin.add(aCodeWin);
		
	});
	
	/*--------------------------------------------------*/
	
	
	//creates back button
	var backButton = Ti.UI.createButton({
		title:'back',
		height: 20,
		width: 100,
		bottom:0
	});
	
	//listens for click on back button
	backButton.addEventListener('click', function(e){
		var homePage = require('ui/common/homePage');
		homePage();
	});
	
	instance.add(backButton);
	
	
	/*--------------------------------------------------*/
	
			
	return instance;
};

