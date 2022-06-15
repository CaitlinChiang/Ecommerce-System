import { gql } from '@apollo/client'

export default gql`
  query (
    $_id: ID
    $categoryId: ID
    $featured: Boolean
    $paginateData: PaginateDataInput
    $showPublic: Boolean
    $stockQuantity: StockQuantityInput
  ) {
    get_product(_id: $_id) {
      _id
    }

    get_products(
      categoryId: $categoryId
      featured: $featured
      paginateData: $paginateData
      showPublic: $showPublic
      stockQuantity: $stockQuantity
    ) {
      _id
    }

    get_products_count(
      categoryId: $categoryId
      featured: $featured
      paginateData: $paginateData
      showPublic: $showPublic
      stockQuantity: $stockQuantity
    )
  }
`
