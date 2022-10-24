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
  Divider,
  Grid,
  Typography,
  useMediaQuery
} from '@mui/material'
import { theme } from '../../../themes'
import { Cart, CartItem } from '../../../../types/cart'
import { Product } from '../../../../types/product'
import { ProductVariant } from '../../../../types/productVariant'
import EditItemQuantity from '../EditQuantity'
import RemoveCartItem from '../Remove'
import { CartGridItem } from '../../_common/GridItem'
import { formatNumber } from '../../../_utils/handleFormat/formatNumber'
import { formatPrice } from '../../../_utils/handleFormat/formatPrice'

const Cart = (): ReactElement => {
  const router = useRouter()

  const { data, loading, refetch } = useQuery(GetCart)
  const cart: Cart = data?.get_cart || {}

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const itemRows = cart?.items?.map((cartItem: CartItem): ReactElement => {
    const { product, productVariant, quantity, totalPrice } = cartItem
    const item: ProductVariant | Product = productVariant || product

    if (isMobile) {
      return (
        <>
          <Box display='flex' alignItems='center' sx={{ pb: 3 }}>
            <Box
              alt={`${item?.name} Product Photo`}
              component={'img'}
              src={item?.imageUrl}
              sx={{ height: '90px', width: '130px' }}
            />
            <Box sx={{ ml: 7 }}>
              <Typography variant={'h5'}>{product?.name}</Typography>
              <Typography color={'textSecondary'} variant={'h6'}>
                {productVariant?.name}
              </Typography>
              <Typography sx={{ mt: 1.5 }} variant={'h5'}>{`Total: P${formatPrice(
                totalPrice
              )}`}</Typography>
              <Box sx={{ mt: 1.5 }}>
                <EditItemQuantity
                  productId={product?._id}
                  productVariantId={productVariant?._id}
                  stockQuantity={item?.stockQuantity}
                  quantity={quantity}
                />
              </Box>
            </Box>
            <Box sx={{ ml: 10 }}>
              <RemoveCartItem
                productId={product?._id}
                productVariantId={productVariant?._id}
                refetch={refetch}
              />
            </Box>
          </Box>
          <Divider sx={{ mb: 3 }} />
        </>
      )
    }

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
          <CartGridItem
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
          <CartGridItem
            xs={3}
            content={
              <>
                <Typography variant={'h5'}>{product?.name}</Typography>
                <Typography color={'textSecondary'} variant={'h6'}>
                  {productVariant?.name}
                </Typography>
              </>
            }
          />
          <CartGridItem
            xs={2}
            content={
              <Typography variant={'h5'}>{`P${formatPrice(
                item?.price
              )}`}</Typography>
            }
          />
          <CartGridItem
            xs={2}
            content={
              <EditItemQuantity
                productId={product?._id}
                productVariantId={productVariant?._id}
                stockQuantity={item?.stockQuantity}
                quantity={quantity}
              />
            }
          />
          <CartGridItem
            xs={2}
            content={
              <Typography variant={'h5'}>{`P${formatPrice(totalPrice)}`}</Typography>
            }
          />
          <CartGridItem
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
          {!isMobile && (
            <Grid container spacing={'2'} sx={{ padding: 1 }}>
              <Grid item xs={2} md={2} lg={2} />
              <Grid item xs={3} md={3} lg={3}>
                <Typography variant={'h4'}>{'Product'}</Typography>
              </Grid>
              <Grid item xs={2} md={2} lg={2}>
                <Typography variant={'h4'}>{'Price'}</Typography>
              </Grid>
              <Grid item xs={2} md={2} lg={2}>
                <Typography variant={'h4'}>{'Quantity'}</Typography>
              </Grid>
              <Grid item xs={1} md={1.5} lg={1}>
                <Typography variant={'h4'}>{'Total'}</Typography>
              </Grid>
            </Grid>
          )}
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
