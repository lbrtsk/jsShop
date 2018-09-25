const jwt = require('jsonwebtoken');

const userModel = require('../models/users');

async function checkIfUserHasAdminRole(userId) {
  const res = await userModel.findById(userId, (err, foundUser) => {
    if (err) {
      return null;
    }
    return foundUser.roles && foundUser.roles.includes('admin');
  });

  return res;
}

module.exports = {
  verifyLoggedIn(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
      if (err) {
        res.json({ status: 'error', message: err.message, data: null });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  },

  verifyLoggedInAdmin(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
      if (err) {
        res.json({ status: 'error', message: err.message, data: null });
      } else if (checkIfUserHasAdminRole(decoded.id)) {
        req.body.userId = decoded.id;
        next();
      } else {
        res.json({ status: 'error', message: 'Insufficient permissions', data: null });
      }
    });
  },
};
