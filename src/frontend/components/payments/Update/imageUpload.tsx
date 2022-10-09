import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Payment } from '../../../../types/payment'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import ModalComponent from '../../_common/ModalComponent'
import ImageUploader from '../../_common/ImageUploader'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

const UpdatePaymentImageUpload = ({
  _orderId,
  onClose,
  open,
  payment,
  refetchArgs
}: {
  _orderId: string
  onClose: VoidFunction
  open: boolean
  payment: Payment
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [args, setArgs] = useState<any>({
    imageProof: null,
    imageProofUrl: payment?.imageProofUrl
  })

  const [updateMutation] = useMutation(mutation, {
    variables: { _orderId, status: payment?.status, ...args },
    onCompleted: () => {
      globalAny.setNotification(true, 'Payment proof successfully updated!')
      refetchData(refetchArgs)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <ModalComponent
      content={
        <ImageUploader
          alt={'Payment Proof'}
          args={args}
          label={'Upload Updated Image *'}
          setArgs={setArgs}
          targetProp={'imageProof'}
        />
      }
      onClose={onClose}
      open={open}
      primaryButtonOnClick={(): void => {
        updateMutation()
      }}
      title={'Update Payment Proof'}
    />
  )
}

export default UpdatePaymentImageUpload
