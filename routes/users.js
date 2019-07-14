const express = require('express');
const checkToken = require('../middlewares/checkToken');
const usersCtrl = require('../controllers/usersCtrl');

const router = express.Router();

router.use(checkToken);

router.get('/', usersCtrl.getAllUsers);

module.exports = router;
