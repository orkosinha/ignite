module.exports = {
    Query: {
        randomEvent: (_, __, { dataSources }) => dataSources.boredAPI.getRandomEvent(),
        allEvent: (_, __, { dataSources }) => dataSources.boredAPI.getAllEvents()
    }
}