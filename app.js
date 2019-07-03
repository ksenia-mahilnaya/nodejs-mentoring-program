const express = require('express');
const _ = require('lodash');
const cookiesParser = require('./middlewares/cookiesParser');
const queryParser = require('./middlewares/queryParser');
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const passportRoute = require('./routes/passport');

const app = express();
const router = express.Router();

router.use((req, res, next) => {
  let randomNumber = Math.random().toString();
  randomNumber = randomNumber.substring(2, randomNumber.length);
  res.cookie('cookieName', randomNumber, { maxAge: 5000, httpOnly: true });

  console.log('cookies have created successfully');
  next();
});

router.use(cookiesParser);
router.use(queryParser);

app.use('/api/products', productsRoute);
app.use('/api/users', usersRoute);
app.use('/auth', authRoute);
app.use('/passport', passportRoute);

module.exports = app;
