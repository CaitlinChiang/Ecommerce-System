import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetOrders } from '../query'
import { TableCell, TableRow } from '@mui/material'
import { Order } from '../../../../../types/order'
import { CartItem } from '../../../../../types/cart'
import { PaginateDataArgs } from '../../../../../types/actions/paginateData'
import { SortDirection } from '../../../../_enums/sortDirection'
import { OrderStatus } from '../../../../_enums/orderStatus'
import TableComponent from '../../../_common/TableComponent'
import OrdersTableFilters from './tableFilters'
import { fetchMoreArgs } from '../../../../_utils/handleArgs/returnFetchMoreArgs'

const OrdersTable = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    collectionMethod: null,
    statuses: [OrderStatus.PENDING, OrderStatus.PACKING, OrderStatus.SHIPPING]
  })
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.DESC
  })
  const [filterOpen, setFilterOpen] = useState<boolean>(false)

  const { data, loading, fetchMore } = useQuery(GetOrders, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })

  const orders = data?.get_orders || []
  const ordersCount: number = data?.get_orders_count || 0

  const orderHeaders = [
    { display: 'Date of Order', label: 'createdAt', sortable: false },
    { display: 'Product', label: 'name', sortable: false },
    { label: 'quantity', sortable: false },
    { display: 'Price', label: 'totalPrice', sortable: false },
    { label: 'status', sortable: false },
    { label: 'paymentMethod', sortable: false },
    { label: 'collection', sortable: false }
  ]

  const orderRows = [
    orders?.map((order: Order) => {
      return order?.items?.map((cartItem: CartItem): ReactElement => {
        return (
          <TableRow>
            <TableCell align={'center'}>
              {String(order?.createdAt).substring(0, 10)}
            </TableCell>
            <TableCell align={'center'}>
              {cartItem?.productVariant?.name || cartItem?.product?.name}
            </TableCell>
            <TableCell align={'center'}>{cartItem?.quantity}</TableCell>
            <TableCell align={'center'}>
              {'P' + cartItem?.totalPrice?.toFixed(2)}
            </TableCell>
            <TableCell align={'center'}>{order?.status}</TableCell>
            <TableCell align={'center'}>
              {order?.payment?.paymentMethod?.name}
            </TableCell>
            <TableCell align={'center'}>{order?.collectionMethod}</TableCell>
          </TableRow>
        )
      })
    })
  ]

  return (
    <>
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
        setFilterOpen={setFilterOpen}
        setPaginateDataArgs={setPaginateDataArgs}
      />
    </>
  )
}

export default OrdersTable
