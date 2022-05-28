import { gql } from '@apollo/client'

export default gql`
  mutation(
    $name: String!
  ) {
    create_product_category(
      name: $name
    ) {
      _id
    }
  }
`
