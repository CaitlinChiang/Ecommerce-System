import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GetCart } from './query'
import styles from '../../../styles/cart'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Typography
} from '@mui/material'
import { Cart, CartItem } from '../../../../types/cart'
import EditItemQuantity from '../EditQuantity'
import RemoveCartItem from '../Remove'
import { formatNumber } from '../../../_utils/handleFormat/formatNumber'
import { formatPrice } from '../../../_utils/handleFormat/formatPrice'

const Cart = (): ReactElement => {
  const router = useRouter()

  const { data, loading, refetch } = useQuery(GetCart)
  const cart: Cart = data?.get_cart || {}

  const itemRows = cart?.items?.map((cartItem: CartItem): ReactElement => {
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
        <Typography>{`P${formatPrice(totalPrice)}`}</Typography>
        <EditItemQuantity
          productId={product?._id}
          productVariantId={productVariant?._id}
          quantity={quantity}
        />
        <RemoveCartItem
          productId={product?._id}
          productVariantId={productVariant?._id}
          refetch={refetch}
        />
        <Divider />
      </>
    )
  })

  return (
    <>
      {loading && <CircularProgress />}
      <Container>
        {itemRows}
        <Typography>{`Total  P${formatPrice(cart?.totalPrice)}`}</Typography>
      </Container>
      <Container sx={styles.bottomContainer}>
        <Typography>{'Total'}</Typography>
        <Typography>{`Quantity: ${formatNumber(cart?.quantity)}`}</Typography>
        <Typography>{`Amount Due P${formatPrice(cart?.totalPrice)}`}</Typography>
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
