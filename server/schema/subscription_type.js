const graphql = require("graphql");
const CharType =require("./char_type");
const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const Subscription = new GraphQLObjectType({ 
  characterCreated: {
      type: CharType,
      subscribe: () => pubsub.asyncIterator("characterCreated")
}
})

module.exports = Subscription;