import { ApolloClient, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
    uri: "http://13.229.56.112",
    cache: new InMemoryCache()
})

export default apolloClient