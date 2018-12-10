const graphql = require('graphql');
const axios = require('axios');
const {
   GraphQLObjectType,
   GraphQLString,
   GraphQLInt,
   GraphQLList,
   GraphQLSchema,
   GraphQLNonNull
} = graphql;



const UserType = new GraphQLObjectType({
  name: "User",
  fields:  () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString},
    characters: {
        type: new GraphQLList(CharType),
        resolve(parentValue, args){
            return axios.get(`http://localhost:3000/users/${parentValue.id}/characters`).then(res => res.data);
        }
    }
  })
});

const CharType = new GraphQLObjectType({
   name: "Character",
   fields: () => ({
     id: { type: GraphQLString },
     firstName: { type: GraphQLString },
     lastName: { type: GraphQLString },
     class: { type: GraphQLString },
     level: {type: GraphQLInt},
     user: { 
           type: UserType,
           resolve(parentValue, args){
              return axios.get(`http://localhost:3000/users/${parentValue.userId}`)
              .then(res => res.data);
           } 
        }
   })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString }},
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/users/${args.id}`).then(res => res.data);
//result is nested inside of "data". Graphql doesn't know this. That is why we need to grab res.data
            }
        },
        character: {
            type: CharType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/characters/${args.id}`).then(res => res.data);
            }
        }
    }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
      addCharacter: {
          type: CharType,
          args: {
              //validations: new GraphQLNonNull(GraphQLString)
              userId: { type: GraphQLString },
              firstName: {type: GraphQLString },
              lastName: { type: GraphQLString },
              class: { type: GraphQLString },
              level: { type: GraphQLInt },
          },
          resolve(parentValue, args){
               return axios.post(`http://localhost:3000/characters`, args)
               .then(res => res.data);
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

      updateCharacter:{
        type: CharType,
        args: {
            id: {type: new GraphQLNonNull(GraphQLString)},
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            class: { type: GraphQLString },
            level: { type: GraphQLInt },
        },
        resolve(parentValue, args){
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
              id: {type: new GraphQLNonNull(GraphQLString) }
          },
          resolve(parentValue, {id}){
              return axios.delete(`http://localhost:3000/characters/${id}`)
              .then(res => res.data);
          }
      }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation
});