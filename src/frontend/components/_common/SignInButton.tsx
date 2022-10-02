import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'

const SignInButton = (): ReactElement => {
  const router = useRouter()

  return (
    <Button
      color={'secondary'}
      onClick={(): void => {
        router.push('/user/sign-in')
      }}
      size={'large'}
      sx={{ pt: '10px', pb: '10px' }}
      variant={'contained'}
    >
      {'Sign In'}
    </Button>
  )
}

export default SignInButton
