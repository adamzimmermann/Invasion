/*

Copyright (c) 2011 MIT

Bradley University - Interactive Media Department

Authors-
Adam Zimmerman
Jesse White

*/

/*-------------------------------------------------------------------*/



exports.createGame = function() {
	
	// Creates the Create Game Window
	var instance = Ti.UI.createWindow({
		backgroundImage:'images/MediumLogoTop.jpg'
		//backgroundColor:'#000'
	});
	
	
	
	/*--------------------------------------------------*/
	
	// Creates auto-adjusting text fields
	var scrolly = Titanium.UI.createScrollView({contentHeight:'auto'});
	
	
	
	/*--------------------------------------------------*/
	
	// GUI
	
	
	var createGameLabel = Ti.UI.createLabel({
		top: 170,
		height: 200,
		width:250,
		backgroundColor: '#000',
		borderColor: '#d6d6d6',
		borderRadius: 2,	 
		borderWidth: 3,
	});
	
	var createGameText = Ti.UI.createLabel({
		font: {fontFamily:'Arial',fontSize:22},
		bottom:60,
		left: 50,
		color: '#fff',
		text: "Create Game",
		
	});
	var nameGameText = Ti.UI.createLabel({
		font: {fontFamily:'Arial',fontSize:14},
		top: 10,
		left: 54,
		color: '#d6d6d6',
		text: "Name Your Game",
		
	});
	var userNameText = Ti.UI.createLabel({
		font: {fontFamily:'Arial',fontSize:14},
		top: 130,
		left: 54,
		color: '#d6d6d6',
		text: "Enter a Username",
	});
	
	
	
	
	/*--------------------------------------------------*/
	
	// Creates the Text Fields for User Info
	
	var gameName = Ti.UI.createTextField({
		top: 250,
		height:30,
		width:200,
		hintText:'Bradley Game',
		backgroundColor: '#fff',
		color:'#000',
		clearOnEdit:true	
	})

	
	var userName = Ti.UI.createTextField({
		top:310,
		height:30,
		width:200,
		hintText:'John Doe',
		backgroundColor: '#fff',
		color:'#000',
		clearOnEdit:true	
	})
	
	
	
	/*--------------------------------------------------*/
	
	// Create Button
	var createButton = Ti.UI.createButton({
		height:40,
		top:375,
		width:120,
		backgroundImage: 'images/buttons/createGamebutton.png',
		backgroundSelectedImage: 'images/buttons/screatebutton.png',
	})
	
	
	/*--------------------------------------------------*/
	
	// Get Location
	
	Ti.App.GeoApp = {};
	 
	Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
	Ti.Geolocation.purpose = "testing";
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;
	 
	if( Titanium.Geolocation.locationServicesEnabled === false ) {
	    Ti.API.debug('Your device has GPS turned off. Please turn it on.');
	}
	
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
	
	Ti.App.addEventListener("app:got.location", function(d) {
	    // Ti.App.GeoApp.f_lng = d.longitude;
	    // Ti.App.GeoApp.f_lat = d.latitude;
	    Ti.API.debug(JSON.stringify(d));
	    // you need to remove this listener, see the blog post mentioned above
	    Ti.Geolocation.removeEventListener('location', updatePosition);	
	    //alert(d.coords.latitude)
	    //alert(d.coords.longitude)
	 
	    
	    createButton.addEventListener('click', function() {
			// alert('create clicked');
			if((gameName.value != '') && (userName.value != '')) {
				userID = Ti.Platform.id;
				Ti.API.debug('create game call');
				var webAPI = new globals.xml.createGame(userID, gameName.value, userName.value, d.coords.latitude, d.coords.longitude);
			}
			else if(gameName.value == '') {
				alert('Please enter a valid game name');
			}
			else if(userName.value == '') {
				alert('Please enter a valid user name')
			}
		});
	 
	});
	Titanium.Geolocation.getCurrentPosition( updatePosition );   
	
	
	/*--------------------------------------------------*/

	
	// Listens for result of Create Game
	Ti.App.addEventListener('createGame', function(input){
		// var buttonClick= Ti.Media.createSound({
			// url: 'sounds/radiobeeps.mp3',
			// });
		// buttonClick.play();
		// alert('creategame listener' + input);
		var gameLobby = require('ui/common/gameLobby');
		var gameLobbyScreen = new gameLobby(input);
		gameLobbyScreen.open();
	});
	
	/*--------------------------------------------------*/
	
	
	
	// Adds everything to the Window
	
	scrolly.add(createGameLabel);
	scrolly.add(nameGameText);
	scrolly.add(userNameText);	
	scrolly.add(createGameText);	
	scrolly.add(createButton);
	scrolly.add(gameName);
	scrolly.add(userName);
	instance.add(scrolly);
	
	
	/*--------------------------------------------------*/
	
	
	
	
	
	// Back Button
	
	
	// Creates a Back Button
	var backButton = Ti.UI.createButton({
		backgroundImage: 'images/buttons/backbutton.png',
		backgroundSelectedImage: 'images/buttons/sbackbutton.png',
		height: 40,
		width: 120,
		bottom:5
	});
	instance.add(backButton);
	
	// Listens for back button to be clicked
	backButton.addEventListener('click', function(e){
		// var buttonClick= Ti.Media.createSound({
			// url: 'sounds/radiobeeps.mp3',
			// });
		// buttonClick.play();
		var homePage = require('ui/common/homePage')
		var homePageScreen = new homePage();
		homePageScreen.open();
		instance.close();
	});
	
	/*--------------------------------------------------*/
	
	
	return instance;
};
