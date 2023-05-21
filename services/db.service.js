'user strict';
let mongoose = require('mongoose');
let config = require('config');
let configuration = config.get('configuration');
console.log(`NODE_ENV: ${config.util.getEnv('NODE_ENV')}`);

// "url": "mongodb+srv://${username}:${password}@newdb.1tpog60.mongodb.net/${dbName}?retryWrites=true&w=majority",
const url = `mongodb+srv://${configuration.mongo.username}:${configuration.mongo.password}@newdb.1tpog60.mongodb.net/${configuration.mongo.dbname}?retryWrites=true&w=majority`;

// Connecting to the database
mongoose.Promise = global.Promise;
mongoose.connect(url, configuration.mongo.options).then(() => {
    console.log("Success! connected to the database");
}).catch(err => {
    console.error('Failed! Could not connect to the database. Exiting now...', err);
    process.exit();
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB...');
});

mongoose.connection.on('error', (err) => {
    console.log(err.message);
});

mongoose.connection.on('disconnected', (err) => {
    console.log('Mongoose connection is disconnected.');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});
