require('dotenv').config();
const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require('./schema/schema');
const passport = require("passport");
const session = require("express-session");
const db = require('../config/keys').mongoURI;
const MongoStore = require('connect-mongo')(session);
const passportConfig = require('./services/auth');
const cors = require('cors')
require('../config/passport');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(db);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));


    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: 'aaabbbccc',
        store: new MongoStore({
          url: db,
          autoReconnect: true
        })
      }));

app.use(bodyParser.json());
app.use(cors('*'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
