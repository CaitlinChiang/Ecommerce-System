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
import Notification from '../../_common/Notification'
import { formatFee } from '../../../_utils/handleFormatting/formatFee'
import { formatFromPercentage } from '../../../_utils/handleFormatting/formatFromPercentage'

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
  const [validateFields, setValidateFields] = useState<boolean>(false)
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
  })

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: {
      ...args,
      discount: formatFromPercentage(args?.discount),
      price: formatFee(args?.price),
      stockQuantity: args?.stockQuantity ? Math.round(args.stockQuantity) : null
    },
    onCompleted: () => {
      setNotification({
        message: 'Product successfully created!',
        success: true
      })
      router.back()
    },
    onError: (error) => setNotification({ message: error.message, success: false })
  })

  return (
    <>
      <ProductCategoriesSelect
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
      />
      <Text args={args} setArgs={setArgs} targetProp={'description'} />
      <DatePickerField args={args} setArgs={setArgs} targetProp={'expirationDate'} />
      <CheckboxField args={args} setArgs={setArgs} targetProp={'featured'} />
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'name'}
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
        placeholder={'ex. 20%'}
        setArgs={setArgs}
        targetProp={'discount'}
      />
      <CheckboxField args={args} setArgs={setArgs} targetProp={'showPublic'} />
      <NumberField
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'stockQuantity'}
      />
      <ImageUploader
        alt={'Product Photo'}
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'image'}
      />
      <Button
        onClick={() => {
          setValidateFields(true)
          createMutation()
        }}
        disabled={createMutationState.loading}
      >
        {'Create'}
      </Button>
      <Notification message={notification.message} success={notification.success} />
    </>
  )
}

export default CreateProduct
