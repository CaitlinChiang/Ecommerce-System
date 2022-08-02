import { ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client'
import { GetProductVariant } from '../View/query'
import mutation from './mutation'
import { Button, CircularProgress, Typography } from '@mui/material'
import { ProductVariant } from '../../../../types/productVariant'
import Text from '../../_common/TextField'
import DatePickerField from '../../_common/DatePickerField'
import CheckboxField from '../../_common/CheckboxField'
import NumberField from '../../_common/NumberField'
import ImageUploader from '../../_common/ImageUploader'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { formatFee } from '../../../_utils/handleFormat/formatFee'
import { formatFromPercentage } from '../../../_utils/handleFormat/formatFromPercentage'
import { formatToPercentage } from '../../../_utils/handleFormat/formatToPercentage'

const globalAny: any = global

const UpdateProductVariant = ({ _id }: { _id: string }): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<any>({
    _id: null,
    description: null,
    discount: null,
    expirationDate: null,
    image: null,
    imageUrl: null,
    name: null,
    price: null,
    showPublic: false,
    stockQuantity: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data, loading } = useQuery(GetProductVariant, {
    skip: !_id,
    variables: { _id }
  })

  const productVariant: ProductVariant = data?.get_product_variant || {}

  useEffect(() => {
    setArgs({
      _id,
      description: productVariant?.description,
      discount: formatToPercentage(productVariant?.discount),
      expirationDate: productVariant?.expirationDate,
      imageUrl: productVariant?.imageUrl,
      name: productVariant?.name,
      price: productVariant?.price,
      showPublic: productVariant?.showPublic,
      stockQuantity: productVariant?.stockQuantity
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: {
      ...correctArgs(args),
      discount: formatFromPercentage(args?.discount),
      imageUrl: args?.imageUrl?.includes('products/') ? null : args?.imageUrl,
      price: formatFee(args?.price),
      stockQuantity: args?.stockQuantity ? Math.round(args.stockQuantity) : null
    },
    onCompleted: () => {
      globalAny.setNotification(true, 'Product variant successfully updated!')
      router.back()
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      {loading && <CircularProgress />}
      <Typography>{`Created At: ${productVariant?.createdAt}`}</Typography>
      <Typography>{`Last Updated At: ${
        productVariant?.updatedAt || '-'
      }`}</Typography>
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
        disabled={updateMutationState.loading}
        onClick={(): void => {
          setValidateFields(true)
          updateMutation()
        }}
      >
        {'Save Changes'}
      </Button>
    </>
  )
}

export default UpdateProductVariant
