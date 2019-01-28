const mongoose = require("mongoose");
const env = require("./../env")

const url = `mongodb://${env.db.host}:${env.db.port}`;
const options = {
    useNewUrlParser: true,
    dbName: env.db.name,
    user: env.db.user,
    pass: env.db.pass,
};

const connect = (req, res, next) => {
    mongoose.connect(url, options, (err) => {
        if (err) {
            console.error(`DB connection error: ${err}`);
            return next(err);
        }

        next();
    });
};

module.exports = {
    connect: connect
};