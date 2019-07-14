const mockDataUserAuth = require('../data/MOCK_DATA__USER_AUTH');
const tokens = require('../data/AUTH_TOKENS');
const _ = require('lodash');

module.exports = {
    localStrategyGetToken: (req, res) => {
        let token = _.find(tokens, { id: req.user.id });
        res.json(token);
    },
    localStrategyCallback: (username, password, done) => {
        let employee = _.find(mockDataUserAuth, { username: username });
    
        if (employee === undefined || employee.password !== password) {
          done(null, false, 'Bad username/password combination');
        } else {
          done(null, employee);
        }
    },
    facebookStrategyGetUserProfile: (accessToken, refreshToken, profile, cb) => {
        return profile ? cb(null, profile) : cb(null, false);
    },
    facebookStrategyCallback: (req, res) => {
        // Successful authentication
        res.end('Successful facebook authentication');
    },
    twitterStrategyGetUserProfile: (token, tokenSecret, profile, cb) => {
        return profile ? cb(null, profile) : cb(null, false);
    },
    twitterStrategyCallback: (req, res) => {
        // Successful authentication
        res.end('Successful twitter authentication');
    },
    googleStrategyGetUserProfile: (accessToken, refreshToken, profile, cb) => {
        return profile ? cb(null, profile) : cb(null, false);
    },
    googleStrategyCallback: (req, res) => {
        // Successful authentication
        res.end('Successful google authentication');
    }
};