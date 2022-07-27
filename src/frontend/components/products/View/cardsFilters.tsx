import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetProductCategories } from '../../productCategories/View/query'
import styles from '../../../styles/products'
import { ListItemButton, ListItemText } from '@mui/material'
import { ProductCategory } from '../../../../types/productCategory'
import { SortDirection } from '../../../_enums/sortDirection'

const ProductCardsFilters = ({
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
      <ListItemText primary={'Categories'} sx={styles.listItemTextHeader} />
      <ListItemButton
        onClick={(): void => setArgs({ ...args, categoryIds: [] })}
        sx={styles.listItemButton}
      >
        <ListItemText
          primary={'All Categories'}
          primaryTypographyProps={styles.listItemText}
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
              sx={styles.listItemButton}
            >
              <ListItemText
                primary={productCategory.name}
                primaryTypographyProps={styles.listItemText}
              />
            </ListItemButton>
          )
        }
      )}
    </>
  )
}

export default ProductCardsFilters
