const products = require('./products');
const orders = require('./orders');

module.exports = (app) => {
    app.use('/products', products);
    app.use('/orders', orders);
};