import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import query from './query'
import { TableCell, TableRow } from '@mui/material'
import { AuditLog } from '../../../../types/auditLog'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import AuditLogsTableFilters from './tableFilters'
import { fetchMoreArgs } from '../../../_utils/returnFetchMoreArgs'

const AuditLogsTable = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    dateRange: {
      startDate: null,
      endDate: null,
      filterBy: null
    }
  })
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.DESC
  })
  const [filterOpen, setFilterOpen] = useState<boolean>(false)

  const { data, loading, fetchMore } = useQuery(query, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })

  const auditLogs = data?.get_audit_logs || []
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
      filterContent={<AuditLogsTableFilters args={args} setArgs={setArgs} />}
      filterOpen={filterOpen}
      headers={auditLogHeaders}
      loading={loading}
      paginateDataArgs={paginateDataArgs}
      rows={auditLogRows}
      setFilterOpen={setFilterOpen}
      setPaginateDataArgs={setPaginateDataArgs}
    />
  )
}

export default AuditLogsTable
