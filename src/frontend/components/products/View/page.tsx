import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetProduct } from './query'
import { GetProductVariant } from '../../productVariants/View/query'
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Typography
} from '@mui/material'
import { Product } from '../../../../types/product'
import { ProductVariant } from '../../../../types/productVariant'
import { CartItem } from '../../../../types/cart'
import NumberIncrementor from '../../_common/NumberIncrementor'
import ProductVariantCards from '../../productVariants/View/cards'
import AddCartItem from '../../cart/Add'
import { formatToPercentage } from '../../../_utils/handleFormat/formatToPercentage'
import { formatDiscountedPrice } from '../../../_utils/handleFormat/formatDiscountedPrice'
import { formatNumber } from '../../../_utils/handleFormat/formatNumber'
import { formatPrice } from '../../../_utils/handleFormat/formatPrice'
import { calculateTotalPrice } from '../../../_utils/handleData/calculateTotalPrice'

const globalAny: any = global

const ProductPage = ({ _id }: { _id: string }): ReactElement => {
  const [args, setArgs] = useState<CartItem>({ quantity: 1 })
  const [productVariantId, setProductVariantId] = useState<string>(null)

  globalAny.setProductVariantId = (productVariantId: string): void => {
    setProductVariantId(productVariantId)
  }

  const { data: productData, loading: productLoading } = useQuery(GetProduct, {
    skip: !_id,
    variables: { _id }
  })
  const product: Product = productData?.get_product || {}

  const { data: productVariantData, loading: productVariantLoading } = useQuery(
    GetProductVariant,
    {
      skip: !productVariantId,
      variables: { _id: productVariantId }
    }
  )
  const productVariant: ProductVariant =
    productVariantData?.get_product_variant || null

  const item: ProductVariant | Product = productVariant || product

  return (
    <>
      {(productLoading || productVariantLoading) && <CircularProgress />}
      <Card>
        <CardContent>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} lg={5}>
              <Box sx={{ paddingRight: { xs: 0, lg: '50px' } }}>
                <Box
                  sx={{
                    flexGrow: 1,
                    position: 'relative',
                    margin: {
                      sm: '0 auto',
                      xs: '0 auto',
                      lg: 'unset'
                    }
                  }}
                >
                  <Box
                    alt={`${item?.name} Product Image`}
                    component='img'
                    src={item?.imageUrl}
                    sx={{
                      display: 'block',
                      maxWidth: '100%',
                      overflow: 'hidden',
                      width: '100%',
                      borderRadius: '10px',
                      marginBottom: 2
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={7}>
              <Box>
                <Box alignItems={'center'} display={'flex'}>
                  <Chip
                    label={product?.category}
                    color='success'
                    sx={{
                      borderRadius: '6px',
                      backgroundColor: (theme) => theme.palette.success.main,
                      pl: '8px',
                      pr: '8px',
                      pt: '3px',
                      pb: '3px',
                      color: '#fff',
                      height: 'unset',
                      mr: '10px',
                      '& .MuiChip-label': {
                        pl: 0,
                        pr: 0
                      }
                    }}
                  />
                </Box>
                <Typography
                  fontWeight={'600'}
                  sx={{
                    fontSize: { xs: '24px', sm: '30px', lg: '30px' },
                    mt: '5px'
                  }}
                >
                  {item?.name}
                </Typography>
                <Typography
                  fontWeight={'400'}
                  sx={{
                    mt: '10px',
                    color: (theme) => theme.palette.grey.A200
                  }}
                  variant={'body1'}
                >
                  {item?.expirationDate &&
                    `Expires At: ${String(item?.expirationDate)}`}
                  <br /> <br />
                  {item?.description}
                </Typography>
                <Typography
                  fontWeight={'500'}
                  sx={{
                    fontSize: { xs: '24px', sm: '30px', lg: '30px' },
                    mt: '5px',
                    marginTop: 2
                  }}
                >
                  {formatDiscountedPrice(item?.discount, item?.price)}
                </Typography>
                {item?.discount && (
                  <Typography
                    fontWeight={'400'}
                    sx={{ mt: '10px', color: (theme) => theme.palette.grey.A200 }}
                    variant={'body1'}
                  >
                    {`P${formatPrice(item?.price)} -${formatToPercentage(
                      item?.discount
                    )}`}
                  </Typography>
                )}
                <Box alignItems={'center'} display={'flex'} sx={{ mt: 4, mb: 4 }}>
                  <Typography variant={'h5'}>Variants</Typography>
                  <ProductVariantCards _productId={product._id} />
                </Box>
                <Divider />
                <Box sx={{ pt: 3, pb: 3 }}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Box display='flex' alignItems='center'>
                        <Typography
                          sx={{ marginTop: 0.8 }}
                          variant={'h5'}
                        >{`Stock: ${formatNumber(
                          item?.stockQuantity
                        )} Left`}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Box display='flex' alignItems='center'>
                        <Typography variant={'h5'}>{'Quantity: '}</Typography>
                        <Box sx={{ ml: 2, width: '180px' }}>
                          <NumberIncrementor
                            args={args}
                            setArgs={setArgs}
                            stockQuantity={item?.stockQuantity}
                            targetProp={'quantity'}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Divider sx={{ marginBottom: 3 }} />
                <AddCartItem
                  args={{
                    item: {
                      productId: product._id,
                      productVariantId: productVariant?._id,
                      quantity: args.quantity,
                      totalPrice: calculateTotalPrice(item.price, args.quantity)
                    }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default ProductPage
