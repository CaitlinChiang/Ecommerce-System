import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { queryMultiple } from './query'
import deleteMutation from '../Delete/mutation'
import { IconButton, TableCell, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { ProductVariant } from '../../../../types/productVariant'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import DeleteButton from '../../_common/DeleteButton'
import ProductVariantsTableFilters from './tableFilters'
import { fetchMoreArgs } from '../../../_utils/returnFetchMoreArgs'

const ProductVariantsTable = (): ReactElement => {
  const router = useRouter()
  const _productId = '62b036fe3fcf87061111d52c'

  const [args, setArgs] = useState<any>({
    dateRange: {
      startDate: null,
      endDate: null,
      filterBy: null
    },
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
      _productId,
      ...args,
      paginateData: paginateDataArgs
    },
    ...fetchMoreArgs
  })

  const productVariants = data?.get_product_variants || []
  const productVariantsCount: number = data?.get_product_variants_count || 0

  const productHeaders = [
    { label: 'name', sortable: true },
    { label: 'price', sortable: true },
    { label: 'stockQuantity', sortable: true },
    { label: 'expirationDate', sortable: true },
    { label: 'actions', sortable: false }
  ]

  const productVariantRows = [
    productVariants?.map((productVariant: ProductVariant): ReactElement => {
      return (
        <TableRow>
          <TableCell align={'center'}>{productVariant?.name}</TableCell>
          <TableCell align={'center'}>
            {'P' + productVariant?.price?.toFixed(2)}
          </TableCell>
          <TableCell align={'center'}>{productVariant?.stockQuantity}</TableCell>
          <TableCell align={'center'}>
            {String(productVariant?.expirationDate)}
          </TableCell>
          <TableCell align={'center'}>
            <IconButton
              onClick={(): void => {
                router.push(`productVariants/update/${productVariant._id}`)
              }}
            >
              <EditIcon />
            </IconButton>
            <DeleteButton
              _id={productVariant?._id}
              label={'Product Variant'}
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
      count={productVariantsCount}
      fetchMore={fetchMore}
      filterContent={<ProductVariantsTableFilters args={args} setArgs={setArgs} />}
      filterOpen={filterOpen}
      headers={productHeaders}
      loading={loading}
      page={page}
      paginateDataArgs={paginateDataArgs}
      rows={productVariantRows}
      rowsPerPageOptions={[10, 25, 50, 75, 100]}
      searchLabel={'Search Product Variant by Name'}
      searchPlaceholder={'ex. Medium'}
      setFilterOpen={setFilterOpen}
      setPage={setPage}
      setPaginateDataArgs={setPaginateDataArgs}
    />
  )
}

export default ProductVariantsTable
