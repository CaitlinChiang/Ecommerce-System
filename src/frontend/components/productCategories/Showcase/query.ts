import { gql } from '@apollo/client'

export default gql`
  query ($_id: ID, $paginateData: PaginateDataInput) {
    get_product_category(_id: $_id) {
      _id
    }

    get_product_categories(paginateData: $paginateData) {
      _id
      name
    }

    get_product_categories_count(paginateData: $paginateData)
  }
`
