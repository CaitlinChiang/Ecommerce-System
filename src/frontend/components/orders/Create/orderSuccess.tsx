import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button, Container, Link, Typography } from '@mui/material'

const OrderSuccess = (): ReactElement => {
  const router = useRouter()

  return (
    <Container>
      <Typography variant={'h6'}>{'Order Successful!'}</Typography>
      <Typography variant={'body1'}>
        {
          'Please check your email for the order receipt. You may also track your order '
        }
      </Typography>
      <Link href={'/orders'}>{' here.'}</Link>
      <Button onClick={() => router.push('/')}>{'Return to Home'}</Button>
    </Container>
  )
}

export default OrderSuccess
