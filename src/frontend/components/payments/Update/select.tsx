import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import SelectField from '../../_common/SelectField'
import Notification from '../../_common/Notification'
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
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
  })

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    onCompleted: () => {
      setNotification({
        message: 'Payment status successfully updated!',
        success: true
      })
      refetchData(refetchArgs)
    },
    onError: (error) => setNotification({ message: error.message, success: false })
  })

  return (
    <>
      <SelectField
        args={args}
        error={!args.status}
        disabled={updateMutationState.loading}
        label={'Payment Status'}
        options={Object.keys(PaymentStatus).map((status) => {
          return { label: status, status: status }
        })}
        setArgs={setArgs}
        targetProp={'status'}
        updateMutation={updateMutation}
      />
      <Notification message={notification.message} success={notification.success} />
    </>
  )
}

export default UpdatePaymentSelect
