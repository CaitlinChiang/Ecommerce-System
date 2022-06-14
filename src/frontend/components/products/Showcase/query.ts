import { gql } from '@apollo/client'

export default gql`
  query (
    $_id: ID
    $category: String
    $featured: Boolean
    $paginateData: PaginateDataInput
    $showPublic: Boolean
  ) {
    get_product(_id: $_id) {
      _id
    }

    get_products(
      category: $category
      featured: $featured
      paginateData: $paginateData
      showPublic: $showPublic
    ) {
      _id
    }

    get_products_count(
      category: $category
      featured: $featured
      paginateData: $paginateData
      showPublic: $showPublic
    )
  }
`
