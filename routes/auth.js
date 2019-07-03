const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const _ = require('lodash');
const mockDataUserAuth = require('../data/MOCK_DATA__USER_AUTH');

const router = express.Router();

router.use(bodyParser.json());

router.post('/', (req, res) => {
  let employee = _.find(mockDataUserAuth, { username: req.body.username });
  if (employee === undefined || employee.password !== req.body.password) {
    res.status(404)
      .send({
        "code": 404,
        "message": "Not found"
      })
  } else {
    let payload = { 'sub': employee.id, 'email': employee.email };
    let token = jwt.sign( payload, 'secret', { expiresIn: 10 });
    res.send({
      "code": 200,
      "message": "OK",
      "data": {
        "user": {
          "email": employee.email,
          "username": employee.username
        }
      },
      "token": token
    });
  }
});

module.exports = router;
