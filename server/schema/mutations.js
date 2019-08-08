const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLID
} = graphql;
const mongoose = require("mongoose");
const User = mongoose.model('user');
const Char = mongoose.model("character");
const UserType = require("./user_type");
const CharType = require("./char_type");
const StatLineType = require("./statline_type");
const s3Payload = require("./s3_payload");
const axios = require("axios");
const AuthService = require('../services/auth');
const aws = require("aws-sdk");

//TODO: create function to determine dev or prod bucket.
const s3Bucket = "temporary";

const StatLineInput = new GraphQLInputObjectType({
  name: "StatLineInput",
  fields: () => ({
    strength: { type: GraphQLInt },
    dexterity: { type: GraphQLInt },
    constitution: { type: GraphQLInt },
    intelligence: { type: GraphQLInt },
    wisdom: { type: GraphQLInt },
    charisma: { type: GraphQLInt }
  })
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCharacter: {
            type: CharType,
            args: {
                //validations: new GraphQLNonNull(GraphQLString)
                userId: { type: GraphQLID },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                class: { type: GraphQLString },
                level: { type: GraphQLInt },
                age: {type: GraphQLInt},
                statline: {type: StatLineInput},
                background: {type: GraphQLString},
                ancestry: {type: GraphQLString},
                bio: {type: GraphQLString},
                image: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                const { userId, ...rest } = args
                return User.addChar(userId, rest);
            }
        }, 
        addUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                password: {type: GraphQLString }
            },
            resolve(parentValue, {email, username, password}, req) {
                return AuthService.signup({email, password, username, req})
            }
        },

        logout: {
                type: UserType,
                resolve(parentValue, args, req) {
                    const {user} = req;
                    req.logout();
                    return user;                
            }
        },

        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: {type: GraphQLString }
            },
            resolve(parentValue, {email, password}, req) {
               return AuthService.login({email, password, req});
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
                return Char.remove({_id: id})
            }
        },

        signS3: {
          type: s3Payload,
          args: {
              filemame: { type: GraphQLString },
              filetype: { type: GraphQLString }
          }, 
          async resolve(parentValue, { filename, filetype } ) {
             // API_SECRET
             // API_KEY
             const s3 = new aws.S3({
                 signatureVersion:'v4',
                 region: 'us-west-1'
             });

             const s3Params = {
                 Bucket: s3Bucket,
                 Key: filename,
                 Expires: 60,
                 ContentType: filetype,
                 ACL: 'public-read'
             };

             const signedRequest = await s3.getSignedUrl('putObject', s3Params);
             const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;
             return {
                 signedRequest,
                 url
             };
          }
        }
    }
});

module.exports = mutation;