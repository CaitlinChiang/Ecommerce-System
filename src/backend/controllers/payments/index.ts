import mutations from './mutations'
import * as typeDefs from './typeDefs.graphql'

export default {
  typeDefs,
  resolvers: {
    Mutation: mutations
  }
}
