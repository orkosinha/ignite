const { gql } = require('apollo-server');

const typeDefs = gql`
type Query{
    randomEvent: Event!
    searchEvent(
        type: [String]
        participants: [String]
        max_price: [String]
        accessibility: [String]
    ): [Event]
}

type Event {
    activity: String
    accessibility: String
    type: String
    participants: String
    price: String
}
`;

module.exports = typeDefs;