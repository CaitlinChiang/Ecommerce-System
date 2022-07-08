import { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { querySingular } from '../Showcase/query'
import mutation from './mutation'
import { Button, Typography } from '@mui/material'
import { PaymentMethod } from '../../../../types/paymentMethod'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Text from '../../_common/TextField'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { refetchData } from '../../../_utils/handleData/refetchData'

const UpdatePaymentMethod = ({
  _id,
  refetchArgs,
  setUpdateModalOpen
}: {
  _id: string
  refetchArgs: RefetchDataArgs
  setUpdateModalOpen: React.Dispatch<React.SetStateAction<any>>
}): ReactElement => {
  const [args, setArgs] = useState<any>({
    _id: null,
    name: null,
    details: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data } = useQuery(querySingular, {
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

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: () => {
      console.log('Payment method successfully updated!')
      refetchData(refetchArgs)
      setValidateFields(false)
      setUpdateModalOpen(false)
    },
    onError: (error) => console.log(error)
  })

  return (
    <>
      <Typography>{`Created At: ${paymentMethod?.createdAt}`}</Typography>
      {paymentMethod?.updatedAt && (
        <Typography>{`Last Updated At: ${paymentMethod?.updatedAt}`}</Typography>
      )}
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
        onClick={() => {
          setValidateFields(true)
          updateMutation()
        }}
        disabled={updateMutationState.loading}
      >
        {'Save Changes'}
      </Button>
    </>
  )
}

export default UpdatePaymentMethod
