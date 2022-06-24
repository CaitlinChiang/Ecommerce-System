import { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { querySingular } from '../Showcase/query'
import mutation from './mutation'
import { Button, Typography } from '@mui/material'
import { Product } from '../../../../types/product'
import ProductCategoriesSelect from '../../../components/productCategories/Showcase/select'
import Text from '../../_common/TextField'
import DatePickerField from '../../_common/DatePickerField'
import CheckboxField from '../../_common/CheckboxField'
import NumberField from '../../_common/NumberField'
import { formatFromPercentage } from '../../../_utils/formatFromPercentage'

const UpdateProduct = ({ _id }: { _id: string }): ReactElement => {
  const [args, setArgs] = useState<any>({
    _id: null,
    categoryId: null,
    description: null,
    discount: null,
    expirationDate: null,
    featured: false,
    name: null,
    price: null,
    showPublic: false,
    stockQuantity: null
  })

  const { data } = useQuery(querySingular, {
    variables: { _id }
  })

  const product: Product = data?.get_product || {}

  useEffect(() => {
    setArgs({
      _id,
      categoryId: product?.categoryId,
      description: product?.description,
      discount: product?.discount,
      expirationDate: product?.expirationDate,
      featured: product?.featured,
      name: product?.name,
      price: product?.price,
      showPublic: product?.showPublic,
      stockQuantity: product?.stockQuantity
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: {
      ...args,
      discount: formatFromPercentage(args.discount),
      price: parseFloat(Number(args.price)?.toFixed(2)),
      stockQuantity: Math.round(args.stockQuantity)
    },
    onCompleted: () => {
      console.log('Product successfully updated!')
    },
    onError: (error) => console.log(error)
  })

  return (
    <>
      <Typography>{`Created At: ${product?.createdAt}`}</Typography>
      {product?.updatedAt && (
        <Typography>{`Last Updated At: ${product?.updatedAt}`}</Typography>
      )}
      <ProductCategoriesSelect args={args} required={true} setArgs={setArgs} />
      <Text args={args} setArgs={setArgs} targetProp={'description'} />
      <DatePickerField args={args} setArgs={setArgs} targetProp={'expirationDate'} />
      <CheckboxField args={args} setArgs={setArgs} targetProp={'featured'} />
      <Text args={args} required={true} setArgs={setArgs} targetProp={'name'} />
      <NumberField
        args={args}
        required={true}
        setArgs={setArgs}
        targetProp={'price'}
      />
      <Text
        args={args}
        placeholder={'ex. 20%'}
        required={true}
        setArgs={setArgs}
        targetProp={'discount'}
      />
      <CheckboxField args={args} setArgs={setArgs} targetProp={'showPublic'} />
      <NumberField
        args={args}
        required={true}
        setArgs={setArgs}
        targetProp={'stockQuantity'}
      />
      <Button
        onClick={() => updateMutation()}
        disabled={updateMutationState.loading}
      >
        {'Save Changes'}
      </Button>
    </>
  )
}

export default UpdateProduct
