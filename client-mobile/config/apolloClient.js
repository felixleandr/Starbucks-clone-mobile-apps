import { ApolloClient, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
    uri: "http://13.212.80.4",
    cache: new InMemoryCache()
})

export default apolloClient