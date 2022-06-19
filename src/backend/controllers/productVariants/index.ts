import { Context } from '../../../types/setup/context'
import dataloaders, { ProductVariantDataloaders } from './dataloaders'
import * as typeDefs from './typeDefs.graphql'
import resolvers from './resolvers'
import mutations from './mutations'
import queries from './queries'

export default {
  dataloaders: (context: Context): ProductVariantDataloaders => dataloaders(context),
  typeDefs,
  resolvers: {
    ...resolvers,
    Query: queries,
    Mutation: mutations
  }
}
