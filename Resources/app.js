
//monkey patch "require" in the global scope
require('lib/require').monkeypatch(this);


//globally accessible and useful data - should strive
//for one or zero global variables.
var globals = {
	osname: Ti.Platform.osname,
	xml: require('data/xmldata').api,
	//gameID: int
};

//alert('test');

(function() {
	var WindowObject;
	if (globals.osname == 'iphone') {
		homePage = require('ui/common/homePage');
		var homeScreen = new homePage();
	}
	else {
		homePage = require('ui/common/homePage');
		var homeScreen = new homePage();
	}
	
})();
	// var homePage = require('ui/common/homePage');
	// // pull from mapview.js
// 	
	// // pull from scoring.js
	// //var Scoring = require('ui/common/scoring');
// 	
// 	
	// // create and open the iOS window
	// var win1 = Titanium.UI.createWindow();
	// win1.open()
// 	
	// //
	// var Home = Titanium.UI.createWindow();
	// var homeScreen = new homePage();
	// //var scores = new Scoring();
// 	
	// Home.add(homeScreen);
	// win1.add(Home);
	//return win1;






