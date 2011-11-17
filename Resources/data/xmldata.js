exports.xmldata = function (){



var xhr = Titanium.Network.createHTTPClient();
xhr.open('GET','http://ctf.playamericalive.com/form.php?action=gamePlayers&gameID=1');

xhr.onload = function()
{
// var doc = this.responseXML.documentElement;
// var info = doc.getElementsByTagName("info");
// Ti.App.myGlobalVar = theLon;
// 
// Ti.API.info(theLon.text);
// alert('success');
// 
// }
// 
// xhr.send();
// 
// var data = [];
// for (var key in info) {
  // Things[i]
  	var result = this.responseText;
	var xml = this.responseXML;
 
	var params = xml.documentElement.getElementsByTagName("userName");
	var name = xml.documentElement.getElementsByTagName("playerID");
	var value = xml.documentElement.getElementsByTagName("nothin");
	var data = [];
		
	for (var i = 0; i < name.length; i++) {
    	
 		Ti.API.info(name.item(i).getElementsByTagName('playerID').item(0).text);
    // Add to array
    	data.push({"name":n.item(i).text,"value":v.item(i).text});
}
  Ti.API.info(data);	
};

xhr.send();

return data;

};