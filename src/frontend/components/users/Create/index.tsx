import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Card, CardContent } from '@mui/material'
import { CreateUserArgs } from '../../../../types/user'
import { UserType } from '../../../_enums/userType'
import Text from '../../_common/TextField'
import MutationButton from '../../_common/MutationButton'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { clearFields } from '../../../_utils/handleFields/clearFields'

const globalAny: any = global

const CreateUser = (): ReactElement => {
  const [args, setArgs] = useState<CreateUserArgs>({
    email: null,
    firstName: null,
    lastName: null,
    password: 'Company Name',
    phoneNumber: null,
    type: UserType.ADMINISTRATOR
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: () => {
      globalAny.setNotification(true, 'Account successfully created!')
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
          required={true}
          setArgs={setArgs}
          targetProp={'firstName'}
        />
        <Text
          args={args}
          error={validateFields}
          required={true}
          setArgs={setArgs}
          targetProp={'lastName'}
        />
        <Text
          args={args}
          error={validateFields}
          required={true}
          setArgs={setArgs}
          targetProp={'email'}
        />
        <Text
          args={args}
          error={validateFields}
          required={true}
          setArgs={setArgs}
          targetProp={'phoneNumber'}
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

export default CreateUser
