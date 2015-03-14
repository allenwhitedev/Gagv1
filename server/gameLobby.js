Meteor.methods({	
	'startGame': function(gameId)
	{
		GamesList.update({_id: gameId}, {$inc: {round: 1}})
		var firstJudgeId = GamesList.findOne({_id: gameId}).players[0]
		Meteor.users.update({_id: firstJudgeId}, {$set: {isJudge: true}})
	},
	'nextRound': function()
	{
		var gameId = GameUserRelsList.findOne({userId: Meteor.userId()}).gameId
		var currRound = GamesList.findOne({_id: gameId}).round
		var oldJudgeId = GamesList.findOne({_id: gameId}).players[currRound - 1]
		var newJudgeId = GamesList.findOne({_id: gameId}).players[currRound]
		Meteor.users.update({_id: oldJudgeId}, {$set: {isJudge: false}})
		Meteor.users.update({_id: newJudgeId}, {$set: {isJudge: true}})
		GamesList.update({_id: gameId}, {$inc: {round: 1}})
		console.log("currRound: " + currRound)
		if (currRound >= 4)
		{	
			// have text be who won
			var playerIdsArray = GamesList.findOne({_id: gameId}).players
			console.log('playerIdsArray[0]: ' + playerIdsArray[0])
			var highestScore = 1
			var tiedPlayersArray = []
			var tiedPlayersText = ""
			var pScore = 1

			for (i = 0; i < playerIdsArray.length; i++)
			{
				pScore = Meteor.users.findOne({_id: playerIdsArray[i]}).currScore
				if(pScore > 2)
				{
					console.log("pscore was greater than 2")
					var winner = Meteor.users.findOne({_id: playerIdsArray[i]}).name
				}
				else if (pScore > highestScore)
				{
					highestScore = pScore
					console.log("should be name: " + Meteor.users.findOne({_id: playerIdsArray[i]}).name)
					tiedPlayersArray = [Meteor.users.findOne({_id: playerIdsArray[i]}).name]
				}
				else if (pScore == highestScore)
					tiedPlayersArray.push(Meteor.users.findOne({_id: playerIdsArray[i]}).name)
			}
			if (winner)
				var finalWord = "The winner is " + winner
			else
			{
				for (i = 0; i < tiedPlayersArray.length; i++)
				{
					tiedPlayersText += tiedPlayersArray[i]
					if (i + 1 < tiedPlayersArray.length)
					tiedPlayersText += " and "
				}
			var finalWord =	"Wow! It's a tie between " + tiedPlayersText
			console.log("finalWord: " + finalWord)
			}
			AlertsList.insert({gameId: gameId, title: "Game Over!", text: finalWord, imageUrl: "http://gifgifs.com/animations/sports/soccer/Bouncing_ball.gif" })
		}
	},
	'addToJudgePile': function(judgeId, url)
	{
		var existingJPL = JudgePilesList.findOne({submitter: Meteor.userId(), judgeId: judgeId})
		console.log("existingJPL: " + existingJPL)
		if (existingJPL === null || existingJPL === undefined)
			JudgePilesList.insert({judgeId: judgeId, url: url, submitter: Meteor.userId()})
		//if(JudgePilesList.find({judgeId: judgeId}).count() == 4)
		//	Meteor.call('judgeDecision')
	},
	'judgeDecision': function()
	{
		console.log('in judgeDecision')
	}
})	