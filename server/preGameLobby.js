
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
	},
	'startGame': function(gameId)
	{
		GamesList.update({_id: gameId}, {$inc: {round: 1}})
		var firstJudgeId = GamesList.findOne({_id: gameId}).players[0]
		Meteor.users.update({_id: firstJudgeId}, {$set: {isJudge: true}})
	},
	'nextRound': function()
	{
		console.log('Made it here!')
		gameId = GameUserRelsList.findOne({userId: Meteor.userId()}).gameId
		var currRound = GamesList.findOne({_id: gameId}).round
		var oldJudgeId = GamesList.findOne({_id: gameId}).players[currRound - 1]
		var newJudgeId = GamesList.findOne({_id: gameId}).players[currRound]
		Meteor.users.update({_id: oldJudgeId}, {$set: {isJudge: false}})
		Meteor.users.update({_id: newJudgeId}, {$set: {isJudge: true}})
		GamesList.update({_id: gameId}, {$inc: {round: 1}})
	}
})