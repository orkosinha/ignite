const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createAllEvents } = require('./utils');

const eventDB = createAllEvents();
const BoredAPI = require('./datasources/bored');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    boredAPI: new BoredAPI(eventDB)
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});