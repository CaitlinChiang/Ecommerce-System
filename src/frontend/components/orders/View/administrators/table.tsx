import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GetOrders } from '../query'
import deleteMutation from '../../Delete/mutation'
import { Button, TableCell, TableRow } from '@mui/material'
import { Order } from '../../../../../types/order'
import { Payment } from '../../../../../types/payment'
import { PaginateDataArgs } from '../../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../../types/actions/refetchData'
import { AdminPermission } from '../../../../_enums/adminPermission'
import { SortDirection } from '../../../../_enums/sortDirection'
import { DateRangeType } from '../../../../_enums/dateRangeType'
import TableComponent from '../../../_common/TableComponent'
import ModalComponent from '../../../_common/ModalComponent'
import UpdateOrderSelect from '../../Update/select'
import UpdatePaymentSelect from '../../../payments/Update/select'
import UpdatePaymentImageUpload from '../../../payments/Update/imageUpload'
import DeleteButton from '../../../_common/DeleteButton'
import OrderItemsTable from './orderItemsTable'
import OrderLogsTable from '../../../auditLogs/View/orderLogsTable'
import OrdersTableFilters from './tableFilters'
import { authenticateUser } from '../../../../_utils/auth/authenticateUser'
import { fetchMoreArgs } from '../../../../_utils/handleArgs/returnFetchMoreArgs'
import { formatPrice } from '../../../../_utils/handleFormat/formatPrice'
import { CartItem } from '../../../../../types/cart'

const OrdersTable = (): ReactElement => {
  const disableUpdateOrder = !authenticateUser(AdminPermission.UPDATE_ORDER)
  const disableUpdatePayment = !authenticateUser(AdminPermission.UPDATE_PAYMENT)
  const disableDeleteOrder = !authenticateUser(AdminPermission.DELETE_ORDER)

  const [args, setArgs] = useState<any>({
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
  const [items, setItems] = useState<CartItem[]>([])
  const [orderId, setOrderId] = useState<string>(null)
  const [payment, setPayment] = useState<Payment>(null)
  const [open, setOpen] = useState<string>('')
  const [filterOpen, setFilterOpen] = useState<boolean>(false)
  const [refetchArgs, setRefetchArgs] = useState<RefetchDataArgs>({
    args: null,
    count: null,
    loading: false,
    paginateDataArgs: null,
    refetch: null
  })

  const { data, loading, fetchMore, refetch } = useQuery(GetOrders, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })

  const orders: Order[] = data?.get_orders || []
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
    { label: 'firstName', sortable: false },
    { label: 'lastName', sortable: false },
    { label: 'contact', sortable: false },
    { label: 'address', sortable: false },
    { label: 'orderItems', sortable: false },
    { label: 'status', sortable: true },
    { label: 'amountDue', sortable: false },
    { label: 'paymentStatus', sortable: false },
    { label: 'paymentProof', sortable: false },
    { label: 'orderLogs', sortable: false },
    { label: 'createdAt', sortable: true },
    { label: 'updatedAt', sortable: true },
    { label: 'actions', sortable: false }
  ]

  const orderRows = [
    orders?.map((order: Order): ReactElement => {
      const { createdAt, deliveryAddress, items, payment, updatedAt, user } = order

      return (
        <TableRow>
          <TableCell>{user?.firstName}</TableCell>
          <TableCell>{user?.lastName}</TableCell>
          <TableCell>
            {user?.email} <br /> {user?.phoneNumber}
          </TableCell>
          <TableCell>
            {deliveryAddress?.address} <br /> {deliveryAddress?.city?.name}
          </TableCell>
          <TableCell>
            <Button
              onClick={(): void => {
                setItems(items)
                setOpen('ORDER_ITEMS')
              }}
            >
              {'View Items'}
            </Button>
          </TableCell>
          <TableCell>
            <UpdateOrderSelect
              _id={order._id}
              disabled={disableUpdateOrder}
              refetchArgs={refetchArgs}
              status={order.status}
            />
          </TableCell>
          <TableCell>
            {`Amount Due: P${formatPrice(payment?.amountDue)}`}
            <br />
            {`Shipping Fee: P${formatPrice(payment?.shippingFee)}`}
          </TableCell>
          <TableCell>
            <UpdatePaymentSelect
              _orderId={order._id}
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
                setOrderId(String(order._id))
                setPayment(payment)
                setOpen('PAYMENT_PROOF')
              }}
            >
              {'View Proof'}
            </Button>
          </TableCell>
          <TableCell>
            <Button
              onClick={(): void => {
                setOrderId(String(order._id))
                setOpen('ORDER_LOGS')
              }}
            >
              {'View Order Logs'}
            </Button>
          </TableCell>
          <TableCell>{String(createdAt)}</TableCell>
          <TableCell>{String(updatedAt)}</TableCell>
          <TableCell>
            <DeleteButton
              _id={order._id}
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
      <ModalComponent
        content={<OrderItemsTable items={items} />}
        onClose={(): void => setOpen('')}
        open={open === 'ORDER_ITEMS'}
        title={'Order Items'}
      />
      <ModalComponent
        content={
          <UpdatePaymentImageUpload
            _orderId={orderId}
            payment={payment}
            refetchArgs={refetchArgs}
            setOpen={setOpen}
          />
        }
        onClose={(): void => setOpen('')}
        open={open === 'PAYMENT_PROOF'}
        title={'Payment Proof'}
      />
      <ModalComponent
        content={<OrderLogsTable orderId={orderId} />}
        onClose={(): void => setOpen('')}
        open={open === 'ORDER_LOGS'}
        title={'Audit Logs for this Order'}
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
