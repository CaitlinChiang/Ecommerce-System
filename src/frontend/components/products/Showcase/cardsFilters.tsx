import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetProductCategories } from '../../productCategories/Showcase/query'
import { ListItemButton, ListItemText } from '@mui/material'
import { ProductCategory } from '../../../../types/productCategory'
import { SortDirection } from '../../../_enums/sortDirection'

const ProductsCardsFilters = ({
  args,
  setArgs
}: {
  args: any
  setArgs: React.Dispatch<React.SetStateAction<any>>
}): ReactElement => {
  const { data } = useQuery(GetProductCategories, {
    variables: {
      paginateData: { sortBy: 'name', sortDirection: SortDirection.ASC }
    }
  })

  const productCategories = data?.get_product_categories || []

  return (
    <>
      <ListItemText primary={'Categories'} sx={{ marginBottom: 2 }} />
      <ListItemButton
        onClick={(): void => setArgs({ ...args, categoryIds: [] })}
        sx={{ py: 0, minHeight: 32, marginLeft: -2 }}
      >
        <ListItemText
          primary={'All Categories'}
          primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
        />
      </ListItemButton>
      {productCategories.map(
        (productCategory: ProductCategory, index: number): ReactElement => {
          return (
            <ListItemButton
              key={index}
              onClick={(): void =>
                setArgs({ ...args, categoryIds: [productCategory._id] })
              }
              sx={{ py: 0, minHeight: 32, marginLeft: -2 }}
            >
              <ListItemText
                primary={productCategory.name}
                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
              />
            </ListItemButton>
          )
        }
      )}
    </>
  )
}

export default ProductsCardsFilters
