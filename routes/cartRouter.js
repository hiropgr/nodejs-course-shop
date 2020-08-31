const express = require('express');
const cartController = require('../controllers/cartController');
const cartRouter = express.Router();
const middleware = require('../middleware/auth');

cartRouter.get('/', middleware, cartController.index);
cartRouter.post('/add', middleware, cartController.addToCart);
cartRouter.delete('/remove/:id', middleware, cartController.remove);

module.exports = cartRouter;