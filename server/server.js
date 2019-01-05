const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require('./schema/schema');
const passport = require("passport");
const db = require('../config/keys').mongoURI;
require('../config/passport');

const app = express();

// const MONGO_URI =
//   "mongodb://FierySwagger:butter469@ds151840.mlab.com:51840/libraryoflegends";
// if (!MONGO_URI){
//     throw new Error('Invalid URI');
// }

mongoose.Promise = global.Promise;
// mongoose.connect(MONGO_URI);
mongoose.connect(db);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
