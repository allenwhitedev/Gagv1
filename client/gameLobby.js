
// EVENTS (GAMELOBBY)
Template.gameLobby.events
({

})

// HELPERS (GAMELOBBY)
Template.gameLobby.helpers
({
	'player': function()
	{
		// var gameUserRel = GameUserRelsList.findOne({userId: Meteor.userId()})
		// var currGameId = gameUserRel.gameId
		// var currGame = GamesList.findOne({_id: currGameId})
		// playersIdsArray = []
		// playersArray = []
		// for (i = 0; i < currGame.players.length; i++)
		// {
		// 	playerIdsArray.push(currGame.players[i])
		// }
		// return playerIdsArray
		// for (i = 0; i < playersArray.length; i++)
		// {
		// 	playersArray.push(Meteor.users.find({_id: playerIdsArray[i]}))
		// }
		// //return Meteor.users.find({_id: {$in: playersArray}})
		// //return playersArray
		// return playersArray
		//playerIds = []
		//players = []
		//return GamesList.findOne({players: Meteor.userId()}).players
		//var currUserId = Meteor.userId();
		//console.log(currUserId);
		console.log("here: " + GamesList.findOne({players: Meteor.userId()}).players)
		var playerIds = GamesList.findOne({players: Meteor.userId()}).players
		//return GamesList.findOne({players: Meteor.userId()}).players
		players = []

		_.each(playerIds, function(id){
			players.push(Meteor.users.findOne({_id: id}))
			console.log("test here: " + Meteor.users.find({_id: id}))
		})

		return players

		//return GamesList.find({players: {$elemMatch: Meteor.userId()}})
		//console.log
		//playerIds = GamesList.findOne({players: Meteor.userId()}).players
		
		//return Meteor.users.find({_id: {$in: playerIds}})
		//for (i = 0; i < GamesList.find({players: Meteor.userId()}).players.length; i++)
		//	playerIds.push(GamesList.find({players: Meteor.userId()}).players[i])
	}
})
