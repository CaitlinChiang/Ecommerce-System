import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetProducts } from './query'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { Product, GetProductArgs } from '../../../../types/product'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { SortDirection } from '../../../_enums/sortDirection'
import { StockQuantityOperator } from '../../../_enums/stockQuantityOperator'
import CardComponent from '../../_common/CardComponent'
import ProductCardsFilters from './cardsFilters'
import CardsPaginationComponent from '../../_common/CardsPaginationComponent'
import { formatDiscountedPrice } from '../../../_utils/handleFormat/formatDiscountedPrice'
import { formatPrice } from '../../../_utils/handleFormat/formatPrice'
import { formatToPercentage } from '../../../_utils/handleFormat/formatToPercentage'

const ProductCards = ({ featured }: { featured: boolean }): ReactElement => {
  const [args, setArgs] = useState<GetProductArgs>({
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
    rowsPerPage: 12,
    searchText: '',
    sortBy: 'name',
    sortDirection: SortDirection.ASC
  })

  const { data, loading } = useQuery(GetProducts, {
    variables: {
      ...args,
      paginateData: {
        ...paginateDataArgs,
        page: featured ? null : paginateDataArgs?.page,
        rowsPerPage: featured ? null : paginateDataArgs?.rowsPerPage,
        searchText: featured ? null : paginateDataArgs?.searchText
      }
    }
  })
  const products: Product[] = data?.get_products || []
  const productsCount: number = data?.get_products_count || 0

  const productCards = [
    products?.map((product: Product): ReactElement => {
      const { _id, discount, imageUrl, name, price } = product

      return (
        <CardComponent
          content={
            <>
              <Typography variant={'h4'}>{name}</Typography>
              <Typography variant={'h5'}>
                {formatDiscountedPrice(discount, price)}
              </Typography>
              {discount && (
                <Typography variant={'caption'}>{`P${formatPrice(
                  price
                )} -${formatToPercentage(discount)}`}</Typography>
              )}
            </>
          }
          imageAlt={`${name} Product Image`}
          imageSource={imageUrl}
          redirectLink={{
            path: 'shop/[productId]',
            url: `shop/${_id}`
          }}
        />
      )
    })
  ]

  if (featured) {
    return (
      <Grid container spacing={1}>
        {productCards}
      </Grid>
    )
  }

  return (
    <Grid container>
      <Grid item xs={12} md={4} lg={2.5}>
        <ProductCardsFilters
          args={args}
          paginateDataArgs={paginateDataArgs}
          setArgs={setArgs}
          setPaginateDataArgs={setPaginateDataArgs}
        />
      </Grid>
      <Grid item xs={12} md={8} lg={9.5}>
        <Card>
          <CardContent>
            <Typography sx={{ marginBottom: 2 }} variant={'h2'}>
              {'Products'}
            </Typography>
            <CardsPaginationComponent
              count={productsCount}
              loading={loading}
              paginateDataArgs={paginateDataArgs}
              searchLabel={'Search Product by Name'}
              searchPlaceholder={'ex. Jeans for Women'}
              setPaginateDataArgs={setPaginateDataArgs}
            />
            <Grid container spacing={1}>
              {productCards}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProductCards
