import { Database } from '../../../types/setup/database'
import dataloaders, { ProductDataloaders } from './dataloaders'
import * as typeDefs from './typeDefs.graphql'
import resolvers from './resolvers'
import mutations from './mutations'
import queries from './queries'

export default {
  dataloaders: (db: Database): ProductDataloaders => dataloaders(db),
  typeDefs,
  resolvers: {
    ...resolvers,
    Query: queries,
    Mutation: mutations
  }
}
