const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');
const ordersRoutes = require('./routes/orders');

const app = express();
app.set('secretKey', 'secret');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/orders', ordersRoutes);

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

module.exports = app;
