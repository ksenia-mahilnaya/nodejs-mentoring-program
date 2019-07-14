const express = require('express');
const _ = require('lodash');
const cookiesParser = require('./middlewares/cookiesParser');
const queryParser = require('./middlewares/queryParser');
const mockDataProducts = require('./data/MOCK_DATA_PRODUCTS');
const mockDataUsers = require('./data/MOCK_DATA_USERS');
const mongoose = require('mongoose');
const assert = require('assert');
const dbURL = require('config/config').dbURL;
const User = require('./models/User');
const Product = require('./models/Product');
const City = require('./models/City');
const productSchema = require('./models/productSchema');
const citySchema = require('./models/citySchema');

const app = express();
const router = express.Router();

mongoose.connect(dbURL);

mongoose.connection.on('connected', function(){
    console.log(connected("Mongoose default connection is open to ", dbURL));
});

mongoose.connection.on('error', function(err){
    console.log(error("Mongoose default connection has occured "+err+" error"));
});

mongoose.connection.on('disconnected', function(){
    console.log(disconnected("Mongoose default connection is disconnected"));
});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log(termination("Mongoose default connection is disconnected due to application termination"));
        process.exit(0)
    });
});
 
const db = mongoose.connection;

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

router.use(express.json());
router.use(cookiesParser);
router.use(queryParser);

router.get('/api/products', (req, res) => {
  Product.find((err, products) => {
    if (err) throw err;
    res.json(products);
  });
});

router.get('/api/products/:id', (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) throw err;
    res.json(product);
  });
});

router.get('/api/products/:id/reviews', (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) throw err;
    res.json(product.reviews);
  });
});

router.post('/api/products', (req, res) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    id: req.body.id,
    appName: req.body.appName,
    appVersion: req.body.appVersion,
    username: req.body.username,
    reviews: req.body.reviews
  });

  product.schema.pre('save', function(next) {
    this.lastModifiedDate = new Date();
    next();
  });

  product.save((err) => {
    if (err) throw err;
    console.log('Product saved successfully');
    res.json(product);
    });
});

router.delete('/api/products/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, product) => {
    if (err) throw err;
    res.json(product);
  });
});

router.get('/api/users', (req, res) => {
  User.find((err, users) => {
    if (err) throw err;
    res.json(users);
  });
});

router.delete('/api/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) throw err;
    res.json(user);
  });
});

router.get('/api/cities', (req, res) => {
  City.find((err, cities) => {
    if (err) throw err;
    res.json(cities);
  });
});

router.post('/api/cities', (req, res) => {
  const city = new City({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    country: req.body.country,
    capital: req.body.capital,
    location: req.body.location
  });

  city.schema.pre('save', function(next) {
    this.lastModifiedDate = new Date();
    next();
  });

  city.save((err) => {
    if (err) throw err;
    console.log('City saved successfully');
    res.json(city);
    });
});

router.put('/api/cities/:id', (req, res) => {
  const newCityProps = {
    name: req.params.name,
    country: req.params.country,
    capital: req.params.capital,
    location: req.params.location
  };

  City.schema.pre('findOneAndUpdate', function(next) {
    this._update.$set.newCityProps.lastModifiedDate = new Date();
    next();
  });
  
  City.findOneAndUpdate({ _id: req.params.id }, { $set: newCityProps }, { new: true }, (err, city) => {
    if (err) throw err;
    console.log('City updated successfully');
      res.json(city);
  });
});

router.delete('/api/cities/:id', (req, res) => {
  City.findByIdAndRemove(req.params.id, (err, city) => {
    if (err) throw err;
    res.json(city);
  });
});

app.use('/', router);

module.exports = app;