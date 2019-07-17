const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const productSchema = new Schema({
  id: {
      type: Number,
      min: [1, 'Minimum id length is 1'],
      max: 50
  },
  appName: {
      type: String,
      required: [ true, 'App name is required' ]
  },
  appVersion: String,
  username: String,
  reviews: Number,
  lastModifiedDate: Date
});

module.exports = mongoose.model('Product', productSchema);