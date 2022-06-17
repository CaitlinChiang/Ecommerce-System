import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import query from './query'
import { TableCell, TableRow } from '@mui/material'
import { User } from '../../../../types/user'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { SortDirection } from '../../../_enums/sortDirection'
import { UserType } from '../../../_enums/userType'
import TableComponent from '../../_common/TableComponent'
import DeleteUserButton from '../Delete/deleteButton'
import { tableArgs } from '../../../_utils/returnTableArgs'

const AdminTable = (): ReactElement => {
  const [page, setPage] = useState<number>(0)
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    offset: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'lastName',
    sortDirection: SortDirection.ASC
  })

  const specificArgs = { type: UserType.ADMIN }

  const { data, loading, fetchMore } = useQuery(query, {
    variables: { paginateData: paginateDataArgs, ...specificArgs },
    ...tableArgs
  })

  const users = data?.get_users || []
  const usersCount: number = data?.get_users_count || 0

  const userRows = [
    users?.map((user: User): ReactElement => {
      return (
        <TableRow>
          <TableCell align={'center'}>{user?.firstName}</TableCell>
          <TableCell align={'center'}>{user?.lastName}</TableCell>
          <TableCell align={'center'}>{user?.email}</TableCell>
          <TableCell align={'center'}>{user?.phoneNumber}</TableCell>
          <TableCell align={'center'}>{String(user?.createdAt)}</TableCell>
          <TableCell align={'center'}>
            <DeleteUserButton _id={user?._id} />
          </TableCell>
        </TableRow>
      )
    })
  ]

  return (
    <TableComponent
      count={usersCount}
      fetchMore={fetchMore}
      headers={[
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'createdAt',
        'actions'
      ]}
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

export default AdminTable
