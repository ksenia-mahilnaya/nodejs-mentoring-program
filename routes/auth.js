const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const authCtrl = require('../controllers/authCtrl');

router.use(bodyParser.json());
router.post('/', authCtrl.getUserProfile);

module.exports = router;
