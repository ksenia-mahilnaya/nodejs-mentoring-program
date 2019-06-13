const express = require('express');
const _ = require('lodash');
const cookiesParser = require('./middlewares/cookiesParser');
const queryParser = require('./middlewares/queryParser');
const mockDataProducts = require('./data/MOCK_DATA_PRODUCTS');
const mockDataUsers = require('./data/MOCK_DATA_USERS');

const app = express();
const router = express.Router();

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
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(mockDataProducts));
});

router.get('/api/products/:id', (req, res) => {
  const product = _.find(mockDataProducts, {Id: +req.params.id});
  if (product === undefined) {
    res.status(404)
      .json({message: `Product with id ${req.params.id} not found`})
  } else {
    res.json(product);
  }
});

router.get('/api/products/:id/reviews', (req, res) => {
  const product = _.find(mockDataProducts, {Id: +req.params.id});
  if (product === undefined) {
    res.status(404)
      .json({message: `Product with id ${req.params.id} not found`})
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(product.Reviews.toString());
  }
});

router.post('/api/products', (req, res) => {
  const product = {
    'Id': req.body.id,
    'App Name': req.body.appName,
    'App Version': req.body.appVersion,
    'Username': req.body.username,
    'Reviews': req.body.reviews
  };
  mockDataProducts.push(product);
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(product));
});

router.get('/api/users', (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(mockDataUsers));
});

app.use('/', router);

module.exports = app;