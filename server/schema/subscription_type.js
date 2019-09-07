const graphql = require("graphql");
const CharType =require("./char_type");
// const { PubSub } = require('apollo-server');

// const pubsub = new PubSub();

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const charAdded = "charAdded"

const SubscriptionType = new GraphQLObjectType({ 
    name: "SubscriptionType",
    fields: () => ({ 
        charAdded: {
            type: CharType,
            resolve: (parentValue, ctx, {pubsub}) => {
              subscribe: () => pubsub.asyncIterator(charAdded)
              },
        }
    })
})

module.exports = SubscriptionType;