const mongoose = require('mongoose');
const expect = require('chai').expect;

describe('Product model tests', () => {
  var productModel;

  before(function(done) {
    app.listen();
    mongoose.connect('mongodb://localhost/jsshop_test').then(function() {
      done();
    });
  });

  beforeEach(function(done) {
    mongoose.connection.dropDatabase().then(function() {
      productModel = require('../models/products');
      done();
    });
  });

  it('Creating a product instance', (done) => {
    prod = new productModel({
      name: 'prod',
      imageURL: '1',
      price: '2',
      description: '3',
    });
    prod.save(function(err, res) {
      expect(err).to.be.null;
      done();
    });
  });

  it('Creating a product instance with incomplete data', (done) => {
    prod = new productModel({
      name: 'prod',
      imageURL: '1'
    });
    prod.save(function(err, res) {
      expect(err).to.not.be.null;
      done();
    });
  });

  it('Creating a product instance and then deleting it', (done) => {
    prod = new productModel({
      name: 'prod',
      imageURL: '1',
      price: '2',
      description: '3',
    });
    prod.save().then(function() {
      productModel.findByIdAndDelete(prod.id, (err) => {
        expect(err).to.be.null;
        done();
      });
    });
  });
});
