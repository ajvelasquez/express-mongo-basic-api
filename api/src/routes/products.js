const express = require('express');
const router = express.Router();

const Product = require("../db/models/product");

router.get('/', (req, res) => {
    res.status(200).json({
        msg: 'Handling GET requests to products/'
    });
});

router.post('/', (req, res) => {
    const productData = {
        name: req.body.name,
        price: req.body.price,
    };

    const product = new Product(productData);

    product.save();

    res.status(201).json({
        msg: 'Handling POST requests to products/',
        product: product
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        id: id
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        id: id
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        id: id
    });
});

module.exports = router;