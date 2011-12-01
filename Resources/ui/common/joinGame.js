exports.joinGame = function() {
	// create a window
	
	var view = Ti.UI.createWindow({
		backgroundImage: 'images/smallLogoTop.jpg'
		//backgroundColor:'#000'
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
				title: g.gameName,
				//gameID: g.gameID,
			};
			
			data.push(rowdata);
		}
		// create a tableview
		var table = Ti.UI.createTableView({
			top: 140,
			height: 280,
			width: 250,
			borderColor: '#d6d6d6',
			borderRadius: 2,	 
			borderWidth: 3,
			data: data,
		});
		// simple header label	
		var title = Ti.UI.createLabel({
			text: '  Choose a Game',
			color: '#fff',
			bottom: 315,
			
			height:50,
			width: 250,
			font: {fontFamily:'arial', fontSize: 22},
			borderColor: '#d6d6d6',
			borderRadius: 2,	 
			borderWidth: 3,
			backgroundColor: '#000'
		})
		// require aCode.js to define the object aCode
		
		// table click listener
		table.addEventListener('click', function(e) {
			//var currentRow = rowdata.gameID;
			//alert('current row data: ' + currentRow)
			Ti.App.fireEvent('gameSelected', {gameID: g.gameID});
		});
		
		// add the title label
		view.add(title);
		// add the table
		view.add(table);
	});
	// return the view window to homePage
	
	// create a new win
	
	Ti.App.addEventListener('gameSelected', function(data){
		var aCode = require('ui/common/aCode');
		var newWin = Ti.UI.createWindow();
		// open it
		newWin.open();
		//alert('aCode gameID' + data.gameID);
		aCode({gameID: data.gameID});
		//newWin.add(aCodeWin);
	} )
			
	return view;
};

