
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
	else {
		homePage = require('ui/common/homePage');
		var homeScreen = new homePage();
		homeScreen.open();
	}
	
	
})();






