import { ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { querySingular } from '../Showcase/query'
import { Typography } from '@mui/material'
import { Product } from '../../../../types/product'
import ProductCategoriesSelect from '../../../components/productCategories/Showcase/select'
import Text from '../../_common/TextField'
import DatePickerField from '../../_common/DatePickerField'
import CheckboxField from '../../_common/CheckboxField'
import NumberField from '../../_common/NumberField'

const UpdateProduct = (): ReactElement => {
  const router = useRouter()

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

  const { data } = useQuery(querySingular, {
    variables: { _id: '62b036fe3fcf87061111d52c' }
  })

  const product: Product = data?.get_product || {}

  useEffect(() => {
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
  }, [data])

  return (
    <>
      <Typography>{`Created At: ${product?.createdAt}`}</Typography>
      {product?.updatedAt && (
        <Typography>{`Last Updated At: ${product?.updatedAt}`}</Typography>
      )}
      <ProductCategoriesSelect args={args} required={true} setArgs={setArgs} />
      <Text args={args} setArgs={setArgs} targetProperty={'description'} />
      <DatePickerField
        args={args}
        setArgs={setArgs}
        targetProperty={'expirationDate'}
      />
      <CheckboxField args={args} setArgs={setArgs} targetProperty={'featured'} />
      <Text args={args} required={true} setArgs={setArgs} targetProperty={'name'} />
      <NumberField
        args={args}
        required={true}
        setArgs={setArgs}
        targetProperty={'price'}
      />
      <CheckboxField args={args} setArgs={setArgs} targetProperty={'showPublic'} />
      <NumberField
        args={args}
        required={true}
        setArgs={setArgs}
        targetProperty={'stockQuantity'}
      />
    </>
  )
}

export default UpdateProduct
