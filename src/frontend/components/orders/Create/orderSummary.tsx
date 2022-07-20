import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetCart } from '../../cart/Showcase/query'
import { GetCity } from '../../cities/Showcase/query'
import { Divider, Typography } from '@mui/material'
import { Cart, CartItem } from '../../../../types/cart'
import { City } from '../../../../types/city'

const OrderSummary = (): ReactElement => {
  const { data: cartData } = useQuery(GetCart)
  const { data: cityData } = useQuery(GetCity)

  const cart: Cart = cartData?.get_cart || {}
  const city: City = cityData?.get_city || {}

  return (
    <>
      <Typography>{'Order Summary'}</Typography>
      {cart?.items?.map((cartItem: CartItem): ReactElement => {
        const { product, productVariant, quantity, totalPrice } = cartItem
        return (
          <>
            <Typography>{product?.name}</Typography>
            <Typography>{productVariant?.name}</Typography>
            <Typography>{`Qty: ${quantity}`}</Typography>
            <Typography>{`P${totalPrice?.toFixed(2)}`}</Typography>
            <Divider />
          </>
        )
      })}
      <Typography>
        {`Subtotal (${cart?.quantity} items) P${cart?.totalPrice?.toFixed(2)}`}
      </Typography>
      <Typography>
        {`Shipping Fee P${city?.shippingFee?.toFixed(2) || '0.00'}`}
      </Typography>
      <Divider />
      <Typography>
        {`Total Amount Due P${(cart?.totalPrice + city?.shippingFee || 0)?.toFixed(
          2
        )}`}
      </Typography>
    </>
  )
}

export default OrderSummary
