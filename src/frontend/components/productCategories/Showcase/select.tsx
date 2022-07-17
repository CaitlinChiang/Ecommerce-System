import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetProductCategories } from './query'
import { ProductCategory } from '../../../../types/productCategory'
import { SortDirection } from '../../../_enums/sortDirection'
import SelectField from '../../../components/_common/SelectField'

const ProductCategoriesSelect = ({
  args,
  error,
  multiple,
  required,
  setArgs
}: {
  args: any
  error?: boolean
  multiple?: boolean
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
}): ReactElement => {
  const targetProp = multiple ? 'categoryIds' : 'categoryId'

  const { data } = useQuery(GetProductCategories, {
    variables: {
      paginateData: { sortBy: 'name', sortDirection: SortDirection.ASC }
    }
  })

  const productCategories = data?.get_product_categories || []

  const productCategoryOptions = productCategories?.map(
    (productCategory: ProductCategory) => {
      return {
        label: productCategory.name,
        [targetProp]: productCategory._id
      }
    }
  )

  return (
    <SelectField
      args={args}
      error={error}
      label={'Categories'}
      multiple={multiple}
      options={productCategoryOptions}
      required={required}
      setArgs={setArgs}
      targetProp={targetProp}
    />
  )
}

export default ProductCategoriesSelect
