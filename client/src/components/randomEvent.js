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
      return <li>{data.randomEvent.activity}</li>
  }
  render() {
    return (
      <div>
        <ul id="random-event">
            <li> {this.displayRandomEvent()} </li>
        </ul>  
      </div>
    );
  }
}

export default graphql(getRandomEventQuery)(RandomEvent);
