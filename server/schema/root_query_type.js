const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;
const mongoose = require("mongoose");
const User = require('../models/user');
const Char =  require('../models/character');
const UserType = require('./user_type');
const CharType = require('./char_type');
const axios = require("axios");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return User.findById(args.id);
                // return axios.get(`http://localhost:3000/users/${args.id}`).then(res => res.data);
                //result is nested inside of "data". Graphql doesn't know this. That is why we need to grab res.data
            }
        },
        character: {
            type: CharType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return Char.findById(args.id);
                // return axios.get(`http://localhost:3000/characters/${args.id}`).then(res => res.data);
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