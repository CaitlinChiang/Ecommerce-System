import { gql } from '@apollo/client'

export default gql`
  query ($_id: ID!) {
    get_product_variant(_id: $_id) {
      _id
    }

    get_product_variants {
      _id
    }

    get_product_variants_count
  }
`
