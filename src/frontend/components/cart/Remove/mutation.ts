import { gql } from '@apollo/client'

export default gql`
  mutation ($productId: ID, $productVariantId: ID) {
    remove_cart_item(productId: $productId, productVariantId: $productVariantId) {
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
