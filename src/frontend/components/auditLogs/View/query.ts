import { gql } from '@apollo/client'

export const GetAuditLogs = gql`
  query (
    $dateRange: DateRangeInput
    $orderId: ID
    $paginateData: PaginateDataInput
  ) {
    get_audit_logs(
      dateRange: $dateRange
      orderId: $orderId
      paginateData: $paginateData
    ) {
      _id
      action
      createdAt
      createdByEmail
    }

    get_audit_logs_count(
      dateRange: $dateRange
      orderId: $orderId
      paginateData: $paginateData
    )
  }
`
