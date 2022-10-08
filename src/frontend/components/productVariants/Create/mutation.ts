import { gql } from '@apollo/client'

export default gql`
  mutation (
    $_productId: ID!
    $description: String!
    $discount: Float
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
      discount: $discount
      expirationDate: $expirationDate
      image: $image
      name: $name
      price: $price
      showPublic: $showPublic
      stockQuantity: $stockQuantity
    )
  }
`
