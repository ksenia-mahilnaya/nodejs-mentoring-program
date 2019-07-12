const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const citySchema = new Schema({
  name: String,
  country: String,
  capital: Boolean,
  location: {
    lat: Number,
    long: Number
  },
  lastModifiedDate: Date
});

module.exports = citySchema;