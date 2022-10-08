import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GetCart } from './query'
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography
} from '@mui/material'
import { Cart, CartItem } from '../../../../types/cart'
import { Product } from '../../../../types/product'
import { ProductVariant } from '../../../../types/productVariant'
import EditItemQuantity from '../EditQuantity'
import RemoveCartItem from '../Remove'
import GridItem from '../../_common/GridItem'
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
      <Box
        sx={{
          align: 'center',
          border: 1,
          borderColor: '#e4e4e4',
          borderRadius: 3,
          direction: 'column',
          marginTop: 2,
          padding: 1.5
        }}
      >
        <Grid container spacing={'2'}>
          <GridItem
            xs={2}
            content={
              <Box
                alt={`${item?.name} Product Photo`}
                component={'img'}
                src={item?.imageUrl}
                sx={{ height: '80px', width: '120px' }}
              />
            }
          />
          <GridItem
            xs={3}
            content={
              <>
                <Typography variant={'h5'}>{product?.name}</Typography>
                <Typography color={'#707070'} variant={'h6'}>
                  {productVariant?.name}
                </Typography>
              </>
            }
          />
          <GridItem
            xs={2}
            content={
              <Typography variant={'h5'}>{`P${formatPrice(
                item?.price
              )}`}</Typography>
            }
          />
          <GridItem
            xs={2.5}
            content={
              <EditItemQuantity
                productId={product?._id}
                productVariantId={productVariant?._id}
                stockQuantity={item?.stockQuantity}
                quantity={quantity}
              />
            }
          />
          <GridItem
            xs={2}
            content={
              <Typography variant={'h5'}>{`P${formatPrice(totalPrice)}`}</Typography>
            }
          />
          <GridItem
            content={
              <RemoveCartItem
                productId={product?._id}
                productVariantId={productVariant?._id}
                refetch={refetch}
              />
            }
          />
        </Grid>
      </Box>
    )
  })

  return (
    <>
      {loading && <CircularProgress />}
      <Card>
        <CardContent>
          <Grid container spacing={'2'} sx={{ padding: 1 }}>
            <Grid item xs={2} md={2} lg={2} />
            <Grid item xs={3} md={3} lg={3}>
              <Typography variant={'h4'}>{'Product'}</Typography>
            </Grid>
            <Grid item xs={2} md={2} lg={2}>
              <Typography variant={'h4'}>{'Price'}</Typography>
            </Grid>
            <Grid item xs={2} md={2.5} lg={2.5}>
              <Typography variant={'h4'}>{'Quantity'}</Typography>
            </Grid>
            <Grid item xs={1} md={1.5} lg={1}>
              <Typography variant={'h4'}>{'Total'}</Typography>
            </Grid>
          </Grid>
          {itemRows}
        </CardContent>
      </Card>
      <Grid container>
        <Grid item xs={12} md={6} lg={6} />
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Typography
                sx={{ marginBottom: 2 }}
                variant={'h4'}
              >{`Items: ${formatNumber(cart?.quantity)}`}</Typography>
              <Typography
                sx={{ marginBottom: 2 }}
                variant={'h4'}
              >{`Total: P${formatPrice(cart?.totalPrice)}`}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                  <Button
                    color={'secondary'}
                    fullWidth
                    onClick={(): void => {
                      router.push('/shop')
                    }}
                    variant={'contained'}
                  >
                    {'Continue Shopping'}
                  </Button>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Button
                    color={'primary'}
                    disabled={!cart?.items || cart?.items?.length === 0}
                    fullWidth
                    onClick={(): void => {
                      router.push('/payment')
                    }}
                    variant={'contained'}
                  >
                    {'Checkout'}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Cart
