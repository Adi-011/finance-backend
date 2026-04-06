const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', 
  logging: false 
});

const User = require('../models/Users')(sequelize);
const Record = require('../models/Record')(sequelize);

module.exports = {
  sequelize,
  User,
  Record
};