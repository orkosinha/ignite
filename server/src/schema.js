const { gql } = require('apollo-server');

const typeDefs = gql`
type Query{
    randomEvent: Event!
    searchEvent(
        type: [String]
        participants: Int
        max_price: [String]
        accessibility: [String]
    ): [Event]
}

type Event {
    activity: String
    accessibility: String
    type: String
    participants: Int
    price: String
}
`;

module.exports = typeDefs;