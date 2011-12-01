exports.homePage = function() {
	
	//var mapView = require('ui/common/mapView');
	var joinGame = require('ui/common/joinGame');
	var createGame = require('ui/common/createGame');
	var aboutPage = require('ui/common/aboutPage');
	var homePageView = Ti.UI.createWindow ({
		//backgroundImage: 'images/MediumLogoTop.jpg'
		backgroundColor:'#000'
	});
	
	
	var cheatButton = Ti.UI.createButton({
		title:'Skip to Game',
		height:30,
		width:150,
		top:180
	})

	var button1 = Ti.UI.createButton({
		title:'Join Game',
		height:50,
		width:150,
		top:240
		
	});
	
	button1.addEventListener('click', function(){
		var newWin = Ti.UI.createWindow({backgroundColor: '#000'})
		newWin.open();
		var joinGview = new joinGame();
		newWin.add(joinGview);
	});
	
	var button2 = Ti.UI.createButton({
		title:'Create Game',
		height:50,
		width:150,
		top:300
	});
	
	button2.addEventListener('click', function(){
		var newWin = Ti.UI.createWindow();
		newWin.open();
		var createGview = new createGame();
		newWin.add(createGview);
	});
	var button3 = Ti.UI.createButton({
		title:'About',
		height:50,
		width:150,
		top:360
	});
	

	button3.addEventListener('click', function(){
		var newWin = Ti.UI.createWindow();
		newWin.open();
		var aboutView = new aboutPage();
		newWin.add(aboutView);
	});
	
	cheatButton.addEventListener('click', function(){
		var gamePage = require('ui/common/gamePage')
		gamePage();
	});
	
	homePageView.add(cheatButton)
	homePageView.add(button1);
	homePageView.add(button2);
	homePageView.add(button3);
	
	return homePageView
};
