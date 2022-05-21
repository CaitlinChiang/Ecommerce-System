import { gql } from '@apollo/client'

export default gql`
  mutation(
    $_id: ID!
    $image: Upload
    $name: String!
    $price: Float!
  ) {
    update_product_variant(
      _id: $_id
      image: $image
      name: $name
      price: $price
    ) {
      _id
    }
  }
`
