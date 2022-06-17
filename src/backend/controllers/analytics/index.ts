import * as typeDefs from './typeDefs.graphql'
import queries from './queries'

export default {
  typeDefs,
  resolvers: {
    Query: queries
  }
}
