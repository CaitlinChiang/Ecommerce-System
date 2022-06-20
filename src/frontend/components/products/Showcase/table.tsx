import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import query from './query'
import { TableCell, TableRow } from '@mui/material'
import { Product } from '../../../../types/product'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { StockQuantity } from '../../../../types/common/stockQuantity'
import { SortDirection } from '../../../_enums/sortDirection'
import { StockQuantityOperator } from '../../../_enums/stockQuantityOperator'
import TableComponent from '../../_common/TableComponent'
// import UpdateProductButton from '../Update/updateButton'
// import DeleteProductButton from '../Delete/deleteButton'
import SelectField from '../../_common/SelectField'
import ProductCategoriesSelect from '../../productCategories/Showcase/select'
import { tableArgs } from '../../../_utils/returnTableArgs'

const ProductsTable = (): ReactElement => {
  const [page, setPage] = useState<number>(0)
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    offset: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'name',
    sortDirection: SortDirection.ASC
  })
  const [stockQuantityArgs, setStockQuantityArgs] = useState<StockQuantity>({
    operator: StockQuantityOperator.ABOVE,
    value1: 0,
    value2: 0
  })
  const [specificArgs, setSpecificArgs] = useState<any>({
    categoryId: null,
    featured: null,
    showPublic: null
  })
  const [filterOpen, setFilterOpen] = useState<boolean>(false)

  const { data, loading, fetchMore } = useQuery(query, {
    variables: {
      paginateData: paginateDataArgs,
      ...specificArgs,
      stockQuantity: stockQuantityArgs
    },
    ...tableArgs
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
          <TableCell align={'center'}>{'P' + product?.price}</TableCell>
          <TableCell align={'center'}>{product?.stockQuantity}</TableCell>
          <TableCell align={'center'}>{String(product?.expirationDate)}</TableCell>
          <TableCell align={'center'}>
            {/* <UpdateProductButton _id={product?._id} /> */}
            {/* <DeleteProductButton _id={product?._id} /> */}
          </TableCell>
        </TableRow>
      )
    })
  ]

  return (
    <TableComponent
      count={productsCount}
      fetchMore={fetchMore}
      filterContent={
        <>
          <SelectField
            label={'Featured Status'}
            optionLabelProperty={'label'}
            options={[
              { label: 'Featured Products', featured: true },
              { label: 'Non-Featured Products', featured: false }
            ]}
            setSpecificArgs={setSpecificArgs}
            specificArgs={specificArgs}
            targetProperty={'featured'}
          />
          <SelectField
            label={'Show Public Status'}
            optionLabelProperty={'label'}
            options={[
              { label: 'Public Products', showPublic: true },
              { label: 'Private Products', showPublic: false }
            ]}
            setSpecificArgs={setSpecificArgs}
            specificArgs={specificArgs}
            targetProperty={'showPublic'}
          />
          <ProductCategoriesSelect
            setSpecificArgs={setSpecificArgs}
            specificArgs={specificArgs}
          />
          {/* INSERT LOGIC FOR STOCK QUANTITY FILTERING */}
        </>
      }
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
      specificArgs={specificArgs}
    />
  )
}

export default ProductsTable
