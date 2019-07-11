const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  firstName: {
      type: String,
      required: [ true, 'firstName field is required' ]
  },
  lastName: {
      type: String,
      required: [ true, 'lastName field is required' ]
  },
  title: String,
  language: String,
  shortSize: String,
  jobTitle: {
    type: String,
    maxlength: [40, 'Max jobTitle length is 40']
  }
});

module.exports = userSchema;