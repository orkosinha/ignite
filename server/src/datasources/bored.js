const { RESTDataSource } = require('apollo-datasource-rest');

class BoredAPI extends RESTDataSource {
  constructor({ eventDB }) {
    super();
    this.baseURL = 'http://www.boredapi.com/api/';
    this.eventDB = eventDB;
    this.populateDB();
  }

  async populateDB() {
    //populate eventDB with every event
    var keys = [];
    /*
    const response = await this.get('activity?key='+i);
    if (response.error == 
        'No activities found with the specified parameters'){
        errors = errors + 1;
    } else {
        console.log(response);
    }
    console.log("ERRORS: "+errors);
    return errors;
    */
  }

  async getRandomEvent() {
    const response = await this.get('activity');
    return {
        activity: response.activity,
        accessibility: response.accessibility,
        type: response.type,
        participants: response.participants,
        price: response.price
    }
  }

  async getAllEvents() {
    const response = await this.get('activity?key=9999999');
    //console.log(response);
    console.log(response.error == null);
    return {
      activity: response.activity,
      accessibility: response.accessibility,
      type: response.type,
      participants: response.participants,
      price: response.price
    }
  }

}

module.exports = BoredAPI;