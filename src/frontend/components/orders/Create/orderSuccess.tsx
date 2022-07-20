import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button, Container, Link, Typography } from '@mui/material'

const OrderSuccess = (): ReactElement => {
  const router = useRouter()

  return (
    <Container>
      <Typography>{'Order Successful!'}</Typography>
      <Typography>
        {
          'Please check your email for the order receipt. You may also track your order '
        }
      </Typography>
      <Link href={'/orders'}>{' here.'}</Link>
      <Button
        onClick={(): void => {
          router.push('/')
        }}
      >
        {'Return to Home'}
      </Button>
    </Container>
  )
}

export default OrderSuccess
