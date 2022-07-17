import { ReactElement } from 'react'
import { Container, Link, Typography } from '@mui/material'

const OrderSuccess = (): ReactElement => {
  return (
    <Container>
      <Typography variant={'h6'}>{'Order Successful!'}</Typography>
      <Typography variant={'body1'}>
        {
          'Please check your email for the order receipt. You may also track your order '
        }
      </Typography>
      <Link href={'/orders'}>{' here.'}</Link>
    </Container>
  )
}

export default OrderSuccess
