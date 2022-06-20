import { gql } from '@apollo/client'

export default gql`
  query (
    $_id: ID
    $categoryIds: [String]
    $dateRange: DateRangeInput
    $featured: Boolean
    $paginateData: PaginateDataInput
    $showPublic: Boolean
    $stockQuantity: StockQuantityInput
  ) {
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
