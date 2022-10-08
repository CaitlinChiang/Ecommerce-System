import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import SelectField from '../../_common/SelectField'
import { ObjectId } from 'mongodb'
import { UpdateOrderArgs } from '../../../../types/order'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { OrderStatus } from '../../../_enums/orderStatus'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

const UpdateOrderSelect = ({
  _id,
  disabled,
  refetchArgs,
  status
}: {
  _id: ObjectId
  disabled: boolean
  refetchArgs: RefetchDataArgs
  status: OrderStatus
}): ReactElement => {
  const [args, setArgs] = useState<UpdateOrderArgs>({ _id, status })

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    onCompleted: () => {
      globalAny.setNotification(true, 'Order status updated!')
      refetchData(refetchArgs)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <SelectField
      args={args}
      disabled={disabled || updateMutationState.loading}
      error={!args.status}
      options={Object.keys(OrderStatus).map((status) => {
        return { label: status, status: status }
      })}
      setArgs={setArgs}
      targetProp={'status'}
      updateMutation={updateMutation}
    />
  )
}

export default UpdateOrderSelect
