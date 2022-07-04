import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import ProductCategoriesSelect from '../../../components/productCategories/Showcase/select'
import Text from '../../_common/TextField'
import DatePickerField from '../../_common/DatePickerField'
import CheckboxField from '../../_common/CheckboxField'
import NumberField from '../../_common/NumberField'
import ImageUploader from '../../_common/ImageUploader'
import { formatFromPercentage } from '../../../_utils/formatFromPercentage'

const CreateProduct = (): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<any>({
    categoryId: null,
    description: null,
    discount: null,
    expirationDate: null,
    featured: false,
    image: null,
    name: null,
    price: null,
    showPublic: false,
    stockQuantity: null
  })

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
      <ProductCategoriesSelect
        args={args}
        create={true}
        required={true}
        setArgs={setArgs}
      />
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
        alt={'Product Photo'}
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

export default CreateProduct
