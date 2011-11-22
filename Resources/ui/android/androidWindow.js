exports.androidWindow = function() { 
	var mapView = require('ui/common/mapView');
	var Scoring = require('ui/common/scoring');
	
	
	
	var win1 = Titanium.UI.createWindow();
	//win1.open()
	var mapWin = Titanium.UI.createWindow();
	var map = new mapView();
	var scores = new Scoring();
	
	mapWin.add(map);
	mapWin.add(scores);
	win1.add(mapWin);
	return win1;
};