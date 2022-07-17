import { gql } from '@apollo/client'

export const GetAuditLogs = gql`
  query (
    $orderId: ID
    $paginateData: PaginateDataInput
    $dateRange: DateRangeInput
  ) {
    get_audit_logs(
      orderId: $orderId
      paginateData: $paginateData
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
      dateRange: $dateRange
    )
  }
`
