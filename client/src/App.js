import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import RandomEvent from './components/randomEvent';

// apollo client setup
const client = new ApolloClient({
  uri: 'https://six-ignite-nine.herokuapp.com/'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          {/* <h1>Sina Carried This Hackathon #Facts</h1> */}
          <RandomEvent/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
