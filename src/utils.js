const { KEYS } = require('./constants');
const SQL = require('sequelize');
const http = require('http');

function parsePrice(price) {
  if (price == 0) {
    return "free";
  } else if (0 < price && price < 0.33) {
    return "cheap"
  } else if (0.33 <= price && price < 0.66) {
    return "worth it";
  } else {
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

function populateDB(events) {
  events.destroy({
    where: {},
    truncate: true
  })
  for (var i = 0; i < KEYS.length; i++){
    http.get('http://www.boredapi.com/api/activity?key='+KEYS[i], (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', async () => {
        var event = JSON.parse(data);
        if(event.error == null){
          await events.create({
            activity: event.activity,
            accessibility: parseAccessibility(event.accessibility),
            type: event.type,
            participants: parseParticipants(event.participants),
            price: parsePrice(event.price)
          });
        }
        events.sync({ force : false });
      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  }

  return 0;
}

module.exports.allEvents = () => {
  //remember to change for commit
  const db = new SQL('team16_db', 'team16_user', 'ball is life', {
    dialect: 'mysql',
    host: '35.238.128.54',
    port: 3306,
    logging: false
  });

  const events = db.define('event', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    activity: SQL.STRING,
    accessibility: SQL.STRING,
    type: SQL.STRING,
    participants: SQL.STRING,
    price: SQL.STRING
  });

  populateDB(events);

  return events;
}