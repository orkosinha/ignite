module.exports = {
    Query: {
        randomEvent: (_, __, { dataSources }) => dataSources.boredAPI.getRandomEvent()
    }
}