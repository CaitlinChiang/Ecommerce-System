import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import query from './query'
import { ProductCategory } from '../../../../types/productCategory'
import { SortDirection } from '../../../_enums/sortDirection'
import SelectField from '../../../components/_common/SelectField'

const ProductCategoriesSelect = ({
  multiple,
  setSpecificArgs,
  specificArgs
}: {
  multiple?: boolean
  setSpecificArgs: React.Dispatch<React.SetStateAction<any>>
  specificArgs: any
}): ReactElement => {
  const targetProperty = multiple ? 'categoryIds' : 'categoryId'

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
        [targetProperty]: productCategory._id
      }
    }
  )

  return (
    <SelectField
      label={'Categories'}
      multiple={multiple}
      optionLabelProperty={'label'}
      options={productCategoryOptions}
      setSpecificArgs={setSpecificArgs}
      specificArgs={specificArgs}
      targetProperty={targetProperty}
    />
  )
}

export default ProductCategoriesSelect
