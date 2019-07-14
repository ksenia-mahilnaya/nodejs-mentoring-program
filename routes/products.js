const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const checkToken = require('../middlewares/checkToken');
const productsCtrl = require('../controllers/productsCtrl');

const router = express.Router();

router.use(checkToken);
router.use(bodyParser.json());

router.get('/', productsCtrl.getAllProducts);
router.get('/:id', productsCtrl.getProductById);
router.get('/:id/reviews', productsCtrl.getProductReviews);

router.post('/', productsCtrl.addNewProduct);

module.exports = router;
