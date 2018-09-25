const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost/jsshop';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
