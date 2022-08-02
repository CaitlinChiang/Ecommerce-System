import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import { Payment } from '../../../../types/payment'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import ImageUploader from '../../_common/ImageUploader'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

const UpdatePaymentImageUpload = ({
  _orderId,
  payment,
  refetchArgs,
  setOpen
}: {
  _orderId: string
  payment: Payment
  refetchArgs: RefetchDataArgs
  setOpen: React.Dispatch<React.SetStateAction<string>>
}): ReactElement => {
  const [args, setArgs] = useState<any>({
    imageProof: null,
    imageProofUrl: payment.imageProofUrl
  })

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: { _orderId, status: payment.status, ...args },
    onCompleted: () => {
      globalAny.setNotification(true, 'Payment proof successfully updated!')
      refetchData(refetchArgs)
      setOpen('')
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      <ImageUploader
        alt={'Payment Proof'}
        args={args}
        setArgs={setArgs}
        targetProp={'imageProof'}
      />
      <Button
        disabled={updateMutationState.loading}
        onClick={(): void => {
          updateMutation()
        }}
      >
        {'Save Changes'}
      </Button>
    </>
  )
}

export default UpdatePaymentImageUpload
