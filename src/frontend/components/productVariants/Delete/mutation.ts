import { gql } from '@apollo/client'

export default gql`
  mutation(
    $_id: ID!
  ) {
    delete_product_variant(
      _id: $_id
    ) {
      _id
    }
  }
`
