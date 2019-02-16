const express = require('express');
const router = express.Router();

const Order = require('../db/models/order');
const Product = require('../db/models/product');
const autMidd = require('../middlewares/auth');

router.get('/', autMidd, async (req, res, next) => {
    try {
        let response = await Order.find()
        .populate('product');

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

router.post('/', autMidd, async (req, res, next) => {
    try {
        let product = await Product.findById(req.body.productId);

        if (!product) {
            return next({
                status: 404,
                message: 'Product not found'
                
            });
        }

        const data = {
            quantity: req.body.quantity,
            product: req.body.productId
        };
    
        const order = new Order(data);
        let response = await order.save();
            
        return res.status(201).json(response);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', autMidd, async (req, res, next) => {
    try {
        const id = req.params.id;
        let status = 200;
        let response = await Order.findById(id)
            .populate('product');

        if (!response) {
            status = 404;
        }
        
        return res.status(status).json(response);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', autMidd, async (req, res, next) => {
    try {
        const id = req.params.id;
        res.status(200).json({
            id: id
        });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', autMidd, async (req, res, next) => {
    try {
        const id = req.params.id;
        let status = 200;

        let response = await Order.remove({_id: id});

        if (!response) status = 404;
        
        return res.status(status).json(response);
    } catch (error) {
        next(error);
    }
});

module.exports = router;