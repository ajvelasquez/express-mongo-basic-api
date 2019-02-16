const express = require('express');
const router = express.Router({mergeParams: true});

const multer = require('multer');

const Product = require("../db/models/product");
const autMidd = require('../middlewares/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toDateString() + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/png') {
        return cb(null, true);
    }
    
    return cb(new Error('Not valid mime type'), false);
};
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/', async (req, res, next) => {
    try {
        let products = await Product.find(); 

        return res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

router.post('/', autMidd, upload.single('productImage'), async (req, res, next) => {
    try {
        const productData = {
            name: req.body.name,
            price: req.body.price,
            productImage: req.file.path
        };
    
        const product = new Product(productData);
        response = await product.save();

        return res.status(201).json(product);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', autMidd, async (req, res, next) => {
    try {
        let status = 200;
        const id = req.params.id;

        let product = await Product.findById(id);
        if (!product) status = 404;

        return res.status(status).json(product)
    } catch (error) {
        next(error);
    }
});

router.put('/:id', autMidd, async (req, res, next) => {
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

router.delete('/:id', autMidd, async (req, res, next) => {
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