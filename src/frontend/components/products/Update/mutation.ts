import { gql } from '@apollo/client'

export default gql`
  mutation(
    $_id: ID!
    $category: String!
    $image: Upload
    $imageUrl: String
    $name: String!
    $price: Float!
  ) {
    update_product(
      _id: $_id
      category: $category
      image: $image
      imageUrl: $imageUrl
      name: $name
      price: $price
    ) {
      _id
    }
  }
`
