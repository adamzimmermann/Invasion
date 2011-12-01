exports.gamePage = function() {
	var instance = Ti.UI.createWindow({backgroundImage:'images/SmallLogoTop.jpg'});
	
	
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
	    alert(d.coords.latitude);
	    
	    data = {
	    	latitude: d.coords.latitude,
	    	longitude: d.coords.longitude,
	    	gameID: gameID,
	    	playerID: playerID,
	    	canTag: 1,
	    	canBeTagged: 1,
	    	hasFlag: 0,    	
	    }
	    var webAPI = new globals.xml.playerData(data);
	 
	});
	
	//listens for data to be returned about the other players
	Ti.API.addEventListener('playerData', updateMap(data));
	
	function updateMap(data) {
		alert('other locations recieved' + data);
	}
	
	
	Titanium.Geolocation.getCurrentPosition( updatePosition );   
	Titanium.Geolocation.addEventListener( 'location', updatePosition ); 
	
	
	var mapCreateView = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD,
		region:{latitude:40.697966, longitude:-89.615815, latitudeDelta:0.003, longitudeDelta:0.003},
		height:350,
		width:275,
		top: 100,
		borderColor: '#d6d6d6',
		borderWidth:2,
		borderRadius:2,
	});	

	instance.add(mapCreateView);
	instance.open();
	return instance	

};


