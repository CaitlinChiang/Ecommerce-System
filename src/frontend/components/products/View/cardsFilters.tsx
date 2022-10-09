import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetProductCategories } from '../../productCategories/View/query'
import {
  Card,
  CardContent,
  Divider,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
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
    variables: { paginateData: { sortBy: 'name', sortDirection: SortDirection.ASC } }
  })
  const productCategories: ProductCategory[] = data?.get_product_categories || []

  return (
    <Card>
      <CardContent>
        <Typography sx={{ marginBottom: 2 }} variant={'h2'}>
          {'Categories'}
        </Typography>
        <ListItemButton onClick={(): void => setArgs({ ...args, categoryIds: [] })}>
          <ListItemText primary={'All Categories'} />
        </ListItemButton>
        <Divider />
        {productCategories.map(
          (productCategory: ProductCategory, index: number): ReactElement => {
            return (
              <>
                <ListItemButton
                  key={index}
                  onClick={(): void =>
                    setArgs({ ...args, categoryIds: [productCategory._id] })
                  }
                >
                  <ListItemText primary={productCategory.name} />
                </ListItemButton>
                <Divider />
              </>
            )
          }
        )}
      </CardContent>
    </Card>
  )
}

export default ProductCardsFilters
