const { RESTDataSource } = require('apollo-datasource-rest');

function parsePrice(price) {
  if (0 <= price && price < 0.33) {
    return "$"
  } else if (0.33 <= price && price < 0.66) {
    return "$$";
  } else {
    return "$$$";
  }
}

function parseAccessibility(acc) {
  if (0 <= acc && acc < 0.33) {
    return "easy"
  } else if (0.33 <= acc && acc < 0.66) {
    return "medium";
  } else {
    return "hard";
  }
}

class BoredAPI extends RESTDataSource {
  constructor(eventDB) {
    super();
    this.baseURL = 'http://www.boredapi.com/api/';
    this.eventDB = eventDB;
  }

  async getSearchEvent(params) {
    //Get all the matches from the table
    var full_arr = []
    for (var i = 0; i < params.type.length; i++) {
      for (var j = 0; j < params.max_price.length; j++) {
        for (var k = 0; k < params.accessibility.length; k++){
          var combo_arr = await this.eventDB.findAll(
            { where:
              { type: params.type[i],
                participants: params.participants,
                price: params.max_price[j],
                accessibility: params.accessibility[k]
              } 
            });
            full_arr = full_arr.concat(combo_arr);
        }
      }
    }

    var event_list = [];
    for (var i = 0; i < full_arr.length; i++){
      event_list.push({
        activity: full_arr[i].activity,
        accessibility: full_arr[i].accessibility,
        type: full_arr[i].type,
        participants: full_arr[i].participants,
        price: full_arr[i].price
      });
    }
    
    return event_list;
  }

  async getRandomEvent() {
    const response = await this.get('activity');
    return {
        activity: response.activity,
        accessibility: parseAccessibility(response.accessibility),
        type: response.type,
        participants: response.participants,
        price: parsePrice(response.price)
    }
  }

}

module.exports = BoredAPI;
