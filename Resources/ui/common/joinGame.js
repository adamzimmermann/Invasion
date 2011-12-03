exports.joinGame = function() {
	// create a window
	
	var view = Ti.UI.createWindow({
		backgroundImage: 'images/smallLogoTop.jpg'
		//backgroundColor:'#000'
	});	
	
	
	
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
	 
	    
	    var webAPI = new globals.xml.findGames(d.coords.latitude, d.coords.longitude);

	 
	 
	});
	Titanium.Geolocation.getCurrentPosition( updatePosition );   
	
	
	
	

	// pull the findGames function with longitude and lat parameters

	// the event listener to trigger when the data has been loaded
	Ti.App.addEventListener('findGames', function(input){
		// empty data array
		var data = [];
		alert('fired');
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
				alert('current row is: ' + currentRow)
				alert('current row data: ' + currentRow.gameID)
				Ti.App.fireEvent('gameSelected', {gameID: currentRow.gameID});
			});
		
			data.push(row);
		}
		// create a tableview
		var table = Ti.UI.createTableView({
			top: 140,
			height: 280,
			width: 250,
			borderColor: '#d6d6d6',
			borderRadius: 2,	 
			borderWidth: 3,
			data: data,
		});
		// simple header label	
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
		// require aCode.js to define the object aCode
		
		// table click listener
		
		// add the title label
		view.add(title);
		// add the table
		view.add(table);
	});
	// return the view window to homePage
	
	// create a new win
	
	Ti.App.addEventListener('gameSelected', function(data){
		var aCode = require('ui/common/aCode');
		var newWin = Ti.UI.createWindow();
		// open it
		newWin.open();
		alert('Game ID is: ' + data.gameID)
		//alert('aCode gameID' + data.gameID);
		aCode(data.gameID);
		//newWin.add(aCodeWin);
	} )
	
	var back = Ti.UI.createButton({
		title:'back',
		height: 20,
		width: 100,
		bottom:0
	});
	view.add(back);
	back.addEventListener('click', function(e){
		var win1 = Titanium.UI.createWindow();
		win1.open()
		var homePage = require('ui/common/homePage');
		var Home = Titanium.UI.createWindow();
		var homeScreen = new homePage();
		Home.add(homeScreen);
		win1.add(Home);
	});
			
	return view;
};

