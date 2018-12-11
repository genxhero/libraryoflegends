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
const mutation = require('./mutations');
const RootQuery = require('./root_query_type');


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation
});