import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetProducts } from './query'
import { Typography } from '@mui/material'
import { Product } from '../../../../types/product'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { SortDirection } from '../../../_enums/sortDirection'
import { StockQuantityOperator } from '../../../_enums/stockQuantityOperator'
import CardComponent from '../../_common/CardComponent'
import ProductsCardsFilters from './cardsFilters'
import CardsPaginationComponent from '../../../components/_common/CardsPaginationComponent'
import { fetchMoreArgs } from '../../../_utils/handleArgs/returnFetchMoreArgs'
import { formatToPercentage } from '../../../_utils/handleFormatting/formatToPercentage'
import { formatDiscountedPrice } from '../../../_utils/handleFormatting/formatDiscountedPrice'

const ProductsCards = ({ featured }: { featured: boolean }): ReactElement => {
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

  const products = data?.get_products || []
  const productsCount: number = data?.get_products_count || 0

  const productCards = [
    products?.map((product: Product): ReactElement => {
      return (
        <CardComponent
          content={
            <>
              <Typography variant={'h5'}>{product?.name}</Typography>
              <Typography variant={'h6'}>
                {formatDiscountedPrice(product?.discount, product?.price)}
              </Typography>
              {product?.discount ? (
                <Typography variant={'h6'}>
                  {'P' + product?.price?.toFixed(2)}
                  {' -'}
                  {formatToPercentage(product?.discount)}
                </Typography>
              ) : (
                <div style={{ marginTop: '32px' }} />
              )}
            </>
          }
          imageAlt={product?.name + ' Product Image'}
          imageSource={product?.imageUrl}
        />
      )
    })
  ]

  return (
    <>
      {featured && <Typography variant={'h4'}>{'Featured Products'}</Typography>}
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
          <ProductsCardsFilters args={args} setArgs={setArgs} />
        </>
      )}
      {productCards}
    </>
  )
}

export default ProductsCards
