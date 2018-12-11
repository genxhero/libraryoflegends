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
const User = mongoose.model("user");

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        characters: {
            type: new GraphQLList(CharType),
            resolve(parentValue, args) {
               return User.findChars(parentValue.id);
                // return axios.get(`http://localhost:3000/users/${parentValue.id}/characters`).then(res => res.data);
            }
        }
    })
});

module.exports = UserType;