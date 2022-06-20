import { gql } from '@apollo/client'

export default gql`
  query (
    $_id: ID
    $categoryIds: [String]
    $featured: Boolean
    $paginateData: PaginateDataInput
    $showPublic: Boolean
    $stockQuantity: StockQuantityInput
  ) {
    get_product(_id: $_id) {
      _id
      category
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
      featured: $featured
      paginateData: $paginateData
      showPublic: $showPublic
      stockQuantity: $stockQuantity
    )
  }
`
