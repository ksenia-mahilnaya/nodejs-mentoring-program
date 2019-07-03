const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const mockDataProducts = require('../data/MOCK_DATA_PRODUCTS');
const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.use(checkToken);
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(mockDataProducts));
});

router.get('/:id', (req, res) => {
  const product = _.find(mockDataProducts, { Id: +req.params.id });
  if (product === undefined) {
    res.status(404)
      .json({message: `Product with id ${req.params.id} not found`})
  } else {
    res.json(product);
  }
});

router.get('/:id/reviews', (req, res) => {
  const product = _.find(mockDataProducts, { Id: +req.params.id });
  if (product === undefined) {
    res.status(404)
      .json({message: `Product with id ${req.params.id} not found`})
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(product.Reviews.toString());
  }
});

router.post('/', (req, res) => {
  const product = {
    'Id': req.body.id,
    'App Name': req.body.appName,
    'App Version': req.body.appVersion,
    'Username': req.body.username,
    'Reviews': req.body.reviews
  };
  mockDataProducts.push(product);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(product));
});

module.exports = router;
