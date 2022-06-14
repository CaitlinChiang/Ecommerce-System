import { gql } from '@apollo/client'

export default gql`
  query ($action: String, $orderId: ID, $paymentId: ID, $dateRange: DateRangeInput) {
    get_audit_logs(
      action: $action
      orderId: $orderId
      paymentId: $paymentId
      dateRange: $dateRange
    ) {
      _id
    }

    get_audit_logs_count(
      action: $action
      orderId: $orderId
      paymentId: $paymentId
      dateRange: $dateRange
    )
  }
`
