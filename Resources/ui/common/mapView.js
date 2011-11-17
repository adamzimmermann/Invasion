exports.mapView = function() {

var xml = require('data/xmldata');
alert(xml.xmldata);

var mapCreateView = Titanium.Map.createView({
	mapType: Titanium.Map.HYBRID_TYPE,
	region:{latitude:40.697966, longitude:-89.615815, latitudeDelta:0.003, longitudeDelta:0.003},
	height:600,
	width:480,
	top: 175,
});	

function setTimer(timetowait,context) {
 
	mt=0;
	mtimer = setInterval(function() {
 
    	mt++;
	Ti.API.info(mt);
 
    if(mt==timetowait) {
        // do something;
	clearInterval(mtimer);
 	Ti.App.fireEvent(context);
        }
 
	},1000);
};


	return mapCreateView;
	

};


