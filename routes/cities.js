const express = require('express');
const bodyParser = require('body-parser');
const citiesCtrl = require('../controllers/citiesCtrl');
const router = express.Router();

router.use(bodyParser.json());

router.get('/', citiesCtrl.getAllCities);
router.post('/', citiesCtrl.addNewCity);
router.put('/:id', citiesCtrl.updateCity);
router.delete('/:id', citiesCtrl.removeCity);

module.exports = router;