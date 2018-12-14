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
const Char = require('../models/character');
const UserType = require("./user_type");
const CharType = require("./char_type");
const StatLineType = require("./statline_type");
const axios = require("axios");

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCharacter: {
            type: CharType,
            args: {
                //validations: new GraphQLNonNull(GraphQLString)
                userId: { type: GraphQLString },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                class: { type: GraphQLString },
                level: { type: GraphQLInt },
                statline: {type: StatLineType}
            },
            resolve(parentValue, args) {
                // return axios.post(`http://localhost:3000/characters`, args)
                //     .then(res => res.data);
                return new Character(args).save();
            }
        },

        addUser: {
            type: UserType,
            args: {
                //validations: new GraphQLNonNull(GraphQLString)
                username: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return axios.post(`http://localhost:3000/users`, args)
                    .then(res => res.data);
            }
        },

        updateCharacter: {
            type: CharType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                class: { type: GraphQLString },
                level: { type: GraphQLInt },
            },
            resolve(parentValue, args) {
                return axios.patch(`http://localhost:3000/characters/${args.id}`, args)
                    .then(res => res.data);
            }
        },

        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return axios.patch(`http://localhost:3000/users/${args.id}`, args)
                    .then(res => res.data);
            }
        },

        deleteCharacter: {
            type: CharType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { id }) {
                return axios.delete(`http://localhost:3000/characters/${id}`)
                    .then(res => res.data);
            }
        }
    }
});

module.exports = mutation;