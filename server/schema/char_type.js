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

const User = require('../models/user');
const Char = require('../models/character');
const StatLine = require('./statline_type');


const CharType = new GraphQLObjectType({
    name: "Character",
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        class: { type: GraphQLString },
        ancestry:{ type: GraphQLString },
        background: {type: GraphQLString},
        level: { type: GraphQLInt },
        statline: { type: StatLine },
        user: {
            type: require('./user_type'),
            resolve(parentValue) {
                // return axios.get(`http://localhost:3000/users/${parentValue.userId}`)
                //     .then(res => res.data);
                debugger;
                return Char.findById(parentValue).populate('user')
                .then(char => {
                    console.log(char);
                     return char.user;
                });
            }
        }
    })
});


module.exports = CharType;