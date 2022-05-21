import { gql } from '@apollo/client'

export default gql`
  mutation(
    $image: Upload
    $name: String!
    $price: Float!
    $type: String!
  ) {
    create_product(
      image: $image
      name: $name
      price: $price
      type: $type
    ) {
      _id
    }
  }
`
