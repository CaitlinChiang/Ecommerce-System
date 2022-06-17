import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import query from './query'
import { TableCell, TableRow } from '@mui/material'
import { User } from '../../../../types/user'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { SortDirection } from '../../__enums/sortDirection'
import { UserType } from '../../__enums/userType'
import TableComponent from '../../_common/TableComponent'
import { formatDateTime } from '../../__helpers/formatDateTime'

const ConsumerTable = (): ReactElement => {
  const [page, setPage] = useState<number>(0)
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    offset: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'lastName',
    sortDirection: SortDirection.ASC
  })

  const specificArgs = { type: UserType.CONSUMER }

  const { data, loading, fetchMore } = useQuery(query, {
    ssr: true,
    skip: !process.browser,
    variables: { paginateData: paginateDataArgs, ...specificArgs },
    partialRefetch: true,
    returnPartialData: true,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true
  })

  const users = data?.get_users || []
  const usersCount: number = data?.get_users_count || 0

  const userRows = [
    users?.map((user: User): ReactElement => {
      return (
        <TableRow sx={{ align: 'center' }}>
          <TableCell align={'center'}>{user?.firstName}</TableCell>
          <TableCell align={'center'}>{user?.lastName}</TableCell>
          <TableCell align={'center'}>{user?.email}</TableCell>
          <TableCell align={'center'}>{user?.phoneNumber}</TableCell>
          <TableCell align={'center'}>{formatDateTime(user?.createdAt)}</TableCell>
        </TableRow>
      )
    })
  ]

  return (
    <TableComponent
      count={usersCount}
      fetchMore={fetchMore}
      headers={['firstName', 'lastName', 'email', 'phoneNumber', 'createdAt']}
      loading={loading}
      page={page}
      paginateDataArgs={paginateDataArgs}
      rows={userRows}
      rowsPerPageOptions={[10, 25, 50, 75, 100]}
      searchLabel={'Search Account by Email'}
      searchPlaceholder={'ex. ava_cruz@gmail.com'}
      setPage={setPage}
      setPaginateDataArgs={setPaginateDataArgs}
      specificArgs={specificArgs}
    />
  )
}

export default ConsumerTable
