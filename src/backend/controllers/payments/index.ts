import * as typeDefs from './typeDefs.graphql'
import resolvers from './resolvers'
import mutations from './mutations'

export default {
  typeDefs,
  resolvers: {
    ...resolvers,
    Mutation: mutations
  }
}
