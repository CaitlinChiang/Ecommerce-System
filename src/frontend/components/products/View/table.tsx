import { ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GetProducts } from './query'
import deleteMutation from '../Delete/mutation'
import { IconButton, TableCell, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { Product } from '../../../../types/product'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { AdminPermission } from '../../../_enums/adminPermission'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import DeleteButton from '../../_common/DeleteButton'
import ProductsTableFilters from './tableFilters'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { fetchMoreArgs } from '../../../_utils/handleArgs/returnFetchMoreArgs'
import { formatPrice } from '../../../_utils/handleFormatting/formatPrice'
import { formatToPercentage } from '../../../_utils/handleFormatting/formatToPercentage'

const ProductsTable = (): ReactElement => {
  const disableUpdateProduct = !authenticateUser(AdminPermission.UPDATE_PRODUCT)
  const disableDeleteProduct = !authenticateUser(AdminPermission.DELETE_PRODUCT)

  const router = useRouter()

  const [args, setArgs] = useState<any>({
    categoryIds: [],
    dateRange: {
      startDate: null,
      endDate: null,
      filterBy: null
    },
    discount: null,
    featured: null,
    showPublic: null,
    stockQuantity: {
      operator: null,
      value1: null,
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

  const { data, loading, fetchMore, refetch } = useQuery(GetProducts, {
    variables: {
      ...args,
      stockQuantity: {
        operator: args.stockQuantity?.operator,
        value1: Math.round(args.stockQuantity?.value1),
        value2: Math.round(args.stockQuantity?.value2)
      },
      paginateData: paginateDataArgs
    },
    ...fetchMoreArgs
  })

  const products: Product[] = data?.get_products || []
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

  const productHeaders = [
    { label: 'name', sortable: true },
    { label: 'category', sortable: true },
    { label: 'price', sortable: true },
    { label: 'discount', sortable: false },
    { label: 'stockQuantity', sortable: true },
    { label: 'expirationDate', sortable: true },
    { label: 'actions', sortable: false }
  ]

  const productRows = [
    products?.map((product: Product): ReactElement => {
      return (
        <TableRow>
          <TableCell>{product?.name}</TableCell>
          <TableCell>{product?.category}</TableCell>
          <TableCell>{`P${formatPrice(product?.price)}`}</TableCell>
          <TableCell>{formatToPercentage(product?.discount) || '-'}</TableCell>
          <TableCell>{product?.stockQuantity}</TableCell>
          <TableCell>{String(product?.expirationDate || '-')}</TableCell>
          <TableCell>
            <IconButton
              disabled={disableUpdateProduct}
              onClick={(): void => {
                router.push('products/[productId]', `products/${product._id}`)
              }}
            >
              <EditIcon />
            </IconButton>
            <DeleteButton
              _id={product?._id}
              disabled={disableDeleteProduct}
              label={'Product'}
              mutation={deleteMutation}
              refetchArgs={refetchArgs}
              setPaginateDataArgs={setPaginateDataArgs}
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
      paginateDataArgs={paginateDataArgs}
      rows={productRows}
      searchLabel={'Search Product by Name'}
      searchPlaceholder={'ex. Original Lightweight Sweater'}
      setFilterOpen={setFilterOpen}
      setPaginateDataArgs={setPaginateDataArgs}
    />
  )
}

export default ProductsTable
