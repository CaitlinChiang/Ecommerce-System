import { gql } from '@apollo/client'

export default gql`
  mutation(
    $_id: ID!
    $image: Upload
    $name: String!
    $price: Float!
    $type: String!
  ) {
    update_product(
      _id: $_id
      image: $image
      name: $name
      price: $price
      type: $type
    ) {
      _id
    }
  }
`
