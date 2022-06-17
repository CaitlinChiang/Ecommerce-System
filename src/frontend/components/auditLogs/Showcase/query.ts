import { gql } from '@apollo/client'

export default gql`
  query (
    $orderId: ID
    $paginateData: PaginateDataInput
    $paymentId: ID
    $dateRange: DateRangeInput
  ) {
    get_audit_logs(
      orderId: $orderId
      paginateData: $paginateData
      paymentId: $paymentId
      dateRange: $dateRange
    ) {
      _id
      action
      createdAt
      createdByEmail
    }

    get_audit_logs_count(
      orderId: $orderId
      paginateData: $paginateData
      paymentId: $paymentId
      dateRange: $dateRange
    )
  }
`
