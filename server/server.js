require('dotenv').config();
const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require('./schema/schema');
const passport = require("passport");
const session = require("express-session");
const db = require('../config/keys').mongoURI;
const secretOrKey = require('../config/keys').secretOrPrivateKey;
const MongoStore = require('connect-mongo')(session);
const passportConfig = require('./services/auth');
const cors = require('cors');
const { execute, subscribe } =require('graphql');
const {createServer} = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

require('../config/passport');

const app = express();
const PORT = process.env.PORT || 8000
//
mongoose.Promise = global.Promise;
// mongoose.connect(db);
mongoose.connect(db,
  {
    ssl: true,
    useNewUrlParser: true
  } 
  
  );
mongoose.connection
    .once('open', () => console.log('Connected to Atlas instance.'))
    .on('error', error => console.log('Error connecting to Atlas:', error));


    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: "whatever",
        store: new MongoStore({
          url: db,
          autoReconnect: true,
          mongooseConnection: mongoose.connection,
        })
      }));

app.use(bodyParser.json());
app.use(cors('*'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', expressGraphQL({
    schema,
    // pubsub,
    graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
