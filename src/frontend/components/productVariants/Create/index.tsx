import { ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { querySingular } from '../../products/Showcase/query'
import mutation from './mutation'
import { Button } from '@mui/material'
import { Product } from '../../../../types/product'
import Text from '../../_common/TextField'
import DatePickerField from '../../_common/DatePickerField'
import CheckboxField from '../../_common/CheckboxField'
import NumberField from '../../_common/NumberField'
import ImageUploader from '../../_common/ImageUploader'
import { formatFromPercentage } from '../../../_utils/formatFromPercentage'
import { formatToPercentage } from '../../../_utils/formatToPercentage'

const CreateProductVariant = ({
  _productId
}: {
  _productId: string
}): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<any>({
    _productId,
    description: null,
    discount: null,
    expirationDate: null,
    image: null,
    name: null,
    price: null,
    showPublic: false,
    stockQuantity: null
  })

  const { data } = useQuery(querySingular, {
    variables: { _id: _productId }
  })

  const product: Product = data?.get_product || {}

  useEffect(() => {
    setArgs({
      discount: formatToPercentage(product?.discount),
      expirationDate: product?.expirationDate,
      price: product?.price
    })
  }, [data])

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: {
      ...args,
      discount: formatFromPercentage(args.discount),
      price: parseFloat(Number(args.price)?.toFixed(2)),
      stockQuantity: Math.round(args.stockQuantity)
    },
    onCompleted: () => {
      console.log('Product successfully created!')
      router.back()
    },
    onError: (error) => console.log(error)
  })

  return (
    <>
      <Text args={args} setArgs={setArgs} targetProp={'description'} />
      <DatePickerField args={args} setArgs={setArgs} targetProp={'expirationDate'} />
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
      <ImageUploader
        alt={'Product Variant Photo'}
        args={args}
        setArgs={setArgs}
        targetProp={'image'}
      />
      <Button
        onClick={() => createMutation()}
        disabled={createMutationState.loading}
      >
        {'Create'}
      </Button>
    </>
  )
}

export default CreateProductVariant
