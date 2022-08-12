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
import { Product } from '../../../../types/product'
import { ProductVariant } from '../../../../types/productVariant'
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
    const item: ProductVariant | Product = productVariant || product

    return (
      <>
        <Box
          component='img'
          sx={styles.image}
          alt={`${item?.name} Product Photo`}
          src={item?.imageUrl}
        />
        <Typography>{product?.name}</Typography>
        <Typography>{productVariant?.name}</Typography>
        <Typography>{`P${formatPrice(totalPrice)}`}</Typography>
        <EditItemQuantity
          productId={product?._id}
          productVariantId={productVariant?._id}
          stockQuantity={item?.stockQuantity}
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
          disabled={!cart?.items || cart?.items?.length === 0}
          onClick={(): void => {
            router.push('/payment')
          }}
          sx={styles.button}
        >
          {'Proceed to Checkout'}
        </Button>
        <Button
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
