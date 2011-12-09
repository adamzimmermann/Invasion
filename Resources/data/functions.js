
//checks proximitiy of all players
//input is an array of player objects
function playerProximity(input) {
	//loops through all players
	for(var key in input) {
		var player = input[key];
		checkPlayer({player:player, players:input});
		checkFlags({player:player, flags:flags});
	}
	Ti.App.fireEvent('playerProximity');
}
//we need to ensure all values set in the above functions are available in the object returned


//checks other players in relation to one player
function checkPlayer(input) {
	//loops through all other players
	for(var key in input.players) {
		//create a variable for other player
		var otherPlayer = input.players[key]; 
		
		//if they are in their territory
		if() {
			
		}
		
		//if they are in enemy territory
		
		
		//on opposite teams
		if(input.player.teamID != otherPlayer.teamID) {
			//if they are close
			if(distance() < 10) {
				//if tagging conditions met
				if(input.player.canTag == 1 && otherPlayer.canBeTagged == 1) {
					input.players[key].tagged = 1;
					input.players[key].canBeTagged = 0;
				}
			}
		}
		//on the same team
		else {
			//do nothing.
		}
	}
}


//checks player proximity to either flag
function checkFlags(input) {
	//player is on opposite team as the flag
	if(input.player.teamID != input.flags[0].teamID) {
		//check if they are at the other team's base
		if(distance({1:{latitude:input.player.latitude, longitude:input.player.longitude}, 2:{latitude:input.flags[0].latitude, longitude:input.flags[0].longitude}}) < 10) {
			//send data about which flag was taken
			webAPI = globals.xml.flagTaken({teamID:flags[0].teamID})
			//update the player status
			input.player.hasFlag = 1;
		}
	}
	//player is on the same team as the flag
	else {
		//close to the base
		if (distance({1:{latitude:input.player.latitude, longitude:input.player.longitude}, 2:{latitude:input.flags[0].latitude, longitude:input.flags[0].longitude}}) < 20){
			//disable the player's ability to tag
			input.player.canTag = 0;
			
			//check if they are carrying a flag
			if(input.player.hasFlag) {
				//check if they are at the base
				if(distance({1:{latitude:input.player.latitude, longitude:input.player.longitude}, 2:{latitude:input.flags[0].latitude, longitude:input.flags[0].longitude}}) < 10) {
					//update the score
					webAPI = globals.xml.flagCaptured(flags[1].teamID)
				}
				//reset the hasFlag value for the player
				input.player.hasFlag = 0;
			}
		}
	}
}
//calculates distance between 2 pairs of coordinates
//accepts objects structed in the following format
//{1:{latitude:value, longitude:value}, 2:{latitude:value, longitude:value}}
function distance(input) {
	// input.1.latitude
	// input.1.longitude
	// input.2.latitude
	// input.2.longitude
	
	return distance;
}
