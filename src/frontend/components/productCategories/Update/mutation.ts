import { gql } from '@apollo/client'

export default gql`
  mutation(
    $_id: ID!
    $name: String!
  ) {
    update_product_category(
      _id: $_id
      name: $name
    ) {
      _id
    }
  }
`
