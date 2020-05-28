const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:prodId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/add-to-cart', shopController.addToCart);
router.post('/delete-cart', shopController.deleteFromCart);

router.post('/checkout', shopController.postOrder);
router.get('/orders', shopController.getOrders);

module.exports = router;
