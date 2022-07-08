import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { queryMultiple } from '../query'
import deleteMutation from '../../Delete/mutation'
import { Button, TableCell, TableRow, Typography } from '@mui/material'
import { Order } from '../../../../../types/order'
import { PaginateDataArgs } from '../../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../../types/actions/refetchData'
import { SortDirection } from '../../../../_enums/sortDirection'
import TableComponent from '../../../_common/TableComponent'
import ModalComponent from '../../../_common/ModalComponent'
import UpdateOrderSelect from '../../Update/select'
import UpdatePaymentSelect from '../../../payments/Update/select'
import DeleteButton from '../../../_common/DeleteButton'
import OrdersTableFilters from './tableFilters'
import { fetchMoreArgs } from '../../../../_utils/handleData/returnFetchMoreArgs'

const OrdersTable = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    collectionMethod: null,
    dateRange: {
      startDate: null,
      endDate: null,
      filterBy: null
    },
    status: null
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
          <TableCell align={'center'}>{order?.user?.firstName}</TableCell>
          <TableCell align={'center'}>{order?.user?.lastName}</TableCell>
          <TableCell align={'center'}>
            {order?.user?.email} <br /> {order?.user?.phoneNumber}
          </TableCell>
          <TableCell align={'center'}>
            {order?.collectionMethod}
            {order?.deliveryAddress !== null && (
              <Button
                color={'primary'}
                onClick={() =>
                  setShowAddress({ address: order?.deliveryAddress, open: true })
                }
                variant={'contained'}
              >
                {'View Address'}
              </Button>
            )}
          </TableCell>
          <TableCell align={'center'}>
            <Button
              color={'primary'}
              onClick={() => setShowOrderItems({ items: order?.items, open: true })}
              variant={'contained'}
            >
              {'View Items'}
            </Button>
          </TableCell>
          <TableCell align={'center'}>
            <UpdateOrderSelect
              _id={order._id}
              refetchArgs={refetchArgs}
              status={order?.status}
            />
          </TableCell>
          <TableCell align={'center'}>
            {String(order?.payment?.amountDue + order?.payment?.shippingFee)}
          </TableCell>
          <TableCell align={'center'}>
            <UpdatePaymentSelect
              _orderId={order._id}
              refetchArgs={refetchArgs}
              status={order?.payment?.status}
            />
          </TableCell>
          <TableCell align={'center'}>
            {order?.payment?.paymentMethod?.name}
            <br />
            <Button
              color={'primary'}
              onClick={() => setShowPaymentProof({ imageProofUrl: '', open: true })}
              variant={'contained'}
            >
              {'View Proof'}
            </Button>
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
        content={showOrderItems?.items?.map((item: any) => {
          return (
            <Typography>
              {item?.quantity?.length > 9 ? item?.quantity : '0' + item?.quantity}
              {' - '}
              {item?.product?.name}
              {item?.productVariant?.name !== null &&
                ` [${item?.productVariant?.name}]`}
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
