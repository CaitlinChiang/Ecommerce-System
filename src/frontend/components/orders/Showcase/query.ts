import { gql } from '@apollo/client'

export default gql`
  query ($_id: ID!, $startDate: String, $endDate: String) {
    get_order(_id: $_id) {
      _id
    }

    get_orders(startDate: $startDate, endDate: $endDate) {
      _id
    }

    get_orders_count(startDate: $startDate, endDate: $endDate)
  }
`
