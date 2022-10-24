import { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GetPaymentMethod } from '../View/query'
import mutation from './mutation'
import {
  PaymentMethod,
  UpdatePaymentMethodArgs
} from '../../../../types/paymentMethod'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import ModalComponent from '../../_common/ModalComponent'
import UpdateHistory from '../../_common/UpdateHistory'
import Text from '../../_common/TextField'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

const UpdatePaymentMethod = ({
  _id,
  onClose,
  open,
  refetchArgs
}: {
  _id: string
  onClose: VoidFunction
  open: boolean
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [args, setArgs] = useState<UpdatePaymentMethodArgs>({
    _id: null,
    name: null,
    details: null
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data, loading } = useQuery(GetPaymentMethod, {
    skip: !_id,
    variables: { _id }
  })
  const paymentMethod: PaymentMethod = data?.get_payment_method || {}

  useEffect(() => {
    setArgs({
      _id,
      name: paymentMethod?.name,
      details: paymentMethod?.details
    })
  }, [data])

  const [updateMutation] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: () => {
      globalAny.setNotification(true, 'Payment method successfully updated!')
      refetchData(refetchArgs)
      setValidateFields(false)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <ModalComponent
      content={
        <>
          <UpdateHistory obj={paymentMethod} />
          <Text
            args={args}
            error={validateFields}
            required={true}
            setArgs={setArgs}
            targetProp={'name'}
          />
          <Text
            args={args}
            error={validateFields}
            required={true}
            setArgs={setArgs}
            targetProp={'details'}
          />
        </>
      }
      loading={loading}
      onClose={onClose}
      open={open}
      primaryButtonOnClick={(): void => {
        setValidateFields(true)
        updateMutation()
      }}
      title={'Update Payment Method'}
    />
  )
}

export default UpdatePaymentMethod
