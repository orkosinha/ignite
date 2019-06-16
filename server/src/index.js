const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { allEvents } = require('./utils');

const eventDB = allEvents();
const BoredAPI = require('./datasources/bored');

const server = new ApolloServer({
  playground: true,
  introspection: true,
  typeDefs,
  resolvers,
  dataSources: () => ({
    boredAPI: new BoredAPI(eventDB)
  })
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
