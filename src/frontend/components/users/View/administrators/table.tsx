import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetUsers } from '../query'
import deleteMutation from '../../Delete/mutation'
import { Button, TableCell, TableRow } from '@mui/material'
import { User, GetUserArgs } from '../../../../../types/user'
import { PaginateDataArgs } from '../../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../../types/actions/refetchData'
import { AdminPermission } from '../../../../_enums/adminPermission'
import { SortDirection } from '../../../../_enums/sortDirection'
import { UserType } from '../../../../_enums/userType'
import TableComponent from '../../../_common/TableComponent'
import UpdateAdminPermissions from '../../Update/adminPermissions'
import UpdateUserCheckbox from '../../Update/checkbox'
import DeleteButton from '../../../_common/DeleteButton'
import AdministratorsTableFilters from './tableFilters'
import { authenticateUser } from '../../../../_utils/auth/authenticateUser'

const AdministratorsTable = (): ReactElement => {
  const disableUpdateUser = !authenticateUser(AdminPermission.UPDATE_ADMINISTRATOR)
  const disableDeleteUser = !authenticateUser(AdminPermission.DELETE_ADMINISTRATOR)

  const [args, setArgs] = useState<GetUserArgs>({
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

  const [permissions, setPermissions] = useState<{ user: User; openModal: boolean }>(
    {
      user: null,
      openModal: false
    }
  )

  const [filterOpen, setFilterOpen] = useState<boolean>(false)

  const { data, loading, refetch } = useQuery(GetUsers, {
    variables: { ...args, paginateData: paginateDataArgs }
  })
  const users: User[] = data?.get_users || []
  const usersCount: number = data?.get_users_count || 0

  const refetchArgs: RefetchDataArgs = {
    args,
    count: usersCount,
    loading,
    paginateDataArgs,
    refetch
  }

  const userHeaders = [
    { label: 'active', sortable: true },
    { label: 'firstName', sortable: true },
    { label: 'lastName', sortable: true },
    { label: 'email', sortable: true },
    { label: 'phoneNumber', sortable: false },
    { label: 'permissions', sortable: false },
    { label: 'createdAt', sortable: true },
    { label: 'actions', sortable: false },
    { label: 'updatedAt', sortable: true }
  ]

  const userRows = [
    users?.map((user: User): ReactElement => {
      const {
        _id,
        createdAt,
        createdByEmail,
        updatedAt,
        updatedByEmail,
        email,
        firstName,
        lastName,
        phoneNumber
      } = user

      return (
        <TableRow>
          <TableCell>
            <UpdateUserCheckbox
              disabled={disableUpdateUser}
              refetchArgs={refetchArgs}
              user={user}
            />
          </TableCell>
          <TableCell>{firstName}</TableCell>
          <TableCell>{lastName}</TableCell>
          <TableCell>{email}</TableCell>
          <TableCell>{phoneNumber}</TableCell>
          <TableCell>
            <Button
              disabled={disableUpdateUser}
              onClick={(): void => setPermissions({ user, openModal: true })}
            >
              {'Edit'}
            </Button>
          </TableCell>
          <TableCell>
            {String(createdAt)}
            <br />
            {`${createdByEmail && 'by ' + createdByEmail}`}
          </TableCell>
          <TableCell>
            <DeleteButton
              _id={_id}
              type={UserType.ADMINISTRATOR}
              disabled={disableDeleteUser}
              label={'User'}
              mutation={deleteMutation}
              refetchArgs={refetchArgs}
              setPaginateDataArgs={setPaginateDataArgs}
            />
          </TableCell>
          <TableCell>
            {String(updatedAt)}
            <br />
            {`${updatedByEmail && 'by ' + updatedByEmail}`}
          </TableCell>
        </TableRow>
      )
    })
  ]

  return (
    <>
      <UpdateAdminPermissions
        onClose={(): void => setPermissions({ ...permissions, openModal: false })}
        open={permissions.openModal}
        refetchArgs={refetchArgs}
        user={permissions.user}
      />
      <TableComponent
        count={usersCount}
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
