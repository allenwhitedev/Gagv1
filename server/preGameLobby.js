
// PREGAME (LOBBY METHODS)
Meteor.methods
({
	'joinGame': function()
	{
		console.log(Meteor.userId())
		var openGame = GamesList.findOne({round: 0})
		if (!openGame)
			var openGame = GamesList.insert({players: [Meteor.userId()], round: 0})
		else
			console.log("There was an open game")
		if (openGame.player.length() < 5)
			GamesList.update({_id: openGame._id}, {$addToSet: {players: Meteor.userId()}})
		gameUserRelsList.insert({gameId: openGame._id, userId: Meteor.userId(), currScore: 0})
	}
})