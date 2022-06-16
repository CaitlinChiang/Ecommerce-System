import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import query from './query'
import { TableCell } from '@mui/material'
import { User } from '../../../../types/user'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
// import { SortDirection } from '../../../../types/_frontendEnums/sortDirection'
// import { UserType } from '../../../../types/_frontendEnums/userType'
import TableComponent from '../../_common/TableComponent'

enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

enum UserType {
  ADMIN = 'ADMIN',
  CONSUMER = 'CONSUMER'
}

const ConsumerTable = (): ReactElement => {
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    offset: 0,
    page: 1,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'lastName',
    sortDirection: SortDirection.ASC
  })

  const specificArgs = { type: UserType.CONSUMER }

  const { data, loading, fetchMore } = useQuery(query, {
    ssr: true,
    skip: !process.browser,
    variables: { ...paginateDataArgs, ...specificArgs },
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
        <>
          <TableCell align={'center'}>{user?.firstName}</TableCell>
          <TableCell align={'center'}>{user?.lastName}</TableCell>
          <TableCell align={'center'}>{user?.email}</TableCell>
          <TableCell align={'center'}>{user?.phoneNumber}</TableCell>
        </>
      )
    })
  ]

  return (
    <TableComponent
      count={usersCount}
      fetchMore={fetchMore}
      headers={['firstName', 'lastName', 'email', 'phoneNumber']}
      loading={loading}
      paginateDataArgs={paginateDataArgs}
      rows={userRows}
      rowsPerPageOptions={[10, 25, 50, 75, 100]}
      searchLabel={'Search Account by Email'}
      searchPlaceholder={'ex. ava_cruz@gmail.com'}
      setPaginateDataArgs={setPaginateDataArgs}
      specificArgs={specificArgs}
    />
  )
}

export default ConsumerTable
