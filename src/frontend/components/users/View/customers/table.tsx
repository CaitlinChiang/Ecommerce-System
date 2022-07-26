import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GetUsers } from '../query'
import deleteMutation from '../../Delete/mutation'
import { TableCell, TableRow } from '@mui/material'
import { User } from '../../../../../types/user'
import { PaginateDataArgs } from '../../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../../types/actions/refetchData'
import { SortDirection } from '../../../../_enums/sortDirection'
import { UserType } from '../../../../_enums/userType'
import TableComponent from '../../../_common/TableComponent'
import DeleteButton from '../../../_common/DeleteButton'
import { fetchMoreArgs } from '../../../../_utils/handleArgs/returnFetchMoreArgs'

const CustomersTable = (): ReactElement => {
  const args: any = { type: UserType.CUSTOMER }
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.DESC
  })
  const [refetchArgs, setRefetchArgs] = useState<RefetchDataArgs>({
    args: null,
    count: null,
    loading: false,
    paginateDataArgs: null,
    refetch: null
  })

  const { data, loading, fetchMore, refetch } = useQuery(GetUsers, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })

  const users: User[] = data?.get_users || []
  const usersCount: number = data?.get_users_count || 0

  useEffect(() => {
    setRefetchArgs({
      args,
      count: usersCount,
      loading,
      paginateDataArgs,
      refetch
    })
  }, [data, paginateDataArgs])

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
          <TableCell>{user?.firstName}</TableCell>
          <TableCell>{user?.lastName}</TableCell>
          <TableCell>{user?.email}</TableCell>
          <TableCell>{user?.phoneNumber}</TableCell>
          <TableCell>{String(user?.createdAt)}</TableCell>
          <TableCell>
            <DeleteButton
              _id={user._id}
              label={'User'}
              mutation={deleteMutation}
              refetchArgs={refetchArgs}
              setPaginateDataArgs={setPaginateDataArgs}
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
      searchLabel={'Search Account by Email or Name'}
      searchPlaceholder={'ex. ava_cruz@gmail.com or Ava Cruz'}
      setPaginateDataArgs={setPaginateDataArgs}
    />
  )
}

export default CustomersTable