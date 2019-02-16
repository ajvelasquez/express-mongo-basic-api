const jwt = require('jsonwebtoken');

const env = require('../env');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await jwt.verify(token, env.app.JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};