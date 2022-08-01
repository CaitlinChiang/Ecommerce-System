import { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GetPaymentMethod } from '../View/query'
import mutation from './mutation'
import { Button, CircularProgress, Typography } from '@mui/material'
import { PaymentMethod } from '../../../../types/paymentMethod'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Text from '../../_common/TextField'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

const UpdatePaymentMethod = ({
  _id,
  refetchArgs,
  setUpdateModalOpen
}: {
  _id: string
  refetchArgs: RefetchDataArgs
  setUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}): ReactElement => {
  const [args, setArgs] = useState<any>({
    _id: null,
    name: null,
    details: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data, loading } = useQuery(GetPaymentMethod, { variables: { _id } })

  const paymentMethod: PaymentMethod = data?.get_payment_method || {}

  useEffect(() => {
    setArgs({
      _id,
      name: paymentMethod?.name,
      details: paymentMethod?.details
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: () => {
      globalAny.setNotification(true, 'Payment method successfully updated!')
      refetchData(refetchArgs)
      setValidateFields(false)
      setUpdateModalOpen(false)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      {loading && <CircularProgress />}
      <Typography>{`Created At: ${paymentMethod?.createdAt}`}</Typography>
      <Typography>{`Last Updated At: ${
        paymentMethod?.updatedAt || '-'
      }`}</Typography>
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
      <Button
        disabled={updateMutationState.loading}
        onClick={(): void => {
          setValidateFields(true)
          updateMutation()
        }}
      >
        {'Save Changes'}
      </Button>
    </>
  )
}

export default UpdatePaymentMethod
