const express = require('express');
const report = require('./routes/report.route'); // Imports routes for the products
// initialize our express app
const app = express();
const bodyParser = require('body-parser');
// Set up mongoose connection
const mongoose = require('mongoose');

const dev_db_url = 'mongodb://localhost:27017/api_test';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/report', report);

const port = 1236;

app.listen(port, () => {
	console.log('Server is up and running on port numner ' + port);
});
module.exports = app;
