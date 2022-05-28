import { gql } from '@apollo/client'

export default gql`
  mutation(
    $_id: ID!
    $category: String!
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
      category: $category
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
