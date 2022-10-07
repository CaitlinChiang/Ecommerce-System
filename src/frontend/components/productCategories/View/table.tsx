import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetProductCategories } from './query'
import deleteMutation from '../Delete/mutation'
import { IconButton, TableCell, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import {
  ProductCategory,
  GetProductCategoryArgs
} from '../../../../types/productCategory'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { AdminPermission } from '../../../_enums/adminPermission'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import UpdateProductCategory from '../Update'
import UpdateProductCategoryCheckbox from '../Update/checkbox'
import DeleteButton from '../../_common/DeleteButton'
import ProductsTableFilters from './tableFilters'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { fetchMoreArgs } from '../../../_utils/handleArgs/returnFetchMoreArgs'

const ProductCategoriesTable = (): ReactElement => {
  const disableUpdateProductCategory = !authenticateUser(
    AdminPermission.UPDATE_PRODUCT_CATEGORY
  )
  const disableDeleteProductCategory = !authenticateUser(
    AdminPermission.DELETE_PRODUCT_CATEGORY
  )

  const [args, setArgs] = useState<GetProductCategoryArgs>({ showPublic: null })
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'name',
    sortDirection: SortDirection.ASC
  })

  const [update, setUpdate] = useState<{ categoryId: string; openModal: boolean }>({
    categoryId: null,
    openModal: false
  })

  const [filterOpen, setFilterOpen] = useState<boolean>(false)

  const { data, loading, fetchMore, refetch } = useQuery(GetProductCategories, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })
  const productCategories: ProductCategory[] = data?.get_product_categories || []
  const productCategoriesCount: number = data?.get_product_categories_count || 0

  const refetchArgs: RefetchDataArgs = {
    args,
    count: productCategoriesCount,
    loading,
    paginateDataArgs,
    refetch
  }

  const productCategoryHeaders = [
    { label: 'showPublic', sortable: true },
    { label: 'name', sortable: true },
    { label: 'actions', sortable: false }
  ]

  const productCategoryRows = [
    productCategories?.map((productCategory: ProductCategory): ReactElement => {
      const { _id, name } = productCategory

      return (
        <TableRow>
          <TableCell>
            <UpdateProductCategoryCheckbox
              disabled={disableUpdateProductCategory}
              productCategory={productCategory}
              refetchArgs={refetchArgs}
            />
          </TableCell>
          <TableCell>{name}</TableCell>
          <TableCell>
            <IconButton
              disabled={disableUpdateProductCategory}
              onClick={(): void => {
                setUpdate({
                  categoryId: String(_id),
                  openModal: true
                })
              }}
            >
              <EditIcon />
            </IconButton>
            <DeleteButton
              _id={_id}
              disabled={disableDeleteProductCategory}
              label={'Product Category'}
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
    <>
      <UpdateProductCategory
        _id={update.categoryId}
        onClose={(): void => setUpdate({ ...update, openModal: false })}
        open={update.openModal}
        refetchArgs={refetchArgs}
      />
      <TableComponent
        args={args}
        count={productCategoriesCount}
        fetchMore={fetchMore}
        filterContent={<ProductsTableFilters args={args} setArgs={setArgs} />}
        filterOpen={filterOpen}
        headers={productCategoryHeaders}
        loading={loading}
        paginateDataArgs={paginateDataArgs}
        rows={productCategoryRows}
        searchLabel={'Search Product Category by Name'}
        searchPlaceholder={'ex. Tops'}
        setFilterOpen={setFilterOpen}
        setPaginateDataArgs={setPaginateDataArgs}
      />
    </>
  )
}

export default ProductCategoriesTable
