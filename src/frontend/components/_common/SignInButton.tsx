import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'

const SignInButton = (): ReactElement => {
  const router = useRouter()

  return (
    <Button
      onClick={(): void => {
        router.push('/user/sign-in')
      }}
    >
      {'Sign In'}
    </Button>
  )
}

export default SignInButton
