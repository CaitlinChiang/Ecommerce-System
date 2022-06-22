import { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { querySingular } from '../Showcase/query'
import mutation from './mutation'
import { Button, Typography } from '@mui/material'
import { ProductVariant } from '../../../../types/productVariant'
import Text from '../../_common/TextField'
import DatePickerField from '../../_common/DatePickerField'
import CheckboxField from '../../_common/CheckboxField'
import NumberField from '../../_common/NumberField'

const UpdateProductVariant = ({ _id }: { _id: string }): ReactElement => {
  const [args, setArgs] = useState<any>({
    _id,
    description: null,
    expirationDate: null,
    name: null,
    price: null,
    showPublic: false,
    stockQuantity: null
  })

  const { data } = useQuery(querySingular, {
    variables: { _id }
  })

  const productVariant: ProductVariant = data?.get_product_variant || {}

  useEffect(() => {
    setArgs({
      _id,
      description: productVariant?.description,
      expirationDate: productVariant?.expirationDate,
      name: productVariant?.name,
      price: productVariant?.price,
      showPublic: productVariant?.showPublic,
      stockQuantity: productVariant?.stockQuantity
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: {
      ...args,
      price: parseFloat(Number(args.price)?.toFixed(2)),
      stockQuantity: Math.round(args.stockQuantity)
    },
    onCompleted: () => {
      console.log('Product successfully updated!')
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
      <Text args={args} required={true} setArgs={setArgs} targetProp={'name'} />
      <NumberField
        args={args}
        required={true}
        setArgs={setArgs}
        targetProp={'price'}
      />
      <CheckboxField args={args} setArgs={setArgs} targetProp={'showPublic'} />
      <NumberField
        args={args}
        required={true}
        setArgs={setArgs}
        targetProp={'stockQuantity'}
      />
      <Button
        onClick={() => updateMutation()}
        disabled={updateMutationState.loading}
      >
        {'Save Changes'}
      </Button>
    </>
  )
}

export default UpdateProductVariant
