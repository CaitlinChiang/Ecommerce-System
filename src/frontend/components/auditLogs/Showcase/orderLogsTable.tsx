import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetAuditLogs } from './query'
import { TableCell, TableRow } from '@mui/material'
import { ObjectId } from 'mongodb'
import { AuditLog } from '../../../../types/auditLog'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import { fetchMoreArgs } from '../../../_utils/handleArgs/returnFetchMoreArgs'

const OrderLogsTable = ({ orderId }: { orderId: ObjectId }): ReactElement => {
  const args: any = { orderId }
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.DESC
  })

  const { data, loading, fetchMore } = useQuery(GetAuditLogs, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })

  const auditLogs: AuditLog[] = data?.get_audit_logs || []
  const auditLogsCount: number = data?.get_audit_logs_count || 0

  const auditLogHeaders = [
    { label: 'action', sortable: false },
    { label: 'createdAt', sortable: true },
    { label: 'createdBy', sortable: false }
  ]

  const auditLogRows = [
    auditLogs?.map((auditLog: AuditLog): ReactElement => {
      return (
        <TableRow>
          <TableCell align={'center'}>{auditLog?.action}</TableCell>
          <TableCell align={'center'}>{String(auditLog?.createdAt)}</TableCell>
          <TableCell align={'center'}>{auditLog?.createdByEmail}</TableCell>
        </TableRow>
      )
    })
  ]

  return (
    <TableComponent
      args={args}
      count={auditLogsCount}
      fetchMore={fetchMore}
      headers={auditLogHeaders}
      loading={loading}
      paginateDataArgs={paginateDataArgs}
      rows={auditLogRows}
      setPaginateDataArgs={setPaginateDataArgs}
    />
  )
}

export default OrderLogsTable
