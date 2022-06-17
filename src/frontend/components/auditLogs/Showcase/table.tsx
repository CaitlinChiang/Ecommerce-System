import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import query from './query'
import { TableCell, TableRow } from '@mui/material'
import { AuditLog } from '../../../../types/auditLog'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { ObjectId } from 'mongodb'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import { tableArgs } from '../../../_utils/returnTableArgs'

const AuditLogsTable = ({
  orderId,
  paymentId
}: {
  orderId?: ObjectId
  paymentId?: ObjectId
}): ReactElement => {
  const [page, setPage] = useState<number>(0)
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    offset: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.DESC
  })
  const specificArgs = { orderId, paymentId }

  const { data, loading, fetchMore } = useQuery(query, {
    variables: { paginateData: paginateDataArgs, ...specificArgs },
    ...tableArgs
  })

  const auditLogs = data?.get_audit_logs || []
  const auditLogsCount: number = data?.get_audit_logs_count || 0

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
      count={auditLogsCount}
      fetchMore={fetchMore}
      headers={['action', 'createdAt', 'createdBy']}
      loading={loading}
      page={page}
      paginateDataArgs={paginateDataArgs}
      rows={auditLogRows}
      rowsPerPageOptions={[10, 25, 50, 75, 100]}
      setPage={setPage}
      setPaginateDataArgs={setPaginateDataArgs}
      specificArgs={specificArgs}
    />
  )
}

export default AuditLogsTable
