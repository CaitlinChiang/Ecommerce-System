import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import query from './query'
import deleteMutation from '../Delete/mutation'
import { TableCell, TableRow } from '@mui/material'
import { User } from '../../../../types/user'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { SortDirection } from '../../../_enums/sortDirection'
import { UserType } from '../../../_enums/userType'
import TableComponent from '../../_common/TableComponent'
import UpdateUserCheckbox from '../Update/updateCheckbox'
import DeleteButton from '../../_common/DeleteButton'
import AdminsTableFilters from './adminsTableFilters'
import { fetchMoreArgs } from '../../../_utils/returnFetchMoreArgs'

const AdminsTable = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    active: null,
    type: UserType.ADMIN
  })
  const [page, setPage] = useState<number>(0)
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    offset: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'lastName',
    sortDirection: SortDirection.ASC
  })
  const [filterOpen, setFilterOpen] = useState<boolean>(false)

  const { data, loading, fetchMore } = useQuery(query, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })

  const users = data?.get_users || []
  const usersCount: number = data?.get_users_count || 0

  const userHeaders = [
    { label: 'active', sortable: true },
    { label: 'firstName', sortable: true },
    { label: 'lastName', sortable: true },
    { label: 'email', sortable: true },
    { label: 'phoneNumber', sortable: false },
    { label: 'createdAt', sortable: true },
    { label: 'actions', sortable: false }
  ]

  const userRows = [
    users?.map((user: User): ReactElement => {
      return (
        <TableRow>
          <TableCell align={'center'}>
            <UpdateUserCheckbox _id={user._id} active={user.active} />
          </TableCell>
          <TableCell align={'center'}>{user?.firstName}</TableCell>
          <TableCell align={'center'}>{user?.lastName}</TableCell>
          <TableCell align={'center'}>{user?.email}</TableCell>
          <TableCell align={'center'}>{user?.phoneNumber}</TableCell>
          <TableCell align={'center'}>{String(user?.createdAt)}</TableCell>
          <TableCell align={'center'}>
            <DeleteButton _id={user._id} label={'User'} mutation={deleteMutation} />
          </TableCell>
        </TableRow>
      )
    })
  ]

  return (
    <TableComponent
      args={args}
      count={usersCount}
      fetchMore={fetchMore}
      filterContent={<AdminsTableFilters args={args} setArgs={setArgs} />}
      filterOpen={filterOpen}
      headers={userHeaders}
      loading={loading}
      page={page}
      paginateDataArgs={paginateDataArgs}
      rows={userRows}
      rowsPerPageOptions={[10, 25, 50, 75, 100]}
      searchLabel={'Search Account by Email'}
      searchPlaceholder={'ex. ava_cruz@gmail.com'}
      setFilterOpen={setFilterOpen}
      setPage={setPage}
      setPaginateDataArgs={setPaginateDataArgs}
    />
  )
}

export default AdminsTable
