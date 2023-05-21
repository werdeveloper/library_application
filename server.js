const express = require('express'),
    createError = require('http-errors'),
    app = express(),
    router = express.Router(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoDB = require('./services/db.service'),
    config = require('config'),
    configuration = config.configuration;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use((req, res, next) => { next(); });

require('./routes.js')(app);

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Node.js API with Mongo" });
});

// Handle the errors
app.use(async (req, res, next) => {
    next(createError.NotFound('This route doen not exist.'));
});


app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
        stack: req.app.get('env') === 'development' ? err.stack : {},
        data: []
    });
    next(createError.NotFound);
});



//for app is listen
app.listen((configuration.server.port || 3000),/* () => {
    console.log(`NODE_ENV: ${config.util.getEnv('NODE_ENV')}`);
    console.log(`Listing the server on ${configuration.server.baseUrl}:${configuration.server.port}`);
    console.log(`Swagger API runnign on ${configuration.server.baseUrl}:${configuration.server.port}/api-docs`);
} */ );

module.exports = app;
