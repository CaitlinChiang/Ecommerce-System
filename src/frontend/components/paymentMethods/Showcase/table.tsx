import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GetPaymentMethods } from './query'
import deleteMutation from '../Delete/mutation'
import { IconButton, TableCell, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { PaymentMethod } from '../../../../types/paymentMethod'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import ModalComponent from '../../_common/ModalComponent'
import UpdatePaymentMethod from '../Update'
import DeleteButton from '../../_common/DeleteButton'
import CreatePaymentMethod from '../Create'
import { fetchMoreArgs } from '../../../_utils/handleArgs/returnFetchMoreArgs'

const PaymentMethodsTable = (): ReactElement => {
  const args: any = {}
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'name',
    sortDirection: SortDirection.ASC
  })
  const [paymentMethodId, setPaymentMethodId] = useState<string>('')
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false)
  const [refetchArgs, setRefetchArgs] = useState<RefetchDataArgs>({
    args: null,
    count: null,
    loading: false,
    paginateDataArgs: null,
    refetch: null
  })

  const { data, loading, fetchMore, refetch } = useQuery(GetPaymentMethods, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })

  const paymentMethods: PaymentMethod[] = data?.get_payment_methods || []
  const paymentMethodsCount: number = data?.get_payment_methods_count || 0

  useEffect(() => {
    setRefetchArgs({
      args,
      count: paymentMethodsCount,
      loading,
      paginateDataArgs,
      refetch
    })
  }, [args, data, paginateDataArgs])

  const paymentMethodHeaders = [
    { label: 'name', sortable: true },
    { label: 'details', sortable: false },
    { label: 'actions', sortable: false }
  ]

  const paymentMethodRows = [
    paymentMethods?.map((paymentMethod: PaymentMethod): ReactElement => {
      return (
        <TableRow>
          <TableCell>{paymentMethod?.name}</TableCell>
          <TableCell>{paymentMethod?.details}</TableCell>
          <TableCell>
            <IconButton
              onClick={(): void => {
                setPaymentMethodId(String(paymentMethod._id))
                setUpdateModalOpen(true)
              }}
            >
              <EditIcon />
            </IconButton>
            <DeleteButton
              _id={paymentMethod._id}
              label={'Payment Method'}
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
      <CreatePaymentMethod refetchArgs={refetchArgs} />
      <ModalComponent
        content={
          <UpdatePaymentMethod
            _id={paymentMethodId}
            refetchArgs={refetchArgs}
            setUpdateModalOpen={setUpdateModalOpen}
          />
        }
        onClose={(): void => {
          setUpdateModalOpen(false)
        }}
        open={updateModalOpen}
        title={'Update Payment Method'}
      />
      <TableComponent
        args={args}
        count={paymentMethodsCount}
        fetchMore={fetchMore}
        headers={paymentMethodHeaders}
        loading={loading}
        paginateDataArgs={paginateDataArgs}
        rows={paymentMethodRows}
        searchLabel={'Search Payment Methods by Name'}
        searchPlaceholder={'ex. BDO Bank Transfer'}
        setPaginateDataArgs={setPaginateDataArgs}
      />
    </>
  )
}

export default PaymentMethodsTable
