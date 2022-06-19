import { gql } from 'apollo-server-express'
import { Database } from '../../types/setup/database'
import { Dataloaders } from '../../types/setup/dataloaders'
import _common from './_common'
import analytics from './analytics'
import auditLogs from './auditLogs'
import cart from './cart'
import cities from './cities'
import faqs from './faqs'
import orders from './orders'
import paymentMethods from './paymentMethods'
import payments from './payments'
import productCategories from './productCategories'
import productVariants from './productVariants'
import products from './products'
import reviews from './reviews'
import users from './users'

const emptyDefs = gql`
  type Query
  type Mutation
`

export const buildDataloaders = (db: Database): Dataloaders => ({
  payments: payments.dataloaders(db),
  productCategories: productCategories.dataloaders(db),
  productVariants: productVariants.dataloaders(db),
  products: products.dataloaders(db),
  users: users.dataloaders(db)
})

export const typeDefs = [
  emptyDefs,
  _common.typeDefs,
  analytics.typeDefs,
  auditLogs.typeDefs,
  cart.typeDefs,
  cities.typeDefs,
  faqs.typeDefs,
  orders.typeDefs,
  paymentMethods.typeDefs,
  payments.typeDefs,
  productCategories.typeDefs,
  productVariants.typeDefs,
  products.typeDefs,
  reviews.typeDefs,
  users.typeDefs
]

export const resolvers = [
  _common.resolvers,
  analytics.resolvers,
  auditLogs.resolvers,
  cart.resolvers,
  cities.resolvers,
  faqs.resolvers,
  orders.resolvers,
  paymentMethods.resolvers,
  payments.resolvers,
  productCategories.resolvers,
  productVariants.resolvers,
  products.resolvers,
  reviews.resolvers,
  users.resolvers
]
