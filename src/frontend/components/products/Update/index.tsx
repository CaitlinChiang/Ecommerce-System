import { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GetProduct } from '../Showcase/query'
import mutation from './mutation'
import { Button, Typography } from '@mui/material'
import { Product } from '../../../../types/product'
import Text from '../../_common/TextField'
import DatePickerField from '../../_common/DatePickerField'
import CheckboxField from '../../_common/CheckboxField'
import NumberField from '../../_common/NumberField'
import ImageUploader from '../../_common/ImageUploader'
import ProductCategoriesSelect from '../../productCategories/Showcase/select'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { formatFee } from '../../../_utils/handleFormatting/formatFee'
import { formatFromPercentage } from '../../../_utils/handleFormatting/formatFromPercentage'
import { formatToPercentage } from '../../../_utils/handleFormatting/formatToPercentage'

const globalAny: any = global

const UpdateProduct = ({ _id }: { _id: string }): ReactElement => {
  const [args, setArgs] = useState<any>({
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

  const { data, refetch } = useQuery(GetProduct, { variables: { _id } })

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
    variables: {
      ...correctArgs(args),
      discount: formatFromPercentage(args?.discount),
      price: formatFee(args?.price),
      stockQuantity: args?.stockQuantity ? Math.round(args.stockQuantity) : null
    },
    onCompleted: () => {
      globalAny.setNotification(true, 'Product successfully updated!')
      refetch()
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      <Typography>{`Created At: ${product?.createdAt}`}</Typography>
      {product?.updatedAt && (
        <Typography>{`Last Updated At: ${product?.updatedAt}`}</Typography>
      )}
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

export default UpdateProduct
