const axios = require("axios");
const {BASEURL_USER} = require('../config/url')
const redis = require('../config/redis')

const typeDefs = `#graphql

    type User {
        id: ID,
        email: String,
        password: String,
        role: String,
        phoneNumber: String,
        address: String
    }

    type Query {
        users: [User],
        user(id: ID) : User
    }

    input newUser {
        email: String!,
        password: String!,
        username: String,
        role: String,
        phoneNumber: String,
        address: String
    }

    type Mutation {
        addUser(user: newUser) : User
        deleteUser(id: ID): User
    }
`

const resolvers = {
    Query: {
        users: async () => {
            try {
                const dataCache = await redis.get('user:users')
                let response; 

                if(dataCache) {
                    response = JSON.parse(dataCache)
                } else {
                    const {data} = await axios({
                        url: BASEURL_USER + '/users',
                        method: 'GET'
                    })
                    await redis.set('user:users', JSON.stringify(data))
                    response = data
                }
                return response
            } catch (err) {
                throw err
            }
        },

        user: async(_, args) => {
            try {
                const {data} = await axios({
                    url: BASEURL_USER + '/users/' + args.id,
                    method: 'GET'
                })
                return data
            } catch (err) {
                throw err
            }
        }
    },
    Mutation: {
        addUser: async(_, args) => {
            try {
                const {data : user} = await axios({
                    url: BASEURL_USER + '/users',
                    method: 'POST',
                    data: args.user
                })
                return user
            } catch (err) {
                throw err
            }
        },

        deleteUser: async (_, args) => {
            try {
                await axios({
                    url: BASEURL_USER + '/users/' + args.id,
                    method: 'DELETE'
                })
                return {message: 'Success deleted user'}
            } catch (err) {
                console.log(err);
                throw err
            }
        }
    }
}

module.exports = {typeDefs, resolvers}