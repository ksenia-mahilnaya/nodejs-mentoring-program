const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const mockDataUserAuth = require('../data/MOCK_DATA__USER_AUTH');
const tokens = require('../data/AUTH_TOKENS');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const FACEBOOK_APP_ID = 868775790169593;
const FACEBOOK_APP_SECRET = '6c5b66c067d6601ac2daf16703839ec7';

const TWITTER_CONSUMER_KEY = '868775790169593';
const TWITTER_CONSUMER_SECRET = '6c5b66c067d6601ac2daf16703839ec7';

const GOOGLE_CLIENT_ID = '438909394222-5raudnt4ig1m09545cu7abtdvh00c4dv.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '19LcrjRZRhuUOM7BWK_--1H-';

const router = express.Router();

router.use(bodyParser.json());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false
  }, (username, password, done) => {
    let employee = _.find(mockDataUserAuth, { username: username });

    if (employee === undefined || employee.password !== password) {
      done(null, false, 'Bad username/password combination');
    } else {
      done(null, employee);
    }
  }
));

router.post('/local', passport.authenticate('local', { session: false }), (req, res) => {
  let token = _.find(tokens, { id: req.user.id });

  res.json(token);
});

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/passport/facebook/callback"
  }, (accessToken, refreshToken, profile, cb) => {
    return profile ? cb(null, profile) : cb(null, false);
  }
));

router.get('/facebook', passport.authenticate('facebook', { session: false }));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    res.end('Successful facebook authentication');
});

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/passport/twitter/callback"
  }, (token, tokenSecret, profile, cb) => {
    return profile ? cb(null, profile) : cb(null, false);
  }
));

router.get('/twitter', passport.authenticate('twitter', { session: false }));

router.get('/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
    // Successful authentication
    res.end('Successful twitter authentication');
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/passport/google/callback"
  }, (accessToken, refreshToken, profile, cb) => {
    return profile ? cb(null, profile) : cb(null, false);
  }
));

router.get('/google', passport.authenticate('google', { session: false, scope: ['profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Successful authentication
    res.end('Successful google authentication');
});

module.exports = router;