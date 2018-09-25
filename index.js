/* eslint-disable no-console */
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const usersRoute = require('./routes/users');
const mongoose = require('./config/database');

// var jwt = require('jsonwebtoken');

const app = express();
app.set('secretKey', 'secret');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/users', usersRoute);

// error handling
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  if (err.status === 404) {
    res.status(404).json({ message: 'Not found' });
  } else {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(8000, () => {
  console.log('Listening...');
});
