const categoryModel = require('../models/categories');

module.exports = {
  list(req, res) {
    categoryModel.find({}, (err, categories) => {
      if (err) {
        res.json({ status: 'error', message: err.message, data: null });
      } else {
        res.json({ status: 'success', message: 'Categories list', data: categories });
      }
    });
  },

  async create(req, res) {
    const foundCategory = await categoryModel.findOne({ name: req.body.name }, (err, found) => {
      if (found) {
        res.status(409).json({ status: 'error', message: 'Category with the given name already exists', data: null });
      }
    });

    if (foundCategory) {
      return;
    }

    categoryModel.create({
      name: req.body.name,
    }, (err, result) => {
      if (err) {
        res.json({ status: 'error', message: err.message, data: null });
      } else {
        res.json({ status: 'success', message: 'Category created successfully', data: result });
      }
    });
  },

  read(req, res) {
    categoryModel.findById(req.params.id, (err, found) => {
      if (err) {
        res.json({ status: 'error', message: err.message, data: null });
      } else {
        res.json({ status: 'success', message: 'Category found.', data: found });
      }
    });
  },

  async update(req, res) {
    const foundCategory = await categoryModel.findOne({ name: req.body.name }, (err, found) => {
      if (found) {
        res.status(409).json({ status: 'error', message: 'Category with the given name already exists', data: null });
      }
    });

    if (foundCategory) {
      return;
    }

    categoryModel.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    }, { new: true }, (err, result) => {
      if (err) {
        res.json({ status: 'error', message: err.message, data: null });
      } else {
        res.json({ status: 'success', message: 'Category updated.', data: result });
      }
    });
  },

  delete(req, res) {
    categoryModel.findByIdAndDelete(req.params.id, (err, result) => {
      if (err) {
        res.json({ status: 'error', message: err.message, data: null });
      } else {
        res.json({ status: 'success', message: 'Category deleted.', data: result });
      }
    });
  },
};
