import { gql } from 'apollo-server-express'
import auditLogs from './auditLogs'
import cart from './cart'
import orders from './orders'
import products from './products'
import productVariants from './productVariants'
import reviews from './reviews'
import users from './users'

const emptyDefs = gql`
  type Query
  type Mutation
`

export const resolvers = [
  cart.resolvers,
  orders.resolvers
]

export const typeDefs = [
  emptyDefs,
  auditLogs.typeDefs,
  cart.typeDefs,
  orders.typeDefs,
  products.typeDefs,
  productVariants.typeDefs,
  reviews.typeDefs,
  users.typeDefs
]
