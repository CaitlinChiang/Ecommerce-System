import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetOrders } from '../query'
import deleteMutation from '../../Delete/mutation'
import { Button, IconButton, TableCell, TableRow } from '@mui/material'
import TimelineIcon from '@mui/icons-material/Timeline'
import { CartItem } from '../../../../../types/cart'
import { Order, GetOrderArgs } from '../../../../../types/order'
import { Payment } from '../../../../../types/payment'
import { PaginateDataArgs } from '../../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../../types/actions/refetchData'
import { AdminPermission } from '../../../../_enums/adminPermission'
import { SortDirection } from '../../../../_enums/sortDirection'
import { DateRangeType } from '../../../../_enums/dateRangeType'
import TableComponent from '../../../_common/TableComponent'
import UpdateOrderSelect from '../../Update/select'
import UpdatePaymentSelect from '../../../payments/Update/select'
import UpdatePaymentImageUpload from '../../../payments/Update/imageUpload'
import DeleteButton from '../../../_common/DeleteButton'
import OrderItemsTable from '../orderItemsTable'
import OrderLogsTable from '../../../auditLogs/View/orderLogsTable'
import OrdersTableFilters from './tableFilters'
import { authenticateUser } from '../../../../_utils/auth/authenticateUser'
import { fetchMoreArgs } from '../../../../_utils/handleArgs/returnFetchMoreArgs'
import { formatPrice } from '../../../../_utils/handleFormat/formatPrice'

const OrdersTable = (): ReactElement => {
  const disableUpdateOrder = !authenticateUser(AdminPermission.UPDATE_ORDER)
  const disableUpdatePayment = !authenticateUser(AdminPermission.UPDATE_PAYMENT)
  const disableDeleteOrder = !authenticateUser(AdminPermission.DELETE_ORDER)

  const [args, setArgs] = useState<GetOrderArgs>({
    cityId: null,
    dateRange: {
      startDate: new Date(Date.now() - 6096e5),
      endDate: new Date(),
      filterBy: DateRangeType.CREATED
    },
    statuses: []
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
  const [logs, setLogs] = useState<{ orderId: string; openModal: boolean }>({
    orderId: null,
    openModal: false
  })
  const [payment, setPayment] = useState<{ payment: Payment; openModal: boolean }>({
    payment: null,
    openModal: false
  })

  const { data, loading, fetchMore, refetch } = useQuery(GetOrders, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })
  const orders: Order[] = data?.get_orders || []
  const ordersCount: number = data?.get_orders_count || 0

  const refetchArgs: RefetchDataArgs = {
    args,
    count: ordersCount,
    loading,
    paginateDataArgs,
    refetch
  }

  const orderHeaders = [
    { label: 'name', sortable: false },
    { label: 'contact', sortable: false },
    { label: 'address', sortable: false },
    { label: 'items', sortable: false },
    { label: 'status', sortable: true },
    { label: 'amountDue', sortable: false },
    { label: 'paymentStatus', sortable: false },
    { label: 'paymentProof', sortable: false },
    { label: 'createdAt', sortable: true },
    { label: 'actions', sortable: false }
  ]

  const orderRows = [
    orders?.map((order: Order): ReactElement => {
      const { _id, createdAt, deliveryAddress, items, payment, user } = order

      return (
        <TableRow>
          <TableCell>
            {user?.firstName} <br /> {user?.lastName}
          </TableCell>
          <TableCell>
            {user?.email} <br /> {user?.phoneNumber}
          </TableCell>
          <TableCell>
            {deliveryAddress?.address} <br /> {deliveryAddress?.city?.name}
          </TableCell>
          <TableCell>
            <Button onClick={(): void => setItems({ items, openModal: true })}>
              {'View'}
            </Button>
          </TableCell>
          <TableCell>
            <UpdateOrderSelect
              _id={_id}
              disabled={disableUpdateOrder}
              refetchArgs={refetchArgs}
              status={order.status}
            />
          </TableCell>
          <TableCell>
            {`P${formatPrice(payment?.amountDue + payment?.shippingFee)}`}
          </TableCell>
          <TableCell>
            <UpdatePaymentSelect
              _orderId={_id}
              disabled={disableUpdatePayment}
              refetchArgs={refetchArgs}
              status={payment?.status}
            />
          </TableCell>
          <TableCell>
            {payment?.paymentMethod?.name}
            <br />
            <Button
              onClick={(): void => {
                setLogs({ orderId: String(_id), openModal: false })
                setPayment({ payment, openModal: true })
              }}
            >
              {'View'}
            </Button>
          </TableCell>
          <TableCell>
            {String(createdAt).split(', ')[0]}
            <br />
            {String(createdAt).split(', ')[1]}
          </TableCell>
          <TableCell>
            <IconButton
              onClick={(): void => {
                setLogs({ orderId: String(_id), openModal: true })
              }}
            >
              <TimelineIcon />
            </IconButton>
            <DeleteButton
              _id={_id}
              disabled={disableDeleteOrder}
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
    <>
      <OrderItemsTable
        items={items.items}
        onClose={(): void => setItems({ ...items, openModal: false })}
        open={items.openModal}
      />
      <UpdatePaymentImageUpload
        _orderId={logs.orderId}
        onClose={(): void => setPayment({ ...payment, openModal: false })}
        open={payment.openModal}
        payment={payment.payment}
        refetchArgs={refetchArgs}
      />
      <OrderLogsTable
        _orderId={logs.orderId}
        onClose={(): void => setLogs({ ...logs, openModal: false })}
        open={logs.openModal}
      />
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
        searchLabel={'Search Order by Email or Name'}
        searchPlaceholder={'ex. ava_cruz@gmail.com or Ava Cruz'}
        setFilterOpen={setFilterOpen}
        setPaginateDataArgs={setPaginateDataArgs}
      />
    </>
  )
}

export default OrdersTable
