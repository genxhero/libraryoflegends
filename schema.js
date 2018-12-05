const graphql = require('graphql');

const _ = require('lodash');
const {
   GraphQLObjectType,
   GraphQLString,
   GraphQLInt,
   GraphQLSchema
} = graphql;

const users = [
  {id: '23', username: "butter", email: "butter@mail.com"},
  {id: '1', username: "FierySwagger", email: "flaymeout@mail.com" },
];

const chars = [
    { id: '5', firstName: "Firion" },
    { id: '7', firstName: "Richard" },
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString}
  }
});

const CharType = new GraphQLObjectType({
   name: "Character",
   fields: {
     id: { type: GraphQLString },
     firstName: { type: GraphQLString },
   }
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString }},
            resolve(parentValue, args){
                return _.find(users, { id: args.id } );
            }
        },
        character: {
            type: CharType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return _.find(chars, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});