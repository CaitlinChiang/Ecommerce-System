import { Database } from '../../../types/setup/database'
import dataloaders, { ProductVariantDataloaders } from './dataloaders'
import * as typeDefs from './typeDefs.graphql'
import resolvers from './resolvers'
import mutations from './mutations'
import queries from './queries'

export default {
  dataloaders: (db: Database): ProductVariantDataloaders => dataloaders(db),
  typeDefs,
  resolvers: {
    ...resolvers,
    Query: queries,
    Mutation: mutations
  }
}
