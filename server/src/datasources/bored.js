const { RESTDataSource } = require('apollo-datasource-rest');

class BoredAPI extends RESTDataSource {
  constructor(eventDB) {
    super();
    this.baseURL = 'http://www.boredapi.com/api/';
    this.eventDB = eventDB;
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

}

module.exports = BoredAPI;