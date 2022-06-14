import { gql } from '@apollo/client'

export default gql`
  mutation (
    $_productId: ID!
    $expirationDate: String
    $image: Upload
    $name: String!
    $price: Float!
    $showPublic: Boolean!
  ) {
    create_product_variant(
      _productId: $_productId
      expirationDate: $expirationDate
      image: $image
      name: $name
      price: $price
      showPublic: $showPublic
    ) {
      _id
    }
  }
`
