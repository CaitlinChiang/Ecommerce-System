import { gql } from '@apollo/client'

export const querySingular = gql`
  query ($_id: ID!) {
    get_product_category(_id: $_id) {
      _id
    }
  }
`

export const queryMultiple = gql`
  query ($paginateData: PaginateDataInput, showPublic: Boolean) {
    get_product_categories(paginateData: $paginateData, showPublic: $showPublic) {
      _id
      name
      createdAt
      updatedAt
    }

    get_product_categories_count(paginateData: $paginateData, showPublic: $showPublic)
  }
`
