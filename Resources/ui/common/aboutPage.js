exports.aboutPage = function() {
	var homePage = require('ui/common/homePage');
	var view = Ti.UI.createWindow({
		backgroundImage:'images/SmallLogoTop.jpg'
	});
	
	var sView = Ti.UI.createScrollView({
		backgroundColor:'#000',
		contentWidth:'auto',
		contentHeight:'auto',
		height: 280,
		width: 230,
		showVerticalScrollIndicator:true,
        showHorizontalScrollIndicator:true
	});
	
	var text = Ti.UI.createLabel({
		text:"Invasion is a futuristic Capture the Flag game where you fight either for the sanctity of Earth as a human or the revival of your home planet as an alien. The flags that you vie for are either technology or resources.Once a game has been created, teams will be appointed and flags will be placed. The first team to acquire 3 flags will achieve overall victory. You can pick up the opposing flag by coming within 10 feet of its GPS location, which will be displayed on the map on the main game page. The opposing team's flag must be carried to your team's flag's origin point in order to capture it. Upon its arrival, your team will be awarded one point.If a player from the opposing team comes within 10 feet of your GPS location while you are carrying the flag (or vice-versa), you will be tagged and must return to your flag's origin point before you can become eligible for play again. The dropped flag will automatically return to its origin point.",
		width: 180,
		color: '#ffffff',
		height:'auto'
	})
	
	var back = Ti.UI.createButton({
		title:'back',
		height: 20,
		width: 100,
		bottom:10
	});
	view.add(back);
	back.addEventListener('click', function(e){
		var win1 = Titanium.UI.createWindow();
		win1.open()
		//
		var Home = Titanium.UI.createWindow();
		var homeScreen = new homePage();
		Home.add(homeScreen);
		win1.add(Home);
	});
	sView.add(text);
	view.add(sView);
	
	
	return view;
};