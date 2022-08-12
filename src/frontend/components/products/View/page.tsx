import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetProduct } from './query'
import { GetProductVariant } from '../../productVariants/View/query'
import styles from '../../../styles/products'
import { Box, CircularProgress, Typography } from '@mui/material'
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
      <Typography>{item?.name}</Typography>
      <Typography>{item?.description}</Typography>
      <Typography>{formatDiscountedPrice(item?.discount, item?.price)}</Typography>
      {item?.discount && (
        <Typography>
          {`P${formatPrice(item?.price)} -${formatToPercentage(item?.discount)}`}
        </Typography>
      )}
      <Typography>{`Stock: ${formatNumber(item?.stockQuantity)} Left`}</Typography>
      {item?.expirationDate && (
        <Typography>{`Expires At: ${String(item?.expirationDate)}`}</Typography>
      )}
      <Box
        component='img'
        alt={`${item?.name} Product Image`}
        src={item?.imageUrl}
        sx={styles.image}
      />
      <ProductVariantCards _productId={product._id} />
      <NumberIncrementor
        args={args}
        setArgs={setArgs}
        stockQuantity={item?.stockQuantity}
        targetProp={'quantity'}
      />
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
    </>
  )
}

export default ProductPage
