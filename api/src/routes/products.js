const express = require('express');
const router = express.Router();

const Product = require("../db/models/product");

router.get('/', (req, res) => {
    Product.find()
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
    const productData = {
        name: req.body.name,
        price: req.body.price,
    };
    let status = null;
    let response = null;

    const product = new Product(productData);
    product.save()
        .then(res => {
            status = 201;
            response = res;
        })
        .catch(err => {
            status = 500;
            response = err;
        })
        .finally(() => res.status(status).json(response));
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Product.findById(id)
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
    const productData = {
        name: req.body.name,
        price: req.body.price,
    };

    Product.update({ _id: id }, {
        $set: productData
    })
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

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Product.remove({_id: id})
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