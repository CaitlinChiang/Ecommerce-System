import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GetUsers } from '../query'
import deleteMutation from '../../Delete/mutation'
import { Button, TableCell, TableRow } from '@mui/material'
import { User } from '../../../../../types/user'
import { PaginateDataArgs } from '../../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../../types/actions/refetchData'
import { SortDirection } from '../../../../_enums/sortDirection'
import { UserType } from '../../../../_enums/userType'
import TableComponent from '../../../_common/TableComponent'
import ModalComponent from '../../../_common/ModalComponent'
import UpdateAdminPermissions from '../../Update/adminPermissions'
import UpdateUserCheckbox from '../../Update/checkbox'
import DeleteButton from '../../../_common/DeleteButton'
import AdministratorsTableFilters from './tableFilters'
import { fetchMoreArgs } from '../../../../_utils/handleArgs/returnFetchMoreArgs'

const AdministratorsTable = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    active: null,
    type: UserType.ADMINISTRATOR
  })
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.DESC
  })
  const [user, setUser] = useState<any>({ _id: null, permissions: [] })
  const [permissionsModalOpen, setPermissionsModalOpen] = useState<boolean>(false)
  const [filterOpen, setFilterOpen] = useState<boolean>(false)
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
  }, [args, data, paginateDataArgs])

  const userHeaders = [
    { label: 'active', sortable: true },
    { label: 'firstName', sortable: true },
    { label: 'lastName', sortable: true },
    { label: 'email', sortable: true },
    { label: 'phoneNumber', sortable: false },
    { label: 'permissions', sortable: false },
    { label: 'createdAt', sortable: true },
    { label: 'actions', sortable: false }
  ]

  const userRows = [
    users?.map((user: User): ReactElement => {
      return (
        <TableRow>
          <TableCell>
            <UpdateUserCheckbox
              _id={user._id}
              active={user.active}
              refetchArgs={refetchArgs}
            />
          </TableCell>
          <TableCell>{user?.firstName}</TableCell>
          <TableCell>{user?.lastName}</TableCell>
          <TableCell>{user?.email}</TableCell>
          <TableCell>{user?.phoneNumber}</TableCell>
          <TableCell>
            <Button
              onClick={(): void => {
                setUser({ _id: String(user._id), permissions: user?.permissions })
                setPermissionsModalOpen(true)
              }}
            >
              {'View Permissions'}
            </Button>
          </TableCell>
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
    <>
      <ModalComponent
        content={
          <UpdateAdminPermissions
            _id={user._id}
            permissions={user.permissions}
            refetchArgs={refetchArgs}
          />
        }
        onClose={(): void => setPermissionsModalOpen(false)}
        open={permissionsModalOpen}
        title={'Admin Permissions'}
      />
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
        searchLabel={'Search Account by Email or Name'}
        searchPlaceholder={'ex. ava_cruz@gmail.com or Ava Cruz'}
        setFilterOpen={setFilterOpen}
        setPaginateDataArgs={setPaginateDataArgs}
      />
    </>
  )
}

export default AdministratorsTable
