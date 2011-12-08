
// Monkey patch "require" in the global scope
require('lib/require').monkeypatch(this);


// Global Vars
var globals = {
	osname: Ti.Platform.osname,
	xml: require('data/xmldata').api,
};


// Opens either the iOS Home Page or the Android Home Page
(function() {
	
		
	if (globals.osname == 'iphone') {
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


// calcMidPoint({
	// human: {flagLat: 40, flagLon: 40}, 
	// alien: {flagLat: 20, flagLon: 20} 
// });
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




