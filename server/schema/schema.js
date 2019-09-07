const _ = require('lodash');
const graphql = require('graphql');
const axios = require('axios');
const mongoose = require("mongoose");
const {
   GraphQLObjectType,
   GraphQLString,
   GraphQLInt,
   GraphQLList,
   GraphQLSchema,
   GraphQLNonNull
} = graphql;
const RootQuery = require('./root_query_type');
const mutations = require("./mutations");
const subscriptions = require('./subscription_type');
const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutations,
  subscription: subscriptions
});