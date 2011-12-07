exports.androidWindow = function() { 
	
	
	var homePage = require('ui/common/homePage');
	// // pull from mapview.js
// 	
	// // pull from scoring.js
	// //var Scoring = require('ui/common/scoring');
	
	
	// create and open the iOS window
	var win1 = Titanium.UI.createWindow();
	win1.open()
	alert('homePage here')
	// //
	homePage();
 
	
	// win1.add(Home);
	return win1;
};