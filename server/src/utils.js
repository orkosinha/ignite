const SQL = require('sequelize');
const http = require('http');

function populateDB(events) {
  //known keys with activities
  const keys = [9999999];
  var successes = true;

  for (var i = 0; i < keys.length; i++){
    http.get('http://www.boredapi.com/api/activity?key='+keys[i], (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', async () => {
        var event = JSON.parse(data);
        if(event.error == null){
          const success = await events.create({
            activity: event.activity,
            accessibility: event.accessibility,
            type: event.type,
            participants: event.participants,
            price: event.price
          });
          successes = success && successes;
        }
        events.sync({ alter : true});
      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  }

  return successes;
}

module.exports.allEvents = () => {
  //remember to change for commit
  const db = new SQL('db', 'user', 'pw', {
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
    accessibility: SQL.FLOAT,
    type: SQL.STRING,
    participants: SQL.INTEGER,
    price: SQL.INTEGER
  });

  populateDB(events);

  return events;
}