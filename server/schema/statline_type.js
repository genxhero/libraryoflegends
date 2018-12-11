const graphql = require("graphql");
const axios = require("axios");
const mongoose = require("mongoose");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const StatLine = new GraphQLObjectType({
  name: "AbilityScores",
  fields: {
    strength: { type: GraphQLInt },
    dexterity: { type: GraphQLInt },
    constitution: { type: GraphQLInt },
    intelligence: { type: GraphQLInt },
    wisdom: { type: GraphQLInt },
    charisma: { type: GraphQLInt }
  }
});

module.exports = StatLine;