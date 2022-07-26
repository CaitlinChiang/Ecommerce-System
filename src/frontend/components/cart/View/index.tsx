import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GetCart } from './query'
import styles from '../../../styles/cart'
import { Box, Button, Container, Divider, Typography } from '@mui/material'
import { Cart, CartItem } from '../../../../types/cart'
import EditItemQuantity from '../EditQuantity'
import RemoveCartItem from '../Remove'

const Cart = (): ReactElement => {
  const router = useRouter()

  const { data, refetch } = useQuery(GetCart)

  const cart: Cart = data?.get_cart || {}

  return (
    <>
      <Container>
        {cart?.items?.map((cartItem: CartItem): ReactElement => {
          const { product, productVariant, quantity, totalPrice } = cartItem
          return (
            <>
              <Box
                component='img'
                sx={styles.image}
                alt={`${productVariant?.name || product?.name} Product Photo`}
                src={productVariant?.imageUrl || product?.imageUrl}
              />
              <Typography>{product?.name}</Typography>
              <Typography>{productVariant?.name}</Typography>
              <Typography>{`P${totalPrice?.toFixed(2)}`}</Typography>
              <EditItemQuantity
                productId={cartItem?.productId}
                productVariantId={cartItem?.productVariantId}
                quantity={quantity}
                refetch={refetch}
              />
              <RemoveCartItem
                productId={cartItem?.productId}
                productVariantId={cartItem?.productVariantId}
                refetch={refetch}
              />
              <Divider />
            </>
          )
        })}
        <Typography>{`Total  P${cart?.totalPrice?.toFixed(2)}`}</Typography>
      </Container>
      <Container sx={styles.bottomContainer}>
        <Typography>{'Total'}</Typography>
        <Typography>{'Quantity ' + cart?.quantity}</Typography>
        <Typography>{'Amount Due P' + cart?.totalPrice}</Typography>
        <Button
          color={'primary'}
          onClick={(): void => {
            router.push('/payment')
          }}
          sx={styles.button}
        >
          {'Proceed to Checkout'}
        </Button>
        <Button
          color={'primary'}
          onClick={(): void => {
            router.push('/shop')
          }}
          sx={styles.button}
        >
          {'Continue Shopping'}
        </Button>
      </Container>
    </>
  )
}

export default Cart