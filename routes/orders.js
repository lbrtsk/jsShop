const express = require('express');

const middleware = require('./middleware');

const router = express.Router();
const ordersController = require('../controllers/orders');

// public routes
router.post('/', middleware.verifyLoggedIn, ordersController.create);

// admin routes
router.get('/', middleware.verifyLoggedInAdmin, ordersController.list);
router.get('/:id', middleware.verifyLoggedInAdmin, ordersController.read);

module.exports = router;
