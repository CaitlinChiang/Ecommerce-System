import { gql } from '@apollo/client'

export default gql`
  query ($_id: ID!) {
    get_product_category(_id: $_id) {
      _id
    }

    get_product_categories {
      _id
    }

    get_product_categories_count
  }
`
