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
import Notification from '../../_common/Notification'
import { formatFee } from '../../../_utils/handleFormatting/formatFee'
import { formatFromPercentage } from '../../../_utils/handleFormatting/formatFromPercentage'
import { formatToPercentage } from '../../../_utils/handleFormatting/formatToPercentage'

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
  const [validateFields, setValidateFields] = useState<boolean>(false)
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
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
      <Text args={args} setArgs={setArgs} targetProp={'description'} />
      <DatePickerField args={args} setArgs={setArgs} targetProp={'expirationDate'} />
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
        required={true}
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
        alt={'Product Variant Photo'}
        args={args}
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

export default CreateProductVariant
