const products = require('./products');
const orders = require('./orders');
const users = require('./users');

module.exports = (app) => {
    app.use('/products', products);
    app.use('/orders', orders);
    app.use('/users', users);
};