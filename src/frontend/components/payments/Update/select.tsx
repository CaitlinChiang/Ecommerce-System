import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import SelectField from '../../_common/SelectField'
import { ObjectId } from 'mongodb'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { PaymentStatus } from '../../../_enums/paymentStatus'
import { refetchData } from '../../../_utils/handleData/refetchData'

const UpdatePaymentSelect = ({
  _orderId,
  refetchArgs,
  status
}: {
  _orderId: ObjectId
  refetchArgs: RefetchDataArgs
  status: PaymentStatus
}): ReactElement => {
  const [args, setArgs] = useState<any>({ _orderId, status })

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    onCompleted: () => {
      console.log('Payment Status Updated')
      refetchData(refetchArgs)
    },
    onError: (error) => console.log(error)
  })

  return (
    <SelectField
      args={args}
      disabled={updateMutationState.loading}
      label={'Payment Status'}
      options={Object.keys(PaymentStatus).map((status) => {
        return { label: status, status: status }
      })}
      setArgs={setArgs}
      targetProp={'status'}
      updateMutation={updateMutation}
    />
  )
}

export default UpdatePaymentSelect
