import { gql } from 'apollo-server-express'
import products from './products'
import productVariants from './productVariants'
import users from './users'

const emptyDefs = gql`
  type Query
  type Mutation
`

export const resolvers = [

]

export const typeDefs = [
  emptyDefs,
  products.typeDefs,
  productVariants.typeDefs,
  users.typeDefs
]
