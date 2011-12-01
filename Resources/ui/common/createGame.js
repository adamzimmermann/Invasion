exports.createGame = function() {
	
	var view = Ti.UI.createWindow({
		//backgroundImage:'images/MediumLogoTop.jpg'
		backgroundColor:'#000'
	});
	
	var scrolly = Titanium.UI.createScrollView({contentHeight:'auto'});
	
	var createGameLabel = Ti.UI.createLabel({
		top: 180,
		height: 200,
		width:250,
		backgroundColor: '#000',
		borderColor: '#d6d6d6',
		borderRadius: 2,	 
		borderWidth: 3,
	});
	
	var createGameText = Ti.UI.createLabel({
		font: {fontFamily:'Arial',fontSize:22},
		bottom:60,
		left: 50,
		color: '#fff',
		text: "Create Game",
		
	});
	var nameGameText = Ti.UI.createLabel({
		font: {fontFamily:'Arial',fontSize:14},
		top: 10,
		left: 54,
		color: '#d6d6d6',
		text: "Name Your Game",
		
	});
	var userNameText = Ti.UI.createLabel({
		font: {fontFamily:'Arial',fontSize:14},
		top: 130,
		left: 54,
		color: '#d6d6d6',
		text: "Enter a Username",
		
		
	});
	
	var gameName = Ti.UI.createTextField({
		top: 250,
		height:30,
		width:200,
		hintText:'Bradley Game',
		backgroundColor: '#fff',
		color:'#000',
		clearOnEdit:true	
	})

	
	var userName = Ti.UI.createTextField({
		top:310,
		height:30,
		width:200,
		hintText:'John Doe',
		backgroundColor: '#fff',
		color:'#000',
		clearOnEdit:true	
	})
	
	var createButton = Ti.UI.createButton({
		height:50,
		top:390,
		width:120,
		title:'Create Game'
	})
	
	
	var latitude = 60.21;
	var longitude = 50.21;
	

	
	createButton.addEventListener('click', function(){
		userID = Ti.Platform.id;
		var webAPI = new globals.xml.createGame(userID, gameName.value, userName.value, latitude, longitude);
	});
	
	Ti.App.addEventListener('createGame', function(data){
		Ti.API.debug(data.data)
		alert('fired create game')
		var gameLobby = require('ui/common/gameLobby');
		// var newWin = Ti.UI.createWindow();
		// // open it
		// newWin.open();
		gameLobby(data);
		

	} )
	scrolly.add(createGameLabel);
	scrolly.add(nameGameText);
	scrolly.add(userNameText);	
	scrolly.add(createGameText);	
	scrolly.add(createButton);
	scrolly.add(gameName);
	scrolly.add(userName);
	view.add(scrolly);
	
	
	return view;
};
