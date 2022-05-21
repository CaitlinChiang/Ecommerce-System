import { gql } from '@apollo/client'

export default gql`
  query(
    $_id: ID!
  ) {
    get_product(
      _id: $_id
    ) {
      _id
    }

    get_products {
      _id
    }

    get_products_count
  }
`
