import { gql } from '@apollo/client'

export default gql`
  query (
    $_id: ID
    $_productId: ID
    $paginateData: PaginateDataInput
    $showPublic: Boolean
  ) {
    get_product_variant(_id: $_id) {
      _id
    }

    get_product_variants(
      _productId: $_productId
      paginateData: $paginateData
      showPublic: $showPublic
    ) {
      _id
    }

    get_product_variants_count(
      _productId: $_productId
      paginateData: $paginateData
      showPublic: $showPublic
    )
  }
`
