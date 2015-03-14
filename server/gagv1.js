Meteor.publish('theGames', function()
{
	return GamesList.find({isOpen: true})
})
Meteor.publish('theCards', function()
{
	return CardsList.find({})
})
Meteor.publish('theGameUserRels', function()
{
	return GameUserRelsList.find({userId: this.userId})
})