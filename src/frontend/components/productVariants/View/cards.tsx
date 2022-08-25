import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetProductVariants } from './query'
import { CircularProgress, Typography } from '@mui/material'
import { ObjectId } from 'mongodb'
import {
  ProductVariant,
  GetProductVariantArgs
} from '../../../../types/productVariant'
import { SortDirection } from '../../../_enums/sortDirection'
import CardComponent from '../../_common/CardComponent'

const ProductVariantCards = ({
  _productId
}: {
  _productId: ObjectId
}): ReactElement => {
  const args: GetProductVariantArgs = { _productId, showPublic: true }

  const { data, loading } = useQuery(GetProductVariants, {
    skip: !_productId,
    variables: {
      ...args,
      paginateData: { sortBy: 'name', sortDirection: SortDirection.ASC }
    }
  })
  const productVariants: ProductVariant[] = data?.get_product_variants || []

  const productVariantCards = [
    productVariants?.map((productVariant: ProductVariant): ReactElement => {
      const { _id, imageUrl, name } = productVariant

      if (imageUrl?.includes('products/')) {
        return (
          <CardComponent
            content={<Typography>{name}</Typography>}
            productVariantId={String(_id)}
          />
        )
      }

      return (
        <CardComponent
          content={<Typography>{name}</Typography>}
          imageAlt={`${name} Product Variant Image`}
          imageSource={imageUrl}
          productVariantId={String(_id)}
        />
      )
    })
  ]

  return (
    <>
      {loading && <CircularProgress />}
      {productVariantCards}
    </>
  )
}

export default ProductVariantCards
