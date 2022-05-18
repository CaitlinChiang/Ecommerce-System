import { gql } from 'apollo-server-express'
import products from './products'

const emptyDefs = gql`
  type Query
  type Mutation
`

export const resolvers = [

]

export const typeDefs = [
  emptyDefs,
  products.typeDefs
]
