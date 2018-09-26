const express = require('express');

const middleware = require('./middleware');

const router = express.Router();
const ordersController = require('../controllers/orders');

// public routes
router.get('/:id', middleware.verifyLoggedIn, ordersController.read);
router.post('/', middleware.verifyLoggedIn, ordersController.create);

// admin routes
router.get('/', middleware.verifyLoggedInAdmin, ordersController.list);

module.exports = router;
