import { gql } from '@apollo/client'

export default gql`
  mutation (
    $productId: ID
    $productVariantId: ID
    $quantity: Int!
    $totalPrice: Float!
  ) {
    add_to_cart(
      productId: $productId
      productVariantId: $productVariantId
      quantity: $quantity
      totalPrice: $totalPrice
    ) {
      _id
    }
  }
`
