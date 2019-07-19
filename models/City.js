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

citySchema.pre('save', function (next) {
  this.lastModifiedDate = new Date();
  next();
});

citySchema.pre('findOneAndUpdate', function (next) {
  this.lastModifiedDate = new Date();
  next();
});

module.exports = mongoose.model('City', citySchema);
