import { ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { queryMultiple } from './query'
import deleteMutation from '../Delete/mutation'
import { IconButton, TableCell, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { ProductVariant } from '../../../../types/productVariant'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import DeleteButton from '../../_common/DeleteButton'
import ProductVariantsTableFilters from './tableFilters'
import { fetchMoreArgs } from '../../../_utils/returnFetchMoreArgs'

const ProductVariantsTable = ({
  _productId
}: {
  _productId: string
}): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<any>({
    dateRange: {
      startDate: null,
      endDate: null,
      filterBy: null
    },
    discount: null,
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

  const { data, loading, fetchMore, refetch } = useQuery(queryMultiple, {
    variables: {
      _productId,
      ...args,
      paginateData: paginateDataArgs
    },
    ...fetchMoreArgs
  })

  const productVariants = data?.get_product_variants || []
  const productVariantsCount: number = data?.get_product_variants_count || 0

  useEffect(() => {
    setRefetchArgs({
      args,
      count: productVariantsCount,
      loading,
      paginateDataArgs,
      refetch
    })
  }, [args, data, paginateDataArgs])

  const productHeaders = [
    { label: 'name', sortable: true },
    { label: 'price', sortable: true },
    { label: 'discount', sortable: false },
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
          <TableCell align={'center'}>{productVariant?.discount}</TableCell>
          <TableCell align={'center'}>{productVariant?.stockQuantity}</TableCell>
          <TableCell align={'center'}>
            {String(productVariant?.expirationDate)}
          </TableCell>
          <TableCell align={'center'}>
            <IconButton
              onClick={(): void => {
                router.push(
                  '[productId]/variants/[productVariantId]',
                  `${_productId}/variants/${productVariant._id}`
                )
              }}
            >
              <EditIcon />
            </IconButton>
            <DeleteButton
              _id={productVariant?._id}
              label={'Product Variant'}
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
      count={productVariantsCount}
      fetchMore={fetchMore}
      filterContent={<ProductVariantsTableFilters args={args} setArgs={setArgs} />}
      filterOpen={filterOpen}
      headers={productHeaders}
      loading={loading}
      paginateDataArgs={paginateDataArgs}
      rows={productVariantRows}
      rowsPerPageOptions={[10, 25, 50, 75, 100]}
      searchLabel={'Search Product Variant by Name'}
      searchPlaceholder={'ex. Medium'}
      setFilterOpen={setFilterOpen}
      setPaginateDataArgs={setPaginateDataArgs}
    />
  )
}

export default ProductVariantsTable
