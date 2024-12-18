//initiallising the mongoose
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//db is an object with properties as Dbtype , user , role
const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.role = require('./role.model');

db.ROLES = ["user" , "admin" , "moderator"];

module.exports = db;