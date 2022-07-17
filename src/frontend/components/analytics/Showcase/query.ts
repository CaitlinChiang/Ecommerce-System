import { gql } from '@apollo/client'

export const GetAnalyticsOrdersCount = gql`
  query ($dateRange: DateRangeInput!) {
    get_analytics_orders_count(dateRange: $dateRange) {
      date
      orders
    }
  }
`

export const GetAnalyticsRevenueCount = gql`
  query ($dateRange: DateRangeInput!) {
    get_analytics_revenue_count(dateRange: $dateRange) {
      date
      revenue
    }
  }
`
