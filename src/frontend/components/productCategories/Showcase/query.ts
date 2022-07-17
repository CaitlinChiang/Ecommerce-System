import { gql } from '@apollo/client'

export const GetProductCategory = gql`
  query ($_id: ID!) {
    get_product_category(_id: $_id) {
      _id
      name
      showPublic
      createdAt
      updatedAt
    }
  }
`

export const GetProductCategories = gql`
  query ($paginateData: PaginateDataInput, $showPublic: Boolean) {
    get_product_categories(paginateData: $paginateData, showPublic: $showPublic) {
      _id
      name
      showPublic
      createdAt
    }

    get_product_categories_count(
      paginateData: $paginateData
      showPublic: $showPublic
    )
  }
`
