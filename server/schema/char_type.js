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

const Char = mongoose.model('character');
const StatLine = require('./statline_type');


const CharType = new GraphQLObjectType({
    name: "Character",
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        class: { type: GraphQLString },
        level: { type: GraphQLInt },
        statline: { type: StatLine },
        user: {
            type: UserType,
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${parentValue.userId}`)
                    .then(res => res.data);
            }
        }
    })
});

module.exports = CharType;