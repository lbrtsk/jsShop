const express = require('express');

const middleware = require('./middleware');

const router = express.Router();
const productsController = require('../controllers/products');

router.get('/', middleware.verifyLoggedIn, productsController.list);
router.get('/:id', middleware.verifyLoggedIn, productsController.read);
router.post('/', middleware.verifyLoggedInAdmin, productsController.create);

module.exports = router;
