exports.scoring = function () {

var teams = Titanium.UI.createWindow({
	height: 400,
	width:300
	
})



var teamBlue = Titanium.UI. createLabel({
	backgroundColor: '#000000',
	top: 10,
	left:10,
	height: 20,
	width:100,
	color: '#ffffff',
	text: "Blue Team - "
})

//var scoreBlue = Number;
//var scoreRed = Number;

var teamRed = Titanium.UI.createLabel({
	backgroundColor: '#000000',
	top: 10,
	right:50,
	height: 20,
	width:100,
	color: '#ffffff',
	text: "Red Team - "
	
})
	teams.add(teamBlue);
	teams.add(teamRed);
	return teams;

};