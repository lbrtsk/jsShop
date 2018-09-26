const mongoose = require('mongoose');
const expect = require('chai').expect;

describe('Category model tests', () => {
  var categoryModel;

  before(function(done) {
    mongoose.connect('mongodb://localhost/jsshop_test').then(function() {
      done();
    });
  });

  beforeEach(function(done) {
    mongoose.connection.dropDatabase().then(function() {
      categoryModel = require('../models/categories');
      done();
    });
  });

  it('Creating a category instance', (done) => {
    cat = new categoryModel({
      name: 'cat'
    });
    cat.save(function(err, res) {
      expect(err).to.be.null;
      done();
    });
  });

  it('Creating a category instance and then deleting it', (done) => {
    cat = new categoryModel({
      name: 'cat'
    });
    cat.save().then(function() {
      categoryModel.findByIdAndDelete(cat.id, (err) => {
        expect(err).to.be.null;
        done();
      });
    });
  });
});
