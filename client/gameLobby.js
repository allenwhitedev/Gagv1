
// EVENTS (GAMELOBBY)
Template.gameLobby.events
({
	'click .nextRound': function()
	{
		var currGame = GamesList.findOne({players: Meteor.userId()})
		Meteor.call('nextRound')
		if(currGame.round >= 5)
		{
			console.log("Should alert now: " + AlertsList.findOne({gameId: currGame._id}))
			console.log(AlertsList.findOne({gameId: currGame._id}))
			alertArgs = AlertsList.findOne({gameId: currGame._id})
			setTimeout(function(){ swal(AlertsList.findOne({gameId: currGame._id}))}, 1000)
		}
	},
	'click .cardImg': function()
	{
		Meteor.call('addToJudgePile', localStorage.getItem('currJudgeId'), this.toString())
	},
	'click .judgeImg': function()
	{
		roundWinner = Meteor.users.findOne({_id: this.submitter})
		console.log('this.submitter: ' + this.submitter)
		console.log("roundWinner: " + roundWinner.name)
		setTimeout(function(){swal({title: roundWinner.name, text: "Won the Round"})}, 1000)
		Meteor.call('awardPoint', this.submitter)
	}
})

// HELPERS (GAMELOBBY)
Template.gameLobby.helpers
({
	'player': function()
	{
		//console.log("here: " + GamesList.findOne({players: Meteor.userId()}).players)
		var playerIds = GamesList.findOne({players: Meteor.userId()}).players
		//return GamesList.findOne({players: Meteor.userId()}).players
		players = []
		_.each(playerIds, function(id){
			players.push(Meteor.users.findOne({_id: id}))
			//console.log("test here: " + Meteor.users.find({_id: id}))
		})
		return players
	},
	'card': function()
	{
		extraUrlArray = ["http://gifgifs.com/animations/sports/other-exercises/Yoga.gif"]
		var urlArray = ["http://gifgifs.com/animations/sports/soccer/Bouncing_ball.gif", "http://gifgifs.com/animations/sports/football/Tackle.gif", "http://gifgifs.com/animations/sports/soccer/goal.gif", "http://gifgifs.com/animations/sports/bicycling/biker.gif", "http://gifgifs.com/animations/sports/baseball/3D_bat.gif"]
		return urlArray
	},
	'isJudge': function()
	{
		if(this.isJudge == true)
		{
			localStorage.setItem('currJudgeId', this._id)
			return true
		}
	},
	'currRound': function()
	{
		return GamesList.findOne({players: Meteor.userId()}).round
	},
	'judgeCard': function()
	{
		var currUserJPL = JudgePilesList.find({judgeId: Meteor.userId()})
		if (currUserJPL.count() >= 4)
			return JudgePilesList.find({judgeId: Meteor.userId()})
	}
})
