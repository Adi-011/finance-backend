const { Sequelize } = require('sequelize');

// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // This will create a local file for the DB
  logging: false // Set to console.log to see SQL queries
});

// Import and initialize models
const User = require('../models/User')(sequelize);
const Record = require('../models/Record')(sequelize);

module.exports = {
  sequelize,
  User,
  Record
};