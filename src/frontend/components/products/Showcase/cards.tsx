import { ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { queryMultiple } from './query'
import { Typography } from '@mui/material'
import { Product } from '../../../../types/product'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { SortDirection } from '../../../_enums/sortDirection'
import { StockQuantityOperator } from '../../../_enums/stockQuantityOperator'
import CardComponent from '../../_common/CardComponent'
// import ProductsCardsFilters from './cardsFilters'
import { fetchMoreArgs } from '../../../_utils/handleArgs/returnFetchMoreArgs'
import { formatToPercentage } from '../../../_utils/handleFormatting/formatToPercentage'
import { formatDiscountedPrice } from '../../../_utils/handleFormatting/formatDiscountedPrice'

const ProductsCards = (featured: boolean): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<any>({
    categoryIds: [],
    featured,
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
  const [filterOpen, setFilterOpen] = useState<boolean>(false)
  const [refetchArgs, setRefetchArgs] = useState<RefetchDataArgs>({
    args: null,
    count: null,
    loading: false,
    paginateDataArgs: null,
    refetch: null
  })

  const { data, loading, fetchMore, refetch } = useQuery(queryMultiple, {
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

  useEffect(() => {
    setRefetchArgs({
      args,
      count: productsCount,
      loading,
      paginateDataArgs,
      refetch
    })
  }, [args, data, paginateDataArgs])

  return products?.map((product: Product): ReactElement => {
    return (
      <CardComponent
        content={
          <>
            <Typography variant={'h3'}>{product?.name}</Typography>
            <Typography variant={'h4'}>
              {'P' + product?.price?.toFixed(2)}
            </Typography>
            {product?.discount && (
              <Typography variant={'h4'}>
                {formatDiscountedPrice(product?.discount, product?.price)} + {' -'}
                {formatToPercentage(product?.discount)}
              </Typography>
            )}
          </>
        }
        imageAlt={product?.name + ' Product Image'}
        imageSource={product?.imageUrl}
      />
    )
  })
}

export default ProductsCards
