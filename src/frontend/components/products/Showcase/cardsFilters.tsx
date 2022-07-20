import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetProductCategories } from '../../productCategories/Showcase/query'
import {
  listItemTextHeader,
  listItemButton,
  listItemText
} from '../../../styles/products'
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

  const productCategories: ProductCategory[] = data?.get_product_categories || []

  return (
    <>
      <ListItemText primary={'Categories'} sx={listItemTextHeader} />
      <ListItemButton
        onClick={(): void => setArgs({ ...args, categoryIds: [] })}
        sx={listItemButton}
      >
        <ListItemText
          primary={'All Categories'}
          primaryTypographyProps={listItemText}
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
              sx={listItemButton}
            >
              <ListItemText
                primary={productCategory.name}
                primaryTypographyProps={listItemText}
              />
            </ListItemButton>
          )
        }
      )}
    </>
  )
}

export default ProductsCardsFilters
