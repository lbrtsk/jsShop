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

  async create(req, res) {
    const foundProduct = await productModel.findOne({ name: req.body.name }, (err, found) => {
      if (found) {
        res.status(409).json({ status: 'error', message: 'Product with the given name already exists', data: null });
      }
    });

    if (foundProduct) {
      return;
    }

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

  async update(req, res) {
    const foundProductWithGivenName = await productModel.findOne({ name: req.body.name },
      (err, found) => {
        if (found && found.id !== req.params.id) {
          res.status(409).json({ status: 'error', message: 'Product with the given name already exists', data: null });
        }
      });

    if (foundProductWithGivenName && foundProductWithGivenName.id !== req.params.id) {
      return;
    }

    productModel.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      imageURL: req.body.imageURL,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
    }, { new: true }, (err, result) => {
      if (err) {
        res.json({ status: 'error', message: err.message, data: null });
      } else {
        res.json({ status: 'success', message: 'Product updated.', data: result });
      }
    });
  },

  delete(req, res) {
    productModel.findByIdAndDelete(req.params.id, (err, result) => {
      if (err) {
        res.json({ status: 'error', message: err.message, data: null });
      } else {
        res.json({ status: 'success', message: 'Product deleted.', data: result });
      }
    });
  },
};
