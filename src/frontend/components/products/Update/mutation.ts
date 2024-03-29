import { gql } from '@apollo/client'

export default gql`
  mutation (
    $_id: ID!
    $categoryId: ID!
    $description: String!
    $discount: Float
    $expirationDate: String
    $featured: Boolean!
    $image: Upload
    $imageUrl: String!
    $name: String!
    $price: Float!
    $showPublic: Boolean!
    $stockQuantity: Int!
  ) {
    update_product(
      _id: $_id
      categoryId: $categoryId
      description: $description
      discount: $discount
      expirationDate: $expirationDate
      featured: $featured
      image: $image
      imageUrl: $imageUrl
      name: $name
      price: $price
      showPublic: $showPublic
      stockQuantity: $stockQuantity
    ) {
      _id
      category
      categoryId
      description
      discount
      expirationDate
      featured
      imageUrl
      name
      price
      showPublic
      stockQuantity
      createdAt
      createdByEmail
      updatedAt
      updatedByEmail
    }
  }
`
