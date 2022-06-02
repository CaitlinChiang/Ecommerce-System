import { gql } from '@apollo/client'

export default gql`
  mutation(
    $product: CartProduct
    $productVariant: CartProductVariant
  ) {
    edit_item_quantity(
      product: $product
      productVariant: $productVariant
    ) {
      _id
    }
  }
`
