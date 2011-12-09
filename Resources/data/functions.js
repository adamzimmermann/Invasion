
//checks proximitiy of all players
//PARAMETERS
//array of player objects from from playerData
//array of flag objects from gameInfo
function playerProximity(input) {
	//loops through all players
	for(var key in input.players) {
		
		//PARAMETERS
		//current player object from loop
		//array of player objects from from playerData
		checkPlayer({player:input[key], players:input.players});
		
		//PARAMETERS
		//current player object from loop
		//array of flag objects from gameInfo 
		checkFlags({player:input[key], flags:input.flags});
	}
	Ti.App.fireEvent('playerProximity');
}
//we need to ensure all values set in the above functions are available in the object returned

//-----------------------------------------------------------------------------------------------------------------------------

//checks other players in relation to one player
function checkPlayer(input) {
	//loops through all other players
	for(var key in input.players) {
		//create a variable for other player
		var otherPlayer = input.players[key]; 
		
		//*******************************
		//set location based variables
	
		//if they are in their territory
		if(condition) {	
			//if they aren't tagged
			if(input.player.tagged == 0) {
				//enable tagging
				input.player.canTag = 1;
				//disable can be tagged
				input.player.canBeTagged = 0;
			}
			
		}
		
		//if they are in enemy territory
		else {
			//enable can be tagged
			input.player.canBeTagged = 1;
			//disable tagging
			input.player.canTag = 0;
		}
		
		//*******************************
		//set proximity based variables
		
		//on opposite teams
		if(input.player.teamID != otherPlayer.teamID) {
			//if they are close
			if(distance({1:{latitude:input.player.latidude, longitude:input.player.longitude}, 2:{latitude:input.players[key].latitude, longitude:input.players[key].longitude}}) < 10) {
				//if tagging conditions met
				if(input.player.canTag == 1 && otherPlayer.canBeTagged == 1) {
					//tag the player
					input.players[key].tagged = 1;
					//disable others from tagging them
					input.players[key].canBeTagged = 0;
					//disable tagging
					input.players[key].canTag = 0;
					
					//if they were carrying a flag
					if(input.player.hasFlag == 1) {
						//remove the flag
						input.player.hasFlag = 0;
						
						//reset the flag
						//**********
						//write xml function to reset flag that accepts teamID as parameter
						//find opposing teamID in sql call WHERE gameID = '$gameID' AND teamID != '$teamID'
						//globals.xml.resetFlag({teamID:input.player.teamID, gameID:input.player.gameID})
						//SELECT * FROM x WHERE x.a NOT LIKE '%text%';
					}
				}
			}
		}
		//on the same team
		else {
			//do nothing.
		}
	}
}

//-----------------------------------------------------------------------------------------------------------------------------

//checks player proximity to either flag
function checkFlags(input) {
	//loops through both flags
	for(var key in input.flags) {
		//player is on opposite team as the flag
		if(input.player.teamID != input.flags[key].teamID) {
			//check if they are at the other team's base
			if(distance({1:{latitude:input.player.latitude, longitude:input.player.longitude}, 2:{latitude:input.flags[key].latitude, longitude:input.flags[key].longitude}}) < 10) {
				//send data about which flag was taken
				webAPI = globals.xml.flagTaken({teamID:flags[key].teamID})
				//update the player status
				input.player.hasFlag = 1;
			}
		}
		//player is on the same team as the flag
		else {
			//close to the base
			if (distance({1:{latitude:input.player.latitude, longitude:input.player.longitude}, 2:{latitude:input.flags[key].latitude, longitude:input.flags[key].longitude}}) < 20){
				//disable the player's ability to tag
				input.player.canTag = 0;
				
				//check if they are carrying a flag
				if(input.player.hasFlag) {
					//check if they are at the base
					if(distance({1:{latitude:input.player.latitude, longitude:input.player.longitude}, 2:{latitude:input.flags[key].latitude, longitude:input.flags[key].longitude}}) < 10) {
						//update the score
						webAPI = globals.xml.flagCaptured(flags[key].teamID)
					}
					//reset the hasFlag value for the player
					input.player.hasFlag = 0;
				}
			}
		}
	}
}

//-----------------------------------------------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------------------------------------------

function ownTerritory() {
	
}




