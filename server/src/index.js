const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const BoredAPI = require('./datasources/bored');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    boredAPI: new BoredAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});