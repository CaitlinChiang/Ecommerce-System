import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetProducts } from './query'
import { Typography } from '@mui/material'
import { Product } from '../../../../types/product'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { SortDirection } from '../../../_enums/sortDirection'
import { StockQuantityOperator } from '../../../_enums/stockQuantityOperator'
import CardComponent from '../../_common/CardComponent'
import ProductCardsFilters from './cardsFilters'
import CardsPaginationComponent from '../../_common/CardsPaginationComponent'
import { fetchMoreArgs } from '../../../_utils/handleArgs/returnFetchMoreArgs'
import { formatDiscountedPrice } from '../../../_utils/handleFormat/formatDiscountedPrice'
import { formatPrice } from '../../../_utils/handleFormat/formatPrice'
import { formatToPercentage } from '../../../_utils/handleFormat/formatToPercentage'

const ProductCards = ({ featured }: { featured: boolean }): ReactElement => {
  const [args, setArgs] = useState<any>({
    categoryIds: [],
    featured: featured ? true : null,
    showPublic: true,
    stockQuantity: {
      operator: StockQuantityOperator.ABOVE,
      value1: 0,
      value2: null
    }
  })
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'name',
    sortDirection: SortDirection.ASC
  })

  const { data, loading, fetchMore } = useQuery(GetProducts, {
    variables: {
      ...args,
      paginateData: {
        ...paginateDataArgs,
        page: featured ? null : paginateDataArgs?.page,
        rowsPerPage: featured ? null : paginateDataArgs?.rowsPerPage,
        searchText: featured ? null : paginateDataArgs?.searchText
      }
    },
    ...fetchMoreArgs
  })

  const products: Product[] = data?.get_products || []
  const productsCount: number = data?.get_products_count || 0

  const productCards = [
    products?.map((product: Product): ReactElement => {
      return (
        <CardComponent
          content={
            <>
              <Typography>{product?.name}</Typography>
              <Typography>
                {formatDiscountedPrice(product?.discount, product?.price)}
              </Typography>
              {product?.discount && (
                <Typography>
                  {`P${product?.price} -${formatToPercentage(product?.discount)}`}
                </Typography>
              )}
            </>
          }
          imageAlt={`${product?.name} Product Image`}
          imageSource={product?.imageUrl}
          redirectLink={{
            path: 'shop/[productId]',
            url: `shop/${product._id}`
          }}
        />
      )
    })
  ]

  return (
    <>
      {featured && <Typography>{'Featured Products'}</Typography>}
      {!featured && (
        <>
          <CardsPaginationComponent
            args={args}
            count={productsCount}
            fetchMore={fetchMore}
            loading={loading}
            paginateDataArgs={paginateDataArgs}
            searchLabel={'Search Product by Name'}
            searchPlaceholder={'ex. Jeans for Women'}
            setPaginateDataArgs={setPaginateDataArgs}
          />
          <ProductCardsFilters args={args} setArgs={setArgs} />
        </>
      )}
      {productCards}
    </>
  )
}

export default ProductCards
