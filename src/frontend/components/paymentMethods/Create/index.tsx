import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Text from '../../_common/TextField'
import Notification from '../../_common/Notification'
import { refetchData } from '../../../_utils/handleData/refetchData'
import { clearFields } from '../../../_utils/handleFields/clearFields'

const CreatePaymentMethod = ({
  refetchArgs
}: {
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [args, setArgs] = useState<any>({
    name: null,
    details: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
  })

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: args,
    onCompleted: () => {
      setNotification({
        message: 'Payment method successfully created!',
        success: true
      })
      refetchData(refetchArgs)
      setValidateFields(false)
      setArgs(clearFields(args))
    },
    onError: (error) => setNotification({ message: error.message, success: false })
  })

  return (
    <>
      <Text
        args={args}
        error={validateFields}
        placeholder={'Payment Method (ex. BDO Bank Transfer)'}
        required={true}
        setArgs={setArgs}
        targetProp={'name'}
      />
      <Text
        args={args}
        error={validateFields}
        placeholder={'Bank Details (ex. BDO Account - 5210 6988 8182 2136)'}
        required={true}
        setArgs={setArgs}
        targetProp={'details'}
      />
      <Button
        onClick={() => {
          setValidateFields(true)
          createMutation()
        }}
        disabled={createMutationState.loading}
      >
        {'Create'}
      </Button>
      <Notification message={notification.message} success={notification.success} />
    </>
  )
}

export default CreatePaymentMethod
