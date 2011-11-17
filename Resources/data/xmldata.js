exports.xmlfoo = function (){


var data = [];
var xhr = Titanium.Network.createHTTPClient();
xhr.open('POST','http://ctf.playamericalive.com/form.php');

xhr.onload = function(e)
{
  
	var xml = this.responseXML;
  		
	var games = xml.documentElement.getElementsByTagName("game");
	
  		
	
	
  		
	alert(games);	
	for (var i = 0; i < games.length; i++) {
	
  		
    	data.push({
    		user: games.item(i).getElementsByTagName("userName").item(0).text,
    		playerID: games.item(i).getElementsByTagName("playerID").item(0).text,
    		
    	});
    	
	}
	//alert(data);
		
 	
};




xhr.send({
	action:'gamePlayers',
	gameID:'1'
});

if (xhr.done){
	alert(data);
	return data;
}
};