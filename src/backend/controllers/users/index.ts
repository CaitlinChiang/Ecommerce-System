import mutations from './mutations'
import queries from './queries'
import * as typeDefs from './typeDefs.graphql'

export default {
  typeDefs,
  resolvers: {
    Query: queries,
    Mutation: mutations
  }
}
