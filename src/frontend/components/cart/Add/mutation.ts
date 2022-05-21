import { gql } from '@apollo/client'

export default gql`
  mutation(
    $product: CartProduct
    $productVariant: CartProductVariant
  ) {
    add_to_cart(
      product: $product
      productVariant: $productVariant
    ) {
      _id
    }
  }
`
