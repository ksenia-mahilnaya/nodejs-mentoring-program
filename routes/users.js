const express = require('express');
const mockDataUsers = require('../data/MOCK_DATA_USERS');
const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.use(checkToken);

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(mockDataUsers));
});

module.exports = router;
