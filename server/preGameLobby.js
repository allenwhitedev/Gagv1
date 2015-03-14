
// PREGAME (LOBBY METHODS)
Meteor.methods
({
	'joinGame': function()
	{
		if (Meteor.userId() != null && Meteor.userId() != undefined)
		{
			var openGame = GamesList.findOne({round: 0})
			if (!openGame)
			{
				var openGame = GamesList.insert({players: [Meteor.userId()], round: 0})
				GamesList.update({_id: openGame._id}, {$addToSet: {players: Meteor.userId()}})
				GameUserRelsList.insert({gameId: openGame._id, userId: Meteor.userId()})
				Meteor.users.update({_id: Meteor.userId()}, {$set: {currScore: 0}})
			}
			else
			{
				console.log("There was an open game")
				if (openGame.players.length < 5)
				{
					GamesList.update({_id: openGame._id}, {$addToSet: {players: Meteor.userId()}})
					GameUserRelsList.insert({gameId: openGame._id, userId: Meteor.userId()})
					Meteor.users.update({_id: Meteor.userId()}, {$set: {currScore: 0}})
				if(GamesList.findOne({_id: openGame._id}).players.length == 5)
					Meteor.call('startGame', openGame._id)
				}
			}
		}
	}
})