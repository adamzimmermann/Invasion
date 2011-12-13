/*

Copyright (c) 2011 MIT

Bradley University - Interactive Media Department

Authors-
Adam Zimmerman
Jesse White

*/

/*-------------------------------------------------------------------*/






// Monkey patch "require" in the global scope
require('lib/require').monkeypatch(this);


// Global Vars
var globals = {
	osname: Ti.Platform.osname,
	xml: require('data/xmldata').api,
	
};

var bgTunes = Ti.Media.createSound({
	url: 'sounds/spacejinglesmalloneloop.mp3',
	looping: true
});


	
// Opens either the iOS Home Page or the Android Home Page
(function() {
	
		
	if (globals.osname == 'iphone') {
		//bgTunes.play();
		homePage = require('ui/common/homePage');
		var homeScreen = new homePage();
		homeScreen.open();
	}
	else if (globals.osname == 'android'){
		homePage = require('ui/common/homePage');
		var homeScreen = new homePage();
		homeScreen.open();
	}
})();



// 
// 
// 
// function calcMidPoint(input){
// 	
	// var centerLat;
	// var	centerLon;
// 	
// 	
	// // Convert lat/lon to Cartesian coordinates for each location.
	// humanX = Math.cos(input.human.flagLat) * Math.cos(input.human.flagLon);
	// humanY = Math.cos(input.human.flagLat) * Math.sin(input.human.flagLon);
	// humanZ = Math.sin(input.human.flagLat);
// 	
	// alienX = Math.cos(input.alien.flagLat) * Math.cos(input.alien.flagLon);
	// alienY = Math.cos(input.alien.flagLat) * Math.sin(input.alien.flagLon);
	// alienZ = Math.sin(input.alien.flagLat);
// 	
	// // Compute average x, y and z coordinates.
	// x = (humanX + alienX) / 2;
	// y = (humanY + alienY) / 2;
	// z = (humanZ + alienZ) / 2;
// 	
	// // Convert average x, y, z coordinate to latitude and longitude.
	// centerLon = Math.atan2(y, x);
	// hyp = Math.sqrt(x * x + y * y);
	// centerLat = Math.atan2(z, hyp);
// 	
	// Ti.App.fireEvent('midPointCalc', {centerLon: centerLon, centerLat: centerLat})
	// Ti.API.debug('Center Point: ' + centerLat + ' ' + centerLon);
// 		
// };
// 
// 
calcDistance({
	human: {lat: 40.6986, lon: -89.6125}, 
	alien: {lat: 40.7361, lon: -89.6461} 
});



var d;


function calcDistance(input){
	
	var lat1 = input.human.lat;
	var	lon1 = input.human.lon;
	var lat2 = input.alien.lat;
	var lon2 = input.alien.lon;
	
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

};

// function toRad(Value) {
    // /** Converts numeric degrees to radians */
    // return Value * Math.PI / 180;
// }




// 
// function getDistance(input) {
    // theta = longitude1 - longitude2;
    // distance = (Math.sin(deg2rad(latitude1)) * Math.sin(deg2rad(latitude2))) + (Math.cos(deg2rad(latitude1)) * cos(deg2rad(latitude2)) * cos(deg2rad(theta)));
    // distance = acos(distance);
    // distance = rad2deg(distance);
    // distance = distance * 60 * 1.1515;
    // //echo '<br>miles: ' . $distance . '<br>';
    // return (round(distance,2));
// 
// };

