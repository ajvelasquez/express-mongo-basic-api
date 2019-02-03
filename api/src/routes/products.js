const express = require('express');
const router = express.Router();

const Product = require("../db/models/product");

router.get('/', async (req, res, next) => {
    try {
        let products = await Product.find(); 

        return res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const productData = {
            name: req.body.name,
            price: req.body.price,
        };
    
        const product = new Product(productData);
        response = await product.save();

        return res.status(201).json(product);
    } catch (error) {
        next((error));
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let status = 200;
        const id = req.params.id;

        let product = await Product.findById(id);
        if (!product) status = 404;

        return res.status(status).json(product)
    } catch (error) {
        next((error));
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        let status = 200;
        const id = req.params.id;
        const productData = {
            name: req.body.name,
            price: req.body.price,
        };

        let product = await Product.update({ _id: id }, {
            $set: productData
        });
        if (!product) status = 404;

        return  res.status(status).json(product);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        let status = 200;
        const id = req.params.id;

        product = await Product.remove({_id: id});
        if (!product) status = 404;

        return  res.status(status).json(product);        
    } catch (error) {
        next(error);
    }
});

module.exports = router;