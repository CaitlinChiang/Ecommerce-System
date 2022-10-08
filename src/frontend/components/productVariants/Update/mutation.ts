import { gql } from '@apollo/client'

export default gql`
  mutation (
    $_id: ID!
    $description: String!
    $discount: Float
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
      description: $description!
      discount: $discount
      expirationDate: $expirationDate
      image: $image
      imageUrl: $imageUrl
      name: $name
      price: $price
      showPublic: $showPublic
      stockQuantity: $stockQuantity
    ) {
      _id
      description
      discount
      expirationDate
      imageUrl
      name
      price
      showPublic
      stockQuantity
      createdAt
      updatedAt
    }
  }
`
