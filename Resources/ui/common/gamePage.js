/*

Copyright (c) 2011 MIT

Bradley University - Interactive Media Department

Authors-
Adam Zimmerman
Jesse White

*/

/*-------------------------------------------------------------------*/




//ARGUMENTS
//input.gameID
exports.gamePage = function(input) {
	
	// Create the Game Page Window
	var instance = Ti.UI.createWindow({
		backgroundImage:'images/SmallLogoTop.jpg'
	});
	
	
	/*----------------------------------------------------------------------------------------------------*/
	
	// Simplify the Arguments
	playerID = Ti.Platform.id;
	gameID = input.gameID;
	
	/*----------------------------------------------------------------------------------------------------*/
	
	mapCount = 0;
	var mapData = [];
	
	/*----------------------------------------------------------------------------------------------------*/
	
	//puts the flag locations in the global scope
	var flagLocations;
	Ti.App.addEventListener('flagData', function(input) {
		flagLocations = input.flags;
		//alert('flag locations in global scope: ' + flagLocations);
	});
	
	//puts the center lat in the global scope
	Ti.App.addEventListener('centerLocation', function(input) {
		var centerLat = input.centerLat;
	});
	
	/*----------------------------------------------------------------------------------------------------*/
	
	// starts up GPS service
	Ti.App.GeoApp = {};
	Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
	Ti.Geolocation.purpose = "testing";
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;
	 
	if( Titanium.Geolocation.locationServicesEnabled === false ) {
	    Ti.API.debug('Your device has GPS turned off. Please turn it on.');
	}
	
	/*----------------------------------------------------------------------------------------------------*/
	
	// Gets current location for the initial zoom
	function getLocation() {
		Titanium.Geolocation.getCurrentPosition( updatePosition );
	}
	function updatePosition(e) {
		if( ! e.success || e.error ) {
		    alert("Unable to get your location.");
		    Ti.API.debug(JSON.stringify(e));
		    Ti.API.debug(e);
		    return;
		}
		Ti.App.fireEvent("app:got.location", {"coords" : e.coords});	
	};
	
	/*----------------------------------------------------------------------------------------------------*/
	
	// gets the current location for the gamePlay interval
	function getPlayerLocation() {
		Titanium.Geolocation.getCurrentPosition( updatePlayerPosition );
	}
	function updatePlayerPosition(e) {
		if( ! e.success || e.error ) {
		    alert("Unable to get your location.");
		    Ti.API.debug(JSON.stringify(e));
		    Ti.API.debug(e);
		    return;
		}
		Ti.App.fireEvent("app:got.Playerlocation", {"coords" : e.coords});
	};
	
	/*----------------------------------------------------------------------------------------------------*/
	
	//gets player's starting location
	function startingLocation() {
		Titanium.Geolocation.getCurrentPosition( getStartingPosition );
	}
	function getStartingPosition(e) {
		if( ! e.success || e.error ) {
		    alert("Unable to get your location.");
		    Ti.API.debug(JSON.stringify(e));
		    Ti.API.debug(e);
		    return;
		}	
		Ti.App.fireEvent("startingLocation", {"coords" : e.coords});	
	};
	
	/*----------------------------------------------------------------------------------------------------*/
	
	// Checks if flags are placed
	function checkFlags() {
		//alert('gameID for checking if flags are placed: ' + input.gameID);
		var webAPI = new globals.xml.gameReady(input.gameID);
	};
	
	
	/*----------------------------------------------------------------------------------------------------*/
	
	//display the score

	//human score
	var humanScore = Ti.UI.createLabel({
		text: '  Humans: ' + 0,
		color: '#fff',
		top: 35,
		left: 25,
		height:30,
		width: 90,
		font: {fontFamily:'arial', fontSize: 15},
		borderColor: '#d6d6d6',
		borderRadius: 2,	 
		borderWidth: 1,
		backgroundColor: '#000'
	});
	instance.add(humanScore);

	//alien score
	var alienScore = Ti.UI.createLabel({
		text: '    Aliens: ' + 0,
		color: '#fff',
		top: 35,
		right: 25,
		height: 30,
		width: 90,
		font: {fontFamily:'arial', fontSize: 15},
		borderColor: '#d6d6d6',
		borderRadius: 2,	 
		borderWidth: 1,
		backgroundColor: '#000'
	});
	instance.add(alienScore);

	//gets current location
	getLocation();
	
	//listens for current location
	Ti.App.addEventListener("app:got.location", function(d){
		var region={
            latitude: d.coords.latitude,
            longitude: d.coords.longitude,
            animate:true,
            latitudeDelta:0.003,
            longitudeDelta:0.003
    	};
    	//creates a map and zooms into the user's location
		mapCreateView.setLocation(region);
	});

	// Checks if current user is a flag placer
	var webAPI = new globals.xml.userInfo({userID:input.userID, gameID:input.gameID});
	
	// Listens for information determining if user is a flag placer
	Ti.App.addEventListener('userInfo', function(input) {

		//they are the flag placer
		if(input.data.flagPlacer == '1') {
			//notify them and have them navigate to the desired location
			alert('you are the flag placer');
			alert('navigate to the desired flag location and select place flag');
			
			//adds Place Flag button
			var placeFlagButton = Ti.UI.createButton({
				height:20,
				bottom:10,
				right:30,
				width:90,
				backgroundImage: 'images/buttons/placebutton.png',
			});
			instance.add(placeFlagButton);
			
			
			//listens for place flag button to be clicked
			placeFlagButton.addEventListener('click', function() {
				Ti.API.debug('place flag button clicked');
				
<<<<<<< HEAD
				//removes place flag button
				instance.remove(placeFlagButton);
				placeFlagButton.removeEventListener('click', function(){});	
=======
				//adds Place Flag button
				var placeFlagButton = Ti.UI.createButton({
					height:40,
					bottom:10,
					right:30,
					width:100,
					backgroundImage: 'images/buttons/placebutton.png',
					backgroundSelectedImage: 'images/buttons/splacebutton.png',
				});
				instance.add(placeFlagButton);
>>>>>>> 00710ba749f0c232dac0498dc29172038e21dcc4
				
				// var buttonClick= Ti.Media.createSound({
					// url: 'sounds/flagposition.mp3',
				// });
				// buttonClick.play();
				
				//starts timer to check if both flags are placed
				flagsPlacedTimer = setInterval(checkFlags, 5000);
				
<<<<<<< HEAD
				//get current location
				getLocation();
				
				//wait for current location
				Ti.App.addEventListener("app:got.location", function(d) {
				    Ti.Geolocation.removeEventListener('location', updatePosition);
				    
				    //Ti.API.debug(JSON.stringify(d));
					// Ti.API.debug('center lat is: ' + centerPoint);
=======
					//removes place flag button
					instance.remove(placeFlagButton);
					instance.add(back);
					placeFlagButton.removeEventListener('click', function(){});
					
					
>>>>>>> 00710ba749f0c232dac0498dc29172038e21dcc4
					
					//saves the flag location
					var webAPI = new globals.xml.placeFlag({teamID: input.data.teamID, latitude: d.coords.latitude, longitude: d.coords.longitude});
				});			
			});	
		}
		else {
			//notify them to wait for flags to be placed
			alert('wait for flags to be placed');
			//starts timer to check if both flags are placed
			flagsPlacedTimer = setInterval(checkFlags, 5000);	
		}
	});

	// Creates a Map View
	var mapCreateView = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD,
			height:320,
			width:275,
			top: 85,
			userLocation: true,
			borderColor: '#d6d6d6',
			borderWidth:5,
			borderRadius:4,
	});	
	
	/*----------------------------------------------------------------------------------------------------*/
	
	// Waits for game to be ready
	Ti.App.addEventListener('gameReady', function(input){
		//both flags placed
		if(input.data == 'true'){
			Ti.API.debug('the game is beginning');
			
			//ends timer
			clearInterval(flagsPlacedTimer);
			
			//starts the game
			startGame();
		}
		//not all flags placed
		else {
			Ti.API.debug('waiting for both flags to be placed')
		}
	});

	/*----------------------------------------------------------------------------------------------------*/
	
	//Sets up the Game
	function startGame() {
		
		//get player's starting location
		startingLocation();
		
		//listen for player's starting location
		Ti.App.addEventListener('startingLocation', function(input) {
			
			Ti.API.debug('location data: ' + input);
			
			//sets initial player conditions
			var web = new globals.xml.updatePlayerData({
				gameID: gameID,
				playerID: playerID,
				latitude: input.coords.latitude,
				longitude: input.coords.longitude,			
			});
		});
		
		//get flag locations
		var webAPI = new globals.xml.flagLocations({gameID:gameID});
		
		//receives flag location data
		Ti.App.addEventListener('flagLocations', function(input){
			
			//puts flag data into local global scope
			Ti.App.fireEvent('flagData', {flags:input.data});

			//annotates both flags to the map
			for (key in input.data) {				
				var flag = input.data[key]
				switch (flag.teamName) {
					case 'Humans':
						var humanFlag = Ti.Map.createAnnotation({
							animate:true,
							image: 'images/miniIcons/Human/Human_Flag.png',
							latitude: flag.latitude,
							longitude: flag.longitude
						});			
						mapCreateView.addAnnotation(humanFlag);
						break;
						
					case 'Aliens':
						var alienCenterLan;
						var alienFlag = Ti.Map.createAnnotation({
							animate:true,
							image: 'images/miniIcons/Alien/Alien_Flag.png',
							latitude: flag.latitude,
							longitude: flag.longitude
						});
						mapCreateView.addAnnotation(alienFlag);
						break;
				};	
			};
			
			//calculate center point
			centerLatitude = (parseFloat(input.data[0].latitude) + parseFloat(input.data[1].latitude)) / 2;		
			centerLongitude = (parseFloat(input.data[0].longitude) + parseFloat(input.data[1].longitude)) / 2;
			Ti.API.debug('Center Coordinates: ' + centerLatitude + ':' + centerLongitude);
			
			//create center point marker
			var centerMarker = Ti.Map.createAnnotation({
				latitude: centerLatitude,
				longitude: centerLongitude,
				image: 'images/line.png'
			});
			
			//Place the center marker
			mapCreateView.addAnnotation(centerMarker);
			
			//return centerLatitude to local global scope
			Ti.App.fireEvent('centerLocation', {centerLat:centerLatitude});		
			
			alert('Both flags placed. Get ready.');
				
			//start game timer
			gameTimer = setInterval(gamePlay, 5000);
			
		});
	}
	
	/*----------------------------------------------------------------------------------------------------*/
	
	// GamePlay
	
	//the update function called on an interval
	//this will be like on update in Unity
	//the timing can be set in startGame()
	function gamePlay() {
		
		Ti.API.debug('****************************************************************');

		//gets the current location of the user
		getPlayerLocation();
	
		//listens for the user's location
		Ti.App.addEventListener("app:got.Playerlocation", gotPlayerLocation = function(input) {
			Ti.App.removeEventListener("app:got.Playerlocation", gotPlayerLocation);
			
			//update the web
			var webAPI = new globals.xml.PlayerData({playerID:playerID, gameID:gameID, latitude:input.coords.latitude, longitude:input.coords.longitude});
			
			Ti.App.addEventListener('playerData', function(input) {
				
				//annotate the map
				annotateMap(input.data);
				
				//update the score
				updateScore(input.data['flags']);
				
			});		
		});
	}
			
	/*----------------------------------------------------------------------------------------------------*/
			
		
	function annotateMap(input){
					
		//remove map annotations
		if (mapCount>1){
			for (key in mapData){
				mapCreateView.removeAnnotation(mapData[key]);
			};
		}
		//clear map data array
		mapData = [];
		
		//loop through all the players
		for (var key in input.players) {
			//create a current iteration variable
			var player = input.players[key];
			
			//exclude the current user
			if (player.playerID != playerID){
				switch(player.teamName) {
					//a human player
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
					
					//an alien player
					case 'Aliens':
						// can be tagged
						if(player.canBeTagged == 'true'){
							if(player.hasFlag == 'false'){
								var image = 'images/miniIcons/Alien/Alien.png';
							}
							else {
								var image = 'images/miniIcons/Alien/Alien_Carrier.png';
							}
						}
						else {
							var image = 'images/miniIcons/Alien/Alien_Tagged.png';
						}			
					break;		
				};
			
				var playerData = Ti.Map.createAnnotation({
					latitude:player.latitude,
					longitude:player.longitude,
					title: player.userName,
					image: image,
				});
			
				//put current player instance into the array
				mapData.push(playerData);
			};
		}
		//aids with animation of annotations
		mapCreateView.zoom(1); 
		mapCreateView.zoom(-1);	
		
		//adds new locations to the map
		mapCreateView.addAnnotations(mapData);
		mapCount++
		
	}
	

	/*----------------------------------------------------------------------------------------------------*/

	//ends the game
	//clears timers and loads home screen
	function gameOver() {
		if (typeof flagsPlacedTimer != 'undefined') {
			clearInterval(flagsPlacedTimer);
		};
		if (typeof gameTimer != 'undefined') {
			clearInterval(gameTimer);
		};
		var homePage = require('ui/common/homePage')
		var homePageScreen = new homePage();
		homePageScreen.open();
		instance.close();
	}
	
	/*----------------------------------------------------------------------------------------------------*/
	
	
	// Scoring System
	function updateScore(input) {	
		humanScore.text = 'Humans: ' + input[0].points;
		alienScore.text = 'Aliens: ' + input[1].points;
		
		//check if end game conditions met
		if(input[0].points > 3 || input[1].points > 3) {
			//clear game timer
			clearInterval(gameTimer);
			
			//call victory function
			if(input.data[0]<input.data[1]) {
				victory('humans');
			} else {
				victory('aliens');
			}
		}
		//game continues
		else {	
			updateScore({alienScore:input.data[0], humanScore:input.data[1]});
			
			//storyElement({alienScore:input.data[0], humanScore:input.data[1]});
		}
	}
	
	/*----------------------------------------------------------------------------------------------------*/
	
	// Display victory text
	function victory(input) {
		if(input == 'human') {
			//display humans won
			alert('humans won');
			gameOver();
		}
		else {
			//display aliens won
			alert('aliens won');
			gameOver();
		}
		//create main menu button
	};
	
	/*----------------------------------------------------------------------------------------------------*/
	
	//updates flag icons on the map
	function updateFlags() {
		Ti.API.debug('checking the flag status');
		var webAPI = new globals.xml.flagStatus({gameID:gameID});
		
		//listens for flag status information
		Ti.App.addEventListener('flagStatus', function(input){
			Ti.API.log('new flag status information recieved');
		});
	}

	/*----------------------------------------------------------------------------------------------------*/
	
	// Listens for updatePositions to finish
	Ti.App.addEventListener("app:got.location", gotLocationFunction = function(d) {
	  	Ti.App.removeEventListener('app:got.location', gotLocationFunction)
	    // Ti.App.GeoApp.f_lng = d.longitude;
	    // Ti.App.GeoApp.f_lat = d.latitude;
	    Ti.API.debug(JSON.stringify(d));
	    // you need to remove this listener, see the blog post mentioned above
	    Ti.Geolocation.removeEventListener('location', updatePosition);
	 
	});
	
	/*----------------------------------------------------------------------------------------------------*/
	
	//calculates distance between 2 pairs of coordinates
	//accepts objects structed in the following format
	//{one:{latitude:value, longitude:value}, two:{latitude:value, longitude:value}}
	function distance(input) {
		var lat1 = input.one.latitude;
		var	lon1 = input.one.longitude;
		var lat2 = input.two.latitude;
		var lon2 = input.two.longitude;
		
		Ti.API.debug('Latitude 1: ' + lat1 + ', Longitude 1: ' + lon1 + ' // Latitude 2: ' + lat2 + ', Longitude 2: ' + lon2);
		
		var R = 6371; // km
		var dLat = (lat2-lat1) * Math.PI / 180;
		var dLon = (lon2-lon2) * Math.PI / 180;
		var lat1 = lat1 * Math.PI / 180;
		var lat2 = lat2 * Math.PI / 180;
		
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
				Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
				Math.sin(dLon/2) * Math.sin(dLon/2);
				   
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		
		var d = R * c;
		
		Ti.API.debug('Distance between the points is: ' + d)
		
		return d;
	}
	
	//-----------------------------------------------------------------------------------------------------------------------------
	
	
	//not yet implemented countdown timer for when a user is tagged
	var countdown;
	var countdown_number;
	
	function countdown_init(input) {
	    countdown_number = 31;
	    countdown_trigger({player:input.player});
	}
	
	function countdown_trigger(input) {
	    if(countdown_number > 0) {
	        countdown_number--;
	        
	        Ti.API.debug(input.player.userName + ' is disabled for ' + countdown_number + ' seconds');
	        
	        if(countdown_number > 0) {
	            countdown = setTimeout('countdown_trigger', 1000, input);
	        }
	    }
	    else {
	    	//re-enable the player
	    	input.player.tagged = 0;
	    	countdown_clear();
	    }
	}
	function countdown_clear() {
	    clearTimeout(countdown);
	}

	/*----------------------------------------------------------------------------------------------------*/
	
	//	Story Element
	function storyElement(input) {
		human = input.human.score;
		alien = input.alient.score;
		score = 'x' + human + '-' + alien;
		displayStoryElement(score);
	}
	
	/*----------------------------------------------------------------------------------------------------*/
	
	// Story Elements Display
	function displayStoryElement(score) {
		var storyText = {
			'x1-0': "The humans have infiltrated our base and stole some of our resources!!",
			'x2-0': "The humans are dominating us!! We need back up!",
			'x3-0': "The humans have won and taken all of our resources!!",
			'x3-1': "The humans have won and taken all of our resources!!",
			'x3-2': "The humans have won and taken all of our resources!!",
			'x2-1': "The Aliens are beating us!!",
			'x1-1': "The score is tied up!!",
			'x2-2': "The score is tied up!!",
			'x0-1': "The Aliens took our resources, back-up needed!!",
			'x0-2': "The Aliens are surrounding us!! Troops fall back!!",
			'x0-3': "The Aliens have won and taken all our resources!!",
			'x1-3': "The Aliens have won and taken all our resources!!",
			'x2-3': "The Aliens have won and taken all our resources!!",
			'x2-1': "The Humans are beating us!!"
		}
		//display story element
		//alert(storyText.(score.toString()));
		alert('a story element');
		
	}
	
	/*----------------------------------------------------------------------------------------------------*/
	

	
	
	/*----------------------------------------------------------------------------------------------------*/
	
	// Legend Window
	
	// Legend Button
	var legendButton = Ti.UI.createButton({
<<<<<<< HEAD
		height:30,
		bottom:5,
=======
		height:40,
		bottom:10,
>>>>>>> 00710ba749f0c232dac0498dc29172038e21dcc4
		left:30,
		width:100,
		backgroundImage: 'images/buttons/legendbutton.png',
		backgroundSelectedImage: 'images/buttons/slegendbutton.png',
		
	});
	
	// Add it to the window
	instance.add(legendButton);
	
	// The event listener
	legendButton.addEventListener('click', function(){
		
		var legWin = Ti.UI.createWindow({
			height:	400,
			width: 280,
			borderColor: '#d6d6d6',
			borderWidth:2,
			borderRadius:2,
			backgroundColor: '#000'
		});
		
<<<<<<< HEAD
		legendWindow.open();
=======
		
		legWin.open();
		
>>>>>>> 00710ba749f0c232dac0498dc29172038e21dcc4
		data = [];
		
		
		data[0] = Ti.UI.createTableViewRow({title: 'You', leftButton: ''});
		data[1] = Ti.UI.createTableViewRow({title: 'Alien Flag', leftImage: 'images/miniIcons/Alien/Alien_Flag.png'});
		data[2] = Ti.UI.createTableViewRow({title: 'Human Flag', leftImage: 'images/miniIcons/Human/Human_Flag.png'});
		data[3] = Ti.UI.createTableViewRow({title: 'Alien', leftImage: 'images/miniIcons/Alien/Alien_Normal.png'});
		data[4] = Ti.UI.createTableViewRow({title: 'Tagged Alien', leftImage: 'images/miniIcons/Alien/Alien_Tagged.png'});
		data[5] = Ti.UI.createTableViewRow({title: 'Alien Flag Carrier', leftImage: 'images/miniIcons/Alien/Alien_Carrier.png'});
		data[6] = Ti.UI.createTableViewRow({title: 'Human', leftImage: 'images/miniIcons/Human/Human.png'});
		data[7] = Ti.UI.createTableViewRow({title: 'Tagged Human', leftImage: 'images/miniIcons/Human/Human_Tagged.png'});
		data[8] = Ti.UI.createTableViewRow({title: 'Human Flag Carrier', leftImage: 'images/miniIcons/Human/Human_Carrier.png'});
		
		
		var scrolly = Ti.UI.createScrollableView({});
		legendTable = Ti.UI.createTableView({
			data:data,
			height: 345,
			width:250
		});
		
		
		scrolly.add(legendTable);
		legendWindow.add(scrolly);
		
		
		var legendText = Ti.UI.createLabel({
			font: {fontFamily:'Arial',fontSize:16},
			bottom: 370,
			left: 110,
			color: '#fff',
			text: "Legend",
		});
		legWin.add(legendText);
		// Close Button
		var close = Ti.UI.createButton({
			bottom:4,
			height:20,
			width:70,
			title:'Close'
		})
		
		legendWin.add(close);
		close.addEventListener('click', function(){
			
			legendWindow.close();
		});
		
	});
	
	/*----------------------------------------------------------------------------------------------------*/
	
	
	// Back Button
<<<<<<< HEAD
	var backButton = Ti.UI.createButton({
		title:'Home',
		height: 20,
		width: 60,
		bottom:10
	});
	instance.add(backButton);
	backButton.addEventListener('click', function(e){
		gameOver();
=======
	var back = Ti.UI.createButton({
		backgroundImage: 'images/buttons/backbutton.png',
		backgroundSelectedImage: 'images/buttons/sbackbutton.png',
		height:40,
		bottom:10,
		right:30,
		width:100,
	});
	
	back.addEventListener('click', function(e){
		
		if (typeof flagsPlacedTimer != 'undefined') {
			clearInterval(flagsPlacedTimer);
		};
		if (typeof gameTimer != 'undefined') {
			clearInterval(gameTimer);
		};
		var homePage = require('ui/common/homePage')
		var homePageScreen = new homePage();
		homePageScreen.open();
		instance.close();
>>>>>>> 00710ba749f0c232dac0498dc29172038e21dcc4
	});
	
	/*----------------------------------------------------------------------------------------------------*/
	
	instance.add(mapCreateView);
	instance.open();
	
	return instance	

};


