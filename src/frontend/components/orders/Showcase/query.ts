import { gql } from '@apollo/client'

export const querySingular = gql`
  query ($_id: ID!) {
    get_order(_id: $_id) {
      _id
    }
  }
`

export const queryMultiple = gql`
  query ($dateRange: DateRangeInput, $paginateData: PaginateDataInput) {
    get_orders(dateRange: $dateRange, paginateData: $paginateData) {
      _id
    }

    get_orders_count(dateRange: $dateRange, paginateData: $paginateData)
  }
`
