
//monkey patch "require" in the global scope
require('lib/require').monkeypatch(this);


//globally accessible and useful data - should strive
//for one or zero global variables.
var globals = {
	osname: Ti.Platform.osname,
	xml: require('data/xmldata').api,
	//gameID: int
};


// opens either the iOS Home Page or the Android Home Page
(function() {
	

	if (globals.osname == 'iphone') {
		homePage = require('ui/common/homePage');
		var homeScreen = new homePage();
	}
	else {
		homePage = require('ui/common/homePage');
		var homeScreen = new homePage();
	}
	
	
})();






