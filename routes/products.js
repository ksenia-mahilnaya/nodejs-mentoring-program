const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const productsCtrl = require('../controllers/productsCtrl');
const router = express.Router();

router.use(bodyParser.json());

router.get('/api/products', productsCtrl.getAllProducts);
router.get('/api/products/:id', productsCtrl.getProductById);
router.get('/api/products/:id/reviews', productsCtrl.getProductReviews);
router.post('/api/products', productsCtrl.addNewProduct);
router.delete('/api/products/:id', productsCtrl.deleteProduct);

module.exports = router;