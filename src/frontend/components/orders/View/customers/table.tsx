import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetOrders } from '../query'
import { Button, TableCell, TableRow } from '@mui/material'
import { Order, GetOrderArgs } from '../../../../../types/order'
import { CartItem } from '../../../../../types/cart'
import { PaginateDataArgs } from '../../../../../types/actions/paginateData'
import { SortDirection } from '../../../../_enums/sortDirection'
import { OrderStatus } from '../../../../_enums/orderStatus'
import TableComponent from '../../../_common/TableComponent'
import OrderItemsTable from '../orderItemsTable'
import OrdersTableFilters from './tableFilters'
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

  const [items, setItems] = useState<{ items: CartItem[]; openModal: boolean }>({
    items: [],
    openModal: false
  })

  const { data, loading } = useQuery(GetOrders, {
    variables: { ...args, paginateData: paginateDataArgs }
  })
  const orders: Order[] = data?.get_orders || []
  const ordersCount: number = data?.get_orders_count || 0

  const orderHeaders = [
    { label: 'orderNumber', sortable: false },
    { label: 'dateOfOrder', sortable: false },
    { label: 'Items', sortable: false },
    { label: 'Quantity', sortable: false },
    { label: 'subtotal', sortable: false },
    { label: 'shipping', sortable: false },
    { label: 'status', sortable: false },
    { label: 'paymentMethod', sortable: false }
  ]

  const orderRows = [
    orders?.map((order: Order): ReactElement => {
      const { _id, createdAt, items, itemsQuantity, payment, status } = order

      return (
        <TableRow>
          <TableCell>{String(_id)}</TableCell>
          <TableCell>
            {String(createdAt).split(', ')[0]}
            <br />
            {String(createdAt).split(', ')[1]}
          </TableCell>
          <TableCell>
            <Button onClick={(): void => setItems({ items, openModal: true })}>
              {'View'}
            </Button>
          </TableCell>
          <TableCell>{itemsQuantity}</TableCell>
          <TableCell>{`P${formatPrice(payment?.amountDue)}`}</TableCell>
          <TableCell>{`P${formatPrice(payment?.shippingFee)}`}</TableCell>
          <TableCell>{status}</TableCell>
          <TableCell>{payment?.paymentMethod?.name}</TableCell>
        </TableRow>
      )
    })
  ]

  return (
    <>
      <OrderItemsTable
        items={items.items}
        onClose={(): void => setItems({ ...items, openModal: false })}
        open={items.openModal}
      />
      <TableComponent
        count={ordersCount}
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
