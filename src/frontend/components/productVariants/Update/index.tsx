import { ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client'
import { querySingular } from '../Showcase/query'
import mutation from './mutation'
import { Button, Typography } from '@mui/material'
import { ProductVariant } from '../../../../types/productVariant'
import Text from '../../_common/TextField'
import DatePickerField from '../../_common/DatePickerField'
import CheckboxField from '../../_common/CheckboxField'
import NumberField from '../../_common/NumberField'
import ImageUploader from '../../_common/ImageUploader'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { formatFee } from '../../../_utils/handleFormatting/formatFee'
import { formatFromPercentage } from '../../../_utils/handleFormatting/formatFromPercentage'
import { formatToPercentage } from '../../../_utils/handleFormatting/formatToPercentage'

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

  const { data } = useQuery(querySingular, {
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
      imageUrl: args?.imageUrl?.contains('products/') ? null : args?.imageUrl,
      price: formatFee(args?.price),
      stockQuantity: args?.stockQuantity ? Math.round(args.stockQuantity) : null
    },
    onCompleted: () => {
      console.log('Product successfully updated!')
      router.back()
    },
    onError: (error) => console.log(error)
  })

  return (
    <>
      <Typography>{`Created At: ${productVariant?.createdAt}`}</Typography>
      {productVariant?.updatedAt && (
        <Typography>{`Last Updated At: ${productVariant?.updatedAt}`}</Typography>
      )}
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
          updateMutation()
        }}
        disabled={updateMutationState.loading}
      >
        {'Save Changes'}
      </Button>
    </>
  )
}

export default UpdateProductVariant
