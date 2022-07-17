import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import query from '../../cart/Showcase/query'
import { querySingular } from '../../cities/Showcase/query'
import { Divider, Typography } from '@mui/material'
import { CartItem } from '../../../../types/cart'

const OrderSummary = (): ReactElement => {
  const { data: cartData } = useQuery(query)
  const { data: cityData } = useQuery(querySingular)

  const cart = cartData?.get_cart || {}
  const city = cityData?.get_city || {}

  return (
    <>
      <Typography variant={'h5'}>{'Order Summary'}</Typography>
      {cart?.items?.map((cartItem: CartItem): ReactElement => {
        return (
          <>
            <Typography variant={'h6'}>{cartItem?.product?.name}</Typography>
            <Typography variant={'body1'}>
              {cartItem?.productVariant?.name}
            </Typography>
            <Typography variant={'body1'}>{'Qty: ' + cartItem?.quantity}</Typography>
            <Typography variant={'body1'}>
              {'P' + cartItem?.totalPrice?.toFixed(2)}
            </Typography>
            <Divider />
          </>
        )
      })}
      <Typography variant={'h6'}>
        {`Subtotal (${cart?.quantity} items)` + `P ${cart?.totalPrice?.toFixed(2)}`}
      </Typography>
      <Typography variant={'h6'}>
        {'Shipping Fee' + `P ${city?.shippingFee?.toFixed(2)}`}
      </Typography>
      <Divider />
      <Typography variant={'h6'}>
        {'Total Amount Due' +
          `P ${(cart?.totalPrice + city?.shippingFee)?.toFixed(2)}`}
      </Typography>
    </>
  )
}

export default OrderSummary
