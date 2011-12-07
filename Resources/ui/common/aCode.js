exports.aCode = function(data) {
	// new window
	//var gameLobby = require ('ui/common/gameLobby')
	
	var instance = Ti.UI.createWindow({
		backgroundImage: 'images/MediumLogoTop.jpg'
		//backgroundColor:'#000'
	});
	instance.open();
	// alert(data);
	
	//userID
	userID = Ti.Platform.id;
	
	//gameID
	gameID = data.gameID;

	
	//what does this do? ***************
	var scrolly = Titanium.UI.createScrollView({contentHeight:'auto'});
	
	// what does this do? *************
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
	// creates a label for user name field
	var userNameText = Ti.UI.createLabel({
		font: {fontFamily:'Arial',fontSize:14},
		top: 10,
		left: 54,
		color: '#d6d6d6',
		text: "Enter a Username",
		
		
	});
	//creates a label for access code field
	var accessCodeText = Ti.UI.createLabel({
		font: {fontFamily:'Arial',fontSize:14},
		top: 130,
		left: 54,
		color: '#d6d6d6',
		text: "Enter your Access Code",
		
	});
	
	//creates a user name input field
	var userName = Ti.UI.createTextField({
		top: 250,
		height:30,
		width:200,
		hintText:'Peter Parker',
		backgroundColor: '#fff',
		color:'#000',
		clearOnEdit:true	
	})

	//creates an access code input field
	var accessCode = Ti.UI.createTextField({
		top:310,
		height:30,
		width:200,
		hintText:'ask your friend',
		backgroundColor: '#fff',
		color:'#000',
		clearOnEdit:true	
	})
	
	//creates a join game button
	var joinGameButton = Ti.UI.createButton({
		height:50,
		top:390,
		width:120,
		title:'Join Game',
		data: data
	})
	
	// listens for join game button to clicked
	joinGameButton.addEventListener('click', function(e){
		//alert('The GameID is :' + e.source.data)
		
		if(userName.value != ''){
			//checks the access code
			var webAPI = new globals.xml.checkCode(gameID, accessCode.value);	
		}
		else {
			alert('Please enter a valid name.');
		}
	});
	
	
	//listens for access code verification
	Ti.App.addEventListener('checkCode', function(input){
		//alert('fired before joinGame:' + data.gameID);
		if (input.data == "true"){
			alert('joinGame data: ' + gameID + ' // ' + userID + ' // ' + userName.value)
			var webAPI = new globals.xml.joinGame({
				gameID: gameID,
				userID: userID,
				userName: userName.value
			});
		}
		else {
			alert("Incorrect Access Code");
		}
	});
	
	
	// listens for join game event
	Ti.App.addEventListener('joinGame', function(input){
		
		//alert('info going into gameLobby: ' + gameID + ', ' + userID + ', ' + input.data.accessCode + '.' )
		
		//load game lobby screen
		var gameLobby = require('ui/common/gameLobby');
		var gameLobbyScreen = new gameLobby({gameID: gameID, userID: userID, accessCode: input.data.accessCode});
		gameLobbyScreen.open();
			
	});
	
	
	scrolly.add(joinGameLabel);
	scrolly.add(userNameText);
	scrolly.add(accessCodeText);	
	scrolly.add(enterInfoText);
	scrolly.add(joinGameButton);
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
	
	
	
	// return window
	return instance;
};



