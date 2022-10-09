import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Card, CardContent } from '@mui/material'
import { CreateProductCategoryArgs } from '../../../../types/productCategory'
import Text from '../../_common/TextField'
import CheckboxField from '../../_common/CheckboxField'
import MutationButton from '../../_common/MutationButton'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { clearFields } from '../../../_utils/handleFields/clearFields'

const globalAny: any = global

const CreateProductCategory = (): ReactElement => {
  const [args, setArgs] = useState<CreateProductCategoryArgs>({
    name: null,
    showPublic: false
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: () => {
      globalAny.setNotification(true, 'Product category successfully created!')
      setValidateFields(false)
      setArgs(clearFields(args))
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <Card>
      <CardContent>
        <Text
          args={args}
          error={validateFields}
          placeholder={'Product Category (ex. Tops)'}
          required={true}
          setArgs={setArgs}
          targetProp={'name'}
        />
        <CheckboxField args={args} setArgs={setArgs} targetProp={'showPublic'} />
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

export default CreateProductCategory
