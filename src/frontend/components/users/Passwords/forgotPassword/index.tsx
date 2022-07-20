import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { ForgotUserPassword } from '../mutation'
import { Button } from '@mui/material'
import Text from '../../../_common/TextField'

const globalAny: any = global

const ForgotPassword = (): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<any>({ email: null })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [forgotPasswordMutation, forgotPasswordMutationState] = useMutation(
    ForgotUserPassword,
    {
      variables: args,
      onCompleted: () => {
        globalAny.setNotification(
          true,
          'Please check your email for your verification code.'
        )
        router.push('/user/reset-password/verify')
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
      <Button
        disabled={forgotPasswordMutationState.loading}
        onClick={(): void => {
          setValidateFields(true)
          forgotPasswordMutation()
        }}
      >
        {'Get Verification Code'}
      </Button>
    </>
  )
}

export default ForgotPassword
