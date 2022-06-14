import { gql } from '@apollo/client'

export default gql`
  mutation (
    $_id: ID!
    $categoryId: ID!
    $description: String
    $featured: Boolean!
    $image: Upload
    $imageUrl: String
    $name: String!
    $price: Float!
    $showPublic: Boolean!
  ) {
    update_product(
      _id: $_id
      categoryId: $categoryId
      description: $description
      featured: $featured
      image: $image
      imageUrl: $imageUrl
      name: $name
      price: $price
      showPublic: $showPublic
    ) {
      _id
    }
  }
`
