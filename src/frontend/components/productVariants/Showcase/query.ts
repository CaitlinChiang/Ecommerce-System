import { gql } from '@apollo/client'

export default gql`
  query ($_id: ID, $_productId: ID, $showPublic: Boolean) {
    get_product_variant(_id: $_id) {
      _id
    }

    get_product_variants(_productId: $_productId, showPublic: $showPublic) {
      _id
    }

    get_product_variants_count(_productId: $_productId, showPublic: $showPublic)
  }
`
