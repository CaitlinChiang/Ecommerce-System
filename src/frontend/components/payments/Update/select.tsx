import { ReactElement, useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import SelectField from '../../_common/SelectField'
import { ObjectId } from 'mongodb'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { PaymentStatus } from '../../../_enums/paymentStatus'
import { refetchData } from '../../../_utils/refetchData'

const UpdatePaymentSelect = ({
  _orderId,
  refetchArgs,
  status
}: {
  _orderId: ObjectId
  refetchArgs: RefetchDataArgs
  status: PaymentStatus
}): ReactElement => {
  const [args, setArgs] = useState<any>({ status: status })

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: { _orderId, status: args.status },
    onCompleted: () => {
      console.log('Payment Status Updated')
      refetchData(refetchArgs)
    },
    onError: (error) => console.log(error)
  })

  useEffect(() => {
    updateMutation()
  }, [args])

  return (
    <SelectField
      args={args}
      disabled={updateMutationState.loading}
      label={'Payment Status'}
      optionLabelProp={'label'}
      options={Object.keys(PaymentStatus).map((status) => {
        return { label: status, status: status }
      })}
      selectVal={{ label: status, status: status }}
      setArgs={setArgs}
      targetProp={'status'}
    />
  )
}

export default UpdatePaymentSelect
