import Cookies from 'js-cookie'
import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import { UserType } from '../../../_enums/userType'
import Text from '../../_common/TextField'
import PasswordField from '../../_common/PasswordField'

const globalAny: any = global

const SignInUser = ({ type }: { type: UserType }): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<any>({
    email: null,
    password: null,
    type
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [signInMutation, signInMutationState] = useMutation(mutation, {
    variables: args,
    onCompleted: (data) => {
      Cookies.set('accessToken', data.sign_in_user)
      globalAny.setNotification(true, 'You are signed-in!')
      router.push('/')
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'email'}
      />
      <PasswordField
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'password'}
      />
      <Button
        disabled={signInMutationState.loading}
        onClick={(): void => {
          setValidateFields(true)
          signInMutation()
        }}
      >
        {'Sign In'}
      </Button>
      <Button
        disabled={signInMutationState.loading}
        onClick={(): void => {
          router.push(
            `${type === UserType.ADMINISTRATOR ? '/admin' : ''}/user/sign-up`
          )
        }}
      >
        {'Sign Up'}
      </Button>
      <Button
        disabled={signInMutationState.loading}
        onClick={(): void => {
          router.push(
            `${type === UserType.ADMINISTRATOR ? '/admin' : ''}/user/forgot-password`
          )
        }}
      >
        {'Forgot Password'}
      </Button>
    </>
  )
}

export default SignInUser
