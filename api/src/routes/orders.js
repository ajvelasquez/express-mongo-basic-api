const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    let err = new Error('Something broke!')
    err.status = 418;
    if(true) return next(err);

    res.status(200).json({
        msg: 'Handling GET requests to orders'
    });
});

router.post('/', (req, res) => {
    res.status(201).json({
        msg: 'Handling POST requests to orders'
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