import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetCart } from '../../cart/View/query'
import { GetCity } from '../../cities/View/query'
import { Divider, Typography } from '@mui/material'
import { Cart, CartItem } from '../../../../types/cart'
import { City } from '../../../../types/city'
import { formatPrice } from '../../../_utils/handleFormatting/formatPrice'

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
            <Typography>{`P${formatPrice(totalPrice)}`}</Typography>
            <Divider />
          </>
        )
      })}
      <Typography>
        {`Subtotal (${cart?.quantity} items) P${formatPrice(cart?.totalPrice)}`}
      </Typography>
      <Typography>{`Shipping Fee P${formatPrice(city?.shippingFee)}`}</Typography>
      <Divider />
      <Typography>
        {`Total Amount Due P${formatPrice(cart?.totalPrice + city?.shippingFee)})}`}
      </Typography>
    </>
  )
}

export default OrderSummary
