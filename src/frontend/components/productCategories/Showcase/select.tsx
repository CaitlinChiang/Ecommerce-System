import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import query from './query'
import { ProductCategory } from '../../../../types/productCategory'
import { SortDirection } from '../../../_enums/sortDirection'
import SelectField from '../../../components/_common/SelectField'

const ProductCategoriesSelect = ({
  setSpecificArgs,
  specificArgs
}: {
  setSpecificArgs: React.Dispatch<React.SetStateAction<any>>
  specificArgs: any
}): ReactElement => {
  const { data } = useQuery(query, {
    variables: {
      paginateData: { sortBy: 'name', sortDirection: SortDirection.ASC }
    }
  })

  const productCategories = data?.get_product_categories || []

  const productCategoryOptions = productCategories?.map(
    (productCategory: ProductCategory) => {
      return {
        label: productCategory.name,
        _id: productCategory._id
      }
    }
  )

  return (
    <SelectField
      label={'Categories'}
      optionLabelProperty={'label'}
      options={productCategoryOptions}
      setSpecificArgs={setSpecificArgs}
      specificArgs={specificArgs}
      targetProperty={'_id'}
    />
  )
}

export default ProductCategoriesSelect
