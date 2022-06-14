import { gql } from '@apollo/client'

export default gql`
  query ($_id: ID, $dateRange: DateRangeInput, $paginateData: PaginateDataInput) {
    get_order(_id: $_id) {
      _id
    }

    get_orders(dateRange: $dateRange, paginateData: $paginateData) {
      _id
    }

    get_orders_count(dateRange: $dateRange, paginateData: $paginateData)
  }
`
