import * as typeDefs from './typeDefs.graphql'
import mutations from './mutations'
import queries from './queries'
import resolvers from './resolvers'

export default {
  typeDefs,
  resolvers: {
    ...resolvers,
    Query: queries,
    Mutation: mutations
  }
}
