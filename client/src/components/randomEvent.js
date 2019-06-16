import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getRandomEventQuery = gql`
    {
        randomEvent {
            activity
            accessibility
            type
            participants
            price
        }
    }
`;

class RandomEvent extends Component {
  displayRandomEvent() {
      var data = this.props.data;
      if (data.loading) {
          return <div> Loading Event... </div>
      }
      return (
        <div class='eventContainer'>
          <h1>{data.randomEvent.activity}</h1>
          <p>{data.randomEvent.accessibility} 😵 • {data.randomEvent.type} ⛱️ • {data.randomEvent.participants} 🙋‍• {data.randomEvent.price} 🏦</p>
        </div>
      );
  }
  render() {
    return (
      <div id='randomEvent'>
        <ul> {this.displayRandomEvent()} </ul>
      </div>
    );
  }
}

export default graphql(getRandomEventQuery)(RandomEvent);
