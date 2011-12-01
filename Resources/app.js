
//monkey patch "require" in the global scope
require('lib/require').monkeypatch(this);


//globally accessible and useful data - should strive
//for one or zero global variables.
var globals = {
	osname: Ti.Platform.osname,
	//xml: require('data/xmldata').api,
	//gameID: int
};



(function() {
	var WindowObject;
	if (globals.osname === 'iphone') {
		WindowObject = require('ui/iphone/iphoneWindow');
	}
	else {
		WindowObject = require('ui/android/androidWindow');
	}
	new WindowObject().open();
})();






