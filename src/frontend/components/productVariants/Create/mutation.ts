import { gql } from '@apollo/client'

export default gql`
  mutation (
    $_productId: ID!
    $description: String
    $expirationDate: String
    $image: Upload
    $name: String!
    $price: Float!
    $showPublic: Boolean!
    $stockQuantity: Int!
  ) {
    create_product_variant(
      _productId: $_productId
      description: $description
      expirationDate: $expirationDate
      image: $image
      name: $name
      price: $price
      showPublic: $showPublic
      stockQuantity: $stockQuantity
    ) {
      _id
    }
  }
`
