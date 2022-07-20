import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { ResetUserPassword } from '../mutation'
import { Button } from '@mui/material'
import Text from '../../../_common/TextField'
import PasswordField from '../../../_common/PasswordField'
import Notification from '../../../_common/NotificationComponent'

const ResetPassword = (): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<any>({
    email: null,
    newPassword: null,
    verificationCode: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
  })

  const [resetPasswordMutation, resetPasswordMutationState] = useMutation(
    ResetUserPassword,
    {
      variables: args,
      onCompleted: () => {
        setNotification({
          message: 'Password successfully updated!',
          success: true
        })
        router.push('/user/sign-in')
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
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'verificationCode'}
      />
      <PasswordField
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'newPassword'}
      />
      <Button
        onClick={() => {
          setValidateFields(true)
          resetPasswordMutation()
        }}
        disabled={resetPasswordMutationState.loading}
      >
        {'Forgot Password'}
      </Button>
      <Notification message={notification.message} success={notification.success} />
    </>
  )
}

export default ResetPassword
