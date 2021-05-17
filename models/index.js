const Sequelize = require('sequelize');
const user = require('./user');
const post = require('./post');
const comment = require('./comment');
const inquire = require('./inquire');
const chatting = require('./chatting');
const room = require('./room');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.User = user;
db.Post = post;
db.Comment = comment;
db.Inquire = inquire;
db.Chatting = chatting;
db.Room = room;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;