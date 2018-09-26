/* eslint-disable no-console */
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');

const mongoose = require('./config/database');

// var jwt = require('jsonwebtoken');

const app = express();
app.set('secretKey', 'secret');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);

// error handling
app.use((req, res) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not found' });
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
