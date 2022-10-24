import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetAuditLogs } from './query'
import { TableCell, TableRow } from '@mui/material'
import { AuditLog, GetAuditLogArgs } from '../../../../types/auditLog'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { SortDirection } from '../../../_enums/sortDirection'
import { DateRangeType } from '../../../_enums/dateRangeType'
import TableComponent from '../../_common/TableComponent'
import AuditLogsTableFilters from './tableFilters'

const AuditLogsTable = (): ReactElement => {
  const [args, setArgs] = useState<GetAuditLogArgs>({
    dateRange: {
      startDate: new Date(Date.now() - 6096e5),
      endDate: new Date(),
      filterBy: DateRangeType.CREATED
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

  const { data, loading } = useQuery(GetAuditLogs, {
    variables: { ...args, paginateData: paginateDataArgs }
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
    <TableComponent
      count={auditLogsCount}
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
