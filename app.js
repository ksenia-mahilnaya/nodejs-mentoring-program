const express = require('express');
const _ = require('lodash');
const cookiesParser = require('./middlewares/cookiesParser');
const queryParser = require('./middlewares/queryParser');
const mockDataProducts = require('./data/MOCK_DATA_PRODUCTS');
const mockDataUsers = require('./data/MOCK_DATA_USERS');
const mongoose = require('mongoose');
const assert = require('assert');
const userSchema = require('./models/userSchema');
const productSchema = require('./models/productSchema');
const citySchema = require('./models/citySchema');

const app = express();
const router = express.Router();

mongoose.connect("mongodb://localhost:27017/admin");
 
const db = mongoose.connection;
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const City = mongoose.model('City', citySchema);

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
    if (err) {
        res.send(err);
    }
    res.json(products);
  });
});

router.get('/api/products/:id', (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) {
        res.send(err);
    }
    res.json(product);
  });
});

router.get('/api/products/:id/reviews', (req, res) => {
  Product.findById(req.params.id, function(err, product) {
    if (err) {
        res.send(err);
    }
    res.json(product.reviews);
  });
});

router.post('/api/products', (req, res) => {
  const product = new Product({
    id: req.body.id,
    appName: req.body.appName,
    appVersion: req.body.appVersion,
    username: req.body.username,
    reviews: req.body.reviews,
    lastModifiedDate: new Date()
  });

  product.save((err) => {
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
});

router.delete('/api/products/:id', (req, res) => {
  Product.remove({ _id: req.params.id }, (err, product) => {
    if (err) {
        res.send(err);
    }
    res.json(product);
  });
});

router.get('/api/users', (req, res) => {
  User.find((err, users) => {
    if (err) {
        res.send(err);
    }
    res.json(users);
  });
});

router.delete('/api/users/:id', (req, res) => {
  User.remove({ _id: req.params.id }, (err, user) => {
    if (err) {
        res.send(err);
    }
    res.json(user);
  });
});

router.get('/api/cities', (req, res) => {
  City.find((err, cities) => {
    if (err) {
        res.send(err);
    }
    res.json(cities);
  });
});

router.post('/api/cities', (req, res) => {
  const city = new City({
    name: req.body.name,
    country: req.body.country,
    capital: req.body.capital,
    location: req.body.location,
    lastModifiedDate: new Date()
  });

  city.save((err) => {
        if (err) {
            res.send(err);
        }
        res.json(city);
    });
});

router.put('/api/cities/:id', (req, res) => {
  City.findById(req.params.id, (err, city) => {
      if (err) {
          res.send(err);
      }
      city.name = req.params.name;
      city.country = req.params.country;
      city.capital = req.params.capital;
      city.location = req.params.location;
      city.lastModifiedDate = new Date();

      city.save((err) => {
          if (err) {
              res.send(err);
          }
          res.json(city);
      });
  });
});

router.delete('/api/cities/:id', (req, res) => {
  City.remove({ _id: req.params.id }, (err, city) => {
    if (err) {
        res.send(err);
    }
    res.json(city);
  });
});

app.use('/', router);

module.exports = app;