const { gql } = require('apollo-server');

const typeDefs = gql`
type Query{
    randomEvent: Event
}

type EventSearch{
    type: String
    participants: Int
    price: Float
    max_price: Float
    accessibility: Float
}

type Event {
    activity: String
    accessibility: Float
    type: String
    participants: Int
    price: Float
}
`;

module.exports = typeDefs;