import { gql } from '@apollo/client'

export const GetProductVariant = gql`
  query ($_id: ID!) {
    get_product_variant(_id: $_id) {
      _id
      description
      discount
      expirationDate
      imageUrl
      name
      price
      showPublic
      stockQuantity
      createdAt
      createdByEmail
      updatedAt
      updatedByEmail
    }
  }
`

export const GetProductVariants = gql`
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
      discount
      expirationDate
      imageUrl
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
