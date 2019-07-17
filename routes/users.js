const express = require('express');
const usersCtrl = require('../controllers/usersCtrl');
const router = express.Router();

router.get('/', usersCtrl.getAllUsers);
router.delete('/:id', usersCtrl.deleteUser);

module.exports = router;