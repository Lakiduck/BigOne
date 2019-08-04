//Define User Model using mongodb and mongoose
//dbConfig contains db connection string i.e module.exports = <DBConnectionString>
const dbConfig = require('../dbConfig');
const mongoose = require('mongoose');
const Schema = mongoose.Schema

mongoose.connect(dbConfig, {useNewUrlParser: true});

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

//Export the User Model for use in other files
module.exports = mongoose.model('User', UserSchema);
