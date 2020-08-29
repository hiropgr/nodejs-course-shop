const express = require('express');
const cartController = require('../controllers/cartController');
const cartRouter = express.Router();

cartRouter.get('/', cartController.index);
cartRouter.post('/add', cartController.addToCart);
cartRouter.delete('/remove/:id', cartController.remove);

module.exports = cartRouter;