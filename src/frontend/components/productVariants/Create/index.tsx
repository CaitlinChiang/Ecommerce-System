import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import Text from '../../_common/TextField'
import DatePickerField from '../../_common/DatePickerField'
import CheckboxField from '../../_common/CheckboxField'
import NumberField from '../../_common/NumberField'

const CreateProductVariant = (): ReactElement => {
  const router = useRouter()
  const _productId = '62b036fe3fcf87061111d52c'

  const [args, setArgs] = useState<any>({
    _productId,
    description: null,
    expirationDate: null,
    name: null,
    price: null,
    showPublic: false,
    stockQuantity: null
  })

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: args,
    onCompleted: () => {
      console.log('Product successfully created!')
    },
    onError: (error) => console.log(error)
  })

  return (
    <>
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
        onClick={() => createMutation()}
        disabled={createMutationState.loading}
      >
        {'Create'}
      </Button>
    </>
  )
}

export default CreateProductVariant
