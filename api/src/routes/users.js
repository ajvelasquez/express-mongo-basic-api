const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../db/models/user");
const autMidd = require('../middlewares/auth');
const env = require('../env');

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

router.post('/login', async (req, res, next) => {
    try {
        const errorMsg = 'The combination user/password does not exists';
        const error = new Error(errorMsg);
        error.status = 404;

        user = await User.findOne({email: req.body.email});
        if (!user) return next(error);
 
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) return next(error);

        const token = await jwt.sign(
            {email: user.email, id: user._id},
            env.app.JWT_KEY,
            {
                expiresIn: '1h'
            }
        );

        return res.status(200).json({token: token});
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', autMidd, async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await User.remove({_id: id});

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;