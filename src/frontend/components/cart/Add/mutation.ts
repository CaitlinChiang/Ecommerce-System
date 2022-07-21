import { gql } from '@apollo/client'

export default gql`
  mutation (
    $productId: ID
    $productVariantId: ID
    $quantity: Int!
    $totalPrice: Float!
  ) {
    add_cart_item(
      productId: $productId
      productVariantId: $productVariantId
      quantity: $quantity
      totalPrice: $totalPrice
    ) {
      _id
    }
  }
`
