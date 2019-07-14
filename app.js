const express = require('express');
const cookiesParser = require('./middlewares/cookiesParser');
const queryParser = require('./middlewares/queryParser');
const mongoose = require('mongoose');
const assert = require('assert');
const chalk = require('chalk');
const dbURL = require('./config/config').dbURL;
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const citiesRoute = require('./routes/cities');
const User = require('./models/User');
const Product = require('./models/Product');
const mockDataUsers = require('./data/MOCK_DATA_USERS');
const mockDataProducts = require('./data/MOCK_DATA_PRODUCTS');

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

const app = express();
const router = express.Router();

mongoose.connect(dbURL);

mongoose.connection.on('connected', () => {
    console.log(connected("Mongoose default connection is open to ", dbURL));
});

mongoose.connection.on('error', (err) => {
    console.log(error("Mongoose default connection has occured "+err+" error"));
});

mongoose.connection.on('disconnected', () => {
    console.log(disconnected("Mongoose default connection is disconnected"));
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log(termination("Mongoose default connection is disconnected due to application termination"));
        process.exit(0);
    });
});
 
// this piece of code is for importing mock data into database
// const db = mongoose.connection;
// User.collection.insertMany(mockDataUsers, function(err,r) {
//   assert.equal(null, err);
//   assert.equal(30, r.insertedCount);

//   db.close();
// });

// Product.collection.insertMany(mockDataProducts, function(err,r) {
//   assert.equal(null, err);
//   assert.equal(30, r.insertedCount);

//   db.close();
// });

mongoose.set('useFindAndModify', false);

router.use((req, res, next) => {
  let randomNumber = Math.random().toString();
  randomNumber = randomNumber.substring(2, randomNumber.length);
  res.cookie('cookieName', randomNumber, { maxAge: 5000, httpOnly: true });

  console.log('cookies have created successfully');
  next();
});

router.use(cookiesParser);
router.use(queryParser);

app.use('/api/products', productsRoute);
app.use('/api/users', usersRoute);
app.use('/api/cities', citiesRoute);

module.exports = app;