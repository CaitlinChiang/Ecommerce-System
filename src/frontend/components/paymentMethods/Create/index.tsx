import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Card, CardContent } from '@mui/material'
import { CreatePaymentMethodArgs } from '../../../../types/paymentMethod'
import Text from '../../_common/TextField'
import MutationButton from '../../_common/MutationButton'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { clearFields } from '../../../_utils/handleFields/clearFields'

const globalAny: any = global

const CreatePaymentMethod = (): ReactElement => {
  const [args, setArgs] = useState<CreatePaymentMethodArgs>({
    name: null,
    details: null
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: () => {
      globalAny.setNotification(true, 'Payment method successfully created!')
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
          placeholder={'Payment Method (ex. BDO Bank Transfer)'}
          required={true}
          setArgs={setArgs}
          targetProp={'name'}
        />
        <Text
          args={args}
          error={validateFields}
          placeholder={'Bank Details (ex. BDO Account - 5210 6988 8182 2136)'}
          required={true}
          setArgs={setArgs}
          targetProp={'details'}
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

export default CreatePaymentMethod
