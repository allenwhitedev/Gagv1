
// EVENTS (PREGAME LOBBY)
Template.preGameLobby.helpers
({
	'game': function()
	{
		return ["gameObjectHere"]
	},
	'player': function()
	{
		return ["playerObjectHere"] 
	}
})

// HELPERS (PREGAME LOBBY)
Template.preGameLobby.events
({
	'click .joinGame': function()
	{
		console.log(Meteor.userId())
		Meteor.call('joinGame', Meteor.userId())
	}
})