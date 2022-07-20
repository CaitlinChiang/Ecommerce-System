import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GetOrders } from '../query'
import deleteMutation from '../../Delete/mutation'
import { Button, TableCell, TableRow, Typography } from '@mui/material'
import { CartItem } from '../../../../../types/cart'
import { Order } from '../../../../../types/order'
import { PaginateDataArgs } from '../../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../../types/actions/refetchData'
import { SortDirection } from '../../../../_enums/sortDirection'
import { DateRangeType } from '../../../../_enums/dateRangeType'
import TableComponent from '../../../_common/TableComponent'
import ModalComponent from '../../../_common/ModalComponent'
import UpdateOrderSelect from '../../Update/select'
import UpdatePaymentSelect from '../../../payments/Update/select'
import DeleteButton from '../../../_common/DeleteButton'
import OrdersTableFilters from './tableFilters'
import { fetchMoreArgs } from '../../../../_utils/handleArgs/returnFetchMoreArgs'

const OrdersTable = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    collectionMethod: null,
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
  const [showAddress, setShowAddress] = useState<any>({
    address: null,
    open: false
  })
  const [showOrderItems, setShowOrderItems] = useState<any>({
    items: [],
    open: false
  })
  const [showPaymentProof, setShowPaymentProof] = useState<any>({
    imageProofUrl: null,
    open: false
  })
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
    { label: 'collectionMethod', sortable: true },
    { label: 'orderItems', sortable: false },
    { label: 'status', sortable: true },
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
          <TableCell>{order?.user?.firstName}</TableCell>
          <TableCell>{order?.user?.lastName}</TableCell>
          <TableCell>
            {order?.user?.email} <br /> {order?.user?.phoneNumber}
          </TableCell>
          <TableCell>
            {order?.collectionMethod}
            {order?.deliveryAddress && (
              <Button
                onClick={(): void =>
                  setShowAddress({ address: order?.deliveryAddress, open: true })
                }
              >
                {'View Address'}
              </Button>
            )}
          </TableCell>
          <TableCell>
            <Button
              onClick={(): void => {
                setShowOrderItems({ items: order?.items, open: true })
              }}
            >
              {'View Items'}
            </Button>
          </TableCell>
          <TableCell>
            <UpdateOrderSelect
              _id={order._id}
              refetchArgs={refetchArgs}
              status={order?.status}
            />
          </TableCell>
          <TableCell>
            {`Amount Due: P${order?.payment?.amountDue?.toFixed(2)}`}
            {`Shipping Fee: P${order?.payment?.shippingFee?.toFixed(2)}`}
          </TableCell>
          <TableCell>
            <UpdatePaymentSelect
              _orderId={order._id}
              refetchArgs={refetchArgs}
              status={order?.payment?.status}
            />
          </TableCell>
          <TableCell>
            {order?.payment?.paymentMethod?.name}
            <br />
            <Button
              onClick={(): void => {
                setShowPaymentProof({ imageProofUrl: '', open: true })
              }}
            >
              {'View Proof'}
            </Button>
          </TableCell>
          <TableCell>{String(order?.createdAt)}</TableCell>
          <TableCell>{String(order?.updatedAt)}</TableCell>
          <TableCell>
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
    <>
      <ModalComponent
        content={
          <Typography>
            {showAddress?.address?.address} <br /> {showAddress?.address?.city?.name}
          </Typography>
        }
        onClose={(): void => {
          setShowAddress({ open: false })
        }}
        open={showAddress.open}
        title={'Address'}
      />
      <ModalComponent
        content={showOrderItems?.items?.map((item: CartItem) => {
          const { product, productVariant, quantity } = item
          return (
            <Typography>
              {quantity > 9 ? quantity : '0' + quantity}
              {' - '}
              {product?.name}
              {productVariant?.name && ` [${productVariant?.name}]`}
            </Typography>
          )
        })}
        onClose={(): void => {
          setShowOrderItems({ open: false })
        }}
        open={showOrderItems.open}
        title={'Order Items'}
      />
      <ModalComponent
        content={<></>}
        onClose={(): void => {
          setShowPaymentProof({ open: false })
        }}
        open={showPaymentProof.open}
        title={'Payment Proof'}
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
