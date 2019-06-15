module.exports = {
    Query: {
        randomEvent: (_, __, { dataSources }) => dataSources.boredAPI.getRandomEvent(),
        searchEvent: (_, {
            type = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"],
            participants = 1,
            max_price = ["$", "$$", "$$$"],
            accessibility = ["easy", "medium", "hard"]
        }, { dataSources }) => dataSources.boredAPI.getSearchEvent({
            type,
            participants,
            max_price,
            accessibility
        })
    }
}