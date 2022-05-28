import { gql } from '@apollo/client'

export default gql`
  mutation(
    $category: String!
    $image: Upload
    $name: String!
    $price: Float!
  ) {
    create_product(
      category: $category
      image: $image
      name: $name
      price: $price
    ) {
      _id
    }
  }
`
