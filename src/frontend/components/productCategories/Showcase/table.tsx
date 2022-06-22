import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { queryMultiple } from './query'
import deleteMutation from '../Delete/mutation'
import { TableCell, TableRow } from '@mui/material'
import { ProductCategory } from '../../../../types/productCategory'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import DeleteButton from '../../_common/DeleteButton'
import { fetchMoreArgs } from '../../../_utils/returnFetchMoreArgs'

const ProductCategoriesTable = (): ReactElement => {
  const args: any = { showPublic: null }
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'name',
    sortDirection: SortDirection.ASC
  })
  const [refetchArgs, setRefetchArgs] = useState<RefetchDataArgs>({
    args: null,
    loading: false,
    paginateDataArgs: null,
    refetch: null
  })

  const { data, loading, fetchMore, refetch } = useQuery(queryMultiple, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })

  useEffect(() => {
    setRefetchArgs({
      args,
      loading,
      paginateDataArgs,
      refetch
    })
  }, [args, paginateDataArgs])

  const productCategories = data?.get_product_categories || []
  const productCategoriesCount: number = data?.get_product_categories_count || 0

  const productCategoryHeaders = [
    { label: 'showPublic', sortable: true },
    { label: 'name', sortable: true },
    { label: 'createdAt', sortable: true },
    { label: 'actions', sortable: false }
  ]

  const productCategoryRows = [
    productCategories?.map((productCategory: ProductCategory): ReactElement => {
      return (
        <TableRow>
          <TableCell align={'center'}>{productCategory?.showPublic}</TableCell>
          <TableCell align={'center'}>{productCategory?.name}</TableCell>
          <TableCell align={'center'}>
            {String(productCategory?.createdAt)}
          </TableCell>
          <TableCell align={'center'}>
            <DeleteButton
              _id={productCategory._id}
              label={'Product Category'}
              mutation={deleteMutation}
              refetchArgs={refetchArgs}
            />
          </TableCell>
        </TableRow>
      )
    })
  ]

  return (
    <TableComponent
      args={args}
      count={productCategoriesCount}
      fetchMore={fetchMore}
      headers={productCategoryHeaders}
      loading={loading}
      paginateDataArgs={paginateDataArgs}
      rows={productCategoryRows}
      rowsPerPageOptions={[10, 25, 50, 75, 100]}
      searchLabel={'Search Product Category by Name'}
      searchPlaceholder={'ex. Tops'}
      setPaginateDataArgs={setPaginateDataArgs}
    />
  )
}

export default ProductCategoriesTable
