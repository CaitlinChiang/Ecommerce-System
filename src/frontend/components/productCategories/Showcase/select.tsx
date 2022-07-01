import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { queryMultiple } from './query'
import { ProductCategory } from '../../../../types/productCategory'
import { SortDirection } from '../../../_enums/sortDirection'
import SelectField from '../../../components/_common/SelectField'

const ProductCategoriesSelect = ({
  args,
  create,
  multiple,
  required,
  setArgs
}: {
  args: any
  create?: boolean
  multiple?: boolean
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
}): ReactElement => {
  const targetProp = multiple ? 'categoryIds' : 'categoryId'

  const { data } = useQuery(queryMultiple, {
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

  const selectVal = productCategoryOptions?.find(
    (category: any) => category[targetProp] === args?.[targetProp]
  )

  if (!selectVal && !create) return

  return (
    <SelectField
      label={'Categories'}
      multiple={multiple}
      optionLabelProp={'label'}
      options={productCategoryOptions}
      required={required}
      selectVal={selectVal}
      setArgs={setArgs}
      args={args}
      targetProp={targetProp}
    />
  )
}

export default ProductCategoriesSelect
