import { gql } from '@apollo/client'

export const GetProduct = gql`
  query ($_id: ID!) {
    get_product(_id: $_id) {
      _id
      category
      categoryId
      description
      discount
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

export const GetProducts = gql`
  query (
    $categoryIds: [String]
    $dateRange: DateRangeInput
    $discount: Boolean
    $featured: Boolean
    $paginateData: PaginateDataInput
    $showPublic: Boolean
    $stockQuantity: StockQuantityInput
  ) {
    get_products(
      categoryIds: $categoryIds
      dateRange: $dateRange
      discount: $discount
      featured: $featured
      paginateData: $paginateData
      showPublic: $showPublic
      stockQuantity: $stockQuantity
    ) {
      _id
      category
      discount
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
