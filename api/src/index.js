const express = require('express');
const app = express();
const morgan = require('morgan');

const env = require('./env');
const routes = require('./routes');
const db = require("./db");

const PORT = env.app.port;

app.use(db.connect);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authroization"
    );

    if (req.method == "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "PUT, POST, PATCH, DELETE, GET"
        );
    }

    next();
});

routes(app);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).send({
        error: err.message || 'Something broke!'
    });
  });

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
  });

app.listen(PORT, () => {
    console.log(`Running on por: ${PORT}`);
});