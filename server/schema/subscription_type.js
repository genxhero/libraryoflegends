const graphql = require("graphql");
const CharType =require("./char_type");
// s

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
            subscribe: () => pubsub.asyncIterator(charAdded),
            resolve: payload => {
              return payload
            }
        }
    })
})

module.exports = SubscriptionType;