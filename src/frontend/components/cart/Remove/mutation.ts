import { gql } from '@apollo/client'

export default gql`
  mutation ($productId: ID, $productVariantId: ID) {
    remove_from_cart(productId: $productId, productVariantId: $productVariantId) {
      _id
    }
  }
`
