const mockDataUserAuth = require('../data/MOCK_DATA__USER_AUTH');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

module.exports = {
    getUserProfile: (req, res) => {
        let employee = _.find(mockDataUserAuth, { username: req.body.username });
        if (employee === undefined || employee.password !== req.body.password) {
          res.status(404)
            .send({
              "code": 404,
              "message": "Not found"
            })
        } else {
          let payload = { 'sub': employee.id, 'email': employee.email };
          let token = jwt.sign( payload, 'secret', { expiresIn: 10000 });
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
    }
};