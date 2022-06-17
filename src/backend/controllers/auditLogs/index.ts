import * as typeDefs from './typeDefs.graphql'
import resolvers from './resolvers'
import queries from './queries'

export default {
  typeDefs,
  resolvers: {
    ...resolvers,
    Query: queries
  }
}
