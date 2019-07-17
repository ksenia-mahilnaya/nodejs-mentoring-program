const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const productsCtrl = require('../controllers/productsCtrl');
const router = express.Router();

router.use(bodyParser.json());

router.get('/', productsCtrl.getAllProducts);
router.get('/:id', productsCtrl.getProductById);
router.get('/:id/reviews', productsCtrl.getProductReviews);
router.post('/', productsCtrl.addNewProduct);
router.delete('/:id', productsCtrl.deleteProduct);

module.exports = router;