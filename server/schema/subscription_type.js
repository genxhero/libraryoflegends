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

const SubscriptionType = new GraphQLObjectType({ 
    name: SubscriptionType,
    fields: () => ({ 
        newCharacter: {
            type: CharType,
            resolve(parentValue, args) {
                
            }
        }
    })
})

module.exports = Subscription;