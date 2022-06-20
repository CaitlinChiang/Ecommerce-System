import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import query from '../Showcase/query'
import { Checkbox } from '@mui/material'
import { Product } from '../../../../types/product'
import ProductCategoriesSelect from '../../../components/productCategories/Showcase/select'
import Text from '../../_common/TextField'
import DatePickerField from 'frontend/components/_common/DatePickerField'

const UpdateProduct = (): ReactElement => {
  const [specificArgs, setSpecificArgs] = useState<any>({
    categoryId: null,
    description: null,
    expirationDate: null,
    featured: false,
    name: null,
    price: null,
    showPublic: false,
    stockQuantity: null
  })

  const { data } = useQuery(query, {
    variables: specificArgs,
    onCompleted: (product): void => {
      setSpecificArgs({
        categoryId: product?.categoryId,
        description: product?.description,
        expirationDate: product?.expirationDate,
        featured: product?.featured,
        name: product?.name,
        price: product?.price,
        showPublic: product?.showPublic,
        stockQuantity: product?.stockQuantity
      })
    }
  })

  const product: Product = data?.get_product || {}

  return (
    <>
      <ProductCategoriesSelect
        setSpecificArgs={setSpecificArgs}
        specificArgs={specificArgs}
      />
      <Text
        label={'Description'}
        setSpecificArgs={setSpecificArgs}
        specificArgs={specificArgs}
        targetProperty={'description'}
        width={800}
      />
      <DatePickerField
        setSpecificArgs={setSpecificArgs}
        specificArgs={specificArgs}
        targetProperty={'expirationDate'}
      />
      <Checkbox
        checked={specificArgs?.featured}
        onChange={() =>
          setSpecificArgs({ ...specificArgs, featured: !specificArgs?.featured })
        }
      />
    </>
  )
}

export default UpdateProduct
