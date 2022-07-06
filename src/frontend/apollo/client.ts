import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/link-context'
import Cookies from 'js-cookie'

const authLink = setContext((_, { headers }) => {
  const accessToken = Cookies.get('accessToken')
  return {
    headers: { ...headers, accessToken }
  }
})

const uploadLink = createUploadLink({ uri: '/graphql' })

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink]),
  cache: new InMemoryCache()
})

export default client
