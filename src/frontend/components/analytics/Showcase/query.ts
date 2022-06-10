import { gql } from '@apollo/client'

export default gql`
  query ($startDate: String, $endDate: String) {
    get_analytics_orders_count(startDate: $startDate, endDate: $endDate) {
      date
      orders
    }

    get_analytics_revenue_count(startDate: $startDate, endDate: $endDate) {
      date
      revenue
    }
  }
`
