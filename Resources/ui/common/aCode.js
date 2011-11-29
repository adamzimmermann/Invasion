exports.aCode = function(data) {
	// new window
	var gameLobby = require ('ui/common/gameLobby')
	
	var instance = Ti.UI.createWindow({
		backgroundImage: 'images/MediumLogoTop.jpg'
	});
	instance.open();
	
	
	var accessCode = Ti.UI.createTextField({
		hintText:'1234',
		height: 20,
		width:100,
		backgroundColor:'#fff'
	});
	var userName = Ti.UI.createTextField({
		hintText:'Bob Johnson',
		top:180,
		height: 20,
		width:100,
		backgroundColor:'#fff'
	});

	
	
	var button = Ti.UI.createButton({
		title:'Join Game',
		//moretext: enter access code
		width: 100,
		height:20,
		bottom: 100
	})
	
	Ti.App.addEventListener('checkCode', function(input){
		
		if (input.data == "true"){
			
			var newWin = Ti.UI.createWindow();
			newWin.open();
			userID = Math.floor(Math.random()*100000);
			var webAPI = new globals.xml.joinGame(data.gameID, userID, userName.value)
			gameLobby({gameID: data.gameID, userName: userName.value, userID: userID});
		}
		else {
			alert("Incorrect Access Code");
		}
	});
	
	button.addEventListener('click', function(){
		var webAPI = new globals.xml.checkCode(data.gameID, accessCode.value);	
	});
	
	instance.add(button);
	instance.add(accessCode);
	instance.add(userName);
	
	// return window to joinGame
	return instance;
};
