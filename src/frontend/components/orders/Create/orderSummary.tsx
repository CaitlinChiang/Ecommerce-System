import { ReactElement } from 'react'
import { Divider, Typography } from '@mui/material'
import { Cart, CartItem } from '../../../../types/cart'
import { City } from '../../../../types/city'
import { formatNumber } from '../../../_utils/handleFormat/formatNumber'
import { formatPrice } from '../../../_utils/handleFormat/formatPrice'

const OrderSummary = ({ cart, city }: { cart: Cart; city: City }): ReactElement => {
  return (
    <>
      <Typography>{'Order Summary'}</Typography>
      {cart?.items?.map((cartItem: CartItem): ReactElement => {
        const { product, productVariant, quantity, totalPrice } = cartItem

        return (
          <>
            <Typography>{product?.name}</Typography>
            <Typography>{productVariant?.name}</Typography>
            <Typography>{`Qty: ${formatNumber(quantity)}`}</Typography>
            <Typography>{`P${formatPrice(totalPrice)}`}</Typography>
            <Divider />
          </>
        )
      })}
      <Typography>
        {`Subtotal (${formatNumber(cart?.quantity)} items) P${formatPrice(
          cart?.totalPrice
        )}`}
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
