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
						if(input.data.teamName == 'Humans') {
							//alert('In the humans conditional')
							var flag = Ti.Map.createAnnotation({
								animate:true,
								image: 'images/miniIcons/Human/Human_Flag.png',
								latitude: d.coords.latitude,
								longitude: d.coords.longitude
							});
							mapCreateView.addAnnotation(flag);
						}
						//place alien flag
						if(input.data.teamName == 'Aliens') {
							var flag = Ti.Map.createAnnotation({
								animate:true,
								image: 'images/miniIcons/Alien/Alien_Flag.png',
								latitude: d.coords.latitude,
								longitude: d.coords.longitude
							});
							mapCreateView.addAnnotation(flag);
						}
						//place flag button clicked
						Ti.API.debug('place flag button clicked')
						//alert(input.data.teamID + d.coords.latitude + d.coords.longitude)
						//saves the flag location
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
			startGame();
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
			
			// if both flags placed **** gonna need this from the XML
			for (key in input.data) {
				
				var flag = input.data[key]
			
				if (flag.teamName= 'Humans'){
					var humanFlag = Ti.Map.createAnnotation({
						animate:true,
						image: 'images/miniIcons/Human/Human_Flag.png',
						latitude: flag.latitude,
						longitude: flag.longitude
					});
					mapCreateView.addAnnotation(humanFlag);
				} else if (flag.teamName = 'Aliens') {
					var alienFlag = Ti.Map.createAnnotation({
						animate:true,
						image: 'images/miniIcons/Alien/Alien_Flag.png',
						latitude: flag.latitude,
						longitude: flag.longitude
					});
					mapCreateView.addAnnotation(alienFlag);
				};
			};
			alert('Both flags placed. Get ready.');
			gameTimer = setInterval(gamePlay, 5000);
			gamePlay();
			
			/*-------------------------------*/
		});
		
		//start game timer
		
		
	}
	
	/*----------------------------------------------------------------------------------------------------*/
	
	// GamePlay
	
	//the update function called on an interval
	//do everything you do every frame
	//this will be like on update in Unity
	//the timing can be set in startGame()
	function gamePlay() {
			
		//update location data & player icons
		//Titanium.Geolocation.getCurrentPosition( updatePosition ); 
		getPlayerLocation();
		//check tagging conditions
		Ti.App.addEventListener("app:got.Playerlocation", function(d) {
			Ti.App.removeEventListener("app:got.Playerlocation", updatePlayerPosition);
			checkConditions();
			Ti.API.debug('Info for Player Data: ' + gameID + playerID + d.coords.latitude + d.coords.longitude)
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
		
		Ti.App.addEventListener('playerData', function(input){
			var data = [];
			for(var key in input.data){
				var g = input.data[key]
				var annotData = {
					title: g.playerID,
					latitude: g.latitude,
					longitude: g.longitude
				};
				data.push(data);
			};
			alert(data);
			mapCreateView.setAnnotations(data);
		});
		
		
		//update flag conditions
		//updateFlags();	
			
		
		
	}


	function checkConditions(){
		//alert('checking conditions')
	};
	
	

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
	
	//function displayScore(input) {
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
	//}
	
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
	
	/*----------------------------------------------------------------------------------------------------*/
	
	//Listens for data to be returned about the other players
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

	/*----------------------------------------------------------------------------------------------------*/
	
	
	
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
		clearInterval(checkFlags);
		clearInterval(gamePlay);
		var homePage = require('ui/common/homePage')
		var homePageScreen = new homePage();
		homePageScreen.open();
		instance.close();
	});
	
	/*----------------------------------------------------------------------------------------------------*/
	
	
	return instance	

};


