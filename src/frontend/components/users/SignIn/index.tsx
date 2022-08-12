import Cookies from 'js-cookie'
import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import { SignInUserArgs } from '../../../../types/user'
import { UserType } from '../../../_enums/userType'
import Text from '../../_common/TextField'
import PasswordField from '../../_common/PasswordField'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { generateAdminUrl } from '../../../_utils/auth/generateAdminUrl'

const globalAny: any = global

const SignInUser = ({ type }: { type: UserType }): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<SignInUserArgs>({
    email: null,
    password: null,
    type
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [signInMutation, signInMutationState] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: (data) => {
      globalAny.setNotification(true, 'You are signed-in!')
      Cookies.set('accessToken', data.sign_in_user)
      router.push(`${generateAdminUrl(type)}/`)
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
          router.push(`${generateAdminUrl(type)}/user/sign-up`)
        }}
      >
        {'Sign Up'}
      </Button>
      <Button
        disabled={signInMutationState.loading}
        onClick={(): void => {
          router.push(`${generateAdminUrl(type)}/user/forgot-password`)
        }}
      >
        {'Forgot Password'}
      </Button>
    </>
  )
}

export default SignInUser
