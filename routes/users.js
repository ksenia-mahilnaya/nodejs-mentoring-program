const express = require('express');
const usersCtrl = require('../controllers/usersCtrl');
const router = express.Router();

router.get('/api/users', usersCtrl.getAllUsers);
router.delete('/api/users/:id', usersCtrl.deleteUser);

module.exports = router;