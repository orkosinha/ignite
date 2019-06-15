const SQL = require('sequelize');


module.exports.createAllEvents = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  //remember to change for commit
  const db = new SQL('team16_db', 'team16_user', 'ball is life', {
    dialect: 'mysql',
    host: '35.238.128.54',
    port: 3306
  });

  const event = db.define('event', {
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

  return event;
}
