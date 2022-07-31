import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetAuditLogs } from './query'
import { TableCell, TableRow } from '@mui/material'
import { AuditLog } from '../../../../types/auditLog'
import { SortDirection } from '../../../_enums/sortDirection'
import SimpleTableComponent from '../../_common/SimpleTableComponent'
import { fetchMoreArgs } from '../../../_utils/handleArgs/returnFetchMoreArgs'

const OrderLogsTable = ({ orderId }: { orderId: string }): ReactElement => {
  const args: any = { orderId }

  const { data, loading } = useQuery(GetAuditLogs, {
    variables: {
      ...args,
      paginateData: { sortBy: 'createdAt', sortDirection: SortDirection.DESC }
    },
    ...fetchMoreArgs
  })

  const auditLogs: AuditLog[] = data?.get_audit_logs || []

  const auditLogHeaders = ['Action', 'Created At', 'Created By']

  const auditLogRows = [
    auditLogs?.map((auditLog: AuditLog): ReactElement => {
      const { action, createdAt, createdByEmail } = auditLog

      return (
        <TableRow>
          <TableCell>{action}</TableCell>
          <TableCell>{String(createdAt)}</TableCell>
          <TableCell>{createdByEmail}</TableCell>
        </TableRow>
      )
    })
  ]

  return (
    <SimpleTableComponent
      headers={auditLogHeaders}
      loading={loading}
      rows={auditLogRows}
    />
  )
}

export default OrderLogsTable
