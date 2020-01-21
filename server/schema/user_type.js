const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLBoolean
} = graphql;
const CharType = require('./char_type');
const mongoose = require("mongoose");
const User = require('../models/user');
const Char = require('../models/character');
const axios = require("axios");



const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: {type: GraphQLString},
        bio: {type: GraphQLString},
        cool: {type: GraphQLBoolean},
        characters: {
            type: new GraphQLList(CharType),
            resolve(parentValue, args) {
               return User.findChars(parentValue.id);
            }
        }
    })
});

module.exports = UserType;