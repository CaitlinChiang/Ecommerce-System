import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import SelectField from '../../_common/SelectField'
import { ObjectId } from 'mongodb'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { OrderStatus } from '../../../_enums/orderStatus'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

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

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    onCompleted: () => {
      globalAny.setNotification(true, 'Order status updated!')
      refetchData(refetchArgs)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
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
    </>
  )
}

export default UpdateOrderSelect
