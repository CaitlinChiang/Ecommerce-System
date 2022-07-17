import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import theme from '../../../themes'
import { useQuery } from '@apollo/client'
import query from './query'
import { Box, Button, Container, Divider, Typography } from '@mui/material'
import { CartItem } from '../../../../types/cart'
import EditItemQuantity from '../EditQuantity'

const Cart = (): ReactElement => {
  const router = useRouter()

  const { data, refetch } = useQuery(query)

  const cart = data?.get_cart || {}

  return (
    <>
      <Container>
        {cart?.items?.map((cartItem: CartItem): ReactElement => {
          return (
            <>
              <Box
                component='img'
                sx={{
                  height: 233,
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 }
                }}
                alt='The house from the offer.'
                src={
                  cartItem?.productVariant?.imageUrl || cartItem?.product?.imageUrl
                }
              />
              <Typography variant={'h6'}>{cartItem?.product?.name}</Typography>
              <Typography variant={'body1'}>
                {cartItem?.productVariant?.name}
              </Typography>
              <Typography variant={'h6'}>
                {'P' + cartItem?.totalPrice?.toFixed(2)}
              </Typography>
              <EditItemQuantity
                productId={cartItem?.productId}
                productVariantId={cartItem?.productVariantId}
                quantity={cartItem?.quantity}
                refetch={refetch}
              />
              <Divider />
            </>
          )
        })}
        <Typography variant={'h6'}>{'Total  P' + cart?.totalPrice}</Typography>
      </Container>
      <Container sx={{ marginTop: 10 }}>
        <Typography variant={'h6'}>{'Total'}</Typography>
        <Typography variant={'h6'}>{'Quantity ' + cart?.quantity}</Typography>
        <Typography variant={'h6'}>{'Amount Due P' + cart?.totalPrice}</Typography>
        <Button
          color={'primary'}
          onClick={(): void => {
            router.push('/payment')
          }}
          sx={{
            [theme.breakpoints.down('sm')]: {
              marginTop: theme.spacing(1)
            }
          }}
        >
          {'Proceed to Checkout'}
        </Button>
        <Button
          color={'primary'}
          onClick={(): void => {
            router.push('/shop')
          }}
          sx={{
            [theme.breakpoints.down('sm')]: {
              marginTop: theme.spacing(1)
            }
          }}
        >
          {'Continue Shopping'}
        </Button>
      </Container>
    </>
  )
}

export default Cart
