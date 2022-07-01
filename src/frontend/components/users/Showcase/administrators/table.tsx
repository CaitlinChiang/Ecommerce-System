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
import UpdateUserCheckbox from '../../Update/checkbox'
import DeleteButton from '../../../_common/DeleteButton'
import AdministratorsTableFilters from './tableFilters'
import { fetchMoreArgs } from '../../../../_utils/returnFetchMoreArgs'

const AdministratorsTable = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    active: null,
    type: UserType.ADMINISTRATOR
  })
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'lastName',
    sortDirection: SortDirection.ASC
  })
  const [filterOpen, setFilterOpen] = useState<boolean>(false)
  const [refetchArgs, setRefetchArgs] = useState<RefetchDataArgs>({
    args: null,
    count: null,
    loading: false,
    paginateDataArgs: null,
    refetch: null
  })

  const { data, loading, fetchMore, refetch } = useQuery(queryMultiple, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })

  const users = data?.get_users || []
  const usersCount: number = data?.get_users_count || 0

  useEffect(() => {
    setRefetchArgs({
      args,
      count: usersCount,
      loading,
      paginateDataArgs,
      refetch
    })
  }, [args, data, paginateDataArgs])

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
            <UpdateUserCheckbox
              _id={user._id}
              active={user.active}
              refetchArgs={refetchArgs}
            />
          </TableCell>
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
      filterContent={<AdministratorsTableFilters args={args} setArgs={setArgs} />}
      filterOpen={filterOpen}
      headers={userHeaders}
      loading={loading}
      paginateDataArgs={paginateDataArgs}
      rows={userRows}
      searchLabel={'Search Account by Email'}
      searchPlaceholder={'ex. ava_cruz@gmail.com'}
      setFilterOpen={setFilterOpen}
      setPaginateDataArgs={setPaginateDataArgs}
    />
  )
}

export default AdministratorsTable
