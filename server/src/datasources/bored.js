const { RESTDataSource } = require('apollo-datasource-rest');

class BoredAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://www.boredapi.com/api/';
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