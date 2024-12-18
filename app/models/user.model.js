const mongoose = require('mongoose');
// these role and user models are collections in the mongoDB database

// user object will have a Roles array that contains ids in roles collection as reference
// this is called reference Data model or Normalisation
const User = mongoose.model("User" , new mongoose.Schema({
      username : String,
      email : String,
      password : String,
      roles : [{ 
            type : mongoose.Schema.Types.ObjectId,
            ref : "Role"
      }]
}));

module.exports = User;