const express = require('express');
const app = express();
const morgan = require('morgan');

const env = require('./env');
const routes = require('./routes');

const PORT = env.app.port;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


routes(app);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).send({
        message: err.message || 'Something broke!',
        status: err.status
    });
  });

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
  });

app.listen(PORT, () => {
    console.log(`Running on por: ${PORT}`);
});