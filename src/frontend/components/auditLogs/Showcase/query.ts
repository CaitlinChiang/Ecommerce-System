import { gql } from '@apollo/client'

export default gql`
  query ($action: String, $orderId: ID, $paymentId: ID) {
    get_audit_logs(action: $action, orderId: $orderId, paymentId: $paymentId) {
      _id
    }

    get_audit_logs_count(action: $action, orderId: $orderId, paymentId: $paymentId)
  }
`
