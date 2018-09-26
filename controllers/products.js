const productModel = require('../models/products');

module.exports = {
  list(req, res) {
    productModel.find({}, (err, products) => {
      if (err) {
        res.json({ status: 'error', message: err.message, data: null });
      } else {
        res.json({ status: 'success', message: 'Products list', data: products });
      }
    });
  },

  create(req, res) {
    productModel.create({
      name: req.body.name,
      imageURL: req.body.imageURL,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
    }, (err, result) => {
      if (err) {
        res.json({ status: 'error', message: err.message, data: null });
      } else {
        res.json({ status: 'success', message: 'Product created successfully', data: result });
      }
    });
  },

  read(req, res) {
    productModel.findById(req.params.id, (err, found) => {
      if (err) {
        res.json({ status: 'error', message: err.message, data: null });
      } else {
        res.json({ status: 'success', message: 'Product found.', data: found });
      }
    });
  },
};
