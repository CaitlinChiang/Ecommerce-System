import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Text from '../../_common/TextField'
import Notification from '../../_common/Notification'
import { refetchData } from '../../../_utils/handleData/refetchData'
import { clearFields } from '../../../_utils/handleFields/clearFields'

const CreateReview = ({
  refetchArgs
}: {
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [args, setArgs] = useState<any>({
    content: null,
    featured: false,
    username: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
  })

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: {
      ...args,
      username: args?.username || 'Anonymous'
    },
    onCompleted: () => {
      setNotification({
        message: 'Review successfully submitted!',
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
        maxLength={150}
        placeholder={'Feel free to write us a review!'}
        required={true}
        setArgs={setArgs}
        targetProp={'content'}
      />
      <Text
        args={args}
        placeholder={'Name (optional)'}
        setArgs={setArgs}
        targetProp={'username'}
      />
      <Button
        onClick={() => {
          setValidateFields(true)
          createMutation()
        }}
        disabled={createMutationState.loading}
      >
        {'Submit'}
      </Button>
      <Notification message={notification.message} success={notification.success} />
    </>
  )
}

export default CreateReview
