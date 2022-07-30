import { gql } from '@apollo/client'

export default gql`
  mutation ($productId: ID, $productVariantId: ID, $quantity: Int!) {
    edit_item_quantity(
      productId: $productId
      productVariantId: $productVariantId
      quantity: $quantity
    ) {
      _id
      items {
        product {
          _id
          imageUrl
          name
        }
        productVariant {
          _id
          imageUrl
          name
        }
        quantity
        totalPrice
      }
      quantity
      totalPrice
    }
  }
`
