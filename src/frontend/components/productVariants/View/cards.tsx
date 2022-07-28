import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetProductVariants } from './query'
import { Typography } from '@mui/material'
import { ObjectId } from 'mongodb'
import { ProductVariant } from '../../../../types/productVariant'
import { SortDirection } from '../../../_enums/sortDirection'
import CardComponent from '../../_common/CardComponent'

const ProductVariantCards = ({
  _productId
}: {
  _productId: ObjectId
}): ReactElement => {
  const args: any = { _productId, showPublic: true }

  const { data } = useQuery(GetProductVariants, {
    variables: {
      ...args,
      paginateData: { sortBy: 'name', sortDirection: SortDirection.ASC }
    }
  })

  const productVariants: ProductVariant[] = data?.get_product_variants || []

  const ProductVariantCards = [
    productVariants?.map((productVariant: ProductVariant): ReactElement => {
      return (
        <CardComponent
          content={<Typography>{productVariant?.name}</Typography>}
          imageAlt={`${productVariant?.name} Product Variant Image`}
          imageSource={productVariant?.imageUrl}
          productVariantId={String(productVariant._id)}
        />
      )
    })
  ]

  return <>{ProductVariantCards}</>
}

export default ProductVariantCards
