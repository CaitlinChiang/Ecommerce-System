import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Card, CardContent } from '@mui/material'
import { CreateProductArgs } from '../../../../types/product'
import Text from '../../_common/TextField'
import DatePickerField from '../../_common/DatePickerField'
import CheckboxField from '../../_common/CheckboxField'
import NumberField from '../../_common/NumberField'
import ImageUploader from '../../_common/ImageUploader'
import MutationButton from '../../_common/MutationButton'
import ProductCategoriesSelect from '../../productCategories/View/select'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { formatToDecimal } from '../../../_utils/handleFormat/formatToDecimal'

const globalAny: any = global

const CreateProduct = (): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<CreateProductArgs>({
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

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: { ...correctArgs(args), discount: formatToDecimal(args?.discount) },
    onCompleted: () => {
      globalAny.setNotification(true, 'Product successfully created!')
      router.back()
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <Card>
      <CardContent>
        <Text
          args={args}
          error={validateFields}
          required={true}
          setArgs={setArgs}
          targetProp={'name'}
        />
        <ProductCategoriesSelect
          args={args}
          error={validateFields}
          required={true}
          setArgs={setArgs}
        />
        <NumberField
          args={args}
          error={validateFields}
          required={true}
          setArgs={setArgs}
          targetProp={'price'}
        />
        <Text
          args={args}
          error={validateFields}
          required={true}
          setArgs={setArgs}
          targetProp={'description'}
        />
        <DatePickerField
          args={args}
          setArgs={setArgs}
          targetProp={'expirationDate'}
        />
        <NumberField
          args={args}
          error={validateFields}
          required={true}
          setArgs={setArgs}
          targetProp={'stockQuantity'}
        />
        <Text
          args={args}
          placeholder={'ex. 20%'}
          setArgs={setArgs}
          targetProp={'discount'}
        />
        <CheckboxField args={args} setArgs={setArgs} targetProp={'showPublic'} />
        <CheckboxField args={args} setArgs={setArgs} targetProp={'featured'} />
        <ImageUploader
          alt={'Product Photo'}
          args={args}
          error={validateFields}
          required={true}
          setArgs={setArgs}
          targetProp={'image'}
        />
        <MutationButton
          disabled={createMutationState.loading}
          onClick={(): void => {
            setValidateFields(true)
            createMutation()
          }}
        />
      </CardContent>
    </Card>
  )
}

export default CreateProduct
