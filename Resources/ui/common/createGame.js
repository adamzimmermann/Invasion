exports.createGame = function() {
	
	var view = Ti.UI.createWindow({
		backgroundImage:'images/MediumLogoTop.jpg'
		//backgroundColor:'#000'
	});
	
	var scrolly = Titanium.UI.createScrollView({contentHeight:'auto'});
	
	var createGameLabel = Ti.UI.createLabel({
		top: 180,
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
	
	var createButton = Ti.UI.createButton({
		height:50,
		top:390,
		width:120,
		title:'Create Game'
	})
	
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
	    alert(d.coords.latitude)
	    alert(d.coords.longitude)
	 
	    
	    createButton.addEventListener('click', function() {
			alert('create clicked');
			userID = Ti.Platform.id;
			var webAPI = new globals.xml.createGame(userID, gameName.value, userName.value, d.coords.latitude, d.coords.longitude);
		});
	 
	});
	Titanium.Geolocation.getCurrentPosition( updatePosition );   
	
	


	
	// listens for result of Create Game
	Ti.App.addEventListener('createGame', function(input){
		alert('creategame listener' + input);
		var gameLobby = require('ui/common/gameLobby');
		gameLobby(input);
	});
	
	scrolly.add(createGameLabel);
	scrolly.add(nameGameText);
	scrolly.add(userNameText);	
	scrolly.add(createGameText);	
	scrolly.add(createButton);
	scrolly.add(gameName);
	scrolly.add(userName);
	view.add(scrolly);
	
	
	return view;
};
