import Cookies from 'js-cookie'
import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import Text from '../../_common/TextField'
import PasswordField from '../../_common/PasswordField'

const SignInUser = (): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<any>({
    email: null,
    password: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [signInMutation, signInMutationState] = useMutation(mutation, {
    variables: args,
    onCompleted: (data) => {
      Cookies.set('accessToken', data.sign_in_user)
      console.log('User successfully signed in!')
      router.push('/')
    },
    onError: (error) => console.log(error.message)
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
      />
      <Button
        onClick={() => {
          setValidateFields(true)
          signInMutation()
        }}
        disabled={signInMutationState.loading}
      >
        {'Sign In'}
      </Button>
    </>
  )
}

export default SignInUser
