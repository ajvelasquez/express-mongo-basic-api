const express = require('express');
const router = express.Router();

const products = require('./products');
const orders = require('./orders');
const users = require('./users');

router.use('/products', products);
router.use('/orders', orders);
router.use('/users', users);

module.exports = router;