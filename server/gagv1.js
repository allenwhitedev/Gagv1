Meteor.publish('theGames', function()
{
	return GamesList.find({})
})
Meteor.publish('theCards', function()
{
	return CardsList.find({})
})
Meteor.publish('theGameUserRels', function()
{
	return GameUserRelsList.find({/*userId: this.userId*/})
})
Meteor.publish('theUsers', function()
{
	return Meteor.users.find({})
})
Meteor.publish('theAlerts', function()
{
	return AlertsList.find({})
})
Meteor.publish('theJudgePiles', function()
{
	return JudgePilesList.find({})
})