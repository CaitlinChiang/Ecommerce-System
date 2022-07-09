import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Text from '../../_common/TextField'
import NumberField from '../../_common/NumberField'
import Notification from '../../_common/Notification'
import { formatFee } from '../../../_utils/handleFormatting/formatFee'
import { refetchData } from '../../../_utils/handleData/refetchData'
import { clearFields } from '../../../_utils/handleFields/clearFields'

const CreateCity = ({
  refetchArgs
}: {
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [args, setArgs] = useState<any>({
    name: null,
    shippingFee: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
  })

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: {
      ...args,
      shippingFee: formatFee(args?.shippingFee)
    },
    onCompleted: () => {
      setNotification({
        message: 'City & shipping fee successfully created!',
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
        placeholder={'City (ex. Makati)'}
        required={true}
        setArgs={setArgs}
        targetProp={'name'}
      />
      <NumberField
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'shippingFee'}
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

export default CreateCity
