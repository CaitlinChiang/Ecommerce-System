import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetProduct } from './query'
import styles from '../../../styles/products'
import { Box, Typography } from '@mui/material'
import { Product } from '../../../../types/product'
import ProductVariantCards from '../../productVariants/View/cards'
import { formatToPercentage } from '../../../_utils/handleFormatting/formatToPercentage'
import { formatDiscountedPrice } from '../../../_utils/handleFormatting/formatDiscountedPrice'
import { formatNumber } from '../../../_utils/handleFormatting/formatNumber'

const ProductPage = ({ _id }: { _id: string }): ReactElement => {
  const { data } = useQuery(GetProduct, { variables: { _id } })

  const product: Product = data?.get_product || {}

  return (
    <>
      <Typography>{product?.name}</Typography>
      <Typography>{product?.description}</Typography>
      <Typography>{product?.description}</Typography>
      <Typography>
        {formatDiscountedPrice(product?.discount, product?.price)}
      </Typography>
      {product?.discount && (
        <Typography>
          {`P${product?.price?.toFixed(2)} -${formatToPercentage(
            product?.discount
          )}`}
        </Typography>
      )}
      <Typography>{`Stock: ${formatNumber(
        product?.stockQuantity
      )} Left`}</Typography>
      {product?.expirationDate && (
        <Typography>{`Expires At: ${String(product?.expirationDate)}`}</Typography>
      )}
      <Box
        component='img'
        alt={`${product?.name} Product Image`}
        src={product?.imageUrl}
        sx={styles.image}
      />
      <ProductVariantCards _productId={product._id} />
    </>
  )
}

export default ProductPage
