const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const citySchema = new Schema({
  name: String,
  country: String,
  capital: Boolean,
  location: {
    lat: String,
    long: String
  },
  lastModifiedDate: Date
});

module.exports = mongoose.model('City', citySchema);