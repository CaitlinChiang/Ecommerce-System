import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import SelectField from '../../_common/SelectField'
import Notification from '../../_common/Notification'
import { ObjectId } from 'mongodb'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { OrderStatus } from '../../../_enums/orderStatus'
import { refetchData } from '../../../_utils/handleData/refetchData'

const UpdateOrderSelect = ({
  _id,
  refetchArgs,
  status
}: {
  _id: ObjectId
  refetchArgs: RefetchDataArgs
  status: OrderStatus
}): ReactElement => {
  const [args, setArgs] = useState<any>({ _id, status })
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
  })

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    onCompleted: () => {
      setNotification({
        message: 'Order status updated!',
        success: true
      })
      refetchData(refetchArgs)
    },
    onError: (error) => {
      setNotification({ message: error.message, success: false })
    }
  })

  return (
    <>
      <SelectField
        args={args}
        disabled={updateMutationState.loading}
        error={!args.status}
        label={'Order Status'}
        options={Object.keys(OrderStatus).map((status) => {
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

export default UpdateOrderSelect
