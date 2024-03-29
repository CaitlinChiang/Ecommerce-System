import { ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { GetProduct } from '../../products/View/query'
import mutation from './mutation'
import { Card, CardContent, CircularProgress } from '@mui/material'
import { Product } from '../../../../types/product'
import { CreateProductVariantArgs } from '../../../../types/productVariant'
import Text from '../../_common/TextField'
import DatePickerField from '../../_common/DatePickerField'
import CheckboxField from '../../_common/CheckboxField'
import NumberField from '../../_common/NumberField'
import ImageUploader from '../../_common/ImageUploader'
import MutationButton from '../../_common/MutationButton'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { formatToPercentage } from '../../../_utils/handleFormat/formatToPercentage'
import { formatToDecimal } from '../../../_utils/handleFormat/formatToDecimal'

const globalAny: any = global

const CreateProductVariant = ({
  _productId
}: {
  _productId: string
}): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<Partial<CreateProductVariantArgs>>({
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

  const { data, loading } = useQuery(GetProduct, {
    skip: !_productId,
    variables: { _id: _productId }
  })
  const product: Product = data?.get_product || {}

  useEffect(() => {
    setArgs({
      _productId,
      discount: formatToPercentage(product?.discount),
      expirationDate: product?.expirationDate,
      price: product?.price,
      showPublic: product?.showPublic
    })
  }, [data])

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: { ...correctArgs(args), discount: formatToDecimal(args?.discount) },
    onCompleted: () => {
      globalAny.setNotification(true, 'Product variant successfully created!')
      router.back()
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      {loading && <CircularProgress />}
      <Card>
        <CardContent>
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
    </>
  )
}

export default CreateProductVariant
