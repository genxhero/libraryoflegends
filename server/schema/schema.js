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


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutations
});