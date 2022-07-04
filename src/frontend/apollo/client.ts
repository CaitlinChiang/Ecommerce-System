import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import Cookies from 'js-cookie'

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: createUploadLink({
    uri: '/graphql'
  }),
  cache: new InMemoryCache(),
  headers: {
    accessToken: Cookies.get('accessToken')
  }
})

export default client
