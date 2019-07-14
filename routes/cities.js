const express = require('express');
const bodyParser = require('body-parser');
const citiesCtrl = require('../controllers/citiesCtrl');
const router = express.Router();

router.use(bodyParser.json());

router.get('/api/cities', citiesCtrl.getAllCities);
router.post('/api/cities', citiesCtrl.addNewCity);
router.put('/api/cities/:id', citiesCtrl.updateCity);
router.delete('/api/cities/:id', citiesCtrl.removeCity);

module.exports = router;