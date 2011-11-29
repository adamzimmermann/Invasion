exports.joinGame = function() {
	// create a window
	
	var view = Ti.UI.createWindow({
		backgroundImage: 'images/smallLogoTop.jpg'
	});	
	// pull the findGames function with longitude and lat parameters
	var webAPI = new globals.xml.findGames(10, 12);
	// the event listener to trigger when the data has been loaded
	Ti.App.addEventListener('findGames', function(input){
		// empty data array
		var data = [];
		// for loop to populate the table with the available games
		for(var key in input.data){
			var g = input.data[key]
			var rowdata = {
				title: g.gameName
			};
			data.push(rowdata);
		}
		// create a tableview
		var table = Ti.UI.createTableView({
			top: 140,
			height: 300,
			width: 200,
			data: data,
		});
		// simple header label	
		var title = Ti.UI.createLabel({
			text: '  Join Game',
			color: '#fff',
			bottom: 315,
			left:60,
			height:50,
			width: 200,
			backgroundColor: '#000'
		})
		// require aCode.js to define the object aCode
		
		// table click listener
		table.addEventListener('click', function(e) {
			Ti.App.fireEvent('createAccessCode', {gameID: 1});
		});
		// add the title label
		view.add(title);
		// add the table
		view.add(table);
	});
	// return the view window to homePage
	
	// create a new win
	
	Ti.App.addEventListener('createAccessCode', function(data){
		var aCode = require('ui/common/aCode');
		var newWin = Ti.UI.createWindow();
		// open it
		newWin.open();
		aCode(data);
		//newWin.add(aCodeWin);
	} )
			
	return view;
};

