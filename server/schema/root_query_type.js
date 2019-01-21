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
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return User.findById(args.id);
                // return axios.get(`http://localhost:3000/users/${args.id}`).then(res => res.data);
                //result is nested inside of "data". Graphql doesn't know this. That is why we need to grab res.data
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
                console.log(Char);
                debugger;
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