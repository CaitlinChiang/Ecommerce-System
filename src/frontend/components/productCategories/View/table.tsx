import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GetProductCategories } from './query'
import deleteMutation from '../Delete/mutation'
import { IconButton, TableCell, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { ProductCategory } from '../../../../types/productCategory'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { AdminPermission } from '../../../_enums/adminPermission'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import ModalComponent from '../../_common/ModalComponent'
import CreateProductCategory from '../Create'
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

  const [args, setArgs] = useState<any>({ showPublic: null })
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'name',
    sortDirection: SortDirection.ASC
  })
  const [productCategoryId, setProductCategoryId] = useState<string>('')
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false)
  const [filterOpen, setFilterOpen] = useState<boolean>(false)
  const [refetchArgs, setRefetchArgs] = useState<RefetchDataArgs>({
    args: null,
    count: null,
    loading: false,
    paginateDataArgs: null,
    refetch: null
  })

  const { data, loading, fetchMore, refetch } = useQuery(GetProductCategories, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })

  const productCategories: ProductCategory[] = data?.get_product_categories || []
  const productCategoriesCount: number = data?.get_product_categories_count || 0

  useEffect(() => {
    setRefetchArgs({
      args,
      count: productCategoriesCount,
      loading,
      paginateDataArgs,
      refetch
    })
  }, [args, data, paginateDataArgs])

  const productCategoryHeaders = [
    { label: 'showPublic', sortable: true },
    { label: 'name', sortable: true },
    { label: 'createdAt', sortable: true },
    { label: 'actions', sortable: false }
  ]

  const productCategoryRows = [
    productCategories?.map((productCategory: ProductCategory): ReactElement => {
      const { createdAt, name } = productCategory

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
          <TableCell>{String(createdAt)}</TableCell>
          <TableCell>
            <IconButton
              disabled={disableUpdateProductCategory}
              onClick={(): void => {
                setProductCategoryId(String(productCategory._id))
                setUpdateModalOpen(true)
              }}
            >
              <EditIcon />
            </IconButton>
            <DeleteButton
              _id={productCategory._id}
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
      <CreateProductCategory refetchArgs={refetchArgs} />
      <ModalComponent
        content={
          <UpdateProductCategory
            _id={productCategoryId}
            refetchArgs={refetchArgs}
            setUpdateModalOpen={setUpdateModalOpen}
          />
        }
        onClose={(): void => setUpdateModalOpen(false)}
        open={updateModalOpen}
        title={'Update Product Category'}
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
