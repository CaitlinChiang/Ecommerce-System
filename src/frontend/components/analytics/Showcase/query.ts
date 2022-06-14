import { gql } from '@apollo/client'

export default gql`
  query ($dateRange: DateRangeInput!) {
    get_analytics_orders_count(dateRange: $dateRange) {
      date
      orders
    }

    get_analytics_revenue_count(dateRange: $dateRange) {
      date
      revenue
    }
  }
`
