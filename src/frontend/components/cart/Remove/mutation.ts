import { gql } from '@apollo/client'

export default gql`
  mutation ($productId: ID, $productVariantId: ID) {
    remove_cart_item(productId: $productId, productVariantId: $productVariantId) {
      _id
    }
  }
`
