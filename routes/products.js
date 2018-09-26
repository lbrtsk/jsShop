const express = require('express');

const middleware = require('./middleware');

const router = express.Router();
const productsController = require('../controllers/products');

// public routes
router.get('/', middleware.verifyLoggedIn, productsController.list);
router.get('/:id', middleware.verifyLoggedIn, productsController.read);

// admin routes
router.post('/', middleware.verifyLoggedInAdmin, productsController.create);
router.put('/:id', middleware.verifyLoggedInAdmin, productsController.update);
router.delete('/:id', middleware.verifyLoggedInAdmin, productsController.delete);

module.exports = router;
