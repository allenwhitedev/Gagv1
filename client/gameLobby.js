
// EVENTS (GAMELOBBY)
Template.gameLobby.events
({

})

// HELPERS (GAMELOBBY)
Template.gameLobby.helpers
({
	'player': function()
	{
		var gameUserRel = GameUserRelsList.find({_id: Meteor.userId()})
		return GamesList.find({_id: gameUserRel._id})
	}
})