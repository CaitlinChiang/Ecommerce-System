import { gql } from '@apollo/client'

export default gql`
  mutation (
    $_id: ID!
    $expirationDate: String
    $image: Upload
    $imageUrl: String
    $name: String!
    $price: Float!
    $showPublic: Boolean!
    $stockQuantity: Int!
  ) {
    update_product_variant(
      _id: $_id
      expirationDate: $expirationDate
      image: $image
      imageUrl: $imageUrl
      name: $name
      price: $price
      showPublic: $showPublic
      stockQuantity: $stockQuantity
    ) {
      _id
    }
  }
`
