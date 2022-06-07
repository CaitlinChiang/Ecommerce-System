import { gql } from '@apollo/client'

export default gql`
  mutation (
    $_id: ID!
    $_productId: ID!
    $image: Upload
    $imageUrl: String
    $name: String!
    $price: Float!
    $showPublic: Boolean!
  ) {
    update_product_variant(
      _id: $_id
      _productId: $_productId
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
