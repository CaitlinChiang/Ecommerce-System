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
      categoryId: $categoryId
      featured: $featured
      paginateData: $paginateData
      showPublic: $showPublic
      stockQuantity: $stockQuantity
    ) {
      _id
      category
      name
      expirationDate
      imageUrl
      name
      price
      stockQuantity
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
