const { RESTDataSource } = require('apollo-datasource-rest');

function parsePrice(price) {
  if (price == 0) {
    return "free";
  } else if (0 < price && price < 0.33) {
    return "cheap"
  } else if (0.33 <= price && price < 0.66) {
    return "worth it";
  } else {
    console.log(price)
    return "expensive";
  }
}

function parseAccessibility(acc) {
  if (0 <= acc && acc < 0.33) {
    return "easy";
  } else if (0.33 <= acc && acc < 0.66) {
    return "medium";
  } else {
    return "hard";
  }
}

function parseParticipants(par) {
  if (par == 1) {
    return "solo";
  } else {
    return "group";
  }
}

function parseTypeEmoji(typ) {
  if (typ == "education") {
    return "📚";
  } else if (typ == "recreational") {
    return "💃";
  } else if (typ == "social") {
    return "😎";
  } else if (typ == "diy") {
    return "🔨";
  } else if (typ == "charity") {
    return "👼";
  } else if (typ == "cooking") {
    return "🍳";
  } else if (typ == "relaxation") {
    return "⛱️";
  } else if (typ == "music") {
    return "🎵";
  } else if (typ == "busywork") {
    return "⚙️";
  }
}

function parsePriceEmoji(pri) {
  if (pri == "free") {
    return "💸";
  } else if (pri == "cheap") {
    return "💵";
  } else if (pri == "worth it") {
    return "💰";
  } else if (pri == "expensive") {
    return "🏦";
  }
}

function parseAccessibilityEmoji(acc) {
  if (acc == "easy") {
    return "😗";
  } else if (acc == "medium") {
    return "🤨";
  } else if (acc == "hard") {
    return "😡";
  }
}

function parseParticipantsEmoji(parti) {
  if (parti == "solo") {
    return "🙋";
  } else if (parti == "group") {
    return "👯";
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
          for (var l = 0; l < params.participants.length; l++) {
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
    }

    var event_list = [];
    for (var i = 0; i < full_arr.length; i++){
      event_list.push({
        activity: full_arr[i].activity,
        accessibility: full_arr[i].accessibility,
        accessibility_emoji: parseAccessibilityEmoji(full_arr[i].accessibility),
        type: full_arr[i].type,
        type_emoji: parseTypeEmoji(full_arr[i].type),
        participants: full_arr[i].participants,
        participant_emoji: parseParticipantsEmoji(full_arr[i].participants),
        price: full_arr[i].price,
        price_emoji: parsePriceEmoji(full_arr[i].price)
      });
    }
    
    return event_list;
  }

  async getRandomEvent() {
    const response = await this.get('activity');
    return {
        activity: response.activity,
        accessibility: parseAccessibility(response.accessibility),
        accessibility_emoji: parseAccessibilityEmoji(parseAccessibility(response.accessibility)),
        type: response.type,
        type_emoji: parseTypeEmoji(response.type),
        participants: parseParticipants(response.participants),
        participant_emoji: parseParticipantsEmoji(parseParticipants(response.participants)),
        price: parsePrice(response.price),
        price_emoji: parsePriceEmoji(parsePrice(response.price))
    }
  }

}

module.exports = BoredAPI;
