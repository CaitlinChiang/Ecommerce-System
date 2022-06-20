import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import query from '../Showcase/query'
import { Checkbox } from '@mui/material'
import { Product } from '../../../../types/product'
import ProductCategoriesSelect from '../../../components/productCategories/Showcase/select'
import Text from '../../_common/TextField'
import DatePickerField from 'frontend/components/_common/DatePickerField'

const UpdateProduct = (): ReactElement => {
  const [args, setArgs] = useState<any>({
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
    variables: args,
    onCompleted: (product): void => {
      setArgs({
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
      <ProductCategoriesSelect args={args} setArgs={setArgs} />
      <Text
        args={args}
        label={'Description'}
        setArgs={setArgs}
        targetProperty={'description'}
        width={800}
      />
      <DatePickerField
        args={args}
        setArgs={setArgs}
        targetProperty={'expirationDate'}
      />
      <Checkbox
        checked={args?.featured}
        onChange={() => setArgs({ ...args, featured: !args?.featured })}
      />
    </>
  )
}

export default UpdateProduct
