import { gql } from '@apollo/client'

export const querySingular = gql`
  query ($_id: ID!) {
    get_product(_id: $_id) {
      _id
      category
      categoryId
      description
      expirationDate
      featured
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
    $categoryIds: [String]
    $dateRange: DateRangeInput
    $featured: Boolean
    $paginateData: PaginateDataInput
    $showPublic: Boolean
    $stockQuantity: StockQuantityInput
  ) {
    get_products(
      categoryIds: $categoryIds
      dateRange: $dateRange
      featured: $featured
      paginateData: $paginateData
      showPublic: $showPublic
      stockQuantity: $stockQuantity
    ) {
      _id
      category
      name
      expirationDate
      name
      price
      stockQuantity
    }

    get_products_count(
      categoryIds: $categoryIds
      dateRange: $dateRange
      featured: $featured
      paginateData: $paginateData
      showPublic: $showPublic
      stockQuantity: $stockQuantity
    )
  }
`
