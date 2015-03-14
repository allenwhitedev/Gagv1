
// EVENTS (GAMELOBBY)
Template.gameLobby.events
({

})

// HELPERS (GAMELOBBY)
Template.gameLobby.helpers
({
	'player': function()
	{
		console.log("here: " + GamesList.findOne({players: Meteor.userId()}).players)
		var playerIds = GamesList.findOne({players: Meteor.userId()}).players
		//return GamesList.findOne({players: Meteor.userId()}).players
		players = []
		_.each(playerIds, function(id){
			players.push(Meteor.users.findOne({_id: id}))
			console.log("test here: " + Meteor.users.find({_id: id}))
		})
		return players
	},
	'card': function()
	{
		extraUrlArray = ["http://gifgifs.com/animations/sports/other-exercises/Yoga.gif"]
		var urlArray = ["http://gifgifs.com/animations/sports/soccer/Bouncing_ball.gif", "http://gifgifs.com/animations/sports/football/Tackle.gif", "http://gifgifs.com/animations/sports/soccer/goal.gif", "http://gifgifs.com/animations/sports/bicycling/biker.gif", "http://gifgifs.com/animations/sports/baseball/3D_bat.gif"]
		return urlArray
	}
})
