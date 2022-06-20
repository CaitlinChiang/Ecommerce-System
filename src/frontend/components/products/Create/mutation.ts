import { gql } from '@apollo/client'

export default gql`
  mutation (
    $categoryId: ID!
    $description: String
    $expirationDate: String
    $featured: Boolean!
    $image: Upload
    $name: String!
    $price: Float!
    $showPublic: Boolean!
    $stockQuantity: Int!
  ) {
    create_product(
      categoryId: $categoryId
      description: $description
      expirationDate: $expirationDate
      featured: $featured
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
