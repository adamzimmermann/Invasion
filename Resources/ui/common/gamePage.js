exports.gamePage = function(input) {
	var instance = Ti.UI.createWindow({
		backgroundImage:'images/SmallLogoTop.jpg'
		// backgroundColor:'#000'
	});
	
	// starts up GPS service
	Ti.App.GeoApp = {};
	Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
	Ti.Geolocation.purpose = "testing";
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;
	 
	if( Titanium.Geolocation.locationServicesEnabled === false ) {
	    Ti.API.debug('Your device has GPS turned off. Please turn it on.');
	}
	
	//checks if current user is a flag placer
	var webAPI = new globals.xml.userInfo({userID:input.userID, gameID:input.gameID});

	//creates a Map View
	var mapCreateView = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD,
			region: {latitude:40.697966, longitude:-89.615815, latitudeDelta:0.003, longitudeDelta:0.003},
			height:350,
			width:275,
			top: 100,
			userLocation: true,
			borderColor: '#d6d6d6',
			borderWidth:5,
			borderRadius:4,
	});	
	
	
	
	//checks if flags are placed
	function checkFlags() {
		alert('gameID for checking if flags are placed: ' + input.gameID);
		var webAPI = new globals.xml.gameReady(input.gameID);
	}
	
	
	
	//listens for information determining if user is a flag placer
	Ti.App.addEventListener('flagPlacer', function(input) {
		//check if the user is a flag placer
		if(input.flagPlacer == 'true') {
			//notify them and have them navigate to the desired location
			alert('you are the flag placer');
			alert('navigate to the desired flag location');
			
			//adds Place Flag button
			var placeFlagButton = Ti.UI.createButton({
				height:50,
				top:390,
				width:120,
				title:'Place Flag'
			})
			
			
			//add event listenter
			placeFlagButtonArray.addEventListener(click, function() {
				//starts timer to check if both flags are placed
				gameStatusTimer = setInterval(checkFlags, 5);
				
				//saves the flag location
				var webAPI = new globals.xml.placeFlag(); // NEEDS LOCATION DATA ********
			});		
		}
		else {
			//notify them to wait for flags to be placed
			alert('wait for flags to be placed');
			
			//starts timer to check if flags are placed
			flagsPlacedTimer = setInterval(checkFlags, 5);	
		}
	}
	
	// waits for game to be ready
	Ti.App.addEventListener('gameReady', function(input){
		// both flags are placed
		if(input.data == 'true'){
			//ends timers
			clearInterval(flagsPlacedTimer);
			clearInterval(gameStatusTimer);
			
			//starts the game
			//start location timer
		}
		// flags not placed yet
		else {
			Ti.API.debug('flags not placed');
		}
	});

	



	// called every frame ---- I think this is right or will be right.
	//called by getCurrentPosition
	function updatePosition(e) {
	 
	    if( ! e.success || e.error ) {
	        alert("Unable to get your location.");
	        Ti.API.debug(JSON.stringify(e));
	        Ti.API.debug(e);
	        return;
	    }
	 
	    Ti.App.fireEvent("app:got.location", {
	        "coords" : e.coords
	    });
	};
	
	//listens for updatePositions to finish
	Ti.App.addEventListener("app:got.location", function(d) {
	    // Ti.App.GeoApp.f_lng = d.longitude;
	    // Ti.App.GeoApp.f_lat = d.latitude;
	    Ti.API.debug(JSON.stringify(d));
	    // you need to remove this listener, see the blog post mentioned above
	    Ti.Geolocation.removeEventListener('location', updatePosition);	
	    
	 
	    
	    var data = {
	    	latitude: d.coords.latitude,
	    	longitude: d.coords.longitude,
	    	gameID: 1,
	    	playerID: Ti.Platform.id,
	    	canTag: 1,
	    	canBeTagged: 1,
	    	hasFlag: 0,    	
	    };
	    
	    var webAPI = new globals.xml.playerData(data);
	 
	});
	
	//listens for data to be returned about the other players
	Ti.App.addEventListener('playerData', function(data){
		
		// set up array to contain annotation of everything
		var mapData = [];
		
		// for loop to pull the data for each event
		for (var key in data) {
			// key the events in "e"
			var player = data.data[key];
			// pull the data from e and set it to lat, lon, and title
			
			switch(player.teamName) {
				case 'Humans':
					// can be tagged
					if(player.canBeTagged == 'true') {
						// change player 'flag carrier human'
						if(player.hasFlag == 'false'){
							var image = 'images/miniIcons/Human/Human.png';
						}
						else {
							var image = 'images/miniIcons/Human/Human_Carrier.png';
						}			
					}
					// can't be tagged
					else {
						var image = 'images/miniIcons/Human/Human_Tagged.png';
					}
				
				break;
				
				//---------------------------------------------
				case 'Aliens':
					// can be tagged
					if(player.canBeTagged == 'true'){
						if(player.hasFlag == 'false'){
							var image = 'images/miniIcons/Human/Alien.png';
						}
						else {
							var image = 'images/miniIcons/Human/Alien_Carrier.png';
						}
					}
					else {
						var image = 'images/miniIcons/Alien/Alien_Tagged.png';
					}			
				break;
				
			};
			var playerData = {
				latitude:player.latitude,
				longitude:player.longitude,
				title: 'test',
				image: image	
			}
			
		
			// push this all back to the data array
			mapData.push(playerData);
		}
	
		mapCreateView.setAnnotations(array)
	});
	
	//updates maps view
	// function updateMap(data) {
		// alert('other locations recieved' + data);
	// }
	
	
	Titanium.Geolocation.getCurrentPosition( updatePosition );   
	//Titanium.Geolocation.addEventListener( 'location', updatePosition ); 
	
	
	instance.add(mapCreateView);
	instance.open();
	
	
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
	
	//
	
	return instance	

};


