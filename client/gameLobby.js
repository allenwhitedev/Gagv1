
// EVENTS (GAMELOBBY)
Template.gameLobby.events
({

})

// HELPERS (GAMELOBBY)
Template.gameLobby.helpers
({
	'player': function()
	{
		var gameUserRel = GameUserRelsList.findOne({userId: Meteor.userId()})
		var currGameId = gameUserRel.gameId
		var currGame = GamesList.findOne({_id: currGameId})
		playersIdsArray = []
		playersArray = []
		for (i = 0; i < currGame.players.length; i++)
		{
			playerIdsArray.push(currGame.players[i])
		}
		return playerIdsArray
		for (i = 0; i < playersArray.length; i++)
		{
			playersArray.push(Meteor.users.find({_id: playerIdsArray[i]}))
		}
		//return Meteor.users.find({_id: {$in: playersArray}})
		//return playersArray
		return playersArray
	}
})
