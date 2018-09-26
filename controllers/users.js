const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');

module.exports = {
  create(req, res, next) {
    userModel.findOne({
      email: req.body.email,
    }, (error, user) => {
      if (user) {
        const err = Error('User with given email already exists.');
        res.json({ status: 'error', message: err.message, data: null });
        next(err);
      } else {
        userModel.create({
          email: req.body.email,
          password: req.body.password,
        }, (err) => {
          if (err) {
            next(err);
          } else {
            res.json({ status: 'success', message: 'Registration succesful', data: null });
          }
        });
      }
    });
  },

  authenticate(req, res, next) {
    userModel.findOne({
      email: req.body.email,
    }, (err, userInfo) => {
      if (err) {
        next(err);
      } else if (userInfo && bcrypt.compareSync(req.body.password, userInfo.password)) {
        // eslint-disable-next-line no-underscore-dangle
        const token = jwt.sign({ id: userInfo._id, roles: userInfo.roles }, req.app.get('secretKey'), {});
        res.json({ status: 'success', message: 'Authentication succesful', data: { user: userInfo, token } });
      } else {
        res.json({ status: 'error', message: 'Authentication failed', data: null });
      }
    });
  },
};
