import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetPaymentMethods } from './query'
import deleteMutation from '../Delete/mutation'
import { IconButton, TableCell, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { PaymentMethod, GetPaymentMethodArgs } from '../../../../types/paymentMethod'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { AdminPermission } from '../../../_enums/adminPermission'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import ModalComponent from '../../_common/ModalComponent'
import CreatePaymentMethod from '../Create'
import UpdatePaymentMethod from '../Update'
import DeleteButton from '../../_common/DeleteButton'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { fetchMoreArgs } from '../../../_utils/handleArgs/returnFetchMoreArgs'

const PaymentMethodsTable = (): ReactElement => {
  const disableUpdatePaymentMethod = !authenticateUser(
    AdminPermission.UPDATE_PAYMENT_METHOD
  )
  const disableDeletePaymentMethod = !authenticateUser(
    AdminPermission.DELETE_PAYMENT_METHOD
  )

  const args: GetPaymentMethodArgs = {}
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'name',
    sortDirection: SortDirection.ASC
  })

  const [update, setUpdate] = useState<{ methodId: string; openModal: boolean }>({
    methodId: null,
    openModal: false
  })

  const { data, loading, fetchMore, refetch } = useQuery(GetPaymentMethods, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })
  const paymentMethods: PaymentMethod[] = data?.get_payment_methods || []
  const paymentMethodsCount: number = data?.get_payment_methods_count || 0

  const refetchArgs: RefetchDataArgs = {
    args,
    count: paymentMethodsCount,
    loading,
    paginateDataArgs,
    refetch
  }

  const paymentMethodHeaders = [
    { label: 'name', sortable: true },
    { label: 'details', sortable: false },
    { label: 'actions', sortable: false }
  ]

  const paymentMethodRows = [
    paymentMethods?.map((paymentMethod: PaymentMethod): ReactElement => {
      const { details, name } = paymentMethod

      return (
        <TableRow>
          <TableCell>{name}</TableCell>
          <TableCell>{details}</TableCell>
          <TableCell>
            <IconButton
              disabled={disableUpdatePaymentMethod}
              onClick={(): void => {
                setUpdate({ methodId: String(paymentMethod._id), openModal: true })
              }}
            >
              <EditIcon />
            </IconButton>
            <DeleteButton
              _id={paymentMethod._id}
              disabled={disableDeletePaymentMethod}
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
          <UpdatePaymentMethod _id={update.methodId} refetchArgs={refetchArgs} />
        }
        onClose={(): void => setUpdate({ ...update, openModal: false })}
        open={update.openModal}
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
