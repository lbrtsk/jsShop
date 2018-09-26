const orderModel = require('../models/orders');

module.exports = {
  list(req, res) {
    orderModel.find({}, (err, orders) => {
      if (err) {
        res.json({ status: 'error', message: err.message, data: null });
      } else {
        res.json({ status: 'success', message: 'Orders list', data: orders });
      }
    });
  },

  async create(req, res) {
    orderModel.create({
      product: req.body.product,
      user: req.body.userId,
    }, (err, result) => {
      if (err) {
        res.json({ status: 'error', message: err.message, data: null });
      } else {
        res.json({ status: 'success', message: 'Order created successfully', data: result });
      }
    });
  },

  read(req, res) {
    orderModel.findById(req.params.id, (err, found) => {
      if (err) {
        res.json({ status: 'error', message: err.message, data: null });
      } else {
        res.json({ status: 'success', message: 'Order found.', data: found });
      }
    });
  },
};
