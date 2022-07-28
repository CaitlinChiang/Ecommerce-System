import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetProduct } from './query'
import { GetProductVariant } from '../../productVariants/View/query'
import styles from '../../../styles/products'
import { Box, Typography } from '@mui/material'
import { Product } from '../../../../types/product'
import { ProductVariant } from '../../../../types/productVariant'
import NumberIncrementor from '../../_common/NumberIncrementor'
import ProductVariantCards from '../../productVariants/View/cards'
import AddCartItem from '../../cart/Add'
import { formatToPercentage } from '../../../_utils/handleFormatting/formatToPercentage'
import { formatDiscountedPrice } from '../../../_utils/handleFormatting/formatDiscountedPrice'
import { formatNumber } from '../../../_utils/handleFormatting/formatNumber'
import { calculateTotalPrice } from '../../../_utils/handleData/calculateTotalPrice'

const globalAny: any = global

const ProductPage = ({ _id }: { _id: string }): ReactElement => {
  const [args, setArgs] = useState<any>({ quantity: 1 })
  const [productVariantId, setProductVariantId] = useState<string>(null)

  globalAny.setProductVariantId = (productVariantId: string): void => {
    setProductVariantId(productVariantId)
  }

  const { data: ProductData } = useQuery(GetProduct, {
    variables: { _id }
  })
  const { data: ProductVariantData } = useQuery(GetProductVariant, {
    variables: { _id: productVariantId }
  })

  const product: Product = ProductData?.get_product || {}
  const productVariant: ProductVariant =
    ProductVariantData?.get_product_variant || null

  const item: ProductVariant | Product = productVariant || product

  return (
    <>
      <Typography>{item?.name}</Typography>
      <Typography>{item?.description}</Typography>
      <Typography>{formatDiscountedPrice(item?.discount, item?.price)}</Typography>
      {item?.discount && (
        <Typography>
          {`P${item?.price?.toFixed(2)} -${formatToPercentage(item?.discount)}`}
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
      <NumberIncrementor args={args} setArgs={setArgs} targetProp={'quantity'} />
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
