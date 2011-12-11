/*

Copyright (c) 2011 MIT

Bradley University - Interactive Media Department

Authors-
Adam Zimmerman
Jesse White

*/

/*-------------------------------------------------------------------*/





exports.gamePage = function(input) {
	
	// Create the Game Page Window
	var instance = Ti.UI.createWindow({
		backgroundImage:'images/SmallLogoTop.jpg'
	});
	
	/*----------------------------------------------------------------------------------------------------*/
	
	
	// Simplify the Arguments
	playerID = Ti.Platform.id;
	gameID = input.gameID;
	var flagLocations;
	Ti.App.addEventListener('flagData', function(input) {
		flagLocations = input.flags;
		//alert('flag locations in global scope: ' + flagLocations);
	});
	
	
	
	//puts the center lat in the global scope
	Ti.App.addEventListener('centerLocation', function(input) {
		var centerLat = input.centerLat;
	});
	
	//var flagLocations = ['something', 'something'];
	
	//Ti.API.debug('my player id is ' + playerID);
	/*----------------------------------------------------------------------------------------------------*/
	
	// Begin Geolocation Services
	
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
	
	// Called after location found
	function updatePosition(e) {
		if( ! e.success || e.error ) {
		    alert("Unable to get your location.");
		    Ti.API.debug(JSON.stringify(e));
		    Ti.API.debug(e);
		    return;
		}
		
		Ti.App.fireEvent("app:got.location", {"coords" : e.coords});
		
	};
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
	
	// Gets current location
	function getLocation() {
		Titanium.Geolocation.getCurrentPosition( updatePosition );
	}
	
	function getPlayerLocation() {
		Titanium.Geolocation.getCurrentPosition( updatePlayerPosition );
	}
	
	
	
	/*----------------------------------------------------------------------------------------------------*/
	
	
	// Checks if current user is a flag placer
	var webAPI = new globals.xml.userInfo({userID:input.userID, gameID:input.gameID});


	
	
	/*----------------------------------------------------------------------------------------------------*/
	
	
	
	// Checks if flags are placed
	function checkFlags() {
		//alert('gameID for checking if flags are placed: ' + input.gameID);
		var webAPI = new globals.xml.gameReady(input.gameID);
	};
	
	
	/*----------------------------------------------------------------------------------------------------*/
	
		onlyOnce = 0;
	
		
	
		if (onlyOnce == 0);
	
		// Listens for information determining if user is a flag placer
		Ti.App.addEventListener('userInfo', function(input) {
			getLocation();
			Ti.App.addEventListener("app:got.location", function(d){
				var region={
		            latitude: d.coords.latitude,
		            longitude: d.coords.longitude,
		            animate:true,
		            latitudeDelta:0.003,
		            longitudeDelta:0.003
	        	};
        		mapCreateView.setLocation(region);
			});
			
			
			//alert('Team Name is: ' + input.data.teamName)
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
					title:'Place Flag'
				});
				instance.add(placeFlagButton);
				
				
				//listens for place flag button to be clicked
				placeFlagButton.addEventListener('click', function() {
					//starts timer to check if both flags are placed
					flagsPlacedTimer = setInterval(checkFlags, 5000);
					
					//get current location
					getLocation();
					
					//wait for current location
					Ti.App.addEventListener("app:got.location", function(d) {
					    Ti.API.debug(JSON.stringify(d));
					    Ti.Geolocation.removeEventListener('location', updatePosition);
					
						//place human flag
						//if(input.data.teamName == 'Humans') {
							//alert('In the humans conditional')
							// var flag = Ti.Map.createAnnotation({
								// animate:true,
								// image: 'images/miniIcons/Human/Human_Flag.png',
								// latitude: d.coords.latitude,
								// longitude: d.coords.longitude
							// });
// 							
							// mapCreateView.addAnnotation(flag);
						//}
						//place alien flag
						// if(input.data.teamName == 'Aliens') {
							// var flag = Ti.Map.createAnnotation({
								// animate:true,
								// image: 'images/miniIcons/Alien/Alien_Flag.png',
								// latitude: d.coords.latitude,
								// longitude: d.coords.longitude
							// });
// 							
							// mapCreateView.addAnnotation(flag);
						//}
						//place flag button clicked
						Ti.API.debug('place flag button clicked')
						//alert(input.data.teamID + d.coords.latitude + d.coords.longitude)
						//saves the flag location
						
						// Ti.API.debug('flag location lats are: )
						
						// Ti.API.debug('center lat is: ' + centerPoint);
						
						
						var webAPI = new globals.xml.placeFlag({teamID: input.data.teamID, latitude: d.coords.latitude, longitude: d.coords.longitude});
						
					});
				
					//removes place flag button
					instance.remove(placeFlagButton);
					placeFlagButton.removeEventListener('click', function(){});
					
					
					
				});	
			}
			else {
				//notify them to wait for flags to be placed
				alert('wait for flags to be placed'); //convert to window that is dismissed when game starts *******
				//starts timer to check if both flags are placed
				flagsPlacedTimer = setInterval(checkFlags, 5000);	
			}
			
		
		});
		
	
	/*----------------------------------------------------------------------------------------------------*/

	// Creates a Map View
	var mapCreateView = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD,
			height:320,
			width:275,
			top: 100,
			userLocation: true,
			borderColor: '#d6d6d6',
			borderWidth:5,
			borderRadius:4,
	});	
	
	/*----------------------------------------------------------------------------------------------------*/
	
	
	
	/*----------------------------------------------------------------------------------------------------*/
	
	
	// Waits for game to be ready
	Ti.App.addEventListener('gameReady', function(input){
		// both flags are placed
		if(input.data == 'true'){
			//ends timer
			clearInterval(flagsPlacedTimer);
			
			Ti.API.debug('the game is beginning');
			
			//starts the game
			var info = startGame();
			
			//var centerLat = info.centerLat;
			//alert('data: ' + info.flagLocations);
			
			//flagLocations = info.flagLocations;
		}
		// flags not placed yet
		else {
			Ti.API.debug('both flags not yet placed');
		}
	});

	/*----------------------------------------------------------------------------------------------------*/
	

	//Sets up the Game
	function startGame() {
		//get flag locations
	
		var webAPI = new globals.xml.flagLocations({gameID:gameID});
		
		//receives flag location data
		Ti.App.addEventListener('flagLocations', function(input){
			/*-------------------------------*/
			
			Ti.App.fireEvent('flagData', {flags:input.data});
			
			//flagLocations=input.data;
			var hDone = 0;
			var aDone = 0;
			// if both flags placed **** gonna need this from the XML
			for (key in input.data) {
				
				
				var flag = input.data[key]
				switch (flag.teamName) {
					case 'Humans':
						var humanCenterLat;
						var humanCenterLon;
						var humanFlag = Ti.Map.createAnnotation({
							animate:true,
							image: 'images/miniIcons/Human/Human_Flag.png',
							latitude: flag.latitude,
							longitude: flag.longitude
						});
						var humanCenterLat = flag.latitude;
						var humanCenterLon = flag.longitude;
						
						mapCreateView.addAnnotation(humanFlag);
						hDone = 1;
						break;
						
					case 'Aliens':
						var alienCenterLan;
						var alienFlag = Ti.Map.createAnnotation({
							animate:true,
							image: 'images/miniIcons/Alien/Alien_Flag.png',
							latitude: flag.latitude,
							longitude: flag.longitude
						});
						var alienCenterLat = flag.latitude;
						var alienCenterLon = flag.longitude;
	
						
						mapCreateView.addAnnotation(alienFlag);
						aDone = 1;
						break;
				};
				
				//mapCreateView.add(centerMarker);
				
			};
			if (hDone == 1 && aDone == 1){
					centerLat = (parseFloat(humanCenterLat) + parseFloat(alienCenterLat)) / 2;
					centerLon = (parseFloat(humanCenterLon) + parseFloat(alienCenterLon)) / 2;
					
					
					Ti.API.debug('Center Latitude = ' + centerLat + centerLon)
					var centerMarker = Ti.Map.createAnnotation({
						latitude: centerLat,
						longitude: centerLon,
						image: 'images/line.png'
					});
					// Place the center flag
					mapCreateView.addAnnotation(centerMarker);
			};
			
			
			
			//return centerLat to local global scope
			Ti.App.fireEvent('centerLocation', {centerLat:centerLat});
			
			
			alert('Both flags placed. Get ready.');
			
			//start game timer
			gameTimer = setInterval(gamePlay, 5000);
			//gamePlay({flags:input.data});
			
			
			
			
			/*-------------------------------*/
		});
		
		
		
		//return {centerLat:centerLat, flagLocations:flagLocations};
	}
	
	/*----------------------------------------------------------------------------------------------------*/
	
	// GamePlay
	
	//the update function called on an interval
	//do everything you do every frame
	//this will be like on update in Unity
	//the timing can be set in startGame()
	function gamePlay() {
		Ti.API.debug(' the center lat in the global scope is: ' + centerLat);	
		
		
		//Titanium.Geolocation.getCurrentPosition( updatePosition );
		
		
		
		//gets the current location of the user
		getPlayerLocation();
		
		//check tagging conditions
		Ti.App.addEventListener("app:got.Playerlocation", fooFunction2 = function(d) {
			Ti.App.removeEventListener("app:got.Playerlocation", fooFunction2);
			
			
			Ti.API.debug('Info for Player Data: ' + gameID + playerID + d.coords.latitude + d.coords.longitude)
			
			//updates player data on server and returns other player's locations
			var web = new globals.xml.playerData({
				gameID: gameID,
				playerID: playerID,
				latitude: d.coords.latitude,
				longitude: d.coords.longitude,
				canTag: 0,
				canBeTagged: 0,
				hasFlag: 0
			});
		});
		// if (distance(player, players) < 10)
		
		// Create constantly updating annotations
		
		// Ti.App.addEventListener('playerData', function(input){
			// var data = [];
			// for(var key in input.data){
				// var g = input.data[key]
				// var annotData = {
					// title: g.playerID,
					// latitude: g.latitude,
					// longitude: g.longitude
				// };
				// data.push(data);
			// };
			// alert(data);
			// mapCreateView.setAnnotations(data);
		// });
// 		
		
		//update flag conditions
		//updateFlags();	
			
		
		
	}
	

	/*----------------------------------------------------------------------------------------------------*/

	function gameOver() {
		
		
		
	}
	
	/*----------------------------------------------------------------------------------------------------*/
	
	// Flag Capture
	
	Ti.App.addEventListener('flagCaptured', function(input){
		//get current score
		var webAPI = new globals.xml.checkScore(gameID);
		
		//recieves score data
		Ti.App.addEventListener('checkScore', function(input) {
			//the game is over
			if(input.data[0].points > 3 || input.data[1].points > 3) {
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
				displayScore({alienScore:input.data[0], humanScore:input.data[1]});
			}
		});


			//storyElement();
	});
	
	/*----------------------------------------------------------------------------------------------------*/
	
	// Scoring System
	
	function displayScore(input) {
		//display human score
		var humanScore = Ti.UI.createLabel({
			text: '  Humans: ' /*+ input.humanScore,*/,
			color: '#fff',
			top: 65,
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
	
		
		//display alien score
		var alienScore = Ti.UI.createLabel({
			text: '    Aliens: ' /*+ input.alienScore*/,
			color: '#fff',
			top: 65,
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
	}
	
	/*----------------------------------------------------------------------------------------------------*/
	
	// Display victory text
	function victory(input) {
		if(input == 'human') {
			//display humans won
			alert('humans won');
		}
		else {
			//display aliens won
			alert('aliens won');
		}
		//create main menu button
	};
	
	/*----------------------------------------------------------------------------------------------------*/
	
	//updates flag icons on the map
	function updateFlags() {
		Ti.API.debug('checking the flag status');
		var webAPI = new globals.xml.flagStatus({gameID:gameID});
		
		Ti.App.addEventListener('flagStatus', function(input){
			Ti.API.log('new flag status information recieved');
			
		});
	}

	/*----------------------------------------------------------------------------------------------------*/
	
	
	// Listens for updatePositions to finish
	Ti.App.addEventListener("app:got.location", fooFunction = function(d) {
	  	Ti.App.removeEventListener('app:got.location', fooFunction)
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
	    
	    //var webAPI = new globals.xml.playerData(data);
	    
	 
	});
	
	/*----------------------------------------------------------------------------------------------------*/
	mapCount = 0
	var mapData = [];
	//Listens for data to be returned about the other players
	Ti.App.addEventListener('playerData', function(data){
		
		
		//alert(' flag Locations are: ' + flagLocations)
		playerProximity({players: data.data, flags: flagLocations});
		
		Ti.App.addEventListener('playerProximity', fooFunction3 = function(){
			Ti.App.removeEventListener('playerProximity', fooFunction3);
			
			//alert('this is whats in map data: ' + mapData);
			Ti.API.debug('playerData firing: ' + mapCount)
			// set up array to contain annotation of everything
			//mapCreateView.removeAnnotations(mapData);
			
			//var mapData = [];
			if (mapCount>2){
				for (key in mapData){
					mapCreateView.removeAnnotation(mapData[key]);
					//alert('going to remove Annotations')
				};
				
			}
			mapData = [];
			// for loop to pull the data for each event
			for (var key in data.data) {
				// key the events in "e"
				var player = data.data[key];
				// pull the data from e and set it to lat, lon, and title
				if (player.playerID != playerID){
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
					//animate: true
				});
				
				//mapCreateView.removeAnnotations(mapData);
				// push this all back to the data array
				mapData.push(playerData);
				};
			}
			mapCreateView.zoom(1); 
			mapCreateView.zoom(-1);	
			mapCreateView.addAnnotations(mapData);
			mapCount++
		
		});
		
	});
	
	//updates maps view
	// function updateMap(data) {
		// alert('other locations recieved' + data);
	// }

	/*----------------------------------------------------------------------------------------------------*/
	
	function playerProximity(input) {
	//loops through all players
		for(var key in input.players) {
			
				//PARAMETERS
				//current player object from loop
				//array of player objects from from playerData
				//array of flag objects from flagLocations
				
				//alert('current player: ' + input.players[key]);
				//alert('players: ' + input.players);
				//alert('flags: ' + input.flags);
				
				//alert('players array: ' + JSON.stringify(input.players));
				
				checkPlayer({player:input.players[key], players:input.players, flags:input.flags});
				
				
				
				
				//PARAMETERS
				//current player object from loop
				//array of flag objects from gameInfo 
				checkFlagsProximity({player:input.players[key], flags:input.flags});
		};
		Ti.App.fireEvent('playerProximity');
	};
	
	/*----------------------------------------------------------------------------------------------------*/
	
	//checks other players in relation to one player
	function checkPlayer(input) {
		//loops through all other players
		for(var key in input.players) {
			//create a variable for other player
			var otherPlayer = input.players[key]; 
			
			
			
			//alert('current player: ' + input.player);
			alert('current player: ' + JSON.stringify(input.player));
			
			//*******************************
			//set location based variables
		
			//if they are in their territory
			if(ownTerritory({player: input.player, flags:input.flags})) {
				Ti.API.debug(input.player.userName + ' in own territory.')
				//if they aren't tagged
				if(input.player.tagged == 0) {
					//enable tagging
					input.player.canTag = 1;
					//disable can be tagged
					input.player.canBeTagged = 0;
				}		
			}
			
			//if they are in enemy territory
			else {
				Ti.API.debug(input.player.userName + ' in enemy territory.')
				//enable can be tagged
				input.player.canBeTagged = 1;
				//disable tagging
				input.player.canTag = 0;
			}
			
			//*******************************
			//set proximity based variables
			
			//Ti.API.debug('in check player');
			//alert('team id comparison: ' + input.player.teamID + ' ' + input.players[key].teamID);
			
			
			//on opposite teams
			if(input.player.teamID != input.players[key].teamID) {
				
				//if they are close
				if(distance({one:{latitude:input.player.latitude, longitude:input.player.longitude}, two:{latitude:input.players[key].latitude, longitude:input.players[key].longitude}}) < .005) {
					//if tagging conditions met
					
					if(input.player.canTag == 1 && otherPlayer.canBeTagged == 1) {
						//tag the player
						input.players[key].tagged = 1;
						//disable others from tagging them
						input.players[key].canBeTagged = 0;
						//disable tagging
						input.players[key].canTag = 0;
						
						
						
						if(input.players[key].playerID = playerID) {
							//set timer
							countdown_init({player: input.players[key]})
						}
						
						
						//if they were carrying a flag
						if(input.player.hasFlag == 1) {
							//remove the flag
							input.player.hasFlag = 0;
							
							//reset the flag
							globals.xml.resetFlag({teamID:input.player.teamID, gameID:input.player.gameID})
							
						}
					}
				}
			}
			//on the same team
			else {
				//do nothing.
			}
		}
	}
	
	//-----------------------------------------------------------------------------------------------------------------------------
	
	//checks player proximity to either flag
	function checkFlagsProximity(input) {
		//loops through both flags
		for(var key in input.flags) {
			//player is on opposite team as the flag
			if(input.player.teamID != input.flags[key].teamID) {
				//alert('check flag proximity player data for opposite team: ' + input.player.latitude);
				
				//check if they are at the other team's base
				Ti.API.debug('checking if in other teams base');
				if(distance({one:{latitude:input.player.latitude, longitude:input.player.longitude}, two:{latitude:input.flags[key].latitude, longitude:input.flags[key].longitude}}) < .005) {
					//send data about which flag was taken
					webAPI = globals.xml.flagTaken({teamID:input.flags[key].teamID})
					//update the player status
					input.player.hasFlag = 1;
					
				}
			}
			//player is on the same team as the flag
			else {
				alert('check flag proximity player data for same team: ' + input.player.latitude);
				
				//close to the base
				Ti.API.debug('close to base')
				if (distance({one:{latitude:input.player.latitude, longitude:input.player.longitude}, two:{latitude:input.flags[key].latitude, longitude:input.flags[key].longitude}}) < .006){
					//disable the player's ability to tag
					input.player.canTag = 0;
					
					//check if they are carrying a flag
					if(input.player.hasFlag) {
						//check if they are at the base
						Ti.API.debug('If player has a flag')
						if(distance({one:{latitude:input.player.latitude, longitude:input.player.longitude}, two:{latitude:input.flags[key].latitude, longitude:input.flags[key].longitude}}) < .005) {
							//update the score
							webAPI = globals.xml.flagCaptured(input.flags[key].teamID)
						}
						//reset the hasFlag value for the player
						input.player.hasFlag = 0;
						//alert('flag Proximity: ' + one + two)
					}
				}
			}
		}
	}
	
	//-----------------------------------------------------------------------------------------------------------------------------
	
	//calculates distance between 2 pairs of coordinates
	//accepts objects structed in the following format
	//{1:{latitude:value, longitude:value}, 2:{latitude:value, longitude:value}}
	function distance(input) {
		var lat1 = input.one.latitude;
		var	lon1 = input.one.longitude;
		var lat2 = input.two.latitude;
		var lon2 = input.two.longitude;
		
		alert('Lat and Lons are: Lat 1: ' + lat1 + 'Lon 1: ' + lon1 + 'Lat 2: ' + lat2 + 'Lon 2: ' + lon2);
		
		
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
	
	function ownTerritory(input) {
		
		//need to determine which flag has a higher location
		if(input.flags[0].latitude > input.flags[1].latitude) {
			var topFlag = input.flags[0].teamID;
		}
		else {
			var topFlag = input.flags[1].teamID;
		}
		
		//if player's team has top flag
		if(input.player.teamID == topFlag){
			//if player is in their region
			if(input.player.latitude > centerLat) {
				return true;
			}
			else {
				return false;
			}
		}
		//player's team has bottom flag
		else {
			//player is in their region
			if(input.player.latitude < centerLat) {
				return true;
			}
			else {
				return false;
			}
		}
	}
	
	//-----------------------------------------------------------------------------------------------------------------------------
	
	
	var countdown;
	var countdown_number;
	
	
	function countdown_init(input) {
	    countdown_number = 31;
	    countdown_trigger({player:input.player});
	}
	
	function countdown_trigger(input) {
	    if(countdown_number > 0) {
	        countdown_number--;
	        
	        Ti.API.debug('player: ' + input.player.playerID + ' disabled for ' + countdown_number + ' seconds');
	        
	        if(countdown_number > 0) {
	            countdown = setTimeout('countdown_trigger()', 1000, input);
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

	
	// Story Elements Display
	
	
	function displayStoryElement(score) {
		var storyText = {
			'1-0': "The humans have infiltrated our base and stole some of our resources!!",
			'2-0': "The humans are dominating us!! We need back up!",
			'3-0': "The humans have won and taken all of our resources!!",
			'3-1': "The humans have won and taken all of our resources!!",
			'3-2': "The humans have won and taken all of our resources!!",
			'2-1': "The Aliens are beating us!!",
			'1-1': "The score is tied up!!",
			'2-2': "The score is tied up!!",
			'0-1': "The Aliens took our resources, back-up needed!!",
			'0-2': "The Aliens are surrounding us!! Troops fall back!!",
			'0-3': "The Aliens have won and taken all our resources!!",
			'1-3': "The Aliens have won and taken all our resources!!",
			'2-3': "The Aliens have won and taken all our resources!!",
			'2-1': "The Humans are beating us!!"
		}
		//display story element
		//alert(storyText.(score.toString));
		alert('a story element');
		
	}
	
	/*----------------------------------------------------------------------------------------------------*/
	
	//	Story Element
		
	function storyElement(input) {
		human = input.human.score;
		alien = input.alient.score;
		score = human+'-'+alien;
		displayStoryElement(score);
	}
	
	/*----------------------------------------------------------------------------------------------------*/
	
	// Legend Window
	
	// Legend Button
	var legendButton = Ti.UI.createButton({
		height:20,
		bottom:10,
		left:30,
		width:90,
		title:'Legend'
	});
	
	// Add it to the window
	instance.add(legendButton);
	
	// The event listener
	legendButton.addEventListener('click', function(){
		
		
		var legWin = Ti.UI.createWindow({
			height: 350,
			width: 200,
			backgroundColor: '#000'
		});
		
		legWin.open();
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
		legTable = Ti.UI.createTableView({
			data:data,
			height: 300,
			width:150
		});
		
		
		
		scrolly.add(legTable);
		legWin.add(scrolly);
		
		// Close Button
		var close = Ti.UI.createButton({
			bottom:2,
			height:20,
			width:50,
			title:'Close'
		})
		
		legWin.add(close);
		close.addEventListener('click', function(){
			legWin.close();
		});
		
	});
	
	
	/*----------------------------------------------------------------------------------------------------*/
	
	
	// Add To the Window
	
	instance.add(mapCreateView);
	instance.open();
	
	/*----------------------------------------------------------------------------------------------------*/
	
	
	// Back Button
	var back = Ti.UI.createButton({
		title:'Home',
		height: 20,
		width: 60,
		bottom:10
	});
	instance.add(back);
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
	});
	
	/*----------------------------------------------------------------------------------------------------*/
	
	
	return instance	

};


