import { gql } from '@apollo/client'

export const queryOrdersCount = gql`
  query ($dateRange: DateRangeInput!) {
    get_analytics_orders_count(dateRange: $dateRange) {
      date
      orders
    }
  }
`

export const queryRevenueCount = gql`
  query ($dateRange: DateRangeInput!) {
    get_analytics_revenue_count(dateRange: $dateRange) {
      date
      revenue
    }
  }
`
