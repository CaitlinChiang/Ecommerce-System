import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { queryMultiple } from './query'
import deleteMutation from '../Delete/mutation'
import { IconButton, TableCell, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { Product } from '../../../../types/product'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import DeleteButton from '../../_common/DeleteButton'
import ProductsTableFilters from './tableFilters'
import { fetchMoreArgs } from '../../../_utils/returnFetchMoreArgs'

const ProductsTable = (): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<any>({
    dateRange: {
      startDate: null,
      endDate: null,
      filterBy: null
    },
    categoryIds: [],
    featured: null,
    showPublic: null,
    stockQuantity: {
      operator: null,
      value1: null,
      value2: null
    }
  })
  const [page, setPage] = useState<number>(0)
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    offset: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'name',
    sortDirection: SortDirection.ASC
  })
  const [filterOpen, setFilterOpen] = useState<boolean>(false)

  const { data, loading, fetchMore } = useQuery(queryMultiple, {
    variables: {
      ...args,
      paginateData: paginateDataArgs
    },
    ...fetchMoreArgs
  })

  const products = data?.get_products || []
  const productsCount: number = data?.get_products_count || 0

  const productHeaders = [
    { label: 'name', sortable: true },
    { label: 'category', sortable: true },
    { label: 'price', sortable: true },
    { label: 'stockQuantity', sortable: true },
    { label: 'expirationDate', sortable: true },
    { label: 'actions', sortable: false }
  ]

  const productRows = [
    products?.map((product: Product): ReactElement => {
      return (
        <TableRow>
          <TableCell align={'center'}>{product?.name}</TableCell>
          <TableCell align={'center'}>{product?.category}</TableCell>
          <TableCell align={'center'}>{'P' + product?.price?.toFixed(2)}</TableCell>
          <TableCell align={'center'}>{product?.stockQuantity}</TableCell>
          <TableCell align={'center'}>{String(product?.expirationDate)}</TableCell>
          <TableCell align={'center'}>
            <IconButton
              onClick={(): void => {
                router.push('products/[productId]', `products/${product._id}`)
              }}
            >
              <EditIcon />
            </IconButton>
            <DeleteButton
              _id={product?._id}
              label={'Product'}
              mutation={deleteMutation}
            />
          </TableCell>
        </TableRow>
      )
    })
  ]

  return (
    <TableComponent
      args={args}
      count={productsCount}
      fetchMore={fetchMore}
      filterContent={<ProductsTableFilters args={args} setArgs={setArgs} />}
      filterOpen={filterOpen}
      headers={productHeaders}
      loading={loading}
      page={page}
      paginateDataArgs={paginateDataArgs}
      rows={productRows}
      rowsPerPageOptions={[10, 25, 50, 75, 100]}
      searchLabel={'Search Product by Name'}
      searchPlaceholder={'ex. Original Lightweight Sweater'}
      setFilterOpen={setFilterOpen}
      setPage={setPage}
      setPaginateDataArgs={setPaginateDataArgs}
    />
  )
}

export default ProductsTable
