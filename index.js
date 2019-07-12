const config = require('config');
const MongoClient = require("mongodb").MongoClient;
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const morgan = require('morgan');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const post = require('./routes/posts');
const express = require('express');

if (!config.get('jwtPrivateKey')) {
  console.log('Fatal Error:la config ');
  process.exit(1);
}

const app = express();
app.use(morgan('tiny'));
const db = config.get('db');
console.log(db);
mongoose.connect(db)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers',
    "Origin,X-Requested-With,Content-Type,Accept");
  next();
});
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/posts', post);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
