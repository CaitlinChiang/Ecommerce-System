import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import SelectField from '../../_common/SelectField'
import { ObjectId } from 'mongodb'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { PaymentStatus } from '../../../_enums/paymentStatus'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

const UpdatePaymentSelect = ({
  _orderId,
  disabled,
  refetchArgs,
  status
}: {
  _orderId: ObjectId
  disabled: boolean
  refetchArgs: RefetchDataArgs
  status: PaymentStatus
}): ReactElement => {
  const [args, setArgs] = useState<any>({ _orderId, status })

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    onCompleted: () => {
      globalAny.setNotification(true, 'Payment status successfully updated!')
      refetchData(refetchArgs)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      <SelectField
        args={args}
        error={!args.status}
        disabled={disabled || updateMutationState.loading}
        label={'Payment Status'}
        options={Object.keys(PaymentStatus).map((status) => {
          return { label: status, status: status }
        })}
        setArgs={setArgs}
        targetProp={'status'}
        updateMutation={updateMutation}
      />
    </>
  )
}

export default UpdatePaymentSelect
