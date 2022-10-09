import { ReactElement } from 'react'
import { Box, Typography } from '@mui/material'
import { Cart, CartItem } from '../../../../types/cart'
import { City } from '../../../../types/city'
import {
  CheckoutProductGridItem,
  CheckoutSummaryGridItem
} from '../../_common/GridItem'
import { formatNumber } from '../../../_utils/handleFormat/formatNumber'
import { formatPrice } from '../../../_utils/handleFormat/formatPrice'

const OrderSummary = ({ cart, city }: { cart: Cart; city: City }): ReactElement => {
  return (
    <>
      <Typography sx={{ marginBottom: 5 }} variant={'h2'}>
        {'Order Summary'}
      </Typography>
      {cart?.items?.map((cartItem: CartItem): ReactElement => {
        const { product, productVariant, quantity, totalPrice } = cartItem

        return (
          <CheckoutProductGridItem
            productName={product?.name}
            productVariantName={productVariant?.name}
            quantity={`Qty: ${formatNumber(quantity)}`}
            totalPrice={`P${formatPrice(totalPrice)}`}
          />
        )
      })}
      <CheckoutSummaryGridItem
        contentLeft={'Subtotal'}
        contentRight={`P${formatPrice(cart?.totalPrice)}`}
      />
      <CheckoutSummaryGridItem
        contentLeft={'Shipping Fee'}
        contentRight={`P${formatPrice(city?.shippingFee)}`}
      />
      <Box sx={{ marginTop: 2 }} />
      <CheckoutSummaryGridItem
        contentLeft={'Total Due'}
        contentRight={`P${formatPrice(cart?.totalPrice + (city?.shippingFee || 0))}`}
      />
    </>
  )
}

export default OrderSummary
