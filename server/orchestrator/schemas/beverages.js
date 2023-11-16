const axios = require("axios");
const {BASEURL_APP, BASEURL_USER} = require('../config/url');
const redis = require("../config/redis");

const typeDefs = `#graphql

    type Beverage {
        id: ID,
        name: String,
        imgUrl: String,
        description: String,
        price: Int,
        CategoryId: Int,
        AuthorId: String,
        Category: Category,
        Ingredients: [Ingredient]
        User: User
    }

    type Category {
        id: ID,
        name: String
    }

    type User {
        _id: ID,
        email: String
    }

    type Ingredient {
        id: ID,
        name: String
    }

    type Query {
        beverages: [Beverage]
        beverage(id: ID): Beverage 
    }

    input newBev {
        name: String!,
        imgUrl: String!,
        description: String!,
        price: Int!,
        CategoryId: Int!,
        AuthorId: String!,
        inputIngredients: [String]
    }

    input inputEditBev {
        id: ID!
        name: String!,
        imgUrl: String!,
        description: String!,
        price: Int!,
        CategoryId: Int!,
        AuthorId: String!
    }

    type Mutation {
        addBev(beverage: newBev) : Beverage
        deleteBev(id: ID): Beverage
        editBev(beverage: inputEditBev) : Beverage
    }
`;

const resolvers = {
    Query: {
        beverages: async () => {
            try {
                const dataCache = await redis.get('app:beverages')
                let response; 
        
                if(dataCache){
                    response = JSON.parse(dataCache)
                } else {
                    const {data} = await axios({
                        url: BASEURL_APP + '/beverages',
                        method: 'GET'
                    })
                    await redis.set('app:beverages', JSON.stringify(data))
                    response = data
                }

                return response
            } catch (err) {
                throw err
            }
        },

        beverage: async (_, args) => {
            try {

                const {data} = await axios({
                    url: BASEURL_APP + '/beverages/' + args.id,
                    method: 'GET'
                })

                const {data: user} = await axios({
                    url: BASEURL_USER + '/users/' + data.AuthorId,
                    method: 'GET'
                })

                data.User = user
                return data
            } catch (err) {
                throw err
            }
        }
    },
    Mutation: {
        addBev: async(_, args) => {
            try {
                const {data: beverage} = await axios({
                    method: 'POST',
                    url: BASEURL_APP + '/beverages',
                    data: args.beverage
                })
                await redis.del('app:beverages')
                return beverage
            } catch (err) {
                console.log(err);
                throw err
            }
        },

        deleteBev: async (_, args) => {
            try {
                await axios({
                    url: BASEURL_APP + '/beverages/' + args.id,
                    method: 'DELETE'
                })
                await redis.del('app:beverages')
                return {message: 'Success deleted from menu'}
            } catch (err) {
                console.log(err);
                throw err
            }
        },

        editBev: async(_, args) => {
            try {
                const {data: beverage} = await axios({
                    method: 'PUT',
                    url: BASEURL_APP + '/beverages/'+ args.id,
                    data: args.beverage
                })
                await redis.del('app:beverages')
                return beverage
            } catch (err) {
                console.log(err);
                throw err
            }
        }
    }
}

module.exports = {typeDefs, resolvers}