const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../db/models/order');
const Product = require('../db/models/product');

router.get('/', (req, res, next) => {
    Order.find()
        .populate('product')
        .then(res => {
                status = 200;
                response = res;
        })
        .catch(err => {
                status = 500;
                response = err;
        })
        .finally(() => res.status(status).json(response));
});

router.post('/', (req, res) => {
    let status = null;
    let response = null;

    Product.findById(req.body.productId)
        .then((res) => {
            if (res) {
                const data = {
                    quantity: req.body.quantity,
                    product: req.body.productId
                };
            
                const order = new Order(data);
                return order.save();
            }
        })
        .then(res => {
            if (!res) {
                status = 404;
                response = {
                    message: 'Product not found'
                };
            } else {
                status = 201;
                response = res;
            }
        })
        .catch(err => {
            status = 500;
            response = err;
        })
        .finally(() => res.status(status).json(response));
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Order.findById(id)
        .populate('product')
        .then(res => {
            if (res) {
                status = 200;
            } else {
                status = 404;
            }

            response = res;
        })
        .catch(err => {
            status = 500;
            response = err;
        })
        .finally(() => res.status(status).json(response));
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        id: id
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Order.remove({_id: id})
        .then(res => {
            if (res) {
                status = 200;
            } else {
                status = 404;
            }

            response = res;
        })
        .catch(err => {
            status = 500;
            response = err;
        })
        .finally(() => res.status(status).json(response));
});

module.exports = router;