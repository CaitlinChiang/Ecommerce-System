import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { queryMultiple } from '../query'
import deleteMutation from '../../Delete/mutation'
import { TableCell, TableRow } from '@mui/material'
import { User } from '../../../../../types/user'
import { PaginateDataArgs } from '../../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../../types/actions/refetchData'
import { SortDirection } from '../../../../_enums/sortDirection'
import { UserType } from '../../../../_enums/userType'
import TableComponent from '../../../_common/TableComponent'
import DeleteButton from '../../../_common/DeleteButton'
import { fetchMoreArgs } from '../../../../_utils/returnFetchMoreArgs'

const CustomersTable = (): ReactElement => {
  const args = { type: UserType.CUSTOMER }
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'lastName',
    sortDirection: SortDirection.ASC
  })
  const [refetchArgs, setRefetchArgs] = useState<RefetchDataArgs>({
    args: null,
    loading: false,
    paginateDataArgs: null,
    refetch: null
  })

  const { data, loading, fetchMore, refetch } = useQuery(queryMultiple, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })

  useEffect(() => {
    setRefetchArgs({
      args,
      loading,
      paginateDataArgs,
      refetch
    })
  }, [args, paginateDataArgs])

  const users = data?.get_users || []
  const usersCount: number = data?.get_users_count || 0

  const userHeaders = [
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
          <TableCell align={'center'}>{user?.firstName}</TableCell>
          <TableCell align={'center'}>{user?.lastName}</TableCell>
          <TableCell align={'center'}>{user?.email}</TableCell>
          <TableCell align={'center'}>{user?.phoneNumber}</TableCell>
          <TableCell align={'center'}>{String(user?.createdAt)}</TableCell>
          <TableCell align={'center'}>
            <DeleteButton
              _id={user._id}
              label={'User'}
              mutation={deleteMutation}
              refetchArgs={refetchArgs}
            />
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
      headers={userHeaders}
      loading={loading}
      paginateDataArgs={paginateDataArgs}
      rows={userRows}
      rowsPerPageOptions={[10, 25, 50, 75, 100]}
      searchLabel={'Search Account by Email'}
      searchPlaceholder={'ex. ava_cruz@gmail.com'}
      setPaginateDataArgs={setPaginateDataArgs}
    />
  )
}

export default CustomersTable
