import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Card, CardContent } from '@mui/material'
import { CreateCityArgs } from '../../../../types/city'
import Text from '../../_common/TextField'
import NumberField from '../../_common/NumberField'
import MutationButton from '../../_common/MutationButton'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { clearFields } from '../../../_utils/handleFields/clearFields'

const globalAny: any = global

const CreateCity = (): ReactElement => {
  const [args, setArgs] = useState<CreateCityArgs>({
    name: null,
    shippingFee: null
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: () => {
      globalAny.setNotification(true, 'City & shipping fee successfully created!')
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
          placeholder={'City (ex. Makati)'}
          required={true}
          setArgs={setArgs}
          targetProp={'name'}
        />
        <NumberField
          args={args}
          error={validateFields}
          required={true}
          setArgs={setArgs}
          targetProp={'shippingFee'}
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
  )
}

export default CreateCity
