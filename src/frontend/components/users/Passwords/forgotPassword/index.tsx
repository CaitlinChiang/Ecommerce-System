import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { ForgotUserPassword } from '../mutation'
import { Button } from '@mui/material'
import Text from '../../../_common/TextField'
import Notification from '../../../_common/Notification'

const ForgotPassword = (): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<any>({ email: null })
  const [validateFields, setValidateFields] = useState<boolean>(false)
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
  })

  const [forgotPasswordMutation, forgotPasswordMutationState] = useMutation(
    ForgotUserPassword,
    {
      variables: args,
      onCompleted: () => {
        setNotification({
          message: 'Please check your email for your verification code.',
          success: true
        })
        router.push('/user/reset-password/verify')
      },
      onError: (error) => setNotification({ message: error.message, success: false })
    }
  )

  return (
    <>
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'email'}
      />
      <Button
        onClick={() => {
          setValidateFields(true)
          forgotPasswordMutation()
        }}
        disabled={forgotPasswordMutationState.loading}
      >
        {'Forgot Password'}
      </Button>
      <Notification message={notification.message} success={notification.success} />
    </>
  )
}

export default ForgotPassword
