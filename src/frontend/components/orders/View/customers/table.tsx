import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetOrders } from '../query'
import { TableCell, TableRow } from '@mui/material'
import { Order, GetOrderArgs } from '../../../../../types/order'
import { CartItem } from '../../../../../types/cart'
import { PaginateDataArgs } from '../../../../../types/actions/paginateData'
import { SortDirection } from '../../../../_enums/sortDirection'
import { OrderStatus } from '../../../../_enums/orderStatus'
import TableComponent from '../../../_common/TableComponent'
import OrdersTableFilters from './tableFilters'
import { fetchMoreArgs } from '../../../../_utils/handleArgs/returnFetchMoreArgs'
import { formatPrice } from '../../../../_utils/handleFormat/formatPrice'

const OrdersTable = (): ReactElement => {
  const [args, setArgs] = useState<GetOrderArgs>({
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
  const orders: Order[] = data?.get_orders || []
  const ordersCount: number = data?.get_orders_count || 0

  const orderHeaders = [
    { label: 'orderId', sortable: true },
    { display: 'Date of Order', label: 'createdAt', sortable: false },
    { display: 'Product', label: 'name', sortable: false },
    { label: 'quantity', sortable: false },
    { display: 'Price', label: 'totalPrice', sortable: false },
    { label: 'status', sortable: false },
    { label: 'paymentMethod', sortable: false }
  ]

  const orderRows = [
    orders?.map((order: Order): ReactElement[] => {
      const { createdAt, payment, status } = order

      return order?.items?.map((cartItem: CartItem): ReactElement => {
        const { product, productVariant, quantity, totalPrice } = cartItem

        return (
          <TableRow>
            <TableCell>{String(order._id)}</TableCell>
            <TableCell>{String(createdAt).substring(0, 10)}</TableCell>
            <TableCell>{productVariant?.name || product?.name}</TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell>{`P${formatPrice(totalPrice)}`}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{payment?.paymentMethod?.name}</TableCell>
          </TableRow>
        )
      })
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
      setFilterOpen={setFilterOpen}
      setPaginateDataArgs={setPaginateDataArgs}
    />
  )
}

export default OrdersTable
