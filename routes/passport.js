const express = require('express');
const bodyParser = require('body-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passportCtrl = require('../controllers/passportCtrl');

const FACEBOOK_APP_ID = '868775790169593';
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
  }, passportCtrl.localStrategyCallback));

router.post('/local', passport.authenticate('local', { session: false }), passportCtrl.localStrategyGetToken);

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/passport/facebook/callback"
  }, passportCtrl.facebookStrategyGetUserProfile));

router.get('/facebook', passport.authenticate('facebook', { session: false }));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), passportCtrl.facebookStrategyCallback);

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/passport/twitter/callback"
  }, passportCtrl.twitterStrategyGetUserProfile));

router.get('/twitter', passport.authenticate('twitter', { session: false }));

router.get('/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }), passportCtrl.twitterStrategyCallback);

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/passport/google/callback"
  }, passportCtrl.googleStrategyGetUserProfile));

router.get('/google', passport.authenticate('google', { session: false, scope: ['profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), passportCtrl.googleStrategyCallback);

module.exports = router;