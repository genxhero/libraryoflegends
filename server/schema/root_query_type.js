const mongoose = require("mongoose");
const User = require('../models/user');
const Char = require('../models/character');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const UserType = require('./user_type');
const CharType = require('./char_type');
const axios = require("axios");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        user: {
            type: UserType,
            args: { username: { type: GraphQLString } },
            resolve(parentValue, args) {
                return User.findById(args.username);
            }
        },

        currentUser: {
             type: UserType,
             resolve(parentValue, args, req) {
                return req.user;
             }
        },

        users: {
            type: new GraphQLList(UserType),
            resolve(){
                console.log(User);
                return User.find({});
            }
        },
        character: {
            type: CharType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return Char.findById(args.id);
            }
        },
        characters: {
            type: new GraphQLList(CharType),
            resolve() {
                return Char.find({});
            }

        }
    })
});

module.exports = RootQuery;