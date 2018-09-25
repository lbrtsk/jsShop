const productModel = require('../models/products');

module.exports = {
  list(req, res, next) {
    productModel.find({}, (err, products) => {
      if (err) {
        next(err);
      } else {
        res.json({ status: 'success', message: 'Products list', data: products });
      }
    });
  },

  create(req, res, next) {
    productModel.create({
      name: req.body.name,
      imageURL: req.body.imageURL,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
    }, (err, result) => {
      if (err) {
        next(err);
      } else {
        res.json({ status: 'success', message: 'Product created successfully', data: result });
      }
    });
  },
};
