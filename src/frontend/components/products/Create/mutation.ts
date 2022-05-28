import { gql } from '@apollo/client'

export default gql`
  mutation(
    $category: String!
    $description: String
    $featured: Boolean!
    $image: Upload
    $name: String!
    $price: Float!
    $showPublic: Boolean!
  ) {
    create_product(
      category: $category
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
