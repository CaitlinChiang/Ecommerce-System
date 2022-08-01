import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GetUsers } from '../query'
import deleteMutation from '../../Delete/mutation'
import { Button, TableCell, TableRow } from '@mui/material'
import { User } from '../../../../../types/user'
import { PaginateDataArgs } from '../../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../../types/actions/refetchData'
import { AdminPermission } from '../../../../_enums/adminPermission'
import { SortDirection } from '../../../../_enums/sortDirection'
import { UserType } from '../../../../_enums/userType'
import TableComponent from '../../../_common/TableComponent'
import ModalComponent from '../../../_common/ModalComponent'
import CreateUser from '../../Create'
import UpdateAdminPermissions from '../../Update/adminPermissions'
import UpdateUserCheckbox from '../../Update/checkbox'
import DeleteButton from '../../../_common/DeleteButton'
import AdministratorsTableFilters from './tableFilters'
import { authenticateUser } from '../../../../_utils/auth/authenticateUser'
import { fetchMoreArgs } from '../../../../_utils/handleArgs/returnFetchMoreArgs'

const AdministratorsTable = (): ReactElement => {
  const disableUpdateUser = !authenticateUser(AdminPermission.UPDATE_USER)
  const disableDeleteUser = !authenticateUser(AdminPermission.DELETE_USER)

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
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)
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
      const { active, email, firstName, lastName, permissions, phoneNumber } = user

      return (
        <TableRow>
          <TableCell>
            <UpdateUserCheckbox
              _id={user._id}
              active={active}
              disabled={disableUpdateUser}
              refetchArgs={refetchArgs}
            />
          </TableCell>
          <TableCell>{firstName}</TableCell>
          <TableCell>{lastName}</TableCell>
          <TableCell>{email}</TableCell>
          <TableCell>{phoneNumber}</TableCell>
          <TableCell>
            <Button
              disabled={disableUpdateUser}
              onClick={(): void => {
                setUser({ _id: String(user._id), permissions })
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
              disabled={disableDeleteUser}
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
          <CreateUser
            refetchArgs={refetchArgs}
            setCreateModalOpen={setCreateModalOpen}
            type={UserType.ADMINISTRATOR}
          />
        }
        onClose={(): void => setCreateModalOpen(false)}
        open={createModalOpen}
        title={'Create Admin Account'}
      />
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
      <Button onClick={(): void => setCreateModalOpen(true)}>
        {'Create Admin Account'}
      </Button>
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
