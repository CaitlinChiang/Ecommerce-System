import { gql } from '@apollo/client'

export default gql`
  query ($_id: ID!) {
    get_order(_id: $_id) {
      _id
    }

    get_orders {
      _id
    }

    get_orders_count
  }
`
