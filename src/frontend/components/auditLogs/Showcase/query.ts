import { gql } from '@apollo/client'

export default gql`
  query (
    $action: String
    $orderId: ID
    $paymentId: ID
    $startDate: String!
    $endDate: String!
  ) {
    get_audit_logs(
      action: $action
      orderId: $orderId
      paymentId: $paymentId
      startDate: $startDate
      endDate: $endDate
    ) {
      _id
    }

    get_audit_logs_count(
      action: $action
      orderId: $orderId
      paymentId: $paymentId
      startDate: $startDate
      endDate: $endDate
    )
  }
`
