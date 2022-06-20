import { gql } from '@apollo/client'

export const querySingular = gql`
  query ($_id: ID!) {
    get_product_variant(_id: $_id) {
      _id
      description
      expirationDate
      imageUrl
      name
      price
      showPublic
      stockQuantity
      createdAt
      updatedAt
    }
  }
`

export const queryMultiple = gql`
  query (
    $_productId: ID!
    $dateRange: DateRangeInput
    $paginateData: PaginateDataInput
    $showPublic: Boolean
    $stockQuantity: StockQuantityInput
  ) {
    get_product_variants(
      _productId: $_productId
      dateRange: $dateRange
      paginateData: $paginateData
      showPublic: $showPublic
      stockQuantity: $stockQuantity
    ) {
      _id
      name
      expirationDate
      name
      price
      stockQuantity
    }

    get_product_variants_count(
      _productId: $_productId
      dateRange: $dateRange
      paginateData: $paginateData
      showPublic: $showPublic
      stockQuantity: $stockQuantity
    )
  }
`
