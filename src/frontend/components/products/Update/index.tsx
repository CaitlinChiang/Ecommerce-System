import { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GetProduct } from '../View/query'
import mutation from './mutation'
import { Card, CardContent, CircularProgress } from '@mui/material'
import { Product, UpdateProductArgs } from '../../../../types/product'
import UpdateHistory from '../../_common/UpdateHistory'
import Text from '../../_common/TextField'
import DatePickerField from '../../_common/DatePickerField'
import CheckboxField from '../../_common/CheckboxField'
import NumberField from '../../_common/NumberField'
import ImageUploader from '../../_common/ImageUploader'
import MutationButton from '../../_common/MutationButton'
import ProductCategoriesSelect from '../../productCategories/View/select'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { formatToPercentage } from '../../../_utils/handleFormat/formatToPercentage'
import { formatToDecimal } from '../../../_utils/handleFormat/formatToDecimal'

const globalAny: any = global

const UpdateProduct = ({
  _id,
  disabled
}: {
  _id: string
  disabled: boolean
}): ReactElement => {
  const [args, setArgs] = useState<UpdateProductArgs>({
    _id: null,
    categoryId: null,
    description: null,
    discount: null,
    expirationDate: null,
    featured: false,
    image: null,
    imageUrl: null,
    name: null,
    price: null,
    showPublic: false,
    stockQuantity: null
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data, loading, refetch } = useQuery(GetProduct, {
    skip: !_id,
    variables: { _id }
  })
  const product: Product = data?.get_product || {}

  useEffect(() => {
    setArgs({
      _id,
      categoryId: product?.categoryId,
      description: product?.description,
      discount: formatToPercentage(product?.discount),
      expirationDate: product?.expirationDate,
      featured: product?.featured,
      imageUrl: product?.imageUrl,
      name: product?.name,
      price: product?.price,
      showPublic: product?.showPublic,
      stockQuantity: product?.stockQuantity
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: { ...correctArgs(args), discount: formatToDecimal(args?.discount) },
    onCompleted: () => {
      globalAny.setNotification(true, 'Product successfully updated!')
      refetch()
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      {loading && <CircularProgress />}
      <Card>
        <CardContent>
          <UpdateHistory obj={product} product={true} />
          <Text
            args={args}
            disabled={disabled}
            error={validateFields}
            required={true}
            setArgs={setArgs}
            targetProp={'name'}
          />
          <ProductCategoriesSelect
            args={args}
            disabled={disabled}
            error={validateFields}
            required={true}
            setArgs={setArgs}
          />
          <NumberField
            args={args}
            disabled={disabled}
            error={validateFields}
            required={true}
            setArgs={setArgs}
            targetProp={'price'}
          />
          <Text
            args={args}
            disabled={disabled}
            error={validateFields}
            required={true}
            setArgs={setArgs}
            targetProp={'description'}
          />
          <DatePickerField
            args={args}
            disabled={disabled}
            setArgs={setArgs}
            targetProp={'expirationDate'}
          />
          <NumberField
            args={args}
            disabled={disabled}
            error={validateFields}
            required={true}
            setArgs={setArgs}
            targetProp={'stockQuantity'}
          />
          <Text
            args={args}
            disabled={disabled}
            placeholder={'ex. 20%'}
            setArgs={setArgs}
            targetProp={'discount'}
          />
          <CheckboxField
            args={args}
            disabled={disabled}
            setArgs={setArgs}
            targetProp={'showPublic'}
          />
          <CheckboxField
            args={args}
            disabled={disabled}
            setArgs={setArgs}
            targetProp={'featured'}
          />
          <ImageUploader
            alt={'Product Photo'}
            args={args}
            disabled={disabled}
            error={validateFields}
            required={true}
            setArgs={setArgs}
            targetProp={'image'}
          />
          <MutationButton
            disabled={disabled || updateMutationState.loading}
            onClick={(): void => {
              setValidateFields(true)
              updateMutation()
            }}
            title={'Update'}
          />
        </CardContent>
      </Card>
    </>
  )
}

export default UpdateProduct
