import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetUsers } from '../query'
import deleteMutation from '../../Delete/mutation'
import { TableCell, TableRow } from '@mui/material'
import { User, GetUserArgs } from '../../../../../types/user'
import { PaginateDataArgs } from '../../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../../types/actions/refetchData'
import { AdminPermission } from '../../../../_enums/adminPermission'
import { SortDirection } from '../../../../_enums/sortDirection'
import { UserType } from '../../../../_enums/userType'
import TableComponent from '../../../_common/TableComponent'
import DeleteButton from '../../../_common/DeleteButton'
import { authenticateUser } from '../../../../_utils/auth/authenticateUser'

const CustomersTable = (): ReactElement => {
  const disableDeleteUser = !authenticateUser(AdminPermission.DELETE_CUSTOMER)

  const args: GetUserArgs = { type: UserType.CUSTOMER }
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.DESC
  })

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
    { label: 'firstName', sortable: true },
    { label: 'lastName', sortable: true },
    { label: 'email', sortable: true },
    { label: 'phoneNumber', sortable: false },
    { label: 'createdAt', sortable: true },
    { label: 'actions', sortable: false }
  ]

  const userRows = [
    users?.map((user: User): ReactElement => {
      const { _id, createdAt, email, firstName, lastName, phoneNumber } = user

      return (
        <TableRow>
          <TableCell>{firstName}</TableCell>
          <TableCell>{lastName}</TableCell>
          <TableCell>{email}</TableCell>
          <TableCell>{phoneNumber}</TableCell>
          <TableCell>{String(createdAt)}</TableCell>
          <TableCell>
            <DeleteButton
              _id={_id}
              type={UserType.CUSTOMER}
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
    <TableComponent
      count={usersCount}
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
