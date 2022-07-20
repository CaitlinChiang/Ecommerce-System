import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { ResetUserPassword } from '../mutation'
import { Button } from '@mui/material'
import Text from '../../../_common/TextField'
import PasswordField from '../../../_common/PasswordField'

const globalAny: any = global

const ResetPassword = (): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<any>({
    email: null,
    newPassword: null,
    verificationCode: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [resetPasswordMutation, resetPasswordMutationState] = useMutation(
    ResetUserPassword,
    {
      variables: args,
      onCompleted: () => {
        globalAny.setNotification(true, 'Password successfully updated!')
        router.push('/user/sign-in')
      },
      onError: (error) => globalAny.setNotification(false, error.message)
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
        disabled={resetPasswordMutationState.loading}
        onClick={(): void => {
          setValidateFields(true)
          resetPasswordMutation()
        }}
      >
        {'Forgot Password'}
      </Button>
    </>
  )
}

export default ResetPassword
