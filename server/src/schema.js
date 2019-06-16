const { gql } = require('apollo-server');

const typeDefs = gql`
type Query{
    """
    Gets a random event from the API
    """
    randomEvent: Event!
    """
    Searches an event based on a type, participant, max_price, and accessibility parameter.
    Returns an event array.
    """
    searchEvent(
        type: [String]
        participants: [String]
        max_price: [String]
        accessibility: [String]
    ): [Event]
}

type Event {
    """
    The name of the activity
    """
    activity: String
    """
    Can be "easy", "medium", or "hard"
    """
    accessibility: String
    """
    Can be one of the 8 types of activites
    """
    type: String
    """
    Can be "solo" or "group"
    """
    participants: String
    """
    Can be "free", "$". "$$", or "$$$"
    """
    price: String
}
`;

module.exports = typeDefs;