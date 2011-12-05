exports.aCode = function(data) {
	// new window
	var gameLobby = require ('ui/common/gameLobby')
	
	var instance = Ti.UI.createWindow({
		backgroundImage: 'images/MediumLogoTop.jpg'
		//backgroundColor:'#000'
	});
	instance.open();
	alert(data);
	
	var scrolly = Titanium.UI.createScrollView({contentHeight:'auto'});
	
	var joinGameLabel = Ti.UI.createLabel({
		top: 180,
		height: 200,
		width:250,
		backgroundColor: '#000',
		borderColor: '#d6d6d6',
		borderRadius: 2,	 
		borderWidth: 3,
	});
	
	var enterInfoText = Ti.UI.createLabel({
		font: {fontFamily:'Arial',fontSize:22},
		bottom:60,
		left: 50,
		color: '#fff',
		text: "Enter User Info",
		
	});
	
	var userNameText = Ti.UI.createLabel({
		font: {fontFamily:'Arial',fontSize:14},
		top: 10,
		left: 54,
		color: '#d6d6d6',
		text: "Enter a Username",
		
		
	});
	var accessCodeText = Ti.UI.createLabel({
		font: {fontFamily:'Arial',fontSize:14},
		top: 130,
		left: 54,
		color: '#d6d6d6',
		text: "Enter your Access Code",
		
	});
	
	var userName = Ti.UI.createTextField({
		top: 250,
		height:30,
		width:200,
		hintText:'Mr. Bitey',
		backgroundColor: '#fff',
		color:'#000',
		clearOnEdit:true	
	})

	
	var accessCode = Ti.UI.createTextField({
		top:310,
		height:30,
		width:200,
		hintText:'123',
		backgroundColor: '#fff',
		color:'#000',
		clearOnEdit:true	
	})
	
	var button = Ti.UI.createButton({
		height:50,
		top:390,
		width:120,
		title:'Join Game',
		data: data
	})
	
	// listens for buttons to clicked
	button.addEventListener('click', function(e){
		
		alert('The GameID is :' + e.source.data)
		var webAPI = new globals.xml.checkCode(e.source.data, accessCode.value);	
	});
	
	
	//listens for WebAPI checkCode
	Ti.App.addEventListener('checkCode', function(input){
		alert('fired before joinGame:' + data);
		if (input.data == "true"){
			userID = Ti.Platform.id;
			if(userName.value != null) {
				var webAPI = new globals.xml.joinGame(input.gameID, userID, userName.value);
			}
		}
		else {
			alert("Incorrect Access Code");
		}
	});
	
	
	// listens for WebAPI JoinGame
	Ti.App.addEventListener('joinGame', function(input){
		var gameLobby = require('ui/common/gameLobby');
		alert('info going into gameLobby: ' + data + ', ' + userName.value + ', ' + userID + ', ' + accessCode.value + '.' )
		gameLobby({gameID: data, userName: userName.value, userID: userID});
			
	});
	
	
	scrolly.add(joinGameLabel);
	scrolly.add(userNameText);
	scrolly.add(accessCodeText);	
	scrolly.add(enterInfoText);
	scrolly.add(button);
	scrolly.add(userName);
	scrolly.add(accessCode);
	instance.add(scrolly);
	
	
	// Back Button
	
	var back = Ti.UI.createButton({
		title:'back',
		height: 20,
		width: 100,
		bottom:0
	});
	instance.add(back);
	back.addEventListener('click', function(e){
		var win1 = Titanium.UI.createWindow();
		win1.open()
		var homePage = require('ui/common/homePage');
		var Home = Titanium.UI.createWindow();
		var homeScreen = new homePage();
		Home.add(homeScreen);
		win1.add(Home);
	});
	
	//
	
	
	// return window to joinGame
	return instance;
};



