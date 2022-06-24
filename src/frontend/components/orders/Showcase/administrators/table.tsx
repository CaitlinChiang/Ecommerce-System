import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { queryMultiple } from '../query'
import deleteMutation from '../../Delete/mutation'
import { TableCell, TableRow } from '@mui/material'
import { Order } from '../../../../../types/order'
import { PaginateDataArgs } from '../../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../../types/actions/refetchData'
import { SortDirection } from '../../../../_enums/sortDirection'
import TableComponent from '../../../_common/TableComponent'
import DeleteButton from '../../../_common/DeleteButton'
import OrdersTableFilters from './tableFilters'
import { fetchMoreArgs } from '../../../../_utils/returnFetchMoreArgs'

const OrdersTable = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    dateRange: {
      startDate: null,
      endDate: null,
      filterBy: null
    }
  })
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.DESC
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

  const orders = data?.get_orders || []
  const ordersCount: number = data?.get_orders_count || 0

  useEffect(() => {
    setRefetchArgs({
      args,
      count: ordersCount,
      loading,
      paginateDataArgs,
      refetch
    })
  }, [args, data, paginateDataArgs])

  const orderHeaders = [
    { label: 'firstName', sortable: true },
    { label: 'lastName', sortable: true },
    { label: 'contact', sortable: false },
    { label: 'collectionMethod', sortable: false },
    { label: 'orderItems', sortable: false },
    { label: 'orderStatus', sortable: true },
    { label: 'amountDue', sortable: false },
    { label: 'paymentStatus', sortable: false },
    { label: 'paymentProof', sortable: false },
    { label: 'createdAt', sortable: true },
    { label: 'updatedAt', sortable: true },
    { label: 'actions', sortable: false }
  ]

  const orderRows = [
    orders?.map((order: Order): ReactElement => {
      return (
        <TableRow>
          <TableCell align={'center'}>{order?.user?.firstName}</TableCell>
          <TableCell align={'center'}>{order?.user?.lastName}</TableCell>
          <TableCell align={'center'}>
            {order?.user?.email}
            <br />
            {order?.user?.phoneNumber}
          </TableCell>
          <TableCell align={'center'}>{order?.collectionMethod}</TableCell>
          {/* INSERT MODAL FOR VIEWING ORDER ITEMS */}
          <TableCell align={'center'}></TableCell>
          <TableCell align={'center'}>{order?.status}</TableCell>
          <TableCell align={'center'}>
            {String(order?.payment?.amountDue + order?.payment?.shippingFee)}
          </TableCell>
          <TableCell align={'center'}>{order?.payment?.status}</TableCell>
          <TableCell align={'center'}>
            {order?.payment?.paymentMethod?.name}
          </TableCell>
          <TableCell align={'center'}>{String(order?.createdAt)}</TableCell>
          <TableCell align={'center'}>{String(order?.updatedAt)}</TableCell>
          <TableCell align={'center'}>
            <DeleteButton
              _id={order._id}
              label={'Order'}
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
      count={ordersCount}
      fetchMore={fetchMore}
      filterContent={<OrdersTableFilters args={args} setArgs={setArgs} />}
      filterOpen={filterOpen}
      headers={orderHeaders}
      loading={loading}
      paginateDataArgs={paginateDataArgs}
      rows={orderRows}
      rowsPerPageOptions={[10, 25, 50, 75, 100]}
      searchLabel={'Search Order by Email'}
      searchPlaceholder={'ex. ava_cruz@gmail.com'}
      setFilterOpen={setFilterOpen}
      setPaginateDataArgs={setPaginateDataArgs}
    />
  )
}

export default OrdersTable
