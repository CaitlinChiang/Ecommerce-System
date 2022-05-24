import { gql } from '@apollo/client'

export default gql`
  mutation(
    $_productId: ID!
    $image: Upload
    $name: String!
    $price: Float!
  ) {
    create_product_variant(
      _productId: $_productId
      image: $image
      name: $name
      price: $price
    ) {
      _id
    }
  }
`