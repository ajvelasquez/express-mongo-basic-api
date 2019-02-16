const express = require('express');
const router = express.Router();

const User = require("../db/models/user");
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res, next) => {
    try {
        registeredUser = await User.find({email: req.body.email});
        if (registeredUser.length > 0) return next(new Error('The email is already taken'));

        const hash = await bcrypt.hash(req.body.password, 10);
        if (!hash) return next(new Error('Bcrypt error'));

        const data = {
            email: req.body.email,
            password: hash,
        };
    
        const user = new User(data);
        response = await user.save();

        return res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await User.remove({_id: id});

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;