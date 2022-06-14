import { gql } from '@apollo/client'

export default gql`
  mutation (
    $categoryId: ID!
    $description: String
    $featured: Boolean!
    $image: Upload
    $name: String!
    $price: Float!
    $showPublic: Boolean!
  ) {
    create_product(
      categoryId: $categoryId
      description: $description
      featured: $featured
      image: $image
      name: $name
      price: $price
      showPublic: $showPublic
    ) {
      _id
    }
  }
`
