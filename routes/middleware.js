const jwt = require('jsonwebtoken');

function verifyUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
    if (err) {
      res.json({ status: 'error', message: err.message, data: null });
    } else if (req.checkAdmin && !(decoded.roles && decoded.roles.includes('admin'))) {
      res.json({ status: 'error', message: 'Insufficient privileges', data: null });
    } else {
      req.body.userId = decoded.id;
      next();
    }
  });
}

module.exports = {
  verifyLoggedIn(req, res, next) {
    verifyUser(req, res, next);
  },

  verifyLoggedInAdmin(req, res, next) {
    req.checkAdmin = true;
    verifyUser(req, res, next);
  },
};
