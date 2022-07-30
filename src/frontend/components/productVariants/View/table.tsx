import { ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GetProductVariants } from './query'
import deleteMutation from '../Delete/mutation'
import { IconButton, TableCell, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { ProductVariant } from '../../../../types/productVariant'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { AdminPermission } from '../../../_enums/adminPermission'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import DeleteButton from '../../_common/DeleteButton'
import ProductVariantsTableFilters from './tableFilters'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { fetchMoreArgs } from '../../../_utils/handleArgs/returnFetchMoreArgs'
import { formatPrice } from '../../../_utils/handleFormatting/formatPrice'
import { formatToPercentage } from '../../../_utils/handleFormatting/formatToPercentage'

const ProductVariantsTable = ({
  _productId
}: {
  _productId: string
}): ReactElement => {
  const disableUpdateProductVariant = !authenticateUser(
    AdminPermission.UPDATE_PRODUCT_VARIANT
  )
  const disableDeleteProductVariant = !authenticateUser(
    AdminPermission.DELETE_PRODUCT_VARIANT
  )

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

  const { data, loading, fetchMore, refetch } = useQuery(GetProductVariants, {
    skip: !_productId,
    variables: {
      _productId,
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

  const productVariants: ProductVariant[] = data?.get_product_variants || []
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
          <TableCell>{productVariant?.name}</TableCell>
          <TableCell>{`P${formatPrice(productVariant?.price)}`}</TableCell>
          <TableCell>
            {formatToPercentage(productVariant?.discount) || '-'}
          </TableCell>
          <TableCell>{productVariant?.stockQuantity}</TableCell>
          <TableCell>{String(productVariant?.expirationDate || '-')}</TableCell>
          <TableCell>
            <IconButton
              disabled={disableUpdateProductVariant}
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
              disabled={disableDeleteProductVariant}
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
      searchLabel={'Search Product Variant by Name'}
      searchPlaceholder={'ex. Medium'}
      setFilterOpen={setFilterOpen}
      setPaginateDataArgs={setPaginateDataArgs}
    />
  )
}

export default ProductVariantsTable
