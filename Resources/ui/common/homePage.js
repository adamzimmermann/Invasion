exports.homePage = function() {
	
	var mapView = require('ui/common/mapView');
	
	var homePageView = Ti.UI.createWindow ({
		backgroundImage: 'images/background.png'
	});
	
	
	var button1 = Ti.UI.createButton({
		label:'Start',
		height:50,
		width:100,
		top:240
		
	});
	
	button1.addEventListener('click', function(){
		var newWin = Ti.UI.createWindow()
		newWin.open();
		var mapWin = new mapView;
		newWin.add(mapWin);
	});
	
	var button2 = Ti.UI.createButton({
		label:'Options',
		height:50,
		width:100,
		top:300
	});
	
	
	
	homePageView.add(button1);
	homePageView.add(button2);
	
	return homePageView
};
