const express = require('express');

const middleware = require('./middleware');

const router = express.Router();
const categoriesController = require('../controllers/categories');

// public routes
router.get('/', middleware.verifyLoggedIn, categoriesController.list);
router.get('/:id', middleware.verifyLoggedIn, categoriesController.read);

// admin routes
router.post('/', middleware.verifyLoggedInAdmin, categoriesController.create);
router.put('/:id', middleware.verifyLoggedInAdmin, categoriesController.update);
router.delete('/:id', middleware.verifyLoggedInAdmin, categoriesController.delete);

module.exports = router;
